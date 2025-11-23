#!/bin/bash

###############################################################################
# DO IT ALL - Complete Automation Script
# This script does EVERYTHING: GitHub setup, push, and gives you Replit steps
# Run: bash DO_IT_ALL.sh
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
║          DO IT ALL - Complete Automation                      ║
║                                                               ║
║     GitHub Setup → Push → Replit Instructions                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in project root!${NC}"
    echo "Please run this from the letters-app directory"
    exit 1
fi

echo -e "${BLUE}✓ Project root detected${NC}\n"

# Check git status
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    git branch -M main
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    echo -e "${YELLOW}Found uncommitted changes. Committing...${NC}"
    git add -A
    git commit -m "Auto-commit before push to GitHub" || true
fi

# Check for remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}No GitHub remote found. Let's set it up!${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "First, create a GitHub repository:"
    echo ""
    echo "1. Go to: ${BLUE}https://github.com/new${NC}"
    echo "2. Repository name: ${GREEN}letters-app${NC}"
    echo "3. Click 'Create repository'"
    echo ""
    read -p "Have you created the GitHub repo? (y/n): " REPO_CREATED
    
    if [ "$REPO_CREATED" != "y" ]; then
        echo ""
        echo -e "${YELLOW}Please create the repo first, then run this script again.${NC}"
        echo ""
        echo "Or if you already have the repo URL, paste it here:"
        read -p "GitHub repo URL: " REPO_URL
        if [ -n "$REPO_URL" ]; then
            git remote add origin "$REPO_URL"
            echo -e "${GREEN}✓ Remote added${NC}"
        else
            exit 0
        fi
    else
        echo ""
        read -p "Enter your GitHub username: " GITHUB_USER
        read -p "Enter repo name (default: letters-app): " REPO_NAME
        REPO_NAME=${REPO_NAME:-letters-app}
        
        REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
        
        echo ""
        echo -e "${BLUE}Adding remote: ${REPO_URL}${NC}"
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✓ Remote added${NC}"
    fi
else
    echo -e "${GREEN}✓ GitHub remote found: ${REMOTE_URL}${NC}"
fi

# Push to GitHub
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Pushing to GitHub...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

REMOTE_URL=$(git remote get-url origin)
REPO_URL=$(echo "$REMOTE_URL" | sed 's/\.git$//' | sed 's|git@github.com:|https://github.com/|')

echo -e "${BLUE}Pushing to: ${REPO_URL}${NC}"
echo ""

if git push -u origin main 2>&1; then
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                               ║${NC}"
    echo -e "${GREEN}║              ✅ PUSHED TO GITHUB!                            ║${NC}"
    echo -e "${GREEN}║                                                               ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
else
    echo ""
    echo -e "${YELLOW}Push failed. This might be because:${NC}"
    echo "  - Repo doesn't exist yet"
    echo "  - Authentication needed"
    echo "  - Wrong URL"
    echo ""
    echo "Your repo URL: ${REPO_URL}"
    echo ""
    echo "Please:"
    echo "1. Make sure the repo exists at: ${REPO_URL}"
    echo "2. Set up GitHub authentication if needed"
    echo "3. Run this script again"
    exit 1
fi

# Create final instructions
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📋 NEXT STEPS - Import to Replit${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cat > REPLIT_IMPORT_INSTRUCTIONS.txt << EOF
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║          IMPORT TO REPLIT - COPY THIS URL                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Your GitHub Repo URL:
${REPO_URL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Steps:

1. Go to: https://replit.com
2. Click "Create Repl"
3. Click "Import from GitHub"
4. Paste this URL: ${REPO_URL}
5. Click "Import"
6. Once imported, run: bash DO_EVERYTHING.sh
7. Add the 3 secrets it shows you
8. Click "Run"

Done! 🎉

EOF

cat REPLIT_IMPORT_INSTRUCTIONS.txt

echo ""
echo -e "${GREEN}✓ Instructions saved to: REPLIT_IMPORT_INSTRUCTIONS.txt${NC}"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 ALL DONE!${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Your code is now on GitHub!"
echo ""
echo "Next: Import to Replit using the URL above"
echo ""

