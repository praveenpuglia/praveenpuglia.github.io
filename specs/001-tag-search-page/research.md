# Research: Tag-Based Content Search Page

**Feature**: 001-tag-search-page  
**Date**: 2025-10-17  
**Status**: Complete

## Research Tasks

### 1. Eleventy Tag Collection Patterns

**Decision**: Use Eleventy's built-in collections API with custom filter for tag aggregation

**Rationale**: 
- Eleventy provides `collections.all` with access to post frontmatter
- Can create custom collection for unique tags with post counts
- No additional dependencies required
- Integrates seamlessly with existing build process

**Implementation Pattern**:
```javascript
// In .eleventy.js
eleventyConfig.addCollection("tagList", function(collection) {
  const tagSet = new Set();
  collection.getAll().forEach(item => {
    if ("tags" in item.data) {
      let tags = item.data.tags;
      tags = tags.filter(item => !["all", "nav", "post", "posts"].includes(item));
      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });
  return [...tagSet];
});
```

**Alternatives Considered**:
- External tag processing library (rejected: violates dependency minimization)
- Build-time JSON generation (rejected: adds complexity)

### 2. Tag Cloud Layout Strategy

**Decision**: Use CSS Flexbox with tight spacing for organic, masonry-like layout

**Rationale**:
- Flexbox creates natural, flowing layout without rigid grid structure
- Tighter spacing (0.75rem gap) prevents "spreadout" feel and creates compact clustering
- Tags of varying sizes pack together more naturally
- `justify-content: center` maintains visual balance
- More organic "cloud" feel compared to CSS Grid's uniform cell sizing

**Implementation Pattern**:
```css
.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
}
```

**Alternatives Considered**:
- CSS Grid with auto-fit (rejected: creates rigid, evenly-spaced cells that feel too structured)
- CSS Grid with masonry (rejected: not yet baseline supported)
- Absolute positioning (rejected: complex, not responsive)

### 3. CSS Animation Performance for Tag Cloud

**Decision**: Use CSS transforms and will-change property for 60fps animations

**Rationale**:
- CSS transforms (translate, scale) are hardware accelerated
- `will-change` property optimizes for animation performance
- Intersection Observer API can pause animations when off-screen
- Respects `prefers-reduced-motion` for accessibility

**Implementation Pattern**:
```css
.tag-cloud-item {
  will-change: transform;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-10px) translateX(5px); }
  66% { transform: translateY(5px) translateX(-3px); }
}

@media (prefers-reduced-motion: reduce) {
  .tag-cloud-item { animation: none; }
}
```

**Alternatives Considered**:
- JavaScript-based animations (rejected: performance concerns)
- CSS transitions only (rejected: doesn't provide continuous cloud effect)

### 3. Tag Filtering Implementation

**Decision**: Client-side filtering using vanilla JavaScript with data attributes

**Rationale**:
- All posts available in DOM at page load (no pagination requirement)
- Fast filtering without server requests
- Progressive enhancement - works without JavaScript
- Uses semantic HTML data attributes for clean separation

**Implementation Pattern**:
```javascript
// Dynamically render posts for selected tag
function filterByTag(selectedTag) {
  const posts = postsByTag[selectedTag] || [];
  const container = document.getElementById('posts-list');
  
  // Clear existing posts
  container.innerHTML = '';
  
  // Create and append new post elements
  posts.forEach(post => {
    const postElement = createPostElement(post);
    container.appendChild(postElement);
  });
}
```

**Alternatives Considered**:
- Hide/show all posts with CSS (rejected: causes empty space and performance issues)
- Server-side filtering with separate pages (rejected: adds complexity)
- JavaScript framework (rejected: violates dependency minimization)

### 5. Post List Styling Consistency

**Decision**: Match the styling of the /posts page exactly, with added tag display

**Rationale**:
- Consistent user experience across the site
- Uses existing CSS patterns and conventions
- Minimal additional CSS required
- Tags add value without disrupting the familiar layout

**Implementation Pattern**:
- Use `<ol class="posts-list">` structure
- Use `<li class="post-item">` for each post
- Display date with `.post-date` class
- Use `.postlist-link` for post title links
- Add `.post-tags` section with clickable tags
- Match date formatting (e.g., "12 Jan, 2025")

### 6. CSS Variable Usage

**Decision**: Only use CSS variables defined in `static/css/variables.css`

**Rationale**:
- Maintains design system consistency
- Ensures colors match the site's theme
- Prevents arbitrary color choices
- Makes future theming changes easier

**Available Variables**:
- `--color-link`: Link color (#0070f3)
- `--accent-color`: Primary accent (#002999)
- `--color-border-light`: Light borders (#eaeaea)
- `--color-primary`: Primary text (#14252e)
- `--color-primary-lighter`: Secondary text (#767676)

### 7. Tag Cloud Visual Enhancement

**Decision**: Add subtle multi-layer shadows to tag cloud items

**Rationale**:
- Enhances the "floating cloud" metaphor
- Provides visual depth without distraction
- Shadows: `0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)`
- Hover shadows: `0 8px 16px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08)`
- Active state uses accent color shadow for better feedback

### 8. URL State Management for Filter Persistence

**Decision**: Use URL query parameters with History API for state persistence

**Rationale**:
- Enables shareable links to filtered views (e.g., `/tags?tag=javascript`)
- Browser back/forward buttons work naturally
- No additional dependencies required (native URLSearchParams and History API)
- Progressive enhancement - works without breaking basic functionality
- Maintains RESTful URL structure

**Implementation Pattern**:
```javascript
// Update URL when tag is selected
function filterByTag(tagName, updateURL = true) {
  // ... filtering logic ...
  
  if (updateURL) {
    const url = new URL(window.location);
    url.searchParams.set('tag', tagName);
    window.history.pushState({ tag: tagName }, '', url);
  }
}

// Load tag from URL on page load
function loadTagFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromURL = urlParams.get('tag');
  
  if (tagFromURL && postsByTag[tagFromURL]) {
    filterByTag(tagFromURL, false); // false = don't update URL again
    // Restore UI state...
  }
}

// Handle browser back/forward
window.addEventListener('popstate', loadTagFromURL);
```

**Alternatives Considered**:
- Hash-based routing (rejected: query params are more semantic)
- LocalStorage (rejected: doesn't enable shareable links)
- Session state only (rejected: breaks back button and sharing)

### 9. CSS Architecture: Shared Post List Styles

**Decision**: Extract common post list styles into a shared `post-list.css` file

**Rationale**:
- Both `/posts` and `/tags` pages use identical markup and styling for post lists
- DRY principle - eliminate duplication across `blog.css` and `tags.css`
- Single source of truth for post list styling
- Easier maintenance - changes to post list appearance only need to be made once
- Consistent styling across pages guaranteed

**Implementation Pattern**:
```css
/* static/css/post-list.css */
.posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 3rem;
}

.post-item {
  margin-bottom: 1rem;
}

.post-item h4,
.post-item a,
.post-date {
  /* Shared styles... */
}
```

```css
/* static/css/blog.css */
@import url('./post-list.css');

/* static/css/tags.css */
@import url('./post-list.css');
/* Tag-specific styles... */
```

**Refactored Structure**:
- `post-list.css`: Shared post list styles (40 lines)
- `blog.css`: Only imports shared styles (3 lines, reduced from 7)
- `tags.css`: Imports shared styles + tag-specific features (210 lines, reduced from 243)

**Spacing Refinements**:
- `.post-item`: Increased `margin-bottom` from 1rem to 2rem for clear separation between posts
- `.post-item h4`: Set to `margin: 0` to eliminate all heading margins
- `.post-date`: Set to `margin: 0 0 0.5rem 0` to create space between date and title
- `.post-tags`: Has `margin-top: 0.5rem` (in tags.css) to create space between title and tags
- Mobile: Adjusted `.post-item` to 1.5rem to maintain proportional spacing on smaller screens
- **Removed conflicting style**: Deleted `.postlist-link .post-title` override from `post.css` (was forcing 2rem margin)
- **Result**: 
  - `/posts` page: date → 0.5rem → title (cohesive, then 2rem to next post)
  - `/tags` page: date → 0.5rem → title → 0.5rem → tags (cohesive, then 2rem to next post)

**Benefits**:
- Reduced CSS duplication by ~35 lines
- Easier to maintain consistent post list appearance
- Clear separation of concerns (shared vs page-specific)
- No impact on build performance (CSS imports are standard)
- Improved spacing works well for both pages regardless of tag presence

### 4. Linear Tag Scaling Algorithm

**Decision**: CSS clamp() function with custom properties for responsive scaling

**Rationale**:
- CSS clamp() provides min/max bounds with linear scaling
- Custom properties allow dynamic calculation based on post counts
- Responsive across all screen sizes
- No JavaScript required for sizing

**Implementation Pattern**:
```css
.tag {
  --scale-factor: calc(var(--post-count) / var(--max-posts));
  font-size: clamp(0.875rem, calc(0.875rem + var(--scale-factor) * 1rem), 2rem);
}
```

**Alternatives Considered**:
- JavaScript-based sizing (rejected: unnecessary complexity)
- Fixed size categories (rejected: less precise scaling)

### 5. Accessibility Considerations

**Decision**: Full keyboard navigation with ARIA labels and screen reader support

**Rationale**:
- WCAG 2.1 AA compliance required by constitution
- Tag cloud must be navigable via keyboard
- Animations respect reduced motion preferences
- Clear focus indicators and semantic markup

**Implementation Requirements**:
- `role="button"` and `tabindex="0"` for clickable tags
- `aria-label` with post count information
- Focus management for filtered results
- Skip links for screen readers

**Alternatives Considered**:
- Basic accessibility only (rejected: constitution requires AA compliance)
- Complex ARIA live regions (rejected: over-engineering for use case)
