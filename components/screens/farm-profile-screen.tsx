"use client"

import {
  Settings,
  MapPin,
  Leaf,
  Calendar,
  AlertTriangle,
  Droplets,
  CheckCircle,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Screen } from "@/components/main-app"

interface FarmProfileScreenProps {
  onNavigate: (screen: Screen) => void
}

const currentCrops = [
  { name: "Rice - Jyothi", stage: "Flowering", progress: 75, daysToHarvest: 28 },
  { name: "Coconut - WCT", stage: "Fruiting", progress: 60, daysToHarvest: "Ongoing" },
]

const recentEvents = [
  { icon: AlertTriangle, title: "Leaf spot detected", time: "2 days ago", color: "text-warning" },
  { icon: CheckCircle, title: "Fungicide applied", time: "1 day ago", color: "text-success" },
  { icon: Droplets, title: "Irrigation completed", time: "Today", color: "text-accent" },
  { icon: AlertTriangle, title: "Heavy rain alert", time: "Yesterday", color: "text-warning" },
]

export function FarmProfileScreen({ onNavigate }: FarmProfileScreenProps) {
  return (
    <div className="min-h-full bg-background">
      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-br from-[#A5D6A7] to-[#66BB6A] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 200">
          <path d="M0 150 Q100 120 200 150 Q300 180 400 150 L400 200 L0 200 Z" fill="white" />
          <ellipse cx="350" cy="40" rx="30" ry="30" fill="white" opacity="0.3" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="max-w-2xl mx-auto w-full">
            <h1 className="text-2xl font-semibold text-white mb-1">Rice Field A</h1>
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Thrissur, Kerala</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate("settings")}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Health Score */}
      <div className="px-4 -mt-6 max-w-2xl mx-auto">
        <Card className="p-4 border-0 shadow-lg flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1FAF5A"
                strokeWidth="3"
                strokeDasharray="78, 100"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-foreground">
              78%
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Farm health score</p>
            <p className="font-medium text-foreground">Good condition</p>
          </div>
        </Card>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Current Crops */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Current crops</h2>
          <div className="space-y-3">
            {currentCrops.map((crop, index) => (
              <Card key={index} className="p-4 border-0 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground">{crop.name}</h3>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {crop.stage}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${crop.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{crop.progress}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {typeof crop.daysToHarvest === "number"
                          ? `${crop.daysToHarvest} days to harvest`
                          : crop.daysToHarvest}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Events */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Recent events</h2>
          <Card className="border-0 shadow-sm overflow-hidden">
            {recentEvents.map((event, index) => (
              <div
                key={index}
                className={`p-3 flex items-center gap-3 ${
                  index !== recentEvents.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className={`${event.color}`}>
                  <event.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{event.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </Card>
        </section>

        {/* Yield & Performance */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Yield & performance</h2>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              View details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <Card className="p-4 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-semibold text-foreground">4.2 t/ha</p>
                <p className="text-sm text-muted-foreground">Last season yield</p>
              </div>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>

            {/* Simple Chart Representation */}
            <div className="h-32 flex items-end justify-between gap-2">
              {[65, 72, 68, 80, 75, 85, 92].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/20 rounded-t-sm relative overflow-hidden"
                    style={{ height: `${value}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm"
                      style={{ height: `${value * 0.7}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {["'18", "'19", "'20", "'21", "'22", "'23", "'24"][index]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-muted-foreground">Your yield</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary/20" />
                <span className="text-muted-foreground">Regional avg</span>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
