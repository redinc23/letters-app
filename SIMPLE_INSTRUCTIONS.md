# 🎯 Simple Instructions - Deploy Letters App on Replit

**Just follow these 3 steps!**

---

## Step 1: Run the Setup Script

In your Replit shell, type:

```bash
bash setup-replit-auto.sh
```

**Wait for it to finish** (takes 2-5 minutes)

---

## Step 2: Add Secrets

After the script finishes:

1. **Click the 🔒 Secrets tab** (lock icon in the left sidebar)

2. **Click "New secret"** and add these 3 secrets:

   **Secret 1:**
   - Key: `DATABASE_URL`
   - Value: `file:./dev.db`

   **Secret 2:**
   - Key: `NEXTAUTH_URL`
   - Value: `https://your-repl-name.yourusername.replit.dev`
     *(Use your actual Repl URL - it's shown in the script output)*

   **Secret 3:**
   - Key: `NEXTAUTH_SECRET`
   - Value: *(Copy from the script output or from `.replit-secrets.txt` file)*

3. **Click "Add secret"** after each one

**💡 Tip:** All secrets are saved in `.replit-secrets.txt` file - just open it and copy!

---

## Step 3: Start Your App

Click the **"Run"** button in Replit, or type:

```bash
npm run dev
```

**That's it!** Your app will be live at your Repl URL.

---

## 🆘 Need Help?

- **Secrets file:** Open `.replit-secrets.txt` to see all secrets
- **Full guide:** See `REPLIT_DEPLOYMENT.md`
- **Quick reference:** See `REPLIT_QUICK_START.md`

---

## ✅ Checklist

- [ ] Ran `bash setup-replit-auto.sh`
- [ ] Added 3 secrets to Secrets tab
- [ ] Clicked "Run" or ran `npm run dev`
- [ ] App is accessible at your URL

**Done! 🎉**

