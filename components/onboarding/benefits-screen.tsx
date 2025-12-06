"use client"

import { Scan, Sprout, Cloud, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BenefitsScreenProps {
  onGetStarted: () => void
}

const benefits = [
  {
    icon: Scan,
    title: "Detect crop diseases early",
    description: "AI-powered analysis from a simple photo",
  },
  {
    icon: Sprout,
    title: "Choose the best crops for your land",
    description: "Smart recommendations based on soil and season",
  },
  {
    icon: Cloud,
    title: "Get smart weather and market insights",
    description: "Stay ahead with timely alerts and forecasts",
  },
]

export function BenefitsScreen({ onGetStarted }: BenefitsScreenProps) {
  return (
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            Agro<span className="text-primary">Intel</span>
          </span>
        </div>

        <h1 className="text-xl font-semibold text-foreground text-center mb-2">How we help your farm thrive</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Everything you need for smarter farming</p>

        <div className="space-y-4 flex-1">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-2xl border border-border flex gap-4 items-start animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onGetStarted}
          className="w-full h-12 mt-6 rounded-xl bg-primary hover:bg-primary/90 text-base font-medium"
        >
          Get started
        </Button>
      </div>
    </div>
  )
}
