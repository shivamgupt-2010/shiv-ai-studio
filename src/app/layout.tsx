import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShivBrandIntro from '@/components/common/ShivBrandIntro';

export const viewport: Viewport = {
  themeColor: '#07090e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://shiv-ai.vercel.app'),
  title: {
    default: 'SHIV AI — Sovereign Multimodal Intelligence & Developer Studio',
    template: '%s | SHIV AI',
  },
  description:
    'Sovereign Multimodal Artificial Intelligence Platform by SHIV Systems. Ultra low-latency chat, cinematic FLUX vision generation, neural human voice synthesis, and real-time developer API keys.',
  keywords: [
    'SHIV AI',
    'SHIV Systems',
    'Sovereign AI',
    'Multimodal AI',
    'AI Studio',
    'AI Playground',
    'Developer API',
    'FLUX Vision',
    'Neural Voice',
    'Code Generator',
    'AI Key Management',
  ],
  authors: [{ name: 'Shivam Gupta', url: 'https://shiv-ai.vercel.app' }],
  creator: 'SHIV Systems',
  publisher: 'SHIV Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shiv-ai.vercel.app',
    siteName: 'SHIV AI Platform',
    title: 'SHIV AI — Sovereign Multimodal Intelligence & Developer Studio',
    description:
      'Experience next-generation sovereign AI. Explore the interactive studio, generate high-fidelity images, synthesize neural voices, and manage developer API keys.',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'SHIV AI Sovereign Monogram Badge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHIV AI — Sovereign Multimodal Intelligence & Developer Studio',
    description:
      'Sovereign Multimodal Artificial Intelligence Platform by SHIV Systems. Interactive Playground, API Keys, and Enterprise Reliability.',
    images: ['/icon.svg'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SHIV AI Studio',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Sovereign Artificial Intelligence Studio and multimodal developer platform providing chat, FLUX vision generation, and neural speech synthesis.',
        creator: {
          '@type': 'Organization',
          name: 'SHIV Systems',
          url: 'https://shiv-ai.vercel.app',
        },
      },
      {
        '@type': 'WebSite',
        name: 'SHIV AI',
        url: 'https://shiv-ai.vercel.app',
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Startup Brand Intro Animation from shiv web */}
        <ShivBrandIntro />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Application Body */}
        <main style={{ minHeight: '80vh', paddingTop: '4.5rem' }}>
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
