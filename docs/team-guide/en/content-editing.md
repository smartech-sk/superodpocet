# Content Editing Guide

This guide explains how to edit website content using Markdown files. Perfect for marketing team members who need to update text without touching code.

## What You Can Edit

All editable content is in **Markdown files** (.md) located in `src/content/`:

- **Page content**: `src/content/pages/` (home.md, vyskum-a-vyvoj.md, etc.)
- **FAQ items**: `src/content/faq/` (vav-01.md, investicie-01.md, etc.)

## Editing Page Content

### Example: Changing the Home Page

1. Open `src/content/pages/home.md`
2. You'll see this structure:

```yaml
---
title: "Domov"
description: "Your description"
hero:
  heading: "Welcome heading"
  text: "Welcome text"
cards:
  - title: "Card 1"
    description: "Description"
    link: "/vyskum-a-vyvoj"
    linkText: "Learn more"
---
```

3. Edit the text between quotes
4. Save the file
5. View in browser (auto-refreshes)

### What You Can Change

- **title**: Page title (appears in browser tab)
- **description**: SEO description
- **hero.heading**: Main heading on page
- **hero.text**: Text below heading
- **cards**: Navigation cards (title, description, link text)
- **benefits**: Bullet point lists
- **warning**: Warning/notice text

## Markdown Syntax Quick Reference

### Headings
```markdown
# Large Heading
## Medium Heading
### Small Heading
```

### Text Formatting
```markdown
**bold text**
*italic text*
[link text](https://example.com)
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

## Adding FAQ Items

### Step 1: Create New File

Create a new file in `src/content/faq/` with this naming:
- VaV: `vav-11.md` (next number)
- Investície: `investicie-05.md`
- Patent Box: `patent-box-07.md`

### Step 2: Use This Template

```markdown
---
category: "vav"
order: 11
question: "Your question here?"
---

Your answer here. You can use **bold**, *italic*, and lists.

- Point 1
- Point 2
```

### Step 3: Save and Check

The FAQ will automatically appear on the correct page, sorted by `order` number.

## Common Tasks

### Changing Main Heading

File: `src/content/pages/vyskum-a-vyvoj.md`

Find:
```yaml
hero:
  heading: "Current heading"
```

Change to:
```yaml
hero:
  heading: "New heading"
```

### Adding a Benefit Item

Find the `benefits:` section:

```yaml
benefits:
  - "Existing benefit 1"
  - "Existing benefit 2"
  - "NEW: Add your new benefit here"
```

### Removing a Card (Home Page)

In `home.md`, find the `cards:` section and delete the entire card block:

```yaml
cards:
  - title: "Keep this"
    # ... keep
  - title: "Delete this"  # DELETE THIS WHOLE BLOCK
    description: "..."
    link: "..."
    linkText: "..."
  - title: "Keep this"
    # ... keep
```

## Best Practices

### Do's
- ✅ Always use proper quotes: `"text"` not `text`
- ✅ Keep consistent spacing (2 spaces for indentation)
- ✅ Save files with UTF-8 encoding
- ✅ Test changes in browser before committing
- ✅ Use `git pull` before editing

### Don'ts
- ❌ Don't edit code files (.astro, .ts, .js)
- ❌ Don't remove the `---` dividers
- ❌ Don't change the field names (like `title:`, `hero:`)
- ❌ Don't forget to save the file
- ❌ Don't use fancy quotes (" ") - use straight quotes (" ")

## Troubleshooting

### Site won't load after my change

**Cause**: Syntax error in YAML front matter

**Fix**:
1. Check you didn't remove or add extra `-` or `:`
2. Make sure all quotes match
3. Revert your change and try again

### My changes don't appear

**Cause**: File not saved or wrong file

**Fix**:
1. Make sure you saved (Ctrl+S / Cmd+S)
2. Check you're editing the right file
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

### FAQ not showing up

**Cause**: Wrong category or missing fields

**Fix**:
1. Check `category` matches: "vav", "investicie", or "patent-box"
2. Make sure `order` is a number (not in quotes)
3. Check the `---` dividers are present

## Example: Complete Page Edit

Let's change the R&D page heading:

1. Open `src/content/pages/vyskum-a-vyvoj.md`
2. Find:
   ```yaml
   hero:
     heading: "Premeňte inováciu na konkurenčnú výhodu"
   ```
3. Change to:
   ```yaml
   hero:
     heading: "Nový nadpis pre VaV stránku"
   ```
4. Save (Ctrl+S)
5. Check browser at `http://localhost:4321/vyskum-a-vyvoj`

## Git Workflow for Content Changes

```bash
# 1. Get latest changes
git pull

# 2. Make your edits

# 3. Check what changed
git status

# 4. Save changes
git add .
git commit -m "Update VaV page heading"
git push
```

## Need Help?

- Ask a developer on the team
- Check the troubleshooting guide
- Review example FAQ files for reference

Remember: **You can't break anything!** Git keeps all history, so changes can always be undone.
