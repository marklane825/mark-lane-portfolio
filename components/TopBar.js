'use client';

import { useState } from 'react';

export default function TopBar() {
  const [copied, setCopied] = useState(false);
  const email = 'hello@markalane.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-base" style={{
      position: 'fixed', 
      top: 0, left: 0, right: 0, 
      height: '32px', 
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      zIndex: 1100,
      borderBottom: '1px solid #111'
    }}>
      <button 
        onClick={handleCopy}
        style={{
          background: 'none',
          border: 'none',
          color: copied ? 'white' : '#666',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-text)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          cursor: 'copy',
          padding: '0 16px',
          transition: 'color 0.2s ease',
        }}
      >
        {copied ? 'Email copied to clipboard' : email}
      </button>
    </div>
  );
}