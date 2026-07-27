import type { Metadata } from 'next'
import { DashboardScreen } from './dashboard-screen'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Home() {
  return <DashboardScreen />
}
