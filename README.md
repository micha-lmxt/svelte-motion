# Svelte Motion

An animation library based on [framer-motion](https://www.framer.com/motion/). 

## Installation

```bash
npm install --save-dev svelte-motion
```

if you run into build issues with Rollup like 'process is undefined', you need to add [rollup-plugin-inject-process-env](https://github.com/badcafe/rollup-plugin-inject-process-env#readme) or a similar plugin.

## Usage

Corresponding to a `motion.div` in framer-motion is this:

```javascript
import { Motion } from 'svelte-motion'

<Motion let:motion><div use:motion/></Motion>
```
For svg elements like 'g', 'path' or 'circle', use:

```javascript
<Motion let:motion isSVG><g use:motion/></Motion>
```

