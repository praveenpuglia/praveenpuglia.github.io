---
layout: post
status: publish
published: true
title: Ready Steady Gulp!
author:
  display_name: Praveen Puglia
  login: praveenpuglia
  email: praveenpuglia@gmail.com
  url: ''
author_login: praveenpuglia
author_email: praveenpuglia@gmail.com
excerpt: Lately, if something has totally changed the way I work, it's Gulp - the
  streaming build system. There are lot of cool things you can do with gulp with great
  flexibility. Let's get started!
wordpress_id: 185
wordpress_url: http://praveenpuglia.com/?p=185
date: '2015-06-28 13:08:11 +0530'
date_gmt: '2015-06-28 07:38:11 +0530'
categories:
- Workflow
tags:
- css
- minify
- gulp
- watch
- build
- workflow
- stream
comments:
- id: 1101
  author: Ready Steady Gulp | experience@imaginea
  author_email: ''
  author_url: http://blog.imaginea.com/ready-steady-gulp/
  date: '2015-07-03 12:38:01 +0530'
  date_gmt: '2015-07-03 07:08:01 +0530'
  content: "[&#8230;]  This post originally appeared on praveenpuglia.com [&#8230;]"
---
<p>Lately, if something has totally changed the way I work, it's <a href="http://gulpjs.com/" target="_blank">Gulp - the streaming build system</a>. There are lot of cool things you can do with gulp with great flexibility. Let's get started!</p>
<h3>Installation</h3>
<p><strong><a href="https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager" target="_blank">NodeJS and NPM must be installed.</a></strong></p>
<p>Gulp needs to be installed both globally( for command line usage ) and locally into our project( for creating project tasks )</p>
<h4>Global Installation</h4>
<pre class="lang:sh decode:true">sudo npm install -g gulp</pre>
<h4>Local Installation</h4>
<pre class="lang:zsh decode:true">cd path/to/your/project/root
npm install gulp --save-dev</pre>
<h3>Hello World!</h3>
<p>Assuming our project directory is <span class="lang:default decode:true  crayon-inline ">my-project</span> , create a <span class="lang:default decode:true  crayon-inline ">gulpfile.js</span>  file in it. All gulp tasks reside in this file.</p>
<p>Now, we create our first task that prints out <strong>Hello.</strong></p>

{% highlight javascript %}
// require gulp. this is why we install gulp locally.
var gulp = require("gulp");

// say hello
gulp.task("sayHello", function(){
    console.log("Hello");
});
{% endhighlight %}
<ul>
<li>First, we require <span class="lang:default decode:true  crayon-inline ">gulp</span> so we can use gulp's API for creating tasks.</li>
<li>Next, we create a task using <span class="lang:js decode:true crayon-inline">gulp.task</span> method with the <strong>task name</strong> being <span class="lang:default decode:true  crayon-inline">sayHello</span>  and an anonymous function that defines what <span class="lang:default decode:true  crayon-inline">sayHello</span> does. In this case, we just print out <strong>Hello</strong></li>
</ul>
<h3>Executing a Task</h3>
<p>Most of the work with gulp happens on the command line. To run a task, we navigate to our project directory( or the directory containing <span class="lang:default decode:true  crayon-inline ">gulpfile.js</span>  ) and ask gulp to run a specific task.</p>
<pre class="lang:default highlight:0 decode:true">my-project
    /gulpfile.js  &lt;- YOU GOTTA BE WHERE THIS FILE IS</pre>
<pre class="lang:sh decode:true">cd my-project
gulp sayHello</pre>
<p>Did you see what happened? It might look something like this...</p>
<pre class="lang:zsh highlight:0 decode:true">$ gulp sayHello
[15:30:28] Using gulpfile ~/code/my-project/gulpfile.js
[15:30:28] Starting 'sayHello'...
Hello
[15:30:28] Finished 'sayHello' after 83 μs
</pre>
<p>Following along? Great!</p>
<h3>Dependent Tasks</h3>
<p>It's easy to make one task wait for another to finish. This is done by passing an array of tasks as the second parameter to <span class="lang:js decode:true  crayon-inline ">gulp.task</span>  method.</p>
<pre class="lang:js decode:true">// say world after saying hello is done
gulp.task("sayWorld",['sayHello'], function(){
    console.log("World!");
});</pre>
<p>Move over to terminal and execute <span class="lang:js decode:true  crayon-inline ">gulp world</span> .</p>
<h3>The Default Task</h3>
<p>If we move over to terminal and execute <span class="lang:js decode:true  crayon-inline ">gulp</span> , without specifying a task name, it looks for the <span class="lang:js decode:true  crayon-inline ">default</span>  task. Go ahead! give it a try.</p>
<pre class="lang:js decode:true">gulp.task("default", function(){
    console.log("La la la!");
});</pre>
<h3>Exploring Gulp's API</h3>
<p>Gulp has 3 other methods <span class="lang:default decode:true  crayon-inline">.src</span> ,<span class="lang:default decode:true  crayon-inline">.dest</span>  &amp; <span class="lang:default decode:true  crayon-inline">.watch</span> apart from <span class="lang:default decode:true  crayon-inline">.task</span> . We'll look into those by trying to minify CSS, a real world use case for gulp.</p>
<p>Before we go ahead, we need to know a little more about how gulp works. Gulp generates a stream from the files we pass in via <span class="lang:js decode:true  crayon-inline ">gulp.src</span>  method. We then <span class="lang:js decode:true  crayon-inline ">pipe</span>  the stream through various processors like <strong>minify</strong>, <strong>uglify</strong>, <strong>sass</strong>, <strong>sourcemaps</strong> etc. Remember, all the processing done, is still on the generated stream and not written to disk. To do that, we use <span class="lang:js decode:true  crayon-inline ">gulp.dest</span> .</p>
<h4>Minify CSS</h4>
<p>Create a <strong>style.css</strong> in <strong>css</strong> directory and put the following content.</p>
<pre class="lang:css decode:true">*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body, html{
  height : 100%;
}</pre>
<p>We will install <a href="http://*{   box-sizing: border-box;   padding: 0;   margin: 0; } body, html{   height : 100%; }" target="_blank">gulp-minify-css plugin</a> to do the minification.</p>
<pre class="lang:js decode:true ">npm install gulp-minify-css --save-dev</pre>
<p>In <strong>gulpfile.js</strong>, we require this module just like we did it for <strong>gulp</strong>.</p>
<pre class="lang:js decode:true ">var minify = require('gulp-minify-css');</pre>
<pre class="lang:js decode:true">// minify css
gulp.task("css:minify", function(){
  gulp.src("css/style.css")
    .pipe(minify())
    .pipe(gulp.dest("min"));
})</pre>
<p>So what did we do?</p>
<ol>
<li>We create a new task named <span class="lang:js decode:true  crayon-inline ">css:minify</span>  (namespacing is good).</li>
<li>We tell gulp which sources to use to build the stream to process using <span class="lang:js decode:true  crayon-inline ">gulp.src</span>  and passing in the file path.</li>
<li>We then <span class="lang:js decode:true  crayon-inline ">pipe</span>  the generated stream through the <span class="lang:js decode:true  crayon-inline ">minify</span>  process.</li>
<li>Finally, we pipe the processed stream through <span class="lang:js decode:true  crayon-inline ">gulp.dest</span> which then writes the new, minified <span class="lang:js decode:true  crayon-inline ">style.css</span>  inside <span class="lang:js decode:true  crayon-inline ">min</span>  directory.</li>
</ol>
<p>The last thing I want to mention is how to watch files for changes. In our example, we'll setup a <span class="lang:js decode:true  crayon-inline ">watch</span>  task and look for changes in <strong>css</strong> files. Whenever that happens, we would want the <span class="lang:js decode:true  crayon-inline ">css:minify</span>  task to run automatically. Here's how.</p>
<pre class="lang:js decode:true">// watch for changes in source
gulp.task("watch", function(){
  gulp.watch("css/style.css",['css:minify']);
})</pre>
<p>On terminal execute <span class="lang:js decode:true  crayon-inline ">gulp watch</span> . It may look like the the prompt has hanged but it's actually watching for file changes. Let's go ahead and add some new rules in <strong>style.css</strong>, save it and see what happens!</p>
<p>In the next post, I'll write about file include patterns, various recipes for doing things like sass compilation, generating sourcemaps, cleaning directories before running tasks and more. Stay tuned!</p>
