'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import type { Member } from '@/data-portal'
import { useState } from 'react'

export function OrderCardModal({
  open,
  member,
  onClose,
  onConfirm,
}: {
  open: boolean
  member: Member
  onClose: () => void
  onConfirm: () => void
}) {
  const [reason, setReason] = useState('Lost or stolen')

  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <DialogTitle>Order new card — {member.firstName}</DialogTitle>
      <DialogDescription>
        Replacement cards arrive within 5–7 business days. A $10 replacement fee may apply.
      </DialogDescription>
      <DialogBody className="space-y-4">
        <Field>
          <Label>Reason for new card</Label>
          <Select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option>Lost or stolen</option>
            <option>Damaged</option>
            <option>Never received</option>
            <option>Updated photo</option>
          </Select>
        </Field>
        <Field>
          <Label>Mailing address</Label>
          <Textarea rows={2} defaultValue="23 Kubis Av, Aspendale VIC 3195" />
        </Field>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Order card</Button>
      </DialogActions>
    </Dialog>
  )
}
