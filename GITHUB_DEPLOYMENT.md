# 🚀 Deploy IgniteX via GitHub

## **Quick Setup Guide**

Your repository is already on GitHub! Now let's deploy it automatically.

---

## **Step-by-Step Deployment**

### **Step 1: Setup MongoDB Atlas** (5 minutes)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create **FREE Cluster** (M0)
4. **Database Access**:
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate strong password (save it!)
   - Role: Atlas Admin
5. **Network Access**:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Add: `0.0.0.0/0`
6. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Should look like: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ignitex?retryWrites=true&w=majority`

---

### **Step 2: Deploy Backend on Render** (5 minutes)

1. Go to [render.com](https://render.com)
2. Sign up with **GitHub account**
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect account"** → Select **GitHub**
5. Find and select your repository: **`DishiGpt/project-new`**
6. Configure:
   ```
   Name: ignitex-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

7. **Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   PORT = 3000
   MONGO_URI = <paste your MongoDB connection string>
   SECRET_KEY = your_super_secret_jwt_key_12345
   CLOUD_NAME = <your cloudinary cloud name>
   API_KEY = <your cloudinary api key>
   API_SECRET = <your cloudinary api secret>
   NODE_ENV = production
   FRONTEND_URL = https://ignitex.vercel.app
   ```

8. Click **"Create Web Service"**
9. Wait for deployment (2-3 minutes)
10. **Copy your backend URL**: `https://ignitex-backend.onrender.com`

---

### **Step 3: Deploy Frontend on Vercel** (5 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with **GitHub account**
3. Click **"Add New..."** → **"Project"**
4. Import **`DishiGpt/project-new`**
5. Configure:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

6. **Environment Variables**:
   ```
   VITE_API_BASE_URL = https://ignitex-backend.onrender.com
   ```
   *(Replace with YOUR backend URL from Step 2)*

7. Click **"Deploy"**
8. Wait for deployment (1-2 minutes)
9. Your site is live! 🎉

---

### **Step 4: Update Backend FRONTEND_URL**

1. Go back to **Render Dashboard**
2. Click your backend service
3. Go to **"Environment"**
4. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://ignitex.vercel.app`)
5. Click **"Save Changes"**
6. Service will automatically redeploy

---

### **Step 5: Setup GitHub Actions (Optional - Auto Deploy)**

1. Get Vercel Token:
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create new token
   - Copy token

2. Get Render Deploy Hook:
   - Render Dashboard → Your Service → Settings
   - Scroll to "Deploy Hook"
   - Copy the webhook URL

3. Add Secrets to GitHub:
   - Go to your repo: `github.com/DishiGpt/project-new`
   - Click **"Settings"** → **"Secrets and variables"** → **"Actions"**
   - Click **"New repository secret"**
   - Add:
     ```
     VERCEL_TOKEN = <your vercel token>
     RENDER_DEPLOY_HOOK = <your render webhook>
     ```

4. Now every push to `main` will auto-deploy! 🚀

---

## **🎯 Your Live URLs**

After deployment, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **GitHub Repo**: `https://github.com/DishiGpt/project-new`

---

## **🧪 Testing Your Deployment**

1. Visit your Vercel URL
2. Click **"Get Started"** to sign up
3. Create an account
4. Try:
   - Browsing jobs
   - Bookmarking jobs
   - Viewing saved jobs
   - Updating profile

---

## **⚠️ Important Notes**

### **Render Free Tier Limitations:**
- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-50 seconds
- **750 hours/month free** (enough for one service 24/7)

### **Vercel Free Tier:**
- Unlimited bandwidth
- Automatic HTTPS
- Fast global CDN

### **Solutions for Render Spin-down:**
1. Use [cron-job.org](https://cron-job.org) to ping your backend every 14 minutes
2. Upgrade to paid plan ($7/month) for always-on
3. Use Railway instead (more generous free tier)

---

## **🐛 Troubleshooting**

### **CORS Error:**
```
Update FRONTEND_URL in Render to match your Vercel URL
```

### **MongoDB Connection Failed:**
```
- Check connection string has correct password
- Verify IP whitelist is 0.0.0.0/0
- Make sure database user has read/write permissions
```

### **Backend Not Loading:**
```
- Render takes 30-50 seconds on first load (free tier)
- Check Render logs for errors
- Verify all environment variables are set
```

### **Jobs Not Showing:**
```
- Open browser DevTools (F12) → Console
- Check for API errors
- Verify VITE_API_BASE_URL is set correctly
```

---

## **💰 Cost Breakdown**

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | **FREE** |
| Render | Free | **FREE** |
| MongoDB Atlas | M0 | **FREE** |
| Cloudinary | Free | **FREE** |
| **Total** | | **$0/month** 🎉 |

---

## **🔄 Manual Deploy (If GitHub Actions Fails)**

### **Frontend:**
```bash
cd frontend
npm install
npm run build
# Upload dist folder to Vercel manually
```

### **Backend:**
Render auto-deploys from GitHub - just push to main!

---

## **📝 Post-Deployment Checklist**

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set
- [ ] CORS configured (FRONTEND_URL updated)
- [ ] Test signup/login
- [ ] Test job bookmarking
- [ ] Check mobile responsiveness
- [ ] Share your live URL! 🚀

---

## **🎨 Custom Domain (Optional)**

### **For Frontend (Vercel):**
1. Buy domain from Namecheap/GoDaddy
2. Vercel Dashboard → Your Project → Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. Wait 5-30 minutes for propagation

### **For Backend (Render):**
- Custom domains require paid plan ($7/month)
- Or use subdomain: `api.yourdomain.com`

---

## **Need Help?**

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **MongoDB Docs**: [docs.mongodb.com](https://docs.mongodb.com)

---

**Ready to deploy?** Start with Step 1! 🚀
