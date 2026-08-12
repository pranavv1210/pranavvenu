import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { profile } from '@/lib/profile'
import './globals.css'

const siteUrl = 'https://pranavvenu.vercel.app'
const seoTitle = 'Pranav Venu | CMRIT AI/ML Engineer & Creative Frontend Builder'
const seoDescription =
  'Portfolio of Pranav Venu, an AI/ML engineering student at CMR Institute of Technology, Bengaluru, building computer vision, deep learning, full-stack, mobile, and futuristic UI websites.'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: '%s | Pranav Venu',
  },
  description: seoDescription,
  applicationName: 'Pranav Venu Portfolio',
  authors: [{ name: 'Pranav Venu', url: siteUrl }],
  creator: 'Pranav Venu',
  publisher: 'Pranav Venu',
  category: 'Portfolio',
  keywords: [
    'Pranav Venu',
    'Pranav V',
    'Pranav Venu Bengaluru',
    'Pranav Venu Bangalore',
    'Pranav Venu Blore',
    'Pranav Venu CMRIT',
    'CMR Institute of Technology AI ML',
    'AI ML engineer Bengaluru',
    'machine learning engineer',
    'computer vision engineer',
    'deep learning portfolio',
    'creative frontend developer',
    'futuristic UI websites',
    'React developer Bengaluru',
    'Next.js portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'fwZF59IhKAU-zvRACFlmIV_4cSjMdSgDUTUCncZ6LY0',
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: '/',
    siteName: 'Pranav Venu Portfolio',
    images: [{ url: '/logo512.png', width: 512, height: 512, alt: 'Pranav V. portfolio mark' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: ['/logo512.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/logo192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#08090B',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    alternateName: ['Pranav V.', 'Pranav V', 'Pranav Venu Blore', 'Pranav Venu CMRIT'],
    url: siteUrl,
    image: `${siteUrl}/photo.png`,
    email: profile.email,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'CMR Institute of Technology',
      sameAs: 'https://www.cmrit.ac.in/',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'CMR Institute of Technology',
    },
    jobTitle: 'Machine Learning Engineer and Creative Frontend Builder',
    description: profile.summary,
    knowsAbout: profile.resumeSkills,
    sameAs: [profile.github, profile.linkedin],
    hasCredential: profile.education.map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.label,
      credentialCategory: item.detail,
      recognizedBy: item.meta,
    })),
    subjectOf: {
      '@type': 'CreativeWork',
      name: 'Pranav Venu Portfolio',
      url: siteUrl,
    },
  }

  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable} scroll-smooth`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  )
}
