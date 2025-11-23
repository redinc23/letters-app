#!/bin/bash

###############################################################################
# Quick Fix Script - GitHub Permissions for Replit
# This script provides instructions and checks
###############################################################################

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
║          Fix GitHub Permissions for Replit                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

REPO_URL="https://github.com/redinc23/letters-app"

echo -e "${YELLOW}Repository: ${REPO_URL}${NC}\n"

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}OPTION 1: Make Repo Public (FASTEST)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Open: https://github.com/redinc23/letters-app/settings"
echo "2. Scroll to 'Danger Zone'"
echo "3. Click 'Change visibility' → 'Make public'"
echo "4. Import to Replit (will work immediately)"
echo "5. Make private again after import if needed"
echo ""
echo -e "${GREEN}This takes 30 seconds and always works!${NC}"
echo ""

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}OPTION 2: Fix Replit GitHub Connection${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Replit: https://replit.com/account → Connections → GitHub"
echo "2. Disconnect → Reconnect → Authorize"
echo "3. GitHub: https://github.com/settings/applications"
echo "4. Find 'Replit' → Verify 'repo' permission"
echo "5. Try import again"
echo ""

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}OPTION 3: Manual Setup (NO PERMISSIONS NEEDED)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Create new Node.js Repl manually"
echo "2. Run this command:"
echo ""
echo -e "${GREEN}curl -o REPLIT_MANUAL_SETUP.sh https://raw.githubusercontent.com/redinc23/letters-app/main/REPLIT_MANUAL_SETUP.sh${NC}"
echo -e "${GREEN}bash REPLIT_MANUAL_SETUP.sh${NC}"
echo ""
echo -e "${GREEN}This bypasses ALL GitHub permissions!${NC}"
echo ""

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}💡 RECOMMENDED: Try Option 1 first (fastest)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

