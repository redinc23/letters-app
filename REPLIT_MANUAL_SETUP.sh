#!/bin/bash

###############################################################################
# Replit Manual Setup - Bypasses GitHub Auth Issues
# Run this in a NEW Replit (created manually, not imported)
# This clones via HTTPS and sets everything up
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

clear
echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     Replit Manual Setup - No GitHub Auth Needed              ║
║                                                               ║
║     Clones via HTTPS and sets up everything                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

REPO_URL="https://github.com/redinc23/letters-app.git"
REPO_DIR="letters-app"

# Check if we're in an empty Repl or if files exist
if [ -f "package.json" ] && [ -d "src" ]; then
    echo -e "${YELLOW}⚠️  Project files already exist in this directory${NC}"
    echo ""
    read -p "Do you want to clone into a subdirectory? (y/n): " CLONE_SUBDIR
    
    if [ "$CLONE_SUBDIR" = "y" ]; then
        echo -e "${BLUE}Cloning into ${REPO_DIR}...${NC}"
        git clone "$REPO_URL" "$REPO_DIR"
        cd "$REPO_DIR"
    else
        echo -e "${BLUE}Using existing files...${NC}"
    fi
else
    # Clone into current directory
    echo -e "${BLUE}Cloning repository...${NC}"
    
    # Check if directory is empty
    if [ "$(ls -A 2>/dev/null)" ]; then
        echo -e "${YELLOW}Directory not empty. Cloning into ${REPO_DIR}...${NC}"
        git clone "$REPO_URL" "$REPO_DIR"
        cd "$REPO_DIR"
    else
        echo -e "${BLUE}Cloning into current directory...${NC}"
        git clone "$REPO_URL" .
    fi
fi

# Verify we're in the right place
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Repository cloned${NC}\n"

# Now run the setup script
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Running setup script...${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -f "DO_EVERYTHING.sh" ]; then
    bash DO_EVERYTHING.sh
else
    echo -e "${YELLOW}DO_EVERYTHING.sh not found, running basic setup...${NC}"
    
    # Basic setup
    echo "Installing dependencies..."
    npm install --legacy-peer-deps
    
    echo "Generating Prisma client..."
    npx prisma generate
    
    echo "Running migrations..."
    npx prisma migrate dev --name init || true
    
    echo ""
    echo -e "${GREEN}✓ Basic setup complete${NC}"
    echo ""
    echo "Next: Add secrets to Replit Secrets tab (🔒)"
    echo "  - DATABASE_URL: file:./dev.db"
    echo "  - NEXTAUTH_URL: https://your-repl.replit.dev"
    echo "  - NEXTAUTH_SECRET: (generate with: openssl rand -base64 32)"
fi

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "Your app is ready. Add secrets and click Run!"

