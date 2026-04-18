'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main style={{ 
      backgroundColor: 'black', 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 9999 
    }}>
      <div style={{ textAlign: 'center' }}>
        
        {/* THE FILAMENT - High Output Version */}
        <motion.div
          animate={{ 
            opacity: [0.7, 1, 0.8, 1, 0.7], 
            scale: [1, 1.4, 0.9, 1.2, 1],
            boxShadow: [
              "0 0 40px #FF8800",  // Baseline glow
              "0 0 100px #FFB450", // High intensity strike
              "0 0 60px #FF8800",
              "0 0 140px #FFFFFF", // Pure white peak
              "0 0 40px #FF8800"
            ]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            width: '16px', // Much larger visible dot
            height: '16px',
            backgroundColor: '#FFB450',
            borderRadius: '50%',
            margin: '0 auto 30px auto',
            filter: 'blur(1px)' 
          }}
        />

        <motion.p 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ 
            color: 'white', 
            fontFamily: 'var(--font-text)', 
            fontSize: '0.75rem', 
            letterSpacing: '0.5em', 
            textTransform: 'uppercase',
            fontWeight: '500'
          }}
        >
          Striking Lights
        </motion.p>
      </div>
    </main>
  );
}