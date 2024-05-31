---
title: Gallery
usage: '{% include "partials/gallery.njk" %}'
---


Clicking a button linked to an image opens its dialog. A close button within each dialog allows the image to be hidden again.
Includes `gallery.css` for styling the modal dialogs and backdrop.
`gallery.js` manages modal dialog interactions.

**Usage**

```
{{ usage | safe }}
```

**Example**

Blog: [Post with a gallery](/blog/post-with-a-gallery/)