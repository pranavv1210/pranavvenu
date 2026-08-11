import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

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
  metadataBase: new URL('https://pranav-portfolio.vercel.app'),
  title: 'Pranav V. - Builder, Engineer, Creative Technologist',
  description:
    'Portfolio of Pranav V., an AI/ML engineer and full-stack builder creating AI products, mobile systems, data workflows, and automation experiments.',
  openGraph: {
    title: 'Pranav V. - Builder, Engineer, Creative Technologist',
    description: 'AI, full-stack, mobile, data, and automation builds by Pranav V.',
    url: '/',
    siteName: 'Pranav V.',
    images: [{ url: '/logo512.png', width: 512, height: 512, alt: 'Pranav V. portfolio mark' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav V. - Builder, Engineer, Creative Technologist',
    description: 'AI, full-stack, mobile, data, and automation builds by Pranav V.',
    images: ['/logo512.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#08090B',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  )
}
