---
layout: post
title: The Case for StrictPascalCase
date: 2024-08-06
tags: [code, philosophy]
permalink: /posts/case-for-strict-pascal-case/
---

# Introduction

There has been countless pull requests where I have been asked to do the following and I have systematically denied the request.

```diff
- ImpsData
+ IMPSData
```

or

```diff
- UserApiResponse
+ UserAPIResponse
```

I personally prefer `ImpsData` over `IMPSData` and similarly `UserApiResponse`. Purists do come in and tell me - "Why? Why can't you write a known abbreviation as an abbreviation in things you name?"

Because I am a frontend engineer, people also send me examples of the browser native classes / constructors like `HTMLDivElement` and ask me why, as a web engineer, don't I follow the same in the code I write.

# Why I don't like abbreviations while naming symbols

## The assumption that abbreviations are a known thing in a team is false

If you are a web developer, you would probably know about **HTML** or **CSS** as known abbreviations but beyond that, it's not guaranteed that you would know the _business abbreviations_ that your code is going to be more tied with.

I work at smallcase(at the time of this writing), a fintech company. Any new member that joins the team probably wouldn't have ever made their journey into investing yet. Should I expect them to know that when someone says [**cagr**(ˈkāgə-ˈr)](https://youtu.be/44abVtgmT1U?t=20) they actually mean CAGR(Compound Annual Growth Rate) or Nav could be navigation or NAV which is Net Asset Value. There's more…

- GST( Goods and Services Tax )
- AMC( Asset Management Company )
- LAS( Loan Against Securities )
- MFC ( MF Central )

…and so on.

The list of business specific abbreviations are huge and while you should work your way up understanding business terms, they don't need to confuse you while you code.

## It isn't always as readable as it might seem on paper

When looking at the `HTMLDivElement` example, a purist might tell that that's more readable because the `HTML` part is immediately noticeable. But it doesn't always work out that way.

If I take the purist point of view, `JSONAPIResponse` should be the one that's used but is it really readable? `JsonApiResponse` reads much better!

## The native APIs use it. Why not us?

Browsers are being built from a long long time. They have legacy reasons to write things the way they do and it matters that the APIs they provide are consistent. It also means that they can't suddenly decide on shipping APIs that follow **StrictPascalCase.**

But **we** don't have to do that! The interfaces that we interact with from the libs land can remain as is on the libs land but our own types, interfaces, classes etc can follow StrictPascalCase and remain consistent across our codebase.

## StrictPascalCase is free of mental overhead

What I really like about this is that I or my team members don't have so pronounce things the same way to be able to write them in the same way. [**cagr**(ˈkāgə-ˈr)](https://youtu.be/44abVtgmT1U?t=20) or C-A-G-R, in either case you end up writing `Cagr` . You don't have to worry about multiple abbreviations fusing together, like `DOMAPI`, and confuse it with uppercase constants / enums you may write.

It liberates you from all of that and helps everyone in the team be consistent with naming without putting too much of brain into it.

# Summary

It's not a new thing but every now and then someone in your team might walk up to you and tell that you should just use the abbreviations in your symbols. They have their reasons but tell them how using StrictPascalCase makes lives easier for everyone.

There has been online [debates and discussions](https://www.reddit.com/r/csharp/comments/ge0yo5/is_it_still_recommended_to_pascalcase_acronyms/) on this [time and again](https://github.com/mediamonks/frontend-coding-standards/issues/9) but it's hard to deny the simplicity afforded by StrictPascalCase.

So go make StrictPascalCase your friend.
