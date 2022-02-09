---
layout: post
title: The Right HTML Element For Icons
date: 2015-02-17
---

[![ VS ](/assets/images/2015/02/span_vs_i.png)](/assets/images/2015/02/span_vs_i.png)

Do you use `<span>` or `<i>` for icons? Whatever your answer is, keep that at the back of your mind. I am sure you have reasons! Let me tell you what I use. It's `<i>`.

In my conversations with people about html & semantics, over time, this topic has come up too often! For all we know, there isn't a right choice. Not at least from what we have got from the [HTML Spec](http://www.w3.org/TR/html5/text-level-semantics.html).

So how do we go about choosing an element to deal with icons? I'll say choose as a human would; by being stupid and finding a fit. Religious folks... angry?

People use spans stating it's more appropriate "_semantically"_. [Here's what W3C says...](http://www.w3.org/TR/html5/text-level-semantics.html#the-span-element)

> The span element **doesn't mean anything** on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir.

Wait... what? That's right. It's the "_meaningless_" element. This allows you to use it for virtually anything and everything at text level but it's meaningless nonetheless. [The i element is a little different](http://www.w3.org/TR/html5/text-level-semantics.html#the-i-element)

> The i element represents a span of text **in an alternate voice or mood**, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, **a thought**, or a ship name in Western texts.

This makes more sense to me. Think about it, an icon is essentially a way to depict a piece of text otherwise. Graphically to be precise. It is a thought, a _metaphor_. This specification in fact forces us to be more creative and thoughtful about what "graphical metaphor" we should use. In an ideal world, we would be using an `<img>`  element to do this but even that has it's own problems; [an empty src makes a server request.](http://www.nczonline.net/blog/2009/11/30/empty-image-src-can-destroy-your-site/)

On the brighter side, both **icon** and `<i>`  have "**i**" to start with. To a human, "it fits the data" instinctively.

Also, an `<i>`  element requires less characters. How do I leave that luxury? Saving bytes matter. I know there's compression, but...

```html
<span>
  <!-- 13 characters -->
  <i></i>
  <!-- 7 characters --></span
>
```

Talking about screen readers( read _accessibility_ ), neither a `span`  nor an `i`  helps. Almost always, the icons come in the form of CSS `background` . With some mumbo jumbo of `background-position` , we get the stuff done. Some would argue that today's screen readers are habituated to find information like that using span. Don't trust them. [Focus on ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) instead to get rock-solid accessibility. Here's an example -

```html
<i class="icon icon-settings" aria-label="Settings"></i>
```

Talking more on HTML standards, how it moves and what role do we play as developers and designers, [this answer](http://stackoverflow.com/questions/11135261/should-i-use-i-tag-for-icons-instead-of-span#answer-14555422) by [Holly @ StackOverflow](http://stackoverflow.com/users/650537/holly) sums it up.

> Common usage tends to dictate language rules more than the other way around. If you're old enough, do you remember that "Web site" was the official spelling when the word was new? Dictionaries insisted there must be a space and Web must be capitalized. There were semantic reasons for that. But common usage said, "Whatever, that's stupid. I'm using 'website' because it's more concise and looks better." And before long, dictionaries officially acknowledged that spelling as correct.

Big names in the industry have used `<i>`  for icons.  Bootstrap had earlier used it.(...they now use span though ) Facebook, Twitter -did it. Font Awesome examples utilize the `<i>`  element. [Material Design Light](https://getmdl.io) too uses it in examples. Why can't we?

Politically, `<span>`  seems to be correct not by the reason it was built for but by the meaningless nature. For me, my intuition weigh in more. Using `<i>`  feels more familiar to me. I am gonna use it anyway.
