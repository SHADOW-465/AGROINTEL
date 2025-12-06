"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Mic, Leaf, User, Scan, Sprout, TrendingUp } from "lucide-react"

interface ChatScreenProps {
  onBack: () => void
}

type Message = {
  id: string
  type: "user" | "assistant"
  content: string
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "Hello! I'm your AgroIntel assistant. I can help you with crop diseases, farming practices, and recommendations. What would you like to know?",
    suggestions: ["Check disease", "Plan next crop", "View market prices"],
  },
]

export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(input),
        suggestions: ["Tell me more", "Check another issue", "View treatment options"],
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-[#F6F4F0] to-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Ask AgroSmart</h1>
            <p className="text-xs text-muted-foreground">Ask about your crops, diseases, or farming practices</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.type === "user" ? "bg-primary" : "bg-muted"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Leaf className="w-4 h-4 text-primary" />
                )}
              </div>

              {/* Message Bubble */}
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-2xl ${
                    message.type === "user" ? "bg-[#E0F8EA] rounded-tr-sm" : "bg-card shadow-sm rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                </div>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-full hover:bg-muted/80 transition-colors flex items-center gap-1.5"
                      >
                        {suggestion === "Check disease" && <Scan className="w-3 h-3" />}
                        {suggestion === "Plan next crop" && <Sprout className="w-3 h-3" />}
                        {suggestion === "View market prices" && <TrendingUp className="w-3 h-3" />}
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-card border-t border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your issue (example: spots on my rice leaves)…"
            className="flex-1 h-11 px-4 rounded-full border border-border bg-muted/50 text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground"
          />
          <button className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <Mic className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes("spot") || lowerInput.includes("disease") || lowerInput.includes("leaf")) {
    return "There is a moderate chance of fungal disease based on your description. Brown spots with yellow halos are often signs of leaf spot disease. I recommend:\n\n• Inspecting affected leaves closely\n• Using the disease scanner for accurate diagnosis\n• Keeping foliage dry during evening hours\n\nWould you like me to guide you through the disease detection process?"
  }

  if (lowerInput.includes("crop") || lowerInput.includes("plant") || lowerInput.includes("grow")) {
    return "For the current Kharif season in Kerala, rice varieties like Jyothi and Uma are excellent choices for high-rainfall areas. If you have good irrigation, consider Nendran banana for higher returns. Would you like a detailed crop recommendation based on your specific farm conditions?"
  }

  if (lowerInput.includes("market") || lowerInput.includes("price")) {
    return "Current market trends in Kerala:\n\n• Coconut: ₹28-32/kg (rising trend)\n• Rice: ₹22-25/kg (stable)\n• Banana Nendran: ₹35-42/kg (high demand)\n• Black pepper: ₹380-420/kg (seasonal peak)\n\nPrices may vary by district. Would you like details for a specific crop?"
  }

  return "I understand you're asking about farming. Could you please provide more details? I can help with:\n\n• Crop disease identification and treatment\n• Seasonal crop recommendations\n• Market price information\n• Weather-based farming advice\n\nJust describe your situation and I'll assist you!"
}
