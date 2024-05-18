---
layout: post
title: Use AVIF today
description: Short post on how to serve AVIF today with fallback for unsupported browsers.
tags: [avif, image, compression, html]
date: 2021-07-08
---

Short one!

I am currently working on revamping my website, which I am hoping will be up soon! I am taking this opportunity to move away from [Jekyll](https://jekyllrb.com/) and choosing to go with [Eleventy](https://www.11ty.dev/). To be honest, I am enjoying it quite a bit. Hopefully a post on that will soon be up.

One of the interesting things that I wanted to try out is to serve AVIF images because [boy it compresses](https://squoosh.app/)! Hoof! You can literally get the same quality in less than half the size.

Here' the thing though. [AVIF support](https://caniuse.com/?search=avif) is pretty flaky at the moment. That means I would have to serve AVIF image to browsers that do support it and serve a diff format to those who don't.

Good'ol `<picture>` element comes to rescue. We declare multiple `source`s pointing to the same image in diff formats. The browsers pickup the best image they support. So Chrome and Opera end up serving AVIF to us and others serve the WEBP version.

```html
<picture>
  <source srcset="home-banner.avif" type="image/avif" />
  <source srcset="home-banner.webp" type="image/webp" />
  <img
    class="home-banner"
    decoding="async"
    loading="lazy"
    src="home-banner.webp"
    alt="Home Banner"
  />
</picture>
```

If you are wondering why we are using that `<img>` tag inside `<picture>`, please [head over to MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture).

That's it!

Read More

- [https://jakearchibald.com/2020/avif-has-landed/](https://jakearchibald.com/2020/avif-has-landed/)
- [https://avif.io/](https://avif.io/)
