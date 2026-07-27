import type { Metadata } from 'next'
import { PaymentsScreen } from './payments-screen'

export const metadata: Metadata = {
  title: 'Payment History',
}

export default function PaymentsPage() {
  return <PaymentsScreen />
}
