---
layout: post
status: publish
published: true
title: The right HTML element for icons
author:
  display_name: Praveen Puglia
  login: praveenpuglia
  email: praveenpuglia@gmail.com
  url: ''
author_login: praveenpuglia
author_email: praveenpuglia@gmail.com
excerpt: So how do we go about choosing an element to deal with icons? I'll say choose
  as a human would; by being stupid and finding a fit. Religious folks... angry?
wordpress_id: 97
wordpress_url: http://praveenpuglia.com/?p=97
date: '2015-02-17 22:54:49 +0530'
date_gmt: '2015-02-17 17:24:49 +0530'
categories:
- Web Technologies
- Semantics
tags:
- semantics
- icons
- html
- css
comments: []
---
<p><a href="/assets/images/2015/02/span_vs_i.png"><img class="aligncenter size-full wp-image-119" src="/assets/images/2015/02/span_vs_i.png" alt=" VS " width="742" height="322" /></a></p>
<p>Do you use <span class="lang:default decode:true  crayon-inline">&lt;span&gt;</span> or <span class="lang:default decode:true  crayon-inline">&lt;i&gt;</span> for icons? Whatever your answer is, keep that at the back of your mind. I am sure you have reasons! Let me tell you what I use. It's  <span class="lang:default decode:true  crayon-inline">&lt;i&gt;</span>.</p>
<p>In my conversations with people about html &amp; semantics, over time, this topic has come up too often! For all we know, there isn't a right choice. Not at least from what we have got from the <a href="http://www.w3.org/TR/html5/text-level-semantics.html">HTML Spec</a>.</p>
<p>So how do we go about choosing an element to deal with icons? I'll say choose as a human would; by being stupid and finding a fit. Religious folks... angry?</p>
<p>People use spans stating it's more appropriate "<em>semantically"</em>. <a href="http://www.w3.org/TR/html5/text-level-semantics.html#the-span-element">Here's what W3C says...</a></p>
<blockquote><p>The span element<strong> doesn't mean anything</strong> on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir.</p></blockquote>
<p>Wait... what? That's right. It's the "<em>meaningless</em>" element. This allows you to use it for virtually anything and everything at text level but it's meaningless nonetheless. <a href="http://www.w3.org/TR/html5/text-level-semantics.html#the-i-element">The i element is a little different</a></p>
<blockquote><p>The i element represents a span of text <strong>in an alternate voice or mood</strong>, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, <strong>a thought</strong>, or a ship name in Western texts.</p></blockquote>
<p>This makes more sense to me. Think about it, an icon is essentially a way to depict a piece of text otherwise. Graphically to be precise. It is a thought, a <em>metaphor</em>. This specification in fact forces us to be more creative and thoughtful about what "graphical metaphor" we should use. In an ideal world, we would be using an <span class="lang:default decode:true  crayon-inline ">&lt;img&gt;</span>  element to do this but even that has it's own problems; <a href="http://www.nczonline.net/blog/2009/11/30/empty-image-src-can-destroy-your-site/">an empty src makes a server request.</a></p>
<p>On the brighter side, both <strong>icon</strong> and <span class="lang:default decode:true  crayon-inline ">&lt;i&gt;</span>  have "<strong>i</strong>" to start with. To a human, "it fits the data" instinctively. An <span class="lang:default decode:true  crayon-inline ">&lt;i&gt;</span>  element requires less characters. How do I leave that luxury 'coz saving bytes matter. I know there's compression, still.</p>
<pre class="line-height:24 toolbar:2 lang:default decode:true">&lt;span&gt;&lt;/span&gt; &lt;!-- 13 characters --&gt;
&lt;i&gt;&lt;/i&gt; &lt;!-- 7 characters --&gt;</pre>
<p>Talking about screen readers( read <em>accessibility</em> ), neither a <span class="lang:default decode:true  crayon-inline ">span </span> nor an <span class="lang:default decode:true  crayon-inline">i</span>  helps. Almost always, the icons come in the form of CSS <span class="lang:default decode:true  crayon-inline ">background</span> . With some mumbo jumbo of <span class="lang:default decode:true  crayon-inline ">background-position</span> , we get the stuff done. Some would argue that today's screen readers are used to find information like that using span. Don't trust them. <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA">Focus on ARIA</a> instead to get rock-solid accessibility. Here's an example -</p>
<pre class="line-height:24 toolbar:2 lang:default decode:true">&lt;i class="icon icon-settings" aria-label="Settings"&gt;&lt;/i&gt;</pre>
<p>Talking more on HTML standards, how it moves and what role do we play as developers and designers, <a href="http://stackoverflow.com/questions/11135261/should-i-use-i-tag-for-icons-instead-of-span#answer-14555422">this answer</a> by <a href="http://stackoverflow.com/users/650537/holly">Holly @ StackOverflow</a> sums it up.</p>
<blockquote><p>Common usage tends to dictate language rules more than the other way around. If you're old enough, do you remember that "Web site" was the official spelling when the word was new? Dictionaries insisted there must be a space and Web must be capitalized. There were semantic reasons for that. But common usage said, "Whatever, that's stupid. I'm using 'website' because it's more concise and looks better." And before long, dictionaries officially acknowledged that spelling as correct.</p></blockquote>
<p>Big names in the industry have used <span class="lang:default decode:true  crayon-inline ">&lt;i&gt;</span>  for icons.  Bootstrap had earlier used it.(...they now use span though ) Facebook, Twitter -did it. Font Awesome examples utilize the <span class="lang:default decode:true  crayon-inline ">&lt;i&gt;</span>  element. Why can't we?</p>
<p>Politically, <span class="lang:default decode:true  crayon-inline ">&lt;span&gt;</span>  seems to be correct not by the reason it was built for but by the meaningless nature. But I am a stupid guy, with stupid human intuitions. Using <span class="lang:default decode:true  crayon-inline ">&lt;i&gt;</span>  feels more familiar to me. I am gonna use it anyway whether or not the answer in the back of your mind changes.</p>
