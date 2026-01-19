'use client'

import { FeatureFlag } from '@/lib/api-client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Edit2, Trash2 } from 'lucide-react'

interface FlagsTableBodyProps {
  flags: FeatureFlag[]
  onToggle: (key: string, currentState: boolean) => void
}

export function FlagsTableBody({ flags, onToggle }: FlagsTableBodyProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return 'Invalid date'
    }
  }

  return (
    <>
      {flags.map((flag) => (
        <tr
          key={flag.key}
          className="border-b border-border/30 hover:bg-card/50 transition-colors duration-200"
        >
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={flag.enabled}
                onCheckedChange={() => onToggle(flag.key, flag.enabled)}
                aria-label={`Toggle ${flag.key}`}
              />
            </div>
          </td>
          <td className="px-6 py-4">
            <code className="px-3 py-1 rounded bg-muted text-primary font-mono text-sm">
              {flag.key}
            </code>
          </td>
          <td className="px-6 py-4">
            <p className="text-sm text-foreground">{flag.description}</p>
          </td>
          <td className="px-6 py-4">
            <p className="text-sm text-muted-foreground">{formatDate(flag.updatedAt)}</p>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
