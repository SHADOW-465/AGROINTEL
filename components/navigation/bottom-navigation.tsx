"use client"

import { Home, Scan, Wheat, MessageCircle } from "lucide-react"
import type { Screen } from "@/components/main-app"

interface BottomNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems = [
  { id: "home" as const, icon: Home, label: "Home" },
  { id: "scan" as const, icon: Scan, label: "Scan", isSpecial: true },
  { id: "farm" as const, icon: Wheat, label: "Farm" },
  { id: "chat" as const, icon: MessageCircle, label: "Chat" },
]

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id

          if (item.isSpecial) {
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)} className="relative -mt-6">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all animate-pulse-gentle">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium text-primary">
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-4"
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
