"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/screens/home-screen"
import { DiseaseDetectionScreen } from "@/components/screens/disease-detection-screen"
import { CropRecommendationScreen } from "@/components/screens/crop-recommendation-screen"
import { ChatScreen } from "@/components/screens/chat-screen"
import { FarmProfileScreen } from "@/components/screens/farm-profile-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"

interface MainAppProps {
  language: string
}

export type Screen = "home" | "scan" | "farm" | "chat" | "crop-recommendation" | "settings"

export function MainApp({ language }: MainAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "scan":
        return <DiseaseDetectionScreen onBack={() => setCurrentScreen("home")} />
      case "farm":
        return <FarmProfileScreen onNavigate={setCurrentScreen} />
      case "chat":
        return <ChatScreen onBack={() => setCurrentScreen("home")} />
      case "crop-recommendation":
        return <CropRecommendationScreen onBack={() => setCurrentScreen("home")} />
      case "settings":
        return <SettingsScreen onBack={() => setCurrentScreen("home")} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pb-20 overflow-y-auto">{renderScreen()}</div>
      <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}
