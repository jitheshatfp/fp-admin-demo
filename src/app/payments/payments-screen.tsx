'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Input, InputGroup } from '@/components/input'
import { PageHero, SectionHeader, StatCard } from '@/components/portal/portal-ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import { PAYMENT_HISTORY } from '@/data-portal'
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  CheckCircleIcon,
  CreditCardIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@/components/material-icons'

export function PaymentsScreen() {
  const { toasts, addToast } = usePortalToasts()
  const total = PAYMENT_HISTORY.reduce((a, b) => a + b.amount, 0)

  return (
    <div>
      <PageHero eyebrow="Payments & Contracts" title="Payment history" subtitle="Receipts, invoices and upcoming charges." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={CalendarIcon} label="Next payment" value="$70.00" sub="2 Jun 2026" tone="info" />
        <StatCard icon={CheckCircleIcon} label="Paid this year" value={`$${total.toFixed(2)}`} sub={`${PAYMENT_HISTORY.length} payments`} tone="success" />
        <StatCard icon={ArrowPathIcon} label="Cycle" value="Fortnightly" sub="$70.00 / cycle" />
        <StatCard icon={CreditCardIcon} label="Method" value="Direct debit" sub="•••• 0000" />
      </div>

      <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
        <SectionHeader
          title="Recent payments"
          action={
            <div className="flex gap-2">
              <InputGroup>
                <MagnifyingGlassIcon data-slot="icon" />
                <Input aria-label="Search invoices" className="w-50" placeholder="Search invoices" />
              </InputGroup>
              <Button outline className="text-xs">
                <ArrowDownTrayIcon /> Export
              </Button>
            </div>
          }
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>From</TableHeader>
              <TableHeader>To</TableHeader>
              <TableHeader>Reference</TableHeader>
              <TableHeader>Method</TableHeader>
              <TableHeader className="text-right">Amount</TableHeader>
              <TableHeader>
                <span className="sr-only">Actions</span>
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {PAYMENT_HISTORY.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{p.from}</TableCell>
                <TableCell>{p.to}</TableCell>
                <TableCell className="font-mono text-sm">{p.ref}</TableCell>
                <TableCell>
                  <Badge>Direct debit</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">${p.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Button plain aria-label="Download invoice" onClick={() => addToast(`Downloading ${p.ref}.pdf…`)}>
                    <ArrowDownTrayIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}
