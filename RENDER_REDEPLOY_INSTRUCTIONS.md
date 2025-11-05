# 🚀 Render Redeploy Instructions - URGENT

## Problem
The backend on Render is serving old code with incorrect CORS settings. This is causing the frontend to fail with CORS errors, preventing jobs from loading.

**Error in Console:**
```
Access to XMLHttpRequest at 'https://ignitex-e9n0.onrender.com/api/v1/job/get' 
from origin 'https://ignitex-tawny.vercel.app' has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:5173' 
that is not equal to the supplied origin.
```

---

## ✅ Solution: Manual Redeploy on Render

### Step-by-Step Instructions:

1. **Go to Render Dashboard**
   - Open: https://dashboard.render.com
   - Log in with your credentials

2. **Find the Backend Service**
   - Look for service named: `ignitex-e9n0` (or similar backend service name)
   - Click on it to open the service details

3. **Trigger Manual Deploy**
   - Look at the top-right corner
   - Click the **"Manual Deploy"** button (or "Deploy" dropdown)
   - Select **"Deploy latest commit"**
   - OR select **"Clear build cache & deploy"** (if you want to be extra sure)

4. **Wait for Deployment**
   - Watch the deployment logs
   - Wait 2-3 minutes for it to complete
   - Status should change from "Deploying..." to "Live" (green indicator)

5. **Verify It's Working**
   - Once status shows "Live", open the frontend: https://ignitex-tawny.vercel.app
   - Jobs should now load successfully! ✅
   - No more CORS errors in the browser console

---

## 🔍 How to Check If Auto-Deploy is Enabled

While you're in the Render service dashboard:

1. Scroll down to **"Settings"** section (or click "Settings" tab)
2. Look for **"Auto-Deploy"** setting
3. It will show either:
   - ✅ **Yes** - Render automatically deploys when you push to GitHub
   - ❌ **No** - You need to manually deploy each time

### Recommendation:
If Auto-Deploy is **OFF**, turn it **ON**:
- Set **Auto-Deploy: Yes**
- Set **Branch: main**
- Click **Save Changes**

This way, future code updates will automatically deploy without manual intervention.

---

## 📊 What Was Fixed in the Latest Code?

The latest commits include:

1. **CORS Fix** (commit `a6702f1`):
   - Added `https://ignitex-tawny.vercel.app` to allowed origins
   - Backend will now accept requests from the Vercel frontend

2. **Frontend API Config Fix** (commit `015feb7`):
   - Updated frontend to use consistent `VITE_API_BASE_URL` environment variable
   - Ensures all API endpoints point to the correct backend

3. **Trigger Commit** (commit `2f9bee9`):
   - Empty commit to trigger auto-deploy (if enabled)

---

## ❓ Troubleshooting

### If deployment fails:
- Check the **"Logs"** tab in Render dashboard for error messages
- Common issues:
  - Missing environment variables (check **Settings** → **Environment**)
  - Build errors (check build logs)

### If deployment succeeds but CORS still fails:
1. **Hard refresh** the frontend: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Clear browser cache** and reload
3. Check browser console - the CORS error should mention the correct origin now

### Required Environment Variables on Render:
Make sure these are set in Render (Settings → Environment):
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Set to `https://ignitex-tawny.vercel.app`
- `SECRET_KEY` - Your JWT secret key
- `CLOUD_NAME`, `API_KEY`, `API_SECRET` - Cloudinary credentials (if using)

---

## 📞 Need Help?

If you encounter any issues:
1. Check the deployment logs in Render
2. Verify all environment variables are set correctly
3. Try "Clear build cache & deploy" instead of regular deploy
4. Contact the developer who set up the original deployment

---

## ✨ Expected Result

After successful redeploy:
- ✅ Frontend loads without CORS errors
- ✅ All 62 jobs are visible on the homepage
- ✅ Job filters work correctly
- ✅ User authentication works
- ✅ All API endpoints respond correctly

**Current Status:** Backend is live but serving old code. Frontend cannot load data due to CORS mismatch.

**After Redeploy:** Everything works perfectly! 🎉

---

*Created: November 5, 2025*
*Issue: CORS blocking frontend from accessing backend API*
*Solution: Redeploy Render backend with latest CORS configuration*
