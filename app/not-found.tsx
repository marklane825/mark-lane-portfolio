'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ backgroundColor: 'black', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px' }}>
        <motion.div
          initial={{ clipPath: 'inset(99% 49% 0% 49% round 100px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 40px)' }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: '40px',
            backgroundColor: '#0A0A0A',
            borderRadius: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', marginTop: '-8vh' }}>
            
            {/* CONTINUOUS TUNGSTEN FLICKER 404 */}
            <motion.h1
              initial={{ opacity: 0, color: "rgba(255, 255, 255, 0)", textShadow: "0 0 0px rgba(255, 140, 0, 0)" }}
              animate={{ 
                opacity: [0, 0.1, 0.05, 0.6, 0.3, 1, 0.4, 0.8, 0.2, 1], 
                color: [
                  "rgba(255, 255, 255, 0)", 
                  "rgba(255, 180, 80, 0.4)", 
                  "rgba(255, 180, 80, 0.1)", 
                  "#FFFFFF", 
                  "rgba(255, 180, 80, 0.4)", 
                  "#FFFFFF",
                  "rgba(255, 180, 80, 0.2)",
                  "#FFFFFF",
                  "rgba(255, 180, 80, 0.1)",
                  "#FFFFFF"
                ], 
                textShadow: [
                  "0 0 0px rgba(255, 140, 0, 0)", 
                  "0 0 20px rgba(255, 140, 0, 0.6)", 
                  "0 0 5px rgba(255, 140, 0, 0.2)", 
                  "0 0 50px rgba(255, 255, 255, 1)", 
                  "0 0 30px rgba(255, 140, 0, 0.6)", 
                  "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #FF8800, 0 0 80px #FF8800, 0 0 120px #FF8800, 0 0 180px #FF8800",
                  "0 0 10px rgba(255, 140, 0, 0.2)",
                  "0 0 40px rgba(255, 140, 0, 0.6)",
                  "0 0 2px rgba(255, 140, 0, 0.1)",
                  "0 0 5px #fff, 0 0 10px #fff, 0 0 40px #FF8800, 0 0 120px #FF8800"
                ], 
              }}
              transition={{ 
                duration: 3, 
                ease: "linear", 
                repeat: Infinity,
                repeatType: "mirror",
                times: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.6, 0.8, 1] 
              }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(120px, 25vw, 320px)', 
                fontWeight: '800', 
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.05em'
              }}
            >
              404
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                color: 'white', 
                fontSize: 'clamp(32px, 6vw, 72px)', 
                fontWeight: '500', 
                lineHeight: '0.9', 
                margin: '0', 
                textTransform: 'lowercase' 
              }}
            >
              looks like we tripped.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 2.2 }}
              style={{ 
                fontFamily: 'var(--font-text)', 
                color: 'white', 
                marginTop: '32px',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              someone hit a cable. scene not found.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
              style={{ marginTop: '60px' }}
            >
              <Link href="/" style={{
                fontFamily: 'var(--font-text)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: '500',
                padding: '14px 32px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              >
                Reset the Breaker (Home)
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
       <footer style={{
        position: 'fixed', bottom: '60px', left: '80px', right: '80px',
        display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.3)',
        fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', zIndex: 30
      }}>
        <div>London / UK</div>
        <div>© 2026 Lane Lighting</div>
      </footer>
    </main>
  );
}