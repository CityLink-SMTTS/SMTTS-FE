# SMTTS Next-Gen UI Design System

## Overview
This document outlines the premium glassmorphism design system implemented for the Smart Multi-Modal Transportation Terminal System (SMTTS).

## Design Philosophy
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Premium Gradients**: Smooth, vibrant color transitions
- **Depth & Layering**: Subtle shadows and elevation
- **Smooth Animations**: Micro-interactions for enhanced UX

---

## Color Palette

### Brand Gradients

#### Primary (Metro Prime)
- **Gradient**: `#0F2027` → `#203A43` → `#2C5364`
- **Usage**: Headers, primary branding, main navigation
- **Class**: `bg-grad-primary`

#### Eco/Sustainable (SDG 11)
- **Gradient**: `#134E5E` → `#71B280`
- **Usage**: Eco-friendly features, sustainability metrics, primary CTAs
- **Class**: `bg-grad-eco`
- **Shadow**: `shadow-teal-500/20`

#### Tech/NFC
- **Gradient**: `#4facfe` → `#00f2fe`
- **Usage**: Technology features, NFC cards, data visualizations
- **Class**: `bg-grad-tech`
- **Shadow**: `shadow-cyan-500/20`

#### Rewards/Gold
- **Gradient**: `#f6d365` → `#fda085`
- **Usage**: Revenue, rewards, premium features
- **Class**: `bg-grad-gold`
- **Shadow**: `shadow-orange-500/20`

#### Alert/Warning
- **Gradient**: `#ff416c` → `#ff4b2b`
- **Usage**: Alerts, warnings, critical notifications
- **Class**: `bg-grad-alert`
- **Shadow**: `shadow-red-500/20`

---

## Glassmorphism

### Glass Surface
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
```

### Tailwind Classes
- `bg-white/70` - Semi-transparent white background
- `backdrop-blur-glass` - 12px blur effect
- `border-white/50` - Semi-transparent border
- `shadow-glass` - Premium glass shadow
- `shadow-glass-hover` - Enhanced shadow on hover

---

## Typography

### Font Families
- **Sans**: `Inter` - Clean, modern, highly readable
- **Mono**: `JetBrains Mono` - For code, IDs, technical data

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800
- **Black**: 900

### Gradient Text
```jsx
<h1 className="text-3xl font-bold gradient-text-primary">
  SMTTS Dashboard
</h1>
```

Available classes:
- `gradient-text-primary`
- `gradient-text-eco`
- `gradient-text-tech`
- `gradient-text-gold`

---

## Components

### GlassCard
```jsx
import GlassCard from './components/common/GlassCard';

<GlassCard hover={true} gradient={false}>
  <div className="p-6">
    Card content here
  </div>
</GlassCard>

// With gradient
<GlassCard gradient={true} gradientType="eco">
  <div className="p-6 text-white">
    Eco-themed card
  </div>
</GlassCard>
```

### PremiumButton
```jsx
import PremiumButton from './components/common/PremiumButton';

<PremiumButton variant="eco" size="md" icon={<Icon />}>
  Click Me
</PremiumButton>
```

**Variants**: `primary`, `eco`, `tech`, `gold`, `alert`, `glass`, `outline`
**Sizes**: `sm`, `md`, `lg`

---

## Shadows

### Glass Shadows
- `shadow-glass` - Standard glass effect
- `shadow-glass-hover` - Enhanced on hover
- `shadow-premium` - Premium card shadow

### Glow Effects
- `shadow-glow` - Generic glow
- `shadow-glow-eco` - Eco/teal glow
- `shadow-glow-tech` - Tech/cyan glow
- `shadow-glow-gold` - Gold/orange glow

---

## Animations

### Available Animations
```jsx
// Fade in
<div className="animate-fade-in">...</div>

// Slide in from top
<div className="animate-slide-in">...</div>

// Fade in with upward motion
<div className="animate-fade-in-up">...</div>

// Pulsing red indicator
<div className="animate-pulse-red">...</div>
```

### Hover Effects
```jsx
// Card hover with lift
<div className="card-hover">...</div>

// Scale on hover
<button className="hover:scale-105 transition-transform">...</button>
```

---

## Background Patterns

### Glass Pattern (App Background)
```jsx
<div className="bg-[#f1f5f9] bg-glass-pattern">
  App content
</div>
```

This creates a subtle radial gradient mesh:
- Top-left: Cyan glow (rgba(79, 172, 254, 0.1))
- Bottom-right: Emerald glow (rgba(113, 178, 128, 0.15))

---

## Usage Examples

### Premium Stat Card
```jsx
<GlassCard hover={true} className="p-6">
  <div className="flex items-center justify-between mb-4">
    <span className="text-slate-500 font-medium">Total Trips</span>
    <div className="w-12 h-12 rounded-xl bg-grad-tech flex items-center justify-center shadow-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
  <h3 className="text-4xl font-bold text-slate-800">12,450</h3>
  <p className="text-sm text-slate-500 mt-2">↑ 12% from last month</p>
</GlassCard>
```

### NFC Card Simulation
```jsx
<div className="w-40 h-24 bg-grad-tech rounded-2xl p-4 text-white shadow-glow-tech">
  <div className="flex justify-between items-start">
    <span className="text-xs font-mono">SMTTS</span>
    <span className="text-lg">)))</span>
  </div>
  <div className="mt-4 font-mono text-sm tracking-wider">
    •••• 4921
  </div>
</div>
```

### Live Status Indicator
```jsx
<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-glass">
  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-red"></div>
  <span className="text-sm font-semibold text-red-600">BUS 404: FULL</span>
</div>
```

### Green Score Ring
```jsx
<div className="w-20 h-20 rounded-full bg-conic-gradient(#71B280 75%, #e2e8f0 0) flex items-center justify-center">
  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
    <span className="text-xl font-bold text-eco-dark">75</span>
  </div>
</div>
```

---

## Best Practices

### 1. Consistent Spacing
- Use Tailwind's spacing scale: `p-4`, `p-6`, `gap-4`, etc.
- Maintain consistent padding within cards (typically `p-6`)

### 2. Rounded Corners
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Small elements: `rounded-lg` (8px)

### 3. Hover States
- Always include smooth transitions: `transition-all duration-300`
- Use subtle transforms: `hover:-translate-y-1` or `hover:scale-105`
- Enhance shadows on hover

### 4. Color Hierarchy
- Primary actions: `bg-grad-eco`
- Secondary actions: `bg-grad-tech`
- Destructive actions: `bg-grad-alert`
- Neutral actions: Glass or outline variants

### 5. Accessibility
- Maintain sufficient contrast ratios
- Use semantic HTML
- Include focus states: `focus:ring-2 focus:ring-teal-500`

---

## Migration Guide

### From Old to New

#### Buttons
```jsx
// Old
<button className="bg-gradient-to-r from-teal-500 to-emerald-500">

// New
<PremiumButton variant="eco">
```

#### Cards
```jsx
// Old
<div className="bg-white rounded-lg shadow-md p-6">

// New
<GlassCard className="p-6">
```

#### Backgrounds
```jsx
// Old
<div className="bg-gray-100">

// New
<div className="bg-[#f1f5f9] bg-glass-pattern">
```

---

## Resources

- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Icons**: Lucide React
- **Framework**: React + Tailwind CSS
- **Design Inspiration**: Glassmorphism, Modern SaaS dashboards

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Maintained by**: SMTTS Development Team
