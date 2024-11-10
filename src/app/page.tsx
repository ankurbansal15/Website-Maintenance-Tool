'use client'

import LandingPage from '@/components/landing-page'

export default function Dashboard() {


  return (
    <div className="flex h-screen overflow-hidden bg-background">
    <div className="flex-1 flex flex-col overflow-hidden items-center justify-center">
      <LandingPage />
    </div>
  </div>
  )
}