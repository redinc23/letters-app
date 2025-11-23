#!/bin/bash

###############################################################################
# Auto-sync Replit changes to GitHub
# Run this periodically: bash auto-sync-github.sh
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔄 Syncing to GitHub...${NC}"

# Navigate to project root
cd letters-app-main 2>/dev/null || cd . 2>/dev/null || true

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Run setup-github-sync.sh first${NC}"
    exit 1
fi

# Update remote URL if GITHUB_TOKEN is available
if [ -n "${GITHUB_TOKEN:-}" ]; then
    git remote set-url origin "https://${GITHUB_TOKEN}@github.com/redinc23/letters-app.git" 2>/dev/null || true
fi

# Check for changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ No changes to commit${NC}"
    exit 0
fi

# Add all changes
echo -e "${BLUE}📝 Staging changes...${NC}"
git add -A

# Commit
echo -e "${BLUE}💾 Committing...${NC}"
COMMIT_MSG="Auto-sync from Replit: $(date '+%Y-%m-%d %H:%M:%S')"
if git commit -m "$COMMIT_MSG" 2>&1; then
    echo -e "${GREEN}✅ Committed changes${NC}"
else
    echo -e "${YELLOW}⚠️  Nothing to commit${NC}"
    exit 0
fi

# Push
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
if git push origin main 2>&1; then
    echo -e "${GREEN}✅ Successfully synced to GitHub!${NC}"
    echo -e "${GREEN}   View at: https://github.com/redinc23/letters-app${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    echo -e "${YELLOW}💡 Try running: bash setup-github-sync.sh${NC}"
    exit 1
fi

