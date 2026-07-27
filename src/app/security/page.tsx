import type { Metadata } from 'next'
import { SecurityScreen } from './security-screen'

export const metadata: Metadata = {
  title: 'Security',
}

export default function SecurityPage() {
  return <SecurityScreen />
}
