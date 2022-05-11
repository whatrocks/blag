---
date: "2022-05-10"
title: "Surfing the Gopherspace"
category: "computers"
description: "gopherspace gopher gopherspace pygopherd protocol www http internet"
image: "gopher/caddyshack.jpg"
---

A [recent Daring Fireball post](https://daringfireball.net/linked/2022/05/06/stevenf-gopher-playdate) about the (super cool) [Playdate](https://play.date) handheld gaming system mentioned Gopher, which I'd never heard of before! Here's the referenced tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">When Playdate shipped, Panic co-founder Steven wrote a little about what it meant to him. And in the spirit of doing things differently, posted it to a Gopher (!) site.<br><br>If you&#39;re up for it, find it here:  gopher://stevenf.com:70/0/journal/2022/04/18/first-playdates-shipping.txt</p>&mdash; Playdate (@playdate) <a href="https://twitter.com/playdate/status/1520144706511904768?ref_src=twsrc%5Etfw">April 29, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Gruber mentions he used `curl` to read the Gopher site, which you can try yourself:

```bash
curl gopher://stevenf.com:70/0/journal/2022/04/18/first-playdates-shipping.txt
```

You should see the full text of the Playdate post as a response. Intriguing, right? Where's the `https://` part of the url? What's this gopher thing all about?

![Caddyshack](/img/gopher/caddyshack.jpg)

It's time to learn something weird about the Internet again.

## Protocols

You've probably heard of protocols before. Maybe you're even an expert in human-cyborg relations. Hopefully, this explainer sits well with all parties:

> Protocols are a formalized series of interactions to transmit information between two or more parties.

That's my own homespun definition - so I'll happily accept edits or suggestions (an RFC, if you will). A potentially helpful analogy for protocols that I've seen is a [Japanese tea ceremony](https://en.wikipedia.org/wiki/Japanese_tea_ceremony) - a bunch of formal procedures to govern a specific shared experience.

Your favorite network - the Internet - has its own set of protocols that orchestrate its communication, with foundational ones like TCP/IP, as well as ones for things like email, file sharing, and hypertext - aka HTTP - aka the World Wide Web, the protocol that pretty much powers all your apps and sites and whatnots that you like so much.

But the Web -- and its Hypertext Transfer Protocol -- wasn't always top dog for sharing text on the Internet. There were rivals. Competitors. *Gophers.*

I'm no historian (despite being a history major -- how exactly does that work, anyway?), my folk-understanding-slash-Wikipedia-reading tells me this: while Tim Berners-Lee was inventing HTTP and the Web on a NeXT cube inside of a particle accelerator, a bunch of University of Michigan (go Golden Gophers!) students and their professor were working on something they, of course, called the Gopher protocol.

Their RFC ([RFC 1436](https://datatracker.ietf.org/doc/html/rfc1436)) is worth a skim. Gopher is a plaintext protocol well-suited for sharing text documents in a file system-like hierarchy - a `distributed document delivery system`, in their own words. 

When you interact with a Gopher server, you'll typically first receive an odd-looking "ls"-style directory listing of contents, where the first character of each line tells you what type of item it is (e.g. `0` means file, `1` directory, `9` binary file, `8` is a telnet session, `g` is a gif image, and so on - [read them all here](https://datatracker.ietf.org/doc/html/rfc1436#section-3.8)).

Here's the example from their RFC:

```
 0About internet GopherFStuff:About usFrawBits.micro.umn.eduF70
 1Around University of MinnesotaFZ,5692,AUMFunderdog.micro.umn.eduF70
 1Microcomputer News & PricesFPrices/Fpserver.bookstore.umn.eduF70
 1Courses, Schedules, CalendarsFFevents.ais.umn.eduF9120
 1Student-Staff DirectoriesFFuinfo.ais.umn.eduF70
 1Departmental PublicationsFStuff:DP:FrawBits.micro.umn.eduF70
```

Looks like something out of *War Games*, which makes me like this protocol very much, Dr. Falken. How about a nice game of chess?

As you may have guessed, Gopher did not win the war with HTTP. Wikipedia gives us a few supporting statements for this conclusion that I'd like to jam into my 5 paragraph essay.
1. U of Minn tried to charge for their Gopher server implementation for a while, before finally open sourcing it (1993 until 2000)
2. The [Mosaic web browser](https://en.wikipedia.org/wiki/Mosaic_(web_browser)) could act as a Gopher client -- in addition to its main purpose of being a web browser
3. Gopher is just more rigid than freewheelin' HTML

Also, there's probably more reasons, including that it's not supes secure, being a plaintext protocol and all.

So, yeah, we're not surfing Gopherspace right now. But we can be! There are still devotees to Gopherdom, maintaining [phlogs](https://en.wikipedia.org/wiki/Phlog) (which is a blog aka weblog, but taking the ph from "gopher" instead of the "bl" from "webblog", ugh, enough).

Anyway... let's set up a Gopherhole!

## Running a gopherhole on Replit

I'll assume you're familar with [Replit](https://replit.com) (I've written about [my affinity for Replit before](/computers-by-the-decade)) - but, if you're not, it's a service that lets you easily spin up little environments for running code, servers, etc. I run my [ROAPI Google Sheet to SQL book library](/sql-powered-reading-list) on a Replit repl, for example. More importantly, Replit seems to be an increasingly great place for folks learning how to code and sharing tutorials, so I'm always keen to use it and contribute to the "learning to code" community.

Back to business. Some Googling reveals that the [pygopherd](https://github.com/jgoerzen/pygopherd) project seems like a nice, credible, easy way to get a Gopher server up and running. But spelunking the Github issues tells us that this project is another victim of the Python2/3 migration. Luckily, there's a relatively recent [Python3 fork](https://github.com/michael-lazar/pygopherd) we can try!

So, create a new Python repl and `pip install pygopherd`. Because we're using Replit and not our own fully controlled machine, we're going to have to do some fiddly stuff with the library's config to get this working. I copy/pasted the pygopherd's config file and mime.types file from the repo into my repl's root directory. I did have to comment out a bunch of the default config settings - it's probably easier for you to just fork my repl, rather than go through everything here. Click "Show files" and view the "config.conf" file.

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@whatrocks/gopherhole?embed=true"></iframe>

The actual interesting bit worth chatting about is the "gopher" folder. You can call this folder anything you want (just adjust that line in the config file), but this is where your phlog or gopherhole lives! Every folder will need a "gophermap" plaintext file to share its contents. Here's my directory structure:

```
gopher/
   gophermap
   stories/
       christmas-at-grants-tomb.txt
       plastic-man-on-the-moon.txt
       gophermap
```

And here's my top-level gophermap:

```
Welcome to my gopherhole - this is weird, right?!

nav:
1Fahrenheit52	./stories
```

My gopherhole lets you click into a "stories" folder and then click into two of my short stories from my [Fahrenheit 52 weekly writing project](https://f52.charlieharrington.com).

Here's the gophermap for the `stories` folder:

```
0Plastic Man on the Moon	./plastic-man-on-the-moon.txt
0Christmastime at Grant's Tomb	./christmastime-at-grants-tomb.txt
```

Note the `0` as the first character on the lines for text files and the `1` for the directories, as specified by the RFC. Double note - you literally a literal "tab" character between the file name and its location. I had to open up TextEdit, hit tab, and then copy/paste it into Replit to make this work.

Now, with your files in place, and your config adjusted (like I said, just use mine), you can start your Gopher server:

```bash
pygopherd /home/runner/{YOUR_REPL_NAME_HERE}/config.conf
```

You should see this Gopherspace pop up in the Replit browser window! Here's mine, in our third iframe of the blog post thus far:

<iframe frameborder="0" width="100%" height="500px" src="https://gopherhole.whatrocks.repl.co"></iframe>


Very cool! Go ahead, click stuff. You can navigate to and read [my story about an action figure on the Moon](https://f52.charlieharrington.com/stories/plastic-man-on-the-moon/).

However, it looks like we're just interacting with a Web interface rather than accessing my gopherspace via the actual gopher protocol. That's no good. It does give a link to "view with gopher", but this doesn't work, even when you try it with curl. I suspect there's something blocking this on the Replit side - I've tried adjusting the ports many times, but haven't been able to figure this out. Any Replit folks out there who might have an idea, let me know.

Still, this is decent progress. Words of affirmation. But I really do want to view my stuff through Gopher itself. Let's try it out on our own home server.

## Running a Gopherhole on a Raspberry Pi on your Tailscale network

I've got one of those cute Raspberry Pi keyboard computers at home, because its the perfect machine, connected via [Tailscale](https://tailscale.com) (another one of my favorite services/companies/tools in the world).

We can do a fairly identical setup to Replit to get this working. Create a new project folder on your Raspberry Pi, spin up a virtualenv, pip install the `pygopherd` package, add the same files from the Repl and you're basically done! There's a few slight changes to the config file (again, these changes are mainly just commenting out a few lines and adjusting the filesystem location of a few files, like the config). I posted my [setup to Github](https://github.com/whatrocks/gopherhole) if you want to follow along on your own machine. 

After we start up pygopherd again (same command as before, with Replit - just provide the location of your config file), we can try curling our gopherspace:

```bash
curl gopher://charliesraspberrypi:4444/1/

iWelcome to my gopherhole - this is weird, right?!	fake	(NULL)	0
i	fake	(NULL)	0
inav:	fake	(NULL)	0
1Fahrenheit52	/./stories	pit	4444	+
```

Woot! We're finally gophering over here. I'm not sure what these "fake" and "NULL"s are all about. Something for later. You may also note that the port is `4444` which I arbitrarily picked (this is another thing you'll want to adjust in your config file), and the host name will be the IP of your Raspberry Pi.

Let's try to fetch one of our stories next.

```
curl gopher://charliesraspberrypi:4444/1/stories/plastic-man-on-the-moon.txt
```

It works again! Now, we're not exposing our Tailnet to the Internet, so this will only work when I'm on the VPN, but hey -- I've got a gopherspace now, and you can, too.

## The future of gopher

I wouldn't go betting the family farm on this protocol, but if you're into computer history like me, this can be a fun thing to poke around with. There are others like us out there. Actually, I learned that, for a while, you could [run a Gopherhole directly in Redis](http://antirez.com/news/127)! 

As for me and my gopher future, I'd like to keep dabbling. Maybe write my own terminal client? Maybe set up an actual gopher server on a cloud provider to mirror my blog?

The possibilities here are... limited.
