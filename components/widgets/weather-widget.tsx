"use client"

import { Sun, Cloud, CloudRain } from "lucide-react"
import { Card } from "@/components/ui/card"

const forecast = [
  { day: "Mon", icon: Sun, temp: 31 },
  { day: "Tue", icon: Cloud, temp: 29 },
  { day: "Wed", icon: CloudRain, temp: 27 },
  { day: "Thu", icon: Cloud, temp: 28 },
  { day: "Fri", icon: Sun, temp: 30 },
]

export function WeatherWidget() {
  return (
    <Card className="p-4 bg-[#F4F9FD] border-0 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-foreground">29°C</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Thrissur · Next 7 days mostly cloudy</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center">
          <Cloud className="w-7 h-7 text-accent" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">{day.day}</span>
            <day.icon className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium text-foreground">{day.temp}°</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
