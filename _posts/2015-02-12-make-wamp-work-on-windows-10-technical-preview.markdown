---
layout: post
status: publish
published: true
title: Make WAMP work on Windows 10 Technical Preview
author:
  display_name: Praveen Puglia
  login: praveenpuglia
  email: praveenpuglia@gmail.com
  url: ''
author_login: praveenpuglia
author_email: praveenpuglia@gmail.com
excerpt: Whenever a new version of Windows comes up there is something or the other
  wrong with WAMP.
wordpress_id: 94
wordpress_url: http://praveenpuglia.com/?p=94
date: '2015-02-12 22:24:00 +0530'
date_gmt: '2015-02-12 16:54:00 +0530'
categories:
- Workflow
- Web Technologies
- Windows
tags:
- windows 10
- wamp
- skype
- localhost
comments:
- id: 1045
  author: Kevin Gilbert
  author_email: me@kevingilbert.co
  author_url: ''
  date: '2015-05-05 06:06:05 +0530'
  date_gmt: '2015-05-05 00:36:05 +0530'
  content: In latest Windows 10 Preview Build that service is nowhere to be found?
- id: 1046
  author: praveenpuglia
  author_email: praveenpuglia@gmail.com
  author_url: ''
  date: '2015-05-05 12:15:00 +0530'
  date_gmt: '2015-05-05 06:45:00 +0530'
  content: Which preview build are you using? I have not tested it after 10049.
- id: 1060
  author: Steven Reid
  author_email: steven_reid@hotmail.com
  author_url: ''
  date: '2015-06-03 02:56:23 +0530'
  date_gmt: '2015-06-02 21:26:23 +0530'
  content: This suggestion, Stopping World Wide Web Publishing Service, works in build
    10130 of Windows 10.
- id: 1062
  author: praveenpuglia
  author_email: praveenpuglia@gmail.com
  author_url: ''
  date: '2015-06-03 23:45:46 +0530'
  date_gmt: '2015-06-03 18:15:46 +0530'
  content: Thanks for mentioning that. I haven't done testing on latest previews though.
    Glad you mentioned.
- id: 1098
  author: Dave
  author_email: davewhitehead@commontechnology.pro
  author_url: ''
  date: '2015-07-02 03:10:55 +0530'
  date_gmt: '2015-07-01 21:40:55 +0530'
  content: "I have that same build, 10130 and that service is not listed. Really like
    to get WAMP up and running. Ran a command \"netstat -aon | findstr :80\" to see
    if anything is running on port 80 and got this:\r\n  TCP    192.168.0.9:49801
    \     63.156.207.186:80      ESTABLISHED     3940\r\n  TCP    192.168.0.9:49802
    \     63.156.207.186:80      ESTABLISHED     3940\r\nVery odd that someone is
    seeing the service in their build and I am not seeing tho I have the same build."
- id: 1100
  author: Praveen Puglia
  author_email: praveenpuglia@gmail.com
  author_url: ''
  date: '2015-07-03 12:02:21 +0530'
  date_gmt: '2015-07-03 06:32:21 +0530'
  content: "I am not quite sure why the service isn't present on some of the builds.
    \n\nHave you tried checking whether skype is running or not. Skype is found to
    have caused issues with WAMP earlier as well. Try stopping skype and then running
    WAMP.\n\nIf that's not the case, I suggest you try this one as well.  https://praveenpuglia.wordpress.com/2012/11/20/setting-up-wamp-server-in-windows-8/\n\nHope
    this helps and let me know what fixed your issue."
---
<p>Shortly after the Windows 10 Technical Preview was made available, I was excited to try it out. And so I did. Everything was pretty cool until I tried starting WAMP, just to find out that it never starts( stuck at the yellow state in the notification area ). Whenever a new version of Windows comes up there is something or the other wrong with WAMP.</p>
<p>Skype wasn't the problem this time because I didn't have it installed. I also removed the modern Skype that comes installed with the Technical Preview. <span style="line-height: 1.5;">Neither it was </span><a style="line-height: 1.5;" href="https://praveenpuglia.wordpress.com/2012/11/20/setting-up-wamp-server-in-windows-8/">the IPV6 issue</a><span style="line-height: 1.5;"> which stopped it from working on Windows 8. </span><span style="line-height: 1.5;"> </span></p>
<p>As I figured out, the port 80 was being used by a native service named - <strong><a href="https://technet.microsoft.com/en-us/library/cc734944%28v=ws.10%29.aspx">World Wide Web Publishing Service</a>. </strong>Stopping it and restarting WAMP did the trick. Here's how to locate and stop the service.[screenshot below]</p>
<ul>
<li>Go to Start, type in <strong>services.msc</strong></li>
<li>Scroll down in the Services window to find the <strong>World Wide Web Publishing Service.</strong></li>
<li>Right click on it and select <strong>Stop.</strong></li>
</ul>
<p>Now restart WAMP and you should be good to go.</p>
<p><em><strong>UPDATE - </strong>In the newer versions of Windows 10, you may not find the World Wide Web Publishing Service. If WAMP isn't working even then, try the next approach.</em></p>
<p><img class="aligncenter size-full wp-image-110" src="/assets/images/2015/02/wamp.png" alt="Wamp on Windows 10 - Services" /></p>
<p>If you don't want to do it that way though, you can<em> change the port WAMP listens to</em>.  Here's how to do that.</p>
<ul>
<li>Click on the WAMP icon in system tray.</li>
<li>Select <strong>Apache &gt; httpd.conf</strong></li>
<li>Search for <strong>Listen 80.</strong></li>
<li>Change <strong>80 </strong>to any other port number e.g. - <strong>9080</strong>.</li>
<li>Restart WAMP.</li>
</ul>
<p>This will work. However, you will now be required to use that port number everywhere for access. E.g - <span class="lang:default decode:true  crayon-inline ">http://localhost:9080/</span>  instead of just <span class="lang:default decode:true  crayon-inline">http://localhost/</span></p>
<p><strong>EDIT(17<sup>th</sup> March, 2015)  :</strong> As mentioned <a href="http://forum.wampserver.com/read.php?2,130348,132009">here</a>, I got to know that World Wide Web Publishing Service is associated with IIS. Windows 10 comes pre-loaded with it. You either uninstall it or disable it while running Apache. For the latest build of Windows 10, the following from the mentioned link should solve the issue.</p>
<blockquote><p>As of the current build (9926) of W10 Preview, the only thing you need to do to get WAMPServer 2.5 running is install the MSVC2012 VC11 C/C++ runtime library as this is not delivered as part of the W10 install.</p></blockquote>
<p>Know a different workaround? Let me know in comments.</p>
