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

export type TimelineTickData = {
  label: string
  year: number
}

export type GraphNodeData = ScriptNodeData | TimelineTickData

export const SCRIPT_NODE_WIDTH = 188
export const SCRIPT_NODE_HEIGHT = 106
export const TIMELINE_NODE_WIDTH = SCRIPT_NODE_WIDTH
const TIMELINE_START_YEAR = -3400
const TIMELINE_END_YEAR = new Date().getFullYear()
const TIMELINE_WIDTH = 3000
const TIMELINE_NODE_GAP = 28
const TIMELINE_LANE_HEIGHT = 130
const TIMELINE_NODE_TOP = 24
const TIMELINE_TICK_WIDTH = 104

const timelineTicks: TimelineTickData[] = [
  { year: TIMELINE_START_YEAR, label: '3400 BCE' },
  { year: -1000, label: '1000 BCE' },
  { year: 0, label: '0' },
  { year: 1000, label: '1000 CE' },
  { year: TIMELINE_END_YEAR, label: 'TODAY' },
]

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
  greek: { x: 710, y: 40 },
  armenian: { x: 940, y: -160 },
  georgian: { x: 1170, y: -160 },
  'old-italic': { x: 940, y: -20 },
  latin: { x: 1170, y: -20 },
  ogham: { x: 1400, y: -160 },
  runic: { x: 1170, y: 120 },
  deseret: { x: 1400, y: 120 },
  osage: { x: 1400, y: 260 },
  coptic: { x: 940, y: 120 },
  gothic: { x: 940, y: 260 },
  glagolitic: { x: 940, y: 400 },
  cyrillic: { x: 940, y: 540 },
  aramaic: { x: 710, y: 900 },
  hebrew: { x: 940, y: 760 },
  syriac: { x: 940, y: 900 },
  samaritan: { x: 940, y: 1040 },
  mandaic: { x: 940, y: 1180 },
  nabataean: { x: 940, y: 1320 },
  arabic: { x: 1170, y: 1320 },
  mongolian: { x: 940, y: 1460 },
  geez: { x: 480, y: 540 },
  cuneiform: { x: 20, y: 620 },
  'old-persian': { x: 250, y: 620 },
  ugaritic: { x: 250, y: 760 },
  'linear-b': { x: 20, y: 900 },
  maya: { x: 20, y: 1040 },
  'oracle-bone': { x: 250, y: 1220 },
  chinese: { x: 480, y: 1220 },
  hiragana: { x: 710, y: 1080 },
  katakana: { x: 710, y: 1220 },
  bopomofo: { x: 710, y: 1360 },
  yi: { x: 710, y: 1500 },
  tangut: { x: 710, y: 1640 },
  nushu: { x: 710, y: 1780 },
  lisu: { x: 710, y: 1920 },
  hangul: { x: 1170, y: 1600 },
  brahmi: { x: 710, y: 2200 },
  sinhala: { x: 940, y: 1900 },
  tibetan: { x: 940, y: 2040 },
  devanagari: { x: 940, y: 2180 },
  'bengali-assamese': { x: 940, y: 2320 },
  odia: { x: 940, y: 2460 },
  gujarati: { x: 940, y: 2600 },
  gurmukhi: { x: 940, y: 2740 },
  tamil: { x: 940, y: 2880 },
  malayalam: { x: 940, y: 3020 },
  telugu: { x: 940, y: 3160 },
  kannada: { x: 940, y: 3300 },
  'meetei-mayek': { x: 940, y: 3440 },
  myanmar: { x: 940, y: 3580 },
  cham: { x: 940, y: 3720 },
  javanese: { x: 940, y: 3860 },
  balinese: { x: 940, y: 4000 },
  sundanese: { x: 940, y: 4140 },
  tagalog: { x: 940, y: 4280 },
  khmer: { x: 940, y: 4420 },
  thai: { x: 1170, y: 4420 },
  lao: { x: 1400, y: 4420 },
  'ol-chiki': { x: 1170, y: 2180 },
  thaana: { x: 1170, y: 2320 },
  tifinagh: { x: 1170, y: 2600 },
  nko: { x: 1170, y: 2740 },
  adlam: { x: 1170, y: 2880 },
  vai: { x: 1170, y: 3020 },
  cherokee: { x: 1170, y: 3300 },
  'canadian-aboriginal': { x: 1170, y: 3440 },
  'old-turkic': { x: 1170, y: 3720 },
}

const timelinePositions = buildTimelinePositions()

function buildTimelinePositions() {
  const sorted = [...scripts].sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0))
  const laneRightEdge: number[] = []
  const positions: Record<string, { x: number; y: number }> = {}

  for (const script of sorted) {
    const year = script.startYear ?? 0
    const x = Math.round(getTimelineYearX(year) - TIMELINE_NODE_WIDTH / 2)
    let lane = laneRightEdge.findIndex((rightEdge) => x - rightEdge >= TIMELINE_NODE_GAP)

    if (lane === -1) {
      lane = laneRightEdge.length
    }

    laneRightEdge[lane] = x + TIMELINE_NODE_WIDTH
    positions[script.id] = { x, y: TIMELINE_NODE_TOP + lane * TIMELINE_LANE_HEIGHT }
  }

  return positions
}

export function getTimelineYearX(year: number) {
  return ((year - TIMELINE_START_YEAR) / (TIMELINE_END_YEAR - TIMELINE_START_YEAR)) * TIMELINE_WIDTH
}

function getAzPosition(script: ScriptNode, index: number) {
  const column = index % 5
  const row = Math.floor(index / 5)
  return { x: column * 260, y: row * 150 }
}

function getLineageFallbackPosition(index: number) {
  const column = index % 4
  const row = Math.floor(index / 4)
  return { x: 1640 + column * 240, y: -160 + row * 145 }
}

function getPosition(script: ScriptNode, viewMode: ViewMode, index: number) {
  if (viewMode === 'timeline') return timelinePositions[script.id]
  if (viewMode === 'az') return getAzPosition(script, index)
  return lineagePositions[script.id] ?? getLineageFallbackPosition(index)
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
}): { nodes: Node<GraphNodeData>[]; graphEdges: Edge[] } {
  const sortedScripts = viewMode === 'az' ? [...scripts].sort((a, b) => a.name.localeCompare(b.name)) : scripts
  const hasFocus = Boolean(selectedId || activeTraceIds.size)

  const scriptNodes: Node<ScriptNodeData>[] = sortedScripts
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
  const tickNodes: Node<TimelineTickData>[] =
    viewMode === 'timeline'
      ? timelineTicks.map((tick) => ({
          id: `timeline-tick-${tick.year}`,
          type: 'timelineTick',
          position: {
            x: Math.round(getTimelineYearX(tick.year) - TIMELINE_TICK_WIDTH / 2),
            y: -86,
          },
          data: tick,
          draggable: false,
          selectable: false,
        }))
      : []

  const graphEdges =
    viewMode === 'lineage'
      ? edges
          .filter((edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to))
          .map((edge) => createEdge(edge, activeTraceIds, relatedIds, selectedId))
      : []

  return { nodes: [...tickNodes, ...scriptNodes], graphEdges }
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
    type: 'smoothstep',
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
