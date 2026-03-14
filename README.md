# Carbon Hue Data – Portfolio

React + TypeScript + Vite site for [carbonhuedata.com](https://carbonhuedata.com).

## Deploy to GitHub Pages

1. **Push the repo to GitHub** (if not already):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Build and deploy** (from the project root):
   ```bash
   npm run deploy
   ```
   This runs `npm run build` and pushes the `dist` folder to the `gh-pages` branch.

3. **Turn on GitHub Pages** in the repo:
   - **Settings → Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/(root)`
   - **Save**

4. **Custom domain** (you already have `carbonhuedata.com`):
   - In **Settings → Pages**, set **Custom domain** to `carbonhuedata.com`
   - At your domain registrar, add a CNAME record: `carbonhuedata.com` → `YOUR_USERNAME.github.io`
   - The `CNAME` file is in `public/`, so it’s included in each deploy.

**If you use a project repo (not `username.github.io`) and do *not* use a custom domain**, set the base path in `vite.config.ts`:
   ```ts
   base: '/your-repo-name/',
   ```
   Then run `npm run deploy` again.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
