'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import EmailCopy from '@/components/EmailCopy';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function LightingPage() {
  const [jobs, setJobs] = useState([]);
  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const query = `*[_type == "project"] | order(sortingId desc, year desc) {
        _id, title, slug, coverImage, year, sortingId, isHeroProject
      }`;
      
      try {
        const allProjects = await client.fetch(query);
        setJobs(allProjects);

        if (allProjects.length > 0) {
          const heroCandidates = allProjects.filter(j => j.isHeroProject === true && j.coverImage);
          let selectedHero = heroCandidates.length > 0 ? heroCandidates[Math.floor(Math.random() * heroCandidates.length)] : allProjects[0];
          
          const heroUrl = urlFor(selectedHero.coverImage).quality(100).auto('format').url();
          
          const img = new window.Image();
          img.src = heroUrl;
          img.onload = () => {
            setHeroImage(heroUrl);
            setLoading(false);
          };
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Lighting Page Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div style={{ background: 'black', height: '100vh' }} />;

  return (
    <main onContextMenu={(e) => e.preventDefault()} style={{ backgroundColor: 'black', minHeight: '100vh', width: '100%' }}>

      {/* --- NAV --- */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.05)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', borderBottom: 'none', display: 'flex', justifyContent: 'center' }}>
        <div className="nav-container">
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <Link href="/lighting" className="nav-item">Lighting</Link>
            <Link href="/about" className="nav-item">About</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" className="nav-logo">Mark A. Lane</Link>
          </div>
          <div className="nav-right-social" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <a href="https://instagram.com/mark.lane_" target="_blank" rel="noopener noreferrer" className="nav-item">Instagram</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section style={{ height: '100vh', width: '100%', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
        <motion.div
          className="hero-bezel"
          initial={{ clipPath: 'inset(99% 49% 0% 49% round 100px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 40px)' }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', top: '64px', bottom: '64px', left: '64px', right: '64px', backgroundColor: '#111', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {heroImage && (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
              src={heroImage}
              width="1920"
              height="1080"
              alt="Lighting Portfolio Featured Work"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
          )}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h1 className="header-wrapper">
              {"Lighting".split("").map((char, idx) => (
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
            </h1>
          </div>
        </motion.div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section className="container-base" style={{ 
        paddingTop: '40px', 
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 1 // Lower than footer
      }}>
        <div className="stable-grid">
          {jobs.map((job) => (
            <Link key={job._id} href={`/lighting/${job.slug?.current}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: '#111', borderRadius: '24px', overflow: 'hidden' }}
              >
                {job.coverImage && (
                  <img 
                    src={urlFor(job.coverImage).width(1000).quality(100).auto('format').url()} 
                    width="1000"
                    height="562"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    alt={`Lighting design for ${job.title}`} 
                    loading="lazy"
                  />
                )}
                <motion.div
  className="mobile-frost-show"
  initial={{ opacity: 0, backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
  whileHover={{ opacity: 1, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
                  <h3 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '2rem', textAlign: 'center', padding: '0 20px' }}>{job.title}</h3>
                </motion.div>              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    <EmailCopy />
    
   {/* --- FOOTER --- */}
     <footer className="container-base" style={{ 
  paddingBottom: '64px', 
  marginTop: '80px',
  position: 'relative', 
  zIndex: 100, 
  pointerEvents: 'auto' 
}}>
  {/* Added 'footer-grid' here to handle the mobile stack */}
  <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', paddingTop: '32px' }}>
    
    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
      LONDON / UK
    </div>
    
    {/* Added 'mobile-hide' here - this middle section vanishes on mobile */}
    <div className="mobile-hide" style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
      <a 
        role="button"
        onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }}
        href="#"
        className="nav-item" 
        style={{ color: 'rgba(255,255,255,0.45)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-text)', padding: '8px 16px', transition: '0.2s', textDecoration: 'none' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
        }}
      >
        Terms
      </a>

      <a 
        href="https://instagram.com/mark.lane_" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="nav-item" 
        style={{ color: 'rgba(255,255,255,0.45)', fontWeight: '600', padding: '8px 16px', transition: '0.2s', textDecoration: 'none' }}
        onMouseEnter={(e) => { 
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.color = '#FFFFFF'; 
        }}
        onMouseLeave={(e) => { 
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; 
        }}
      >
        Instagram
      </a>
    </div>

    {/* Added 'footer-align-right' to keep the copyright centered on mobile */}
    <div className="footer-align-right" style={{ display: 'flex', justifyContent: 'flex-end', color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
      © 2026 LANE LIGHTING
    </div>
  </div>
</footer>

      {/* --- TERMS POPUP --- */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsTermsOpen(false)} 
            style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '20px' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              onClick={(e) => e.stopPropagation()} 
              style={{ width: '100%', maxHeight: '80vh', maxWidth: '600px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '24px', padding: '48px', color: 'white', position: 'relative', overflowY: 'auto' }}
            >
              <button 
                onClick={() => setIsTermsOpen(false)} 
                aria-label="Close terms modal"
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '24px' }}>Terms & Conditions</h2>
              <div style={{ fontFamily: 'var(--font-text)', fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }}>
                <h3 style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Intellectual Property</h3>
                <p>All visual content, including photography and video featured on this site, is used for the sole purpose of showcasing Mark A. Lane’s professional portfolio. Unless otherwise stated, the copyright and intellectual property rights for these works remain with the respective production companies, studios, or original creators. No ownership is claimed by Mark A. Lane, Lane Lighting, or any affiliated companies.</p>
                <h3 style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Services & Equipment</h3>
                <p>All equipment and services are provided in accordance with standard BECTU and industry terms unless a specific, separate contract is in place.</p>
                <h3 style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Bookings & Availability</h3>
                <p>All inquiries and bookings are subject to availability and formal confirmation. For full rate cards, kit lists, or booking inquiries, please contact via the official email provided on this site.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

