---
layout: post
title: Make WAMP Work On Windows 10
date: 2015-02-12
---

### Edit For Windows 10 Clean Install

---

If you have done clean installation of Windows 10, you may not have the **Word Wide Web Publishing Service**. In that case, simple WAMP/XAMPP installation should work fine.

If it doesn't, try installing [Visual C++ Redistributable](http://www.microsoft.com/en-us/download/details.aspx?id=30679) and then re-install WAMP/XAMPP.

---

Shortly after the Windows 10 Technical Preview was made available, I was excited to try it out. And so I did. Everything was pretty cool until I tried starting WAMP, just to find out that it never starts( stuck at the yellow state in the notification area ). Whenever a new version of Windows comes up there is something or the other wrong with WAMP.

Skype wasn't the problem this time because I didn't have it installed. I also removed the modern Skype that comes installed with the Technical Preview. Neither it was [the IPV6 issue](https://praveenpuglia.wordpress.com/2012/11/20/setting-up-wamp-server-in-windows-8/) which stopped it from working on Windows 8.

As I figured out, the port **80** was being used by a native service named - **[World Wide Web Publishing Service](https://technet.microsoft.com/en-us/library/cc734944%28v=ws.10%29.aspx).** Stopping it and restarting WAMP did the trick. Here's how to locate and stop the service.[screenshot below]

- Go to Start, type in **services.msc**
- Scroll down in the Services window to find the **World Wide Web Publishing Service.**
- Right click on it and select **Stop.**

Now restart WAMP and you should be good to go.

_**UPDATE - **In the newer versions of Windows 10, you may not find the World Wide Web Publishing Service. If WAMP isn't working even then, try the next approach._

![Wamp on Windows 10 - Services](../assets/images/2015/02/wamp.avif)

If you don't want to do it that way though, you can _change the port WAMP listens to_.  Here's how to do that.

- Click on the WAMP icon in system tray.
- Select **Apache > httpd.conf**
- Search for **Listen 80.**
- Change **80 **to any other port number e.g. - **9080**.
- Restart WAMP.

This will work. However, you will now be required to use that port number everywhere for access. E.g - `http://localhost:9080/` instead of just `http://localhost/`

**EDIT(17<sup>th</sup> March, 2015)  :** As mentioned [here](http://forum.wampserver.com/read.php?2,130348,132009), I got to know that World Wide Web Publishing Service is associated with IIS. Windows 10 comes pre-loaded with it. You either uninstall it or disable it while running Apache. For the latest build of Windows 10, the following from the mentioned link should solve the issue.

> As of the current build (9926) of W10 Preview, the only thing you need to do to get WAMPServer 2.5 running is install the MSVC2012 VC11 C/C++ runtime library as this is not delivered as part of the W10 install.

Know a different workaround? Let me know in comments.
