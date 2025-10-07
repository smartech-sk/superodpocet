# Troubleshooting Guide

This guide helps you solve common problems you might encounter while working on the Superodpočet.sk project.

## Development Server Issues

### Server won't start

**Error**: `npm run dev` fails or doesn't start

**Solutions**:

1. **Check Node.js version**:
   ```bash
   node --version
   ```
   Must be 18.0.0 or higher. If not, update Node.js.

2. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for port conflicts**:
   ```bash
   # On Mac/Linux
   lsof -i :4321

   # On Windows
   netstat -ano | findstr :4321
   ```
   If port 4321 is in use, kill the process or use a different port.

4. **Clear Astro cache**:
   ```bash
   rm -rf .astro
   npm run dev
   ```

### Page shows blank/white screen

**Symptoms**: Browser shows blank page or "Astro" text only

**Solutions**:

1. **Wait for build to complete**: Initial build can take 30-60 seconds
2. **Check terminal for errors**: Look for compilation errors
3. **Clear browser cache**: Hard refresh with Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. **Check browser console**: Open DevTools (F12) and look for JavaScript errors

### Changes don't appear

**Symptoms**: You edit a file but browser doesn't update

**Solutions**:

1. **Check you saved the file**: Ctrl+S or Cmd+S
2. **Wait a few seconds**: Hot reload takes 1-3 seconds
3. **Manually refresh**: Press F5 or click refresh
4. **Restart dev server**:
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```
5. **Check file path**: Make sure you're editing the correct file

## Build Errors

### TypeScript errors

**Error**: `error TS2304: Cannot find name 'X'`

**Solutions**:

1. **Check imports**: Make sure all imports are correct
   ```typescript
   // Wrong
   import { Component } from './Component'

   // Right
   import Component from './Component.astro'
   ```

2. **Check type definitions**: Ensure types are properly defined
3. **Restart TypeScript server** in VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### Markdown front matter errors

**Error**: Build fails with YAML parsing error

**Solutions**:

1. **Check quotes**: All text values must be in quotes
   ```yaml
   # Wrong
   title: My Title

   # Right
   title: "My Title"
   ```

2. **Check indentation**: Use 2 spaces (not tabs)
   ```yaml
   # Wrong
   hero:
   heading: "Title"  # 0 spaces

   # Right
   hero:
     heading: "Title"  # 2 spaces
   ```

3. **Check colons**: Don't forget colons after field names
   ```yaml
   # Wrong
   title "My Title"

   # Right
   title: "My Title"
   ```

4. **Check dashes**: List items need dashes
   ```yaml
   # Wrong
   benefits:
     "Benefit 1"
     "Benefit 2"

   # Right
   benefits:
     - "Benefit 1"
     - "Benefit 2"
   ```

### Content collection errors

**Error**: `Error: Content collection "X" does not exist`

**Solutions**:

1. **Check file location**: FAQ files must be in `src/content/faq/`, page files in `src/content/pages/`
2. **Check file name**: Must use correct slug (e.g., `vyskum-a-vyvoj.md` not `vav.md` for pages)
3. **Check front matter**: Must include all required fields

### CSS not loading

**Error**: Site loads but has no styling

**Solutions**:

1. **Check Tailwind installation**:
   ```bash
   npm list tailwindcss
   ```

2. **Restart dev server**:
   ```bash
   npm run dev
   ```

3. **Clear .astro cache**:
   ```bash
   rm -rf .astro dist
   npm run dev
   ```

## Git Issues

### Can't push to GitHub

**Error**: `Permission denied` or `Authentication failed`

**Solutions**:

1. **Check you're authenticated**:
   ```bash
   git config user.name
   git config user.email
   ```

2. **Use SSH instead of HTTPS**: Ask team lead to help set up SSH keys

3. **Check repository access**: Make sure you have write access to the repository

### Merge conflicts

**Error**: `CONFLICT (content): Merge conflict in X`

**Solutions**:

1. **Don't panic!** Conflicts are normal.

2. **Open the conflicting file** in your editor. Look for:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```

3. **Decide which to keep**:
   - Keep yours: Delete `<<<`, `===`, `>>>` and their version
   - Keep theirs: Delete `<<<`, `===`, `>>>` and your version
   - Keep both: Delete markers, arrange as needed

4. **Mark as resolved**:
   ```bash
   git add path/to/file
   git commit
   ```

### Accidentally committed to main

**Error**: You committed directly to `main` instead of a branch

**Solutions**:

1. **If you haven't pushed yet**:
   ```bash
   git reset HEAD~1  # Undo commit, keep changes
   git checkout -b feature/my-feature  # Create branch
   git add .
   git commit -m "Your message"
   ```

2. **If you already pushed**: Ask team lead for help

### Wrong commit message

**Error**: Typo or wrong message in last commit

**Solutions**:

1. **If you haven't pushed yet**:
   ```bash
   git commit --amend -m "Correct message"
   ```

2. **If you already pushed**: Leave it, not worth the hassle

## Content Issues

### FAQ not showing up

**Symptoms**: Added FAQ file but it doesn't appear on the page

**Solutions**:

1. **Check category**: Must be exactly `"vav"`, `"investicie"`, or `"patent-box"` (in quotes)
2. **Check order**: Must be a number without quotes
   ```yaml
   # Wrong
   order: "1"

   # Right
   order: 1
   ```
3. **Check file location**: Must be in `src/content/faq/`
4. **Check front matter format**:
   ```yaml
   ---
   category: "vav"
   order: 1
   question: "Your question?"
   ---

   Your answer here.
   ```

### Special characters breaking site

**Symptoms**: Site breaks after adding text with special characters

**Solutions**:

1. **Use HTML entities** for special characters in Markdown:
   - `&euro;` for €
   - `&copy;` for ©
   - `&nbsp;` for non-breaking space

2. **Ensure UTF-8 encoding**: Save files as UTF-8 in your editor

3. **Escape quotes** inside quoted text:
   ```yaml
   # Wrong
   text: "He said "hello""

   # Right
   text: "He said \"hello\""
   ```

### Links not working

**Symptoms**: Clicking a link gives 404 error

**Solutions**:

1. **Check link format**:
   ```markdown
   # Wrong - missing leading slash
   [Link](/vyskum-a-vyvoj)

   # Right
   [Link](/vyskum-a-vyvoj)
   ```

2. **Check page exists**: Verify the target page file exists

3. **Check for typos**: Links are case-sensitive

## Performance Issues

### Slow build times

**Symptoms**: `npm run build` takes very long

**Solutions**:

1. **Clear cache**:
   ```bash
   rm -rf .astro dist node_modules/.vite
   ```

2. **Update dependencies**:
   ```bash
   npm update
   ```

3. **Check for large files**: Remove any accidentally committed large files

### Slow page loads

**Symptoms**: Site is slow in browser

**Solutions**:

1. **Optimize images**: Compress images before adding to `public/`
2. **Check network tab**: Open DevTools → Network to see what's slow
3. **Test production build**:
   ```bash
   npm run build
   npm run preview
   ```
   Dev mode is slower than production

## Editor Issues

### VS Code not detecting TypeScript

**Symptoms**: No autocomplete or type checking

**Solutions**:

1. **Install recommended extensions**:
   - Astro
   - Tailwind CSS IntelliSense

2. **Restart TypeScript server**: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

3. **Check workspace trust**: VS Code may not trust the folder

### Syntax highlighting broken

**Symptoms**: Code appears unstyled or wrong colors

**Solutions**:

1. **Install Astro extension** for VS Code
2. **Reload VS Code**: Cmd/Ctrl + Shift + P → "Developer: Reload Window"

## Deployment Issues

See the [Deployment Guide](./deployment.md#troubleshooting-deployments) for deployment-specific issues.

## Getting More Help

### Before asking for help:

1. ✅ Read the error message carefully
2. ✅ Check this troubleshooting guide
3. ✅ Search the error on Google
4. ✅ Check if others have the same issue: https://github.com/withastro/astro/issues

### When asking for help:

Include:
- What you were trying to do
- What you expected to happen
- What actually happened
- Full error message (screenshot or copy-paste)
- Your Node.js version (`node --version`)
- Your operating system

### Resources:

- **Astro Discord**: https://astro.build/chat
- **Astro Docs**: https://docs.astro.build/
- **Stack Overflow**: Tag your question with `astro`
- **Team chat**: Ask in your team channel

## Common Error Messages Reference

### `EADDRINUSE: address already in use`
**Meaning**: Port 4321 is already being used
**Fix**: Kill the other process or use a different port

### `Cannot find module 'X'`
**Meaning**: Missing dependency
**Fix**: `npm install`

### `Unexpected token '<'` in browser console
**Meaning**: Trying to import HTML as JavaScript
**Fix**: Check import paths and file extensions

### `Failed to fetch dynamically imported module`
**Meaning**: Browser can't load a component
**Fix**: Hard refresh, clear cache, restart dev server

### `Error: ENOENT: no such file or directory`
**Meaning**: File or folder doesn't exist
**Fix**: Check file path, create missing directory

### `SyntaxError: Unexpected end of JSON input`
**Meaning**: Invalid JSON, likely in front matter
**Fix**: Check for missing commas, quotes, or brackets in YAML

## Prevention Tips

To avoid issues:

- ✅ Always `git pull` before starting work
- ✅ Test locally before committing
- ✅ Run `npm run build` to catch build errors
- ✅ Use VS Code's built-in problems panel
- ✅ Keep dependencies updated with `npm update`
- ✅ Don't edit files directly in `dist/` or `.astro/`
- ✅ Use `git status` frequently to see what's changed

Remember: Everyone encounters these issues! Don't be afraid to ask for help.
