'use client'

import React from "react"

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FeatureFlag } from '@/lib/api-client'
import { Loader2 } from 'lucide-react'

interface CreateFlagDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateFlag: (flag: Omit<FeatureFlag, 'createdAt' | 'updatedAt'>) => Promise<void>
}

export function CreateFlagDialog({ open, onOpenChange, onCreateFlag }: CreateFlagDialogProps) {
  const [key, setKey] = useState('')
  const [description, setDescription] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!key.trim()) {
      setError('Flag key is required')
      return
    }

    // Auto-uppercase the key
    const upperKey = key.toUpperCase().replace(/\s+/g, '_')

    setIsSubmitting(true)
    try {
      await onCreateFlag({
        key: upperKey,
        description,
        enabled,
      })
      // Reset form
      setKey('')
      setDescription('')
      setEnabled(false)
      toast.success(`Flag "${upperKey}" created successfully`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create flag'
      setError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setKey('')
      setDescription('')
      setEnabled(false)
      setError(null)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create Feature Flag</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new feature flag to your system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="key" className="text-foreground">
              Flag Key <span className="text-destructive">*</span>
            </Label>
            <Input
              id="key"
              placeholder="e.g., new_dashboard"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={isSubmitting}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Will be automatically converted to uppercase (e.g., NEW_DASHBOARD)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Input
              id="description"
              placeholder="What does this flag do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50">
            <Label htmlFor="enabled" className="text-foreground cursor-pointer">
              Enable by default
            </Label>
            <Switch
              id="enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
              disabled={isSubmitting}
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
            className="border-border hover:bg-card/50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? 'Creating...' : 'Create Flag'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
