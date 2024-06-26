---
title: Civic Band
description: A super cool way to open up gov.
date: 2024-06-21
tags:
  - posts
  - tech
---

[Really cool project called CivicBand](https://civic.band/how.html). It uses publicly available APIs to grab PDFs of meeting notes, then OCRs them, then uploads them via Datasette for exploration. Open data!!

>1. We fetch PDFs of civic minutes anywhere we can get easy API access. We don't "scrape" the listing sites, at least not right now.
>2. We break those PDFs up into images of each page of the PDF
>3. We use tesseract to OCR those images into text
>4. We put each page of now-text into a sqlite database
>5. Each site is a datasette instance. We have a generation script that creates the Caddyfile for the whole collection, and the metadata.json for each instance
>6. The whole thing is deployed to one VPS in Oregon.

[via Simon Willison.](https://simonwillison.net/2024/Jun/19/civic-band/)