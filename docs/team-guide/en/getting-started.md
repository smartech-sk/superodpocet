# Getting Started with Superodpočet.sk

Welcome to the Superodpočet.sk project! This guide will help you set up your development environment and get familiar with the project.

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - To check if installed: Open Terminal/Command Prompt and type `node --version`

2. **Git**
   - Download from: https://git-scm.com/
   - To check if installed: Type `git --version`

3. **A Code Editor**
   - We recommend **VS Code**: https://code.visualstudio.com/
   - Alternative: Any text editor you're comfortable with

4. **GitHub Account**
   - Sign up at: https://github.com/
   - Make sure you have access to the `smartech-sk/superodpocet` repository

## Setting Up Your Development Environment

### Step 1: Clone the Repository

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to where you want to store the project:
   ```bash
   cd ~/Projects
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/smartech-sk/superodpocet.git
   cd superodpocet
   ```

### Step 2: Install Dependencies

In the project directory, run:
```bash
npm install
```

This will install all the necessary packages. It may take a few minutes.

### Step 3: Start the Development Server

Run:
```bash
npm run dev
```

You should see output like:
```
  🚀  astro  v5.14.1 started in 123ms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

Open your web browser and go to `http://localhost:4321/`

**Congratulations!** You should now see the Superodpočet.sk website running locally.

## Understanding the Project Structure

Here's what the main folders contain:

```
superodpocet/
├── src/                    # All source code
│   ├── content/           # Markdown content files (EDIT THESE!)
│   │   ├── pages/         # Page content
│   │   └── faq/           # FAQ items
│   ├── components/        # Reusable UI components
│   ├── layouts/           # Page templates
│   ├── pages/             # Route definitions
│   └── styles/            # CSS styles
├── public/                # Static files (images, downloads)
├── docs/                  # Documentation (you're reading this!)
└── package.json          # Project dependencies
```

## Key Technologies

### Astro
- **What it is**: A modern web framework for building fast websites
- **What you need to know**: It generates static HTML files for better performance
- **Files**: Pages ending in `.astro` are Astro components

### Markdown
- **What it is**: A simple way to write formatted text
- **What you need to know**: Content in `src/content/` uses Markdown
- **Example**: `# Heading`, `**bold**`, `*italic*`

### Tailwind CSS
- **What it is**: A CSS framework for styling
- **What you need to know**: Classes like `text-blue-600`, `p-4`, `mb-8` control appearance
- **You probably won't need to touch this**: The designer will handle styling

## Making Your First Change

Let's make a simple change to see how it works:

1. Open `src/content/pages/home.md` in your editor
2. Find the line with `heading:`
3. Change the text to something new
4. Save the file
5. Look at your browser - it should automatically update!

This is called "hot reload" - changes appear instantly without refreshing.

## Common Commands

Run these in Terminal/Command Prompt from the project directory:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `git status` | See what files you've changed |
| `git pull` | Get latest changes from GitHub |
| `git add .` | Stage all your changes |
| `git commit -m "message"` | Save your changes locally |
| `git push` | Upload your changes to GitHub |

## Git Workflow for Beginners

When working on the project:

1. **Before you start working:**
   ```bash
   git pull
   ```
   This gets the latest changes from other team members.

2. **Make your changes**
   Edit files in your code editor

3. **Check what you changed:**
   ```bash
   git status
   ```

4. **Save your changes:**
   ```bash
   git add .
   git commit -m "Brief description of what you changed"
   git push
   ```

**Important:** Always `git pull` before you start working to avoid conflicts!

## Getting Help

### If something doesn't work:

1. Check the error message carefully
2. Read the Troubleshooting guide: `docs/team-guide/en/troubleshooting.md`
3. Ask a teammate for help
4. Search for the error on Google

### Resources:

- **Astro Documentation**: https://docs.astro.build/
- **Markdown Guide**: https://www.markdownguide.org/
- **Git Tutorial**: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control

## What's Next?

Now that you have the project running, you can:

1. **Learn to edit content**: Read `content-editing.md`
2. **Understand calculators**: Read `calculator-guide.md`
3. **Learn about deployment**: Read `deployment.md`

Welcome to the team! Don't hesitate to ask questions.
