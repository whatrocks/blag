---
date: "2023-01-05"
title: "F52 By the Numbers"
category: "writing"
description: "Stats from my Fahrenheit 52 short story writing project in 2022"
image: "f52-by-the-numbers/logic.png"
---

In the spirit of [Brick Experiment Channel's post](https://brickexperimentchannel.wordpress.com/2022/11/19/my-youtube-earnings/) about their YouTube channel's earnings, I thought I'd share some stats about last year's short story writing project [Fahrenheit 52](https://f52.charlieharrington.com).

With it being the New Year and all, I thought I'd channel my inner Stoic and classify these stats into *Those Things I Can Control* and *Those Things I Cannot Control*.

## Those Things I Can Control

### Stories

52! And I managed to hit the weekly deadline for every single one, which wasn't always easy, like during our honeymoon (I had to basically pre-write that one).

### Words

59,913.

[NaNoWriMo](https://nanowrimo.org) says a novel is 50k words, so I wrote a book this past year. That's cool. Maybe I should self-publish it!

For future Charlie's edification, here's how I grabbed that stat:

```bash
# make a tmp folder
mkdir tmp
cd tmp
# copy the stories into the tmp folder
cp ../fahrenheit-52/pages/stories/*.md .
# remove frontmatter from each story
sed -i '' -n '16,$p' *.md
# count words for all files in this directory
cat * | wc -w
```

I'm also curious about *average words per story*. Since there are technically 53 stories in the project (I preloaded a zeroth story to make myself feel good in the beginning), we can just divide 59,913 by 53, which gives us **1,130 average words per story**. Now, my writer heroes like Stephen King and Delilah Dawson are probably outputting 1k+ words *per day* rather than *per week*, but, hey, it's a start!

### Most Common Word

Now that we have a corpus of text, there's a bunch of fun data mining things we can do, like word clouds and Markov chains. In fact, I already wrote a story about just that this year, so I'll link over to that story rather than recreate the fun here: [Writer's Blockchain](https://f52.charlieharrington.com/stories/writers-blockchain/).

### Minutes of Audio

As a fun bonus, I read aloud each story and quickly published out as a podcast, which I listed in the iTunes Podcast Directory and the Spotify Podcast thingie. I'll share some (spoiler: disappointing) stats below, but the Spotify Wrapped for Podcasters did share this one:

![minutes of audio](/img/f52-by-the-numbers/minutes.png)

Fairly certain they also missed the last episode/story or two, so I think we can safely call this ~300 minutes of audio. That's (carry the one...), 5 hours of audio! Roadtrip, here we come.

![logic tracks](/img/f52-by-the-numbers/logic.png)

If you're at all intrigued by the F52 podcast, I can also reveal that there are also a few surprise narrators in there, including Carly, my parents, my mother-in-law, my sister, and one more!

Of every good outcome from this project, of which there are many, these recordings of my people reading my stories is by far my favorite treasure. Audio of your loved ones, I cannot recommend it enough. It's better than video. Close your eyes and listen to your people.

## Those Things I Cannot Control

### Page Views

Oof. We weren't doing this for the page views, were we? No! But they would have been nice, right? 

Annoyingly (or perhaps for the best), Cloudflare Web Analytics only retains data for 30 days. Here's a current screenshot:

![web analytics](/img/f52-by-the-numbers/webanalytics.png)

570 visits in last 30 days (with a minor spike from my [Year in Short Stories](/year-of-short-stories) post). Not super great.

BUT -- what you're not seeing are the Hacker News bursts for a few of my stories. I posted my stories when I thought they'd be interesting or relevant to the HN crowd. A few of them did okay, and [Nibbles](https://f52.charlieharrington.com/stories/nibbles/) - a story about cute hungry hungry von Neumann probes) did great. [This post](https://news.ycombinator.com/item?id=33129432) hung around the home page for a few hours and I think I saw ~1-2k visitors that day. There was also [another post](https://news.ycombinator.com/item?id=33906604) that completely destroyed my bad science in [Shimmer](https://f52.charlieharrington.com/stories/shimmer/) - my diamond asteroid mining story -- but in a super constructive positive way, where I learned a ton! All told, I had a very positive experience posting these on HN, and the comments were uplifting and helpful. It can really happen, people.

### RSS subscribers

No idea. I don't have this instrumented, and I'd love any guidance or tips for the future on how to best do this. For F52, I'd wager a guess it's less than 10, even with the recent re-interest in personal blogs and whatnot.

### Spotify Subscribers

Hi, Mom!

![spotify analytics](/img/f52-by-the-numbers/spotify.png)

### Apple Podcasts Subscribers

Also, hi Mom!

![itunes analytics](/img/f52-by-the-numbers/itunes.png)

Clearly all my listeners must use [Overcast](https://overcast.fm), like me!

## Notes for next time

I think I missed an opportunity in not collecting emails for a newsletter on the F52 website - especially during the big HN bursts. Or perhaps I should have just done everything as a Substack instead?

Like the good H2 says, just some notes for next time!