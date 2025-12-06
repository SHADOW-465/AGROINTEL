"use client"

import { Check } from "lucide-react"
import { useState } from "react"

interface LanguageSelectorProps {
  onSelect: (language: string) => void
}

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
]

export function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  const [selected, setSelected] = useState("en")

  return (
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-foreground mb-2">Choose your language</h1>
          <p className="text-sm text-muted-foreground">Select your preferred language for the app</p>
        </div>

        <div className="space-y-3 flex-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                selected === lang.code ? "border-primary bg-muted" : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="text-left">
                <p className="text-lg font-medium text-foreground">{lang.native}</p>
                <p className="text-sm text-muted-foreground">{lang.name}</p>
              </div>
              {selected === lang.code && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => onSelect(selected)}
          className="w-full h-12 mt-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
