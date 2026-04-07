# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** fixed header, z-index 10

## Structure
Fixed header bar across full width with three items:
1. Logo link (KOTA SVG mark) + tagline text
2. "Hire us →" pill button (right side)
3. Hamburger menu circle button (right side, after Hire us)

## Computed Styles

### Header container
- position: fixed
- top: 0
- left: 0
- width: 100%
- z-index: 10
- padding: 26px
- display: flex
- justify-content: space-between
- align-items: center
- background: transparent

### Logo
- SVG viewBox="0 0 90 90", width ~60px, height ~60px
- color: black (currentColor)
- Import KotaLogo from `@/components/icons`

### Tagline (next to logo)
- Text: "Celebrating 13 years : 2013 - 2026"
- fontSize: 13px
- fontWeight: 400
- color: black
- text-transform: uppercase
- letter-spacing: 1px
- margin-left: 16px

### Right side container
- display: flex
- align-items: center
- gap: 12px

### "Hire us" button
- display: flex
- align-items: center
- gap: 8px
- padding: 14px 24px
- background: black
- color: white
- border-radius: 999px (full pill)
- font-size: 16px
- font-weight: 500
- text-decoration: none
- Has arrow icon (→) after text

### Hamburger button
- width: 52px
- height: 52px
- border-radius: 50%
- border: 1.5px solid black
- background: transparent
- display: flex
- align-items: center
- justify-content: center
- Two horizontal lines (hamburger icon)

## Responsive
- Mobile: tagline hidden, hire us button may shrink
