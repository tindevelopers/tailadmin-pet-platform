# GitHub Actions CI/CD Setup

This repository includes automated CI/CD workflows for the TailAdmin Pet Platform.

## Workflows

### CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Jobs:**
1. **Test & Build** - Runs on every push/PR
   - Installs dependencies
   - Runs linting (`npm run lint`)
   - Runs type checking (`npm run type-check`)
   - Builds the application (`npm run build`)

2. **Deploy Preview** - Runs on pull requests
   - Deploys to Vercel preview environment
   - Provides preview URL for testing

3. **Deploy Production** - Runs on push to main
   - Deploys to Vercel production
   - Sends deployment notifications

## Required Secrets

Add these secrets to your GitHub repository settings:

### Vercel Secrets
- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### Application Secrets
- `NEXT_PUBLIC_BUILDER_API_KEY` - Your Builder.io API key

## How to Get Vercel Credentials

1. **Install Vercel CLI:** `npm i -g vercel`
2. **Login:** `vercel login`
3. **Link project:** `vercel link`
4. **Get credentials:**
   - Token: `vercel --token` (or from Vercel dashboard)
   - Org ID & Project ID: Check `.vercel/project.json` after linking

## Workflow Benefits

✅ **Automated testing** before deployment  
✅ **Type safety** checking  
✅ **Code quality** enforcement  
✅ **Preview deployments** for PRs  
✅ **Production deployments** on main  
✅ **Build artifacts** caching  
✅ **Deployment notifications**  

## Manual Deployment

If you need to deploy manually:
```bash
# Install dependencies
npm install

# Run tests
npm run lint
npm run type-check

# Build and deploy
npm run build
npx vercel --prod
```
