# Manch - Social Media Platform

A complete social media platform with user authentication, posts, feeds, and OAuth provider capabilities.

## Features

- User authentication (email/password + Google OAuth)
- Create and view posts
- User feed with latest posts
- OAuth 2.0 provider for third-party applications
- Clean indigo/purple themed UI

## Tech Stack

- **Backend**: NestJS, SQLite, Passport.js, OAuth 2.0
- **Frontend**: Next.js, TypeScript, Tailwind CSS

## Project Structure

```
manch-project/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── database/          # Database service
│   │   ├── oauth/             # OAuth provider endpoints
│   │   ├── posts/             # Posts module
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
└── frontend/         # Next.js web application
    ├── app/
    │   ├── feed/              # Main feed page
    │   ├── login/             # Login page
    │   ├── register/          # Registration page
    │   └── oauth/authorize/   # OAuth authorization page
    ├── lib/
    │   └── api.ts             # API client
    └── package.json
```

## Setup

### Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Google OAuth credentials to `.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
   JWT_SECRET=your_jwt_secret
   NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

5. Start the backend:
   ```bash
   npm run dev
   ```

Backend runs on http://localhost:3000

### Frontend

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

Frontend runs on http://localhost:3002

## Usage

1. **Register**: Create a new account at http://localhost:3002/register
2. **Login**: Login with email/password or Google OAuth
3. **Create Posts**: Share your thoughts on the feed
4. **View Feed**: See posts from all users
5. **OAuth Provider**: Allow third-party apps like Prasaran to connect

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Posts
- `POST /api/posts` - Create new post
- `GET /api/posts` - Get all posts (feed)
- `GET /api/posts/user/:userId` - Get user's posts

### OAuth Provider
- `GET /api/oauth/authorize` - OAuth authorization endpoint
- `POST /api/oauth/authorize/approve` - Approve OAuth request
- `POST /api/oauth/token` - Exchange code for access token
- `GET /api/oauth/userinfo` - Get user info with access token

## OAuth Provider Flow

Manch acts as an OAuth 2.0 provider, allowing applications like Prasaran to:

1. Request authorization from users
2. Receive authorization codes
3. Exchange codes for access tokens
4. Use access tokens to publish posts on behalf of users

### OAuth Clients

Pre-configured OAuth clients (in database):
- **Prasaran**: Client ID `prasaran-client-id`, Secret `prasaran-client-secret`

Add new clients directly in the database or create an admin UI.

## Database Schema

### Users
- `id`, `email`, `password_hash`, `google_id`, `created_at`

### Posts
- `id`, `user_id`, `content`, `created_at`

### OAuth Clients
- `id`, `name`, `client_id`, `client_secret`, `redirect_uris`, `created_at`

### OAuth Authorization Codes
- `code`, `client_id`, `user_id`, `redirect_uri`, `expires_at`, `created_at`

### OAuth Access Tokens
- `token`, `client_id`, `user_id`, `expires_at`, `created_at`

## Color Theme

- Primary: Indigo (`indigo-600`, `indigo-700`)
- Secondary: Purple (`purple-600`, `purple-700`)
- Accents: Indigo gradients

## License

ISC
