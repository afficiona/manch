#!/bin/bash

# Deploy backend to Fly.io
echo "Deploying Manch backend to Fly.io..."

cd backend

# Deploy
flyctl deploy

echo "Backend deployment complete!"
echo "View logs: flyctl logs"
echo "Open app: flyctl open"
