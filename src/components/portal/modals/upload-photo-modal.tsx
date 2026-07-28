'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import type { Member } from '@/data-portal'
import { ArrowUpTrayIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

export function UploadPhotoModal({
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
  const [preview, setPreview] = useState(member.photo)

  const onChoose = (file: File | undefined) => {
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <DialogTitle>Upload photo — {member.firstName}</DialogTitle>
      <DialogBody>
        <div className="flex flex-col items-center gap-3.5">
          <img src={preview} alt="" className="size-50 rounded-xl border border-zinc-950/10 object-cover dark:border-white/10" />
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              onChoose(e.dataTransfer.files[0])
            }}
            className="w-full cursor-pointer rounded-xl border-2 border-dashed border-zinc-950/15 bg-zinc-50 p-5 text-center focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 dark:border-white/15 dark:bg-white/5"
          >
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="sr-only"
              onChange={(e) => onChoose(e.target.files?.[0])}
            />
            <ArrowUpTrayIcon className="mx-auto size-7 text-zinc-500 dark:text-zinc-400" />
            <div className="mt-2 text-sm font-semibold text-zinc-950 dark:text-white">
              Drop a photo here, or click to browse
            </div>
            <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              JPEG or PNG · max 10MB · passport-style portrait
            </div>
          </label>
        </div>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSave}>Upload photo</Button>
      </DialogActions>
    </Dialog>
  )
}
