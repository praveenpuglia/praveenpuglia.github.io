---
layout: base
title: Browse by Tags
permalink: /tags/
eleventyExcludeFromCollections: true
---

<link rel="stylesheet" href="/css/tags.css">

<main class="container">
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
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-cloud-item');
  const resultsSection = document.querySelector('.post-results');
  const currentTagSpan = document.getElementById('current-tag');
  const postsListContainer = document.getElementById('posts-list');
  
  let currentTag = null;
  
  // Posts data from Eleventy collections
  const postsByTag = {{ collections.postsByTag | jsonify }};
  
  // Initialize event listeners for tag cloud
  tagButtons.forEach(button => {
    button.addEventListener('click', handleTagClick);
    button.addEventListener('keydown', handleTagKeydown);
  });
  
  // Initialize event listeners for post result tags (using event delegation)
  resultsSection.addEventListener('click', handlePostTagClick);
  resultsSection.addEventListener('keydown', handlePostTagKeydown);
  
  // Check URL for tag parameter on page load
  loadTagFromURL();
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', function() {
    loadTagFromURL();
  });
  
  // Load tag from URL query parameter
  function loadTagFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagFromURL = urlParams.get('tag');
    
    if (tagFromURL && postsByTag[tagFromURL]) {
      filterByTag(tagFromURL, false); // false = don't update URL again
      
      // Find and highlight the corresponding tag button
      const tagButton = Array.from(tagButtons).find(btn => btn.dataset.tag === tagFromURL);
      if (tagButton) {
        updateActiveTag(tagButton);
      }
    }
  }
  
  // Handle tag click events
  function handleTagClick(event) {
    event.preventDefault();
    const tagName = event.target.dataset.tag;
    filterByTag(tagName, true); // true = update URL
    updateActiveTag(event.target);
  }
  
  // Handle keyboard navigation
  function handleTagKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTagClick(event);
    }
  }
  
  // Filter posts by selected tag
  function filterByTag(tagName, updateURL = true) {
    // Handle edge cases
    if (!tagName || typeof tagName !== 'string') {
      console.warn('Invalid tag name provided:', tagName);
      return;
    }
    
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
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Update results title with count
    const resultsTitle = document.querySelector('.results-title');
    if (resultsTitle) {
      resultsTitle.innerHTML = `Posts tagged with "<span id="current-tag">${tagName}</span>" (${posts.length} ${posts.length === 1 ? 'post' : 'posts'})`;
    }
    
    // Update URL with query parameter
    if (updateURL) {
      const url = new URL(window.location);
      url.searchParams.set('tag', tagName);
      window.history.pushState({ tag: tagName }, '', url);
    }
    
    // Scroll to results with smooth animation
    resultsSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
  
  // Create a post element from post data
  function createPostElement(post) {
    const li = document.createElement('li');
    li.className = 'post-item';
    
    // Format date
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
  
  // Update visual state of active tag
  function updateActiveTag(activeButton) {
    tagButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }
  
  // Handle clicks on tags within post results
  function handlePostTagClick(event) {
    if (event.target.classList.contains('tag')) {
      event.preventDefault();
      const tagName = event.target.dataset.tag;
      filterByTag(tagName, true); // true = update URL
      
      // Find and highlight the corresponding tag in the cloud
      const cloudTag = Array.from(tagButtons).find(btn => btn.dataset.tag === tagName);
      if (cloudTag) {
        updateActiveTag(cloudTag);
      }
    }
  }
  
  // Handle keyboard navigation on post result tags
  function handlePostTagKeydown(event) {
    if (event.target.classList.contains('tag') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handlePostTagClick(event);
    }
  }
});
</script>
