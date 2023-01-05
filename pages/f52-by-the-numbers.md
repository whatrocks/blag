---
date: "2023-01-02"
title: "F52 By the Numbers"
category: "writing"
description: "Stats from my Fahrenheit 52 short story writing project in 2022"
image: "short-stories/wrapped.png"
---

In the spirit of [Brick Experiment Channel's wonderful post](https://brickexperimentchannel.wordpress.com/2022/11/19/my-youtube-earnings/) about their YouTube channel's earnings, I thought I'd share some stats about last year's short story writing project [Fahrenheit 52](https://f52.charlieharrington.com).

Spoiler alert: the night is always darkest just before the dawn.

With it being the new year and all, I feel it's best to classify these stats with the calm neutrality of a Stoic, into *Things I Can Control* and *Things I Cannot Control*.

## Things I Can Control

### Stories

52! And I hit the weekly deadline for every single one, which I'd confirm wasn't easy at times, like during our honeymoon (I had to basically pre-write that one).

### Words:

59,913. [NaNoWriMo](https://nanowrimo.org) says a novel is 50k words, so I wrote a book this year. That's cool.

For future Charlie's edification, here's how I grabbed that stat:

```bash
# make a temp folder
mkdir scratchpad
cd scratchpad
# copy the stories into the temp folder
cp ../fahrenheit-52/pages/stories/*.md .
# remove frontmatter from each story
sed -i '' -n '16,$p' *.md
# count words for all files
cat * | wc -w
```

I'm also curious about *average words per story*. Since there are technically 53 stories in the project (I preloaded a zeroth story to make myself feel good in the beginning), we can just divide 59,913 by 52, which gives us **1109.5 average words per story**. Now, my writer heroes like Stephen King and Delilah Dawson probably outputting 1k+ words *per day* rather than *per week*, but, hey, it's a start!

### Data Mining

Now that we have a corpus of text, there's a bunch of fun data mining things we can do, like word clouds and Markov chains. In fact, I already wrote a story about just that this year, so I'll link over to that story rather than recreate the fun here: [Writer's Blockchain](https://f52.charlieharrington.com/stories/writers-blockchain/)

### Minutes of Audio



insert Screenshot of Logic

## Things I Cannot Control

### Page Views

It's probably for the best that 

### Spotify Subscribers

foo

### Apple Podcasts Subscribers

foo

### Top Hacker News Submissions

foo