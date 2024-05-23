---
date: "2023-02-01"
title: "Your Favorite Homepage as a GIF"
category: "computers"
description: "Create an animated gif of any website's history using Wayback Machine"
image: "wayback/stripe.gif"
---

The [Wayback Machine](https://archive.org/web/) is a treasure. But it's also a little slow to navigate IMHO (perhaps purposely harkening back to those halcyon microfiche days). Can't we use computers to speed up our research endeavors?

Yes, we can. Here's a neato gif of Apple's homepage from 1996 to present:

![Apple homepage gif](/img/wayback/apple.gif)

Or maybe you're looking for some H1 or CSS gradient inspiration for your enterprise SaaS web3 startup? Look no further - here's Stripe's homepage since 2009:

![Stripe homepage gif](/img/wayback/stripe.gif)

Gotta love that *cloud with gears inside* image. APIs, baby.

These gifs are neat, right? Much faster than clicking around the Wayback Machine UI. Careful observers may be wondering about the snapshot cadence here - I'm grabbing one screenshot per year in these examples. The Wayback Machine has *waaay* more snapshots for these sites (there are currently 349,843 available snapshots of apple.com between October 22, 1996 and February 1, 2023), but an annual capture -- in gif format -- definitely gives you a good sense for the evolution of these homepages.

Here's another great example: whitehouse.gov (and, no, this is not whitehouse.com, to those of you from the 90s who've made that most-enlightening of mistakes before):

![Whitehouse homepage gif](/img/wayback/whitehouse.gif)

This is almost itself a history lesson of the web in a single gif.

### How I made these GIFs

Speaking of the GIF format, did you know it was created in 1987? That's two years before the World Wide Web. Also, the [gif spec](https://www.w3.org/Graphics/GIF/spec-gif89a.txt) is nuts and has tons of features that no one really uses or knows about. These magical features (like the "wait for user input" flag) were first revealed to me in our [Escaping Web interview with Lauren Budorick of Figma](https://escapingweb.github.io/episodes/4/). But I digress.

My point here -- and I do have one -- is that I've been thinking about this idea -- gifs of the Wayback Machine results -- for a couple years now, and never actually did anything about it. And then my pal [Nicholas](https://nicholascharriere.com/) extolled the virtues of coding with ChatGPT to me last night. I was skeptical, despite dabbling with (and enjoying) GPT-3 and DALL-E 2 during [last year's writing project](https://f52.charlieharrington.com/stories/writers-blockchain/). But then I remembered this little Wayback gif idea, and I thought I'd give ol' ChattyG a try, since this would mostly be a "string some boilerplate together until it works" sort of project.

### AI rubber duck debugging

This is not going to be a *how I, for one, came to love our new AI overlords* post. But I will quickly share my takeaways. 

The most impressive thing about working with ChatGPT was that *I shipped this project*. Period. Something that had been rattling around in my skull for a couple years is [now available for you to try out on GitHub](https://github.com/whatrocks/waybackgif) and even [Replit](https://replit.com/@whatrocks/waybackgif) if you want to give it a try in your browser.

Did ChatGPT get it right the first time? No. But sometimes editing is easier, and it got me started in a direction. I still had to do some documentation digging and even some StackOverflowing, but that was fine, cause I was paired up with a robot buddy. In this sense, ChatGPT felt like [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging), except with a rubber duck who has some fairly decent ideas of its own.

Where ChatGPT really excelled for me was when I wanted to add conveniences to working code which would have been annoying to code myself. 

For example, the URL to search was originally hardcoded in the script. After everything was working, I asked ChatGPT to update my script to accept the URL as a required CLI argument. ChatGPT crushed this task, pulling in an arg parsing library for Python and updating my script structure accordingly. That was pretty cool.

### More GIFs, please!

How about the Everything Store?

![Amazon homepage gif](/img/wayback/amazon.gif)

Seems like they got wind of the automated test software by 2020.

Let's do one more. How about YahoooOooOOo?

![Yahoo homepage gif](/img/wayback/yahoo.gif)

Kinda disturbing to see Yahoo transform from covering "Arts and Humanities" and "Science" into the LCD of our attention span over the years, actually. I think I'm going to stop now.

### Homepage as history

Homepages are cool. And we're lucky we have the Internet Archive out there recording them all for posterity.

> Please consider [donating to the Internet Archive - creators and maintainers of the Wayback Machine, as well as many other Library of Alexandria-esque Internet.. um, archival programs - right here](https://archive.org/donate). I just did it, and it was super easy with PayPal.