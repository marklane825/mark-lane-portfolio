'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PageTransition({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Standard browser scroll reset
    window.scrollTo(0, 0);
    
    // 2. If your SmoothScroll library uses a 'body' or 'wrapper' scroll, 
    // this ensures those are reset too.
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        style={{ 
          width: '100%',
          minHeight: '100vh',
          backgroundColor: 'black'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}