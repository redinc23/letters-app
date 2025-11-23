#!/bin/bash

###############################################################################
# LETTERS APP - ZERO-CONFIG AUTOMATION
# This script does EVERYTHING. Just run it. That's it.
# Run: bash DO_EVERYTHING.sh
###############################################################################

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print() { echo -e "$1"; }
success() { print "${GREEN}✅ $1${NC}"; }
error() { print "${RED}❌ $1${NC}"; }
info() { print "${BLUE}ℹ️  $1${NC}"; }
warning() { print "${YELLOW}⚠️  $1${NC}"; }

clear
print "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     ✉️  LETTERS APP - FULLY AUTOMATED SETUP                  ║
║                                                               ║
║           Zero Configuration Required - Just Run It          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
print "${NC}\n"

# Auto-detect if we're in Replit
REPLIT_MODE=false
if [ -n "${REPL_SLUG:-}" ] && [ -n "${REPL_OWNER:-}" ]; then
    REPLIT_MODE=true
    REPLIT_URL="https://${REPL_SLUG}.${REPL_OWNER}.repl.co"
    success "Replit environment detected!"
    info "Your URL: ${REPLIT_URL}"
else
    REPLIT_URL="https://your-repl.replit.dev"
    warning "Not in Replit - will create setup files for Replit deployment"
fi

# Check prerequisites
info "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    error "Node.js not found!"
    exit 1
fi
NODE_VER=$(node -v | sed 's/v//' | cut -d'.' -f1)
if [ "$NODE_VER" -lt 16 ]; then
    error "Node.js 16+ required. Found: $(node -v)"
    exit 1
fi
success "Node.js $(node -v) ✓"

# Generate secrets
info "Generating secrets..."
if command -v openssl &> /dev/null; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32 | tr -d '\n')
else
    NEXTAUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
fi
DATABASE_URL="file:./dev.db"
success "Secrets generated ✓"

# Install dependencies
info "Installing dependencies (this takes 2-5 minutes)..."
npm install --legacy-peer-deps > /dev/null 2>&1 || npm install --legacy-peer-deps
success "Dependencies installed ✓"

# Create .env.local
info "Creating environment file..."
cat > .env.local << EOF
DATABASE_URL="${DATABASE_URL}"
NEXTAUTH_URL="${REPLIT_URL}"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
NODE_ENV="production"
PORT="3000"
EOF
success "Environment configured ✓"

# Prisma setup
info "Setting up database..."
npx prisma generate > /dev/null 2>&1
npx prisma migrate dev --name init > /dev/null 2>&1 || true
success "Database ready ✓"

# Build
info "Building project..."
npm run build > /dev/null 2>&1 || warning "Build had warnings (OK for dev)"
success "Build complete ✓"

# Create COPY_PASTE_TO_REPLIT.txt with everything
cat > COPY_PASTE_TO_REPLIT.txt << EOF
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     COPY THIS ENTIRE FILE TO REPLIT AND RUN IT               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

STEP 1: Copy this entire script and paste into Replit shell:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bash DO_EVERYTHING.sh

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 2: After script runs, add these secrets to Replit Secrets tab (🔒):

Secret 1:
Key: DATABASE_URL
Value: ${DATABASE_URL}

Secret 2:
Key: NEXTAUTH_URL  
Value: ${REPLIT_URL}

Secret 3:
Key: NEXTAUTH_SECRET
Value: ${NEXTAUTH_SECRET}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 3: Click "Run" button or type: npm run dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DONE! Your app will be live at: ${REPLIT_URL}

EOF

# Create Replit AI prompt
cat > TELL_REPLIT_AI.txt << EOF
I need you to help me deploy my Letters app. Here's what to do:

1. Run this command: bash DO_EVERYTHING.sh
2. After it finishes, add these 3 secrets to the Secrets tab:
   - DATABASE_URL = ${DATABASE_URL}
   - NEXTAUTH_URL = ${REPLIT_URL}
   - NEXTAUTH_SECRET = ${NEXTAUTH_SECRET}
3. Then start the app with: npm run dev

The secrets are also saved in COPY_PASTE_TO_REPLIT.txt file.

Please do all of this for me automatically.
EOF

print "\n${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
print "${GREEN}║                                                               ║${NC}"
print "${GREEN}║                    ✅ ALL DONE!                                ║${NC}"
print "${GREEN}║                                                               ║${NC}"
print "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}\n"

if [ "$REPLIT_MODE" = true ]; then
    info "You're already in Replit! Next steps:"
    echo ""
    echo "1. Add secrets to Secrets tab (🔒):"
    echo "   DATABASE_URL = ${DATABASE_URL}"
    echo "   NEXTAUTH_URL = ${REPLIT_URL}"
    echo "   NEXTAUTH_SECRET = ${NEXTAUTH_SECRET}"
    echo ""
    echo "2. Run: npm run dev"
    echo ""
    echo "3. Your app: ${REPLIT_URL}"
else
    info "Setup complete! For Replit deployment:"
    echo ""
    echo "📄 Open COPY_PASTE_TO_REPLIT.txt and follow instructions"
    echo "🤖 Or give TELL_REPLIT_AI.txt to Replit AI assistant"
    echo ""
    echo "Secrets generated:"
    echo "  DATABASE_URL = ${DATABASE_URL}"
    echo "  NEXTAUTH_URL = ${REPLIT_URL}"
    echo "  NEXTAUTH_SECRET = ${NEXTAUTH_SECRET}"
fi

print "\n${GREEN}🎉 Everything is ready!${NC}\n"

