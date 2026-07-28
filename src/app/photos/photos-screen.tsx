'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { OrderCardModal } from '@/components/portal/modals/order-card-modal'
import { UploadPhotoModal } from '@/components/portal/modals/upload-photo-modal'
import { PageHero } from '@/components/portal/portal-ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import { FAMILY, type Member } from '@/data-portal'
import { ArrowUpTrayIcon, CubeIcon, NoSymbolIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useState } from 'react'

export function PhotosScreen() {
  const { toasts, addToast } = usePortalToasts()
  const [uploadTarget, setUploadTarget] = useState<Member | null>(null)
  const [orderTarget, setOrderTarget] = useState<Member | null>(null)

  return (
    <div>
      <PageHero
        eyebrow="Manage Membership"
        title="Membership Photos"
        subtitle="Upload a photo for each card. Cards without photos can't be scanned at facilities."
      />

      <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Member</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Member #</TableHeader>
              <TableHeader>Card</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Photo</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {FAMILY.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-semibold text-zinc-950 dark:text-white">{m.name}</TableCell>
                <TableCell>
                  <Badge>{m.role}</Badge>
                </TableCell>
                <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">FPT.{m.memberNumber}</TableCell>
                <TableCell className="font-mono text-sm">{m.memberId}</TableCell>
                <TableCell>
                  <Badge color="green">Active</Badge>
                </TableCell>
                <TableCell>
                  <Image
                    src={m.photo}
                    alt=""
                    width={56}
                    height={70}
                    className="h-17.5 w-14 rounded-lg border border-zinc-950/10 object-cover dark:border-white/10"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button outline className="text-xs" onClick={() => setUploadTarget(m)}>
                      <ArrowUpTrayIcon /> Upload
                    </Button>
                    <Button plain className="text-xs" onClick={() => setOrderTarget(m)}>
                      <CubeIcon /> Order new card
                    </Button>
                    <Button
                      plain
                      className="text-xs text-red-600 dark:text-red-400"
                      onClick={() => addToast('Card reported lost/stolen — a replacement is being prepared.')}
                    >
                      <NoSymbolIcon /> Lost / stolen
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {uploadTarget && (
        <UploadPhotoModal
          open
          member={uploadTarget}
          onClose={() => setUploadTarget(null)}
          onSave={() => {
            setUploadTarget(null)
            addToast('Photo uploaded.')
          }}
        />
      )}
      {orderTarget && (
        <OrderCardModal
          open
          member={orderTarget}
          onClose={() => setOrderTarget(null)}
          onConfirm={() => {
            setOrderTarget(null)
            addToast('New card ordered.')
          }}
        />
      )}
      <ToastStack toasts={toasts} />
    </div>
  )
}
