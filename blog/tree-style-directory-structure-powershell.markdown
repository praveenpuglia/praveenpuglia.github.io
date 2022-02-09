---
layout: post
title: Tree Like Directory Structure In PowerShell
date: 2015-03-17
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
