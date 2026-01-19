'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FeatureFlag, flagsApi } from '@/lib/api-client'
import { Plus, Search, Loader2 } from 'lucide-react'
import { CreateFlagDialog } from './create-flag-dialog'
import { FlagsTableBody } from './flags-table-body'
import { Skeleton } from '@/components/ui/skeleton'

export function FlagsTable() {
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchFlags = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await flagsApi.getFlags()
      setFlags(data)
    } catch (error) {
      console.error('Failed to fetch flags:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFlags()
  }, [fetchFlags])

  const handleCreateFlag = async (flagData: Omit<FeatureFlag, 'createdAt' | 'updatedAt'>) => {
    try {
      const newFlag = await flagsApi.createFlag(flagData)
      setFlags([newFlag, ...flags])
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Failed to create flag:', error)
    }
  }

  const handleToggleFlag = async (key: string, currentState: boolean) => {
    try {
      const updated = await flagsApi.toggleFlag(key, !currentState)
      setFlags(flags.map(f => f.key === key ? updated : f))
      const action = !currentState ? 'enabled' : 'disabled'
      toast.success(`Flag "${key}" ${action}`)
    } catch (error) {
      console.error('Failed to toggle flag:', error)
      toast.error(`Failed to toggle flag "${key}"`)
    }
  }

  const filteredFlags = flags.filter(
    flag =>
      flag.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search flags by key or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border hover:border-primary/50 transition-colors"
          />
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Flag
        </Button>
      </div>

      {/* Table Card */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-card/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Flag Key</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Updated</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-card/30 transition-colors">
                    <td className="px-6 py-4"><Skeleton className="h-8 w-12 bg-muted" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-32 bg-muted" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-40 bg-muted" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24 bg-muted" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-20 bg-muted ml-auto" /></td>
                  </tr>
                ))
              ) : filteredFlags.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-muted-foreground">
                      {flags.length === 0 ? 'No feature flags found. Create one to get started.' : 'No flags match your search.'}
                    </p>
                  </td>
                </tr>
              ) : (
                <FlagsTableBody
                  flags={filteredFlags}
                  onToggle={handleToggleFlag}
                />
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Flag Dialog */}
      <CreateFlagDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateFlag={handleCreateFlag}
      />
    </div>
  )
}
