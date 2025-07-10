---
layout: post
title: Daily Driving Thorium
date: 2025-07-10
tags: [productivity, browser]
permalink: /posts/daily-driving-thorium
---

I was a Firefox user before I switched to Chrome. Then I switched to Edge because Chrome just couldn't stop eating memory and sipping on power juice. Edge is efficient. I never saw the dreaded macOS 'system is running out of memory' task manager prompt. 

![macOS running out of application memory](../assets/images/2025/macos-memory-full.avif)

I had been a happy Edge user for quite a long time until a super annoying issue started happening. It just wouldn't detect my precise location after a certain update. I tried deleting every configuration and starting afresh but nothing worked. 

Around the same time, I came across [Thorium](https://thorium.rocks/) on X. The proposition of a Chromium based browser with some performance gains and other customizations was lucrative. Their [website](https://thorium.rocks/) also was kinda cool and gave retro vibes!

I decided to give it a spin.  

## Note on Installation
Didn't find it on Homebrew. Don't install whatever Thorium cask is available. 

Had to go here - [https://github.com/Alex313031/Thorium-MacOS/releases](https://github.com/Alex313031/Thorium-MacOS/releases) and download the correct version to install it. 

The homepage does have straightforward instructions for Linux though. 

## Performance
I have been daily driving it with multiple profiles and tons of tabs and it does seem fast! I noticed that websites load faster on it compared to either Edge or even my Chrome Canary that has no extensions, no profiles etc. 

The best part was I was able to pull in all the data from my Google account and imported whatever I needed from Edge quickly. That went well. 

## Hiccups with Bitwarden
Bitwarden is my password manager of choice. It's been great across Chrome and Edge and I expected it to just work out of the box. Everything went smooth until I checked on the **Unlock with biometrics** setting. It simply didn't work. It couldn't open the Bitwarden desktop app the first time and then on it remained disabled stating that it couldn't find the Bitwarden desktop app running. Weird since the app **was** running.

I tried switching off and on the **Enable browser integrations** options in Bitwarden desktop app's own settings. That didn't work either. 

I thought maybe a restart would work - but that didn't work either. 

Googling led me to this [specific comment](https://community.bitwarden.com/t/extension-biometrics-unlock-in-chromium-and-derivatives-thorium-iridium-iron-etc/52702/2) which made a lot of sense. Bitwarden's source code possibly doesn't have an entry for Thorium in its list of browsers to create and copy the required manifest file for its inter-process communication to work. 

Reading [further](https://community.bitwarden.com/t/extension-biometrics-unlock-in-chromium-and-derivatives-thorium-iridium-iron-etc/52702/4) revealed the location of the file and all I had to do was copy the file from an existing installation of Bitwarden on Edge to Thorium's `NativeMessagingHosts` directory. Here's how that worked. 

```sh
cd ~/Library/Application\ Support/Microsoft\ Edge/NativeMessageHosts
cp com.8bit.bitwarden.json ../../../Thorium/NativeMessagingHosts
```
After this, I had to restart Thorium and everything worked.

If you don't use Edge, you can just download either Edge or Chrome, install Bitwarden there, enable unlocking with biometrics and then copy the file to Thorium's `NativeMessagingHosts` directory. 

These instructions should also work on other Chromium based browsers like Iridium, Iron, etc. 




