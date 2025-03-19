---
title: "Should We OCR All Bluesky Images?"
date: 2025-03-19
description: "69% of Bluesky images contain text. Nice."
tags:
  - posts
  - ai
  - bluesky
---

I love alt text. I hate writing alt text.

Alt text is a fairly core accessiblity principle - sometimes you have a reader that can’t see, or can’t see well. Sometimes users are on a low bandwidth connection and the image won’t load. And sometimes you broke your codebase and images won’t render for some fault of yours,  and you want to still provide users some value.

But again: Writing alt text is an extra step, especially for posting on social networks.

I think about this any time I upload an image, especially when it’s a screenshot, to [Bluesky—a place where I spend some time](https://bsky.app/profile/ezra.im). I think about it literally every time I try to _read_ a screenshot on Bluesky. And these days, about half of what I find on Bluesky is screenshots of court filings, econ memes, etc.

Right now alt text on Bluesky happens solely with the generosity or responsbility of the poster.

<img src="/assets/images/blog/bsky-alt-text-flow.png" alt="The current alt-text flow for Bluesky" style="max-width: 100%; height: auto; object-fit: contain;" />

## How could we make alt text on Bluesky better?
LLMs could do a great job, but they’re not cheap. Bluesky could foot the bill (not scalable!), find someone to foot the bill (okay, that’d be nice), or help you run it locally/connect an API key (that’s definitely not happening at scale).

But maybe there’s another way: OCR has gotten quite good, and can run locally. That only works if most posts have text in them.

Lightbulb! Research idea! Unlike X (nee Twitter) where you have to spend a few hundred dollars to meaningfully access the API, we can just do this analysis for free.

## What percentage of Bluesky images contain text?

### The script
I ~~wrote~~ vibe-coded a python script to pull the most recent 100 posts that contained an image, and asked Claude to categorize them. 

The second half of that was probably a waste of money - I probably could have just used a text recognition library instead. But it did do some fun categorization!

Claude 3.7 did a decent job, but it struggled with the endpoints. I finally wound up writing a *different* script to pull the API output for a post I *knew* had an image and fed that back into the prompt.

[You can find the script here if you’re curious](https://gist.github.com/ezramechaber/bbbf0089554feb953dbf663a06bb7004).

A more general note on the Bluesky API docs: I tried to read both Bluesky’s *and* ATProto’s documentation. As someone who reads a decent amount of API documentation I found both to be *extremely* frustrating in terms of “give me a post and tell me what the JSON looks like.” Maybe this makes more sense for developers who work with it more frequently.

### The results
In my first sample of 10 posts, 9 out of 10 images were text-based. I hand-checked all of them, and I’d say 7 or 8 of those posts would have benefited from an OCR-based alt text.

```
 "total_images": 10,
  "images_with_text": 9,
  "text_percentage": 90.0,
  "image_types": {
    "screenshot": 0,
    "meme": 4,
    "document": 1,
    "social_media_post": 1,
    "other": 3,
    "unknown": 0
```

Then I expanded it to the most recent 100 posts that had images. It found 137 images (since you can post more than one image to each post). Of which, 69% of images contained text. Nice.

```
Total images analyzed: 137
Images containing text: 95
Percentage of images with text: 69.34%

Breakdown by image type:
  screenshot: 22 (23.16% of text images)
  meme: 20 (21.05% of text images)
  document: 6 (6.32% of text images)
  social_media_post: 8 (8.42% of text images)
  other: 39 (41.05% of text images)
```

## The solve for users
So I think there’s a pretty good argument to be made here that an in-browser/on-device OCR library could do some good with auto-suggesting alt-text. 

A few different ideas for app/web implementation:
* Put a little magic wand icon that kicks off the process
* Run the OCR automatically and put the text, greyed out, in the alt text form field.
* Even better - turn on a default setting for users where, if they don’t type alt-text and the app detects text, the OCR output is included automatically in the post.

OCR for post images seems like it would make Bluesky a bit more accessible and a bit more pleasant. 

So if you’re listening Jay/Paul/etc… something to think about.