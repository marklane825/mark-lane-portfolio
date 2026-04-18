'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const HeroContext = createContext(null); // Initialize with null
const builder = imageUrlBuilder(client);
const urlFor = (source) => source?.asset ? builder.image(source).url() : null;

export function HeroProvider({ children }) {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await client.fetch(`*[_type == "project" && defined(coverImage)][0...10]`);
        if (data.length > 0) {
          const random = data[Math.floor(Math.random() * data.length)];
          setHeroImage(urlFor(random.coverImage));
        }
      } catch (err) {
        console.error("Context fetch error:", err);
      }
    };
    fetchHero();
  }, []);

  return (
    <HeroContext.Provider value={{ heroImage }}>
      {children}
    </HeroContext.Provider>
  );
}

// Add this safety check here
export const useHero = () => {
  const context = useContext(HeroContext);
  if (context === undefined) {
    // This return ensures { heroImage } destructuring won't fail
    return { heroImage: null }; 
  }
  return context || { heroImage: null };
};