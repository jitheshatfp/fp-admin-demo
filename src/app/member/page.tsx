import type { Metadata } from 'next'
import { MemberDetailsScreen } from './member-details-screen'

export const metadata: Metadata = {
  title: 'Member Details',
}

export default function MemberPage() {
  return <MemberDetailsScreen />
}
