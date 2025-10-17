<!--
Sync Impact Report:
Version change: 1.1.0 → 1.2.0
Modified principles: None
Added sections: 
- Code Standards: CSS Architecture (DRY, single source of truth, variables-only, avoid overrides)
- Code Standards: Layout Approach (Flexbox vs Grid, spacing control, cohesive grouping)
- Code Standards: State Management and Navigation (URL-based state, History API, progressive enhancement)
- Code Standards: Performance Patterns (dynamic rendering, build-time data, CSS animations, minimal JS)
- Code Standards: User Experience Principles (consistency, visual hierarchy, responsive, subtle animations)
Expanded sections: Code Standards (from 2 subsections to 7 subsections)
Removed sections: None
Rationale: Captured architectural learnings from tag search page implementation (001-tag-search-page)
Templates requiring updates:
✅ No template updates needed - new sections are guidance for future features, not changes to existing principles
Follow-up TODOs: None - constitution reflects learnings from real implementation experience
-->

# praveenpuglia.com Constitution

## Core Principles

### I. Dependency Minimization
No additional dependencies shall be added unless absolutely necessary for core functionality. The site MUST use baseline web platform features that are widely supported. All dependencies must be justified with clear rationale and regular review for removal opportunities.

**Rationale**: Dependencies create maintenance burden, security risks, and complexity. Modern web platforms provide sufficient capabilities for most use cases.

### II. Content-Focused Architecture
The primary purpose is publishing and displaying blog content. All technical decisions must prioritize content creation, readability, and accessibility. The file structure (`src/posts/`, `src/_includes/`, `src/assets/`) must remain intuitive for content management.

**Rationale**: The site exists to share knowledge through blog posts. Technical complexity should never impede content creation or reader experience.

### III. Modern Web Standards
The site MUST use cutting-edge web platform features that are baseline available across modern browsers. This includes semantic HTML5, modern CSS features (Grid, Flexbox, Custom Properties, Container Queries), and progressive enhancement. All code must follow web standards and best practices.

**Rationale**: Leveraging modern web capabilities reduces the need for dependencies while providing better user experiences and developer ergonomics.

### IV. Performance and Accessibility
All changes must maintain fast loading times and accessibility standards. Static generation ensures performance, but asset optimization, semantic HTML, and progressive enhancement principles are mandatory. WCAG 2.1 AA compliance is required.

**Rationale**: Personal blogs should be accessible to all users and load quickly on any device or connection speed.

### V. Deployment Simplicity
The site must remain deployable via simple git push to Cloudflare Pages with zero configuration changes. Build processes must be reliable and require no manual intervention.

**Rationale**: Deployment friction reduces the likelihood of publishing content. The current Cloudflare Pages setup provides reliability and global CDN without complexity.

### VI. Maintainability
Code must be readable and maintainable by a single developer over years. Dependencies should be minimal, well-established, and have clear upgrade paths. Documentation should be embedded in the code structure itself.

**Rationale**: Personal projects need to remain maintainable over long periods with minimal time investment.

## Content Standards

All blog posts must follow the established naming convention (`YYYY-MM-DD-slug.md`) and include proper frontmatter. Images should be optimized (preferably AVIF with fallbacks) and stored in `src/assets/images/`. The post structure should remain consistent for reader familiarity.

## Code Standards

### Semantic HTML
All HTML must use semantic elements appropriately (`<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`). Avoid generic `<div>` and `<span>` elements when semantic alternatives exist. Use proper heading hierarchy (`<h1>` through `<h6>`) and ARIA labels where necessary.

### CSS Naming
CSS class names must be readable, short, and meaningful. Use kebab-case for multi-word names (e.g., `post-title`, `nav-link`). Avoid abbreviations unless universally understood. Names should describe purpose or content, not appearance (e.g., `primary-button` not `red-button`).

### CSS Architecture
- **DRY Principle**: Extract shared styles into separate CSS files when the same patterns appear across multiple pages
- **Single Source of Truth**: Common UI patterns (like post lists) should have one canonical style definition
- **CSS Variables Only**: Use only colors and values defined in `variables.css` to maintain design system consistency
- **Avoid Overrides**: Check for conflicting styles across CSS files before adding new rules; refactor instead of override

### Layout Approach
- **Prefer Flexbox for Flow**: Use Flexbox for organic, flowing layouts where items should pack naturally (e.g., tag clouds, navigation)
- **Grid for Structure**: Reserve CSS Grid for intentional structural layouts, not when natural wrapping is desired
- **Spacing Control**: Let parent containers control spacing between items (`margin-bottom` on items), not internal elements
- **Cohesive Grouping**: Related elements (title + metadata) should be grouped visually through tight spacing, with clear separation between distinct items

### State Management and Navigation
- **URL-Based State**: Use URL query parameters for application state that should persist across navigation and be shareable
- **Browser History API**: Leverage `pushState` and `popstate` for natural back/forward button behavior without page reloads
- **No Client-Side Storage for Navigation State**: LocalStorage/SessionStorage should not be used for navigation state that should be shareable via URLs
- **Progressive Enhancement**: Core functionality should work without JavaScript; enhance with JS for better UX

### Performance Patterns
- **Dynamic Rendering Over Hiding**: Dynamically create DOM elements when needed rather than rendering everything and hiding with CSS
- **Build-Time Data Preparation**: Process and structure data at build time (Eleventy collections) for optimal runtime performance
- **CSS Animations**: Use CSS transforms and animations for smooth 60fps interactions; leverage `will-change` judiciously
- **Minimal JavaScript**: Keep client-side JavaScript minimal; prefer server-side generation and CSS for functionality when possible

### User Experience Principles
- **Consistency Across Pages**: Similar content types (like post lists) should look and behave identically across different pages
- **Visual Hierarchy**: Use spacing to create clear relationships—tight spacing for related items, generous spacing for separation
- **Responsive by Default**: Designs should scale naturally; avoid fixed dimensions and use relative units
- **Subtle Animations**: Enhance feel with subtle animations (shadows, transforms); respect `prefers-reduced-motion`

## Technical Constraints

- **Node.js Version**: Managed via Volta (currently 24.4.0)
- **Build Tool**: Eleventy 3.x with essential plugins only (syntax highlighting, image processing)
- **Templating**: Nunjucks templates only
- **Styling**: Modern CSS with minimal PostCSS (autoprefixing only)
- **JavaScript**: Vanilla JavaScript using modern web APIs, no frameworks
- **Assets**: Static files in `/static/`, processed assets in `/src/assets/`
- **Dependencies**: Only essential build-time dependencies, zero runtime dependencies
- **Browser Support**: Baseline web features only (widely supported across modern browsers)

## Governance

This constitution supersedes all other development practices. Changes to core principles require documentation of the rationale and impact assessment. All modifications must maintain backward compatibility with existing content and deployment processes.

**Amendment Process**: 
1. Document proposed change and rationale
2. Assess impact on existing content and build process
3. Test changes in development environment
4. Update constitution version following semantic versioning

**Compliance Review**: All changes must be evaluated against these principles before implementation. Complexity must be justified against the simplicity-first principle.

**Version**: 1.2.0 | **Ratified**: 2025-10-17 | **Last Amended**: 2025-10-17