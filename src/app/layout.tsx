import '@/styles/tailwind.css'
import type { Metadata, Viewport } from 'next'
import type React from 'react'
import { ApplicationLayout } from './application-layout'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const DESCRIPTION = 'Manage your Fitness Passport membership, visits, and payments.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s - Fitness Passport',
    default: 'Fitness Passport',
  },
  description: DESCRIPTION,
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fitness Passport',
  },
  openGraph: {
    type: 'website',
    siteName: 'Fitness Passport',
    title: 'Fitness Passport',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitness Passport',
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#2388f1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ApplicationLayout>{children}</ApplicationLayout>
      </body>
    </html>
  )
}
