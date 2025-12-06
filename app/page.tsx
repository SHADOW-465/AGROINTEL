"use client"

import { useState } from "react"
import { OnboardingScreen } from "@/components/onboarding/onboarding-screen"
import { LanguageSelector } from "@/components/onboarding/language-selector"
import { BenefitsScreen } from "@/components/onboarding/benefits-screen"
import { MainApp } from "@/components/main-app"

export default function Home() {
  const [step, setStep] = useState<"welcome" | "language" | "benefits" | "app">("welcome")
  const [language, setLanguage] = useState("en")

  if (step === "welcome") {
    return <OnboardingScreen onContinue={() => setStep("language")} />
  }

  if (step === "language") {
    return (
      <LanguageSelector
        onSelect={(lang) => {
          setLanguage(lang)
          setStep("benefits")
        }}
      />
    )
  }

  if (step === "benefits") {
    return <BenefitsScreen onGetStarted={() => setStep("app")} />
  }

  return <MainApp language={language} />
}
