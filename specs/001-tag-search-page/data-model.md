# Data Model: Tag-Based Content Search Page

**Feature**: 001-tag-search-page  
**Date**: 2025-10-17  
**Source**: Extracted from spec.md functional requirements

## Entities

### Tag
**Description**: A categorization label extracted from blog post frontmatter

**Attributes**:
- `name` (string): The tag text (e.g., "javascript", "css", "eleventy")
- `postCount` (integer): Number of posts containing this tag
- `displayWeight` (float): Calculated scaling factor for visual size (postCount / maxPostCount)
- `slug` (string): URL-safe version of tag name for filtering

**Validation Rules**:
- `name` must be non-empty string
- `name` must not contain only whitespace
- `postCount` must be positive integer (≥1)
- `displayWeight` must be between 0.0 and 1.0
- `slug` must be lowercase, alphanumeric with hyphens only

**State Transitions**:
- Created: When first post with tag is processed
- Updated: When post count changes during build
- No deletion: Tags persist as long as posts reference them

### Post
**Description**: A blog entry with associated metadata and tags

**Attributes**:
- `title` (string): Post title from frontmatter
- `date` (Date): Publication date from frontmatter
- `url` (string): Generated permalink to post
- `tags` (Array<string>): List of tag names from frontmatter
- `excerpt` (string, optional): Post summary or first paragraph

**Validation Rules**:
- `title` must be non-empty string
- `date` must be valid Date object
- `url` must be valid relative path starting with "/"
- `tags` array can be empty but must be array type
- Each tag in `tags` must be valid Tag.name

**Relationships**:
- Post belongs to many Tags (many-to-many via tags array)
- Tag aggregates many Posts (calculated relationship)

### TagCloud
**Description**: Visual representation of all available tags with sizing

**Attributes**:
- `tags` (Array<Tag>): All unique tags sorted by name
- `maxPostCount` (integer): Highest post count among all tags
- `minPostCount` (integer): Lowest post count among all tags
- `totalTags` (integer): Count of unique tags

**Calculated Properties**:
- `isEmpty` (boolean): true if totalTags === 0
- `hasVariance` (boolean): true if maxPostCount > minPostCount

**Validation Rules**:
- `tags` array must contain only valid Tag objects
- `maxPostCount` >= `minPostCount`
- `totalTags` must equal `tags.length`

## Data Flow

### Build Time (Eleventy Processing)
1. **Collection Phase**: Eleventy processes all posts and extracts frontmatter
2. **Tag Aggregation**: Custom collection aggregates unique tags with post counts
3. **Weight Calculation**: Display weights calculated based on min/max post counts
4. **Template Data**: Tag and post data passed to Nunjucks templates

### Runtime (Client-Side)
1. **Page Load**: All tags and posts rendered in DOM with data attributes
2. **Tag Selection**: User clicks tag, JavaScript filters posts by tag name
3. **Result Display**: Matching posts shown, others hidden via CSS
4. **State Update**: URL hash updated to reflect current filter (optional)

## Storage Considerations

**Source of Truth**: Blog post frontmatter in markdown files
**Build Output**: Static HTML with embedded JSON data for client-side filtering
**No Persistence**: All data regenerated on each build, no database required
**Caching**: Relies on Cloudflare Pages CDN for performance

## Scale Assumptions

**Current Scale**: ~30 blog posts, estimated 50-100 unique tags
**Expected Growth**: 5-10 new posts per year, linear tag growth
**Performance Target**: <100ms tag aggregation during build
**Memory Usage**: <1MB for all tag/post data in browser
