---
layout: post
title: Finding Unique Color Strings In Project
date: 2015-11-01
tags: [regex, javascript, colors]
permalink: /posts/finding-unique-color-strings-in-project/
---

One of my recent projects is messy with it's color theory. Partly because it's brand new and there are things which will take different directions _soon_!

To demo, I have to create multiple versions of a component. This results in quite a lot of colors directly put into code in the form of **hex codes** or **rgb/rgba** definitions. But! these are demos! Got to get our hands dirty and get them done quick.

Then comes the hard part. Finding all the colors we used throughout the project and see how we screwed it up( kind of! ). That finding part is tricky if you plan to open up each stylesheet and look into it. A good part of the problem is to recognize different types of color definitions you have.

> **Sublime Text to the rescue!**

We all know how powerful Sublime's search is. We can use regular expressions to match up specific strings in our projects. All we need are the regex for different color formats.

**HEX COLOR :** `#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})`  
**RGB/RGBA COLOR :** `(rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*(?:\.\d+)?)\))`  
**HSL/HSLA COLOR :** `(hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,?\s*(\d*(?:\.\d+)?)\))`

Now, we have to use it in the find tool. This is easy. We combine all the above expressions using the `|` ( OR ) operator and search for it.

- <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> to open up the find and replace tool.
- <kbd>Alt</kbd> + <kbd>R</kbd> to enable regular expressions search.
- Enter `<project>` as **Where**.
- Combile the expressions above using the `|` operator.
- <kbd>Find</kbd>

We'll see something magical! In the **Find Results** tab, all colors are highlighted. But not selected. Here's how to do that.

- Open up the find tool. <kbd>Ctrl</kbd> + <kbd>F</kbd>. This time we just want to search the **Find Results** tab content.
- Search using the same regex combination.
- <kbd>Ctrl</kbd> + <kbd>Enter</kbd> or click **Find All**.
- Copy and paste the selected occurrences in a new tab.

<iframe style="width:100%; height:350px" src="https://www.youtube.com/embed/9ZpdpmWjZck" frameborder="0" allowfullscreen></iframe>

Nice! So we have all the colors but wait! we have also copied duplicate colors. By that I mean the occurrence of same string that represents a color. We can now take some JavaScript help( **Set** ).

> A **Set** is a collection of _distinct_ objects.

What we are doing here is...

- Making an array of all colors, including the duplicate ones.
- Making a set out of that array of colors.
- Converting that set back to array and putting each color in a new line.

```javascript
Array.from(new Set(/*ARRAY_OF_COLORS*/)).join("\n");
```

<iframe style="width:100%; height:350px" src="https://www.youtube.com/embed/ERx2J3lfHlw" frameborder="0" allowfullscreen></iframe>

Voila! We have got all the unique color strings in our project. Good thing is, if there are multiple strings representing the same color, we can now identify them easily.

Example - `#fff Vs. #ffffff Vs. rgb(255,255,255)`.

My initial thought ended here and I was happy but that didn't last long. The problem that remainned was that I still couldn't see those colors. Sure we have all the values but in the field of colors, seeing them makes more sense.

So... I built this tool - [chamarel](http://praveenpuglia.com/chamarel)( couldn't find a 'cool' name :( ). You can input the list of all colors, including the duplicate ones, in this tool and it shows you, **visually**, the unique<sup>#</sup> colors! It's far from perfect but try it out! I have plans to make it easier to use so you don't have to do the heavy lifting. If you want to jump in in making it better, I am sure you'll get a free beer! ;)

![Chamarel - Project](/assets/images/2015/11/show-me-my-colors.avif)
