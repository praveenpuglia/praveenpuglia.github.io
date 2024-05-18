---
layout: post
title: VueJS + Webpack + SCSS - Quick Tip
date: 2017-10-26
---

## The Setup

- Initializd with Vue CLI + Webpack template.
- [Sass loader installed so we can use SCSS in our components](https://www.youtube.com/watch?v=jrxalQdn64k).

## The Problem

As a project grows, we'll create many many components at different levels. Say we have a global set of SCSS variables that we might need to reference in our `.vue` single file components.

Lets say, those variables are located at `src/_variables.scss` and the file looks like this.

```scss
//_variables.scss

// COLORS
--------------------------
$brand-primary  : #bada55;
$brand-secondary: #666666;
```

## The Basic Solution

Since we are great at relative paths, we would go to say `src/components/Hello.vue` and import the variables like so.

```scss
@import "../scss/variables";
```

or if we want the variables in `src/components/admin/Dashboard.vue` we would import it like...

```scss
@import "../../scss/variables";
```

and then we can refer to `$brand-primary` in our components. That works!

## The Better Solution

The problem with the above approach is evident.

- It's clumsy.
- Real world applications have much deeper levels.
- Bad for maintenance.

We can easily fix this by using [Webpack Aliases](https://webpack.js.org/configuration/resolve/). What we are essentially doing there is that we are creating a special word for webpack to recognize and resolve that to a path of our choice.

So we go to `webpack.base.conf.js` and look for `alias`. We add an entry for our `src/scss` directory as follows.

```js
alias: {
    ...,
    '$scss': resolve('src/scss')
}
```

Now, we can go back to `src/components/Home.vue` and change the import statement to

```scss
@import "~$scss/variables";
```

and guess what? The same path works for `src/components/admin/Dashboard.vue`. No long relative paths anymore.

Hope this helps and thanks for reading!
