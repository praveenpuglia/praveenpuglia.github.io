# praveenpuglia.com

Personal blog built with Eleventy, deployed on Cloudflare Pages.

## Quick Reference

- **Build**: `npm run build`
- **Dev server**: `npm run dev`
- **Posts location**: `src/posts/`
- **Templates**: `src/_includes/` (Nunjucks)
- **Assets**: `src/assets/` (processed), `/static/` (static)
- **Commits**: Use conventional commits (e.g., `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`)

## Core Principles

### Dependency Minimization
No additional dependencies unless absolutely necessary. Use baseline web platform features. All dependencies must be justified and regularly reviewed for removal.

### Content-Focused Architecture
Primary purpose is publishing blog content. Technical decisions must prioritize content creation, readability, and accessibility.

### Modern Web Standards
Use cutting-edge baseline web features: semantic HTML5, modern CSS (Grid, Flexbox, Custom Properties, Container Queries), progressive enhancement.

### Performance and Accessibility
Maintain fast loading times and WCAG 2.1 AA compliance. Use semantic HTML and progressive enhancement.

### Deployment Simplicity
Deployable via simple git push to Cloudflare Pages with zero configuration.

## Content Standards

- **Post naming**: `YYYY-MM-DD-slug.md`
- **Images**: Optimized (preferably AVIF with fallbacks) in `src/assets/images/`
- **Frontmatter**: Required for all posts

## Code Standards

### Semantic HTML
Use semantic elements (`<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`). Avoid generic `<div>` and `<span>` when semantic alternatives exist. Proper heading hierarchy and ARIA labels where necessary.

### CSS
- **Naming**: Kebab-case, readable, meaningful (e.g., `post-title`, `nav-link`). Describe purpose, not appearance.
- **Architecture**: DRY principle, single source of truth for common patterns, use only `variables.css` values, refactor instead of override.
- **Layout**: Prefer Flexbox for flow, Grid for structure. Parent containers control spacing.

### State & Navigation
- URL query parameters for shareable state
- Browser History API for back/forward behavior
- No client-side storage for navigation state
- Progressive enhancement (works without JS)

### Performance
- Dynamic DOM creation over hiding
- Build-time data preparation via Eleventy collections
- CSS animations for smooth 60fps interactions
- Minimal client-side JavaScript

### UX Principles
- Consistency across pages
- Clear visual hierarchy through spacing
- Responsive by default (relative units)
- Subtle animations (respect `prefers-reduced-motion`)

## Technical Constraints

- **Node.js**: Managed via Volta (24.4.0)
- **Build**: Eleventy 3.x with essential plugins only
- **Templates**: Nunjucks only
- **Styling**: Modern CSS with minimal PostCSS (autoprefixing)
- **JavaScript**: Vanilla JS, modern web APIs, no frameworks
- **Dependencies**: Essential build-time only, zero runtime
- **Browser Support**: Baseline web features only
