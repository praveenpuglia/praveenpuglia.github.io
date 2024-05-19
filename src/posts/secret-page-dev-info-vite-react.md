---
layout: post
title: Don't struggle figuring out the deployed version and commit hash
description: You should never have to ask your team what version is on prod with a dedicated dev info page.
tags: [tools, vite, git]
date: 2023-01-06
socialImage: "/assets/images/2023/app-version-git-hash.avif"
---

![Adding a secret page for developers with app version & commit hash in a Vite.js / React app](/assets/images/2023/app-version-git-hash.avif)

I love bare bones health pages / system info pages which give you critical information about your application in the fastest possible way. The app version & the hash of the currently deployed code are two of those critical things.

I recently added this to a [Vite.js](https://vitejs.dev/) / [React](https://reactjs.org/) app but the same can be done for any Vite based app. Here's what I did.

## Creating Global Constants

Vite allows us to create global constants via `vite.config.ts`'s `define` section.

```ts
export default defineConfig({
  define: {
    __APP_VERSION__: "",
    __COMMIT_HASH__: "",
  },
});
```

More about `define` [here](https://vitejs.dev/config/shared-options.html#define).

To make TypeScript aware of these global constants, I needed to define them in `vite-env.d.ts` file. I could also create an `env.d.ts` file and define them there as prescribed in the Vite docs.

```ts
declare const __APP_VERSION__: string;
declare const __COMMIT_HASH__: string;
```

## Getting App Version

Now that I had the global constants ready to use, I needed to find a way to get the app's current version. Usually, this comes from the `version` field in `package.json` so I picked it up from there.

```ts
// vite.config.ts
import packageConfig from "./package.json";

packageConfig.version; // "1.0.0"
```

While doing this, I also got a TypeScript error telling me I can't import a JSON file here. For that to work, I had to modify **tsconfig.node.json**

- add `"resolveJsonModule": true` in `compilerOptions`
- add `"package.json"` in `include` array.

That did the trick.

## Getting the Commit Hash

```ts
//vite.config.ts
import * as child from "child_process";
const commitHash = child.execSync("git rev-parse --short HEAD").toString();
```

## Updating Global Constants

I initially just assigned the `packageConfig.version` and `commitHash` values directly to the constants in define like this.

```ts
export default defineConfig({
  define: {
    __APP_VERSION__: packageConfig.version,
    __COMMIT_HASH__: commitHash,
  },
});
```

This broke the build because these values weren't interpreted as strings. Reading the documentation for `define` revealed that the values are interpreted as raw expressions. In order to use the values as strings, I had to stringify them using `JSON.stringify()`.

```ts
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageConfig.version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
});
```

## Creating the Secret Page

This was as simple as creating a route entry for a path like `__dev__` and rendering a simple component with the global constants.

```tsx
// Router.tsx => Uses React Router 6.
<Route path="__dev__" element={<DevInfo />} />
```

```tsx
// DevInfo.tsx
export default function DevInfo() {
  return (
    <code>
      <strong>{__APP_VERSION__}</strong> at {__COMMIT_HASH__}
    </code>
  );
}
```

That's all. Now I can go to `/__dev__` route and access this information for any deployment of my app.
