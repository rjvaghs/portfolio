# Data & AI Engineer Portfolio

An interactive, tech-themed portfolio for a Data & AI Engineer / Consultant.  
Built as a single-page React experience using CDN-hosted React 18 and static assets so it can be hosted easily on GitHub Pages without a Node.js toolchain.

## Features

- **Consulting-focused narrative**: Emphasises working with clients, clarifying business goals, and shipping outcomes.
- **Hero with quick stats and console panel**: Techy, dark theme with neon accents and a terminal-style card.
- **Experience & skills**:
  - Interactive skill matrix grouped into Data Engineering, ML/AI, Cloud, Analytics, and Consulting.
  - Experience timeline highlighting roles, industries, and outcomes.
- **Case studies**:
  - 3 deep case-study cards with business context, your role, stack, and before/after metrics.
  - Click through to a modal with Problem → Approach → Solution → Impact and a simple architecture diagram.
- **Project gallery**:
  - Filterable project grid with tags such as Data Engineering, MLOps, Analytics, GenAI, Dashboards.
- **Insights section**:
  - Highlight blog posts, talks, or articles that show how you think about data & AI work.
- **Contact section**:
  - Simple contact form that drafts an email via `mailto:`, plus space for LinkedIn and other links.
- **Theme toggle**:
  - Switch between dark and light variants while keeping the tech aesthetic.

## Local Preview

This setup uses React 18 from a CDN and in-browser Babel for JSX, so there is **no build step required**.

To preview locally, either:

- Open `index.html` directly in your browser, or
- Use any static file server (for example, if you have Node installed):

```bash
npx serve .
```

Then open the served URL (usually `http://localhost:3000` or `http://localhost:5000`) in your browser.

## Deploying to GitHub Pages

Because this is a static site (HTML, CSS, and JS only), deployment to GitHub Pages is straightforward:

1. **Create a new Git repository** in this folder and push it to GitHub.
2. In GitHub:
   - Go to **Settings → Pages**.
   - Under **Source**, choose:
     - **Branch**: `main` (or `master`, depending on your default), and
     - **Folder**: `/ (root)`.
3. Save the settings. GitHub Pages will build and host the site from the **root** of your repository.
4. After a couple of minutes, your portfolio will be available at:
   - `https://<username>.github.io/<repo-name>/` (project page), or
   - `https://<username>.github.io/` if you use a user/organization site repo.

> If you later decide to move to a full Vite/TypeScript toolchain, you can:
>
> - Scaffold a Vite React + TS app, and
> - Migrate the JSX components and styles from `index.html` / `styles.css` into the Vite `src` folder.

## Customization

- **Content**:
  - Edit case studies, projects, skills, and insights in the `index.html` `<script type="text/babel">` block.
  - Replace placeholder links (GitHub, demos, LinkedIn, and email) with your real URLs.
- **Styling**:
  - Adjust colors, spacing, and radii in `styles.css` under the `:root` variables.
  - Tweak grid layouts and breakpoints in the responsive sections at the bottom of `styles.css`.

## Notes

- The minimal `package.json` is provided only for metadata and local tooling (e.g. `npx serve .`). There are **no npm dependencies** required to build or deploy this site.
- For best results on GitHub Pages, keep all static assets (HTML, CSS, fonts, etc.) in the repository root or reference them with relative paths.***
 End Patch``` -->
