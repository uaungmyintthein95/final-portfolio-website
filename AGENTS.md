# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

The supplied 1536 × 1024 portfolio reference image remains the visual source of truth for art direction, composition, density, typography hierarchy, and cyan/amber palette. The production-style prototype uses semantic responsive sections, generated project imagery, working filters, case-study dialogs, mobile navigation, a gallery, CV downloads, and a validated contact form.

The user's original `portrolio_template - Copy` project is the source of truth for personal content. Preserve its real profile image, animated digital-twin image, career and education details, project links, contact information, technology logos, CV, certification PDFs, YouTube, ArtStation, and BIM portfolio destinations when extending this prototype.

The Riverport Three.js project is integrated at `/riverport/index.html` and is the portfolio's featured case study. Preserve its live embedded preview, full-screen launch, return-to-portfolio control, project-information dialog, Tokyo GLB, landmark interactions, and 360° panorama viewer.
