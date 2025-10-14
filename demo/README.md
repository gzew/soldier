# Soldier Demo

This directory contains colorful demo scripts and GIF recordings for showcasing Soldier.

## Generated GIFs

- **soldier-quick.gif** (152 KB) - Quick demo for README
- **soldier-demo.gif** (377 KB) - Full demo with all features

## Demo Scripts

### showcase.js
The main demo script with colorful output. Shows all Soldier features:
- Deploy command (validation)
- Build command (type conversion)
- Test command (number validation)
- Validate command (error handling)

Run it:
```bash
node demo/showcase.js deploy --env production --port 8080
node demo/showcase.js build --target electron --minify
node demo/showcase.js test --timeout 3000 --coverage
```

### colors.js
Zero-dependency color utility module. Simple ANSI escape codes for terminal colors.

### record-demo.sh
Full demo script that runs through all commands. Used to create soldier-demo.gif.

### quick-demo.sh
Quick demo script for README. Used to create soldier-quick.gif.

## How to Record New Demos

### Prerequisites
```bash
# Install asciinema (terminal recorder)
pip install asciinema

# Install agg (asciicast to GIF converter)
brew install agg
```

### Recording Process

1. **Record terminal session:**
```bash
asciinema rec demo/my-demo.cast -c "./demo/my-script.sh" --overwrite
```

2. **Convert to GIF:**
```bash
agg --idle-time-limit 1 --font-size 16 demo/my-demo.cast demo/my-demo.gif
```

### agg Options

```bash
--idle-time-limit N   # Limit idle time to N seconds (default: 5)
--font-size N         # Font size in pixels (default: 14)
--last-frame-duration N  # How long to show last frame (default: 3)
--fps-cap N           # FPS cap (default: 30)
--cols N              # Override terminal width
```

### Example: Quick Demo
```bash
# Record
asciinema rec demo/quick.cast -c "./demo/quick-demo.sh" --overwrite

# Convert with settings optimized for README
agg --idle-time-limit 0.8 --font-size 16 --last-frame-duration 2 demo/quick.cast demo/quick.gif
```

### Example: Full Demo
```bash
# Record
asciinema rec demo/full.cast -c "./demo/record-demo.sh" --overwrite

# Convert with longer idle time for readability
agg --idle-time-limit 1.5 --font-size 16 demo/full.cast demo/full.gif
```

## Tips for Good Demos

1. **Keep it short** - 10-15 seconds for README, 30-45 seconds for detailed demos
2. **Use colors** - Makes the output more engaging
3. **Add pauses** - Use `sleep` commands to let viewers read
4. **Show errors** - Demonstrate validation catching bad input
5. **Optimize file size** - Lower `--idle-time-limit` for faster playback

## File Sizes

Target sizes for different uses:
- **README.md**: 100-200 KB (quick, under 15 seconds)
- **Documentation**: 200-400 KB (detailed, 30-45 seconds)
- **Social media**: 1-2 MB (can be longer, more detailed)

## Using the Colors Module

```javascript
import { c } from './demo/colors.js';

console.log(c.success('Build complete!'));
console.log(c.error('Build failed'));
console.log(c.warning('Deprecated API'));
console.log(c.info('Starting server...'));

console.log(c.rocket('Deploying...'));
console.log(c.trophy('Tests passed!'));

console.log(c.bold(c.cyan('Section Header')));
console.log(c.dim('Less important text'));
```

## Available Colors

Basic:
- red, green, yellow, blue, magenta, cyan, gray

Bright:
- brightRed, brightGreen, brightYellow, brightBlue, brightCyan

Special formatters:
- success(text) - Green checkmark
- error(text) - Red X
- warning(text) - Yellow warning sign
- info(text) - Blue info icon
- rocket(text) - Rocket + cyan
- trophy(text) - Trophy + yellow
- sparkles(text) - Sparkles + yellow
- fire(text) - Fire + red

## Updating README GIF

After recording a new demo:
```bash
# Create new quick demo
asciinema rec demo/soldier-quick.cast -c "./demo/quick-demo.sh" --overwrite
agg --idle-time-limit 0.8 --font-size 16 demo/soldier-quick.cast demo/soldier-quick.gif

# Copy to root for README
cp demo/soldier-quick.gif .

# Commit
git add soldier-quick.gif demo/
git commit -m "Update demo GIF"
```

## Troubleshooting

**GIF is too large:**
- Reduce `--idle-time-limit` (makes it faster)
- Reduce `--font-size`
- Make demo script shorter

**GIF is too fast:**
- Increase `--idle-time-limit`
- Add more `sleep` commands in script

**Colors not showing:**
- Make sure terminal supports colors
- Check that ANSI codes are not stripped
- Use `--theme` option in agg if needed

**Text is too small:**
- Increase `--font-size`
- Reduce `--cols` for wider characters
