import type { Metadata } from 'next'
import { PhotosScreen } from './photos-screen'

export const metadata: Metadata = {
  title: 'Membership Photos',
}

export default function PhotosPage() {
  return <PhotosScreen />
}
