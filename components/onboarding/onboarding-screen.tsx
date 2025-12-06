"use client"

import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  onContinue: () => void
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Illustration Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F5E9] to-[#F3FAF5]" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* Kerala Farm Scene - Simplified Illustration */}
          {/* Hills */}
          <ellipse cx="100" cy="280" rx="150" ry="60" fill="#A5D6A7" opacity="0.6" />
          <ellipse cx="320" cy="290" rx="120" ry="50" fill="#81C784" opacity="0.7" />

          {/* Paddy Fields */}
          <path d="M0 220 Q100 200 200 220 Q300 240 400 220 L400 300 L0 300 Z" fill="#C8E6C9" />
          <path
            d="M0 240 Q80 230 160 245 Q240 260 320 245 Q360 238 400 245 L400 300 L0 300 Z"
            fill="#A5D6A7"
            opacity="0.8"
          />

          {/* Coconut Trees */}
          <g transform="translate(80, 120)">
            <rect x="-3" y="0" width="6" height="80" fill="#8B6F47" rx="2" />
            <ellipse cx="0" cy="-5" rx="25" ry="12" fill="#4CAF50" />
            <ellipse cx="-15" cy="5" rx="20" ry="10" fill="#66BB6A" transform="rotate(-30)" />
            <ellipse cx="15" cy="5" rx="20" ry="10" fill="#66BB6A" transform="rotate(30)" />
          </g>

          <g transform="translate(320, 140)">
            <rect x="-3" y="0" width="6" height="70" fill="#8B6F47" rx="2" />
            <ellipse cx="0" cy="-5" rx="22" ry="10" fill="#4CAF50" />
            <ellipse cx="-12" cy="5" rx="18" ry="8" fill="#66BB6A" transform="rotate(-25)" />
            <ellipse cx="12" cy="5" rx="18" ry="8" fill="#66BB6A" transform="rotate(25)" />
          </g>

          {/* Sun */}
          <circle cx="340" cy="60" r="30" fill="#FFE082" opacity="0.9" />

          {/* Clouds */}
          <g opacity="0.7">
            <ellipse cx="100" cy="50" rx="30" ry="15" fill="white" />
            <ellipse cx="125" cy="45" rx="25" ry="12" fill="white" />
            <ellipse cx="115" cy="55" rx="20" ry="10" fill="white" />
          </g>

          <g opacity="0.6">
            <ellipse cx="250" cy="70" rx="25" ry="12" fill="white" />
            <ellipse cx="270" cy="65" rx="20" ry="10" fill="white" />
          </g>
        </svg>
      </div>

      {/* Bottom Content */}
      <div className="bg-card rounded-t-3xl -mt-8 relative z-10 px-6 py-8 pb-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Agro<span className="text-primary">Intel</span>
            </h1>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">Your AI-powered farm assistant</p>

          <Button
            onClick={onContinue}
            className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90"
          >
            Continue
          </Button>

          <p className="text-xs text-tertiary">Choose your language next</p>
        </div>
      </div>
    </div>
  )
}
