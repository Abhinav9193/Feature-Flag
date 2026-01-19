'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Flag, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface FlagStats {
  total: number
  active: number
  disabled: number
  lastUpdated: string
}

export function SummaryCards() {
  const [stats, setStats] = useState<FlagStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/flags')
        if (!response.ok) throw new Error('Failed to fetch flags')
        const data = await response.json()

        const flags = Array.isArray(data) ? data : data.flags || []
        const active = flags.filter((f: any) => f.enabled).length
        const disabled = flags.filter((f: any) => !f.enabled).length
        const lastUpdated = flags.length > 0
          ? new Date(Math.max(...flags.map((f: any) => new Date(f.updatedAt).getTime()))).toLocaleDateString()
          : 'Never'

        setStats({
          total: flags.length,
          active,
          disabled,
          lastUpdated,
        })
      } catch (error) {
        console.error('Failed to fetch flag stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      label: 'Total Flags',
      value: stats?.total ?? 0,
      icon: Flag,
      color: 'text-primary',
    },
    {
      label: 'Active Flags',
      value: stats?.active ?? 0,
      icon: CheckCircle2,
      color: 'text-green-500',
    },
    {
      label: 'Disabled Flags',
      value: stats?.disabled ?? 0,
      icon: XCircle,
      color: 'text-red-500',
    },
    {
      label: 'Last Updated',
      value: stats?.lastUpdated ?? 'Loading...',
      icon: Clock,
      color: 'text-secondary',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <Card
            key={idx}
            className="bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/20 group cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">{card.label}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 bg-muted" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {card.value}
                  </p>
                )}
              </div>
              <div className={`${card.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
