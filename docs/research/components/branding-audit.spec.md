… see below for the full file. Path used so the spec file persists for audit. …

# BrandingAuditSection Specification

## Overview
- **Target file:** `src/components/BrandingAuditSection.tsx`
- **Screenshot reference:** `docs/design-references/audit-section.png`
- **Interaction model:** static (decorative gradient orb may animate; CTA pill has hover transition)

## DOM Structure
- `<section>` wrapper with vertical padding (~120px)
  - container (max-w 1412px, px 26px)
    - 12-column grid, gap 12px, items-center
      - Left text column (cols 1–6): kicker label, large display heading, paragraph, pill CTA
      - Right media column (cols 7–13): tall square figure with background gradient/image and floating decorative blob

## Computed Styles (extracted from kota.co.uk)

### Section / Row
- display: grid
- grid-template-columns: repeat(12, 1fr)
- column-gap: 12px
- row width: 1213px (matches container)
- align-items: center
- vertical padding: ~120px top/bottom

### Heading
- fontSize: 61px
- fontWeight: 300
- lineHeight: 61px
- letterSpacing: ~-0.02em
- color: white (we are dark-themed, KOTA original is black on cream)
- marginBottom: 19px

### Paragraph
- fontSize: 20px
- lineHeight: 28px
- maxWidth: 460px
- color: white/70

### Pill CTA
- display: inline-flex
- alignItems: center
- gap: 8px
- padding: 12px 24px
- backgroundColor: white (inverted variant: dark on cream → light on dark)
- color: black
- borderRadius: 999px
- fontSize: 18px
- transition: background-color 0.25s, transform 0.25s
- hover: translateY(-1px) and bg subtle off-white

### Media (right column)
- aspect: square (~600x600 desktop)
- borderRadius: 24px
- overflow: hidden
- background: layered radial gradients (peach + cream) + animated blob

## Behaviors
- ScrollReveal on entry (fade + 30px translateY, distance 50)
- Decorative blob inside media: slow drift animation (8s ease-in-out infinite)
- CTA hover: subtle translateY and slight bg shift

## Per-State Content
N/A — single state.

## Assets
- No external image required; decorative gradient blob built with CSS gradients

## Text Content (EyeCatch-original, brand-pulse-style promo)
- Kicker: "Quick check"
- Heading: "Audit your brand in minutes."
- Paragraph: "A short, honest read on where the brand is firing — and where it’s leaking. We’ll send the report back inside the same week."
- CTA: "Request a brand audit →"

## Responsive
- Desktop ≥1024px: 6/6 column split, square media
- Tablet 768–1023: stacks vertically; media becomes 16:10
- Mobile <768px: single column, heading scales to clamp(40px, 9vw, 64px), media 4:3
