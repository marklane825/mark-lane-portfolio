'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const email = 'contact@mark-lane.co.uk';
  const whatsappUrl = 'https://wa.me/447957010154';

  const rollDistance = 24; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelStyle = {
    height: `${rollDistance}px`,
    color: '#fff',
    fontSize: '1rem',
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
      {/* Rolling label */}
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

      {/* Email copy button */}
      <motion.button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCopy}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'none',
          border: '1px solid #222',
          borderRadius: '16px',
          padding: '24px 48px',
          color: '#fff',
          fontSize: '1.25rem',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.02em',
          cursor: 'copy',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          backgroundColor: copied ? '#111' : (isHovered ? '#0a0a0a' : 'transparent'),
          borderColor: copied ? '#444' : (isHovered ? '#333' : '#222'),
          outline: 'none'
        }}
      >
        {email}
      </motion.button>

      {/* WhatsApp button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        whileHover={{ borderColor: '#444', color: '#fff', backgroundColor: '#0a0a0a' }}
        style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'none',
          border: '1px solid #222',
          borderRadius: '16px',
          padding: '16px 48px',
          color: '#fff',
          fontSize: '1rem',
          fontFamily: 'var(--font-text)',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        WhatsApp
      </motion.a>

    </div>
  );
}