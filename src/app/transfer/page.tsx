import type { Metadata } from 'next'
import { TransferScreen } from './transfer-screen'

export const metadata: Metadata = {
  title: 'Employer Transfer',
}

export default function TransferPage() {
  return <TransferScreen />
}
