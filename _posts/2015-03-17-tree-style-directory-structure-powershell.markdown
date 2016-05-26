---
layout: post
status: publish
published: true
title: Tree-style directory structure in PowerShell
author:
  display_name: Praveen Puglia
  login: praveenpuglia
  email: praveenpuglia@gmail.com
  url: ''
author_login: praveenpuglia
author_email: praveenpuglia@gmail.com
excerpt: In PowerShell, you can use the tree command to print a tree structure, starting
  from the current directory to it's descendants at deepest levels.
wordpress_id: 144
wordpress_url: http://praveenpuglia.com/?p=144
date: '2015-03-17 12:19:55 +0530'
date_gmt: '2015-03-17 06:49:55 +0530'
categories:
- Workflow
- Windows
tags:
- powershell
- tree
- windows
- direcotries
- folders
comments: []
---
One of those things that I may not require too often but when I do, it has to be nicely formatted and give me precise results.

In PowerShell, you can use the `tree` command to print a tree structure, starting from the current directory to it's descendants at deepest levels.

```bash
> cd 'C:\Python27\tcl\tcl8.5'
> tree
├───encoding
├───http1.0
├───msgs
├───opt0.4
└───tzdata
├───Africa
├───America
│ ├───Argentina
│ ├───Indiana
│ ├───Kentucky
│ └───North_Dakota
├───Antarctica
├───Arctic
├───Asia
├───Atlantic
├───Australia
├───Brazil
├───Canada
├───Chile
├───Etc
├───Europe
├───Indian
├───Mexico
├───Pacific
├───SystemV
└───US
```

You can also specify a custom path as an argument.

```bash
> tree 'C:\Program Files'
```

Make sure you use a font that supports lot of glyphs to see the lines.
