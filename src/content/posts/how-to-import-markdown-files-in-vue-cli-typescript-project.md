---
title: Import Markdown Files in Vue CLI + TypeScript Projects
date: 2021-02-17
---

Recently, I came across the need to import a markdown file in a Vue component and realized that the internet is full of confusing solutions. Fiddled around for a few hours and found out that it's really quite simple.

Here's a little bit about the setup I have.

- Vue CLI
- TypeScript

I am also using the [Vue Markdown](https://www.npmjs.com/package/vue-markdown) component. What I wanted to do is

- Write the content in a `.md` file.
- Import it in my component.
- Pass it to Vue Markdown as the `source` prop.

So I imported the markdown file in my component and the first thing I saw is the squiggly telling me this.

```text
TS2307: Cannot find module './query-guide.md'.
```

That's because TypeScript doesn't know where to find this module or _is it even a module_. To fix this, I went to `shims-vue.d.ts` and declared any markdown file as a module.

```ts
declare module "*.md";
```

...and the squiggly was gone.

> **NOTE**: You can do this do any kind of file. In my project I also declare all `scss` files to be module so I can import them directly in my component. [Read more on why I do that](https://praveenpuglia.com/how-to-use-sass-variables-in-javascript-in-a-webpack-project/).

Once that's sorted, I came across this.

```text
Module parse failed: Unexpected character '#' (1:0)

You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```

Which means that Webpack has no idea about how to load a markdown file as a module. Quick googling pointed out that I need to use [raw-loader](https://github.com/webpack-contrib/raw-loader) to get the content of the file as is.

> _A loader for webpack that allows importing files as a String._

I installed `raw-loader` as dev dependency.

```bash
yarn add -D raw-loader
```

Next I needed to direct webpack to use it via `vue.config.js`. Here's what that configuration looks like.

```js
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/i,
          loader: "raw-loader",
        },
      ],
    },
  },
};
```

That did it for me. I was able to import markdown file in my component just like any other module and use it.

```ts
import guideContent from "./query-guide.md";
```

Hope this helps you save a lot of time fiddling around.
