---
title: "Batch Google Alert Creation Script"
date: 2025-01-24
description: "A quick script for creating multiple Google Alerts at once."
tags:
  - posts
  - automation
---

A friend asked me recently for some help with a problem: If your job is to track hundreds of things and what the internet is saying about them, and you don't want to pay for a full-on media monitoring tool... it's really really annoying to set up Google Alerts.

Google Alerts are a great way to get emails every time someone or something you care about does something on the internet.

But the process right now is super manual. Go the page. Enter text. Wait for it to load. Hit enter. Do it again. No batch, no upload, and no API.

Seems like a job for a Console script.

If it's helpful for you, that's great! Would love a follow on [Threads](https://threads.net/@ezra)/[Bluesky](https://bsky.app/profile/ezra.im), or you can just [drop me a line](mailto:contact@ezramechaber.com) to tell me this was helpful.

![Google Alerts window](/assets/images/blog/google-alerts.jpg)

## The Script

I won't waste your time. Here's the thing. Use at your own risk, etc. etc. 

If you've never run code from the console before, you'll need to run a pre-approval step that's designed to keep you from doing thigns like this on accident:
1. Open Chrome Dev Tools by right clicking and hitting "Inspect Element" or use the menu bar
2. Click the "Console tab"
3. You'll see a flurry of error messages, logs, and other weird text - ignore these
4. Type "allow pasting"

Now you're ready:
1. Go to [https://www.google.com/alerts](google.com/alerts)
2. Open up DevTools again
3. Paste in the script, hit enter
4. Enter your long list with commas separating each name/item

```
// Load jQuery if it's not already loaded
if (typeof jQuery === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.head.appendChild(script);
}

// Wait for jQuery to load, then execute the sequence
function waitForJQuery(callback) {
    if (typeof jQuery !== 'undefined') {
        callback();
    } else {
        setTimeout(function() { waitForJQuery(callback); }, 100);
    }
}

async function createAlert(keyword) {
    return new Promise((resolve) => {
        new Promise((resolveStep) => {
            // Step 1: Make query div visible
            const queryDiv = document.querySelector('#query_div');
            queryDiv.style.display = 'block';
            setTimeout(resolveStep, 1000);
        })
        .then(() => new Promise((resolveStep) => {
            // Step 2: Focus and click the input
            const input = document.querySelector('#query_div input');
            input.focus();
            input.click();
            setTimeout(resolveStep, 1000);
        }))
        .then(() => new Promise((resolveStep) => {
            // Step 3: Set the value and trigger necessary events
            const input = document.querySelector('#query_div input');
            input.value = keyword;
            // Trigger input event
            input.dispatchEvent(new Event('input', { bubbles: true }));
            // Trigger change event
            input.dispatchEvent(new Event('change', { bubbles: true }));
            // Trigger keyup event with enter key
            const keyupEvent = new KeyboardEvent('keyup', {
                bubbles: true,
                key: 'Enter',
                keyCode: 13
            });
            input.dispatchEvent(keyupEvent);
            setTimeout(resolveStep, 1000);
        }))
        .then(() => new Promise((resolveStep) => {
            // Step 4: Show alert buttons if not already visible
            const alertButtons = document.querySelector('.alert_buttons');
            if (alertButtons.style.display === 'none') {
                alertButtons.style.display = '';
            }
            setTimeout(resolveStep, 1000);
        }))
        .then(() => new Promise((resolveStep) => {
            // Step 5: Click create alert button with full event sequence
            const createButton = document.querySelector('#create_alert');
            
            // First focus the button
            createButton.focus();
            
            // Simulate mousedown
            createButton.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window,
                buttons: 1
            }));
            
            // Simulate mouseup
            createButton.dispatchEvent(new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window,
                buttons: 0
            }));
            
            // Finally trigger click
            createButton.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                buttons: 0
            }));
            
            setTimeout(resolveStep, 2000);
        }))
        .then(() => {
            // Check if the alert was created by looking for it in the alerts list
            setTimeout(() => {
                const alerts = document.querySelectorAll('.alert_instance .query_div span');
                const found = Array.from(alerts).some(alert => alert.textContent.trim() === keyword);
                if (found) {
                    console.log('Alert created for:', keyword);
                    resolve('posted');
                } else {
                    console.log('Error creating alert for:', keyword);
                    resolve('error');
                }
            }, 1000);
        })
        .catch((error) => {
            console.error('Error in sequence:', error);
            resolve('error');
        });
    });
}

waitForJQuery(async function() {
    // Prompt for keywords
    const keywordInput = prompt("Enter keywords separated by commas (e.g., 'John Smith, Jane Doe, Bob Jones'):");
    if (!keywordInput) {
        console.log('No keywords entered. Exiting...');
        return;
    }

    // Split into array and trim whitespace
    const keywords = keywordInput.split(',').map(k => k.trim()).filter(k => k);
    console.log('Creating alerts for:', keywords);

    // Process each keyword in sequence
    for (const keyword of keywords) {
        console.log('Processing:', keyword);
        await createAlert(keyword);
        // Add extra delay between keywords
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('Finished processing all keywords');
});
```

## How I did it

There's surely plenty of waste in this code. I had a much simpler thing going, but Google doesn't respect basic `.click` actions and things like the "Create" button are hidden by default.

I went down a rabbit hole for a while where I created a little JQuery recorder extension to understand what I was doing in the DOM (what a waste - none of the DOM actions actually reflected what was changing with listeners, etc.). That didn't work.

So then I used the event recorder inside of DevTools to see if that helped. Claude thought the thing I wanted to do here was use Puppeteer to exactly match the X and Y coordinates of my browser, but that wouldn't be repeatable.

SO THEN I got really mad and walked away for a while.

In the end, after poking at the various listeners, asking for multiple approaches, and giving Claude the entire `view-source` of the page... we arrived on trying not just "click" but "mouse down, mouse up, click". Bingo.