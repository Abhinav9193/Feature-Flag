'use client'

import { usePathname } from 'next/navigation'

const pageTitle: Record<string, string> = {
  '/': 'Dashboard',
  '/flags': 'Feature Flags',
}

export function Header() {
  const pathname = usePathname()
  const title = pageTitle[pathname] || 'Page'

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Placeholder for future actions */}
        </div>
      </div>
    </header>
  )
}
