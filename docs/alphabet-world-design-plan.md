# Alphabet World Design Plan

## Product Brief

Build an educational web app that lets users explore the history and relationships of major world alphabets and alphabet-like writing systems through an interactive family-tree diagram. Users can click a writing-system node to inspect its alphabet, sample glyphs, lineage, date range, region, script type, writing direction, and notes.

Primary references:

- Wikipedia, "Alphabet": broad historical lineage and terminology.
- Starkey Comics, "The ABCD Family Tree": visual reference for a family-tree poster showing script relationships through example symbols.
- Omniglot, "Alphabets and writing systems": practical source for script examples, directions, and per-system notes.
- Unicode character charts: technical source for encoded scripts and glyph coverage.
- The World's Writing Systems: broad catalog with region, era, Unicode status, and living/historical status.

## Design Direction

The app should feel like an interactive museum wall chart: dense, legible, scholarly, and explorable. The first screen should be the actual diagram, not a landing page.

Visual style:

- Canvas-like off-white background with subtle grid or timeline guides.
- Strong black or deep ink labels for readability.
- Distinct branch colors by lineage family, not by arbitrary decoration.
- Compact rounded rectangles for nodes, 6-8px radius.
- Fine connector lines with arrowheads or tapered curves.
- Script glyph previews as the visual anchor of each node.
- Keep the palette varied but restrained: ink, parchment, teal, ochre, brick, violet, and green accents. Avoid a single beige/brown-only museum palette.

The Starkey reference should influence the overall mental model: visible branching, historical compression, and small glyph samples that make relationships tangible. The app should not copy the illustration; it should make the concept searchable, zoomable, and inspectable.

## Core Experience

The main screen has three persistent zones:

1. Diagram canvas
   - The dominant area.
   - Shows scripts as nodes arranged roughly by time from left/top to right/bottom.
   - Supports pan, zoom, fit-to-view, and reset.
   - Highlights ancestors, descendants, and sibling branches when a node is selected.

2. Inspector panel
   - Opens on the right on desktop.
   - Opens as a bottom sheet on mobile.
   - Shows the selected script's alphabet or representative character set.
   - Includes lineage breadcrumbs, metadata, samples, and citations.

3. Filter/search bar
   - Search by script name, language, region, or example glyph.
   - Filters: script type, region, era, living/historical, writing direction.
   - View toggles: "Lineage", "Timeline", "A-Z".

## First-Screen Layout

Desktop:

- Top toolbar, 56px high:
  - App title: "Alphabet World"
  - Search input
  - Filter button
  - View segmented control
  - Zoom controls
- Main diagram fills remaining space.
- Inspector panel is 360-420px wide when open.
- Timeline ruler appears along the top or left edge of the diagram.

Mobile:

- Top compact toolbar with search icon, filter icon, and reset/fit icon.
- Diagram is full screen with touch pan/zoom.
- Selected node opens a bottom sheet with snap points.
- Filters open in a drawer.

## Diagram Model

Use a directed acyclic graph, not a strict tree. Script history includes disputed origins, inspiration, borrowing, and parallel development, so forcing a single parent would be misleading.

Relationship types:

- `descended`: strong historical descent.
- `adapted_from`: adapted to a new language or context.
- `influenced_by`: visible or scholarly influence without direct descent.
- `disputed`: uncertain or debated relationship.
- `related_variant`: same family or variation rather than a clean ancestor.

Connector styling:

- Solid line: descended/adapted.
- Dashed line: influenced/disputed.
- Thin gray line: variant relationship.
- Selected path: colored, thicker line.

## Initial Content Scope

Start with a curated, understandable MVP rather than every known script.

Core lineage:

- Egyptian Hieroglyphs
- Proto-Sinaitic / Proto-Canaanite
- Phoenician
- Greek
- Old Italic / Etruscan
- Latin
- Coptic
- Gothic
- Cyrillic
- Hebrew
- Aramaic
- Syriac
- Nabataean
- Arabic
- Brahmi
- Devanagari
- Bengali-Assamese
- Gujarati
- Gurmukhi
- Tamil
- Kannada
- Telugu
- Khmer
- Thai
- Tibetan
- Ge'ez / Ethiopic
- Armenian
- Georgian
- Runic
- Ogham
- Hangul

Separate or contextual clusters:

- Chinese / Oracle Bone Script as a separate lineage.
- Cuneiform as a separate lineage.
- Maya and Mesoamerican scripts as separate lineage.
- Cherokee, Canadian Aboriginal Syllabics, and other invented or inspired systems as later contextual nodes.

The initial app should be clear that it is not claiming all writing systems descend from one source.

## Node Design

Each node should show:

- Script name.
- Date range or approximate origin.
- Region badge.
- Script type badge: alphabet, abjad, abugida, syllabary, featural, logographic, mixed, undeciphered.
- 3-6 representative glyphs.
- Small status marker: living, historical, disputed, not Unicode encoded.

Example node:

```text
Latin
Europe · c. 7th century BCE-present
Alphabet · left-to-right
A B C D
```

Node interaction states:

- Default: compact.
- Hover/focus: preview tooltip with glyph strip and one-line summary.
- Selected: ancestors and descendants highlighted; inspector opens.
- Dimmed: unrelated nodes fade when focus mode is on.

## Inspector Panel

The inspector should answer: "What is this writing system, what does it look like, and where did it come from?"

Sections:

- Header: script name, region, date range, status.
- Character set: glyph grid with transliteration or phonetic labels where appropriate.
- Example text: short sample word or phrase if reliable.
- Lineage: immediate parent(s), children, and relationship confidence.
- Writing behavior: direction, type, vowel treatment, casing, joining behavior.
- Historical note: 2-4 sentence summary.
- Sources: links to reference pages.

For scripts without a simple alphabet, label the grid honestly as "representative signs", "syllables", or "letters", depending on the writing system.

## Data Model

Keep content data separate from UI code.

```ts
type ScriptNode = {
  id: string
  name: string
  nativeName?: string
  type: 'alphabet' | 'abjad' | 'abugida' | 'syllabary' | 'featural' | 'logographic' | 'mixed' | 'undeciphered'
  status: 'living' | 'historical' | 'revived' | 'constructed'
  region: string[]
  startYear?: number
  endYear?: number | 'present'
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt' | 'mixed'
  unicodeBlock?: string[]
  sampleGlyphs: string[]
  characterRows?: Array<{
    glyph: string
    label?: string
    transliteration?: string
  }>
  summary: string
  notes?: string[]
  sources: Array<{
    label: string
    url: string
  }>
}

type ScriptEdge = {
  from: string
  to: string
  relationship: 'descended' | 'adapted_from' | 'influenced_by' | 'disputed' | 'related_variant'
  confidence: 'high' | 'medium' | 'low'
  note?: string
  sources: string[]
}
```

## Interaction Details

Required:

- Click/tap node to open inspector.
- Search centers and selects a matching node.
- Hover shows compact preview on desktop.
- Keyboard navigation through nodes.
- Fit-to-view control.
- Zoom in/out controls.
- Filters update the graph without destroying layout context.
- Relationship legend explains connector styles.

Nice to have:

- "Trace to Latin" or "Trace to Arabic" guided mode.
- Compare two scripts side-by-side.
- Toggle between "historical lineage" and "letterform evolution".
- Mini-map for large graph navigation.
- Permalink to a selected script.

## Technical Plan

Recommended stack:

- VitePlus or Vite + React.
- React Flow for the graph canvas.
- TanStack Router if routes are needed for `/script/:id`.
- shadcn/ui for panels, drawer, command menu, tabs, tooltip, and sheet.
- D3 only where needed for timeline scale or custom layout support.
- Static JSON/TS dataset at first; no backend required for MVP.

Why React Flow:

- It handles pan/zoom, nodes, edges, selection, keyboard affordances, minimaps, and custom node rendering.
- The domain complexity is in the data and UX, not in inventing graph-canvas infrastructure.

## Accessibility

- Every node must be keyboard reachable.
- Node labels and glyph previews need accessible names.
- Selected path should not rely on color alone; use line weight and labels.
- Inspector glyph grid should expose text labels and transliterations.
- Provide reduced-motion behavior for animated graph transitions.
- Ensure RTL scripts render with correct direction in samples.

## Content Integrity

This app should distinguish facts from approximations.

Rules:

- Approximate dates should be visibly marked with `c.` or `approx.`.
- Disputed relationships must be styled and labeled as disputed.
- "Alphabet" should not be used as a blanket label for abjads, abugidas, syllabaries, or logographic systems.
- Sources should be attached at node and edge level.
- Avoid showing complete copyrighted charts or artwork from references inside the product unless licensing is clear.

## Implementation Phases

Phase 1: Static interactive MVP

- Set up React app.
- Add curated dataset for 25-35 scripts.
- Render lineage graph with custom nodes.
- Implement selected-node inspector.
- Add search, filters, legend, and responsive panel/sheet.

Phase 2: Content depth

- Expand to 60-80 scripts.
- Add citations to each node and edge.
- Add character grids for major scripts.
- Add compare mode.

Phase 3: Learning modes

- Guided tours: "From Hieroglyphs to Latin", "From Phoenician to Arabic", "Brahmi and South Asia".
- Quizzes or recognition cards.
- Timeline animation.

Phase 4: Data validation

- Add content schema validation.
- Add source completeness checks.
- Add visual regression tests for diagram and inspector states.

## Open Decisions

- Whether the MVP should focus only on alphabetic systems or include all major writing-system families.
- Whether to use a historically vertical tree or a left-to-right timeline graph.
- How scholarly the tone should be: general audience, museum label, or academic.
- Whether to support multiple languages in UI/content.
- Whether to show exact glyph evolution for A/B/C/D as a special overlay inspired by the Starkey reference.

## Recommended MVP Decision

Build a general-audience, single-page interactive graph with a left-to-right timeline layout. Include alphabetic systems plus closely related abjads and abugidas because users will expect Arabic, Hebrew, and Brahmi-derived scripts. Treat non-related systems as separate clusters, not descendants of the same family.

This gives the app enough breadth to feel like "world alphabets" while keeping the first implementation honest and manageable.
