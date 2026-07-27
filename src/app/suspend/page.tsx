import type { Metadata } from 'next'
import { SuspendScreen } from './suspend-screen'

export const metadata: Metadata = {
  title: 'Suspend Membership',
}

export default function SuspendPage() {
  return <SuspendScreen />
}
