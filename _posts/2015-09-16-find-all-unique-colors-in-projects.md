---
layout: post
status: publish
published: true
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

Then comes the hard part. Finding all the colors we used throughout the project and see how we screwed it up. That finding part is a tricky if you plan to open up each stylesheet and look into it. A good part of the problem is to recognize different types of color definitions we have.

**Sublime Text to the rescue!**

