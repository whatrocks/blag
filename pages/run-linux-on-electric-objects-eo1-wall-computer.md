---
date: "2022-08-01"
title: "Run Linux on Electric Objects EO1 Wall Computer"
category: "computers"
image: "eo.jpg"
description: "Run Linux on your Electrics Objects EO1 computer"
---

## Riddle in the dark

> What was too early for NFTs, too vertical to be a Samsung Frame TV competitor, kickstarted to life by gifs, and acquired to death by Giphy?

That's right, hobbitses, it's [Electric Objects](https://www.electricobjects.com/)!

![Electric Objects app](/img/eo/app.gif)

Electric Objects was a computer company building a *computer made for art*. That's one of the coolest sentences ever, except for the *was* part. Founder and CEO [Jake Levine](https://twitter.com/jrlevine) (a fellow Morgan Stanley escapee) wrote a great *[what-happened](https://medium.com/the-frontier/lessons-from-electric-objects-e161f0450f8f)* series of posts in 2018 that are worth a read for anyone interested in hardware startups. But, even better, just re-watch [their Kickstarter video](https://www.kickstarter.com/projects/electricobjects/electric-objects-a-computer-made-for-art) and experience the pure joy of the creative act of bringing a computer to life.

![Electric Objects art](/img/eo/eo-art.gif)

Electric Objects was gobbled up by Giphy, which in turn was slurped and gorbled into Facebook, and the Electric Objects iOS app is sadly no more. Which, for a computer that was explicly designed to not have a keyboard or mouse, poses a challenge for its owners. 

So, why am I still lugging around my EO1?

Because I'm not giving up on the dream, Jake.

## Still kicking

The EO1 is a computer, right? Surely, we can boot into its presumably Linux OS somehow, instead of the default Electric Objects app experience thingie?

Turns out, yes, we can! I had to do a fair bit of forum spelunking to figure it out. I was delighted to discover other Electric Object wanderers out there like me. [This post](https://openframe.discourse.group/t/make-it-possible-to-run-on-the-eo-electric-objects-hardware/88/6) was the jackpot. 

The long and the short of it is that the company who manufactured the board for the EO1 is called Boundary Devices, and you can download [their Linux builds](https://boundarydevices.com/ubuntu-bionic-18-04-3-lts-for-i-mx6-7-boards-august-2019-kernel-4-14-x/) on their website (after making an account, etc, etc). Fling that image onto a [USB thumbdrive](https://amzn.to/3Q680NU), attach the thumbdrive and a keyboard and a mouse to a [USB hub](https://amzn.to/3SvsLnz), connect the hub to a [micro-USB adaptor](https://amzn.to/3OXDOTG), plug that sucker into the back of the EO1, and then - boom - you've got yourself a weird vertical Linux computer on your dang wall.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fAWJdXJvngU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

It's almost too easy.

![Electric Objects](/img/eo/eo.jpg)

## Displaying the New York Times frontpage on your Electric Objects EO1

So, now what? What are you going to do with your wall computer, Charlie?

Lots of stuff, okay?

Like... remember that post from Brian Donahue about displaying the NY Times frontpage on his EO1 (which itself was derived from [another post about building a giganto e-ink display to do the same](https://onezero.medium.com/the-morning-paper-revisited-35b407822494))? How about that?

Much of [Brian's repo](https://github.com/Donohue/eo-nytimes) is about communicating with the Electric Objects API. But we're not going to do that, are we? The real nugget of gold here is the deterministic URL for grabbing a PDF of the NY Time front page:

```bash
https://static01.nyt.com/images/$(date +"%Y/%m/%d")/nytfrontpage/scan.pdf
```

I bet we could make a nice one-liner to download today's front page using today's date and then open it up full screen somehow and then make it run this script every time the computer boots up.

That turned out to be more complicated than expected (typical). I hacked and slashed (and Googled) my way to the following setup, which works (I know it's not a one-liner, but doing it this way really helped me debug why each step - yes, each step - wasn't working at some point in this process):

```bash
#!/bin/bash

export DISPLAY=:0

echo "sleeping..."
sleep 60

echo "remove yesterday..."
rm scan.pdf

echo "download today..."
/usr/bin/wget "https://static01.nyt.com/images/$(date +"%Y/%m/%d")/nytfrontpage/scan.pdf"

echo "open fullscreen..."
/usr/bin/evince --fullscreen scan.pdf

echo "done!"
```

Then, you can use crontab to setup this script to run every time the computer boots with the `@reboot` keyword (which I didn't know about before and works as valid cron syntax - depending on your cron version). Don't forget to `chmod +x` your script first!

Well, does it work? 

![Electric Objects](/img/eo/success.jpg)

It does!

For the curious, migrating my one-liner/script to cron had a bunch of challenges (e.g. cron doesn't like `%` without escaping them; I needed to add `sleep` to ensure networking/wifi had loaded; I needed to add the `DISPLAY` env var so that cron knew how to talk to the display, etc). Also, I needed to install `postfix` so that I could read cron's error logs, which amazingly are emailed to your computer.

After all that, I connected the EO1 power cable to a Wemo smart outlet plug thingie, which integrated with Apple Homekit. Using the Apple Home app, I set this outlet to turn on at 6 AM and then turn off 2 hours later.

### Hello darkness, my old friend

After a few evenings, I thought this "5 minute" project was done until I noticed that the screen was going dark at the 1 hour mark. 

This particular Ubuntu distro's Power settings did not provide me the option of "never going to sleep". More Googling led me down many failed paths (e.g. masking stuff in systemctl, trying `gnome-tweaks`) until I finally got something that keeps the EO1 display "awake" - the `caffeine` utility.

I added this line to the end of my script, and now we're awake and jittery... at 6 AM. But at least we have today's paper to read.

```
caffeinate sleep 9999999
```

## Are we done puttering yet?

Never!

Now I'm adding [Tailscale](https://tailscale.com) so that I can officially disconnect the keyboard and mouse and still be able to easy SSH into this wall computer. And I think I broke something else running `sudo apt-get update`, cause it's not booting up right now. Sigh...

Also, this whole caffeine thing makes me realize that I don't want to read anything before coffee, so I think automating morning coffee has got to be the next step.

I hope this little project reinvigorates your faith in the EO1, noble carriers of this wonderous device. Here's to even more people starting computer companies!