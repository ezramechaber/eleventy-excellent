---
title: Favicons
---

The favicons used are based on the recommendations from the [How to Favicon article on evilmartians.com.](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

All favicons are in `src/assets/images/favicon`, and copied over to the root of the output folder.

You can place them there manually, or use the script to autmate the process:

```bash
npm run favicons
```

You have to first define the SVG icon on which all formats are based on in `meta.js`:

```js
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // used for favicon generation
```

Regardless of whether you create the icons automatically or manually, you should keep the file names as they are referenced in several places.
