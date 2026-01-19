'use client'

import { SummaryCards } from './summary-cards'
import { Charts } from './charts'

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <SummaryCards />
      <Charts />
    </div>
  )
}
