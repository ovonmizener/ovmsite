# Oliver von Mizener - Vista-Style Portfolio

A Windows Vista-inspired portfolio website built with Next.js, featuring a nostalgic Aero Glass interface with interactive windows, desktop icons, and dynamic content.

## Features

### 🖥️ **Vista-Style Interface**
- **Aero Glass effects** with backdrop blur and transparency
- **Draggable windows** with minimize, maximize, and close functionality
- **Desktop icons** with grid-based positioning
- **Taskbar** with window management and system controls
- **Dynamic wallpapers** with animated gradients

### 📁 **File Navigator Style Windows**
The site includes a sophisticated file navigator window (Sample window) that emulates a Mac Finder-style interface with Vista/Aero styling. This pattern can be reused to create similar content browsers.

#### **Structure Overview:**
```
┌─────────────────────────────────────────────────────────┐
│ Sample (Window Title Bar - handled by VistaWindow)     │
├─────────────┬───────────────────────────────────────────┤
│ Project     │ File Header (name, size, modified)       │
│ Files       ├───────────────────────────────────────────┤
│ ├─ All      │                                           │
│ │  ├─ File1 │ Content Area (scrollable)                 │
│ │  └─ File2 │                                           │
│ └─ Text     │                                           │
│    └─ File3 │                                           │
└─────────────┴───────────────────────────────────────────┘
```

#### **Key Components:**

1. **Sidebar Navigation** (`w-64` width):
   - **Category Headers**: Expandable/collapsible file type groups
   - **File Lists**: Individual files within each category
   - **Visual Hierarchy**: Indentation with `border-l border-white/10`
   - **Selection States**: Subtle highlighting with blue accent borders

2. **Content Area** (flexible width):
   - **File Header**: Shows selected file info (name, size, date)
   - **Content Viewer**: Scrollable area for file content
   - **Responsive Layout**: Adapts to window resizing

#### **Data Structure:**
```typescript
interface FileItem {
  id: string
  name: string
  type: 'text' | 'image' | 'code' | 'video' | 'audio' | 'archive' | 'spreadsheet' | 'presentation' | 'pdf' | 'unknown'
  content?: string
  imageSrc?: string
  size?: string
  modified?: string
}

interface FileType {
  id: string
  name: string
  icon: React.ComponentType<any>
  color: string
  files: FileItem[]
}
```

#### **State Management:**
```typescript
const [selectedFileType, setSelectedFileType] = useState<string>('all')
const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['all']))
```

#### **Vista/Aero Styling Features:**
- **Glass Morphism**: `bg-white/10 backdrop-blur-sm aero-glass`
- **Subtle Selection**: `bg-white/12 border-r-2 border-blue-400/60`
- **Hover Effects**: `hover:bg-white/8 transition-all duration-200`
- **Scrollbars**: `scrollbar-thin scrollbar-thumb-white/20`
- **Typography**: `prose-invert` for dark theme content

#### **Creating New File Navigator Windows:**

1. **Create Component Structure:**
   ```typescript
   const NewNavigatorWindow: React.FC = () => {
     // State management
     const [selectedFileType, setSelectedFileType] = useState<string>('all')
     const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
     const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['all']))

     // Data structure
     const fileTypes: FileType[] = [
       {
         id: 'all',
         name: 'All Items',
         icon: Folder,
         color: 'text-blue-400',
         files: [/* your files */]
       }
     ]

     return (
       <div className="w-full h-full flex bg-white/10 backdrop-blur-sm text-white/90 overflow-hidden aero-glass">
         {/* Sidebar */}
         <div className="w-64 bg-white/5 border-r border-white/20 flex flex-col">
           {/* Navigation content */}
         </div>
         
         {/* Content Area */}
         <div className="flex-1 flex flex-col">
           {/* File content */}
         </div>
       </div>
     )
   }
   ```

2. **Add to Main Page:**
   ```typescript
   // In app/page.tsx WindowContent component
   case "new-navigator":
     return <NewNavigatorWindow />
   ```

3. **Add Desktop Icon:**
   ```typescript
   // In initialIcons array
   {
     id: "new-navigator",
     name: "New Navigator",
     icon: "📁",
     gridX: 2,
     gridY: 2,
     windowId: "new-navigator"
   }
   ```

#### **Customization Options:**
- **File Types**: Add new file type categories with custom icons
- **Content Rendering**: Customize `renderFileContent()` for different file types
- **Styling**: Modify colors, spacing, and effects to match your theme
- **Functionality**: Add search, filtering, or sorting capabilities

#### **Best Practices:**
- **Consistent Spacing**: Use `px-4 py-2.5` for buttons, `space-x-3` for elements
- **Smooth Transitions**: Always include `transition-all duration-200`
- **Visual Feedback**: Use subtle borders and shadows for selection states
- **Accessibility**: Ensure proper contrast and keyboard navigation
- **Responsive Design**: Test with different window sizes

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

## Sound Effects (Experiment - Disabled)

This project previously experimented with startup and shutdown sound effects (Vista-style boot/shutdown sounds). The implementation included:

- Playing a startup sound after the boot animation, triggered by user interaction to comply with browser autoplay policies.
- Playing a shutdown sound on power actions.
- Handling browser autoplay restrictions with a click-through prompt after the boot animation.

**Why it's disabled:**
- Browser autoplay policies are strict and inconsistent across browsers.
- The user experience was not ideal without a guaranteed, seamless sound.
- The code and sound files are now archived for future reference.

**How to re-enable:**
- See the `public/sounds/archive/` directory for the sound files.
- See previous commits for the sound logic and click-through boot animation.

Feel free to revisit and re-enable this feature in the future!

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