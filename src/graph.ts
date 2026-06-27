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
  'egyptian-hieroglyphs': { x: 20, y: 180 },
  'proto-sinaitic': { x: 250, y: 180 },
  phoenician: { x: 480, y: 180 },
  greek: { x: 710, y: 120 },
  armenian: { x: 940, y: 0 },
  'old-italic': { x: 940, y: 120 },
  latin: { x: 1170, y: 110 },
  ogham: { x: 1400, y: 60 },
  runic: { x: 1400, y: 180 },
  coptic: { x: 940, y: 250 },
  gothic: { x: 1170, y: 250 },
  cyrillic: { x: 1400, y: 300 },
  aramaic: { x: 710, y: 420 },
  hebrew: { x: 940, y: 420 },
  syriac: { x: 940, y: 540 },
  nabataean: { x: 940, y: 660 },
  arabic: { x: 1170, y: 660 },
  geez: { x: 480, y: 430 },
  brahmi: { x: 710, y: 790 },
  devanagari: { x: 940, y: 790 },
  'bengali-assamese': { x: 1170, y: 790 },
  gujarati: { x: 1400, y: 790 },
  gurmukhi: { x: 1400, y: 910 },
  tamil: { x: 940, y: 910 },
  telugu: { x: 1170, y: 910 },
  kannada: { x: 1400, y: 1030 },
  khmer: { x: 940, y: 1030 },
  thai: { x: 1170, y: 1030 },
  tibetan: { x: 710, y: 1030 },
  georgian: { x: 1170, y: -30 },
  cherokee: { x: 1400, y: 420 },
  'canadian-aboriginal': { x: 1400, y: 540 },
  hangul: { x: 1400, y: 660 },
  cuneiform: { x: 20, y: 650 },
  'oracle-bone': { x: 250, y: 650 },
  chinese: { x: 480, y: 650 },
  maya: { x: 20, y: 800 },
}

const timelinePositions = buildTimelinePositions()

function buildTimelinePositions() {
  const sorted = [...scripts].sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0))
  const laneLastX: number[] = []
  const positions: Record<string, { x: number; y: number }> = {}
  const nodeWidth = 188
  const gap = 24

  for (const script of sorted) {
    const year = script.startYear ?? 0
    const x = Math.round(((year + 3400) / 5300) * 1560)
    let lane = laneLastX.findIndex((lastX) => x - lastX >= nodeWidth + gap)

    if (lane === -1) {
      lane = laneLastX.length
    }

    laneLastX[lane] = x
    positions[script.id] = { x, y: lane * 130 }
  }

  return positions
}

function getAzPosition(script: ScriptNode, index: number) {
  const column = index % 5
  const row = Math.floor(index / 5)
  return { x: column * 260, y: row * 150 }
}

function getPosition(script: ScriptNode, viewMode: ViewMode, index: number) {
  if (viewMode === 'timeline') return timelinePositions[script.id]
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
