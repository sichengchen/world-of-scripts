import { edges, guidedTraces, scripts, scriptTypes } from './scripts'

const letterBasedTypes = ['alphabet', 'abjad', 'abugida', 'featural']

export function validateContent() {
  const ids = new Set<string>()
  const errors: string[] = []

  for (const script of scripts) {
    if (ids.has(script.id)) errors.push(`Duplicate script id: ${script.id}`)
    ids.add(script.id)

    if (!script.name.trim()) errors.push(`${script.id} is missing a name`)
    if (!script.summary.trim()) errors.push(`${script.id} is missing a summary`)
    if (!script.sampleGlyphs.length) errors.push(`${script.id} is missing sample glyphs`)
    if (!script.sources.length) errors.push(`${script.id} is missing sources`)
    if (!scriptTypes.includes(script.type)) errors.push(`${script.id} has an unknown type`)
    if (letterBasedTypes.includes(script.type) && (!script.characterRows || script.characterRows.length < 20)) {
      errors.push(`${script.id} is letter-based and must list its full core letter inventory in characterRows`)
    }
    for (const visualGlyph of script.visualGlyphs ?? []) {
      if (!visualGlyph.label.trim()) errors.push(`${script.id} has a visual glyph without a label`)
      if (!visualGlyph.sourceLabel.trim() || !visualGlyph.sourceUrl.trim()) {
        errors.push(`${script.id} visual glyph ${visualGlyph.label} is missing source attribution`)
      }
      if (!visualGlyph.viewBox.trim() || !visualGlyph.paths.length) {
        errors.push(`${script.id} visual glyph ${visualGlyph.label} is missing SVG geometry`)
      }
    }
  }

  for (const edge of edges) {
    if (!ids.has(edge.from)) errors.push(`Edge source is missing: ${edge.from}`)
    if (!ids.has(edge.to)) errors.push(`Edge target is missing: ${edge.to}`)
    if (!edge.sources.length) errors.push(`Edge ${edge.from}->${edge.to} is missing sources`)
    if (edge.confidence === 'low') {
      errors.push(`Edge ${edge.from}->${edge.to} is low confidence; do not render weak relationships`)
    }
  }

  for (const trace of guidedTraces) {
    for (const id of trace.nodeIds) {
      if (!ids.has(id)) errors.push(`Trace ${trace.id} references missing node ${id}`)
    }
  }

  if (errors.length) {
    throw new Error(`Content validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  }
}
