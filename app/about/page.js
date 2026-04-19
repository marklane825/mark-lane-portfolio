'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import EmailCopy from '@/components/EmailCopy';
import Link from 'next/link';

const awards = [
  { category: '22+1 - British Short Film', festival: '(Longlist) BAFTA', year: '2026' },
  { category: 'Tonight - Music Video of the Year', festival: '(Nominated) EDMAs', year: '2026' },
  { category: 'Flock - Cinematography', festival: 'BSC CLUB', year: '2025' },
  { category: 'Flock - Best British Short Film', festival: '(Nominated) BIFA', year: '2025' },
  { category: 'Tonight - Best Pop Video UK', festival: '(Nominated) UKMVA', year: '2025' },
  { category: 'Baxter Dury - Best Alt Newcomer', festival: '(Nominated) UKMVA', year: '2025' },
  { category: 'Van Wife - Best Digital Commercial', festival: 'TellyCast DVAs', year: '2024' },
  { category: 'Tapeworm - Best Short Film', festival: 'BSC SHORT FILM AWARDS', year: '2024' },
];

const press = [
  { title: 'PinkPantheress spotlight', outlet: 'SHL', url: 'https://www.instagram.com/p/DUjMLA4DHik/' },
  { title: 'Behind the lighting of Flock', outlet: 'PANALUX', url: 'https://www.instagram.com/p/DUlmvk7D649/' },
  { title: 'What We Wished We Could Be', outlet: 'British Cinematographer', url: 'https://britishcinematographer.co.uk/dp-yannick-hausler-on-what-we-wished-we-could-be/' },
  { title: 'OKNOTOK', outlet: 'British Cinematographer', url: 'https://britishcinematographer.co.uk/linda-wu-ok-notok/' },
  { title: 'Tapeworm', outlet: 'British Cinematographer', url: 'https://britishcinematographer.co.uk/edward-hamilton-stubber-tapeworm/' },
  { title: 'Tree Of Many Faces', outlet: 'British Cinematographer', url: 'https://britishcinematographer.co.uk/tom-simington-tree-of-many-faces/' },
  { title: 'This Is Ours', outlet: 'British Cinematographer', url: 'https://britishcinematographer.co.uk/helena-gonzalez-this-is-ours/' },
  { title: 'Mango Skin', outlet: 'British Cinematographer', url: 'https://britishcinematographer.co.uk/nina-oyens-mango-skin/' },
];

const clientLogos = [
  { file: 'bbc.png', label: 'BBC' },
  { file: 'arts-sciences.png', label: 'Arts & Sciences' },
  { file: 'merman.png', label: 'Merman' },
  { file: 'eon.png', label: 'EON' },
  { file: 'slick.png', label: 'Slick' },
  { file: 'stink.png', label: 'Stink Films' },
  { file: 'film-4.png', label: 'Film4' },
  { file: 'smuggler.png', label: 'Smuggler' },
  { file: 'riff-raff.png', label: 'Riff Raff' },
  { file: 'disney.png', label: 'Disney' },
  { file: 'prettybird.png', label: 'Prettybird' },
  { file: 'canada.png', label: 'Canada' },
  { file: 'netflix.png', label: 'Netflix' },
  { file: 'a24.png', label: 'A24' },
  { file: 'amazon.png', label: 'Amazon' },
];

const partnerLogos = [
  { file: 'shl.png', label: 'SHL' },
  { file: 'panalux.png', label: 'Panalux' },
  { file: 'tfr.png', label: 'TFR' },
  { file: 'mbs.png', label: 'MBS' },
  { file: 'warner-bros.png', label: 'Warner Bros.' },
  { file: 'universal.png', label: 'Universal' },
];

const certLogos = [
  { file: 'ecs.png', label: 'ECS' },
  { file: 'city-guilds.png', label: 'City & Guilds' },
  { file: 'cscs.png', label: 'CSCS' },
  { file: 'ipaf.png', label: 'IPAF' },
  { file: 'screenskills.png', label: 'ScreenSkills' },
  { file: 'bectu.png', label: 'BECTU' },
];

const TOTAL_SECTIONS = 9;

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const ReefLeft = () => (
  <svg width="22" height="22" viewBox="-1 0 11 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: 'white', flexShrink: 0 }}>
    <path d="M4.53773 22.1444L4.605 22.098C5.02727 22.7755 5.49955 23.4136 6.025 24H7.43045C6.65136 23.2784 5.97182 22.4493 5.39364 21.5395C6.42318 20.7633 6.77 19.1476 6.15682 17.8735L5.92955 17.4011L5.53591 17.6738C4.89182 18.12 4.50636 18.8896 4.42364 19.7127C4.26091 19.3407 4.11273 18.9605 3.98091 18.5711C5.14591 18.1435 5.83136 16.6882 5.51318 15.2645L5.39545 14.7376L4.95636 14.8789C4.23864 15.1096 3.70091 15.732 3.44318 16.5C3.36818 16.0931 3.30864 15.6802 3.26591 15.2624C4.48136 15.2078 5.45455 14.0171 5.45455 12.5455V12H5C4.26 12 3.60864 12.4309 3.19364 13.0882C3.20818 12.6709 3.24091 12.2569 3.28818 11.8456C4.47227 12.1675 5.66682 11.3198 5.98364 9.9L6.10136 9.37309L5.66227 9.23182C4.94818 9.00218 4.22727 9.216 3.685 9.72055C3.78864 9.324 3.90955 8.93509 4.04364 8.55273C5.11773 9.22964 6.45318 8.78236 7.06546 7.50982L7.29273 7.03745L6.89909 6.76473C6.25818 6.32073 5.51455 6.30327 4.88136 6.62345C5.06636 6.27273 5.26727 5.93291 5.48 5.60345C6.37136 6.59345 7.75955 6.57655 8.62636 5.53691L8.94773 5.15127L8.62636 4.76564C8.08818 4.11982 7.34773 3.87218 6.65 4.00909L6.50273 3.81818H6.81818C8.57545 3.81818 10 2.10873 10 0H9.54545C7.83636 0 6.44591 1.61836 6.37091 3.64745L6.05455 3.23836C6.05136 3.24164 6.04864 3.24545 6.04591 3.24873C6.15091 2.42073 5.94455 1.54636 5.41318 0.908727L5.09182 0.523091L4.77045 0.908727C3.88273 1.974 3.88273 3.70036 4.77045 4.76564L4.82773 4.83436C4.55864 5.24291 4.31 5.66891 4.08091 6.10855C4.005 5.27345 3.61682 4.49018 2.96409 4.038L2.57045 3.76527L2.34318 4.23764C1.71545 5.54182 2.08818 7.20982 3.175 7.96309L3.24727 8.01327C3.07545 8.49055 2.92682 8.97927 2.79909 9.47673C2.54636 8.69236 2.00136 8.05527 1.27273 7.82127L0.833636 7.68L0.715909 8.20691C0.390909 9.66164 1.11045 11.1573 2.32318 11.5473L2.40273 11.5729C2.33955 12.0851 2.30045 12.6022 2.28455 13.1231C1.87045 12.4451 1.20773 12 0.454545 12H0V12.5455C0 14.0515 1.01773 15.2727 2.27273 15.2727H2.35227C2.40136 15.7898 2.47409 16.2993 2.56864 16.8011C2.02364 16.2796 1.29091 16.0582 0.566364 16.2911L0.127273 16.4324L0.245 16.9593C0.57 18.414 1.81591 19.2775 3.02864 18.888L3.09909 18.8651C3.25727 19.3456 3.43773 19.8142 3.63909 20.2702C3.00136 19.9385 2.24773 19.9522 1.59955 20.4016L1.20591 20.6744L1.43318 21.1467C2.06091 22.4504 3.45091 22.8976 4.53773 22.1444V22.1444Z" fill="currentColor" />
  </svg>
);

const ReefRight = () => (
  <svg width="22" height="22" viewBox="0 0 10 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: 'white', flexShrink: 0 }}>
    <path d="M7.72727 15.2727C8.98227 15.2727 10 14.0515 10 12.5455V12H9.54545C8.79227 12 8.12955 12.4451 7.71591 13.122C7.7 12.6011 7.66136 12.084 7.59773 11.5718L7.67727 11.5462C8.88955 11.1562 9.60909 9.66109 9.28455 8.20582L9.16682 7.67891L8.72773 7.82018C7.99909 8.05473 7.45409 8.69127 7.20136 9.47564C7.07364 8.97818 6.925 8.48945 6.75318 8.01218L6.82545 7.962C7.91227 7.20873 8.285 5.54073 7.65727 4.23655L7.43 3.76418L7.03636 4.03691C6.38364 4.48909 5.995 5.27236 5.91955 6.10745C5.69045 5.66782 5.44182 5.24182 5.17273 4.83327L5.23 4.76455C6.11773 3.69927 6.11773 1.97291 5.23 0.907636L4.90864 0.522L4.58727 0.907636C4.05591 1.54527 3.84955 2.41964 3.95455 3.24764C3.95136 3.24436 3.94864 3.24055 3.94591 3.23727L3.62955 3.64636C3.55409 1.61836 2.16364 0 0.454545 0H0C0 2.10873 1.42455 3.81818 3.18182 3.81818H3.49727L3.34955 4.00909C2.65182 3.87164 1.91136 4.11982 1.37318 4.76564L1.05182 5.15127L1.37318 5.53691C2.23955 6.57655 3.62773 6.59345 4.51955 5.60345C4.73227 5.93291 4.93318 6.27273 5.11818 6.62345C4.485 6.30327 3.74136 6.32018 3.10045 6.76473L2.70682 7.03745L2.93409 7.50982C3.54636 8.78236 4.88182 9.22964 5.95591 8.55273C6.09046 8.93509 6.21091 9.32455 6.31454 9.72055C5.77227 9.216 5.05136 9.00273 4.33727 9.23182L3.89818 9.37309L4.01591 9.9C4.33273 11.3198 5.52727 12.1675 6.71136 11.8456C6.75909 12.2569 6.79136 12.6709 6.80591 13.0882C6.39136 12.4309 5.74 12 5 12H4.54545V12.5455C4.54545 14.0171 5.51864 15.2078 6.73364 15.2624C6.69091 15.6802 6.63136 16.0931 6.55636 16.5C6.29864 15.732 5.76091 15.1096 5.04318 14.8789L4.60409 14.7376L4.48636 15.2645C4.16864 16.6876 4.85364 18.1429 6.01864 18.5711C5.88682 18.9605 5.73864 19.3407 5.57591 19.7127C5.49318 18.8896 5.10773 18.12 4.46364 17.6738L4.07 17.4011L3.84273 17.8735C3.22954 19.1476 3.57591 20.7633 4.60591 21.5395C4.02818 22.4493 3.34818 23.2784 2.56909 24H3.97455C4.5 23.4136 4.97273 22.7749 5.39455 22.098L5.46182 22.1444C6.54864 22.8976 7.93864 22.4504 8.56636 21.1462L8.79364 20.6738L8.4 20.4011C7.75182 19.9522 6.99818 19.938 6.36045 20.2696C6.56182 19.8136 6.74227 19.3451 6.90045 18.8645L6.97091 18.8875C8.18318 19.2775 9.42955 18.414 9.75455 16.9587L9.87227 16.4318L9.43318 16.2905C8.70864 16.0576 7.97591 16.2791 7.43091 16.8005C7.52545 16.2993 7.59818 15.7893 7.64727 15.2722H7.72727V15.2727Z" fill="currentColor" />
  </svg>
);

export default function AboutPage() {
  const [heroImage, setHeroImage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const navigate = useCallback((direction) => {
    if (isAnimating.current) return;
    const next = Math.max(0, Math.min(TOTAL_SECTIONS - 1, activeIndexRef.current + direction));
    if (next === activeIndexRef.current) return;
    isAnimating.current = true;
    setActiveIndex(next);
    setTimeout(() => { isAnimating.current = false; }, 850);
  }, []);

  // Fetch hero image
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await client.fetch(`*[_type == "project" && isHeroProject == true && defined(coverImage)]`);
        if (data.length > 0) {
          const pick = data[Math.floor(Math.random() * data.length)];
          setHeroImage(urlFor(pick.coverImage)?.width(1200).quality(80).auto('format').url() ?? '');
        } else {
          const fallback = await client.fetch(`*[_type == "project" && defined(coverImage)][0]`);
          if (fallback) setHeroImage(urlFor(fallback.coverImage)?.url() ?? '');
        }
      } catch (err) {
        console.error('Hero Fetch Error:', err);
      }
    };
    fetchHero();
  }, []);

  // Desktop wheel navigation only
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 10) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate, isMobile]);

  // Desktop keyboard navigation only
  useEffect(() => {
    if (isMobile) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, isMobile]);

  return (
    <main
      onContextMenu={(e) => e.preventDefault()}
      style={{
        backgroundColor: 'black',
        height: isMobile ? 'auto' : '100vh',
        width: '100%',
        position: 'relative',
        overflow: isMobile ? 'visible' : 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', display: 'flex', justifyContent: 'center' }}>
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

      {/* Slide container */}
      <div
        className="master-container"
        style={{ transform: isMobile ? 'none' : `translateY(-${activeIndex * 100}dvh)` }}
      >

        {/* SLIDE 1: PORTRAIT */}
        <section className="snap-section">
          <div className="container-base" style={{ height: isMobile ? 'auto' : '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: isMobile ? '100px' : '0', paddingBottom: isMobile ? '60px' : '0' }}>
            <motion.div
              initial={{ clipPath: 'inset(99% 49% 0% 49% round 100px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 40px)' }}
              viewport={{ once: true }}
              transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ width: '100%', maxWidth: '500px', aspectRatio: '3 / 4', backgroundColor: '#0D0D0D', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            >
              <motion.img
                fetchPriority="high"
                decoding="async"
                width="500"
                height="667"
                draggable="false"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
                src="/images/headshot.jpg"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt="Portrait of Mark A. Lane, Gaffer and Lighting Technician"
              />
            </motion.div>
          </div>
        </section>

        {/* SLIDE 2: STATEMENT */}
        <section className="snap-section">
          <div className="container-base" style={{ textAlign: 'center', paddingTop: isMobile ? '60px' : '0', paddingBottom: isMobile ? '60px' : '0' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(32px, 4vw, 54px)', textTransform: 'none', lineHeight: 1.2 }}>
              Mark A. Lane is a{' '}
              <motion.span
                className="text-strike-light"
                initial={{ opacity: 0, color: 'rgba(255,255,255,0)', textShadow: '0 0 0px rgba(255,140,0,0)' }}
                whileInView={{
                  opacity: [0, 0.1, 0.05, 0.6, 0.3, 1],
                  color: ['rgba(255,255,255,0)', 'rgba(255,180,80,0.4)', 'rgba(255,180,80,0.1)', '#FFFFFF', 'rgba(255,180,80,0.4)', '#FFFFFF'],
                  textShadow: ['0 0 0px rgba(255,140,0,0)', '0 0 20px rgba(255,140,0,0.6)', '0 0 5px rgba(255,140,0,0.2)', '0 0 50px rgba(255,255,255,1)', '0 0 30px rgba(255,140,0,0.6)', '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #FF8800, 0 0 80px #FF8800, 0 0 120px #FF8800, 0 0 180px #FF8800'],
                }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.8, ease: 'linear', times: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 1] }}
              >
                Gaffer &amp; Lighting Technician
              </motion.span>{' '}
              based in London.
            </h2>
          </div>
        </section>

        {/* SLIDE 3: BIO */}
        <section className="snap-section">
          <div className="container-base" style={{ paddingTop: isMobile ? '60px' : '0', paddingBottom: isMobile ? '60px' : '0' }}>
            <div className="mobile-stack-bio" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '100px', alignItems: 'center' }}>
              <div className="mobile-bio-img" style={{ width: '100%', maxWidth: '380px', aspectRatio: '4/5', background: '#111', borderRadius: '24px', overflow: 'hidden' }}>
                <img
                  width="380"
                  height="475"
                  decoding="async"
                  draggable="false"
                  src="/images/set-photo.jpg"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt="Mark A. Lane working on set"
                  loading="lazy"
                />
              </div>
              <div style={{ color: 'white' }}>
                <p style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', marginBottom: '30px' }}>
                  Specialising in Narrative, Commercial and Music productions.
                </p>
                <p style={{ color: 'rgba(239,239,239,1)', lineHeight: '1.6', marginBottom: '20px' }}>
                  With over nine years of experience, Mark has built a reputation for technical precision and seamless creative collaboration. He has worked with award-winning Cinematographers and Directors on projects of every scale, prioritising quality and safety above all else. Supported by a dedicated team and a reliable network of suppliers, he handles any brief or budget with a results-driven approach. From high-end features to lean commercials.
                </p>
                <p style={{ color: 'rgba(239,239,239,1)', lineHeight: '1.6' }}>Your project is the mission.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDES 4-5: AWARDS & PRESS */}
        {[
          { title: 'Awards', data: awards, type: 'awards' },
          { title: 'Press', data: press, type: 'press' },
        ].map((section, idx) => (
          <section key={idx} className="snap-section">
            <div className="container-base" style={{ paddingTop: isMobile ? '60px' : '0', paddingBottom: isMobile ? '60px' : '0' }}>
              <div className="container-responsive">
                <h2 className="external-title" style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}>{section.title}</h2>
                <motion.div variants={containerVars} initial="hidden" whileInView="show">
                  {section.data.map((item, i) => {
                    const isLink = section.type === 'press' && item.url;
                    const Component = isLink ? motion.a : motion.div;
                    return (
                      <Component
                        variants={itemVars}
                        key={i}
                        href={isLink ? item.url : undefined}
                        target={isLink ? '_blank' : undefined}
                        rel={isLink ? 'noopener noreferrer' : undefined}
                        className="list-item-row"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid #222', color: 'white', textDecoration: 'none', cursor: isLink ? 'pointer' : 'default' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {section.type === 'awards' && <ReefLeft />}
                          <span style={{ fontSize: '1rem', color: 'white' }}>{item.category || item.title}</span>
                          {section.type === 'awards' && <ReefRight />}
                        </div>
                        <span className="list-item-meta" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {item.festival ? `${item.festival} — ${item.year}` : item.outlet}
                        </span>
                      </Component>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* SLIDES 6-8: LOGO GRIDS */}
        {[
          { title: 'Clients', data: clientLogos, cols: 5, maxWidth: '900px' },
          { title: 'Partners & Suppliers', data: partnerLogos, cols: 3, maxWidth: '600px' },
          { title: 'Certifications', data: certLogos, cols: 3, maxWidth: '600px' },
        ].map((section, idx) => (
          <section key={idx} className="snap-section">
            <div className="container-base" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: isMobile ? '60px' : '0', paddingBottom: isMobile ? '60px' : '0' }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="external-title"
                style={{ fontSize: 'clamp(40px, 8vw, 90px)', marginBottom: '60px', textAlign: 'center' }}
              >
                {section.title}
              </motion.h2>
              <motion.div
                variants={containerVars}
                initial="hidden"
                whileInView="show"
                className={`logo-grid ${section.cols === 3 ? 'partner-grid' : ''}`}
                style={{ maxWidth: section.maxWidth, margin: '0 auto' }}
              >
                {section.data.map((logo, i) => (
                  <motion.div variants={itemVars} key={i} className="logo-box">
                    <img
                      width="120"
                      height="120"
                      decoding="async"
                      loading="lazy"
                      draggable="false"
                      src={`/images/logos/${logo.file}`}
                      className="logo-img"
                      alt={`${logo.label} logo`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        ))}

        {/* SLIDE 9: CONTACT */}
        <section className="snap-section">
          <div className="contact-slide-inner" style={{ height: isMobile ? 'auto' : '100vh', width: '100%', padding: '64px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ clipPath: 'inset(99% 49% 0% 49% round 100px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 40px)' }}
              viewport={{ once: false }}
              transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: isMobile ? '80vh' : '100%', backgroundColor: '#111', borderRadius: '40px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              {heroImage && (
                <motion.img
                  decoding="async"
                  width="1920"
                  height="1080"
                  draggable="false"
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                  src={heroImage}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  alt="Cinematic lighting background"
                />
              )}
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(48px, 10vw, 140px)', marginBottom: '40px', textTransform: 'lowercase', lineHeight: '0.85' }}
                >
                  let&apos;s work<br />together.
                </motion.h2>
                <EmailCopy />
              </div>
              <footer className="footer-responsive">
                <div>London / UK</div>
                <div>© 2026 Lane Lighting</div>
              </footer>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}