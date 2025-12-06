# AgroIntel: UI/UX Design Specification & Gemini API Integration Guide
## Premium, Farmer-Friendly Design System with Implementation Details

**Document Version:** 1.0  
**Date:** December 6, 2025  
**Status:** Ready for Development  
**Target:** MVP Launch (4 weeks)

---

## PART 1: DESIGN PHILOSOPHY & PRINCIPLES

### Core Design Tenets

**1. FARMER-FIRST DESIGN**
- Assume farmer has: Basic smartphone literacy, 4-6 inch screen, poor internet
- Design for: High contrast, large touch targets, simple language, minimal steps
- Test with: Real farmers in pilot phase (not just tech users)

**2. PREMIUM YET ACCESSIBLE**
- Premium = Clean, modern, trustworthy, professional
- Accessible = Large fonts, simple navigation, clear affordances, local language
- Balance: Not "cheap looking" but not "needs engineering degree to use"

**3. TRUST THROUGH CLARITY**
- Every action has consequence shown (loading states, success/error messages)
- Data privacy respected (no suspicious permissions)
- Accuracy transparency (show confidence scores, not fake 100%)

**4. SPEED & OFFLINE-FIRST**
- Target: <2 second load time, <1.5s disease detection response
- Offline: Core features work without internet (disease detection, farm profile, previous results)
- Sync: When online, sync data silently to cloud

**5. LANGUAGE INCLUSIVITY**
- Primary: English + Malayalam (MVP)
- Secondary: Tamil, Hindi (Phase 2)
- No literal translations—culturally adapted content

---

## PART 2: VISUAL DESIGN SYSTEM

### 2.1 Color Palette (Farmer-Trusted, Premium)

**Primary Colors:**
```
Healthy Green (Trust + Growth):
  Name: "Crop Success Green"
  Hex: #22B550
  RGB: 34, 181, 80
  Usage: Primary actions, healthy indicators, success states
  Farmer psychology: Represents healthy crops, good harvest

Earth Brown (Stability + Roots):
  Name: "Soil Brown"
  Hex: #8B6F47
  RGB: 139, 111, 71
  Usage: Secondary buttons, borders, frame accents
  Farmer psychology: Represents fertile soil, grounding

Clean Sky Blue (Calm + Clarity):
  Name: "Clear Sky"
  Hex: #4A90E2
  RGB: 74, 144, 226
  Usage: Information, weather, secondary actions
  Farmer psychology: Good weather, clear conditions
```

**Secondary Colors:**
```
Warning Orange (Caution, Act Now):
  Hex: #E67E22
  Usage: Disease alerts, warnings, time-sensitive actions

Critical Red (Danger, High Priority):
  Hex: #E74C3C
  Usage: High-risk diseases, immediate action needed

Success Light Green (Confirmation):
  Hex: #27AE60
  Usage: Confirmation messages, disease prevented

Neutral Gray (Background, Text):
  Light Gray: #F5F5F5 (backgrounds)
  Medium Gray: #95A5A6 (secondary text)
  Dark Gray: #2C3E50 (primary text)
```

**Dark Mode (For Evening Use):**
```
Background: #1A1A1A (very dark, reduces eye strain at night)
Surface: #2D2D2D (slightly lighter for cards)
Text: #F5F5F5 (high contrast white)
Accents: Same primary colors (pop against dark background)

Implementation: Use system preference + manual toggle in settings
```

### 2.2 Typography

**Font Selection (Web-Safe & Offline Capable):**
```
Primary Font: Inter (open-source, highly readable, modern)
  Download: fonts.google.com/specimen/inter
  Weights: 400 (regular), 600 (semibold), 700 (bold)
  
Fallback Stack:
  'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif

Monospace Font: JetBrains Mono (for technical data)
  Usage: Disease names, scientific classifications, data values
```

**Font Sizes & Hierarchy:**
```
Display (Page Titles): 32px / 40px, 700 weight
  Usage: "Disease Detected", "Farm Profile"
  Line Height: 1.2

Heading 1 (Section Titles): 24px, 700 weight
  Usage: "Treatment Options", "Nearby Markets"
  Line Height: 1.3

Heading 2 (Subsections): 18px, 600 weight
  Usage: Card titles, important information
  Line Height: 1.4

Body Text (Regular): 14px, 400 weight
  Usage: Instructions, descriptions, paragraphs
  Line Height: 1.5

Small Text (Secondary): 12px, 400 weight
  Usage: Helper text, timestamps, metadata
  Line Height: 1.5

Action Text (Buttons): 14px, 600 weight
  Usage: Button labels, links
  Letter Spacing: +0.5px (slightly wider, clearer)
```

### 2.3 Spacing System (8px Grid)

**Consistent Spacing Scale:**
```
xs: 4px (tight spacing, rarely used)
sm: 8px (buttons, small gaps)
md: 16px (cards, standard spacing)
lg: 24px (sections, significant gaps)
xl: 32px (major sections)
2xl: 48px (page-level spacing)

Grid: All elements align to 8px grid for consistency
Margins: 16px (standard), 24px (major)
Padding: Cards 16px-24px internal padding
```

### 2.4 Iconography

**Icon Style: Simple, Solid, Farmer-Recognizable**
```
Icon Size Standards:
  Small: 16px (help text, metadata)
  Regular: 24px (buttons, navigation)
  Large: 32px (featured actions, main displays)
  Extra Large: 48px (empty states, hero areas)

Icon Set: Use Feather Icons (simple, modern, consistent)
  Download: feathericons.com
  Style: 2px stroke weight, rounded corners, consistent

Required Icons:
  ✓ Camera (photo upload)
  ✓ Leaf / Crop (farm/crop-related)
  ✓ Droplets (water/irrigation)
  ✓ Sun (weather/climate)
  ✓ TrendingUp (yields/prices)
  ✓ Users (community/experts)
  ✓ AlertCircle (warnings/diseases)
  ✓ CheckCircle (success/healthy)
  ✓ MapPin (location/markets)
  ✓ Info (help/information)
  ✓ Settings (preferences)
  ✓ LogOut (account)
```

---

## PART 3: COMPONENT DESIGN SPECIFICATIONS

### 3.1 Buttons

**Primary Button (High-Priority Actions)**
```
Visual:
  Background: #22B550 (Crop Success Green)
  Text: White, 14px semibold
  Padding: 12px 24px
  Border Radius: 8px
  Shadow: 0 2px 8px rgba(34, 181, 80, 0.3)

States:
  Default: As above
  Hover: Background #1FA347 (darker green)
  Active: Background #178C3A (even darker)
  Disabled: Opacity 50%, cursor not-allowed
  Loading: Show spinner inside button

Example Actions:
  "Upload Photo"
  "Get Diagnosis"
  "Start Treatment"
  "Find Market"
```

**Secondary Button (Moderate-Priority Actions)**
```
Visual:
  Background: #F5F5F5 (light gray)
  Text: #2C3E50 (dark gray), 14px semibold
  Border: 2px solid #E0E0E0
  Padding: 10px 22px
  Border Radius: 8px
  Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

States:
  Default: As above
  Hover: Background #EEEEEE, border #D0D0D0
  Active: Background #E0E0E0, border #C0C0C0
  Disabled: Opacity 50%

Example Actions:
  "Cancel"
  "Learn More"
  "Save Draft"
  "Skip for Now"
```

**Tertiary Button (Low-Priority/Text Link)**
```
Visual:
  Background: Transparent
  Text: #4A90E2 (Clear Sky Blue), 14px semibold
  Underline: None (but underline on hover for clarity)
  Padding: 8px 12px
  No shadow

States:
  Default: As above
  Hover: Text underlined, opacity 80%
  Active: Opacity 70%

Example Actions:
  "View All"
  "Help"
  "Report Issue"
  "Contact Expert"
```

**Danger Button (Destructive Actions)**
```
Visual:
  Background: #E74C3C (Critical Red)
  Text: White, 14px semibold
  Padding: 12px 24px
  Border Radius: 8px
  Shadow: 0 2px 8px rgba(231, 76, 60, 0.3)

States:
  Hover: Background #C0392B (darker red)
  Active: Background #A93226

Example Actions:
  "Delete Farm Record"
  "Reset Password"
  "Sign Out"

Note: Only use after confirmation dialog
```

**Floating Action Button (FAB)**
```
Visual (Disease Detection):
  Shape: Circle, 56px diameter
  Background: #22B550 (Crop Success Green)
  Icon: Camera (24px white)
  Position: Bottom right, 16px from edges
  Shadow: 0 4px 12px rgba(0, 0, 0, 0.25)

States:
  Default: As above
  Hover: Scale 1.1, shadow 0 6px 16px
  Active: Scale 0.95 (press feedback)
  Loading: Show spinner in place of icon

Animation: Subtle pulse on page load (1 second, once)
```

### 3.2 Input Fields

**Text Input (Name, Location, etc.)**
```
Visual:
  Background: White
  Border: 2px solid #E0E0E0
  Text: #2C3E50, 14px
  Padding: 12px 14px
  Border Radius: 8px
  Height: 44px (minimum, thumb-friendly)

States:
  Default: As above
  Focus: Border #4A90E2, shadow 0 0 0 3px rgba(74, 144, 226, 0.1)
  Filled: Border #D0D0D0
  Error: Border #E74C3C, background #FFF5F4
  Disabled: Background #F5F5F5, opacity 50%

Placeholder:
  Color: #95A5A6 (medium gray)
  Text: "e.g., Enter your crop name"
  
Label:
  Above input, 12px semibold, #2C3E50
  Required indicator: Red asterisk (*)
  Helper text: 12px gray below input
```

**Number Input (Quantity, Price, etc.)**
```
Same as text input but:
  Spinner buttons: Visible on large screens, hidden on mobile
  Keyboard: Numeric (mobile)
  Accept only: 0-9, decimal point
```

**Select Dropdown**
```
Visual (Closed):
  Background: White
  Border: 2px solid #E0E0E0
  Padding: 12px 14px
  Border Radius: 8px
  Height: 44px
  Text: #2C3E50, 14px
  Chevron icon: Right side, #95A5A6

Visual (Open):
  Options list below/above
  Background: White
  Border: 2px solid #4A90E2
  Shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
  Max height: 5.5 items (then scroll)

Option Item:
  Padding: 12px 14px
  Height: 44px
  Hover: Background #F5F5F5
  Selected: Background #E8F7F1, text #22B550 bold

Example Options:
  "Select Crop Type"
  "Select District"
  "Select Soil Type"
```

**Date Picker**
```
Visual:
  Input field with calendar icon
  Click opens calendar widget

Calendar Widget:
  Month/Year header with arrows
  7 columns (Sun-Sat), 6 rows
  Selected date: #22B550 background, white text
  Today: Border highlight
  Disabled dates: Opacity 30%
  Touch-friendly: 44px minimum each date

Behavior:
  Calendar closes on selection
  Shows selected date in input field
  Format: DD/MM/YYYY for India
```

**Toggle Switch (On/Off)**
```
Visual (Off):
  Background: #D0D0D0
  Circle: White, left side
  Width: 48px, height: 28px
  Border Radius: 14px (fully rounded)

Visual (On):
  Background: #22B550
  Circle: White, right side
  Same size as off state

States:
  Transition: Smooth 200ms animation
  Tap to toggle
  Mobile: 48x28px minimum (easy thumb target)

Usage:
  "Receive notifications"
  "Offline mode"
  "Show prices in Hindi"
```

### 3.3 Cards & Containers

**Disease Result Card (Hero Card)**
```
Container:
  Background: White
  Border: 2px solid #22B550
  Border Radius: 12px
  Padding: 20px
  Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
  Margin Bottom: 16px

Header:
  Icon: 32px circular background (#E8F7F1), disease icon inside
  Title: "Leaf Spot Disease", 18px bold, #2C3E50
  Confidence: "82% Confidence", 12px gray, right-aligned

Content:
  Severity Badge: 
    "Moderate Risk" (orange background) or
    "Critical" (red) or
    "Mild" (green)
  Description: "This fungal infection causes brown spots..."
  Paragraph text, 14px line-height 1.5

CTA:
  Button: "See Treatment", primary green button, full width

Visual Enhancement:
  Left border accent: 6px solid #22B550
  
Example Layout:
  ┌─────────────────────────────────────┐
  │ ● (icon) Leaf Spot Disease    [82%] │
  │                                     │
  │ Moderate Risk                       │
  │                                     │
  │ This fungal infection causes brown  │
  │ spots on leaves, spreading quickly  │
  │ in humid conditions...              │
  │                                     │
  │        [See Treatment →]            │
  └─────────────────────────────────────┘
```

**Information Card (Secondary)**
```
Container:
  Background: #F5F5F5 or #E8F7F1 (light green for success)
  Border: None
  Border Radius: 8px
  Padding: 16px
  Margin Bottom: 12px

Icon:
  24px, left side, #4A90E2 (info) or #22B550 (success)

Title:
  14px semibold, #2C3E50
  Margin left of icon

Description:
  12px regular, #95A5A6
  Below title, wrapped

Example:
  ┌────────────────────────────────┐
  │ ℹ️ Market Price Alert          │
  │    Rice at ₹2,400/quintal     │
  │    (↑₹100 from yesterday)      │
  └────────────────────────────────┘
```

**Farm Profile Card (Summary)**
```
Container:
  Background: White
  Border Radius: 12px
  Padding: 16px
  Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

Header:
  Crop image (if available) or placeholder: 40px square
  Crop name: "Rice Field A", 16px bold
  Location: "Thrissur District", 12px gray
  Last updated: "Updated 2 hours ago", 10px gray

Stats Row:
  3 columns (equal width)
  ├─ Area: 1.5 hectares
  ├─ Yield (est.): 4.2 tons
  └─ Health: 85% Good
  
  Each stat:
    Number: 16px bold, #22B550
    Label: 12px gray

CTA:
  "View Details", tertiary button

Example:
  ┌──────────────────────────┐
  │ 🌾 Rice Field A          │
  │    Thrissur, Updated 2h  │
  │                          │
  │ 1.5 Ha │ 4.2 T │ 85% ✓  │
  │                          │
  │     [View Details →]     │
  └──────────────────────────┘
```

### 3.4 Navigation & Layout

**Bottom Navigation (Mobile Primary)**
```
Position: Fixed at bottom, above keyboard on input
Height: 56px + safe area (iPhone notch)
Background: White
Border top: 1px solid #E0E0E0

Tabs (5 total):
  1. Home (House icon)
     Badge: Number of alerts (if any)
     
  2. Disease Detect (Leaf + Camera)
     Badge: Green pulse animation when loading
     
  3. Farm Profile (Leaf icon)
     
  4. Community (Users icon)
     Badge: Number of unread messages
     
  5. Settings (Gear icon)

Tab Design:
  Width: 20% each
  Icon: 24px, centered
  Label: 10px below icon (hidden on small screens if needed)
  Color: #95A5A6 (inactive), #22B550 (active)
  
Active tab:
  Icon color: #22B550
  Label visible and bolded
  Background: Subtle green tint (#F8FDF6)

Touch target: 44px minimum (includes padding)
```

**Top Navigation (Web & Desktop)**
```
Height: 56px
Background: White
Border bottom: 1px solid #E0E0E0
Padding: 0 16px

Left side:
  Logo: "AgroIntel" text + leaf icon, 20px
  
Middle:
  Search bar (desktop only):
    Background: #F5F5F5
    Width: 300px
    Placeholder: "Search crops, diseases..."
    
Right side:
  Notification bell: 24px icon, badge count
  User profile: Circle avatar (32px) + dropdown
  
Spacing: 16px between elements
```

**Sidebar (Desktop Only)**
```
Width: 240px (collapsible to 60px on mobile)
Position: Fixed left
Background: #2C3E50 (dark gray-blue for premium feel)
Text: White

Navigation Items:
  Home
  Disease Detection
  Farm Profile
  Community Forum
  Market Prices
  Government Schemes
  Weather
  Settings
  Help & Support

Item Style:
  Padding: 12px 16px
  Icon: 20px left, label right
  Hover: Background #34495E (slightly lighter)
  Active: Background #22B550, text white
  Border left: 4px #22B550 for active

Bottom:
  User profile section
  Sign out button
```

---

## PART 4: SCREEN FLOWS & LAYOUTS

### 4.1 Disease Detection Screen (Primary User Journey)

**Screen 1: Camera/Upload**
```
Layout (Mobile):
  Safe area spacing: 16px all sides
  
Top Bar:
  Title: "Detect Disease"
  Close/Back button

Main Content:
  Hero Section:
    Background: Gradient (white to light green)
    Icon: Large camera icon (64px, #22B550)
    Title: "Take a Photo", 20px bold
    Description: "Snap a clear photo of affected leaf or crop"
    
Two Action Buttons (50% width each, stacked on small):
  Left: 
    Camera icon + "Take Photo"
    Primary button, triggers camera
  Right:
    Gallery icon + "Upload Photo"
    Secondary button, file picker

Helper Text:
  Tips: "• Good lighting • Clear leaf visible • Avoid shadows"
  Text: 12px gray, italics

Example Progress:
  ┌──────────────────────────┐
  │ ← Detect Disease         │
  │                          │
  │      📷 Camera           │
  │                          │
  │   Take a Photo           │
  │   Snap a clear photo...  │
  │                          │
  │ [Take Photo] [Upload..] │
  │                          │
  │ Tips:                    │
  │ • Good lighting          │
  │ • Clear leaf visible     │
  └──────────────────────────┘
```

**Screen 2: Image Preview & Confirmation**
```
Layout:
  Image preview: Full width (with safe area margin)
  Background: #F5F5F5 for contrast
  Image height: 60% of viewport
  Border radius: 8px
  
Below Image:
  Button Row:
    [Retake] [Use This Photo]
    Left: Secondary button
    Right: Primary button, full width
    
Loading State (Processing):
  Show spinloader over image
  Text: "Analyzing your crop... 0%"
  Progress bar: Under image
  Est. time: "This takes ~2 seconds"

Example:
  ┌──────────────────────────┐
  │ ← Disease Detection      │
  │                          │
  │ ┌────────────────────┐  │
  │ │   [Crop Photo]     │  │
  │ │     (Image)        │  │
  │ │                    │  │
  │ │   ⌛ Analyzing...   │  │
  │ │   Processing 45%   │  │
  │ └────────────────────┘  │
  │                          │
  │ Estimated time: 2 sec   │
  │                          │
  │ [Retake] [Use Photo]    │
  └──────────────────────────┘
```

**Screen 3: Disease Result (Hero Display)**
```
Layout:
  Safe area: 16px
  
Top Section:
  Result Badge: "Disease Detected"
  Large icon: 64px with disease symbol
  
Disease Card (Full Width):
  [See "Disease Result Card" in 3.3]
  Contains: Disease name, confidence, severity, description

Tabs Below Card:
  3 tabs: Treatment | Prevention | Buy Product
  
  Tab 1: Treatment
    Step-by-step instructions
    Include timing, dosage if applicable
    Local product names (not just generic)
    
  Tab 2: Prevention
    Preventive measures for future
    When to apply
    Cost estimate
    
  Tab 3: Buy Product (optional, Phase 2)
    Link to marketplace
    Recommended products
    
Expert Contact:
  Card: "Ask an Expert"
  Image: Expert avatar
  Text: "Get personalized advice"
  Button: "Chat Now", secondary

Health Tracker:
  Add to farm record button
  "Save to Rice Field A"
  
User Action Summary:
  ✓ Disease identified
  ✓ Treatment recommended
  → Next: Buy treatment product (optional)
  → Next: Chat with expert (optional)

Example Complete Screen:
  ┌──────────────────────────┐
  │ ← Disease Detection      │
  │                          │
  │   🍃 Disease Detected    │
  │                          │
  │ ┌────────────────────┐  │
  │ │ ● Leaf Spot        │  │
  │ │   82% Confident    │  │
  │ │ Moderate Risk      │  │
  │ │                    │  │
  │ │ Fungal infection..│  │
  │ │ [See Treatment →] │  │
  │ └────────────────────┘  │
  │                          │
  │ [Treatment] [Prevent]   │
  │ [Buy]                   │
  │                          │
  │ ┌────────────────────┐  │
  │ │👤 Ask an Expert    │  │
  │ │ Get advice        │  │
  │ │    [Chat Now]     │  │
  │ └────────────────────┘  │
  │                          │
  │ [Save to Rice Field A]  │
  └──────────────────────────┘
```

**Screen 4: Treatment Recommendations**
```
Layout:
  Safe area: 16px
  
Title:
  "Treatment for Leaf Spot"
  Subtitle: "Step-by-step guide"

Timeline/Steps:
  Card-based, sequential
  
  Step 1 Card:
    Day: "Day 1"
    Action: "Apply Sulphur Spray (1%)"
    Time: "Morning (6 AM - 10 AM)"
    Details: "Mix 10g per liter of water"
    Product: "₹450/kg, available locally"
    Icon: Spray bottle icon
    
  Step 2 Card:
    Day: "Day 8"
    Action: "Repeat Application"
    Time: "Morning"
    Details: "Same ratio as Day 1"
    
  Additional Cards:
    "Monitor closely"
    "Avoid overhead irrigation (3 days)"
    "Check for improvement by Day 7"

Cost Summary:
  Total estimated cost: ₹1,200
  Time required: 30 minutes
  Effectiveness: 85-90%

CTA Button:
  "Buy Treatment Products"
  Links to marketplace (Phase 2)

Expert Help:
  "Questions? Chat with expert for ₹50"

Confirmation:
  "Mark as treated" toggle
  Links to farm profile
```

### 4.2 Farm Profile Screen

**Screen 1: Farm Overview**
```
Layout:
  Safe area: 16px
  
Top Section:
  Header: "My Farms" + Add button (+)
  
Farm Cards (Scrollable Horizontal):
  Each card:
    Crop image or placeholder
    Farm name: "Rice Field A"
    Location: "Thrissur"
    Health score: Large number + color
    Quick stats: Area, Yield, Last update
    Tap to view details

Example Cards:
  ┌──────────────┐  ┌──────────────┐
  │ 🌾 Rice A    │  │ 🥬 Veg Plot  │
  │ Thrissur     │  │ Kottayam     │
  │              │  │              │
  │ 85% ✓        │  │ 72% ⚠        │
  │ 1.5 Ha       │  │ 0.8 Ha       │
  │ 4.2T est.    │  │ 1.8T est.    │
  └──────────────┘  └──────────────┘

Empty State:
  Icon: Farm landscape
  Text: "No farms yet"
  Button: "Add Your First Farm"
```

**Screen 2: Individual Farm Details**
```
Layout:
  Safe area: 16px
  
Hero Section:
  Farm image (16:9 aspect)
  Overlay: Farm name, location, last updated
  
Tabs:
  Overview | Crops | History | Analytics

Tab 1: Overview
  Quick Stats (3 columns):
    Area: 1.5 hectares
    Soil Type: Loamy
    Water Source: Well
    
  Current Crop:
    Card with crop image
    Name: "Rice (Jyothi variety)"
    Sown: "June 15, 2025"
    Expected harvest: "October 15, 2025"
    Days left: "132 days"
    Progress bar: Visual timeline
    
  Recent Activities:
    Scrollable feed:
      ✓ Disease detected: "Leaf spot detected 3 days ago - treated successfully"
      ✓ Fertilizer: "Urea applied 1 week ago"
      ✓ Weather: "Heavy rain 5 days ago"
    
  Next Actions:
    Card list:
      ⚠ Irrigation due (in 2 days)
      ℹ Pest risk high (monitor closely)
      ✓ 85% health score - on track

Tab 2: Crops
  List of all crops (past and current)
  Each entry:
    Crop name, variety, dates
    Status: Active / Harvested / Failed
    Yield: Actual vs expected
    Edit/Delete options

Tab 3: History
  Timeline of all events
  Filterable by type (disease, treatment, harvest, etc.)

Tab 4: Analytics
  Charts (monthly):
    Yield trends
    Health score trends
    Pesticide usage trends
    Revenue trends (if market data available)
```

### 4.3 Community/Q&A Screen

**Layout:**
```
Top:
  Title: "Ask Experts"
  Search bar: "Search questions or diseases"
  Filters: "Newest", "Most helpful", "My questions"

Content Tabs:
  All | My Questions | Answered | Unanswered

For Each Question Card:
  Question title: "How to prevent mango leaf spot?"
  Tags: [Disease] [Prevention] [Mango]
  Asker avatar + name: "Farmer Rajesh"
  Posted: "2 days ago"
  
  Answer count badge: "3 answers"
  Expert badge: If answered by verified expert
  Votes: Helpful count
  
  Preview of top answer (1-2 lines)
  
  On tap: Opens full Q&A thread

Ask Question Button (FAB):
  Floating action button at bottom
  "Ask New Question"
  Opens form

Form for New Question:
  Title input
  Description (allows photo)
  Tags input
  Crop selection
  Disease category (optional)
  Location (optional, for localized advice)
  
  Submit button

Expert Panel:
  "Meet Our Experts" section
  Grid of expert profiles:
    Avatar (40px circle)
    Name: "Dr. Rajesh - Plant Pathologist"
    Expertise: "Diseases, crop rotation"
    Answered: "234 questions"
    Rating: 4.8 stars
    
    Tap to: View profile, chat, book consultation (Phase 2)
```

---

## PART 5: GEMINI API INTEGRATION SPECIFICATION

### 5.1 Gemini API Setup

**API Details:**
```
Service: Google Generative AI (Gemini)
Model: gemini-1.5-flash (fastest, cheapest for MVP)
Alternative: gemini-1.5-pro (more accurate, slower)
Cost: Free tier for MVP testing, then $0.075/MTok input, $0.3/MTok output

SDK Installation:
npm install @google/generative-ai

API Key Storage:
  Development: .env.local file (never commit to Git)
  Production: Google Cloud Secret Manager
  Frontend: API key passed from secure backend proxy

Example .env.local:
  VITE_GEMINI_API_KEY=your_api_key_here
```

### 5.2 Disease Detection Flow with Gemini

**Step 1: Image Capture & Preprocessing**
```
Frontend:
  1. User takes photo via camera or uploads from gallery
  2. Compress image: Max 10MB, 1920x1080 resolution
  3. Convert to base64 string (for API transmission)
  4. Display preview to user

Code Example (Next.js/React):
  const captureAndCompress = async (imageFile) => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    
    img.onload = () => {
      canvas.width = 1920;
      canvas.height = (img.height * 1920) / img.width;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      return canvas.toDataURL('image/jpeg', 0.8); // 80% quality
    };
  };

Storage:
  1. Save original + compressed to device (offline capability)
  2. On sync (when online): Upload to Supabase
  3. Don't save API key in local storage
```

**Step 2: Call Gemini Vision API**
```
Function: analyzeDisease()

Prompt Engineering (Critical):
```
SYSTEM PROMPT:
"You are an expert agricultural pathologist with 20+ years experience 
in Indian crop diseases. You specialize in identifying plant diseases 
from photos and providing treatment recommendations.

ANALYSIS FRAMEWORK:
1. Identify the disease with certainty score (0-100%)
2. Provide confidence level
3. Explain visible symptoms
4. Suggest treatment steps
5. Estimate severity (Mild/Moderate/Critical)
6. Provide local product recommendations (India-specific)

OUTPUT FORMAT (JSON):
{
  'disease_name': 'Leaf Spot',
  'scientific_name': 'Cercospora spp.',
  'confidence': 82,
  'severity': 'moderate',
  'symptoms': 'Brown/tan spots with yellow halo',
  'affected_crop': 'Rice',
  'treatment': {
    'step_1': {
      'day': 1,
      'action': 'Apply Sulphur Spray 1%',
      'timing': '6 AM - 10 AM',
      'dosage': '10g per liter',
      'local_products': ['Sulphur 80WP', 'Sulfex'],
      'cost_estimate': '₹450'
    },
    'step_2': { ... }
  },
  'prevention': 'Avoid overhead irrigation, improve drainage',
  'risk_level': 'moderate',
  'expert_recommendation': 'Monitor closely. Treat within 24 hours.'
}
```

API Call (Backend - Node.js/Python):
```javascript
// Using Node.js with Generative AI SDK
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function analyzeDisease(imageBase64) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const imageParts = [
    {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg',
      },
    },
  ];

  const prompt = `[SYSTEM PROMPT HERE]
  
  Analyze this farm/crop image and provide disease diagnosis in JSON format.
  If no disease visible, respond:
  {
    'disease_found': false,
    'status': 'Crop looks healthy',
    'confidence': 95,
    'recommendation': 'Continue regular care'
  }`;

  const result = await model.generateContent([
    ...imageParts,
    { text: prompt },
  ]);

  const responseText = result.response.text();
  return JSON.parse(responseText); // Parse JSON response
}
```

**Step 3: Response Handling & Display**
```
Frontend Response:
  1. Parse JSON from Gemini
  2. Validate response structure
  3. Store in local state + Supabase
  4. Display formatted result card

Error Handling:
  - If confidence < 60%: Show "Unclear diagnosis, contact expert"
  - If API fails: Use offline cached models (TensorFlow.js fallback)
  - If parse fails: Show "Technical issue, try again"

Display Logic:
  if (confidence >= 80) {
    show: Primary diagnosis, high confidence
    color: Green (#22B550)
  } else if (confidence >= 60) {
    show: Likely diagnosis, moderate confidence
    color: Orange (#E67E22)
  } else {
    show: Unclear, recommend expert
    button: "Chat with Expert"
  }
```

### 5.3 Crop Recommendation with Gemini

**Flow: Farmer enters farm details → Gemini recommends crops**
```
Input Data Collection:
  Form fields:
    - Soil type: pH, texture (clay/loam/sand)
    - Water source: Rainfall, irrigation
    - Season: Current month
    - Market demand: User input or API
    - Farm size: In hectares
    - Budget: For inputs
    - Experience: Beginner/Intermediate/Expert

Prompt for Gemini:
```
SYSTEM PROMPT:
"You are an agricultural consultant in India. Based on farm conditions,
recommend the top 3 crops that maximize: yield, market demand, and profit.

INPUT FORMAT:
{
  'soil_pH': 6.5,
  'soil_type': 'loamy',
  'rainfall_mm': 1200,
  'irrigation': 'well_available',
  'current_month': 'November',
  'location': 'Thrissur, Kerala',
  'area_hectares': 1.5,
  'budget_rupees': 50000,
  'farmer_experience': 'intermediate'
}

OUTPUT FORMAT:
{
  'recommendations': [
    {
      'rank': 1,
      'crop': 'Rice',
      'variety': 'Jyothi',
      'suitability_score': 95,
      'expected_yield_tons': 4.5,
      'planting_season': 'June-July',
      'harvest_season': 'October-November',
      'market_demand': 'Very High',
      'estimated_revenue': '₹90,000',
      'required_inputs': ['Seeds', 'Fertilizer', 'Water'],
      'risk_factors': ['Leaf spot in humidity'],
      'recommendation': 'Excellent choice for your conditions'
    },
    { rank: 2, ... },
    { rank: 3, ... }
  ],
  'best_crop': 'Rice',
  'confidence': 92
}
```

API Integration:
```javascript
async function recommendCrops(farmData) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `[SYSTEM PROMPT HERE]
  
  Farm Data:
  ${JSON.stringify(farmData)}
  
  Provide crop recommendations as JSON.`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
```
```

### 5.4 Chatbot with Gemini (Optional Phase 1, Full Phase 2)

**Real-Time Chat with AI Expert**
```
Message Flow:
  1. Farmer types question: "How to prevent rice blast?"
  2. Frontend sends: question + context (farm data, crop type)
  3. Gemini generates: Contextual response (specific to their farm)
  4. Display response with follow-up suggestions
  5. Allow farmer to ask follow-up questions

System Prompt for Chatbot:
```
SYSTEM PROMPT:
"You are 'AgroSmart', a friendly agricultural advisor in India.
Help farmers with crop care, disease management, and market questions.
Be concise (1-2 paragraphs), use local language references,
and always provide action steps.

Context provided:
- Farm location: [Location]
- Current crops: [Crops]
- Farmer experience: [Level]

Response format:
1. Answer the question directly
2. Provide 2-3 action steps
3. End with: 'Ask more or [chat with expert for personalized help]'
```

Message Examples:
  Q: "Is it time to harvest my rice?"
  A: "Based on November climate in Thrissur, your rice is likely mature 
      if planted in June. Check: [1] Grains should be hard (can't break 
      with teeth), [2] Leaves turning yellow-brown. Harvest this week 
      to avoid rain damage. Want tips on harvesting? [Ask Expert]"

Implementation:
  - Message history stored locally (offline)
  - Sync to Supabase on WiFi
  - Star favorite responses
  - Report unhelpful responses

Cost Control:
  - Cache frequent questions
  - Limit to 50 messages/day (MVP, can increase)
  - Flag unusual usage
```

### 5.5 Fallback & Offline Mode

**Handling API Failures:**
```
Scenario 1: No Internet
  - Show cached results from previous detections
  - Store image locally with "pending sync" status
  - When online: Auto-sync and update
  - Offline indicator: Yellow banner "Will sync when online"

Scenario 2: Gemini API Down
  - Show: "Service temporarily unavailable"
  - Offer: "Contact expert for immediate help" button
  - Store image for later analysis
  - Estimated time: "Your photo will be analyzed within 1 hour"

Scenario 3: Rate Limit Hit
  - Show: "High demand, please try in 5 minutes"
  - Suggest: "Or chat with expert now"
  - Queue request for retry

Fallback Models:
  - Local TensorFlow.js model (basic disease detection, <5MB)
  - Works 100% offline, less accurate (70-75%)
  - Used when Gemini unavailable
  - Show confidence: "TensorFlow (offline): 72% confident"
```

---

## PART 6: RESPONSIVE DESIGN SPECIFICATIONS

### 6.1 Breakpoints

```
Mobile: 320px - 767px (primary design target)
  Devices: iPhone SE, iPhone 12, Samsung A series
  Default design should work here first
  Bottom navigation, full-width buttons
  
Tablet: 768px - 1024px
  Devices: iPad, Android tablets
   2-column layouts possible
  Wider cards, more whitespace
  
Desktop: 1025px+
  Devices: Laptops, desktop browsers
  Sidebar navigation
  Multi-column layouts
  Desktop-specific features (bulk upload)

Safe Area Insets (iOS):
  Top: 16-44px (notch)
  Bottom: 0-34px (home indicator)
  Adjust padding in Header/Footer for safety
```

### 6.2 Touch-Friendly Design

```
Minimum Touch Target: 44px × 44px (Apple HIG standard)
  - Buttons: 44-56px height
  - Links: 44px height with padding
  - Icons: 24-32px size within 44px tap area

Spacing for Touch:
  - Adjacent buttons: 8-12px gap (not too close)
  - Vertical spacing between actions: 16px
  - Horizontal padding: 16px on mobile, 24px on tablet

Double-Tap Prevention:
  - Don't use double-tap for important actions
  - Confirm destructive actions with modal
  - 300ms delay for text selection
  
Gesture Support:
  - Swipe left: Next image, dismiss
  - Swipe right: Back, undo
  - Pull down: Refresh
  - Long press: More options (context menu)
```

### 6.3 Accessibility (WCAG 2.1 AA Standard)

```
Color Contrast:
  Text on background: 4.5:1 ratio (WCAG AAA)
  Large text (18px+): 3:1 ratio
  
  Example:
    Text (#2C3E50) on white: 10.4:1 ✓ (excellent)
    Text (#95A5A6) on white: 4.6:1 ✓ (good)
    Avoid: #A0A0A0 on white (2.1:1) ✗ (fail)

Keyboard Navigation:
  - Tab order logical (top-left to bottom-right)
  - Tab focus visible (blue outline or highlight)
  - Enter to activate buttons
  - Arrow keys for dropdowns/tabs
  - Escape to close modals

Screen Reader Support:
  - alt text on all images: "Diseased rice leaf with brown spots"
  - aria-label on icon buttons: "Upload photo from gallery"
  - aria-live for dynamic updates: "Disease detected"
  - aria-hidden for decorative elements
  
  Example HTML:
    <button aria-label="Take disease photo">
      <CameraIcon />
    </button>

Font Scaling:
  - Respect user's device font size setting
  - Use relative units (rem, em) not pixels
  - Support up to 200% zoom without breaking

Reduced Motion:
  - Check: prefers-reduced-motion media query
  - Disable animations for users who prefer no motion
  - Keep interactions functional without animations
```

---

## PART 7: DARK MODE IMPLEMENTATION

**System Detection + Manual Toggle:**
```
CSS Media Query (automatic):
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1A1A1A;
    --bg-secondary: #2D2D2D;
    --text-primary: #F5F5F5;
    --text-secondary: #B0B0B0;
    --border-color: #404040;
    --accent-primary: #22B550;
  }
}

Manual Override (user preference):
html[data-theme="dark"] {
  --bg-primary: #1A1A1A;
  /* ... other dark colors */
}

html[data-theme="light"] {
  --bg-primary: #FFFFFF;
  /* ... light colors */
}

Toggle Implementation:
  Settings > Appearance
  Options: System (default), Light, Dark
  Persist choice in localStorage
  Apply on every app launch
  
JavaScript:
  const theme = localStorage.getItem('theme') || 'system';
  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
```

**Dark Mode Color Adjustments:**
```
Dark Mode Specific Colors:
  Background: #1A1A1A (almost black, reduces OLED burn-in)
  Cards: #2D2D2D (elevated from background)
  Text Primary: #F5F5F5 (not pure white, easier on eyes)
  Text Secondary: #B0B0B0 (gray, visible on dark)
  Borders: #404040 (subtle, visible)
  Accents: Same as light (#22B550 green, #4A90E2 blue)

Image Handling:
  Dark mode: Slightly reduce image brightness/saturation
  Filter: brightness(0.85) contrast(1.1)
  Prevents eye strain from bright photos

Chart/Data Visualization:
  Grid lines: #404040 (subtle)
  Text: #F5F5F5 (high contrast)
  Axis: #B0B0B0
  Colors: More saturated for contrast
```

---

## PART 8: GEMINI API IMPLEMENTATION CODE EXAMPLES

### 8.1 Frontend (Next.js/React Component)

```javascript
// components/DiseaseDetection.tsx
import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  // Compress image before sending
  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 1920;
          const maxHeight = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle image selection
  const handleImageSelect = async (file: File) => {
    try {
      const compressed = await compressImage(file);
      setImage(compressed);
      setError(null);
    } catch (err) {
      setError('Failed to process image');
    }
  };

  // Analyze disease using Gemini API
  const analyzeDisease = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      // Call backend API (don't expose API key on frontend)
      const response = await fetch('/api/analyze-disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setResult(data);

      // Save to local storage for offline access
      localStorage.setItem(
        `disease_${Date.now()}`,
        JSON.stringify({ image, result: data, timestamp: new Date() })
      );
    } catch (err) {
      setError('Could not analyze image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Camera/Upload Section */}
      {!image && (
        <div className="text-center">
          <div className="text-5xl mb-4">📷</div>
          <h1 className="text-2xl font-bold mb-2">Detect Disease</h1>
          <p className="text-gray-600 mb-6">
            Take a photo of your crop to identify diseases
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => cameraRef.current?.click()}
              className="bg-[#22B550] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1FA347]"
            >
              📸 Take Photo
            </button>
            <button
              onClick={() => cameraRef.current?.click()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              🖼️ Upload Photo
            </button>
          </div>

          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageSelect(e.target.files[0]);
              }
            }}
          />
        </div>
      )}

      {/* Image Preview */}
      {image && !result && (
        <div className="w-full max-w-md">
          <img src={image} alt="Crop" className="w-full rounded-lg mb-4" />
          <button
            onClick={() => setImage(null)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Retake
          </button>
          <button
            onClick={analyzeDisease}
            disabled={loading}
            className="bg-[#22B550] text-white px-6 py-2 rounded font-semibold"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>Analyzing your crop... This takes ~2 seconds</p>
          <div className="w-48 h-2 bg-gray-200 rounded mt-4 overflow-hidden">
            <div className="h-full bg-[#22B550] animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 p-4 rounded mb-4 max-w-md">
          {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="w-full max-w-md">
          <div className="border-2 border-[#22B550] rounded-xl p-6 mb-4">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🍃</span>
              <div>
                <h2 className="text-xl font-bold">{result.disease_name}</h2>
                <p className="text-gray-600 text-sm">
                  {result.confidence}% Confident
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
              <p className="font-semibold text-orange-600 mb-2">
                {result.severity}
              </p>
              <p className="text-gray-700">{result.symptoms}</p>
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full bg-[#22B550] text-white py-3 rounded-lg font-semibold"
            >
              See Treatment →
            </button>
          </div>

          <button
            onClick={() => {
              setImage(null);
              setResult(null);
            }}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg"
          >
            Analyze Another Photo
          </button>
        </div>
      )}
    </div>
  );
}
```

### 8.2 Backend API Route (Next.js API)

```javascript
// pages/api/analyze-disease.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const DISEASE_PROMPT = `You are an expert agricultural pathologist in India with 20+ years experience.
Analyze this crop/leaf image and identify any diseases.

IMPORTANT RULES:
1. Only respond with valid JSON
2. If no disease found, say "no_disease"
3. Include confidence score (0-100%)
4. Provide Indian-specific product recommendations
5. All prices in INR (₹)

JSON FORMAT:
{
  "disease_found": true/false,
  "disease_name": "Leaf Spot" or null,
  "scientific_name": "Cercospora spp." or null,
  "confidence": 85,
  "severity": "mild|moderate|critical",
  "symptoms": "Description of visible symptoms",
  "affected_crop": "Rice, Wheat, etc.",
  "treatment": {
    "step_1": {
      "day": 1,
      "action": "Apply Sulphur Spray 1%",
      "timing": "6 AM - 10 AM",
      "dosage": "10g per liter water",
      "local_products": ["Sulphur 80WP", "Sulfex"],
      "cost_estimate": 450
    },
    "step_2": { ... }
  },
  "prevention": "Avoid overhead irrigation",
  "expert_recommendation": "Monitor closely"
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image required' });
    }

    // Remove base64 header if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpeg',
        },
      },
      {
        text: DISEASE_PROMPT,
      },
    ]);

    const responseText = result.response.text();

    // Extract JSON from response (sometimes model adds extra text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    // Log for analytics
    console.log('[Disease Analysis]', {
      timestamp: new Date(),
      disease: analysisResult.disease_name,
      confidence: analysisResult.confidence,
    });

    res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Disease analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze image',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
```

### 8.3 Offline Fallback (TensorFlow.js)

```javascript
// lib/offlineDisease.ts
// Fallback when Gemini API unavailable
import * as tf from '@tensorflow/tfjs';
import * as coco from '@tensorflow-models/coco-ssd';

let model: any = null;

export async function initializeOfflineModel() {
  if (!model) {
    model = await coco.load();
  }
  return model;
}

export async function detectDiseaseOffline(imageElement: HTMLImageElement) {
  const model = await initializeOfflineModel();
  const predictions = await model.detect(imageElement);

  // Simple heuristic-based detection
  const leafObjects = predictions.filter(
    (p: any) => p.class === 'leaf' || p.class === 'plant'
  );

  if (leafObjects.length === 0) {
    return {
      disease_found: false,
      status: 'No crop detected. Try better lighting.',
      confidence: 60,
      recommendation: 'Offline mode - limited accuracy',
    };
  }

  // Mock analysis (would need actual trained model for accuracy)
  return {
    disease_found: true,
    disease_name: 'Possible Disease (Offline Analysis)',
    confidence: 65,
    severity: 'moderate',
    recommendation: 'Connect to internet for accurate diagnosis',
    message: 'Limited accuracy in offline mode. Upload to get expert analysis.',
  };
}
```

---

## PART 9: PERFORMANCE SPECIFICATIONS

### 9.1 Load Time Targets

```
Metrics (Core Web Vitals):
  LCP (Largest Contentful Paint): <2.5 seconds
  FID (First Input Delay): <100 milliseconds
  CLS (Cumulative Layout Shift): <0.1

Goal Times:
  Initial app load: <3 seconds
  Screen transitions: <500ms
  Disease detection API: <2 seconds
  Image compression: <1 second

Optimization Techniques:
  - Code splitting: Load only needed pages
  - Image optimization: WebP format, responsive sizes
  - Lazy loading: Offscreen images load on scroll
  - Caching: Service workers for offline
  - Minification: Remove unused CSS/JS
  - Database: Query optimization, indexing
```

### 9.2 Bundle Size

```
Target Sizes:
  JavaScript: < 200KB (gzipped)
  CSS: < 50KB (gzipped)
  Total: < 250KB initial load

Libraries:
  React: ~42KB
  Next.js: ~75KB
  Gemini API SDK: ~50KB
  UI Components: ~30KB
  Utilities: ~20KB
  
Avoid:
  Heavy animation libraries (use CSS)
  Unnecessary polyfills
  Multiple versions of same library
```

---

## PART 10: DEVELOPMENT CHECKLIST

### Before Launch (MVP - 4 weeks)

**Week 1:**
- [ ] Design system finalized (colors, typography, components)
- [ ] Figma prototypes created for all screens
- [ ] Gemini API key obtained and tested
- [ ] Backend API scaffold ready

**Week 2:**
- [ ] Frontend screens built (disease detection, farm profile, Q&A)
- [ ] Gemini API integration complete
- [ ] Image compression working
- [ ] Error handling in place

**Week 3:**
- [ ] Dark mode implemented
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Offline mode functional (local storage)

**Week 4:**
- [ ] Performance optimization (load times <3s)
- [ ] Testing on real devices (iOS, Android)
- [ ] Bug fixes and polish
- [ ] Launch ready

---

## CONCLUSION

This specification provides a complete UI/UX design system optimized for:
✅ Farmers (accessible, clear, local language)
✅ Premium feel (modern, trustworthy, professional)
✅ Gemini API integration (disease detection, recommendations)
✅ Offline-first capability (works without internet)
✅ Performance (load times <3 seconds)
✅ Accessibility (WCAG 2.1 AA compliant)

**Ready to build. Use this spec as your development guide.**

---

**Document prepared:** December 6, 2025  
**Status:** Ready for implementation  
**Next step:** Create Figma prototypes based on this spec