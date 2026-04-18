import localFont from 'next/font/local'
import SmoothScroll from '@/components/SmoothScroll'
import "./globals.css";
import PageTransition from '@/components/PageTransition';

// --- FONT CONFIGURATION ---
const squareSansDisplay = localFont({
  src: [
    { path: '../public/fonts/SquareSansDisplay-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/SquareSansDisplay-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/SquareSansDisplay-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap', // <--- ADD THIS FOR PERFORMANCE
})

const squareSansText = localFont({
  src: [
    { path: '../public/fonts/SquareSansText-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/SquareSansText-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/SquareSansText-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/SquareSansText-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/SquareSansText-BoldItalic.otf', weight: '700', style: 'italic' },
  ],
  variable: '--font-text',
  display: 'swap', // <--- ADD THIS FOR PERFORMANCE
})

export const metadata = {
  title: {
    default: "Mark A. Lane | Gaffer & Lighting Technician | London",
    template: "%s | Mark A. Lane"
  },
  description: "Professional Gaffer and Lighting Technician based in London. Specializing in high-end Narrative, Commercial, and Music Video lighting.",
  keywords: ["Gaffer", "London Gaffer", "Lighting Technician", "Film Lighting", "Mark A Lane", "Cinematography"],
  metadataBase: new URL('https://mark-lane.co.uk'),  
  
  // --- ADD THIS LINE HERE ---
  verification: {
    google: 'F48DdKNsdyL3gvU_KM5BqyXlJyTezMBaugzmaJJa0Lo', 
  },
  // --------------------------

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },

  openGraph: {
    title: 'Mark A. Lane | Gaffer & Lighting Technician',
    description: 'London-based Gaffer for Narrative, Commercial, and Music Videos.',
    url: 'https://mark-lane.co.uk',
    siteName: 'Mark A. Lane Lighting',
    locale: 'en_GB',
    type: 'website',
    // Note: Because you have opengraph-image.webp in your folder, 
    // Next.js will automatically handle the 'images' property for you!
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mark A. Lane",
    "jobTitle": "Gaffer",
    "url": "https://mark-lane.co.uk",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "UK"
    },
    "sameAs": [
      "https://instagram.com/mark.lane_" 
    ],
    "knowsAbout": ["Lighting Design", "Cinematography", "Film Production", "Gaffing"]
  };

  return (
    <html lang="en" className={`${squareSansDisplay.variable} ${squareSansText.variable}`} style={{ backgroundColor: 'black' }}>
      <head>
        {/* MANUAL PRECONNECT FOR PERFORMANCE */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ backgroundColor: 'black', margin: 0 }}>
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}