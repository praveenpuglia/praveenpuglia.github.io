---
layout: post
title: Animating CSS Snake Art
date: 2017-05-18
---

If you think the article has a terrible title, you are right. Moving on...

I spend a good amount of time on CodePen creating CSS artwork. It's relaxing for me and gives me an opportunity to try out crazy ideas and see what I can come up with. If you don't want to read it till the end, head over to [my profile](http://codepen.io/praveenpuglia) and take a look.

I have been doing these things for some time now but never wrote an article explaining any of them. So I thought to myself, let's do that and start with a simple one. A Snake!

Here's the final output.

<video width="50%" style="display: block; margin: auto;" controls src="/assets/videos/2017/snake-final.webm"></video>

## How did I arrive here?

### Heads Up!

- A snake's body size reduces towards the end.
- The slithering effect of a snake comes from the fact that different parts of a snake's body seems to be moving at different time.
  - For us, that means the body needs to be _made of different parts_ that can move at different times.
- Center everything on screen.( Not so important! )

### HTML

Just a bunch of blobs that I'll use to compose the body of the snake. The size of `.blob`s will reduce from top to bottom.

```html
<!-- .blob*20 + TAB via Emmet-->
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
<div class="blob"></div>
```

### Boilerplate CSS

```css
body {
  /*to center everything on page( the blobs ) and line them vertically*/
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh; /*so it takes up entire viewport height*/
  margin: 0; /*reset*/
  background: #333; /*a dark background*/
}

/*Basic styles for all blobs*/
.blob {
  border-radius: 50%;
  background-image: linear-gradient(
    to bottom right,
    hsl(30, 100%, 50%),
    hsl(50, 100%, 50%)
  );
  transform: translate3d(-40px, 0, 0); /*will be required later*/
}
```

### Generating the body

Notice, there's no `width` and `height` property set to the blobs. I'll make the blobs squares of reducing sides using SCSS.

```scss
@for $i from 1 through 20 {
  .blob:nth-child(#{$i}) {
    //From Basics: the body parts need to move at different time for the slithering effect
    // the delay increases from upper body to lower body
    animation-delay: $i * 0.1s;

    //start with 20px as sides. As $i increases, the dimensions reduce.
    width: 21px - $i;
    height: 21px - $i;
  }
}
```

At this point, all you'll see is this.
<img style="display: block; margin: auto" width="50%" src="/assets/images/2017/snake-1.avif" />

### The Animation

Looks like our snake's body is set and all the body parts are now centered on the page. I have also given the `animation-delay` to each of the `.blob`s.

What about the animation?

You see, it's easy to trick human eyes. If we move each blob horizontally the same amount, with same time duration but a little bit of gradually increasing delay, it feels like it's moving like a snake.

Don't believe me? Here's the video again. Keep your cusor on one of the blobs and you'll see that it only moves horizontally.

<video width="50%" style="display: block; margin: auto;" controls src="/assets/videos/2017/snake-final.webm"></video>

So let's do that.

```css
@keyframes blob {
  50% {
    transform: translate3d(40px, 0, 0);
  }
}
```

I am moving each blob `40px` towards **X** axis at `50%` of the animation from it's original position(i.e. when X translate is 0. In our case that's the horizontal center of `body`). Remember the negative translate I applied earlier? That was done to make the overall snake appear at the center of the screen. Here's how it works.

```
// Movement of a blob.
Start          Original Pos.          End
-40px -------------- 0 -------------- 40px
-------------------Repeat-----------------
```

A `.blob` starts at `-40px`. Reaches `40px` at `50%` of the animation and then finishes off at it's original position `0` at 100% of the animation( If no 100% state is specified, the default state becomes the final state. )
All in all, it looks like each blob is oscillating between `-40px` & `40px` positions.

Let's apply this animation to all the `.blob`s.

```css
.blob {
  /*...*/
  animation: blob 1.3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}
```

- Each blob takes 1.3 seconds to complete the animation.( `animation-duration` )
- `cubic-bezier(0.785, 0.135, 0.15, 0.86)` specifies the `animation-timing-function`. If you don't know what that is, head over to [mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function).
- The animation is going to run `infinite`ly (`animation-iteration-count`);

## Putting it all together!

<p data-height="300" data-theme-id="4977" data-slug-hash="XRBwGp" data-default-tab="css,result" data-user="praveenpuglia" data-embed-version="2" data-pen-title="Funny Snake Loader 🐍" class="codepen">See the Pen <a href="http://codepen.io/praveenpuglia/pen/XRBwGp/">Funny Snake Loader 🐍</a> by Praveen Puglia (<a href="http://codepen.io/praveenpuglia">@praveenpuglia</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

If you want, you can fork the pen and play around with different properties of the blob and make your own variant of the snake! A Cobra? A Rattle snake? Whatever!

Hope you enjoyed it.
