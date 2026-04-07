# KOTA.co.uk Page Topology

## Page Overview
- **Total height:** ~16,242px
- **Background:** rgb(239, 239, 239) / #efefef
- **Scroll library:** Lenis smooth scroll
- **Animation library:** GSAP ScrollTrigger (pinned panels)
- **WebGL:** Canvas-based gradient background (hero + footer)
- **Font:** PP Neue Montreal (4 woff2 weights via next/font/local)
- **Framework:** Next.js (App Router)

## Sections (top to bottom)

### 1. Header (fixed, z-index 10)
- Fixed position, full width, padding 26px
- Logo (SVG - KOTA square mark), tagline "Celebrating 13 years : 2013 - 2026"
- "Hire us →" CTA button (black bg, white text, rounded pill)
- Hamburger menu (circle outline)

### 2. Hero Section (0–702px)
- Full viewport height
- Giant SVG text: "rebel against boring" (228px equivalent)
- WebGL gradient canvas behind (blurred pink/blue/cyan gradient)
- Animated video circle in the "o" of "boring"
- H1 subtitle: "We're a creative web design and branding agency based in London that crafts beautiful work for brands who refuse to blend in."
- Awards bar at bottom: DAN, Clutch, Awwwards, CSSDA logos

### 3. Services Section (702–4842px) — GSAP ScrollTrigger pinned
- 3 pinned panels, each ~657px tall, scroll-driven reveal
- White card backgrounds, rounded corners
- Each panel: heading (101px), tags, description, video preview
  - **Web design & development:** Creative web design, Web development, Copywriting, E-Commerce, WordPress
  - **Branding:** Brand strategy, Tone of voice, Visual identity
  - **Digital Marketing:** SEO, Content marketing, Social media, Paid media

### 4. Ethos Section (4842–6762px)
- Heading: "Brand-led. Strategically built." (101px)
- 4 numbered principles:
  1. "Design with guts." — immersive brand-led digital experiences
  2. "Nail the process." — collaborative and decisive
  3. "Build to flex." — ready for growth
  4. "Invest for ROI." — measurable results

### 5. Work/Portfolio Section (6762–9134px) — Black background
- Dark theme transition cover
- Heading: "Our Work" / "Making brands a damn site better."
- Intro paragraph about first impressions
- 5 project cards (mix of large and small):
  - **UPP** (2025) — large card, video
  - **The Goat Agency** (2025) — small card, video
  - **ISI Global** (2025) — small card, video
  - **Degroof Petercam** (2025) — large card, video
  - **SIRCLO** (2024) — small card (last)

### 6. Statistics Section (9134–10529px) — Black background
- Heading: "Our Results" (151px split chars)
- 4 stat panels (carousel/scroll-driven):
  - 67.6% — rise in engaged sessions per user after 1 month
  - 70.8% — increase in average engagement time after 3 months
  - 83.14% — increase in sales after 1 year
  - 104.9% — increase in organic visits after 1 month
- Each with "View Project" link
- Colored background panels (green, blue, purple, peach, pink)

### 7. Partners Section (10529–11463px) — Black background
- Heading: "Our Partners"
- 15 client logos (SVG): Jamie Oliver, Comptoir Libanais, British Red Cross, SYM, Penguin, RAW, Penhaligon's, Stoli, Bounce, Tangerine, Spear's, etc.

### 8. Testimonials Section (11463–12363px) — Black background
- "What our clients say"
- Swiper carousel with creative effect
- 3+ testimonial cards with quotes, author names, titles, "View project" links

### 9. Articles Section (12363–13893px) — Black background
- Blog article cards (9 articles)
- Titles include design trends, branding, awards, web design inspiration

### 10. FAQ Section (13893–14577px) — Black background
- "FAQ's" heading
- Accordion items covering pricing (£30k-£150k), timelines, deadlines, process, brand strategy, SEO, marketing

### 11. CTA Section (14577–15565px) — Black background
- "Celebrating 12 years"
- "Explore" button with video background

### 12. Footer (15565–16242px) — Black background
- Email: hello@kota.co.uk with "Copy email address"
- Social links: LinkedIn, Facebook, Instagram, Bluesky
- Nav links: Contact, FAQs, Privacy Policy
- Sectors: Agencies, SaaS and Tech, B2B Transformation, Healthcare, Media & Entertainment, Retail
- Newsletter signup
