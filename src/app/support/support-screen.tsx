'use client'

import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import { ContactRow, PageHero, SectionHeader } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import {
  ArrowsRightLeftIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  CreditCardIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PauseCircleIcon,
  PhoneIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
} from '@/components/material-icons'
import { useState } from 'react'

const ARTICLES = [
  ['How do I upload a new photo?', PhotoIcon],
  ['Why was my visit declined at a facility?', QuestionMarkCircleIcon],
  ['Updating my payment details', CreditCardIcon],
  ['Transferring to a new employer', ArrowsRightLeftIcon],
  ['Suspending my membership', PauseCircleIcon],
] as const

export function SupportScreen() {
  const { toasts, addToast } = usePortalToasts()
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [ticket, setTicket] = useState(0)

  return (
    <div>
      <PageHero eyebrow="Account" title="Customer support" subtitle="We're here to help. Real humans, AEST business hours." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader title="Send us a message" />
          {sent ? (
            <div className="p-7.5 text-center">
              <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
                <ChatBubbleLeftRightIcon className="size-7" />
              </div>
              <h3 className="mt-0 mb-1 text-zinc-950 dark:text-white">Message sent</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Ticket #FP-{ticket} — we&apos;ll reply within 1 business day.
              </p>
              <Button
                outline
                className="mt-3.5 text-xs"
                onClick={() => {
                  setSent(false)
                  setTopic('')
                  setMessage('')
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <>
              <Field>
                <Label>Topic</Label>
                <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="">Choose a topic</option>
                  <option>Membership question</option>
                  <option>Payment / billing</option>
                  <option>Photo / card issue</option>
                  <option>Facility complaint</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field className="mt-4">
                <Label>Message</Label>
                <Textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what's going on…" />
              </Field>
              <Field className="mt-4">
                <Label>Attach a file</Label>
                <Button outline className="w-fit text-xs">
                  <PaperClipIcon /> Browse
                </Button>
              </Field>
              <Button
                className="mt-3.5"
                disabled={!topic || !message}
                onClick={() => {
                  setTicket(Math.floor(Math.random() * 9000 + 1000))
                  setSent(true)
                }}
              >
                <PaperAirplaneIcon /> Send message
              </Button>
            </>
          )}
        </div>

        <div className="grid gap-3 self-start">
          <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
            <SectionHeader title="Get in touch" />
            <ContactRow icon={PhoneIcon} title="Call us" sub="1800 099 988 · Mon–Fri, 9am–5pm AEST" />
            <ContactRow icon={EnvelopeIcon} title="Email" sub="support@fitnesspassport.com.au" />
            <ContactRow
              icon={ChatBubbleLeftRightIcon}
              title="Live chat"
              sub="Online now · usual reply in 2 min"
              cta="Start chat"
              onCta={() => addToast('Connecting you with a support agent…')}
            />
          </div>

          <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
            <SectionHeader title="Popular help articles" />
            {ARTICLES.map(([t, Icon]) => (
              <a
                key={t}
                href="#"
                className="flex items-center gap-2 border-b border-zinc-950/10 py-2 no-underline last:border-b-0 dark:border-white/10"
              >
                <Icon className="size-3.5 flex-none text-fp-blue" />
                <span className="flex-1 text-sm font-medium text-zinc-950 dark:text-white">{t}</span>
                <ChevronRightIcon className="size-3.5 flex-none text-zinc-500 dark:text-zinc-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}
