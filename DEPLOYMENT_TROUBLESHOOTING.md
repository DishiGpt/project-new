# Deployment Troubleshooting Checklist

## Issue: Data Not Visible After Deployment

### ✅ Step 1: Verify Backend Environment Variables

**On your deployment platform (Vercel/Render/Railway/Heroku), ensure you set:**

```bash
MONGODB_URI=mongodb+srv://dishi2023cse_db_user:il71DLlmnruXLzcg@cluster0.qc7dfnf.mongodb.net/
NODE_ENV=production
PORT=3000
SECRET_KEY=your_jwt_secret_here
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
FRONTEND_URL=https://your-deployed-frontend-url.vercel.app
```

**CRITICAL:** Use `MONGODB_URI` (not `MONGO_URI`) as the code reads this variable first.

---

### ✅ Step 2: Verify Frontend Environment Variable

**On your frontend deployment platform (Vercel/Netlify), set:**

```bash
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

**Example:**
```bash
VITE_API_BASE_URL=https://ignitex-backend.onrender.com
```

**Without this, the frontend will try to call localhost:3000 which doesn't exist in production!**

---

### ✅ Step 3: Check MongoDB Atlas Network Access

1. Go to https://cloud.mongodb.com
2. Navigate to: **Network Access** (left sidebar)
3. Make sure you have one of:
   - `0.0.0.0/0` (Allow access from anywhere) - for testing
   - Your deployment platform's IP addresses

**If you see connection errors, add `0.0.0.0/0` temporarily.**

---

### ✅ Step 4: Verify CORS Configuration

Check `backend/index.js` - ensure it has:

```javascript
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));
```

**Make sure `FRONTEND_URL` environment variable matches your deployed frontend URL exactly!**

---

### ✅ Step 5: Check Backend Logs

**On Render/Railway/Heroku:**
- Go to your backend service dashboard
- Click "Logs" or "Console"
- Look for:
  - ✅ "MongoDB Connected: ..." (good)
  - ❌ "MongoDB connection failed" (bad - check MONGODB_URI)
  - ❌ "ENOTFOUND" or "Network error" (bad - check Atlas IP whitelist)

---

### ✅ Step 6: Test Backend API Directly

Open in browser or use curl:
```
https://your-backend-url.onrender.com/api/v1/job/get
```

**Expected response:**
```json
{
  "jobs": [...],
  "success": true
}
```

**If you get:**
- 500 error → Backend can't connect to MongoDB
- CORS error → FRONTEND_URL not set correctly
- 404 error → Wrong URL or backend not deployed

---

### ✅ Step 7: Check Frontend Console

1. Open deployed frontend in browser
2. Press F12 → Console tab
3. Look for errors like:
   - `Failed to fetch` → Backend URL not set
   - `CORS error` → CORS not configured properly
   - `500 Internal Server Error` → Backend database issue

---

## Quick Fix Commands

### For Vercel Frontend:
```bash
# Set environment variable
vercel env add VITE_API_BASE_URL

# Redeploy
vercel --prod
```

### For Render Backend:
1. Dashboard → Environment
2. Add `MONGODB_URI` with your Atlas connection string
3. Add `FRONTEND_URL` with your Vercel URL
4. Click "Save" → Service will auto-redeploy

---

## Common Mistakes:

❌ Forgot to set `VITE_API_BASE_URL` on frontend
❌ Used `MONGO_URI` instead of `MONGODB_URI`
❌ Forgot to whitelist `0.0.0.0/0` in MongoDB Atlas
❌ `FRONTEND_URL` doesn't match actual frontend URL
❌ Missing `NODE_ENV=production` on backend

---

## Where is Your Data?

Your data is in MongoDB Atlas:
- Database: `test`
- Collections: Users (4), Companies (16), Jobs (62), Applications (2)

**The data EXISTS - it's a connection/configuration issue!**

---

## Need More Help?

Tell me:
1. **Where did you deploy?** (Vercel/Render/Railway/Heroku/Other)
2. **What error do you see?** (Check browser console F12)
3. **Backend URL?** (e.g., https://your-app.onrender.com)
4. **Frontend URL?** (e.g., https://your-app.vercel.app)

I'll help you debug specifically!
