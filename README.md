# Oliver von Mizener - Vista-Style Portfolio

A Windows Vista-inspired portfolio website built with Next.js, featuring a nostalgic Aero Glass interface with interactive windows, desktop icons, and dynamic content.

## Features

### 🖥️ **Vista-Style Interface**
- **Aero Glass effects** with backdrop blur and transparency
- **Draggable windows** with minimize, maximize, and close functionality
- **Desktop icons** with grid-based positioning
- **Taskbar** with window management and system controls
- **Dynamic wallpapers** with animated gradients

### 📱 **Social Media Integration**
- **Dynamic social media grid** with staggered animations
- **Interactive social cards** with hover effects and particle animations
- **Direct links** to all social media profiles
- **Responsive design** that works on all screen sizes

### 🎮 **Interactive Elements**
- **Flappy Bird game** (Jetpack Escape) embedded in Vista window
- **Terminal window** with command-line interface
- **Performance monitor** with animated metrics
- **Image gallery** with lightbox viewer
- **Welcome window** with first-time user experience

## Browser Functionality (Future Use)

### 🚀 **Inline Browser Implementation**

The site includes a fully functional Vista-style browser window that can be re-enabled for future use. This feature was implemented but is currently disabled due to social media platform restrictions.

#### **How It Works:**
1. **BrowserWindow Component** - A complete browser simulation with:
   - Vista-style title bar with traffic light buttons
   - Navigation toolbar (back, forward, refresh, address bar)
   - iframe-based content loading with proper sandboxing
   - Loading states and error handling
   - "Open in New Tab" fallback functionality

2. **State Management** - Browser state is managed in the main VistaDesktop component:
   ```typescript
   const [browserWindow, setBrowserWindow] = useState<{ url: string; title: string } | null>(null)
   ```

3. **Social Media Integration** - Each social card can trigger the browser:
   ```typescript
   const openInBrowser = (url: string, title: string) => {
     setBrowserWindow({ url, title });
     onOpenWindow("browser");
   }
   ```

#### **Why It's Disabled:**
Most social media platforms (LinkedIn, Instagram, X/Twitter, TikTok) block iframe embedding via:
- `X-Frame-Options: DENY`
- `Content-Security-Policy: frame-ancestors 'none'`

This results in "refused to connect" errors when trying to load these sites inline.

#### **To Re-enable:**
1. **Update SocialCard component** to include the "Open in Browser" button:
   ```typescript
   <button onClick={() => onOpenBrowser(social.url, social.name)}>
     Open in Browser
   </button>
   ```

2. **Pass onOpenBrowser prop** to SocialCard components in the social media grid

3. **Consider alternatives** for social media content:
   - Instagram Basic Display API for feed previews
   - Custom profile cards with embedded content
   - Third-party widgets (EmbedSocial, SnapWidget)
   - Web scraping (with proper rate limiting and ToS compliance)

#### **Technical Details:**
- **Browser scaling** is handled with `h-full` classes (same fix as flappy-bird game)
- **Error handling** shows fallback UI when iframe is blocked
- **Sandboxing** includes necessary permissions for basic browsing
- **Responsive design** works across different window sizes

### 🛠️ **Future Enhancements:**
- **Custom social media previews** using official APIs
- **Profile cards** with embedded content and stats
- **Multi-tab browsing** within the Vista browser
- **Bookmarks and history** functionality
- **Custom error pages** with Vista styling

## Development

### **Tech Stack:**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hooks** for state management

### **Key Components:**
- `VistaDesktop` - Main desktop environment
- `VistaWindow` - Draggable window wrapper
- `VistaTaskbar` - Top taskbar with controls
- `WindowContent` - Dynamic content for different windows
- `BrowserWindow` - Inline browser (disabled)
- `SocialCard` - Interactive social media cards

### **File Structure:**
```
app/
├── components/          # Vista-style components
├── page.tsx            # Main desktop environment
├── layout.tsx          # Root layout
└── globals.css         # Vista styling and animations
```

## Deployment

The site is optimized for modern browsers and includes:
- **Responsive design** for mobile and desktop
- **Performance optimizations** with Next.js
- **Accessibility features** for inclusive design
- **SEO optimization** with proper meta tags

---

*Built with nostalgia and modern web technologies. The Vista aesthetic lives on! 🪟✨* 