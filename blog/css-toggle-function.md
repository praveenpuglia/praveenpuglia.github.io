---
layout: post
title: The CSS toggle() Function
date: 2017-04-25
---

CSS has had [functions](https://drafts.csswg.org/indexes/#functions) for a long time now. We use them everyday in colors( e.g `rgb()/hsl()`), backgrounds( e.g. `linear-gradient()`), animations(e.g. `cubic-bezier()`) etc. CSS Values and Units Module Level 4 defines the [`toggle()`](https://drafts.csswg.org/css-values-4/#funcdef-toggle) function. Let's take a look.

Say we have the following markup.

```html
<div>
  Level 1
  <div>
    Level 2
    <div>Level 3></div>
  </div>
</div>
```

Now what we want is different text colors for those divs at different levels. What can we do?

We can probably do something like this.

```css
div {
  color: red;
}
div > div {
  color: green;
}
div > div > div {
  color: blue;
}
```

This is already bad because of increasing specificity and getting messier. We could make it a little better by adding classes to the divs indicating the nesting level and then style accordingly.

```html
<div class="level-1">
  Level 1
  <div class="level-2">
    Level 2
    <div class="level-3">Level 3></div>
  </div>
</div>
```

```css
.level-1 {
  color: red;
}
.level-2 {
  color: green;
}
.level-3 {
  color: blue;
}
```

This gets our job done but we are writing a lot of code. We can see how we would have to write more rules as soon as we added more levels.

### What if we want to repeat those same colors, in that order, for further nested elements?

What that means is that

- `.level-4` would have the color `red`.
- `.level-5` would have `green`.
- `.level-6` would be `blue`.
- `.level-7` would be `red` again and so on.

If we were to do this the way we did before, we would have to add too many rules.

SCSS or LESS could make it easy for us to just run a loop and generated all those rules but still our final CSS would end up having too much of WET code. Also, one would have to know the number of levels beforehand.

This way of solving the problem also breaks when we increase the level of nesting on the fly because we won't have a rule for the new level.

### What do we do?

Welcome the CSS toggle() function.

The [spec](https://drafts.csswg.org/css-values-4/#funcdef-toggle) defines it as follows.

> The toggle() expression allows descendant elements to cycle over a list of values instead of inheriting the same value.

With `toggle()`, we can solve our problem like this.

```css
div {
  color: toggle(red, green, blue);
}
```

Neat! But...

### Woah! What the hell just happened?

The `toggle()` function has the following syntax.

```css
property: toggle(value1, value2, value3...);
```

Each argument passed to `toggle()` is first evaluated as if it was the **only** value applied to property. This gives CSS engine the respective computed values.

```
value1 --> computedValue1
value2 --> computedValue2
value3 --> computedValue3
```

Next, the browser finds out which `computedValue` matches the `inherited` value of `property`.

Say `computedValue1` matches the inherited value of `property` then, the next value (`computedValue2`) will be resolved as the value for `toggle()`.

If the inherited value matches `computedValue3`, `computedValue1` gets resolved as the value to be applied.

### What happens if a duplicate value is used?

Having duplicate values in a toggle function may short circuit it. Here's an example.

```css
p {
  margin-top: toggle(10px, 20px, 10px, 30px);
}
```

In this case, 30px value is never reached because...

- When inherited value is 10px, 20px resolves as the value of toggle function.
- When inherited value is 20px, the next value, which is 10px get resolved.
- The next value in the list is 10px but that from 1 we know what it resolves to.

So...

```css
p {
  margin-top: toggle(10px, 20px, 10px, 30px);
}

/*becomes*/

p {
  margin-top: toggle(10px, 20px);
}
```

### Real World Example

Say we want an unordered list with a specific order of bullets in mind, for different levels of the list. A square bullet at level 1, a disc at level 2 and a circle at level 3. Something like this...

![List with custom bullet styles.](../assets/images/2017/toggle-list.avif)

Here's how we can do it.

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <ul>
    <li>Item 3.1</li>
    <li>Item 3.2</li>
    <ul>
      <li>Item 3.3.1</li>
    </ul>
  </ul>
</ul>
```

```css
ul {
  list-style-type: toggle(square, disc, circle);
}
```

Isn't that cool?

The saddest part is, however, that it's not supported in any of the browsers and it also doesn't seem like a priority to browser vendors for implementation.

### Resources

- [https://drafts.csswg.org/css-values-4/#funcdef-toggle](https://drafts.csswg.org/css-values-4/#funcdef-toggle)
- [https://bugs.chromium.org/p/chromium/issues/detail?id=715070](https://bugs.chromium.org/p/chromium/issues/detail?id=715070)
