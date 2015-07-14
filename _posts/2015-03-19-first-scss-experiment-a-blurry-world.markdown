---
layout: post
status: publish
published: true
title: First SCSS Experiment - A Blurry World
author:
  display_name: Praveen Puglia
  login: praveenpuglia
  email: praveenpuglia@gmail.com
  url: ''
author_login: praveenpuglia
author_email: praveenpuglia@gmail.com
wordpress_id: 159
wordpress_url: http://praveenpuglia.com/?p=159
date: '2015-03-19 22:17:10 +0530'
date_gmt: '2015-03-19 16:47:10 +0530'
categories:
- Web Technologies
- CSS
- SCSS
tags:
- scss
- sass
- box-shadow
- experiment
- blur
comments: []
---
<p>I know. I know. I am late into the business. All cool kids have nailed it completely and I took it up yesterday. But better late than never.</p>
<p>I had tried LESS a little bit, mostly for variables and occasionally for mixins. Never used preprocessing extensively in projects and continued to use the same ol' CSS for everything. I wanted to dive-in. So when it was time to pick one up, I went through <a href="https://css-tricks.com/sass-vs-less/">this article</a> and picked SCSS.</p>
<p>Now that SCSS was <em><a href="https://www.google.co.in/webhp?sourceid=chrome-instant&amp;ion=1&amp;espv=2&amp;ie=UTF-8#q=the+chosen+one+harry+potter">the chosen one</a>, </em>the instant thought I had was to play around with multiple shadows. It's been one of those things, I always wanted to do. Sadly, it's difficult to write random multiple box-shadows manually. Hence I needed a loop and a shadow generator.</p>
<h3>HTML :</h3>
<p>Nothing much here. The aim was to use a single element. The blob.</p>
<pre class="lang:xhtml decode:true ">&lt;span class="blob"&gt;&lt;/span&gt;</pre>
<h3>SCSS:</h3>
<p>I first created a variable <span class="lang:default decode:true  crayon-inline ">$shadows</span>  which contained the number of shadows I wanted to create. Then, I created the base styling for the <span class="lang:default decode:true  crayon-inline ">.blob</span></p>
<pre class="lang:sass decode:true">/*Number of shadows to generate*/
$shadows:1000;

/*our loved blob*/
.blob {
    height:3px;
    width:3px;
    border-radius:50%;
    display: inline-block;
}
</pre>
<p>Next, I created a random <strong>box-shadow</strong> generator. I limited the <strong>X and Y offset values to 1920 and 1080</strong> respectively( That's my screen resolution. Still looking for a way to get window height and width in SCSS ). Set the <strong>blur and spread radius</strong> to the same random number and lastly, used random numbers to generate the colors using <span class="lang:js decode:true  crayon-inline ">rgb()</span> .</p>
<pre class="lang:sass decode:true">@function randomBoxShadow() {
    $radius: random(50);
    $shadow: random(1920)+'px '+random(1080)+'px '+$radius+'px '+$radius+'px rgb('+random(255)+','+random(255)+','+random(255)+')';
    @return unquote($shadow);
}</pre>
<p>See the <span class="lang:default decode:true  crayon-inline ">unquote()</span>  in the return statement?. <span class="lang:default decode:true  crayon-inline ">$shadow</span>  get's generated as a string. e.g - <span class="lang:default decode:true  crayon-inline ">"10px 120px 40px 40px rgb(1,35,145)"</span>  - <em>with</em> the quotes. This however can't be assigned to box-shadow. Hence we <strong>unquote</strong> it.</p>
<p>Finally I create a loop for the box-shadow inside <span class="lang:js decode:true  crayon-inline ">.blob</span>  and call <span class="lang:js decode:true  crayon-inline ">randomBoxShadow()</span>  within it to get a random shadow every time.</p>
<pre class="lang:sass decode:true">$box-shadow:0 0 10px 0 #000; /*an initial value for box-shadow*/
@for $i from 2 through $shadows {
    $box-shadow: $box-shadow+','+ randomBoxShadow();
}
box-shadow:unquote($box-shadow);</pre>
<p>Combining all these, the SCSS ended up as follows.</p>
<pre class="lang:sass decode:true ">$shadows:1000;

@function randomBoxShadow() {
    $radius: random(50);
    $shadow: random(1920)+'px '+random(1080)+'px '+$radius+'px '+$radius+'px rgb('+random(255)+','+random(255)+','+random(255)+')';
    @return unquote($shadow);
}

.blob {
    height:3px;
    width:3px;
    border-radius:50%;
    display: inline-block;
    $box-shadow:0 0 10px 0 #000;
    @for $i from 2 through $shadows {
        $box-shadow: $box-shadow+','+ randomBoxShadow();
    }
    box-shadow:unquote($box-shadow);
}</pre>
<p>...and I was happy!</p>
<p class="codepen" data-height="268" data-theme-id="4977" data-slug-hash="MYzRJX" data-default-tab="result" data-user="praveenpuglia">See the Pen <a href="http://codepen.io/praveenpuglia/pen/MYzRJX/">A blurry world!</a> by Praveen Puglia (<a href="http://codepen.io/praveenpuglia">@praveenpuglia</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<p><script src="//assets.codepen.io/assets/embed/ei.js" async=""></script></p>
