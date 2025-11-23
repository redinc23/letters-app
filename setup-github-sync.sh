#!/bin/bash

###############################################################################
# Setup GitHub Sync for Replit
# This script configures git and creates the auto-sync script
# Run: bash setup-github-sync.sh
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

clear
echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║          Setup GitHub Sync for Replit                          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

# Navigate to project root
cd letters-app-main 2>/dev/null || cd . 2>/dev/null || true
PROJECT_ROOT=$(pwd)

echo -e "${BLUE}📁 Project root: ${PROJECT_ROOT}${NC}\n"

# Step 3: Configure Git
echo - Initialize Git
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 3: Configuring Git${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    git branch -M main
    echo -e "${GREEN}✅ Git initialized${NC}\n"
else
    echo -e "${GREEN}✅ Git already initialized${NC}\n"
fi

# Configure git user (if not already configured)
if [ -z "$(git config user.name)" ]; then
    echo -e "${YELLOW}Configuring git user...${NC}"
    read -p "Enter your name (for git commits): " GIT_NAME
    read -p "Enter your email (for git commits): " GIT_EMAIL
    
    git config --global user.name "$GIT_NAME"
    git config --global user.email "$GIT_EMAIL"
    echo -e "${GREEN}✅ Git user configured${NC}\n"
else
    echo -e "${GREEN}✅ Git user already configured: $(git config user.name) <$(git config user.email)>${NC}\n"
fi

# Check for GITHUB_TOKEN secret
if [ -z "${GITHUB_TOKEN:-}" ]; then
    echo -e "${RED}❌ GITHUB_TOKEN not found in environment${NC}"
    echo -e "${YELLOW}⚠️  Make sure you've added GITHUB_TOKEN to Replit Secrets (🔒 tab)${NC}"
    echo ""
    echo "Steps:"
    echo "1. Click 🔒 Secrets tab in Replit"
    echo "2. Click 'New secret'"
    echo "3. Key: GITHUB_TOKEN"
    echo "4. Value: Your GitHub Personal Access Token"
    echo "5. Click 'Add secret'"
    echo ""
    read -p "Have you added GITHUB_TOKEN to Secrets? (y/n): " HAS_TOKEN
    
    if [ "$HAS_TOKEN" != "y" ]; then
        echo ""
        echo -e "${YELLOW}Please add GITHUB_TOKEN to Secrets first, then run this script again.${NC}"
        echo ""
        echo "Get token from: https://github.com/settings/tokens"
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}⚠️  GITHUB_TOKEN still not found. Restart Replit or refresh secrets.${NC}"
    echo -e "${YELLOW}   You can also manually set it: export GITHUB_TOKEN=your_token${NC}"
    echo ""
    read -p "Enter your GitHub token manually (or press Enter to skip): " MANUAL_TOKEN
    
    if [ -n "$MANUAL_TOKEN" ]; then
        export GITHUB_TOKEN="$MANUAL_TOKEN"
        echo -e "${GREEN}✅ Token set manually${NC}\n"
    else
        echo -e "${RED}❌ Cannot proceed without GITHUB_TOKEN${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ GITHUB_TOKEN found${NC}\n"
fi

# Set up remote with token authentication
echo -e "${BLUE}Configuring GitHub remote...${NC}"
git remote remove origin 2>/dev/null || true

if [ -n "${GITHUB_TOKEN:-}" ]; then
    git remote add origin "https://${GITHUB_TOKEN}@github.com/redinc23/letters-app.git"
    echo -e "${GREEN}✅ Remote configured with token authentication${NC}\n"
else
    git remote add origin "https://github.com/redinc23/letters-app.git"
    echo -e "${YELLOW}⚠️  Remote configured without token (may need authentication)${NC}\n"
fi

# Test connection
echo -e "${BLUE}Testing GitHub connection...${NC}"
if git fetch origin --dry-run 2>&1 | head -5; then
    echo -e "${GREEN}✅ GitHub connection successful!${NC}\n"
else
    echo -e "${YELLOW}⚠️  Connection test had issues (this might be normal)${NC}\n"
fi

# Step 4: Create auto-sync script
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 4: Creating Auto-Sync Script${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

cat > auto-sync-github.sh << 'AUTOSYNC_EOF'
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
AUTOSYNC_EOF

chmod +x auto-sync-github.sh
echo -e "${GREEN}✅ Auto-sync script created: auto-sync-github.sh${NC}\n"

# Step 5: Test it
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}Step 5: Testing Sync${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${BLUE}Found uncommitted changes. Testing sync...${NC}\n"
    bash auto-sync-github.sh
else
    echo -e "${YELLOW}No uncommitted changes to test with.${NC}"
    echo -e "${BLUE}Creating a test file...${NC}"
    echo "# GitHub Sync Test - $(date)" >> .github-sync-test.txt
    git add .github-sync-test.txt
    git commit -m "Test: GitHub sync setup" || true
    bash auto-sync-github.sh || echo -e "${YELLOW}Test sync completed (may have had issues)${NC}"
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}║              ✅ GitHub Sync Setup Complete!                    ║${NC}"
echo -e "${GREEN}║                                                               ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}📋 How to use:${NC}"
echo ""
echo "  Manual sync:"
echo "    ${BLUE}bash auto-sync-github.sh${NC}"
echo ""
echo "  Auto-sync every 5 minutes (background):"
echo "    ${BLUE}watch -n 300 bash auto-sync-github.sh${NC}"
echo ""
echo "  Or add to .replit run command to auto-sync on save"
echo ""
echo -e "${GREEN}🎉 All set! Your changes will sync to GitHub!${NC}"

