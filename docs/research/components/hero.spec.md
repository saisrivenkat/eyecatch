# Hero Section Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Interaction model:** static with animated video in "o" of boring

## Structure
Full viewport height section with:
1. Large "rebel against boring" display text (SVG-rendered on original, we'll use CSS)
2. WebGL gradient background (we'll use a CSS/image gradient)
3. H1 subtitle paragraph
4. Awards bar at bottom

## Layout
- position: relative
- width: 100%
- height: 100vh (702px at 1440w)
- display: flex
- flex-direction: column (for inner container)
- overflow: hidden
- background: var(--color-kota-gray)

### Container
- container class (max-width 1412px, padding 0 26px, margin auto)
- Contains the split text div

### Hero Text "rebel against boring"
- Three lines of text, massive display size
- Line 1: "rebel" — left aligned
- Line 2: "against" — center/slightly right
- Line 3: "boring" — left aligned, with circular video in the "o"
- font-size: clamp(100px, 16vw, 228px)
- font-weight: 400
- line-height: 0.9
- color: black
- letter-spacing: -0.02em
- The text fills most of the viewport

### Video circle (in the "o" of "boring")
- Circular clip, approximately 120px diameter
- position: absolute, placed over the "o" character
- border-radius: 50%
- overflow: hidden
- video source: `/videos/Short-Preview-homepage.mp4`
- autoplay, loop, muted, playsinline

### H1 Subtitle
- Position: absolute bottom-right area of hero
- Text: "We're a creative web design and branding agency based in London that crafts beautiful work for brands who refuse to blend in."
- "refuse to blend in." is bold
- font-size: 21px
- font-weight: 400 (700 for bold part)
- line-height: 27px
- color: black
- max-width: ~380px

### Awards Bar
- Position: absolute bottom-left
- display: flex
- align-items: center
- gap: 40px
- Four logos: DAN, Clutch, Awwwards, CSSDA
- Each logo ~40-120px wide, ~24-37px tall
- opacity: 0.6 or similar muted treatment
- Images from `/images/awards/`

### Gradient Background
- A large blurred gradient blob on the right side of the hero
- Colors: pink (#ff00ff area), cyan (#00e5ff area), peach/cream tones
- Use a radial-gradient or a blurred div with background
- Positioned right side, slightly overflowing
- mix-blend-mode or filter: blur(80px)

## Responsive
- Mobile: text scales down via clamp(), subtitle moves below text, awards stack or shrink
