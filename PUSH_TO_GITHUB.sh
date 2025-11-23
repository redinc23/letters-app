#!/bin/bash

###############################################################################
# Push Letters App to GitHub - Then Import to Replit
# This script helps you push everything to GitHub
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║          Push Letters App to GitHub                           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    git branch -M main
fi

# Check for remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
    echo -e "${YELLOW}No GitHub remote found.${NC}"
    echo ""
    echo "To create a GitHub repo and push:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'letters-app'"
    echo "3. Copy the repository URL"
    echo "4. Run: git remote add origin YOUR_REPO_URL"
    echo "5. Run this script again"
    echo ""
    read -p "Do you have a GitHub repo URL? (y/n): " HAS_REPO
    
    if [ "$HAS_REPO" = "y" ]; then
        read -p "Enter your GitHub repo URL: " REPO_URL
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✓ Remote added${NC}"
    else
        echo ""
        echo "Create a repo at https://github.com/new first, then run:"
        echo "  git remote add origin YOUR_REPO_URL"
        echo "  bash PUSH_TO_GITHUB.sh"
        exit 0
    fi
fi

# Show current status
echo -e "${BLUE}Current git status:${NC}"
git status --short

echo ""
read -p "Commit and push all changes? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled."
    exit 0
fi

# Add all files
echo -e "${BLUE}Adding all files...${NC}"
git add -A

# Commit
echo -e "${BLUE}Committing...${NC}"
git commit -m "Add Replit deployment automation and setup scripts

- Add DO_EVERYTHING.sh for zero-config deployment
- Add comprehensive Replit deployment guides
- Add setup scripts and helper files
- Update README with deployment instructions
- Add .replit configuration
- Add replit.nix for dependencies"

# Push
echo -e "${BLUE}Pushing to GitHub...${NC}"
git push -u origin main

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}║              ✅ PUSHED TO GITHUB!                             ║${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

REMOTE_URL=$(git remote get-url origin)
echo -e "${BLUE}Your repo: ${NC}${REMOTE_URL}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Go to Replit"
echo "2. Click 'Create Repl'"
echo "3. Select 'Import from GitHub'"
echo "4. Paste this URL: ${REMOTE_URL}"
echo "5. Click 'Import'"
echo "6. Run: bash DO_EVERYTHING.sh"
echo ""
echo -e "${GREEN}Done! 🎉${NC}"

