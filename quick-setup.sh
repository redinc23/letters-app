#!/bin/bash
# Ultra-quick setup - runs everything and shows secrets
echo "🚀 Starting Quick Setup..."
echo ""
bash setup-replit-auto.sh
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 YOUR SECRETS (saved to .replit-secrets.txt):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
if [ -f ".replit-secrets.txt" ]; then
    cat .replit-secrets.txt
else
    echo "⚠️  Secrets file not found. Run setup-replit-auto.sh first."
fi

