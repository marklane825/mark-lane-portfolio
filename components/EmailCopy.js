'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const email = 'contact@mark-lane.co.uk';

  // We increased font size, so we must increase the "roll" distance
  // line-height (20px) + gap/margin = 24px per jump
  const rollDistance = 24; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelStyle = {
    height: `${rollDistance}px`,
    color: '#fff',
    fontSize: '1rem', // Slightly bigger label
    textTransform: 'none',
    fontFamily: 'var(--font-text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '120px',
        marginTop: '80px' 
      }}
    >
      {/* THE ROLLING MASK */}
      <div style={{ 
        height: `${rollDistance}px`, 
        overflow: 'hidden', 
        marginBottom: '20px',
        position: 'relative',
        pointerEvents: 'none'
      }}>
        <motion.div
          animate={{ y: copied ? -(rollDistance * 2) : (isHovered ? -rollDistance : 0) }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 22,
            mass: 0.8
          }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <span style={labelStyle}>Get in touch</span>
          <span style={labelStyle}>Click to copy</span>
          <span style={{...labelStyle, color: 'white', fontWeight: '600'}}>Copied ✨</span>
        </motion.div>
      </div>

      {/* THE BOX (The Bigger, Brand-Font Version) */}
      <motion.button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCopy}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'none',
          border: '1px solid #222',
          borderRadius: '16px', // Slightly rounder for the larger size
          padding: '24px 48px', // More generous padding
          color: isHovered || copied   ? '#fff' : '#fff',
          fontSize: '1.25rem', // Bolder, larger email
          fontFamily: 'var(--font-display)', // Switch to your Display font
          letterSpacing: '-0.02em', // Tight display spacing
          cursor: 'copy',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          backgroundColor: copied ? '#111' : (isHovered ? '#0a0a0a' : 'transparent'),
          borderColor: copied ? '#444' : (isHovered ? '#333' : '#222'),
          outline: 'none'
        }}
      >
        {email}
      </motion.button>
    </div>
  );
}