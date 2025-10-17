<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles:
- Modified: I. Simplicity First → I. Dependency Minimization (expanded scope)
- Modified: III. Performance and Accessibility → III. Modern Web Standards (refocused)
- Reordered: Performance and Accessibility moved to IV
- Reordered: Deployment Simplicity moved to V
- Reordered: Maintainability moved to VI
Added sections: Code Standards (Semantic HTML, CSS Naming)
Expanded sections: Technical Constraints (dependency policy, browser support)
Removed sections: None
Templates requiring updates:
✅ Updated: .specify/templates/plan-template.md (Constitution Check updated with new principles)
✅ Updated: .specify/templates/tasks-template.md (Foundation tasks updated for modern web standards)
✅ Reviewed: .specify/templates/spec-template.md (no changes needed)
✅ Reviewed: .specify/templates/agent-file-template.md (no changes needed)
✅ Reviewed: .specify/templates/checklist-template.md (no changes needed)
Follow-up TODOs: None - all templates aligned with new principles
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

**Version**: 1.1.0 | **Ratified**: 2025-10-17 | **Last Amended**: 2025-10-17