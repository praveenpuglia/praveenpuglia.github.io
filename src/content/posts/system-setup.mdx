---
title: System Setup in 2025
description: "My setup, tools, and tricks I have learnt over the years"
date: 2025-07-12
tags: [productivity, engineer]
socialImage: "/assets/images/2025/terminal.png"
---

![Wezterm Screenshot](/assets/images/2025/terminal.png)

## First Things First
I use a mac and the first thing I do is install [Homebrew](https://brew.sh/). Most of my CLI tools & programs are available on Homebrew. Makes it very easy to install a ton of packages in one go. 

Over the years, I have learnt to store vital configurations in a [dotfiles](https://github.com/praveenpuglia/dotfiles) repository. You should [read this old blog post](https://blog.smalleycreative.com/using-git-and-github-to-manage-your-dotfiles/) and do it too! 

When I setup my system, I download this repo and the first thing to run is 
```sh
brew bundle install
```
This picks up the `Brewfile` and installs all the packages I have listed in it. Read more about [how Homebrew Bundle works](https://docs.brew.sh/Brew-Bundle-and-Brewfile).

## Terminal
I have gone through the phases of using [iTerm](https://iterm2.com/), [Alacritty](https://github.com/alacritty/alacritty), [Kitty](https://sw.kovidgoyal.net/kitty/), and now [WezTerm](https://wezterm.org/). I also tried [Warp](https://www.warp.dev/) for a while but it always felt too bloated & slow. It now has [AI built in](https://www.warp.dev/warp-ai) which is already too much AI everywhere at this point. 

I have settled on WezTerm because it is a modern terminal emulator that is easy to configure and has a lot of features. Most importantly, it's lean, clean and has low CPU & Memory footprint. It also uses Lua for configuration which is a very nice language to work with. 

I store my WezTerm configuration in the [same dotfiles repository](https://github.com/praveenpuglia/dotfiles/blob/master/wezterm.lua). Simply copying this to `~/.config/wezterm/wezterm.lua` does the job.

I have a few custom keybindings to split the terminal into multiple vertical / horizontal panes, navigate left and right around commands etc. You can find them in the config file itself. 

## Shell
I have been a long term fan of ZSH because of the [Oh My ZSH](https://ohmyz.sh/) framework. It supercharges my shell workflows. 

macOS now comes with ZSH by default so you don't have to install it separately but in case you don't have it, you can install it via Homebrew.

My configuration is available [here](https://github.com/praveenpuglia/dotfiles/blob/master/.zshrc) but you may not need all of it - things like the environment variables and path changes. Modify as needed.

I do wanna talk about some of the plugins I use because they make life easier. 

### [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
This plugin provides suggestions for commands as you type. It's a great way to speed up your workflow.
![zsh-autosuggestions](/assets/images/2025/zsh-autosuggestions.png)

### [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
This plugin provides syntax highlighting for your shell commands. If a command doesn't exist, it gets highlighted in red.
![zsh-syntax-highlighting](/assets/images/2025/zsh-syntax-highlighting.png)

### [z](https://github.com/agkozak/zsh-z)
This plugin provides a way to navigate to frequently used directories. Example, if I need to go to `~/code/github`, I simply type `z github` and it takes me there. The longer the path the quicker it feels. 

<video src="/assets/images/2025/zsh-z.mp4" autoplay loop muted playsinline></video>

### [git-extras](https://github.com/tj/git-extras)
git-extras has a lot of useful tools & aliases that make git workflows super easy. For example - 
- `git undo` - Undo the last commit
- `git delete-branch <branch-name>` - Deletes both the local and remote branch

You can take a look at the full list of commands [here](https://github.com/tj/git-extras/blob/main/Commands.md).

## Prompt
I love [Powerlevel10k](https://github.com/romkatv/powerlevel10k). It's a no-nonsense, fast prompt with a lot of customizability. Make sure to enable [transient prompt](https://github.com/romkatv/powerlevel10k#transient-prompt) if you are using it. 

My configuration is available [in the same repository](https://github.com/praveenpuglia/dotfiles/blob/master/.p10k.zsh). If you are copying it, you'll need to place it in `~/.p10k.zsh`.

## Misc CLI Tools & Aliases
Some of my favorite CLI tools & aliases.

### Tools

- **[eza](https://github.com/eza-community/eza)** : eza is a modern replacement for ls. It's a lot faster and has a lot of features.  
- **[micro](https://github.com/zyedidia/micro)** : I couldn't ever get used to working with Vim. Thankfully Micro exists with sensible defaults, keyboard shortcuts, syntax highlighting and more. 
- **[volta](https://volta.sh/)** : I use Volta to manage my Node.js versions. NVM is popular but Volta is lean and clean. It seamlessly integrates into your node projects via `volta` config in `package.json` and if you have a pinned node / npm version, it'll automatically switch to that version when you go into your project directory. 
- **[fkill](https://github.com/sindresorhus/fkill-cli)** : I don't like googling that command to figure out process ID and then kill it using `kill -9 <pid>`. fkill is just more convenient.
- **[fzf](https://github.com/junegunn/fzf)** : Ever used arrow keys to find that one command you couldn't fully remember? Or tried the default `Ctrl+R` to search through your command history? fzf is a better alternative. It has fuzzy search to get you to the right command at lightning speed.
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** : I love downloading videos from YouTube for offline viewing, especially when I am on a plane / train. YT-DLP is amazing for this. It can download videos, music, subtitles in various quality. I even have an alias for it mentioned below. 

### Aliases
```sh
# zshrc management
alias zc="micro ~/.zshrc"
alias zs="source ~/.zshrc"

# use eza when typing ls
alias ls="eza"
alias la="eza --icons -la"

# because this is needed a lof of times
alias nuke="rm -rf node_modules"
# recursively kills all node_modules. Helpful when freeing up space
# and also migrating to a new system without having to copy
# gazillion files
alias boom="find . -name "node_modules" -exec rm -rf '{}' +"

# kill process
alias k="fkill -v"

# git additional 
alias gdl="git delete-branch"

# yt-dlp alias for downloading videos from YouTube in the best possible quality
# along with all the subtitles
alias ytd='yt-dlp --output "./%(title)s/%(title)s-[%(id)s].%(ext)s" --all-subs -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4"'
```

## Apps

- **[AppCleaner](https://freemacsoft.net/appcleaner/)** : It's an oldie but a goodie. Mac doesn't have a native uninstaller that can purge all the files & configurations when an app is uninstalled. AppCleaner is a great tool to do that. If you installed an app via Homebrew, `brew uninstall` should do the job. If you are using AppCleaner, make sure you turn **Smart Delete** on. 

<img width="400" src="/assets/images/2025/appcleaner-smart-delete.png" alt="AppCleaner Smart Delete">

- **[Bandwidth+](https://apps.apple.com/us/app/bandwidth/id490461369?mt=12)** : Nifty little menu bar tool that shows upload and download speeds.
- **[Bitwarden](https://bitwarden.com/)** : The best password manager I have ever used. The free version is good enough for most people.
- **[CommandX](https://sindresorhus.com/command-x)** : I hate hitting <kbd>⌘</kbd><kbd>⌥</kbd><kbd>V</kbd> to cut paste a file? CommandX enables <kbd>⌘</kbd><kbd>X</kbd> on a mac. 
- **[Dato](https://sindresorhus.com/dato)** : Another great one from Sindre. I can't imagine tackling all the meetings and calendar events I have in life without it. 
- **[ImageOptim](https://imageoptim.com/)** : The fastest way to optimize images. One of the must have tools for UI engineers. 
- **[LocalSend](https://localsend.org/)** : I use an Android phone and LocalSend is the easiest way to send files to my mac and other devices. 
- **[Menu Bar Spacing](https://sindresorhus.com/menu-bar-spacing)** : Another one from Sindre that fixes the nighmare of a decision Apple took with spacing the menu bar items in the newer macOS versions. 
- **[QuickRecorder](https://lihaoyun6.github.io/quickrecorder/)** : My go to tool for screen recording was QuickTime screen recording but I needed something that had a bit more features. QuickRecorder is a great, free, open source alternative. 
- **[Raycast](https://www.raycast.com/)** : Seriously! Why do people still use Spotlight? It has a great extensions ecosystem that helps me to things like quickly generate passwords, copy TOTPs via Ente Auth, have auto expanding snippets etc. 
- **[Shottr](https://shottr.cc/)** : The best screenshot tool I have ever used and purchased a license. If you install it, make sure you change the default macOS screenshot shortcut to open Shottr instead. Here's a screenshot! ;)
![Shottr](/assets/images/2025/shottr-preferences.png)
- **[Thorium](https://thorium.rocks/)** : I have been [daily driving Thorium](https://praveenpuglia.com/posts/daily-driving-thorium/) now. So far, it's been a great, fast, reliable Chromium fork. 
- **[Squoosh](https://squoosh.app/)** : My go-to tool for converting images to web optimized formats, especially AVIF. 
- **[SVGOMG](https://jakearchibald.github.io/svgomg/)** : The tool to optimize individual SVG files. 
- **[edit.photo](https://edit.photo/)** : The simplest and cleanest browser based photo editor for most common use cases. 
- **[Photopea](https://www.photopea.com/)** : Not paying for Photoshop. Photopea is the best free Photoshop alternative running on web tech. 
- **[tldraw](https://www.tldraw.com/)** : Between [Excalidraw](https://excalidraw.com/) and this one, I like this one a tad bit more! Purely a personal taste thing. 
