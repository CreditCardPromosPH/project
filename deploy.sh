#!/bin/bash

# Check if there are any changes
if [ -n "$(git status --porcelain)" ]; then
  echo "Changes detected. Committing and pushing..."
  
  # Add all changes
  git add .
  
  # Commit with the provided message or a default one
  if [ -z "$1" ]; then
    git commit -m "Update: $(date +'%Y-%m-%d %H:%M:%S')"
  else
    git commit -m "$1"
  fi
  
  # Push to main branch
  git push origin main
  
  echo "✅ Changes pushed to repository"
  echo "🔄 Vercel will automatically start a new deployment"
else
  echo "No changes detected. Nothing to commit."
fi 