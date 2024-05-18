---
layout: post
title: Reusing Areas In CSS Grid
date: 2017-09-18
---

I have been playing around with CSS Grids for some time now and it has been an extremely delightful experience. So much so that I have submitted a talk proposal at [MetaRefresh 2017](https://metarefresh.talkfunnel.com/2017/2-grid-is-fun). If it gets selected, it's gonna be my first time ever speaking at a conference. I am nervous. If you are gonna be at MetaRefresh and wanna know about Grids, go vote! 😊

Back to the topic...

Grid has areas. We can define the entire layout with area names and ASCII art. For example -

```css
.container {
    display: grid;
    grid-template-areas:
        "header header"
        "main  sidebar"
        "footer footer";
}
/* Assign areas...*/
.page-header {
    grid-area: header;
}
...
```

This is going to generate a standard two column layout grid. Something like this...
![Two column layout using CSS Grid areas](/assets/images/2017/grid-reuse-1.avif)

What's great about area names is that we can reuse them. Confusing? Let me give an example.

Say we are creating a comments section for a blog which has to look like this.
![Comments section from a typical blog](/assets/images/2017/grid-reuse-2.avif)

And if we add a little bit of borders, we see how the grid should be constructed.
![Comments layout with grid lines](/assets/images/2017/grid-reuse-3.avif)

It's clear that the avatar and the comment(input/text) is used exactly the same way in both the places. So, we should be able to create two grids, both of which can dedicate a place for avatar and the comment.
Here's what I mean.
![Depicting areas.](/assets/images/2017/grid-reuse-4.avif)

Here's how that might look in code.

```html
<!-- Comment Area -->
<div class="comment-input">
  <div class="avatar"></div>
  <div class="input">
    <!-- in real world, there'll be a text area in here! -->
    Your comments here...
  </div>
</div>

<!-- Comment List -->
<ul class="comment-list">
  <li class="comment-item">
    <div class="avatar"></div>
    <div class="comment">Your comment...</div>
    <div class="meta">few minutes ago... by Praveen Puglia</div>

    <!-- Nested Thread -->
    <ul class="comment-list">
      <li class="comment-item">
        <div class="avatar"></div>
        <div class="comment">Your comment...</div>
        <div class="meta">few minutes ago... by Someone Else</div>
      </li>
    </ul>
    <!-- Nested Thread Ends -->
  </li>
</ul>
```

... & relevant CSS.

```css
.avatar {
  grid-area: avatar;
  height: 64px;
  width: 64px;
}
/* Comment Input */
.comment-input {
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-areas: "avatar comment";
}
.input {
  grid-area: comment;
}

/* Comment List */
.comment-list {
  /* To make sure that nested threads take up the entire width of the grid. */
  grid-column-end: span 2;
}
.comment-item {
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-areas:
    "avatar comment"
    "meta meta";
}
.comment {
  grid-area: comment;
}
.meta {
  grid-area: meta;
}
```

Things to notice,

- We declared two grids which greatly describe the relation among different elements.
- We totally reused the area names `avatar` and `comment` among the grids.
- We reused the `.avatar` element in both the places.
- We created two different elements `.input` & `.comment` which belong to the same area in both the grids but we still can style them individually.

To me, grid, in this case and many more like it, is doing a great job at establishing relationships among elements used on page and making it easy to understand for humans.

Here's the final demo!

<p data-height="324" data-theme-id="4977" data-slug-hash="PJPMOJ" data-default-tab="html,result" data-user="praveenpuglia" data-embed-version="2" data-pen-title="A Generic Comments Section - Using CSS Grids" class="codepen">See the Pen <a href="https://codepen.io/praveenpuglia/pen/PJPMOJ/">A Generic Comments Section - Using CSS Grids</a> by Praveen Puglia (<a href="https://codepen.io/praveenpuglia">@praveenpuglia</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
