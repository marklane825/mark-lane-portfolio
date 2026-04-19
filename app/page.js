'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {

  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      const query = `*[_type == "project" && isHeroProject == true && defined(coverImage)]`;

      try {
        const data = await client.fetch(query);
        let finalUrl = "";

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          finalUrl = urlFor(data[randomIndex].coverImage)
            .width(2500)
            .quality(100)
            .auto('format')
            .url();
        } else {
          const fallbackQuery = `*[_type == "project" && defined(coverImage)] | order(sortingId desc)[0]`;
          const fallbackData = await client.fetch(fallbackQuery);
          if (fallbackData) {
            finalUrl = urlFor(fallbackData.coverImage)
              .width(2500)
              .quality(100)
              .auto('format')
              .url();
          }
        }

        if (finalUrl) {
          const img = new window.Image();
          img.src = finalUrl;
          img.onload = () => {
            setHeroImage(finalUrl);
            setLoading(false); 
          };
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Home Hero Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) return <div style={{ background: 'black', height: '100vh' }} />;

  const firstName = "Mark A.";
  const lastName = "Lane";

  return (
    <main onContextMenu={(e) => e.preventDefault()} style={{ backgroundColor: 'black', height: '100vh', width: '100%', overflow: 'hidden' }}>

      <section style={{ height: '100vh', width: '100%', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
        <motion.div
          className="home-bezel"
          initial={{ clipPath: 'inset(99% 49% 0% 49% round 100px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 40px)' }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '40px',
            bottom: '40px',
            left: '40px',
            right: '40px',
            backgroundColor: '#111',
            borderRadius: '40px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {heroImage && (
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
              src={heroImage}
              width="1920"
              height="1080"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                opacity: 1 
              }}
              alt="Mark A. Lane Lighting Hero"
            />
          )}

          <div className="header-wrapper" style={{ flexDirection: 'column', lineHeight: 0.85, position: 'relative', zIndex: 20 }}>
            <h1 style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', fontFamily: 'inherit', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex' }}>
                {firstName.split("").map((char, idx) => (
                  <span key={idx} className="char-mask">
                    <motion.span
                      initial={{ y: '102%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.2, delay: 2.0 + (idx * 0.04), ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex' }}>
                {lastName.split("").map((char, idx) => (
                  <span key={idx} className="char-mask">
                    <motion.span
                      initial={{ y: '102%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.2, delay: 2.4 + (idx * 0.04), ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </div>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5 }}
              style={{ display: 'flex', gap: '16px', marginTop: '48px' }}
            >
              <Link href="/lighting" className="home-nav-item">Lighting</Link>
              <Link href="/about" className="home-nav-item">About</Link>
            </motion.div>
          </div>

          {/* Footer inside the card */}
          <footer style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 80px)',
            display: 'flex',
            justifyContent: 'space-between',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            zIndex: 30
          }}>
            <div>London / UK</div>
            <div>© 2026 Lane Lighting</div>
          </footer>

        </motion.div>
      </section>

    </main>
  );
}