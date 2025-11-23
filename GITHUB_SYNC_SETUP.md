# 🔄 GitHub Sync Setup for Replit

## Quick Setup Guide

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Replit Sync`
4. Expiration: 90 days (or No expiration)
5. Select scopes:
   - ✅ **`repo`** (Full control of private repositories)
   - ✅ **`workflow`** (optional, for GitHub Actions)
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)

### Step 2: Add Token to Replit Secrets

1. In Replit, click the **🔒 Secrets** tab
2. Click **"New secret"**
3. Add:
   - **Key:** `GITHUB_TOKEN`
   - **Value:** `paste_your_token_here`
4. Click **"Add secret"**

### Step 3: Run Setup Script

In Replit shell, run:

```bash
bash setup-github-sync.sh
```

This will:
- ✅ Configure git
- ✅ Set up GitHub remote with token
- ✅ Create auto-sync script
- ✅ Test the connection

### Step 4: Sync Changes

**Manual sync:**
```bash
bash auto-sync-github.sh
```

**Auto-sync every 5 minutes:**
```bash
watch -n 300 bash auto-sync-github.sh
```

## Troubleshooting

### Token not found?
- Make sure `GITHUB_TOKEN` is in Replit Secrets
- Restart Replit to refresh environment variables
- Or manually set: `export GITHUB_TOKEN=your_token`

### Push fails?
- Verify token has `repo` scope
- Check token isn't expired
- Run setup again: `bash setup-github-sync.sh`

### Git not configured?
- Run: `git config --global user.name "Your Name"`
- Run: `git config --global user.email "your@email.com"`

## Files Created

- `setup-github-sync.sh` - One-time setup script
- `auto-sync-github.sh` - Sync script (run this to push changes)

## Repository

Your code syncs to: https://github.com/redinc23/letters-app

---

**That's it!** Your Replit changes will now sync to GitHub automatically! 🎉

