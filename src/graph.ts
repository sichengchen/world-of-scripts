import type { Edge, Node } from '@xyflow/react'
import { edges, scripts, type ScriptEdge, type ScriptNode } from './data/scripts'

export type ViewMode = 'lineage' | 'timeline' | 'az'

export type ScriptNodeData = {
  script: ScriptNode
  isSelected: boolean
  isRelated: boolean
  isTraced: boolean
  dimmed: boolean
}

const typeColors: Record<ScriptNode['type'], string> = {
  alphabet: '#111111',
  abjad: '#262626',
  abugida: '#404040',
  syllabary: '#525252',
  featural: '#666666',
  logographic: '#737373',
  mixed: '#858585',
  undeciphered: '#a3a3a3',
}

const lineagePositions: Record<string, { x: number; y: number }> = {
  'egyptian-hieroglyphs': { x: 20, y: 120 },
  'proto-sinaitic': { x: 260, y: 160 },
  phoenician: { x: 500, y: 180 },
  greek: { x: 760, y: 90 },
  'old-italic': { x: 1020, y: 70 },
  latin: { x: 1280, y: 40 },
  coptic: { x: 1010, y: 200 },
  gothic: { x: 1020, y: 315 },
  cyrillic: { x: 1280, y: 240 },
  aramaic: { x: 760, y: 390 },
  hebrew: { x: 1020, y: 390 },
  syriac: { x: 1020, y: 510 },
  nabataean: { x: 1020, y: 640 },
  arabic: { x: 1280, y: 640 },
  brahmi: { x: 1020, y: 820 },
  devanagari: { x: 1280, y: 790 },
  'bengali-assamese': { x: 1510, y: 700 },
  gujarati: { x: 1510, y: 820 },
  gurmukhi: { x: 1510, y: 940 },
  tamil: { x: 1280, y: 940 },
  kannada: { x: 1510, y: 1060 },
  telugu: { x: 1280, y: 1060 },
  khmer: { x: 1280, y: 1190 },
  thai: { x: 1510, y: 1190 },
  tibetan: { x: 1280, y: 1320 },
  geez: { x: 760, y: 670 },
  armenian: { x: 1020, y: -45 },
  georgian: { x: 1020, y: -160 },
  runic: { x: 1280, y: 155 },
  ogham: { x: 1510, y: 40 },
  hangul: { x: 1550, y: 430 },
  'oracle-bone': { x: 250, y: 1040 },
  chinese: { x: 500, y: 1040 },
  cuneiform: { x: 20, y: 880 },
  maya: { x: 260, y: 1260 },
  cherokee: { x: 1510, y: 270 },
  'canadian-aboriginal': { x: 1510, y: 560 },
}

function getTimelinePosition(script: ScriptNode, index: number) {
  const year = script.startYear ?? 0
  const x = ((year + 3400) / 5300) * 1680
  const familyOffset =
    script.type === 'abugida'
      ? 780
      : script.type === 'logographic'
        ? 1040
        : script.type === 'mixed'
          ? 1160
          : script.type === 'syllabary' || script.type === 'featural'
            ? 500
            : 120

  return { x, y: familyOffset + (index % 4) * 115 }
}

function getAzPosition(script: ScriptNode, index: number) {
  const column = index % 5
  const row = Math.floor(index / 5)
  return { x: column * 260, y: row * 150 }
}

function getPosition(script: ScriptNode, viewMode: ViewMode, index: number) {
  if (viewMode === 'timeline') return getTimelinePosition(script, index)
  if (viewMode === 'az') return getAzPosition(script, index)
  return lineagePositions[script.id] ?? { x: index * 240, y: 0 }
}

export function getRelatedIds(selectedId: string | null) {
  if (!selectedId) return new Set<string>()

  const related = new Set([selectedId])
  const stack = [selectedId]

  while (stack.length) {
    const id = stack.pop()!
    for (const edge of edges) {
      if (edge.to === id && !related.has(edge.from)) {
        related.add(edge.from)
        stack.push(edge.from)
      }
      if (edge.from === id && !related.has(edge.to)) {
        related.add(edge.to)
        stack.push(edge.to)
      }
    }
  }

  return related
}

export function createGraph({
  activeTraceIds,
  relatedIds,
  selectedId,
  visibleIds,
  viewMode,
}: {
  activeTraceIds: Set<string>
  relatedIds: Set<string>
  selectedId: string | null
  visibleIds: Set<string>
  viewMode: ViewMode
}): { nodes: Node<ScriptNodeData>[]; graphEdges: Edge[] } {
  const sortedScripts = viewMode === 'az' ? [...scripts].sort((a, b) => a.name.localeCompare(b.name)) : scripts
  const hasFocus = Boolean(selectedId || activeTraceIds.size)

  const nodes = sortedScripts
    .filter((script) => visibleIds.has(script.id))
    .map((script, index) => {
      const isSelected = selectedId === script.id
      const isRelated = relatedIds.has(script.id)
      const isTraced = activeTraceIds.has(script.id)
      const dimmed = hasFocus && !isSelected && !isRelated && !isTraced

      return {
        id: script.id,
        type: 'scriptNode',
        position: getPosition(script, viewMode, index),
        data: { script, isSelected, isRelated, isTraced, dimmed },
      }
    })

  const graphEdges = edges
    .filter((edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to))
    .map((edge) => createEdge(edge, activeTraceIds, relatedIds, selectedId))

  return { nodes, graphEdges }
}

function createEdge(
  edge: ScriptEdge,
  activeTraceIds: Set<string>,
  relatedIds: Set<string>,
  selectedId: string | null,
): Edge {
  const relationshipColor =
    edge.relationship === 'descended' || edge.relationship === 'adapted_from'
      ? '#262626'
      : edge.relationship === 'disputed'
        ? '#737373'
        : '#525252'
  const isTrace = activeTraceIds.has(edge.from) && activeTraceIds.has(edge.to)
  const isRelated = Boolean(selectedId && relatedIds.has(edge.from) && relatedIds.has(edge.to))

  return {
    id: `${edge.from}-${edge.to}`,
    source: edge.from,
    target: edge.to,
    animated: isTrace,
    label: edge.relationship === 'disputed' ? 'disputed' : undefined,
    style: {
      stroke: isTrace ? '#111111' : isRelated ? '#111111' : relationshipColor,
      strokeWidth: isTrace || isRelated ? 2.4 : 1.3,
      strokeDasharray:
        edge.relationship === 'influenced_by' || edge.relationship === 'disputed' ? '7 6' : undefined,
      opacity: selectedId || activeTraceIds.size ? (isTrace || isRelated ? 0.95 : 0.18) : 0.74,
    },
    markerEnd: {
      type: 'arrowclosed',
      color: isTrace ? '#111111' : isRelated ? '#111111' : relationshipColor,
    },
  }
}

export function getTypeColor(type: ScriptNode['type']) {
  return typeColors[type]
}
