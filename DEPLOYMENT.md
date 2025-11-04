# IgniteX Deployment Guide 🚀

## Quick Deploy (Recommended)

### Option 1: Vercel + Render (FREE)

#### Step 1: Deploy Backend on Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ignitex-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

5. Add Environment Variables:
   ```
   PORT=3000
   MONGO_URI=<your_mongodb_atlas_uri>
   SECRET_KEY=<your_jwt_secret>
   CLOUD_NAME=<your_cloudinary_name>
   API_KEY=<your_cloudinary_key>
   API_SECRET=<your_cloudinary_secret>
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```

6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://ignitex-backend.onrender.com`)

#### Step 2: Deploy Frontend on Vercel

1. Go to https://vercel.com and sign up
2. Click "New Project"
3. Import your repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://ignitex-backend.onrender.com
   ```

6. Click "Deploy"
7. Your app will be live at `https://your-app.vercel.app`

---

## MongoDB Atlas Setup

1. Go to https://mongodb.com/cloud/atlas
2. Create a free cluster
3. Create Database User:
   - Username: `admin`
   - Password: (generate strong password)
4. Network Access:
   - Click "Add IP Address"
   - Allow access from anywhere: `0.0.0.0/0`
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

---

## Testing Your Deployment

1. Visit your Vercel URL
2. Sign up for a new account
3. Try creating jobs (if recruiter)
4. Test bookmarking jobs
5. Check saved jobs page

---

## Troubleshooting

### CORS Error:
- Make sure `FRONTEND_URL` in backend matches your Vercel URL
- Check backend CORS configuration in `index.js`

### API Not Working:
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check backend is running on Render
- Look at backend logs on Render

### Database Connection Failed:
- Verify MongoDB Atlas connection string
- Check IP whitelist (should be 0.0.0.0/0)
- Ensure database user has read/write permissions

---

## Cost Breakdown

- **Vercel**: FREE (Hobby plan)
- **Render**: FREE (Free tier with 750 hours/month)
- **MongoDB Atlas**: FREE (512MB storage)
- **Cloudinary**: FREE (25 credits/month)

**Total: $0/month** 🎉

---

## Custom Domain (Optional)

1. Buy domain from Namecheap/GoDaddy
2. In Vercel: Settings → Domains → Add domain
3. Follow DNS configuration steps
4. Wait for DNS propagation (5-30 minutes)

---

## Post-Deployment Checklist

- [ ] Backend is running on Render
- [ ] Frontend is deployed on Vercel
- [ ] MongoDB Atlas is connected
- [ ] Environment variables are set
- [ ] CORS is configured
- [ ] Test login/signup
- [ ] Test job creation
- [ ] Test bookmarking
- [ ] Check mobile responsiveness

---

Need help? Check the logs:
- **Render**: Dashboard → Your Service → Logs
- **Vercel**: Dashboard → Your Project → Deployments → View logs
