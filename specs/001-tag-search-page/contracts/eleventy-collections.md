# Eleventy Collections Contract

**Feature**: Tag-Based Content Search Page  
**Type**: Build-time Data Processing  
**Date**: 2025-10-17

## Tag Collection API

### Collection: `tagList`

**Purpose**: Provides all unique tags with metadata for tag cloud generation

**Input**: Eleventy collections.all (all site content)
**Output**: Array of tag objects with post counts

```javascript
// Collection Definition (.eleventy.js)
eleventyConfig.addCollection("tagList", function(collection) {
  const tagMap = new Map();
  
  collection.getAll().forEach(item => {
    if ("tags" in item.data && Array.isArray(item.data.tags)) {
      // Filter out system tags
      const userTags = item.data.tags.filter(tag => 
        !["all", "nav", "post", "posts"].includes(tag)
      );
      
      userTags.forEach(tag => {
        if (tagMap.has(tag)) {
          tagMap.get(tag).postCount++;
          tagMap.get(tag).posts.push(item);
        } else {
          tagMap.set(tag, {
            name: tag,
            slug: tag.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            postCount: 1,
            posts: [item]
          });
        }
      });
    }
  });
  
  // Convert to array and calculate display weights
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

**Output Schema**:
```typescript
interface TagListItem {
  name: string;           // Original tag name
  slug: string;           // URL-safe version
  postCount: number;      // Number of posts with this tag
  displayWeight: number;  // 0.0-1.0 for visual scaling
  posts: EleventyItem[];  // Array of posts containing this tag
}

type TagList = TagListItem[];
```

### Collection: `postsByTag`

**Purpose**: Provides posts grouped by tag for efficient filtering

```javascript
// Collection Definition (.eleventy.js)
eleventyConfig.addCollection("postsByTag", function(collection) {
  const postsByTag = new Map();
  
  collection.getFilteredByGlob("./src/posts/*.md").forEach(post => {
    if ("tags" in post.data && Array.isArray(post.data.tags)) {
      const userTags = post.data.tags.filter(tag => 
        !["all", "nav", "post", "posts"].includes(tag)
      );
      
      userTags.forEach(tag => {
        if (!postsByTag.has(tag)) {
          postsByTag.set(tag, []);
        }
        postsByTag.get(tag).push({
          title: post.data.title,
          date: post.date,
          url: post.url,
          tags: userTags
        });
      });
    }
  });
  
  return Object.fromEntries(postsByTag);
});
```

**Output Schema**:
```typescript
interface PostMetadata {
  title: string;
  date: Date;
  url: string;
  tags: string[];
}

interface PostsByTag {
  [tagName: string]: PostMetadata[];
}
```

## Template Data Contract

### Tags Page Data

**Template**: `src/tags.md`
**Layout**: `src/_includes/base.njk`

**Available Data**:
```javascript
{
  collections: {
    tagList: TagListItem[],      // For tag cloud generation
    postsByTag: PostsByTag,      // For filtering functionality
    posts: EleventyItem[]        // All blog posts
  },
  // Standard Eleventy data
  page: { url: "/tags/", ... },
  // Site metadata
  siteMeta: { name, url, ... }
}
```

### Client-Side Data Format

**Embedded in HTML**: JSON data for JavaScript filtering

```html
<script type="application/json" id="tags-data">
{
  "tags": [
    {
      "name": "javascript",
      "slug": "javascript", 
      "postCount": 15,
      "displayWeight": 1.0
    }
  ],
  "postsByTag": {
    "javascript": [
      {
        "title": "Modern JavaScript Features",
        "date": "2025-01-15",
        "url": "/posts/modern-js-features/",
        "tags": ["javascript", "es2022"]
      }
    ]
  }
}
</script>
```

## Error Handling

**Empty Tags**: If no posts have tags, return empty arrays
**Invalid Tags**: Filter out non-string or empty tag values
**Missing Frontmatter**: Skip posts without tags property
**Build Failures**: Log warnings for malformed tag data, continue build
