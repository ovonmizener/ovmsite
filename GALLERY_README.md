# Gallery System Documentation

## Overview

The gallery system has been updated to automatically organize images by folders. The system scans the `public/images` directory and creates categories based on subdirectories.

## How It Works

1. **Automatic Detection**: The system automatically scans the `public/images` directory on each request
2. **Folder-based Categories**: Each subdirectory becomes a category in the gallery
3. **Root Images**: Images directly in the `public/images` folder are grouped under "General"
4. **Dynamic Updates**: Simply add or remove folders/images and they'll appear in the gallery automatically

## Adding Images to the Gallery

### Method 1: Add to Existing Category
1. Navigate to `public/images/[category-name]/`
2. Add your image files (supports: .jpg, .jpeg, .png, .gif, .webp, .svg)
3. Images will automatically appear in that category

### Method 2: Create a New Category
1. Create a new folder in `public/images/`
2. Add image files to the new folder
3. The folder name becomes the category name (formatted for display)

### Method 3: Add to General Category
1. Add image files directly to `public/images/`
2. They will appear in the "General" category

## Folder Structure Example

```
public/
└── images/
    ├── cuppylogo.JPG                    # General category
    ├── ipodfiller-screenshot.png        # General category
    ├── joypop/                          # Joypop category
    │   ├── 0P2A7628.jpg
    │   ├── Capture.JPG
    │   └── IMG_6873.jpg
    └── New folder/                      # New Folder category
        ├── 0P2A7628.jpg
        ├── Capture.JPG
        └── IMG_6873.jpg
```

## Features

- **Category Filtering**: Click category buttons to filter images
- **Image Viewer**: Click any image to open it in the full-screen viewer
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Framer Motion animations for smooth transitions
- **Auto-formatting**: Folder names are automatically formatted for display (e.g., "new-folder" becomes "New Folder")

## Technical Details

- **API Endpoint**: `/api/gallery` - Returns JSON with all categories and images
- **Component**: `app/components/GalleryWindow.tsx` - Main gallery component
- **Utility**: `lib/gallery.ts` - Handles directory scanning and image processing
- **Supported Formats**: JPG, JPEG, PNG, GIF, WebP, SVG

## Troubleshooting

- **Images not appearing**: Check that images are in the correct directory and have supported extensions
- **Categories not updating**: Refresh the page or restart the development server
- **API errors**: Check the browser console and server logs for error messages 