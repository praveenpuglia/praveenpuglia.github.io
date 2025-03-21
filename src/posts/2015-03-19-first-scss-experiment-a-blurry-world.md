---
layout: post
title: First SCSS Experiment - A Blurry World
date: 2015-03-19
tags: [css, scss]
permalink: /posts/first-scss-experiment-a-blurry-world/
---

I know. I know. I am late into the business. All cool kids have nailed it completely and I took it up yesterday. But better late than never.

I had tried LESS a little bit, mostly for variables and occasionally for mixins. Never used preprocessing extensively in projects and continued to use the same ol' CSS for everything. I wanted to dive-in. So when it was time to pick one up, I went through [this article](https://css-tricks.com/sass-vs-less/) and picked SCSS.

Now that SCSS was [the chosen one](https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=the+chosen+one+harry+potter), the instant thought I had was to play around with multiple shadows. It's been one of those things, I always wanted to do. Sadly, it's difficult to write random multiple box-shadows manually. Hence I needed a loop and a shadow generator.

### HTML:

Nothing much here. The aim was to use a single element. The **blob**.

```html
<span class="blob"></span>
```

### SCSS:

I first created a variable `$shadows` which contained the number of shadows I wanted to create. Then, I created the base styling for the `.blob`

```scss
/*Number of shadows to generate*/
$shadows: 1000;

/*our loved blob*/
.blob {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  display: inline-block;
}
```

Next, I created a random <strong>box-shadow</strong> generator. I limited the **X and Y offset values to 1920 and 1080** respectively( That's my screen resolution. Still looking for a way to get window height and width in SCSS ). Set the **blur and spread radius** to the same random number and lastly, used random numbers to generate the colors using `rgb()`.

```scss
@function randomBoxShadow() {
  $radius: random(50);
  $shadow: random(1920) + "px " + random(1080) + "px " + $radius + "px " +
    $radius + "px rgb(" + random(255) + "," + random(255) + "," + random(255) +
    ")";
  @return unquote($shadow);
}
```

See the `unquote()`  in the return statement?. `$shadow`  get's generated as a string. e.g - `"10px 120px 40px 40px rgb(1,35,145)"` **with** the quotes. This however can't be assigned to `box-shadow`. Hence we `unquote()` it.

Finally I create a loop for the `box-shadow` inside `.blob`  and call `randomBoxShadow()` within it to get a random shadow every time.

```scss
$box-shadow: 0 0 10px 0 #000; /*an initial value for box-shadow*/
@for $i from 2 through $shadows {
  $box-shadow: $box-shadow + "," + randomBoxShadow();
}
box-shadow: unquote($box-shadow);
```

Combining all these, the SCSS ended up as follows.

```scss
$shadows: 1000;

@function randomBoxShadow() {
  $radius: random(50);
  $shadow: random(1920) + "px " + random(1080) + "px " + $radius + "px " +
    $radius + "px rgb(" + random(255) + "," + random(255) + "," + random(255) +
    ")";
  @return unquote($shadow);
}

.blob {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  display: inline-block;
  $box-shadow: 0 0 10px 0 #000;
  @for $i from 2 through $shadows {
    $box-shadow: $box-shadow + "," + randomBoxShadow();
  }
  box-shadow: unquote($box-shadow);
}
```

...and I was happy!

<p class="codepen" data-height="268" data-theme-id="4977" data-slug-hash="MYzRJX" data-default-tab="result" data-user="praveenpuglia">See the Pen <a href="http://codepen.io/praveenpuglia/pen/MYzRJX/">A blurry world!</a> by Praveen Puglia (<a href="http://codepen.io/praveenpuglia">@praveenpuglia</a>) on <a href="http://codepen.io">CodePen</a>.

<script src="//assets.codepen.io/assets/embed/ei.js" async=""></script>
