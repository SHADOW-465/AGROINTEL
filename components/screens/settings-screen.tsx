"use client"

import { ArrowLeft, User, Globe, Bell, Moon, HelpCircle, LogOut, ChevronRight, Leaf } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SettingsScreenProps {
  onBack: () => void
}

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", desc: "Rajan Kumar" },
      { icon: Globe, label: "Language", desc: "English" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", desc: "Enabled" },
      { icon: Moon, label: "Appearance", desc: "Light" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help & FAQ", desc: "" },
      { icon: LogOut, label: "Log out", desc: "", danger: true },
    ],
  },
]

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="p-4 border-0 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Rajan Kumar</h2>
            <p className="text-sm text-muted-foreground">Thrissur, Kerala</p>
            <p className="text-xs text-muted-foreground mt-1">3 farms registered</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">{section.title}</h3>
            <Card className="border-0 shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors ${
                    itemIndex !== section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      item.danger ? "bg-destructive/10" : "bg-muted"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${item.danger ? "text-destructive" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${item.danger ? "text-destructive" : "text-foreground"}`}>
                      {item.label}
                    </p>
                  </div>
                  {item.desc && <span className="text-sm text-muted-foreground">{item.desc}</span>}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </Card>
          </section>
        ))}

        {/* Version Info */}
        <p className="text-center text-xs text-muted-foreground pt-4">
          AgroIntel v1.0.0 · Made with ❤️ for Kerala farmers
        </p>
      </main>
    </div>
  )
}
