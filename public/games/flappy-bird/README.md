# Jetpack Escape - Web Version

A fast-paced jetpack adventure game with two game modes: Traditional and Continuous.

## Files Included

- `game.js` - Main game logic (required)
- `index.html` - Standalone game page (optional)
- `README.md` - This file

## Integration Options

### Option 1: Standalone Game Page
Simply copy the entire `jetpack-escape` folder to your website and link to `index.html`.

### Option 2: Embed in Existing Page
Add this HTML to any page where you want the game:

```html
<canvas id="game-canvas" width="800" height="600" style="border: 2px solid #333; display: block; margin: 0 auto;"></canvas>
<script src="path/to/game.js"></script>
<script>
    window.addEventListener('load', () => {
        new JetpackEscape();
    });
</script>
```

### Option 3: Modal/Popup Game
Add a button that opens the game in a modal:

```html
<button onclick="openGame()">Play Jetpack Escape</button>

<div id="gameModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <canvas id="game-canvas" width="800" height="600" style="border: 2px solid #333;"></canvas>
        <button onclick="closeGame()" style="position: absolute; top: -40px; right: 0;">Close</button>
    </div>
</div>

<script src="path/to/game.js"></script>
<script>
    function openGame() {
        document.getElementById('gameModal').style.display = 'block';
        new JetpackEscape();
    }
    
    function closeGame() {
        document.getElementById('gameModal').style.display = 'none';
        location.reload(); // Reset game
    }
</script>
```

## Game Features

- **Traditional Mode**: 3 lives, enemies appear after 3 gates, tunnel penalty system
- **Continuous Mode**: Endless survival with double jump and speed boosts
- **Responsive Controls**: 100 FPS for smooth gameplay
- **Fallback Graphics**: Works without image assets
- **Menu System**: Complete with rules and credits

## Controls

- **SPACE**: Jump / Double Jump
- **ESC**: Return to Menu
- **Mouse**: Navigate Menus

## Technical Details

- Pure JavaScript (no dependencies)
- Canvas-based rendering
- 100 FPS frame rate for responsiveness
- Self-contained game logic
- Cross-browser compatible

## Optional Assets

If you want the visual assets, also copy:
- `background.png`
- `jetpack_character.png`
- `enemy.png`

The game will work perfectly without these images using colored rectangles as fallbacks. 

## Troubleshooting: Iframe/Canvas Sizing Bug (and How We Fixed It)

### The Problem
If you embed this game in an iframe or inside a parent container (like a draggable window or modal), you might find that the game appears cut off, squished, or only a small portion of the canvas is visible (e.g., only a 150px tall black bar, even though the parent is much taller).

This happens because CSS height inheritance is **not automatic** with `height: 100%` or Tailwind's `h-full`. If any parent in the chain does not have an explicit height, the child with `height: 100%` will collapse to zero or a minimal value. This is especially tricky when using frameworks like React/Next.js with dynamic layouts.

### What Was Wrong
- The game's `index.html` originally set `#gameContainer { height: 400%; }`, which made the canvas 4x taller than the iframe, so only the top part was visible.
- Even after fixing that to `height: 100%`, the game was still squished when embedded in a React window because one of the parent `<div>`s (the wrapper around the iframe) did **not** have an explicit height. As a result, the iframe's `h-full` or `height: 100%` had no effect, and the canvas collapsed to a tiny height.

### The Solution
1. **Set All Parent Heights Explicitly:**
   - Make sure every parent container of the iframe (from the window content area down to the iframe itself) has an explicit height, either via inline styles, Tailwind's `h-full`, or `height: 100%`.
   - In our case, we added `className="h-full"` to the wrapper `<div>` around the `<iframe>` in the React component.
2. **Fix the Game HTML:**
   - Set `#gameContainer { height: 100%; }` in `index.html`.
   - Ensure the canvas uses `height: 100%` and fills its parent.
3. **Iframe Sizing:**
   - The iframe itself should use `className="w-full h-full"` or `style="width: 100%; height: 100%;"`.
   - The parent window (e.g., a draggable window) should have a fixed or calculated height (e.g., 800px), and the content area should subtract the title bar height (e.g., `height: calc(100% - 56px)`).

### Key Takeaway
> **If you want an iframe or canvas to fill a parent, every ancestor up the chain must have an explicit height. `h-full` or `height: 100%` is ignored if any parent is missing a height!**

This bug cost us two hours of debugging. Hopefully, this note saves you that time! 