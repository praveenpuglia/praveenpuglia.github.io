---
description: "Task list for Tag-Based Content Search Page implementation"
---

# Tasks: Tag-Based Content Search Page

**Input**: Design documents from `/specs/001-tag-search-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Visual validation using Cursor's browser automation - no automated test framework required per user preference.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Eleventy Site**: `src/` for source files, `static/` for static assets, `_site/` for generated output
- **Content**: `src/posts/` for blog posts, `src/_includes/` for templates
- **Assets**: `src/assets/` for processed assets, `static/` for direct-copy assets
- **Templates**: `src/_includes/` for Nunjucks templates and partials
- Paths shown below follow Eleventy conventions per plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing Eleventy project structure matches plan.md requirements
- [x] T002 [P] Create static/css/tags.css file for tag cloud styling
- [x] T003 [P] Backup existing .eleventy.js configuration before modifications

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Add tagList collection to .eleventy.js with tag aggregation and display weight calculation
- [x] T005 [P] Add postsByTag collection to .eleventy.js for efficient client-side filtering
- [x] T006 [P] Create src/tags.md page with basic frontmatter and layout configuration
- [x] T007 Verify existing post collection processes tags correctly from frontmatter
- [x] T008 Test build process to ensure new collections generate without errors

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Tag Cloud (Priority: P1) 🎯 MVP

**Goal**: Display an animated tag cloud showing all blog post tags with linear scaling and floating animations

**Independent Test**: Visit /tags page and verify animated tag cloud displays all unique tags with proper sizing and smooth floating animations

### Visual Validation for User Story 1

**NOTE: Use Cursor's browser automation for visual validation**

- [x] T009 [P] [US1] Visual test: Tag cloud renders with all unique tags from blog posts
- [x] T010 [P] [US1] Visual test: Tags scale linearly based on post count (larger tags = more posts)
- [x] T011 [P] [US1] Visual test: Tags animate with subtle floating up/down and horizontal sway

### Implementation for User Story 1

- [x] T012 [P] [US1] Create tag cloud HTML structure in src/tags.md with semantic elements and ARIA labels
- [x] T013 [P] [US1] Implement CSS Grid layout for tag cloud container in static/css/tags.css
- [x] T014 [US1] Add CSS Custom Properties for tag scaling based on post count in static/css/tags.css
- [x] T015 [US1] Implement CSS keyframe animations for floating effect in static/css/tags.css
- [x] T016 [US1] Add responsive design rules for mobile tag cloud in static/css/tags.css
- [x] T017 [US1] Implement accessibility features (keyboard focus, reduced motion) in static/css/tags.css

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Filter Content by Tag (Priority: P2)

**Goal**: Enable clicking tags to filter and display related blog posts with automatic scrolling to results

**Independent Test**: Click any tag in the cloud and verify filtered posts appear below with automatic scroll to results section

### Visual Validation for User Story 2

- [x] T018 [P] [US2] Visual test: Clicking tag filters posts correctly showing only matching content
- [x] T019 [P] [US2] Visual test: Page automatically scrolls to results section after tag selection
- [x] T020 [P] [US2] Visual test: Filtered results show post title, date, and tags for each entry

### Implementation for User Story 2

- [x] T021 [P] [US2] Create post results HTML structure in src/tags.md with semantic article elements
- [x] T022 [P] [US2] Add data attributes to posts for client-side filtering in src/tags.md
- [x] T023 [US2] Implement JavaScript tag click handlers with event delegation in src/tags.md
- [x] T024 [US2] Add JavaScript filtering logic to show/hide posts based on selected tag in src/tags.md
- [x] T025 [US2] Implement smooth scrolling to results section in src/tags.md
- [x] T026 [US2] Add CSS styling for post results layout and responsive design in static/css/tags.css
- [x] T027 [US2] Implement active tag state visual feedback in static/css/tags.css

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Post Metadata (Priority: P3)

**Goal**: Display comprehensive post metadata and enable tag-to-tag navigation within filtered results

**Independent Test**: Filter posts by tag and verify each result shows complete metadata with clickable tags for further filtering

### Visual Validation for User Story 3

- [x] T028 [P] [US3] Visual test: Post metadata displays publication date in readable format
- [x] T029 [P] [US3] Visual test: All post tags are visible and styled as clickable elements
- [x] T030 [P] [US3] Visual test: Clicking tags within results updates filter to new tag

### Implementation for User Story 3

- [x] T031 [P] [US3] Add comprehensive post metadata display to post results template in src/tags.md
- [x] T032 [P] [US3] Implement clickable tag elements within post results in src/tags.md
- [x] T033 [US3] Add JavaScript event handlers for tag-to-tag navigation in filtered results in src/tags.md
- [x] T034 [US3] Implement tag highlighting and interaction states in static/css/tags.css
- [x] T035 [US3] Add responsive styling for post metadata on mobile devices in static/css/tags.css

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final optimizations

- [x] T036 [P] Add tags page link to main site navigation in src/_includes/nav.njk
- [x] T037 [P] Optimize CSS for performance with will-change properties and efficient selectors in static/css/tags.css
- [x] T038 [P] Add error handling for edge cases (empty tags, special characters) in src/tags.md
- [x] T039 [P] Implement keyboard navigation support for full accessibility in src/tags.md
- [x] T040 Validate WCAG 2.1 AA compliance using browser accessibility tools
- [x] T041 Performance optimization: ensure 60fps animations and <3s page load
- [x] T042 Cross-browser testing on modern browsers (Chrome, Firefox, Safari, Edge)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 tag cloud but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Enhances US2 results but independently testable

### Within Each User Story

- Visual validation tasks can run in parallel with implementation
- CSS tasks can run in parallel with HTML structure tasks
- JavaScript functionality depends on HTML structure completion
- Responsive design follows desktop implementation

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All visual validation tasks marked [P] can run in parallel within each story
- CSS and HTML tasks within a story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch visual validation tasks together:
Task: "Visual test: Tag cloud renders with all unique tags from blog posts"
Task: "Visual test: Tags scale linearly based on post count"
Task: "Visual test: Tags animate with subtle floating animations"

# Launch parallel implementation tasks:
Task: "Create tag cloud HTML structure in src/tags.md"
Task: "Implement CSS Grid layout in static/css/tags.css"
Task: "Add CSS Custom Properties for scaling in static/css/tags.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently using visual validation
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Visual validation → Deploy/Demo (MVP!)
3. Add User Story 2 → Visual validation → Deploy/Demo
4. Add User Story 3 → Visual validation → Deploy/Demo
5. Each story adds value without breaking previous stories

### Single Developer Strategy

1. Complete Setup + Foundational phases sequentially
2. Implement User Story 1 (P1) completely before moving to P2
3. Use parallel tasks within each story for efficiency
4. Validate each story independently before proceeding

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Use Cursor's browser automation for visual validation instead of automated tests
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
