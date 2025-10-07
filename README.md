# Superodpočet.sk

Modern marketing website providing information, tools, and resources about Slovak tax deductions, including super deduction for R&D, Industry 4.0 investments, and Patent Box.

## Overview

This website serves as a lead generation and information hub for potential customers seeking guidance on Slovak tax deduction opportunities. It provides interactive calculators, comprehensive FAQ sections, and direct contact channels to SmarTech Solutions experts.

## Technology Stack

- **Framework**: Astro 5.x with TypeScript
- **Styling**: Tailwind CSS 4.x
- **Content Management**: Markdown with Astro Content Collections
- **Deployment**: Netlify with serverless functions
- **SMS/OTP**: Twilio or MessageBird integration

## Features

- Four main pages: Home, R&D Super Deduction, Industry 4.0 Investments, Patent Box
- Interactive tax calculators with 2024/2025 tax rate support
- FAQ sections with collapsible questions
- Phone verification (OTP) for template downloads
- Contact and seminar registration forms
- Responsive design for mobile and desktop
- Fast performance (static site generation)
- Easy content management via Markdown files

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/[your-org]/superodpocet.git
cd superodpocet
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Add your environment variables to `.env`:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Building for Production

Build the site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
superodpocet/
├── src/
│   ├── content/           # Markdown content files
│   │   ├── pages/         # Page content
│   │   └── faq/           # FAQ items
│   ├── components/        # Reusable components
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── calculators/   # Calculator widgets
│   │   ├── forms/         # Forms (Contact, OTP, Seminar)
│   │   └── widgets/       # Reusable UI components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes and pages
│   │   ├── api/           # API endpoints (serverless)
│   │   ├── index.astro    # Home page
│   │   ├── vyskum-a-vyvoj.astro
│   │   ├── investicie.astro
│   │   └── patent-box.astro
│   ├── styles/            # Global styles
│   └── utils/             # Utility functions
├── public/                # Static assets
├── docs/                  # Documentation
│   ├── team-guide/        # Team documentation
│   │   ├── en/            # English docs
│   │   └── sk/            # Slovak docs
│   └── session_summaries/ # Development history
└── local/                 # Private documents (gitignored)
```

## Content Management

### Editing Page Content

Content is managed through Markdown files in `src/content/pages/`. To edit:

1. Navigate to `src/content/pages/`
2. Open the `.md` file you want to edit
3. Edit the content (Markdown syntax supported)
4. Save and commit changes
5. Push to GitHub for automatic deployment

Example Markdown file:

```markdown
---
title: "O Superodpočte"
description: "Informácie o daňovom odpočte"
---

# Heading

Your content here with **bold** and _italic_ formatting.
```

### Adding FAQ Items

1. Create a new `.md` file in `src/content/faq/`
2. Use this format:

```markdown
---
category: "vav" # vav, investicie, or patent-box
order: 1
question: "Your question?"
---

Your answer here.
```

See `docs/team-guide/sk/content-editing.md` for detailed instructions in Slovak.

## Deployment

The site is configured for automatic deployment on Netlify:

1. Push changes to the `main` branch
2. Netlify automatically builds and deploys
3. Changes are live in 2-3 minutes

### Environment Variables

Set these in Netlify dashboard under Site Settings > Environment Variables:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

## Team Responsibilities

### Developers

- Component development
- Calculator implementation
- API endpoint maintenance
- Bug fixes and testing

### Marketing Team

- Content creation and editing
- FAQ management
- Copy updates
- Content quality assurance

### Designer

- Visual design system
- Color schemes and typography
- Image assets and icons
- Brand consistency

## Documentation

- **Getting Started**: `docs/team-guide/en/getting-started.md`
- **Content Editing**: `docs/team-guide/sk/content-editing.md`
- **Calculator Guide**: `docs/team-guide/en/calculator-guide.md`
- **Deployment**: `docs/team-guide/en/deployment.md`
- **Troubleshooting**: `docs/team-guide/en/troubleshooting.md`

Slovak translations available in `docs/team-guide/sk/`.

## Development Guidelines

- Keep commits atomic and well-described
- Test locally before pushing
- Follow TypeScript best practices
- Maintain responsive design
- Ensure accessibility standards
- Document significant changes

## Calculator Reference

### Tax Rates

- 2024: 21%
- 2025: 24%

### Formulas

**R&D Super Deduction:**

- Deduction: 100% of R&D costs
- Savings: costs × tax rate

**Industry 4.0 Investments:**

- Deduction: 50% of investment
- Savings: (investment × 0.50) × tax rate

**Patent Box:**

- Exempt: 50% of IP income
- Savings: (income × 0.50) × tax rate

## Support

### Technical Issues

- Check `docs/team-guide/en/troubleshooting.md`
- Create GitHub issue
- Contact development team lead

### Content Issues

- Review `docs/team-guide/sk/content-editing.md`
- Contact marketing team lead

### Deployment Issues

- Check Netlify deploy logs
- Review `docs/team-guide/en/deployment.md`
- Contact development team lead

## License

Proprietary - SmarTech Solutions

## Links

- Production Site: https://superodpocet.sk
- SmarTech Solutions: https://www.smartech.sk
- Repository: https://github.com/[your-org]/superodpocet
