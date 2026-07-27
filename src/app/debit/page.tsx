import type { Metadata } from 'next'
import { DirectDebitScreen } from './direct-debit-screen'

export const metadata: Metadata = {
  title: 'Direct Debit',
}

export default function DebitPage() {
  return <DirectDebitScreen />
}
