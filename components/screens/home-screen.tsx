"use client"

import {
  Leaf,
  ChevronDown,
  Camera,
  Droplets,
  AlertTriangle,
  TrendingUp,
  Scan,
  Sprout,
  User,
  MessageCircle,
  Settings,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WeatherWidget } from "@/components/widgets/weather-widget"
import type { Screen } from "@/components/main-app"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

const suggestions = [
  {
    icon: Droplets,
    text: "Irrigation recommended in 2 days (no rain expected)",
    category: "Weather",
    color: "text-accent",
  },
  {
    icon: AlertTriangle,
    text: "High risk of fungal disease this week—monitor rice leaves",
    category: "Disease",
    color: "text-warning",
  },
  {
    icon: TrendingUp,
    text: "Market price for coconut rising in Kochi market",
    category: "Market",
    color: "text-success",
  },
]

const quickActions = [
  { icon: Scan, label: "Disease Detection", screen: "scan" as const },
  { icon: Sprout, label: "Crop Planner", screen: "crop-recommendation" as const },
  { icon: User, label: "Farm Profile", screen: "farm" as const },
  { icon: MessageCircle, label: "Ask Assistant", screen: "chat" as const },
]

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              Agro<span className="text-primary">Intel</span>
            </span>
          </div>
          <button
            onClick={() => onNavigate("settings")}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4 max-w-2xl mx-auto space-y-4">
        {/* Farm Switcher */}
        <button className="w-full px-4 py-2.5 bg-muted rounded-full flex items-center justify-between hover:bg-muted/80 transition-colors">
          <span className="text-sm font-medium text-foreground">Current farm: Rice Field A</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Primary Action - Disease Detection */}
        <Card className="p-4 bg-gradient-to-br from-muted to-card border-0 shadow-sm">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 48 48" className="w-10 h-10">
                <path
                  d="M24 8 C16 8 10 16 10 24 C10 32 16 40 24 40 C32 40 38 32 38 24 C38 16 32 8 24 8"
                  fill="#A5D6A7"
                />
                <path d="M24 12 C24 12 20 18 24 26 C28 34 24 38 24 38" stroke="#4CAF50" strokeWidth="2" fill="none" />
                <path d="M18 20 Q24 24 30 20" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
                <path d="M16 28 Q24 32 32 28" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground mb-1">Check your crop's health</h2>
              <p className="text-sm text-muted-foreground mb-3">Take a photo of an affected leaf</p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => onNavigate("scan")}
                  size="sm"
                  className="rounded-lg bg-primary hover:bg-primary/90"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Scan leaf
                </Button>
                <button className="text-sm text-primary hover:underline">View history</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Weather Widget */}
        <WeatherWidget />

        {/* Today's Suggestions */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">Today's suggestions</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                className="p-3 flex items-start gap-3 border-0 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`mt-0.5 ${suggestion.color}`}>
                  <suggestion.icon className="w-5 h-5" />
                </div>
                <p className="flex-1 text-sm text-foreground leading-relaxed">{suggestion.text}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground shrink-0">
                  {suggestion.category}
                </span>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">Quick actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.screen}
                className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate(action.screen)}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
