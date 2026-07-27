import type { Metadata } from 'next'
import { SupportScreen } from './support-screen'

export const metadata: Metadata = {
  title: 'Customer Support',
}

export default function SupportPage() {
  return <SupportScreen />
}
