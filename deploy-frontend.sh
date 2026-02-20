#!/bin/bash

# Deploy frontend to Vercel
echo "Deploying Manch frontend to Vercel..."

cd frontend

# Deploy to production
vercel --prod

echo "Frontend deployment complete!"
