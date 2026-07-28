'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PageHero, SectionHeader } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import { ArrowDownTrayIcon, DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/16/solid'

export function ContractsScreen() {
  const { toasts, addToast } = usePortalToasts()

  return (
    <div>
      <PageHero eyebrow="Payments & Contracts" title="Your contract" subtitle="Membership term, terms & conditions and renewal info." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader title="Contract details" />
          <div className="grid grid-cols-[180px_1fr] items-center gap-3.5">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Minimum contract duration</span>
            <Input aria-label="Minimum contract duration" value="12 months" disabled />

            <span className="text-sm text-zinc-500 dark:text-zinc-400">Contract start date</span>
            <Input aria-label="Contract start date" value="26 Oct 2025" disabled />

            <span className="text-sm text-zinc-500 dark:text-zinc-400">Contract end date</span>
            <Input aria-label="Contract end date" value="26 Oct 2026" disabled />

            <span className="text-sm text-zinc-500 dark:text-zinc-400">Auto-renew</span>
            <div className="flex items-center gap-2">
              <Badge color="green">Enabled</Badge>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Renews fortnightly after term end</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => addToast('Opening Terms & Conditions…')}>
              <DocumentTextIcon /> View T&amp;Cs
            </Button>
            <Button outline onClick={() => addToast('Downloading contract PDF…')}>
              <ArrowDownTrayIcon /> Download contract
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-fp-blue/10 p-5">
          <InformationCircleIcon className="size-5 text-fp-blue" />
          <h2 className="mt-2 mb-1 text-sm font-bold text-zinc-950 dark:text-white">Cancel anytime after your term</h2>
          <p className="mt-0 mb-3 text-sm text-zinc-600 dark:text-zinc-300">
            Your contract runs until 26 Oct 2026. After that you&apos;re on a rolling fortnightly cycle — cancel any time with 14
            days notice.
          </p>
          <Button outline className="text-xs">
            Request cancellation
          </Button>
        </div>
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}
