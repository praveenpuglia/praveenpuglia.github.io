# Client-Side API Contract

**Feature**: Tag-Based Content Search Page  
**Type**: Browser JavaScript Interface  
**Date**: 2025-10-17

## DOM Structure Contract

### Tag Cloud HTML

**Required Structure**:
```html
<section class="tag-cloud" role="region" aria-label="Browse topics">
  <h2>Explore Topics</h2>
  <div class="tag-cloud-container">
    <button 
      class="tag-cloud-item" 
      data-tag="javascript"
      data-post-count="15"
      role="button"
      tabindex="0"
      aria-label="Filter by javascript, 15 posts"
      style="--post-count: 15; --display-weight: 1.0;">
      javascript
    </button>
    <!-- More tags... -->
  </div>
</section>
```

**Required Attributes**:
- `data-tag`: Tag name for filtering
- `data-post-count`: Number of posts (for ARIA)
- `--post-count`: CSS custom property for scaling
- `--display-weight`: CSS custom property (0.0-1.0)

### Post Results HTML

**Required Structure**:
```html
<section class="post-results" id="results" role="region" aria-label="Filtered posts">
  <h2 class="results-title">Posts tagged with "<span id="current-tag"></span>"</h2>
  <div class="posts-list">
    <article 
      class="post-item" 
      data-post-tags="javascript,es2022,tutorial">
      <h3><a href="/posts/modern-js/">Modern JavaScript Features</a></h3>
      <time datetime="2025-01-15">January 15, 2025</time>
      <div class="post-tags">
        <span class="tag" data-tag="javascript">javascript</span>
        <span class="tag" data-tag="es2022">es2022</span>
        <span class="tag" data-tag="tutorial">tutorial</span>
      </div>
    </article>
    <!-- More posts... -->
  </div>
</section>
```

**Required Attributes**:
- `data-post-tags`: Comma-separated list of post tags
- `data-tag`: Individual tag name (for nested filtering)

## JavaScript API

### Core Functions

```javascript
/**
 * Initialize tag cloud functionality
 * Called on DOMContentLoaded
 */
function initTagCloud() {
  setupTagClickHandlers();
  setupKeyboardNavigation();
  setupReducedMotion();
  loadInitialState();
}

/**
 * Filter posts by selected tag - dynamically renders matching posts
 * @param {string} tagName - Tag to filter by
 * @param {boolean} scrollToResults - Whether to scroll to results
 */
function filterByTag(tagName, scrollToResults = true) {
  // Gets posts from postsByTag collection and dynamically creates DOM elements
  // Implementation details in research.md
}

/**
 * Create a post DOM element from post data
 * @param {Post} post - Post data object
 * @returns {HTMLElement} - Article element with post content
 */
function createPostElement(post) {
  // Creates semantic HTML structure for a single post
  // Includes title, date, tags, and metadata
}

/**
 * Show all posts (clear filter)
 */
function showAllPosts() {
  // Reset filter state
}

/**
 * Update URL hash with current filter
 * @param {string|null} tagName - Current tag or null for all
 */
function updateUrlHash(tagName) {
  // Optional: Update browser history
}
```

### Event Handlers

```javascript
/**
 * Handle tag click events
 * @param {Event} event - Click event
 */
function handleTagClick(event) {
  event.preventDefault();
  const tagName = event.target.dataset.tag;
  filterByTag(tagName);
  updateActiveTag(event.target);
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleTagKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleTagClick(event);
  }
}
```

### State Management

```javascript
/**
 * Current application state
 */
const TagCloudState = {
  currentTag: null,        // Currently selected tag
  allPosts: [],           // All post elements
  visiblePosts: [],       // Currently visible posts
  isFiltered: false       // Whether filter is active
};

/**
 * Update visual state of active tag
 * @param {HTMLElement} activeElement - Currently selected tag element
 */
function updateActiveTag(activeElement) {
  // Remove previous active states
  // Add active state to current element
}
```

## CSS Custom Properties Contract

### Tag Scaling Variables

```css
:root {
  --tag-min-size: 0.875rem;    /* Minimum tag font size */
  --tag-max-size: 2rem;        /* Maximum tag font size */
  --tag-scale-range: 1.125rem; /* Difference between min/max */
}

.tag-cloud-item {
  /* Set by JavaScript based on post count */
  --post-count: 1;             /* Number of posts with this tag */
  --display-weight: 0.5;       /* Calculated weight (0.0-1.0) */
  
  /* Calculated font size */
  font-size: calc(
    var(--tag-min-size) + 
    (var(--display-weight) * var(--tag-scale-range))
  );
}
```

### Animation Variables

```css
.tag-cloud-item {
  --float-duration: 6s;        /* Animation cycle duration */
  --float-delay: 0s;           /* Staggered start delay */
  --float-distance: 10px;      /* Maximum movement distance */
}
```

## Accessibility Contract

### ARIA Requirements

- Tag cloud has `role="region"` with descriptive `aria-label`
- Each tag has `aria-label` including post count
- Results section has `role="region"` with descriptive `aria-label`
- Focus management moves to results after filtering

### Keyboard Navigation

- All tags focusable with `tabindex="0"`
- Enter and Space keys activate tag filtering
- Tab order follows visual layout
- Focus indicators clearly visible

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .tag-cloud-item {
    animation: none;
  }
}
```

## Performance Contract

### Loading Requirements

- Tag cloud renders within 100ms of page load
- Filtering completes within 50ms
- Smooth 60fps animations on modern browsers
- No layout thrashing during animations

### Memory Usage

- Client-side data <1MB total
- No memory leaks from event listeners
- Efficient DOM queries with caching
