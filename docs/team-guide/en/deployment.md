# Deployment Guide

This guide explains how the Superodpočet.sk website is deployed to production using Netlify.

## Overview

The site uses continuous deployment:
- **Code Push**: Push to `main` branch on GitHub
- **Auto Build**: Netlify automatically builds the site
- **Auto Deploy**: New version goes live automatically
- **Time**: Usually completes in 2-3 minutes

## Deployment Platform

We use **Netlify** (not GitHub Pages) because:
- Supports serverless functions (needed for OTP/SMS verification)
- Automatic HTTPS
- Custom domain support
- Form handling
- Environment variables
- Deploy previews for pull requests

## Initial Netlify Setup

These steps were completed during initial setup, but documented here for reference:

### 1. Create Netlify Account
- Go to https://www.netlify.com/
- Sign up with GitHub account
- Authorize Netlify to access repositories

### 2. Connect Repository
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select `smartech-sk/superodpocet` repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher
5. Click "Deploy site"

### 3. Configure Custom Domain
1. In Netlify dashboard, go to "Domain settings"
2. Add custom domain: `superodpocet.sk`
3. Follow DNS configuration instructions:
   - Add CNAME record pointing to Netlify
   - Or update A record to Netlify's IP
4. Wait for DNS propagation (up to 24 hours)
5. Enable HTTPS (automatic)

## Deployment Workflow

### For Regular Content Updates

Marketing team can update content without developer involvement:

1. **Edit Markdown files** in `src/content/`
2. **Test locally**:
   ```bash
   npm run dev
   ```
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update VaV page content"
   git push
   ```
4. **Auto-deploy**: Netlify builds and deploys automatically
5. **Verify**: Check https://superodpocet.sk in 2-3 minutes

### For Code Changes

Developers should follow this workflow:

1. **Create a branch**:
   ```bash
   git checkout -b feature/new-calculator
   ```

2. **Make changes and test locally**:
   ```bash
   npm run dev
   npm run build
   npm run preview
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add VaV calculator implementation"
   git push origin feature/new-calculator
   ```

4. **Create Pull Request** on GitHub

5. **Review Deploy Preview**:
   - Netlify automatically creates a preview URL
   - Check preview link in PR comments
   - Test thoroughly before merging

6. **Merge to main**:
   - Once approved, merge PR
   - Automatic deployment to production begins

## Build Process

### What Happens During Build

1. **Install dependencies**: `npm install`
2. **Run Astro build**: `npm run build`
   - Compiles TypeScript
   - Processes Tailwind CSS
   - Renders Markdown to HTML
   - Generates static files
3. **Output to `dist/`**: All static files ready to serve
4. **Deploy**: Upload `dist/` to Netlify CDN

### Build Time

- Typical build: 1-2 minutes
- Includes:
  - Dependency installation: ~30 seconds
  - Astro compilation: ~30 seconds
  - Asset optimization: ~30 seconds

## Environment Variables

For features requiring sensitive data (like API keys):

### Adding Environment Variables

1. Go to Netlify dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Click "Add a variable"
4. Enter key and value
5. Choose "Same value for all deploy contexts" or set different values for production/preview

### Example Variables

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+421xxxxxxxxx
```

### Using in Code

```typescript
// In serverless function
const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
```

**Important**: Never commit sensitive values to Git. Always use environment variables.

## Monitoring Deployments

### Netlify Dashboard

Access deployment status:
1. Go to https://app.netlify.com/
2. Select "superodpocet" site
3. View "Deploys" tab

You'll see:
- Deploy status (building/success/failed)
- Build logs
- Deploy time
- Commit that triggered deploy

### Email Notifications

Set up notifications:
1. Go to "Site settings" → "Build & deploy" → "Deploy notifications"
2. Add email notification for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed

### Build Logs

If deployment fails:
1. Click on failed deploy in dashboard
2. View full build log
3. Look for error messages
4. Common issues:
   - TypeScript errors
   - Missing dependencies
   - Syntax errors in Markdown front matter

## Rollback

If a deployment causes issues:

### Option 1: Quick Rollback (Netlify)
1. Go to "Deploys" tab
2. Find last working deployment
3. Click "⋯" menu → "Publish deploy"
4. Confirms rollback

### Option 2: Git Revert
```bash
git revert HEAD
git push
```
This creates a new commit that undoes the problematic changes.

### Option 3: Deploy from Old Commit
1. Find the good commit hash: `git log`
2. Create branch from that commit:
   ```bash
   git checkout -b hotfix/rollback abc1234
   git push origin hotfix/rollback
   ```
3. Merge to main

## Deploy Previews

Every pull request automatically gets a preview deployment:

### Accessing Preview
1. Open pull request on GitHub
2. Wait for Netlify bot comment (appears in ~2 minutes)
3. Click "Deploy preview" link
4. Test on preview URL

### Benefits
- Test changes before merging
- Share preview with team for feedback
- Catch issues early

## Performance Optimization

### Build Optimization

Already configured:
- Static site generation (fast loads)
- Automatic image optimization
- CSS minification
- HTML compression

### Further Optimization

Future improvements:
- Add caching headers for static assets
- Implement lazy loading for images
- Use web fonts efficiently
- Consider CDN for large files

## Troubleshooting Deployments

### Build Fails with "Command failed"

**Cause**: TypeScript or build error

**Fix**:
1. Run `npm run build` locally
2. Fix all errors shown
3. Commit and push fix

### Build Fails with "Out of memory"

**Cause**: Build requires more memory

**Fix**:
1. Contact Netlify support to increase build memory
2. Or optimize build process

### Deploy Succeeds but Site Shows Old Content

**Cause**: Browser cache

**Fix**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito/private window

### Site Shows 404 for All Pages

**Cause**: Missing redirect rules

**Fix**:
1. Check `public/_redirects` file exists
2. Ensure SPA fallback is configured (if needed)
3. Verify build output contains all expected files

### Custom Domain Not Working

**Cause**: DNS not configured correctly

**Fix**:
1. Verify DNS records in domain registrar
2. Use Netlify's DNS checker tool
3. Wait for DNS propagation (up to 48 hours)
4. Check https://dnschecker.org/ for propagation status

## Best Practices

### Before Deploying
- ✅ Test locally with `npm run dev`
- ✅ Run production build: `npm run build` && `npm run preview`
- ✅ Check for console errors
- ✅ Test on mobile/tablet sizes
- ✅ Verify all links work

### Deployment Strategy
- ✅ Deploy during low-traffic hours if possible
- ✅ Monitor first few minutes after deploy
- ✅ Have rollback plan ready
- ✅ Announce major updates to team

### Security
- ✅ Never commit API keys or secrets
- ✅ Use environment variables for sensitive data
- ✅ Keep dependencies updated
- ✅ Review Netlify security headers

## Useful Commands

```bash
# Test production build locally
npm run build && npm run preview

# Check build output size
du -sh dist/

# Verify all pages built correctly
ls -R dist/

# Test with production-like server
npx serve dist/
```

## Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Astro Deployment**: https://docs.astro.build/en/guides/deploy/netlify/
- **Custom Domains**: https://docs.netlify.com/domains-https/custom-domains/
- **Environment Variables**: https://docs.netlify.com/environment-variables/overview/

## Getting Help

If deployment issues persist:
1. Check Netlify status page: https://www.netlifystatus.com/
2. Review Netlify community forums
3. Contact Netlify support (available on all plans)
4. Ask senior developer for assistance

Remember: Most deployment issues are caught by local testing with `npm run build` before pushing to GitHub.
