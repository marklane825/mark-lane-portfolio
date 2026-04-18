'use client';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // This forces Lenis to jump to the top without animation 
    // immediately when the URL changes
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}