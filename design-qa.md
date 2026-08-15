# Design QA

- Source visual truth: `C:\Users\aungm\Downloads\Image.jpg`
- Desktop implementation: `C:\Users\aungm\Documents\Codex\2026-07-29\i\portfolio-site\qa\interactive-desktop-final-v3.png`
- Mobile implementation: `C:\Users\aungm\Documents\Codex\2026-07-29\i\portfolio-site\qa\interactive-mobile-top.png`
- Full-view comparison: `C:\Users\aungm\Documents\Codex\2026-07-29\i\portfolio-site\qa\interactive-comparison-final-source-left-implementation-right.png`
- Focused hero comparison: `C:\Users\aungm\Documents\Codex\2026-07-29\i\portfolio-site\qa\interactive-focused-hero-source-left-implementation-right.png`
- Desktop viewport: 1536 × 1024 CSS pixels
- Mobile viewport: 390 × 844 CSS pixels
- Source pixels: 1536 × 1024
- Desktop implementation pixels: 1536 × 1024
- Device scale factor: 1
- Density normalization: none required
- State: default English home view, project filter set to All, case-study dialog closed

**Findings**

- No actionable P0, P1, or P2 issues remain.
- Fonts and typography: the implementation preserves the reference’s condensed uppercase hierarchy, strong white display type, cyan eyebrow labels, warm-gold name accent, compact UI labels, and readable small text. The final hero title was reduced from the first implementation capture to better match the source’s density.
- Spacing and layout rhythm: the header, hero copy block, callouts, CTA row, social row, and four-column metrics align with the source’s structure. The static dashboard’s compressed lower panels are intentionally expanded into scrollable semantic sections so the site is fully usable.
- Colors and visual tokens: deep black/navy surfaces, cyan interaction color, warm amber project accent, fine blue-gray borders, restrained shadows, and low-opacity overlays match the reference direction.
- Image quality and asset fidelity: all major imagery is real raster artwork generated specifically for the project and rendered with deliberate crops. No visible photographic asset is replaced by CSS art, custom SVG, emoji, placeholder geometry, or a text glyph.
- Copy and content: visual hierarchy remains faithful to the reference while the supplied portfolio project now provides the real profile, career history, education, languages, project destinations, social links, CV, credentials and technology logos.

**Full-view comparison evidence**

- The source and final implementation were placed together at 1536 × 1024. The hero hierarchy, left-side copy, smart-city photography, cyan/amber palette, floating work labels, CTA treatment, metrics bar and dark technical aesthetic are visibly consistent.
- Expected product-level difference: the reference compresses the entire portfolio into a single poster-like viewport; the implementation turns those panels into full responsive sections below the hero. This is intentional and required by the user’s request for a fully usable website.

**Focused region comparison evidence**

- The focused 960 × 630 hero comparison verifies display typography, copy placement, project callouts, button treatment, night-city crop and metrics treatment at readable size.
- The source does not define a mobile layout. The 390 × 844 capture verifies an intentional stacked translation with no horizontal overflow, readable typography, a working mobile menu and a two-by-two metrics grid.

**Interaction and browser checks**

- Project category filtering: Point Cloud showed the Hiroshima and Yangon projects.
- Case-study dialog: opened from the Shin project card, rendered its full case study, and exposed the correct live project destination.
- Featured gallery: Next changed the image and counter from 1 to 2.
- Contact form: required fields validate and a complete inquiry opens the visitor's email app with a prefilled message.
- Mobile navigation opened successfully at 390 × 844; measured document width matched the viewport with no horizontal overflow.
- CV links point to the supplied 2026 PDF; eleven selected credential cards point to supplied PDF certificates.
- Twelve supplied technology logos render in the skills toolkit.
- Clean browser tab console warnings/errors: none.

**Comparison history**

1. First functional capture: P2 — hero title and vertical scale were larger than the source, and too little project content appeared in the 1536 × 1024 viewport.
2. Fix: reduced the hero from 820 to 680 CSS pixels, tightened display type and role sizes, and moved content upward.
3. Final capture: hierarchy and density are materially closer to the source, with no actionable P0/P1/P2 issue remaining.

**Open Questions**

- None.

**Implementation Checklist**

- [x] Responsive semantic sections
- [x] Desktop and mobile navigation
- [x] Project filters
- [x] Case-study dialog and previous/next navigation
- [x] Featured image gallery
- [x] CV download
- [x] Contact validation and prefilled email handoff
- [x] Real profile, CV, credentials and technology logos
- [x] Real project and social destinations
- [x] Keyboard focus and reduced-motion support
- [x] Clean console check
- [x] Production build and Sites worker tests

**Follow-up Polish**

- P3: Replace shared atmospheric card imagery with project-specific photography whenever additional approved project images become available.

final result: passed
