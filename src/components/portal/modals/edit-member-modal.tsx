'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Field, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import type { Member } from '@/data-portal'
import Image from 'next/image'
import { useState } from 'react'

export function EditMemberModal({
  open,
  member,
  onClose,
  onSave,
}: {
  open: boolean
  member: Member
  onClose: () => void
  onSave: () => void
}) {
  const [gender, setGender] = useState('Male')
  const [state, setState] = useState('VIC')

  return (
    <Dialog open={open} onClose={onClose} size="2xl">
      <DialogTitle>Personal Details</DialogTitle>
      <DialogBody className="space-y-8">
        <Fieldset>
          <Legend>Personal Details</Legend>
          <div className="mt-4 flex gap-6">
            <div className="flex w-32 flex-none flex-col items-center gap-2">
              <Image
                src={member.photo}
                alt=""
                width={128}
                height={128}
                className="size-32 rounded-xl border border-zinc-950/10 object-cover dark:border-white/10"
              />
              <Button color="red" className="text-xs">
                Upload photo
              </Button>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4">
              <Field>
                <Label>First Name</Label>
                <Input defaultValue={member.firstName} disabled />
              </Field>
              <Field>
                <Label>Last Name</Label>
                <Input defaultValue={member.lastName} disabled />
              </Field>
              <Field>
                <Label>Gender</Label>
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </Select>
              </Field>
              <Field>
                <Label>Date of Birth</Label>
                <Input type="date" defaultValue="1987-11-24" />
              </Field>
              <Field>
                <Label>Membership Status</Label>
                <Input defaultValue="Active" disabled />
              </Field>
              <Field>
                <Label>Member Number</Label>
                <Input defaultValue={`FPT.${member.memberNumber}`} disabled />
              </Field>
            </div>
          </div>
        </Fieldset>

        <Fieldset>
          <Legend>Address &amp; Contact</Legend>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Field>
              <Label>Mobile</Label>
              <Input defaultValue="450722733" />
            </Field>
            <Field>
              <Label>Primary Email</Label>
              <Input type="email" defaultValue="jithesh@fitnesspassport.com.au" />
            </Field>
            <Field>
              <Label>Address 1</Label>
              <Input defaultValue="23 Kubis Av" />
            </Field>
            <Field>
              <Label>Suburb</Label>
              <Input defaultValue="Aspendale" />
            </Field>
            <Field>
              <Label>Postcode</Label>
              <Input defaultValue="3195" />
            </Field>
            <Field>
              <Label>State</Label>
              <Select value={state} onChange={(e) => setState(e.target.value)}>
                {['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>
        </Fieldset>

        <Fieldset>
          <Legend>Emergency Contact</Legend>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Field>
              <Label>Name</Label>
              <Input defaultValue="Priya Delgado" />
            </Field>
            <Field>
              <Label>Relationship</Label>
              <Input defaultValue="Partner" />
            </Field>
            <Field>
              <Label>Phone</Label>
              <Input defaultValue="414982232" />
            </Field>
          </div>
        </Fieldset>

        <Fieldset>
          <Legend>Preferred Facilities</Legend>
          <Field className="mt-4">
            <Label>Favoured Facility / Gym</Label>
            <Input defaultValue="Goodlife Health Club — Sandringham" />
          </Field>
        </Fieldset>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={onClose}>
          Back
        </Button>
        <Button onClick={onSave}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
