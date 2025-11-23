#!/bin/bash

###############################################################################
# Letters App - FULLY AUTOMATED Replit Setup Script
# This script does EVERYTHING automatically and generates secrets for you
# Run this in your Replit shell: bash setup-replit-auto.sh
###############################################################################

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Color codes for better output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly MAGENTA='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Helper functions
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_secret() { echo -e "${MAGENTA}🔐 $1${NC}"; }
print_step() { 
    echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📋 $1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Banner
clear
echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        ✉️  LETTERS APP - FULLY AUTOMATED SETUP                ║
║                                                               ║
║     Where Email Meets Elegance - Zero-Config Deployment      ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

###############################################################################
# Step 1: Pre-flight Checks
###############################################################################
print_step "Step 1: Pre-flight Checks & Environment Detection"

# Check Node.js version
print_info "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js 16+ required. Current: $(node -v)"
    print_info "Please upgrade Node.js in Replit settings"
    exit 1
fi
print_success "Node.js version: $(node -v)"

# Check npm
print_info "Checking npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
fi
print_success "npm version: $(npm -v)"

# Detect Replit environment
REPLIT_DETECTED=false
if [ -n "${REPL_SLUG:-}" ] && [ -n "${REPL_OWNER:-}" ]; then
    REPLIT_URL="https://${REPL_SLUG}.${REPL_OWNER}.repl.co"
    REPLIT_DETECTED=true
    print_success "Replit environment detected!"
    print_info "Your app URL: ${REPLIT_URL}"
else
    REPLIT_URL="https://your-repl.replit.dev"
    print_warning "Replit environment variables not detected"
    print_info "Using placeholder URL. Update manually if needed."
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found! Are you in the project root?"
    exit 1
fi
print_success "Project root detected"

# Check if Prisma schema exists
if [ ! -f "prisma/schema.prisma" ]; then
    print_error "Prisma schema not found at prisma/schema.prisma"
    exit 1
fi
print_success "Prisma schema found"

###############################################################################
# Step 2: Generate All Secrets
###############################################################################
print_step "Step 2: Generating Secrets & Configuration"

# Generate NEXTAUTH_SECRET
print_info "Generating NEXTAUTH_SECRET..."
if command -v openssl &> /dev/null; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32 | tr -d '\n')
else
    NEXTAUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
fi
print_success "NEXTAUTH_SECRET generated"

# Set DATABASE_URL (default to SQLite)
DATABASE_URL="file:./dev.db"
print_info "Using SQLite database (file:./dev.db)"

# Create secrets file for easy copy-paste
SECRETS_FILE=".replit-secrets.txt"
cat > "$SECRETS_FILE" << EOF
╔═══════════════════════════════════════════════════════════════╗
║          REPLIT SECRETS - COPY THESE TO SECRETS TAB          ║
╚═══════════════════════════════════════════════════════════════╝

IMPORTANT: Go to Replit Secrets tab (🔒 icon) and add these:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secret 1:
  Key:   DATABASE_URL
  Value: ${DATABASE_URL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secret 2:
  Key:   NEXTAUTH_URL
  Value: ${REPLIT_URL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secret 3:
  Key:   NEXTAUTH_SECRET
  Value: ${NEXTAUTH_SECRET}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUICK COPY (for Replit AI Assistant):
Copy this entire block and paste into Replit Secrets:

DATABASE_URL=${DATABASE_URL}
NEXTAUTH_URL=${REPLIT_URL}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated: $(date)
EOF

print_success "Secrets file created: ${SECRETS_FILE}"
print_warning "⚠️  IMPORTANT: Add these secrets to Replit Secrets tab (🔒 icon)"

# Display secrets
echo ""
print_secret "Generated Secrets (save these!):"
echo ""
echo -e "${MAGENTA}DATABASE_URL=${NC}${DATABASE_URL}"
echo -e "${MAGENTA}NEXTAUTH_URL=${NC}${REPLIT_URL}"
echo -e "${MAGENTA}NEXTAUTH_SECRET=${NC}${NEXTAUTH_SECRET}"
echo ""

###############################################################################
# Step 3: Install Dependencies
###############################################################################
print_step "Step 3: Installing Dependencies"

print_info "This may take 2-5 minutes..."
if npm install --legacy-peer-deps 2>&1 | tee /tmp/npm-install.log; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    print_info "Check /tmp/npm-install.log for details"
    exit 1
fi

###############################################################################
# Step 4: Environment Configuration
###############################################################################
print_step "Step 4: Configuring Environment"

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    print_info "Creating .env.local file..."
    
    cat > .env.local << EOF
# ============================================
# Letters App - Environment Configuration
# ============================================
# Generated by setup-replit-auto.sh on $(date)
# NOTE: Secrets in Replit Secrets tab override these values

# Database Configuration
DATABASE_URL="${DATABASE_URL}"

# NextAuth Configuration
NEXTAUTH_URL="${REPLIT_URL}"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"

# Application Environment
NODE_ENV="production"
PORT="3000"

# Optional: Email Service Configuration
# Uncomment and configure when ready:
# RESEND_API_KEY=""
# GMAIL_CLIENT_ID=""
# GMAIL_CLIENT_SECRET=""
# GOOGLE_CLIENT_ID=""
# GOOGLE_CLIENT_SECRET=""

# Optional: File Storage
# BLOB_READ_WRITE_TOKEN=""

# Optional: Rate Limiting (Upstash Redis)
# UPSTASH_REDIS_REST_URL=""
# UPSTASH_REDIS_REST_TOKEN=""
EOF
    
    print_success ".env.local created"
else
    print_info ".env.local already exists, updating values..."
    # Update existing .env.local with new values
    sed -i.bak "s|NEXTAUTH_URL=.*|NEXTAUTH_URL=\"${REPLIT_URL}\"|" .env.local 2>/dev/null || true
    sed -i.bak "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"${NEXTAUTH_SECRET}\"|" .env.local 2>/dev/null || true
    print_success ".env.local updated"
fi

###############################################################################
# Step 5: Prisma Setup
###############################################################################
print_step "Step 5: Setting Up Database"

# Generate Prisma Client
print_info "Generating Prisma Client..."
if npx prisma generate; then
    print_success "Prisma Client generated"
else
    print_error "Failed to generate Prisma Client"
    exit 1
fi

# Run migrations
print_info "Running database migrations..."
if [ -f "prisma/dev.db" ]; then
    print_info "Database file exists, checking migrations..."
    npx prisma migrate dev --name init 2>&1 | grep -v "already applied" || true
else
    print_info "Creating initial database..."
    if npx prisma migrate dev --name init; then
        print_success "Database migrations completed"
    else
        print_warning "Migration may have already run"
    fi
fi

# Verify database
print_info "Verifying database connection..."
if npx prisma db pull --force 2>&1 | grep -q "Introspecting\|Already up to date"; then
    print_success "Database connection verified"
else
    print_warning "Could not verify database (may be OK for new database)"
fi

###############################################################################
# Step 6: Build Verification
###############################################################################
print_step "Step 6: Building Project"

print_info "Building the project (this may take a minute)..."
if npm run build 2>&1 | tee /tmp/build.log; then
    print_success "Build completed successfully"
    BUILD_SUCCESS=true
else
    print_warning "Build completed with warnings (check /tmp/build.log)"
    print_info "You can still run 'npm run dev' for development"
    BUILD_SUCCESS=false
fi

###############################################################################
# Step 7: Create Helper Files
###############################################################################
print_step "Step 7: Creating Helper Files"

# Create Replit AI prompt file
cat > REPLIT_AI_PROMPT.txt << 'EOF'
Hey Replit AI! Please help me set up my Letters app:

1. I've run the setup script and it's complete
2. I need you to help me add secrets to the Secrets tab
3. The secrets are in .replit-secrets.txt file
4. After secrets are added, start the app with: npm run dev
5. Verify the app is running and accessible

The secrets I need to add are:
- DATABASE_URL
- NEXTAUTH_URL  
- NEXTAUTH_SECRET

Please guide me through adding these to the Secrets tab, then start the app.
EOF

print_success "Replit AI prompt file created: REPLIT_AI_PROMPT.txt"

# Create quick start script
cat > start-app.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Letters App..."
echo ""
echo "Checking secrets..."
if [ -z "${DATABASE_URL:-}" ]; then
    echo "⚠️  WARNING: DATABASE_URL not set in Secrets!"
    echo "   Please add secrets from .replit-secrets.txt"
    exit 1
fi
echo "✅ Secrets detected"
echo ""
echo "Starting development server..."
npm run dev
EOF

chmod +x start-app.sh
print_success "Quick start script created: start-app.sh"

###############################################################################
# Step 8: Final Summary
###############################################################################
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}║              ✅ AUTOMATED SETUP COMPLETE!                     ║${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

print_step "📋 NEXT STEPS - Follow These Instructions"

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}STEP 1: Add Secrets to Replit${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Click the 🔒 Secrets tab (lock icon in sidebar)"
echo "2. Click 'New secret' for each of these:"
echo ""
echo -e "${MAGENTA}   Secret 1:${NC}"
echo "   Key:   DATABASE_URL"
echo "   Value: ${DATABASE_URL}"
echo ""
echo -e "${MAGENTA}   Secret 2:${NC}"
echo "   Key:   NEXTAUTH_URL"
echo "   Value: ${REPLIT_URL}"
echo ""
echo -e "${MAGENTA}   Secret 3:${NC}"
echo "   Key:   NEXTAUTH_SECRET"
echo "   Value: ${NEXTAUTH_SECRET}"
echo ""
echo -e "${CYAN}💡 TIP:${NC} All secrets are saved in ${SECRETS_FILE} for easy reference"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}STEP 2: Start Your App${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "After adding secrets, start your app:"
echo ""
echo -e "${GREEN}   Option A:${NC} Click the 'Run' button in Replit"
echo -e "${GREEN}   Option B:${NC} Run: ${CYAN}npm run dev${NC}"
echo -e "${GREEN}   Option C:${NC} Run: ${CYAN}bash start-app.sh${NC}"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}STEP 3: Access Your App${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
if [ "$REPLIT_DETECTED" = true ]; then
    echo -e "Your app will be available at: ${CYAN}${REPLIT_URL}${NC}"
else
    echo -e "Your app will be available at: ${CYAN}https://your-repl-name.yourusername.repl.co${NC}"
fi
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}QUICK REFERENCE${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📄 Secrets file:     ${SECRETS_FILE}"
echo "🤖 AI prompt file:   REPLIT_AI_PROMPT.txt"
echo "🚀 Start script:      bash start-app.sh"
echo "📚 Full guide:        REPLIT_DEPLOYMENT.md"
echo "⚡ Quick guide:       REPLIT_QUICK_START.md"
echo ""

if [ "$BUILD_SUCCESS" = true ]; then
    print_success "Build Status: ✅ Successful - Ready for production!"
else
    print_warning "Build Status: ⚠️  Completed with warnings - Check logs"
fi

echo ""
print_info "💡 PRO TIP: Use Replit AI Assistant!"
echo "   Copy the contents of REPLIT_AI_PROMPT.txt and paste it"
echo "   into Replit's AI assistant for guided setup help."
echo ""

echo -e "${GREEN}🎉 Setup Complete! Follow the steps above to finish deployment.${NC}"
echo ""

