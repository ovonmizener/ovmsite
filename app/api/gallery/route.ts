import { NextResponse } from 'next/server';
import { getGalleryCategories } from '@/lib/gallery';

export async function GET() {
  try {
    const categories = getGalleryCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery categories' },
      { status: 500 }
    );
  }
} 