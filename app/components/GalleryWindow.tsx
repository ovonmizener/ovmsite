'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GalleryCategory, GalleryImage } from '@/lib/gallery';

interface GalleryWindowProps {
  onOpenWindow: (windowId: string) => void;
  setSelectedImage: (image: { src: string; alt: string } | null) => void;
}

export default function GalleryWindow({ onOpenWindow, setSelectedImage }: GalleryWindowProps) {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch gallery categories from API
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading gallery:', error);
        setIsLoading(false);
      });
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage({
      src: image.src,
      alt: image.alt
    });
    onOpenWindow("image-viewer");
  };

  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.name === selectedCategory);

  if (isLoading) {
    return (
      <div className="text-white">
        <h2 className="text-3xl font-bold vista-text-glow mb-6">Gallery</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-white/60">Loading gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold vista-text-glow mb-6">Gallery</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {category.displayName}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Content */}
      {filteredCategories.length === 0 ? (
        <div className="text-center text-white/60 py-12">
          <p>No images found in the selected category.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              {selectedCategory === 'all' && (
                <h3 className="text-xl font-semibold mb-4 text-white/90 vista-text-glow">
                  {category.displayName}
                </h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.images.map((image, imageIndex) => (
                  <motion.div
                    key={`${category.name}-${image.filename}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: (categoryIndex * 0.1) + (imageIndex * 0.05),
                      duration: 0.3 
                    }}
                    className="aero-glass rounded-lg p-4 aspect-square relative group overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="text-white/80 hover:text-white transition-colors">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 