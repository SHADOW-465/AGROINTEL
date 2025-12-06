"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, MapPin, Droplets, TrendingUp, ChevronDown, ChevronUp, Wheat, Leaf, TreePalm } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CropRecommendationScreenProps {
  onBack: () => void
}

type FormSection = "basics" | "water" | "goals"

export function CropRecommendationScreen({ onBack }: CropRecommendationScreenProps) {
  const [expandedSection, setExpandedSection] = useState<FormSection>("basics")
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    location: "Thrissur",
    farmSize: "2.5",
    soilType: "Loam",
    irrigation: "Yes",
    rainfall: "High",
    season: "Kharif",
    goal: "maximize",
  })

  const toggleSection = (section: FormSection) => {
    setExpandedSection(expandedSection === section ? section : section)
  }

  if (showResults) {
    return <CropResults onBack={() => setShowResults(false)} formData={formData} />
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Crop recommendation</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-4">
        {/* Banner */}
        <Card className="p-4 bg-muted border-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-medium text-foreground mb-1">Plan your next crop</h2>
              <p className="text-sm text-muted-foreground">We'll consider your soil, season, and market trends</p>
            </div>
          </div>
        </Card>

        {/* Form Sections */}
        <FormSectionCard
          title="Farm basics"
          icon={MapPin}
          isExpanded={expandedSection === "basics"}
          onToggle={() => toggleSection("basics")}
          progress={1}
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Farm location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="District, PIN"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Farm size (hectares)</label>
              <input
                type="number"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="2.5"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Soil type</label>
              <div className="flex flex-wrap gap-2">
                {["Clay", "Loam", "Sandy", "Laterite"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, soilType: type })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      formData.soilType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Water & climate"
          icon={Droplets}
          isExpanded={expandedSection === "water"}
          onToggle={() => toggleSection("water")}
          progress={2}
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Irrigation available</label>
              <div className="flex gap-2">
                {["Yes", "No", "Seasonal"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, irrigation: option })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      formData.irrigation === option
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Typical rainfall</label>
              <div className="flex gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, rainfall: level })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      formData.rainfall === level
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Current season</label>
              <div className="flex gap-2">
                {["Kharif", "Rabi", "Zaid"].map((season) => (
                  <button
                    key={season}
                    onClick={() => setFormData({ ...formData, season: season })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      formData.season === season
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormSectionCard>

        <FormSectionCard
          title="Market & goals"
          icon={TrendingUp}
          isExpanded={expandedSection === "goals"}
          onToggle={() => toggleSection("goals")}
          progress={3}
        >
          <div className="space-y-3">
            {[
              { id: "maximize", label: "Maximize income", desc: "Focus on highest revenue crops" },
              { id: "stable", label: "Low risk / Stable crop", desc: "Reliable yields with proven varieties" },
              { id: "lowcost", label: "Lower input costs", desc: "Minimize fertilizer and pesticide expenses" },
            ].map((goal) => (
              <button
                key={goal.id}
                onClick={() => setFormData({ ...formData, goal: goal.id })}
                className={`w-full p-4 rounded-xl text-left transition-colors border-2 ${
                  formData.goal === goal.id
                    ? "border-primary bg-muted"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <p className="font-medium text-foreground">{goal.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{goal.desc}</p>
              </button>
            ))}
          </div>
        </FormSectionCard>

        <Button onClick={() => setShowResults(true)} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90">
          Get recommendations
        </Button>
      </main>
    </div>
  )
}

function FormSectionCard({
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  progress,
  children,
}: {
  title: string
  icon: React.ElementType
  isExpanded: boolean
  onToggle: () => void
  progress: number
  children: React.ReactNode
}) {
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{progress}/3</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>
      {isExpanded && <div className="px-4 pb-4 animate-fade-in">{children}</div>}
    </Card>
  )
}

function CropResults({ onBack, formData }: { onBack: () => void; formData: Record<string, string> }) {
  const recommendations = [
    {
      name: "Rice – Jyothi",
      icon: Wheat,
      suitability: 92,
      yield: "4.5 tonnes/ha",
      revenue: "₹72,000",
      risk: "Low",
      reason: `Ideal for ${formData.soilType.toLowerCase()} soil in ${formData.location} during ${formData.season}. Well-suited for ${formData.rainfall.toLowerCase()} rainfall conditions with excellent market demand.`,
    },
    {
      name: "Coconut – WCT",
      icon: TreePalm,
      suitability: 85,
      yield: "80 nuts/palm/year",
      revenue: "₹45,000/year",
      risk: "Very Low",
      reason: `Long-term investment suitable for your ${formData.farmSize} hectare farm. Thrives in Kerala's climate with ${formData.irrigation.toLowerCase()} irrigation.`,
    },
    {
      name: "Banana – Nendran",
      icon: Leaf,
      suitability: 78,
      yield: "35 tonnes/ha",
      revenue: "₹1,40,000",
      risk: "Medium",
      reason: `High income potential with good market prices in ${formData.location}. Requires consistent irrigation which aligns with your setup.`,
    },
  ]

  return (
    <div className="min-h-full bg-background">
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Recommended crops</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground">
          Based on your farm in {formData.location} with {formData.soilType.toLowerCase()} soil
        </p>

        {recommendations.map((crop, index) => (
          <Card
            key={index}
            className="p-4 border-0 shadow-sm animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <crop.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{crop.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      crop.risk === "Low" || crop.risk === "Very Low"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {crop.risk} risk
                  </span>
                </div>

                {/* Suitability Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Suitability</span>
                    <span className="font-medium text-primary">{crop.suitability}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${crop.suitability}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Expected yield</p>
                    <p className="text-sm font-medium text-foreground">{crop.yield}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Est. revenue</p>
                    <p className="text-sm font-medium text-foreground">{crop.revenue}</p>
                  </div>
                </div>

                {/* Reason */}
                <p className="text-sm text-muted-foreground leading-relaxed">{crop.reason}</p>

                <Button className="w-full mt-4 rounded-xl bg-primary hover:bg-primary/90">Plan this crop</Button>
              </div>
            </div>
          </Card>
        ))}
      </main>
    </div>
  )
}
