# Svelte Motion

An animation library based on [framer-motion](https://www.framer.com/motion/). 

## Installation

```bash
npm install --save-dev svelte-motion
```

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

