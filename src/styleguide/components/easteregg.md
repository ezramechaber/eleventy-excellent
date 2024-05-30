---
title: Easteregg
---

The `custom-easteregg` component is designed to trigger a confetti effect when a user types a specific keyword sequence. It uses the dynamic import of the `canvas-confetti` library to render custom-shaped particles based on user input.

**Defaults**:
  - **Keywords**: `"eleventy"`, `"excellent"` (default keywords can trigger effects).
  - **Shape**: `"⭐️"` (default shape for particles unless overridden).
  - **Particle Count**: `30` (default number of particles unless specified).

**Customizable Attributes**:
  - `keyword`: Add a custom keyword to activate the effect.
  - `shape`: Define a custom shape for the confetti particles using emojis or text.
  - `particle-count`: Set the number of particles to release during the effect.


```
<script type="module" src="/assets/scripts/components/custom-easteregg.js"></script>
<custom-easteregg keyword="yay" shape="🌈" particle-count="50"></custom-easteregg>
```

