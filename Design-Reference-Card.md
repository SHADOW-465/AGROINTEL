# AgroIntel: Visual Design Reference Card
## Print This & Keep at Your Desk While Coding

---

## COLOR PALETTE (HEX CODES)

```
PRIMARY
┌─────────────────────────────┐
│ #22B550 Crop Success Green  │ Main actions, healthy, growth
│ #1FA347 Hover State         │ On hover
│ #178C3A Active State        │ On click
└─────────────────────────────┘

SECONDARY  
┌─────────────────────────────┐
│ #4A90E2 Clear Sky Blue      │ Info, weather, secondary
│ #3B7FC4 Hover State         │ On hover
└─────────────────────────────┘

WARNING/DANGER
┌─────────────────────────────┐
│ #E67E22 Warning Orange      │ Alerts, moderate risk
│ #E74C3C Critical Red        │ Errors, severe
│ #27AE60 Success Light Green │ Confirmation
└─────────────────────────────┘

BACKGROUNDS
┌─────────────────────────────┐
│ #FFFFFF White               │ Main content
│ #F5F5F5 Light Gray          │ Secondary background
│ #E8F7F1 Success Light Green │ Success states
│ #FFF5F4 Error Light Red     │ Error states
└─────────────────────────────┘

DARK MODE
┌─────────────────────────────┐
│ #1A1A1A Very Dark           │ Background
│ #2D2D2D Slightly Lighter    │ Cards
│ #F5F5F5 Off White           │ Text
│ #B0B0B0 Gray                │ Secondary text
└─────────────────────────────┘
```

---

## TYPOGRAPHY QUICK REFERENCE

```
FONT: Inter (Google Fonts, open-source)
FALLBACK: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

HIERARCHY:
┌──────────────────────────────────────┐
│ Display   32px | 700 weight | 1.2x  │ Page titles
├──────────────────────────────────────┤
│ H1        24px | 700 weight | 1.3x  │ Section titles
├──────────────────────────────────────┤
│ H2        18px | 600 weight | 1.4x  │ Card titles
├──────────────────────────────────────┤
│ Body      14px | 400 weight | 1.5x  │ Main text
├──────────────────────────────────────┤
│ Small     12px | 400 weight | 1.5x  │ Helper text
├──────────────────────────────────────┤
│ Button    14px | 600 weight         │ Action text
└──────────────────────────────────────┘
```

---

## COMPONENT SIZES

```
BUTTONS:
  Height: 44-56px (touch-friendly)
  Padding: 12px 24px (standard)
  Border Radius: 8px
  
INPUTS:
  Height: 44px (touch-friendly)
  Padding: 12px 14px
  Border Radius: 8px
  
ICONS:
  Small: 16px
  Regular: 24px
  Large: 32px
  Extra Large: 48px
  
CARDS:
  Padding: 16-24px
  Border Radius: 12px
  Border: 2px
  
SPACING:
  xs: 4px    (tight)
  sm: 8px    (small)
  md: 16px   (standard)
  lg: 24px   (large)
  xl: 32px   (extra large)
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile:  320px - 767px    (iPhone, Android phones)
         ↓
         Use bottom navigation
         Full-width buttons
         Single column layout
         
Tablet:  768px - 1024px   (iPad, large tablets)
         ↓
         2-column layouts possible
         Wider cards
         More whitespace
         
Desktop: 1025px+          (Laptops, desktops)
         ↓
         Sidebar navigation
         Multi-column layouts
         More features
```

---

## STATES & INTERACTIONS

```
BUTTON STATES:
┌─────────────────────────────────────┐
│ Default  │ Solid color             │
│ Hover    │ Darker shade (10-20%)   │
│ Active   │ Even darker             │
│ Focus    │ Blue outline (4px, 3px) │
│ Disabled │ 50% opacity             │
│ Loading  │ Spinner animation       │
└─────────────────────────────────────┘

FORM STATES:
┌─────────────────────────────────────┐
│ Empty    │ Light gray border       │
│ Focused  │ Blue border + shadow    │
│ Filled   │ Gray border             │
│ Error    │ Red border, red text    │
│ Success  │ Green border            │
└─────────────────────────────────────┘

LOADING:
  Show spinner (40px, rotating)
  Text: "Loading..." or process description
  Progress bar (if applicable)
  
ERRORS:
  Background: Light red (#FFF5F4)
  Border: Red (#E74C3C)
  Text: Dark red
  Icon: Alert icon
  Action: Retry or contact support
```

---

## GEMINI API QUICK REFERENCE

```
SETUP:
  1. Get key: aistudio.google.com/app/apikey
  2. Install: npm install @google/generative-ai
  3. Add to .env: NEXT_PUBLIC_GEMINI_API_KEY=your_key

MODEL:
  Model: gemini-1.5-flash (fast, cheap)
  Speed: ~2 seconds per request
  Accuracy: 80%+ on crop diseases
  Cost: Free tier for testing

BASIC CALL:
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent([image, prompt]);

FOR IMAGES:
  1. Convert to base64
  2. Set mimeType: 'image/jpeg'
  3. Include in inlineData object
  4. Send with text prompt
```

---

## ACCESSIBILITY CHECKLIST

```
COLORS:
  ☐ Text contrast ≥4.5:1
  ☐ Not color-only indicator
  ☐ Test with Contrast Checker

KEYBOARD:
  ☐ Tab order logical
  ☐ Tab focus visible
  ☐ Enter activates buttons
  ☐ Escape closes modals

SCREEN READER:
  ☐ alt text on images
  ☐ aria-label on icon buttons
  ☐ aria-live for dynamic updates
  ☐ aria-hidden for decorative

TOUCH:
  ☐ 44px minimum touch targets
  ☐ 8-12px gap between buttons
  ☐ Double-tap not required
  ☐ Long press for context menu

MOTION:
  ☐ Respect prefers-reduced-motion
  ☐ Avoid excessive animations
  ☐ Keep functionality without motion
```

---

## DARK MODE TOGGLE

```javascript
// Check system preference
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Manual override (save to localStorage)
function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

// Apply on load
const saved = localStorage.getItem('theme');
const theme = saved || (isDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);
```

---

## LOADING STATES

```
SKELETON SCREENS (Preferred):
  Show placeholder shapes
  Animated pulse effect
  Matches actual layout
  
SPINNERS (When layout unknown):
  40px circle
  2px border, top border colored
  Rotate 1s linear infinite
  
PROGRESS BARS (Long processes):
  Height: 4px
  Color: #22B550
  Animated fill
  Show percentage
```

---

## GEMINI PROMPT TEMPLATES

```
DISEASE DETECTION:
"You are a crop disease expert. Analyze this image.
Respond ONLY with JSON:
{
  'disease_name': '...',
  'confidence': 0-100,
  'severity': 'mild|moderate|critical',
  'treatment': { 'step_1': { ... } }
}"

CROP RECOMMENDATION:
"You are an agricultural consultant in India.
Based on this farm data, recommend top 3 crops.
Respond ONLY with JSON:
{
  'recommendations': [
    {
      'crop': '...',
      'suitability_score': 0-100,
      'expected_revenue': '...'
    }
  ]
}"

Q&A CHATBOT:
"You are AgroSmart, a helpful agricultural advisor.
Answer farming questions concisely.
Provide 2-3 action steps.
Be specific to Indian agriculture."
```

---

## PERFORMANCE CHECKLIST

```
LOAD TIME:
  ☐ Initial load <3 seconds
  ☐ Screen transitions <500ms
  ☐ API response <2 seconds
  
BUNDLE SIZE:
  ☐ JS < 200KB (gzipped)
  ☐ CSS < 50KB (gzipped)
  ☐ Total < 250KB
  
IMAGES:
  ☐ Compressed < 10MB
  ☐ WebP format preferred
  ☐ Responsive sizes
  ☐ Lazy loading
  
CACHING:
  ☐ Service workers enabled
  ☐ Offline fallback working
  ☐ LocalStorage sync set up
```

---

## FILE STRUCTURE FOR REFERENCE

```
src/
├── pages/
│   ├── disease-detection.tsx    (Main feature)
│   ├── farm-profile.tsx
│   ├── community.tsx
│   ├── api/
│   │   └── analyze.ts           (Gemini endpoint)
│   └── settings.tsx
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── DiseaseResult.tsx
│   ├── FarmCard.tsx
│   ├── Navigation.tsx
│   └── Loading.tsx
├── lib/
│   ├── gemini.ts                (API helpers)
│   ├── storage.ts               (localStorage)
│   └── types.ts                 (TypeScript types)
├── styles/
│   └── globals.css              (Design tokens)
├── .env.local                   (API keys - DON'T COMMIT)
└── next.config.js
```

---

## TESTING CHECKLIST

```
DEVICE TESTING:
  ☐ iPhone SE (small screen)
  ☐ iPhone 12 (standard)
  ☐ iPhone 13+ (large screen)
  ☐ Android 8 (low spec)
  ☐ Android 12+ (modern)
  ☐ iPad (tablet)
  
BROWSER TESTING:
  ☐ Chrome (latest)
  ☐ Safari (iOS)
  ☐ Firefox (desktop)
  
FEATURE TESTING:
  ☐ Disease detection accuracy >80%
  ☐ Image upload working
  ☐ API calls completing
  ☐ Offline mode working
  ☐ Dark mode toggle
  ☐ Navigation smooth
  ☐ Forms submitting
  
PERFORMANCE:
  ☐ Load time <3s
  ☐ Disease API <2s
  ☐ No console errors
  ☐ No memory leaks
```

---

## QUICK COLOR LOOKUP (Copy the HEX)

```
For Primary Actions:           Copy #22B550
For Hover State:               Copy #1FA347
For Secondary Actions:         Copy #F5F5F5
For Info/Weather:              Copy #4A90E2
For Warnings:                  Copy #E67E22
For Errors:                    Copy #E74C3C
For Success:                   Copy #27AE60
For Text Primary:              Copy #2C3E50
For Text Secondary:            Copy #95A5A6
For Backgrounds:               Copy #F5F5F5
For Cards:                     Copy #FFFFFF
For Dark Background:           Copy #1A1A1A
For Dark Text:                 Copy #F5F5F5
For Dark Cards:                Copy #2D2D2D
```

---

## FARMER-FRIENDLY DESIGN REMINDERS

✓ **Large buttons** (not small, not tiny)
✓ **Clear language** (no jargon, explain simply)
✓ **High contrast** (easy to read in sunlight)
✓ **Confirmation messages** (let user know action worked)
✓ **Error messages** (explain what went wrong)
✓ **Offline works** (no WiFi? Still works)
✓ **Local language** (English + Malayalam primary)
✓ **Show confidence** (82% accurate, not fake 100%)
✓ **Touch-friendly** (44px+ targets, 8px gaps)
✓ **Fast loading** (<3 seconds, they're impatient)

---

## COPY THIS TEXT STYLES

```
HEADING 1:
  <h1 style="font-size: 24px; font-weight: 700; line-height: 1.3;">
    Disease Detected
  </h1>

BODY TEXT:
  <p style="font-size: 14px; font-weight: 400; line-height: 1.5;">
    Brown spots on leaves indicate leaf spot disease.
  </p>

SMALL TEXT:
  <p style="font-size: 12px; color: #95A5A6; line-height: 1.5;">
    Updated 2 hours ago
  </p>

BUTTON:
  <button style="
    background: #22B550;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
  ">
    Get Diagnosis
  </button>
```

---

## FINAL IMPLEMENTATION TIPS

1. **Start with the disease detection screen** - It's 70% of the value
2. **Use Tailwind or CSS variables** - Don't hardcode colors
3. **Test on real devices** - Your phone won't tell you everything
4. **Ask real farmers feedback** - They know what they need
5. **Cache everything locally** - Offline is non-negotiable
6. **Keep Gemini prompts consistent** - Version control them
7. **Monitor API usage** - Free tier has limits
8. **Test dark mode** - Evening farming is real
9. **Optimize images** - Mobile data is expensive
10. **Track metrics** - Build what farmers use

---

**Print this. Keep it visible. Reference while coding.**

**You have the colors. You have the sizes. You have the code.**

**No more design decisions. Just implement.**

---

Document prepared: December 6, 2025
Status: Quick reference card for development