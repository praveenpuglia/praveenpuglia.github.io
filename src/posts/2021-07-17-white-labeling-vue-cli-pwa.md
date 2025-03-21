---
layout: post
title: White Labeling, Vue CLI & PWA
description: "Using Vue CLI PWA plugin to dynamically generate service worker assets for different clients"
tags: [vue.js, pwa, javascript, white-labeling]
date: 2021-07-17
---

At [Voicezen](https://voicezen.ai/), I have been fortunate enough to work on a platform that has to be white-labelled. But what does it mean to be white-labelled?

> A **white-label product** is a [product](<https://en.wikipedia.org/wiki/Product_(business)>) or service produced by one company (the [producer](<https://en.wikipedia.org/wiki/Production_(economics)>)) that other companies (the [marketers](https://en.wikipedia.org/wiki/Marketing)) [rebrand](https://en.wikipedia.org/wiki/Rebranding) to make it appear as if they had made it. - Wikipedia

We serve the same product to multiple clients with various needs and to their users, it should look like as if the client company made it. This requires paying attention to a bunch of things like

- Brand colors.
- Typography.
- Logos.
- Other aspects of theming.
- Nomenclature customization.
- **Sitle title / PWA installer customization etc**

Today, I am briefly going to touch upon how we achieve the last one. I'll probably write more about the other points in later posts.

We chose to tackle the last point first because that's the immediate and persistent thing that users notice when they open any app on browser. The title stays on the tab as long as they are on the app so it makes sense to start there.

If the app is a PWA, it becomes necessary to get the illusion right by making sure that the browser prompt for the app installer reflects the client's title and logo.

On the engineering side, it means that we have to dynamically generate the manifests for our PWA, the logos, the title etc.

We use [Vue CLI](https://cli.vuejs.org/) and along with that the [Vue CLI PWA Plugin](https://cli.vuejs.org/core-plugins/pwa.html). The first step is to have the assets / app-icons for each client in a separate, public directory. With a Vue CLI project we get a root level `public` directory. Here's what that looks like after our changes.

```bash
.
├── img
│   └── icons
│       ├── batman
│       │   ├── android-icon-144x144.png
│       │   ├── android-icon-192x192.png
│       │   ├── android-icon-36x36.png
│       │   ├── android-icon-48x48.png
│       │   ├── android-icon-72x72.png
│       │   ├── android-icon-96x96.png
│       │   ├── apple-icon-152x152.png
│       │   ├── favicon-16x16.png
│       │   ├── favicon-32x32.png
│       │   └── favicon.ico
│       ├── superman
│       │   ├── android-icon-144x144.png
│       │   ├── android-icon-192x192.png
│       │   ├── android-icon-36x36.png
│       │   ├── android-icon-48x48.png
│       │   ├── android-icon-72x72.png
│       │   ├── android-icon-96x96.png
│       │   ├── apple-icon-152x152.png
│       │   ├── favicon-16x16.png
│       │   ├── favicon-32x32.png
│       │   └── favicon.ico
│       └── default
│           ├── android-icon-144x144.png
│           ├── android-icon-192x192.png
│           ├── android-icon-36x36.png
│           ├── android-icon-48x48.png
│           ├── android-icon-72x72.png
│           ├── android-icon-96x96.png
│           ├── apple-icon-152x152.png
│           ├── favicon-16x16.png
│           ├── favicon-32x32.png
│           └── favicon.ico
├── index.html
└── robots.txt
```

We have 2 clients and then the `default` client which is a fallback. We'll talk about that in a bit.

The next piece of the puzzle is to identify which client are we building the dist for. For that, we use `.env` files. When we build our application, we specify the client by adding the following in our `.env.production` file.

```text
VUE_APP_CLIENT_ID=batman
```

For convenience, we have created a bunch of `.env.CLIENT.local` files so we can build client specific dists without having to modify `.env.production` again and again.

```bash
.env.batman.local
.env.superman.local
```

In each of these we set `NODE_ENV=production` and the `VUE_APP_CLIENT_ID` to their respective IDs. This allows us to do something like this.

```bash
# generate production dist for batman
yarn build --mode=batman
```

Note that our icon directory name matches the `VUE_APP_CLIENT_ID` variable.

The next part is to use this ID to resolve things like

- What should be the human readable title for this client?
- Which icons should be put into the manifest?
- Which colors to use? etc.

For this, we use a simple map that gives us all the necessary information.

```js
// client-metadata.js
export const clientMetadata = {
  batman: {
    title: "The Dark Knight!",
    colors: {
      primary: "#080808",
      accent: "#AE8875"
    }
  },
  superman: {
    title: "Man of Steel",
    colors: {
      primary: "#bb070e",
      accent: "#0099f7"
    }
  },
  default: {
    title: "Voicezen",
    colors: {...}
  }
}
```

With this, we now move to our final setup which is to instruct Vue CLI to genreate all the stuff necessary for a particular client.

```js
// vue.config.js

// we use this package to get the current git hash.
const { gitDescribeSync } = require("git-describe");

const allClientsMetadata = require("./src/assets/client-metadata.json");
const clientId = process.env.VUE_APP_CLIENT_ID ?? "default";

// get the metedata.
const clientMetadata = allClientsMetadata[clientId];

// notify which client we are working with
console.log(`🚀 Building for Client : ${clientMetadata.title}`);

module.exports = {
  // setup pwa plugin options
  pwa: {
    name: clientMetadata.title,
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // since we use InjectManifest option, we provide our own
      // service worker to start with.
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    },
    manifestOptions: {
      short_name: clientMetadata.title,
      icons: [
        {
          src: `img/icons/${clientId}/android-icon-36x36.png`,
          sizes: "36x36",
        },
        {
          src: `img/icons/${clientId}/android-icon-48x48.png`,
          sizes: "48x48",
        },
        {
          src: `img/icons/${clientId}/android-icon-72x72.png`,
          sizes: "72x72",
        },
        {
          src: `img/icons/${clientId}/android-icon-96x96.png`,
          sizes: "96x96",
        },
        {
          src: `img/icons/${clientId}/android-icon-144x144.png`,
          sizes: "144x144",
        },
        {
          src: `img/icons/${clientId}/android-icon-192x192.png`,
          sizes: "192x192",
        },
      ],
      background_color: "#ffffff",
      display: "standalone",
    },
    themeColor: clientMetadata.colors.primary,

    iconPaths: {
      favicon32: `img/icons/${clientId}/favicon-32x32.png`,
      favicon16: `img/icons/${clientId}/favicon-16x16.png`,
      appleTouchIcon: `img/icons/${clientId}/apple-icon-152x152.png`,
    },
    assetsVersion: gitDescribeSync().hash, // this allows easy cache-busting
  },
};
```

Here's what the input service worker file looks like.

```js
// src/sw.js

/* eslint-disable */
// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener("message", (e) => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case "skipWaiting":
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
```

This setup ensures that our PWA manifests and assets are generated for the client we are building the dist. You can tweak the PWA plugin configuration to add more details for different browsers and platforms.

More reading -

- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers)
- [Workbox Webpack Plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
