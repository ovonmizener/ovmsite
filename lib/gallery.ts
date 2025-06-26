import fs from 'fs';
import path from 'path';

export interface GalleryCategory {
  name: string;
  displayName: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  filename: string;
}

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export function getGalleryCategories(): GalleryCategory[] {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const categories: GalleryCategory[] = [];

  try {
    // Get all items in the images directory
    const items = fs.readdirSync(imagesDir, { withFileTypes: true });
    
    // Group by directories and files
    const directories = items.filter(item => item.isDirectory());
    const files = items.filter(item => item.isFile() && isImageFile(item.name));

    // Add root category for images directly in images folder
    if (files.length > 0) {
      categories.push({
        name: 'root',
        displayName: 'General',
        images: files.map(file => ({
          src: `/images/${file.name}`,
          alt: getImageAlt(file.name),
          filename: file.name
        }))
      });
    }

    // Add categories for each subdirectory
    directories.forEach(dir => {
      const dirPath = path.join(imagesDir, dir.name);
      const dirItems = fs.readdirSync(dirPath, { withFileTypes: true });
      const dirImages = dirItems
        .filter(item => item.isFile() && isImageFile(item.name))
        .map(file => ({
          src: `/images/${dir.name}/${file.name}`,
          alt: getImageAlt(file.name),
          filename: file.name
        }));

      if (dirImages.length > 0) {
        categories.push({
          name: dir.name,
          displayName: formatCategoryName(dir.name),
          images: dirImages
        });
      }
    });

  } catch (error) {
    console.error('Error reading gallery directories:', error);
  }

  return categories;
}

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function getImageAlt(filename: string): string {
  // Remove extension and format filename
  const nameWithoutExt = path.parse(filename).name;
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

function formatCategoryName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
} 