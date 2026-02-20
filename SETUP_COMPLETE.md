# Manch Deployment Setup Complete! 🚀

## What's Been Set Up

### Backend (Fly.io)
✅ **Dockerfile** - Optimized multi-stage build for Node.js
✅ **fly.toml** - Fly.io configuration with persistent volume for SQLite
✅ **.dockerignore** - Excludes unnecessary files from Docker builds
✅ **Database path** - Configured to use persistent storage on Fly.io
✅ **.gitignore** - Updated to exclude Fly.io temporary files

### Frontend (Vercel)
✅ **vercel.json** - Vercel deployment configuration
✅ **.env.example** - Environment variable template

### Deployment Scripts
✅ **deploy-backend.sh** - Quick backend deployment to Fly.io
✅ **deploy-frontend.sh** - Quick frontend deployment to Vercel
✅ **DEPLOYMENT.md** - Comprehensive deployment guide

## Next Steps

### 1. Install Required Tools

**Fly.io CLI:**
```bash
brew install flyctl  # macOS
# or visit: https://fly.io/docs/hands-on/install-flyctl/
```

**Vercel CLI:**
```bash
npm i -g vercel
```

### 2. Deploy Backend to Fly.io

```bash
# Login to Fly.io
flyctl auth login

# Navigate to backend
cd backend

# Create and deploy the app
flyctl launch --config fly.toml

# Set environment secrets
flyctl secrets set GOOGLE_CLIENT_ID=your-google-client-id
flyctl secrets set GOOGLE_CLIENT_SECRET=your-google-client-secret
flyctl secrets set JWT_SECRET=your-jwt-secret
flyctl secrets set GOOGLE_CALLBACK_URL=https://your-app-name.fly.dev/api/auth/google/callback

# Create persistent volume for database
flyctl volumes create manch_db --region sjc --size 1

# Deploy
flyctl deploy
```

### 3. Deploy Frontend to Vercel

```bash
# Login to Vercel
vercel login

# Navigate to frontend
cd frontend

# Deploy
vercel

# Set production environment variable
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://your-backend-app.fly.dev

# Deploy to production
vercel --prod
```

### 4. Update CORS Configuration

After getting your production URLs, update `backend/src/main.ts` to include them in the CORS origins:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000', 'http://localhost:3002', // Manch
    'https://your-frontend.vercel.app', // Production frontend
    // ... other origins
  ],
  credentials: true,
});
```

### 5. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth credentials
3. Add authorized redirect URIs:
   - `https://your-backend-app.fly.dev/api/auth/google/callback`
4. Add authorized JavaScript origins:
   - `https://your-frontend.vercel.app`

### 6. Update OAuth Client Seeds

Update the seeded OAuth clients in `backend/src/database/database.service.ts` to include production redirect URIs.

## Quick Commands

**Deploy Backend:**
```bash
./deploy-backend.sh
```

**Deploy Frontend:**
```bash
./deploy-frontend.sh
```

**View Backend Logs:**
```bash
cd backend && flyctl logs
```

**Open Backend App:**
```bash
cd backend && flyctl open
```

## Environment Variables Reference

### Backend (Fly.io Secrets)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - OAuth callback URL (https://your-app.fly.dev/api/auth/google/callback)
- `JWT_SECRET` - Random secret for JWT signing
- `DATABASE_PATH` - Auto-set to /app/data/manch.db via fly.toml

### Frontend (Vercel Environment Variables)
- `NEXT_PUBLIC_API_URL` - Backend API URL (https://your-backend-app.fly.dev)

## Important Notes

- **Database Persistence**: SQLite data is stored on a persistent volume at `/app/data/manch.db`
- **Auto-scaling**: Backend is configured to auto-stop and auto-start to save costs
- **Memory**: Backend runs with 256MB RAM (sufficient for small-medium traffic)
- **HTTPS**: Both deployments force HTTPS in production
- **CORS**: Remember to add production URLs to CORS configuration

## Troubleshooting

**Backend not starting on Fly.io:**
```bash
flyctl logs
flyctl ssh console
```

**Database issues:**
```bash
# Check volume
flyctl volumes list

# SSH into container and check database
flyctl ssh console
ls -la /app/data/
```

**Frontend build failing on Vercel:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set

## Resources

- [Fly.io Documentation](https://fly.io/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NestJS Documentation](https://docs.nestjs.com/)
