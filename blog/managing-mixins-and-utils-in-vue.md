---
layout: post
title: Managing Mixins & Utilities in VueJS
published: true
date: 2019-04-09
---

> The code examples are in TypeScript but the idea works just as well in JavaScript.

I have been working quite a bit with [Vue.js](https://vuejs.org/) and I have sort of found a sweet spot for how to manage utilities in a Vue project.

I often use mixins to share utility methods and constants related to those utilities across components. Example:

- filters
- data processing functions
- common event handlers etc.

Filters are slightly special because they can be used in both the script part and the template part of a component.

I often end up requiring filters not only in templates, but also in the script part of my components. Sometimes exclusively in the script without any usage in the templates. In those cases, it does not feel right to bring in the utility functions as an entire mixin.

So... I write the functions separately and then export a mixin that references those functions.

Here's an example:

```ts
// src/utils/datetime.ts

// Export individual function
export function getDurationByMillis(millis: number) {
  if (millis < 0) {
    millis = 0;
  }
  let seconds: any = Math.floor((millis / 1000) % 60);
  let minutes: any = Math.floor((millis / (1000 * 60)) % 60);
  let hours: any = Math.floor(millis / (1000 * 60 * 60));
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${hours}:${minutes}:${seconds}`;
}

// Export Mixin
@Component({
  filters: {
    duration: getDurationByMillis,
    anotherFilter: anotherFunction,
  },
})
export default class TimeUtils extends Vue {}
```

If you remember the [Revealing Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) this should look similar.

In the JS world, the mixin export looks simpler.

```js
export default {
  filters: {
    duration: getDurationByMillis,
  },
};
```

In components where I need to convert millis to duration, only in the script, I just import the `getDurationByMillis` function instead of the entire mixin.

```ts
import { getDurationByMillis } from "@/utils/datetime.ts";
```

I also put any constants that I need for my datetime utilities in that same utility file as well. Example -

```ts
export const DATE_FORMAT_LONG = "DD/MM/YYYY HH:mm:ss";
export const DATE_FORMAT_SHORT = "DD/MM/YYYY";
```

I can even export multiple small mixins from the same file. Example - one for just **date** related utilities and another for **time** utilities.

I feel this has couple of benefits.

- All the utility functions / constants those functions use are colocated.
- Imports become explicit for script-only usages.
- Filter functions become much more reusable.
- Maintenance becomes much easier and these filters / functions consumable in other projects too.

Hope this helps you out. Let me know if you have a better approach in the comments!
