---
date: "2023-10-01"
title: "Using Farcaster protocol for .plan-style daily notes"
category: "computers"
description: "farcaster social network val.town fling decentralized finger protocol val.town"
image: "fling-web.png"
---

I've loved and lost websites. A few that come to mind: 
* Hyrule The Land of Zelda (htloz.com) - an Ocarina of Time forum devoted to finding the Triforce in a Zelda video game wherein you cannot find the Triforce (not with that attitude, at least)
* My very first website, which Peter Hayward and I hand-crafted on his mom's computer after school, featuring an exclusive variety of our exclusively frog-related drawings and stories
* Broken Records - my members.aol.com punk rock "record label" that I created in eighth grade where I declared that I was putting together a compilation album, and then someone mailed me a cassette from their band "One-Eyed Trouser Snake" and then I shut down Broken Records
* [OhLife.com](https://ohlife.com) - a YC journal startup that emailed you once a day with a simple message `Hey, how did your day go?` and you just replied to the email with your thoughts or deeds or worries for the day. The daily email also included a random previous response of yours as inspiration or memory-induction.

I miss them all, and pine for their Frankensteinian-Lazarian-Wayback-Machinian resusitation. That's why I decided to revive one, and make it even weirder. But first, let's make a .plan!

## John Carmark's .plan files and the Finger protocol

I've got DOOM on the mind these days. I'm halfway through John Romero's recent autobiography [Doom Guy: Life in First Person](https://amzn.to/3ZAEoO9) - and I consider [Masters of Doom](https://amzn.to/380nfUF) an essential reading in any computer history syllabus.

In reading up further about the id crew, I encountered [this excellent blog post about Carmack's daily logs and journals in .plan files](https://garbagecollected.org/2017/10/24/the-carmack-plan/), which were accessible via the Unix [Finger protocol](https://en.wikipedia.org/wiki/Finger_(protocol)) over the Internet.

Here's his entry for February 2, 1996:

```Markdown
*	fix incorrectly updated origin bug
*	added alias backpack and armor
*	fixed weapons sticking into wall
*	changed "connected to server" to "connected to map"
*	fixed console
*	armor skin numbers
*	fixed "not shooting" bug
*	changed sound back to origin based instead of entity based

+ swimming directions
+ quit scores are wrong
+ screen flicker crap
+ radius damage sight check
+ crushing issues
+ bodies stopping in midair 

dimmed out weapons
follow killer
spin head inside gib
```

Don't we all wish our daily work logs had entries that looked like this (e.g. "crushing issues", "follow killer"). The blog post notes that Carmack uses a clear syntax for his updates (`*` indicating work completed, `+` completed on a later day, and so on).

There are many reasons this is such a great little journaling tool. First, it is simple - make your journal easy to update or else you won't remember to do it. Second (and this is pointed out by the great blog post) is its "greppability" -  plaintext files means it is easy to use `grep` and other Unix tools to search and filter notes. Finally for me is its "social availability" - id Software fans could use the Finger protocol to check in on Carmark and id's progress on upcoming games.

## The Finger protocol

Here's how you might (ugh) Finger someone back in the day:

```bash
finger username@ip-address
```

What if I just type `finger` into my modern Mac?

```bash
charlie ~ $ finger
Login    Name                 TTY  Idle  Login  Time   Office  Phone
charlie  Charlie Harrington  *con   10d  Sep 20 16:56
charlie  Charlie Harrington   s00    3d  Sep 25 09:43
charlie  Charlie Harrington   s00        Sun    12:20
charlie  Charlie Harrington   s00    20  Sun    12:00
```

Kinda shocked that it's available - and running. Okay, let's try to reference my username.

```bash
charlie ~ $ finger charlie
Login: charlie        			Name: Charlie Harrington
Directory: /Users/charlie           	Shell: /bin/bash
On since Wed Sep 20 16:56 (PDT) on console, idle 10 days 19:25 (messages off)
On since Mon Sep 25 09:43 (PDT) on ttys000, idle 3 days 2:21
On since Sun Oct  1 12:20 (PDT) on ttys001
On since Sat Sep 30 14:00 (PDT) on ttys002 (messages off)
On since Sun Oct  1 12:00 (PDT) on ttys003, idle 0:21
No Mail.
No Plan.
```

"No Mail"? Good. "No Plan". I don't like the sound of that. Let's fix that. The Finger protocol expects that you'll have a `.plan` file in your home directory, which I don't, so let's make one and add my current plan.

```
charlie ~ $ echo "* writing blog post about .plan files!" > .plan
```

Okay, time to finger me again (sorry).

```bash
charlie ~ $ finger charlie
Login: charlie        			Name: Charlie Harrington
Directory: /Users/charlie           	Shell: /bin/bash
On since Wed Sep 20 16:56 (PDT) on console, idle 10 days 19:29 (messages off)
On since Mon Sep 25 09:43 (PDT) on ttys000, idle 3 days 2:25
On since Sun Oct  1 12:20 (PDT) on ttys001
On since Sat Sep 30 14:00 (PDT) on ttys002 (messages off)
On since Sun Oct  1 12:00 (PDT) on ttys003, idle 0:25
No Mail.
Plan: * writing blog post about .plan files!
```

Cool!

Now, why aren't we using the finger protocol all the time? Well, couple reasons from what I've gleaned:

* **No encryption**: the Finger protocol uses plaintext - so everyone with WireGuard on the Starbucks wifi can see your .plan and other "finger" information (which I'm guessing would include phone numbers and other potentially sensitive stuff)
* **No access** Folks don't really know each other's IP addresses and we also don't really make these directly publicly accessible to the Internet anyway, and I've also read that many networks will block port 79 (which Finger uses)
* **No likes**: We just like our social network karma, okay? Nothing wrong with that.

## Back to Frankenstein's laboratory

Well, what if I combine what I love about OhLife (simple daily email journal) with Carmack's Finger .plan files (simple project status updates) with something that's secure, accessible, "likeable", and also "open and hackable?"

It's time introduce the next protocol in this blog post: the Farcaster protocol.

## The Farcaster protocol

[Farcaster](https://farcaster.xyz) is a "sufficiently decentralized" social networking protocol, which I interpret as a protocol not owned by a company that offers relatively open access to the social networking data. I've been using Farcaster for almost two years now as a Twitter-like social network using the popular [Warpcast client](https://warpcast.com). 

Now, it's worth noting that there's a connection to Ethereum as a mechanism for registering your username in Farcaster, but that's really it as far as crypto goes (if that's what you want). You don't need to be a "crypto" person to use Farcaster and enjoy it - I'm not, and I'm having a bunch of fun with Farcaster - mostly because Farcaster is set up EXTREMELY well for generalized "hacking."

The Farcaster protocol has emphasized making it extremely easy for anyone to connect to and grab the state of the network (all the messages and user info) and do whatever they want with it, which could be building [analytics dashboards](https://farcaster.network/), creating [read-write Twitter-like clients](https://www.discove.xyz/), offering a [search](https://searchcaster.xyz) and [keyword alerting service](https://alertcaster.xyz/), even making this adorably weird and cute blob-workout app [Blobs](https://blobs.lol/) ("steps-powered Tamagotchis"). There's no API key that you need to request to make stuff with Farcaster.

In the last two years, I've built things like [SQLCaster](https://sqlcaster.xyz) (using [ROAPI](https://github.com/roapi/roapi) to create an instant read-only SQL API against a CSV of a bunch of old Farcaster casts) and [Top Podcasts Among Farcasters](https://whatrocks.github.io/podcasts/) (an aggregation and ranking of podcasts among shared OPML files from Farcaster users).

I think Farcaster will be perfect for my OhLife-Plan Frankenstein, but we're going to have to constrain it a lil' bit.

## ⌆ The "fling" pattern

Fling is my idea for how we can use Farcaster to power a "daily notes" app. Recall (not sure if I mentioned it, but recall anyway) that Farcaster calls messages/posts as "casts". Here's the basic constraints for fling (which I [wrote up in a gist](https://gist.github.com/whatrocks/b4b7c306b307c3c707f0d6256fe9afb0)):

* Each day, you may cast at most one cast that begins with "⌆" character. This is your "root" fling cast for the day. (You can, of course, cast as many other unrelated casts as you desire). This singular cast should contain your daily log / message / thoughts / reminders.
* If you'd like to add more to your day's log, you should reply to the day's root fling cast. Keep these replies as siblings to each other (aka direct children of the root cast), rather than a thread.

That's it! You don't need a special client to use the Fling pattern. Just follow these rules.

What's cool about these rules is that you can now filter through the messages on Farcaster to find your daily notes (aka .plan files) and render them. I even made a [sample static website that does just that](https://whatrocks.github.io/fling-web/?username=whatrocks)

![Fling Web](/img/fling/fling-web.png)

Plus - people can "like" your notes! And reply to them! Engagement, woo!

If you wanna fling - I also released a [demo CLI tool on NPM](https://www.npmjs.com/package/fling-cli) to fling your daily notes that works somewhat like adding commit messages in git:

```bash
$ fling -m "* finished excellent blog post about .plan files"
```

But wait - what about the OhLife email thing? Good point. Next up, I've gotta introduce a little place called [Val.town](https://val.town).

## val.town

> "What if GitHub Gists could run and AWS Lambda was fun?"

Need I go on? This is the motto / mantra of [val.town](https://val.town) - a dev tools startup that makes it really fun and easy to create these little runnable Javascript snippets. They've added all sorts of great stuff, like `console.email` and `console.sms` - which do EXACTLY what you'd hope and expect. I really love this website and I'm spreading the word! We recently [interviewed Steve Krouse the founder on the CS Primer Show](https://www.youtube.com/watch?v=ZmRJ6PgVOdM) and we spent an hour talking about what makes programming fun - because, guess what, it is super fun!

Anyway. Let's use val.town to make it all happen.

## Putting it all together

I drew this in Excalidraw - maybe it will help (did I pass the interview?).

![Fling Architecture](/img/fling/whiteboard.png)

Most of this diagram is showing my mental model for how Farcaster works. Let's focus on the blue shaded boxes. There are two val.town vals (that's what they call their widgets) that we need to create:

* daily email sender
* email replier

The "Daily Email Sender" will use a popular Farcaster search tool to search through Farcaster for a random previous "fling" cast I sent, and then `console.email` it to me. We will also configure this val to set a "reply val" to receive (and execute) from any replies.

To grab any "flings", you can use Searchcaster's API:
```javascript
const flings = await fetch(
    `https://searchcaster.xyz/api/search?regex=%E2%8C%86&username=${FARCASTER_USERNAME}`,
  ).then((res) => res.json());
let filteredCasts = flings.casts.filter((cast) =>
    cast.body.data.text[0] === "⌆"
);
```

Remember our constraint - that the first character of a Fling root cast must be `⌆`. 

We can do a lil' more processing of the casts, but the next major thing we have to do is send ourselves a nice HTML email and set the replyTo to the name of the "val" that I want to execute:

```javascript
console.email({
    replyTo: "whatrocks.<name_of_my_reply_val>@valtown.email",
    html: `
  <div>
    <p>Just reply to this email with your entry.</p>
    <p>Oh snap, remember this? ${diff_days} days ago you wrote...
    <pre>${flingContents}</pre>
    <p><a href="https://whatrocks.github.io/fling-web/?username=whatrocks" target="_blank">Past flings</a></p>
  </div>`,
    subject: `It's ${today.toDateString()} - How did your day go?`,
  });
```

My "replyTo" val has code that looks like this:

```javascript
const email_text = e.text.slice(0, e.text.indexOf("\r\n\r\n"));
const fling_cast = `⌆\n${email_text}`;
const did_cast = @me.otherValThatActuallySendsCast(e.from, fling_cast);
```

Before it does any of that, it also checks to see if the "sender" of the email matches the email I'm expecting to see (there's no great way to add a password / auth to this process right now). 

I'll call yet another Val which actually posts a Farcaster "cast":

```javascript
const { MerkleAPIClient } = await import(
    "npm:@standard-crypto/farcaster-js"
);
const { Wallet } = await import("npm:ethers@^5.7.1");
const mnemonic = @me.secrets.mnemonic;
const wallet = Wallet.fromMnemonic(mnemonic);
const apiClient = new MerkleAPIClient(wallet);
await apiClient.publishCast(cast);
```

That's how easy it is to send a cast with Farcaster!

Does it work? Did it work?

![Daily Email](/img/fling/daily-email.png)

![Reply](/img/fling/reply.png)

![cast](/img/fling/cast.png)

Would ya look at that?! I got 6 likes!