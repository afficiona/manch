# Deployment Guide for Manch

## Backend Deployment to Fly.io

### Prerequisites
1. Install Fly CLI: `brew install flyctl` (macOS) or visit https://fly.io/docs/hands-on/install-flyctl/
2. Login to Fly.io: `flyctl auth login`

### Initial Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Launch the app (first time only):
```bash
flyctl launch --config fly.toml
```

3. Create a persistent volume for SQLite database (if not created):
```bash
flyctl volumes create manch_db --region sjc --size 1
```

4. Set environment secrets:
```bash
flyctl secrets set GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
flyctl secrets set GOOGLE_CLIENT_SECRET=your-google-client-secret
flyctl secrets set GOOGLE_CALLBACK_URL=https://your-app.fly.dev/api/auth/google/callback
flyctl secrets set JWT_SECRET=your-random-secret-key-here
```

### Deploy Updates
```bash
cd backend
flyctl deploy
```

### View Logs
```bash
flyctl logs
```

### Access App
```bash
flyctl open
```

## Frontend Deployment to Vercel

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`

### Initial Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in Vercel dashboard or via CLI:
```bash
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://your-backend-app.fly.dev
```

### Deploy Updates
```bash
cd frontend
vercel --prod
```

## Environment Variables

### Backend (.env)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_CALLBACK_URL`: OAuth callback URL (production: https://your-app.fly.dev/api/auth/google/callback)
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Port number (auto-set by Fly.io to 3000)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL (production: https://your-backend-app.fly.dev)

## Post-Deployment

1. Update CORS origins in `backend/src/main.ts` to include production URLs
2. Update Google OAuth settings to include production callback URL
3. Test authentication flow in production
