# DiscoverMoreNav Specification

## Overview
- **Target file:** `src/components/DiscoverMoreNav.tsx`
- **Interaction model:** static nav with hover transitions

## DOM Structure
- `<nav>` flex row, gap 8px, items-center
  - leading label: "Discover more"
  - pill links (4): Branding (current = filled), Brand strategy, Tone of voice, Visual identity

## Computed Styles (from kota.co.uk)

### Nav
- display: flex
- flex-direction: row
- gap: 8px
- align-items: center

### Leading label
- fontSize: 14–16px (we'll use 14px tracking)
- text-transform: uppercase
- letter-spacing: 1.5px
- color: white/55
- margin-right: 16px

### Pill link (default)
- display: inline-flex
- align-items: center
- padding: 9px 16px
- border-radius: 33px (full pill)
- border: 1.6px solid rgba(255,255,255,0.25)
- background: transparent
- color: white/85
- fontSize: 18px
- lineHeight: 18px
- transition: background-color 0.2s, color 0.2s, opacity 0.2s, border-color 0.2s

### Pill link (active / current page)
- background: white
- color: #0e0e0e (kota-gray)
- border: 1.6px solid white

### Pill hover (non-active)
- background: rgba(255,255,255,0.08)
- border-color: rgba(255,255,255,0.5)

## Behaviors
- Active link is set via prop (matches current pathname)
- ScrollReveal not required; rendered statically

## Text Content (links use EyeCatch routes)
- Branding → /services/branding (current)
- Brand strategy → /services/branding#strategy (anchor)
- Tone of voice → /services/branding#voice (anchor)
- Visual identity → /services/branding#identity (anchor)

(KOTA links to separate sub-service pages; EyeCatch project does not have those routes yet, so we anchor into the pillars section to keep the links functional.)

## Responsive
- Desktop: single row
- Tablet/Mobile <768px: wraps to multiple rows; gap stays 8px; leading label stacks above
