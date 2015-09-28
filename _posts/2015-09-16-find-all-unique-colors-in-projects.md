---
layout: post
status: publish
published: false
title: Find All Unique Colors In Projects
author:
  display_name: Praveen Puglia
  login: praveenpuglia
  email: praveenpuglia@gmail.com
  url: ''
author_login: praveenpuglia
author_email: praveenpuglia@gmail.com
excerpt: Combile Sublime Text and some JavaScript to get all unique colors used in your projects.
date: '2015-09-16 00:00:00 +0530'
date_gmt: '2015-09-16 00:00:00 +0530'
categories:
- Workflow
tags:
- sublime text
- regular expressions
- regex
- find
- colors
---
One of my recent projects are messy with CSS. Partly because it's brand new and there are things which will take different directions soon! 

We fiddled with it a lot and ended up having multiple versions of screens. This resulted in quite a lot of colors directly put into codes in forms of **hex codes** or **rgb/rgba** definitions. We didn't end up putting all of that into variables because who has time for it during demos? 

Then comes the hard part. Finding all the colors we used throughout the project and see how we screwed it up( kind of! ). That finding part is a tricky if you plan to open up each stylesheet and look into it. A good part of the problem is to recognize different types of color definitions you have.

>**Sublime Text to the rescue!**

We all know how powerful Sublime's search is. We can use regular expressions to match up specific strings in our projects. All you need are the regex for different color formats. Following are the ones that I found out from different sources mentioned below.

**HEX COLOR :** `#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})`  
**RGB/RGBA COLOR :** `rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)`  
**HSL/HSLA COLOR :** `hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\) `  

Next up is using all of this in the find tool to search for colors. This is easy. Combine all the above expressions using the `|` (  OR ) operator and search for it. But before you do that, you need to enable the regex mode in find.

- <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> to open up find panel.
- <kbd>Alt</kbd> + <kbd>R</kbd> to enable regular expressions search.
- Enter `<project>` as **Where**. 
- Combile the expressions above using the `|` operator.
- <kbd>Find</kbd>

The job doesn't finish there. Once you hit Find it shows you the **Find Results** page with all those occurrences. The problem is, those aren't selected for you to copy! Here's how to do that.

- Open up the find tool. <kbd>Ctrl</kbd> + <kbd>F</kbd>. This time we just want to search the **Find Results** tab content.
- Search using the same regex combination.
- <kbd>Ctrl</kbd> + <kbd>Enter</kbd> or click **Find All**.
- Copy and paste the selected occurrences in a new tab.

<iframe style="width:100%; height:350px" src="https://www.youtube.com/embed/9ZpdpmWjZck" frameborder="0" allowfullscreen></iframe>

Another problem we have is that we have copied duplicate colors. Sublime doesn't find unique colors. You can use JavaScript's `Set` to get that done. The aim is to get an array of copied colors and create a new set out of it.

{{GIF EXPLAINING HOW TO MAKE AN ARRAY}}

Copy over the array on to the browser and make a new set out of it.
```javascript
( new Set(["array","of","color","strings"]) ).join("\n");
```

{{GIF EXPLAINING HOW TO MAKE A SET}}

I now think that the entire thing can be done in a single video. or a set of videos.

If you have ColorHighlighter plugin installed, you can see the colors in Sublime itself. 

Work on **uneek** to get unique strings from a file like this or CSV.




