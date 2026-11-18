---
name: "Sugey ZH Rehabilitación Oral"
description: "High-end Swiss-inspired dental clinic design system blending warm architectural minimalism, deep slate tones, and restorative clinical precision."
---

## Overview

A premium, boutique dental rehabilitation identity tailored for Dra. Sugey Zúñiga H. Inspired by leading Swiss dental practices like Kasper Zahnmedizin, this design system establishes trust, calm clinical mastery, and advanced biomedical technology. It eliminates traditional clinical anxiety through warm architectural neutrals, deep slate grounding, refined typography, and spacious organic layout geometry echoing the practice's sculpted tooth-flower brandmark.

## Colors

The color palette reflects calm sophistication and sterile precision paired with comforting human warmth.

- **Primary:** Deep slate navy representing medical expertise, authority, and modern dental technology.
- **Secondary:** Warm ivory and sand tones bringing organic serenity and soothing clinical comfort.
- **Accent:** Calming dental celadon teal for interactive focus, appointments, and primary conversions.

```yaml
colors:
  accent: "#16796F"
  accent-hover: "#116058"
  accent-light: "#E6F4F1"
  whatsapp: "#25D366"
  light:
    primary: "#1C2430"
    on-primary: "#FFFFFF"
    secondary: "#505A69"
    on-secondary: "#FFFFFF"
    surface: "#FAFAF7"
    surface-card: "#FFFFFF"
    surface-subtle: "#F2F2ED"
    on-surface: "#191F28"
    on-surface-variant: "#5F6B7A"
    outline: "#E2E5E9"
    outline-focus: "#16796F"
```

## Typography

A distinguished typographic pairing: **Plus Jakarta Sans** for crisp, architectural, humanistic headings with subtle geometric precision, paired with **Inter** for readable, clinical body text and multilingual interface controls.

```yaml
typography:
  display-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 54px
    fontWeight: 700
    lineHeight: 62px
    letterSpacing: -1px
  display-lg-mobile:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: -0.5px
  display-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 48px
    letterSpacing: -0.5px
  display-md-mobile:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 34px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
    letterSpacing: -0.25px
  headline-lg-mobile:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 30px
    letterSpacing: 0px
  headline-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Inter"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: "Inter"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.2px
  label-md:
    fontFamily: "Inter"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: 0.4px
```

## Layout & Spacing

A structured 12-column responsive layout built with generous breathing room, mirroring Swiss architectural grids. Section transitions maintain rhythm with consistent margins and comfortable container widths (max 1280px).

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  gutter-2xl: 48px
  section: 80px
  section-lg: 112px
  page-margin: 24px
```

## Elevation & Depth

Surfaces prioritize tactile softness and subtle borders over heavy drop shadows. Cards float using low-contrast borders (`outline`) and gentle ambient diffusion (`0 10px 30px -10px rgba(28, 36, 48, 0.05)`). Glassmorphic headers use soft backdrops with subtle opacity to keep the experience calm and airy.

## Shapes

Organic curves inspired by natural dental contours and the clinic's brandmark. Interactive buttons and tags feature rounded pill or soft organic rectangular geometry.

```yaml
rounded:
  sm: 6px
  DEFAULT: 12px
  md: 16px
  lg: 24px
  xl: 32px
  full: 9999px
```

## Motion & Micro-interaction

Micro-interactions feel smooth, reassuring, and immediate. Hover states on cards elevate gently with subtle upward translation (`translate-y-[-2px]`), while interactive sliders (such as the Before/After comparison tool) respond instantaneously to cursor and touch inputs.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: cubic-bezier(0.4, 0, 0.2, 1)
  surface-enter:
    duration: 250ms
    delay: 0ms
    timingFunction: cubic-bezier(0.16, 1, 0.3, 1)
```

## Voice & Content Strategy

- **Tone of voice:** Warm, authoritative, reassuring, and scientifically rigorous.
- **Capitalization:** Sentence case for headings and labels; Title case reserved for proper medical specialties and names.
- **Action labels:** Clear verb phrases describing beneficial patient outcomes: "Agendar valoración", "Ver casos clínicos", "Consultar por WhatsApp".
- **Language support:** Seamless bilingual switching (Spanish primary, English secondary).

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html`: `input-field-text`, `input-field-icon`
