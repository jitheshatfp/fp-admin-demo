import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fitness Passport',
    short_name: 'Fitness Passport',
    description: 'Manage your Fitness Passport membership, visits, and payments.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2388f1',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
