# Quickstart: Tag-Based Content Search Page

**Feature**: 001-tag-search-page  
**Date**: 2025-10-17  
**Estimated Time**: 4-6 hours

## Prerequisites

- Existing Eleventy site with blog posts containing tags in frontmatter
- Node.js 24.4.0 (managed via Volta)
- Basic understanding of Nunjucks templates and CSS

## Implementation Steps

### Step 1: Update Eleventy Configuration (30 minutes)

Add tag collections to `.eleventy.js`:

```javascript
// Add after existing collections
eleventyConfig.addCollection("tagList", function(collection) {
  const tagMap = new Map();
  
  collection.getAll().forEach(item => {
    if ("tags" in item.data && Array.isArray(item.data.tags)) {
      const userTags = item.data.tags.filter(tag => 
        !["all", "nav", "post", "posts"].includes(tag)
      );
      
      userTags.forEach(tag => {
        if (tagMap.has(tag)) {
          tagMap.get(tag).postCount++;
        } else {
          tagMap.set(tag, {
            name: tag,
            slug: tag.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            postCount: 1
          });
        }
      });
    }
  });
  
  const tags = Array.from(tagMap.values());
  const maxCount = Math.max(...tags.map(t => t.postCount));
  const minCount = Math.min(...tags.map(t => t.postCount));
  
  tags.forEach(tag => {
    tag.displayWeight = maxCount > minCount 
      ? (tag.postCount - minCount) / (maxCount - minCount)
      : 0.5;
  });
  
  return tags.sort((a, b) => a.name.localeCompare(b.name));
});
```

### Step 2: Create Tags Page Template (45 minutes)

Create `src/tags.md`:

```markdown
---
layout: base
title: Browse by Tags
permalink: /tags/
---

<section class="tag-cloud" role="region" aria-label="Browse topics">
  <h1>Explore Topics</h1>
  <div class="tag-cloud-container">
    {% for tag in collections.tagList %}
    <button 
      class="tag-cloud-item" 
      data-tag="{{ tag.name }}"
      data-post-count="{{ tag.postCount }}"
      role="button"
      tabindex="0"
      aria-label="Filter by {{ tag.name }}, {{ tag.postCount }} posts"
      style="--post-count: {{ tag.postCount }}; --display-weight: {{ tag.displayWeight }};">
      {{ tag.name }}
    </button>
    {% endfor %}
  </div>
</section>

<section class="post-results" id="results" role="region" aria-label="Filtered posts" style="display: none;">
  <h2 class="results-title">Posts tagged with "<span id="current-tag"></span>"</h2>
  <ol class="posts-list" id="posts-list">
    <!-- Posts will be dynamically inserted here -->
  </ol>
</section>

<script>
// Tag cloud functionality - see client-api.md for full implementation
document.addEventListener('DOMContentLoaded', function() {
  // Implementation goes here
});
</script>
```

### Step 3: Add CSS Styling (90 minutes)

Create `static/css/tags.css`:

**Important Notes**:
- Only use CSS variables from `static/css/variables.css`
- Match the styling of the `/posts` page for the post list
- Add subtle shadows to tag cloud items for floating effect
- Use semantic HTML classes (`.post-item`, `.post-date`, `.postlist-link`, etc.)
- Use Flexbox (not Grid) for tag cloud to create organic, masonry-like layout with tight spacing (0.75rem gap)

```css
/* Tag Cloud Layout */
.tag-cloud {
  margin: 2rem 0;
  text-align: center;
}

.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  min-height: 200px;
  align-items: center;
}

/* Tag Cloud Items */
.tag-cloud-item {
  --tag-min-size: 0.875rem;
  --tag-max-size: 2rem;
  --tag-scale-range: 1.125rem;
  
  background: var(--color-accent, #007acc);
  color: white;
  border: none;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  font-size: calc(
    var(--tag-min-size) + 
    (var(--display-weight) * var(--tag-scale-range))
  );
  
  /* Floating animation */
  animation: float 6s ease-in-out infinite;
  animation-delay: calc(var(--post-count) * 0.1s);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-10px) translateX(5px); }
  66% { transform: translateY(5px) translateX(-3px); }
}

.tag-cloud-item:hover,
.tag-cloud-item:focus {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tag-cloud-item.active {
  background: var(--color-primary, #333);
}

/* Results Section */
.post-results {
  margin-top: 3rem;
}

.posts-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.post-item {
  padding: 1.5rem;
  border: 1px solid var(--color-border, #e1e1e1);
  border-radius: 0.5rem;
}

.post-item h3 {
  margin: 0 0 0.5rem 0;
}

.post-item time {
  color: var(--color-muted, #666);
  font-size: 0.875rem;
}

.post-tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.post-tags .tag {
  background: var(--color-light, #f5f5f5);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .tag-cloud-item {
    animation: none;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .tag-cloud-container {
    padding: 1rem;
  }
  
  .tag-cloud-item {
    --tag-min-size: 0.75rem;
    --tag-max-size: 1.5rem;
  }
}
```

### Step 4: Implement JavaScript Functionality (120 minutes)

Add to the `<script>` section in `tags.md`:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-cloud-item');
  const resultsSection = document.querySelector('.post-results');
  const currentTagSpan = document.getElementById('current-tag');
  const postsListContainer = document.getElementById('posts-list');
  
  let currentTag = null;
  
  // Posts data from Eleventy collections
  const postsByTag = {{ collections.postsByTag | jsonify }};
  
  // Initialize event listeners
  tagButtons.forEach(button => {
    button.addEventListener('click', handleTagClick);
    button.addEventListener('keydown', handleTagKeydown);
  });
  
  function handleTagClick(event) {
    const tagName = event.target.dataset.tag;
    filterByTag(tagName);
    updateActiveTag(event.target);
  }
  
  function handleTagKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTagClick(event);
    }
  }
  
  function filterByTag(tagName) {
    currentTag = tagName;
    currentTagSpan.textContent = tagName;
    
    // Get posts for this tag
    const posts = postsByTag[tagName] || [];
    
    // Clear existing posts
    postsListContainer.innerHTML = '';
    
    // Create and append post elements
    posts.forEach(post => {
      const postElement = createPostElement(post);
      postsListContainer.appendChild(postElement);
    });
    
    resultsSection.style.display = 'block';
    
    // Update results title with count
    const resultsTitle = document.querySelector('.results-title');
    if (resultsTitle) {
      resultsTitle.innerHTML = `Posts tagged with "<span id="current-tag">${tagName}</span>" (${posts.length} ${posts.length === 1 ? 'post' : 'posts'})`;
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
  
  // Create a post element from post data (matching /posts page structure)
  function createPostElement(post) {
    const li = document.createElement('li');
    li.className = 'post-item';
    
    // Format date to match /posts page (e.g., "12 Jan, 2025")
    const postDate = new Date(post.date);
    const day = String(postDate.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[postDate.getMonth()];
    const year = postDate.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
    const isoDate = postDate.toISOString().split('T')[0];
    
    // Create tags HTML
    const tagsHTML = post.tags.map(tag => 
      `<span class="tag" data-tag="${tag}" role="button" tabindex="0" aria-label="Filter by ${tag}">${tag}</span>`
    ).join('');
    
    li.innerHTML = `
      <time class="post-date" datetime="${isoDate}">${formattedDate}</time>
      <a href="${post.url}" class="postlist-link">
        <h4 class="post-title">${post.title}</h4>
      </a>
      <div class="post-tags">
        ${tagsHTML}
      </div>
    `;
    
    return li;
  }
  
  function updateActiveTag(activeButton) {
    tagButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }
});
```

### Step 5: Update Site Navigation (15 minutes)

Add tags page to main navigation in `src/_includes/nav.njk`:

```html
<nav>
  <a href="/">Home</a>
  <a href="/posts/">Posts</a>
  <a href="/tags/">Tags</a>
</nav>
```

### Step 6: Test and Validate (30 minutes)

1. **Build Test**: Run `npm run build` to ensure no errors
2. **Visual Test**: Check tag cloud renders with proper sizing
3. **Interaction Test**: Click tags to verify filtering works
4. **Accessibility Test**: Navigate with keyboard, check screen reader compatibility
5. **Mobile Test**: Verify responsive behavior on small screens

## Verification Checklist

- [ ] Tag cloud displays all unique tags from blog posts
- [ ] Tags scale linearly based on post count
- [ ] Clicking a tag filters posts correctly
- [ ] Page scrolls to results after filtering
- [ ] All posts show title, date, and tags
- [ ] Clicking tags in results updates filter
- [ ] Animations work smoothly (60fps)
- [ ] Keyboard navigation functions properly
- [ ] Mobile layout is responsive
- [ ] No console errors or accessibility warnings

## Troubleshooting

**Tags not appearing**: Check that blog posts have `tags` in frontmatter as arrays
**Animations stuttering**: Verify CSS `will-change` property is applied
**Filtering not working**: Ensure `data-post-tags` attributes are correctly set
**Mobile issues**: Test CSS Grid and Flexbox support in target browsers

## Next Steps

After basic implementation:
1. Add URL hash support for bookmarkable filters
2. Implement "clear filter" functionality
3. Add search within filtered results
4. Consider tag popularity indicators beyond size
