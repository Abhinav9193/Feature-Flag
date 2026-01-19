'use client'

import { LayoutDashboard, Flag, Activity } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HealthIndicator } from './health-indicator'

const navigation = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/flags', label: 'Feature Flags', icon: Flag },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Flag className="w-5 h-5 text-sidebar-foreground" />
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground tracking-tight">FeatureOps</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                'relative overflow-hidden group',
                isActive
                  ? 'bg-gradient-to-r from-sidebar-primary/20 to-sidebar-primary/10 text-sidebar-primary border border-sidebar-primary/50 shadow-lg shadow-sidebar-primary/20'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/15'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-sidebar-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Health Status */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <HealthIndicator />
      </div>
    </aside>
  )
}
