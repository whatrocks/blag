---
date: "2022-04-14"
title: "iPad Terminal Setup"
category: "computers"
description: "iSH iPad terminal shell linux unix bash"
image: "ipad-terminal/ipad.png"
---

Sometimes magical thinking works out just fine.

> Once I get an iPad, I'll do that thing I've been procrastinating forever, cause, you know, the iPad has this app that's really good at...

Well, we got an iPad. And I love it. Productivity-boosts are yet to be observed (please disregard the alarming Screen Time usage reports), but this honeymoon phase is strong.

Now, much of this love stems from the fact that my 2016 MacBook Pro laptop cannot, in fact, act as a laptop -- the screen turns black once you open it past, give or take, 10 degrees. The friendly Geniuses offered to replace my entire screen for almost $900 buckeroos, which I politely declined. So, it's clam-shell mode for me, at least until the (please-be-colorful) new MacBook Airs come out sometime this year.

Having a little machine to do stuff on the go is pretty cool. I've reset my Anki deck and my daily flashcards are going pretty well for the first time in months (tapping the screen with the little Pencil is part of the appeal). [Procreate](https://procreate.art) is just as cool as everyone says and I'm excited to get better at it. I've also been dabbling with different apps to SSH into my various Raspberry Pis and mostly just running `sudo apt-get update && sudo apt-upgrade`, which has been made insanely easier thanks to [Tailscale](https://tailscale.com). So far, I dig [Termius](https://termius.com) the most. Once nice thing that I setup was a little script to auto-download all the cool monthly Raspberry Pi maker magazines on a cron, and then I can use Tailscale's Taildrop to send them over to the iPad (haven't automated this last bit yet!).

SSH-ing is cool and all, but what if I'm on airplane mode and want to do some coding. That's where [iSH](https://ish.app/) comes in.

iSH is a tiny little Alpine Linux environment in an iOS / iPadOS app. No, you're not getting a shell to your actual iPad's OS or filesystem - it's all sandboxed, as per App Store regulations, but it's still pretty cool what you can do with it. Given that I've been wanted to try out following the `kilo` [Build Your Own Text Editor in C](https://viewsourcecode.org/snaptoken/kilo/) tutorial, iSH is perfect for this. But not right away - the initial setup is bare bones, which is how Alpine is designed. Maybe you've noticed that many Docker containers start with an Alpine base image - just like those Dockerfiles, you'll need to install most of your handy CLI tools here. I found some useful guides on iSH setups for [C](https://jsmp.me/2020/05/05/c-development-on-ios) and [bash](https://www.cyberciti.biz/faq/alpine-linux-install-bash-using-apk-command/), and here's what I'm working with now:

<script src="https://gist.github.com/whatrocks/09a0b0008712884f72398fe472de5d91.js"></script>

On top of this, I also set up my git config and copied over some of [my dotfiles](https://github.com/whatrocks/dotfiles). Here's how things look on the ol` new iPad now:

![iPad with iSH](/img/ipad-terminal/ipad.png)

I'm ready to do some C, on the go!

My only gripe, at this point, is the lack of support for alphanumeric key-repeat in iSH and Termius. Very odd, and makes vim navigation much harder.

Now, with the exception of Procreate, none of this stuff is better than having a real-deal laptop, but it's pretty cool how close we can get to a decent dev environment on an iPad. And it's great for watching stuff, too, but you already knew that.