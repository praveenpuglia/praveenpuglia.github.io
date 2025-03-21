---
layout: post
title: Make your web apps look a little more native
date: 2016-05-18
tags: [typography, font]
---

Everybody loves Medium and there is just something about it that attracts people. The more I used it, the more I realized there was something wonderful it was doing to give it's users, the native feeling. I personally love apps when they adapt to different systems & devices. It shows that they care for their users and what sort of system they use. The user doesn't need to adapt to the app but the app adapts for the user's environment. Making elements adapt to native design system also creates a sense of trust.

The secret lies in the font stack used by Medium. The stack tries to cover up majority of the operating systems and provides decent fallbacks when needed. This approach is different than what I have seen for long time. Most modern web apps try to maintain their uniqueness and try to load a typeface their designers might have agreed upon for all browsers and systems.

The following is what Medium does.

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
```

This declaration takes care of the font for critical common elements you will come across on Medium. As we can see, it covers up for Mac, Windows, Ubuntu, Android etc.

So the next time you are looking to build something that needs to provide a native look, try this out.
