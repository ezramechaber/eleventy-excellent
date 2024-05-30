---
title: Masonry
---

The `custom-masonry` component is designed to function as a masonry grid by dynamically adjusting item positions based on the available column space and the size of its content. The necessary JavaScript (`custom-masonry.js`) is loaded only once per component usage due to the `data-island="once"` attribute.
Optional: pass in `layout="50-50"` to set a 50% width for each column.

```
<custom-masonry> (children) </custom-masonry>
<custom-masonry layout="50-50"> (children) </custom-masonry>
```

<div><custom-masonry>
   <div style="background-color: var(--color-primary); aspect-ratio: 3/2;"></div>
	 	<div></div>
		<div style="background-color: var(--color-tertiary); aspect-ratio: 4/5;"></div>
		<div style="background-color: var(--color-primary);"></div>
		<div></div>
		<div style="background-color: var(--color-secondary); aspect-ratio: 5/4;"></div>
		<div></div>
		<div style="background-color: var(--color-secondary);"></div>
    <div style="background-color: var(--color-primary); aspect-ratio: 16/9;"></div>
	 	<div></div>
</custom-masonry></div>

<style>
  custom-masonry div {
    inline-size: min(30rem, 100%);
		aspect-ratio: 1;
    background-color: var(--color-text);
  }
</style>