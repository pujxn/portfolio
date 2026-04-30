# Portfolio — Status

## What's built

### Hero
- Full-viewport particle field (32×22 grid, canvas-based, 60fps) — dots repel from cursor/touch position with spring physics
- "PUJAN PARIKH" scramble-text reveal — characters cycle through noise before locking in, staggered left to right
- Custom cursor — gold inner dot with spring lag, outer ring trails behind; hidden on touch devices
- 3D parallax tilt on text block tracking mouse position
- Scroll cue, coordinates easter egg, sequential subtitle fade-in after scramble completes
- Film grain noise overlay (canvas, 14fps, screen blend mode)

### Projects
- Two full-width project blocks: FlowQuery and PrepGrid
- Clip-path curtain reveal on scroll-into-view (Framer Motion `useInView`)
- Letter-by-letter slide-up reveal on project names
- 3D card tilt tracking cursor within card bounds
- Inner spotlight glow follows cursor position
- Inactive card blurs and dims when the other is hovered
- Chromatic aberration (RGB split) on project title on hover
- Magnetic GitHub link — pulls toward cursor
- Tech stack tags spring in with stagger; lift + border brighten on hover

### About
- Word-by-word spring reveal with randomised initial Y offset and rotation per word
- Accented words (Goldman Sachs, performance, alive.) render in gold on reveal
- Counter-rotating geometric squares decoration (outer 18s CW, inner 12s CCW)
- Stat row: 4+, GS, ∞ — lift on hover

### Contact
- Three-line scramble heading: "WANT TO BUILD / SOMETHING / GREAT?"
- Email and GitHub as large magnetic links — pull toward cursor, chromatic aberration + sweep underline on hover, ScrambleText re-fires on hover
- Pulsing gold dot with three radiating rings
- Closing rule + copyright line

## Stack
React 19 + TypeScript · Vite · Framer Motion · Tailwind CSS v4

## Live
https://portfolio-pujxns-projects.vercel.app
GitHub: https://github.com/pujxn/portfolio

## What's not built yet
- PrepGrid GitHub link (placeholder — repo not yet public)
- Mobile layout polish
- Open Graph / meta tags for sharing
