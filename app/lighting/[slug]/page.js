'use client';

import { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import EmailCopy from '@/components/EmailCopy';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

const builder = createImageUrlBuilder(client);
function urlFor(source) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

export default function ProjectPage({ params: paramsPromise }) {
  const [project, setProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = await paramsPromise;
        const query = `*[_type == "project" && slug.current == $slug][0]{
          title, year, production, director, cinematography, credit, videoUrl,
          "gallery": gallery[]{asset, alt, crop}, coverImage
        }`;
        const data = await client.fetch(query, { slug: params.slug });
        setProject(data);
        setLoading(false);
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [paramsPromise]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('vimeo.com')) {
      const id = url.split('/').pop();
      return `https://player.vimeo.com/video/${id}?h=0&title=0&byline=0&portrait=0`;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
      return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0`;
    }
    return url;
  };

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!project?.gallery) return;
    setCurrentIndex((prev) => (prev + 1 === project.gallery.length ? 0 : prev + 1));
  }, [project]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!project?.gallery) return;
    setCurrentIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  }, [project]);

  if (loading) return <div style={{ background: 'black', height: '100vh' }} />;
  if (!project) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>Project not found</div>;

  const heroImageUrl = project.coverImage ? urlFor(project.coverImage).url() : (project.gallery?.[0] ? urlFor(project.gallery[0]).url() : "");
  const embedUrl = getEmbedUrl(project.videoUrl);

  return (
    <main onContextMenu={(e) => e.preventDefault()} style={{ backgroundColor: 'black', minHeight: '100vh', width: '100%', position: 'relative' }}>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* --- 1. BASE STYLES --- */
        img { -webkit-user-drag: none; user-drag: none; user-select: none; image-rendering: -webkit-optimize-contrast; }
        .container-base { width: 100%; max-width: 1920px; margin: 0 auto; padding: 0 64px; box-sizing: border-box; }
        .nav-item { font-family: var(--font-text); color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.875rem; font-weight: 500; padding: 8px 16px; border-radius: 6px; transition: 0.2s; display: inline-flex; align-items: center; white-space: nowrap; background: transparent; border: none; cursor: pointer; }
        .nav-item:hover { background-color: rgba(255, 255, 255, 0.12); color: white; }
        .nav-container { width: 100%; max-width: 1920px; padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; height: 100%; }
        .nav-logo { font-family: var(--font-display); color: white; text-decoration: none; font-size: 1.5rem; font-weight: 500; white-space: nowrap; }
        .stable-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 40px 24px; }
        .credit-label { color: white; opacity: 0.6; font-family: var(--font-text); font-size: 0.95rem; font-weight: 300; margin-bottom: 8px; text-transform: none; }
        .credit-value { color: white; font-family: var(--font-text); font-size: 2.8rem; font-weight: 400; line-height: 1.1; }
        .credit-line { width: 1px; height: 60px; background-color: white; opacity: 0.3; margin: 32px 0; }
        .header-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: white; font-family: var(--font-display); font-size: clamp(32px, 8vw, 108px); font-weight: 400; text-align: center; }
        .char-mask { overflow: hidden; display: inline-block; position: relative; }

       /* --- MOBILE OVERRIDES --- */
@media (max-width: 768px) {
  /* 1. Layout & Container */
  .container-base { padding: 0 20px; }
  
  /* 2. Navigation Fixes */
  .nav-container { 
    grid-template-columns: 1fr auto !important; 
    padding: 0 20px !important; 
    display: flex !important; 
    justify-content: space-between !important; 
  }
  .nav-logo { font-size: 1.1rem !important; }
  .nav-right-social { display: none !important; }
  .nav-item { padding: 6px 10px !important; font-size: 0.75rem !important; }

  /* 3. Hero Bezel (The Frame) */
  .hero-bezel { 
    top: 80px !important; 
    bottom: 20px !important; 
    left: 20px !important; 
    right: 20px !important; 
    border-radius: 24px !important; 
  }

  /* 4. Project Header & Credits (Your essential missing parts) */
  .header-wrapper { font-size: clamp(32px, 10vw, 60px) !important; text-align: center; }
  .credit-value { font-size: 1.8rem !important; }
  .credit-line { height: 32px !important; margin: 24px 0 !important; }
  
  /* 5. Grid Scaling */
  .stable-grid { grid-template-columns: 1fr !important; gap: 16px !important; }

  /* 6. Footer Responsive Stacking */
  .mobile-hide { display: none !important; }

  .footer-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    text-align: center !important;
    padding-top: 20px !important;
  }

  .footer-align-right {
    justify-content: center !important;
  }
}
      `}} />

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {currentIndex !== null && project.gallery?.[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentIndex(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            <button
              aria-label="Close Lightbox"
              style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10001, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              onClick={() => setCurrentIndex(null)}
            >
              <X size={32} />
            </button>

            <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 30px', zIndex: 10000, pointerEvents: 'none' }}>
              <button aria-label="Previous Image" style={{ background: 'none', border: 'none', color: 'white', pointerEvents: 'auto', cursor: 'pointer' }} onClick={handlePrev}>
                <ChevronLeft size={60} />
              </button>
              <button aria-label="Next Image" style={{ background: 'none', border: 'none', color: 'white', pointerEvents: 'auto', cursor: 'pointer' }} onClick={handleNext}>
                <ChevronRight size={60} />
              </button>
            </div>

            <motion.img
              key={currentIndex}
              src={urlFor(project.gallery[currentIndex]).width(1920).url()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              alt={project.gallery[currentIndex].alt || `Gallery image ${currentIndex + 1}`}
              style={{ maxWidth: '85%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAV --- */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.05)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', borderBottom: 'none', display: 'flex', justifyContent: 'center' }}>
        <div className="nav-container">
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <Link href="/lighting" className="nav-item" style={{ color: 'white' }}>Lighting</Link>
            <Link href="/about" className="nav-item" style={{ color: 'white' }}>About</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" className="nav-logo">Mark A. Lane</Link>
          </div>
          <div className="nav-right-social" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <a href="https://instagram.com/mark.lane_" target="_blank" rel="noopener noreferrer" className="nav-item" style={{ color: 'white' }}>Instagram</a>
          </div>
        </div>
      </nav>

{/* --- HERO SECTION --- */}
<section style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'black' }}>
  <motion.div
    className="hero-bezel"
    initial={{ clipPath: 'inset(99% 49% 0% 49% round 100px)' }}
    animate={{ clipPath: 'inset(0% 0% 0% 0% round 40px)' }}
    transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
    style={{ position: 'absolute', top: '64px', bottom: '64px', left: '64px', right: '64px', backgroundColor: '#111', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    {/* 1. THE IMAGE (Background) */}
    {heroImageUrl && (
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }} 
        transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }} 
        src={heroImageUrl} 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        alt={project.title}
      />
    )}

    {/* 2. THE TITLE (Goes right here, on top of the image) */}
    <div style={{ position: 'relative', zIndex: 10 }}>
      <h1 className="header-wrapper" style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {project.title.split(" ").map((word, wordIdx) => {
          const previousLettersCount = project.title
            .split(" ")
            .slice(0, wordIdx)
            .join(" ").length + (wordIdx > 0 ? 1 : 0);

          return (
            <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
              {word.split("").map((char, charIdx) => (
                <span key={charIdx} className="char-mask" style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    initial={{ y: '102%' }}
                    animate={{ y: '0%' }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 2.0 + ((previousLettersCount + charIdx) * 0.04), 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          );
        })}
      </h1>
    </div>
  </motion.div>
</section>

      {/* --- GALLERY SECTION --- */}
      <section className="container-base" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <motion.div className="stable-grid">
          {project.gallery?.map((img, idx) => (
            <motion.div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: '#111', borderRadius: '24px', overflow: 'hidden', cursor: 'zoom-in' }}
            >
              <img 
                src={urlFor(img).width(1000).height(562).fit('crop').auto('format').url()} 
                width="1000"
                height="562"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt={img.alt || `Gallery image ${idx + 1}`} 
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- VIDEO PLAYER SECTION --- */}
      {project.videoUrl && (
        <section className="container-base" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#111', borderRadius: '24px', overflow: 'hidden' }}>
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Play fill="white" color="white" size={32} style={{ marginLeft: '4px' }} />
                </div>
              </div>
            )}
            <iframe
              src={isPlaying ? `${embedUrl}&autoplay=1` : embedUrl}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, pointerEvents: isPlaying ? 'auto' : 'none' }}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={project.title}
            />
          </div>
        </section>
      )}

      {/* --- CREDITS --- */}
      <section className="container-base" style={{ paddingBottom: '160px', paddingTop: '80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {project.year && (
            <>
              <div className="credit-label">Year</div>
              <div className="credit-value">{project.year}</div>
              <div className="credit-line"></div>
            </>
          )}
          {project.production && (
            <>
              <div className="credit-label">Production Company</div>
              <div className="credit-value">{project.production}</div>
              <div className="credit-line"></div>
            </>
          )}
          {project.director && (
            <>
              <div className="credit-label">Director</div>
              <div className="credit-value">{project.director}</div>
              <div className="credit-line"></div>
            </>
          )}
          {project.cinematography && (
            <>
              <div className="credit-label">Cinematography</div>
              <div className="credit-value">{project.cinematography}</div>
              <div className="credit-line"></div>
            </>
          )}
          {project.credit && (
            <>
              <div className="credit-label">Credit</div>
              <div className="credit-value">{project.credit}</div>
            </>
          )}
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