'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

export function Charts() {
  const [enabledData, setEnabledData] = useState<any>(null)
  const [volumeData] = useState([
    { time: '12:00 AM', requests: 120 },
    { time: '2:00 AM', requests: 240 },
    { time: '4:00 AM', requests: 140 },
    { time: '6:00 AM', requests: 380 },
    { time: '8:00 AM', requests: 900 },
    { time: '10:00 AM', requests: 480 },
    { time: '12:00 PM', requests: 1200 },
    { time: '2:00 PM', requests: 920 },
    { time: '4:00 PM', requests: 750 },
    { time: '6:00 PM', requests: 640 },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/flags')
        if (!response.ok) throw new Error('Failed to fetch flags')
        const data = await response.json()

        const flags = Array.isArray(data) ? data : data.flags || []
        const enabled = flags.filter((f: any) => f.enabled).length
        const disabled = flags.filter((f: any) => !f.enabled).length

        setEnabledData([
          { name: 'Enabled', value: enabled, fill: '#22c55e' },
          { name: 'Disabled', value: disabled, fill: '#ef4444' },
        ])
      } catch (error) {
        console.error('Failed to fetch flag data:', error)
        setEnabledData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Enabled vs Disabled Pie Chart */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-6">Flag Status Distribution</h3>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="h-48 w-48 rounded-full bg-muted" />
          </div>
        ) : enabledData && enabledData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={enabledData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {enabledData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0d1219',
                  border: '1px solid #1e3a4c',
                  borderRadius: '8px',
                  color: '#e0e0e0'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No flag data available
          </div>
        )}
      </Card>

      {/* Area Chart - Request Volume */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-secondary/70 hover:shadow-lg hover:shadow-secondary/20">
        <h3 className="text-lg font-semibold text-foreground mb-2">Feature Flag Request Volume</h3>
        <p className="text-xs text-muted-foreground mb-6">Simulated Analytics</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={volumeData}>
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a4c" />
            <XAxis dataKey="time" stroke="#808080" style={{ fontSize: '12px' }} />
            <YAxis stroke="#808080" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0d1219',
                border: '1px solid #1e3a4c',
                borderRadius: '8px',
                color: '#e0e0e0'
              }}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#00d9ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRequests)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
