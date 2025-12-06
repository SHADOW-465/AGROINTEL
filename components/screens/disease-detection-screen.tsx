"use client"

import { useState } from "react"
import { ArrowLeft, Camera, ImageIcon, Upload, RotateCcw, AlertTriangle, ShieldCheck, Leaf } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DiseaseDetectionScreenProps {
  onBack: () => void
}

type Step = "capture" | "preview" | "analyzing" | "result"

export function DiseaseDetectionScreen({ onBack }: DiseaseDetectionScreenProps) {
  const [step, setStep] = useState<Step>("capture")
  const [hasImage, setHasImage] = useState(false)

  const handleCapture = () => {
    setHasImage(true)
    setStep("preview")
  }

  const handleAnalyze = () => {
    setStep("analyzing")
    setTimeout(() => setStep("result"), 2000)
  }

  const handleRetake = () => {
    setHasImage(false)
    setStep("capture")
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Disease detection</h1>
            {step !== "result" && (
              <p className="text-xs text-muted-foreground">
                Step {step === "capture" ? "1" : step === "preview" ? "2" : "2"} of 2
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {step === "capture" && <CaptureStep onCapture={handleCapture} />}

        {step === "preview" && <PreviewStep onRetake={handleRetake} onAnalyze={handleAnalyze} />}

        {step === "analyzing" && <AnalyzingStep />}

        {step === "result" && <ResultStep onNewScan={handleRetake} />}
      </main>
    </div>
  )
}

function CaptureStep({ onCapture }: { onCapture: () => void }) {
  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onClick={onCapture}
        className="aspect-[4/3] rounded-2xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-foreground font-medium mb-1">Tap to take a photo</p>
        <p className="text-sm text-muted-foreground">or choose from gallery</p>
      </div>

      {/* Guide */}
      <Card className="p-4 border-0 shadow-sm">
        <h3 className="text-sm font-medium text-foreground mb-3">Tips for best results</h3>
        <div className="space-y-3">
          {[
            "Capture a single leaf in focus",
            "Ensure good natural light",
            "Show both healthy and affected parts if possible",
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-sm flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={onCapture} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90">
          <Camera className="w-5 h-5 mr-2" />
          Open camera
        </Button>
        <Button variant="outline" onClick={onCapture} className="w-full h-12 rounded-xl border-border bg-transparent">
          <ImageIcon className="w-5 h-5 mr-2" />
          Choose from gallery
        </Button>
      </div>
    </div>
  )
}

function PreviewStep({ onRetake, onAnalyze }: { onRetake: () => void; onAnalyze: () => void }) {
  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <span className="absolute top-3 left-3 text-xs font-medium text-white bg-black/30 px-2 py-1 rounded-lg z-20">
          Preview
        </span>
        <div className="w-full h-full bg-[#A5D6A7] flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-32 h-32">
            <path
              d="M60 10 C40 10 25 30 25 55 C25 80 40 95 60 95 C80 95 95 80 95 55 C95 30 80 10 60 10"
              fill="#66BB6A"
            />
            <path d="M60 20 C60 20 50 40 60 65 C70 90 60 90 60 90" stroke="#4CAF50" strokeWidth="3" fill="none" />
            <circle cx="45" cy="50" r="6" fill="#8B6F47" opacity="0.7" />
            <circle cx="70" cy="60" r="8" fill="#8B6F47" opacity="0.6" />
            <circle cx="55" cy="70" r="5" fill="#8B6F47" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onRetake} className="flex-1 h-12 rounded-xl border-border bg-transparent">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake
        </Button>
        <Button onClick={onAnalyze} className="flex-[2] h-12 rounded-xl bg-primary hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          Analyze image
        </Button>
      </div>
    </div>
  )
}

function AnalyzingStep() {
  return (
    <div className="space-y-6">
      {/* Image with Loader */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        </div>
        <div className="w-full h-full bg-[#A5D6A7] flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-32 h-32 opacity-50">
            <path
              d="M60 10 C40 10 25 30 25 55 C25 80 40 95 60 95 C80 95 95 80 95 55 C95 30 80 10 60 10"
              fill="#66BB6A"
            />
            <path d="M60 20 C60 20 50 40 60 65 C70 90 60 90 60 90" stroke="#4CAF50" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </div>

      {/* Progress Info */}
      <div className="text-center space-y-2">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse w-2/3" />
        </div>
        <p className="text-foreground font-medium">Analyzing leaf…</p>
        <p className="text-sm text-muted-foreground">This usually takes around 2 seconds</p>
      </div>
    </div>
  )
}

function ResultStep({ onNewScan }: { onNewScan: () => void }) {
  return (
    <div className="space-y-4">
      {/* Status Strip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 rounded-full">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium text-warning">Disease detected</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
          <span className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-sm text-muted-foreground">82% confidence</span>
        </div>
      </div>

      {/* Disease Summary Card */}
      <Card className="border-l-4 border-l-warning border-0 shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Leaf spot (Rice)</h2>
              <p className="text-xs text-muted-foreground italic">Bipolaris oryzae</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-medium bg-warning/10 text-warning rounded-full">Moderate</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Circular brown lesions with yellow halos on older leaves. Common in high humidity conditions.
          </p>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="treatment" className="w-full">
        <TabsList className="w-full bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="treatment"
            className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Treatment
          </TabsTrigger>
          <TabsTrigger
            value="prevention"
            className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Prevention
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="treatment" className="mt-4 space-y-3">
          <TimelineCard
            step="Day 1 – Immediate action"
            action="Spray Mancozeb 75% WP at 2.5g per liter in the early morning"
            details="Approximate cost: ₹120 per acre. Avoid spraying during rain."
          />
          <TimelineCard
            step="Day 4 – Follow-up"
            action="Apply Tricyclazole 75% WP if symptoms persist"
            details="Use 0.6g per liter. Ensure complete coverage of affected areas."
          />
          <TimelineCard
            step="Day 7 – Monitor"
            action="Check for new lesions and assess treatment effectiveness"
            details="Take photos to compare progress. Contact expert if condition worsens."
            isLast
          />
        </TabsContent>

        <TabsContent value="prevention" className="mt-4 space-y-3">
          <PreventionCard
            title="Field hygiene"
            points={[
              "Remove and destroy infected plant debris",
              "Maintain proper spacing between plants",
              "Avoid overhead irrigation when possible",
            ]}
          />
          <PreventionCard
            title="Irrigation practice"
            points={[
              "Use drip irrigation to keep foliage dry",
              "Water in early morning to allow drying",
              "Ensure proper field drainage",
            ]}
          />
          <PreventionCard
            title="Next season planning"
            points={[
              "Use certified disease-free seeds",
              "Consider resistant varieties like IR64",
              "Apply preventive fungicide at tillering stage",
            ]}
          />
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <Card className="p-4 border-0 shadow-sm space-y-3">
            <DetailRow label="Disease type" value="Fungal" />
            <DetailRow label="Affected crop" value="Rice (Paddy)" />
            <DetailRow label="Favorable conditions" value="High humidity (>85%), Temperature 25-30°C" />
            <DetailRow label="Season risk" value="Highest during monsoon (June-September)" />
            <DetailRow label="Spread mechanism" value="Wind-borne spores, infected seeds" />
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add to Farm Log */}
      <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-transparent">
        <Leaf className="w-4 h-4 mr-2" />
        Add this to my farm log
      </Button>
      <p className="text-xs text-center text-muted-foreground">Data helps refine recommendations for your farm</p>

      {/* New Scan Button */}
      <Button onClick={onNewScan} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90">
        <Camera className="w-4 h-4 mr-2" />
        Scan another leaf
      </Button>
    </div>
  )
}

function TimelineCard({
  step,
  action,
  details,
  isLast = false,
}: { step: string; action: string; details: string; isLast?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary" />
        {!isLast && <div className="w-0.5 flex-1 bg-border mt-1" />}
      </div>
      <Card className="flex-1 p-3 border-0 shadow-sm">
        <p className="text-xs font-medium text-primary mb-1">{step}</p>
        <p className="text-sm text-foreground mb-2">{action}</p>
        <p className="text-xs text-muted-foreground">{details}</p>
      </Card>
    </div>
  )
}

function PreventionCard({ title, points }: { title: string; points: string[] }) {
  return (
    <Card className="p-4 border-0 shadow-sm">
      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        {title}
      </h4>
      <ul className="space-y-1.5">
        {points.map((point, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </Card>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}
