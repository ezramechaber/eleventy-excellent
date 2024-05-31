---
title: CSS
---

Add and delete your custom block stylesheets in `src/assets/css/blocks/*.css`, they get pulled in your output stylesheet automatically.

The methodology used is [CUBE CSS.](https://cube.fyi/)

The CSS system of this starter was invented by Andy Bell. If you want to know exactly how it all works, and have a look at the (further elaborated) original, [read this article on piccalil.li](https://piccalil.li/blog/a-css-project-boilerplate/).

**New in version 3.0**

The main CSS file is now inline in production: `.src/_includes/head/css-inline.njk` to improve performance.

You can add per-page or compnent bundles of CSS. Instead of adding your CSS file to the `src/assets/css/blocks/` directory, you can add it to the `src/assets/css/opt-in/`. The CSS will be bundled and minified like `global.css`, and stored alongside in `.src/_includes/css/`. You can include it in the "inline" bundle only on pages where you need it:


{% raw %}

```jinja2
{% css "inline" %}
  {% include "css/your-stylesheet.css" %}
{% endcss %}
```

{% endraw %}