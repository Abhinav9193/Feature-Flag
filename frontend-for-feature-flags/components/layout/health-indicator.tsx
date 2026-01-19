'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'

export function HealthIndicator() {
  const [isHealthy, setIsHealthy] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/health', {
          method: 'GET',
        })
        setIsHealthy(response.ok)
      } catch (error) {
        setIsHealthy(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent/5 border border-sidebar-accent/20">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${
            isHealthy ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className={`text-xs font-medium truncate ${
          isHealthy ? 'text-green-400' : 'text-red-400'
        }`}>
          {isLoading ? 'Checking...' : isHealthy ? 'System Online' : 'System Offline'}
        </span>
      </div>
    </div>
  )
}
