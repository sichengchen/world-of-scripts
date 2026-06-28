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
  { year: TIMELINE_END_YEAR, label: 'Today' },
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
  'egyptian-hieroglyphs': { x: 20, y: 600 },
  'proto-sinaitic': { x: 280, y: 600 },
  phoenician: { x: 540, y: 600 },
  greek: { x: 800, y: 180 },
  armenian: { x: 1060, y: -120 },
  georgian: { x: 1320, y: -120 },
  'old-italic': { x: 1060, y: 20 },
  latin: { x: 1320, y: 20 },
  ogham: { x: 1580, y: -120 },
  deseret: { x: 1580, y: 20 },
  osage: { x: 1580, y: 160 },
  runic: { x: 1320, y: 160 },
  coptic: { x: 1060, y: 160 },
  gothic: { x: 1060, y: 300 },
  glagolitic: { x: 1060, y: 440 },
  cyrillic: { x: 1060, y: 580 },
  aramaic: { x: 800, y: 980 },
  hebrew: { x: 1060, y: 760 },
  syriac: { x: 1060, y: 900 },
  samaritan: { x: 1060, y: 1040 },
  mandaic: { x: 1060, y: 1180 },
  nabataean: { x: 1060, y: 1320 },
  arabic: { x: 1320, y: 1320 },
  mongolian: { x: 1060, y: 1460 },
  geez: { x: 540, y: 980 },
  'oracle-bone': { x: 1900, y: 260 },
  chinese: { x: 2160, y: 260 },
  hiragana: { x: 2420, y: -20 },
  katakana: { x: 2420, y: 120 },
  bopomofo: { x: 2420, y: 260 },
  yi: { x: 2680, y: -20 },
  tangut: { x: 2680, y: 120 },
  nushu: { x: 2680, y: 260 },
  lisu: { x: 2680, y: 400 },
  hangul: { x: 2680, y: 540 },
  brahmi: { x: 1900, y: 1690 },
  sinhala: { x: 2160, y: 920 },
  tibetan: { x: 2160, y: 1060 },
  devanagari: { x: 2160, y: 1200 },
  'bengali-assamese': { x: 2160, y: 1340 },
  odia: { x: 2160, y: 1480 },
  gujarati: { x: 2160, y: 1620 },
  gurmukhi: { x: 2160, y: 1760 },
  tamil: { x: 2160, y: 1900 },
  malayalam: { x: 2160, y: 2040 },
  kannada: { x: 2160, y: 2180 },
  telugu: { x: 2160, y: 2320 },
  'meetei-mayek': { x: 2160, y: 2460 },
  myanmar: { x: 2720, y: 980 },
  cham: { x: 2720, y: 1120 },
  javanese: { x: 2720, y: 1260 },
  balinese: { x: 2720, y: 1400 },
  sundanese: { x: 2720, y: 1540 },
  tagalog: { x: 2720, y: 1680 },
  khmer: { x: 2720, y: 1820 },
  thai: { x: 2980, y: 1820 },
  lao: { x: 3240, y: 1820 },
  cuneiform: { x: 20, y: 1840 },
  'old-persian': { x: 280, y: 1840 },
  ugaritic: { x: 540, y: 1840 },
  'linear-b': { x: 20, y: 1980 },
  maya: { x: 280, y: 1980 },
  'ol-chiki': { x: 540, y: 1980 },
  thaana: { x: 800, y: 1980 },
  tifinagh: { x: 20, y: 2120 },
  nko: { x: 280, y: 2120 },
  adlam: { x: 540, y: 2120 },
  vai: { x: 800, y: 2120 },
  cherokee: { x: 20, y: 2260 },
  'canadian-aboriginal': { x: 280, y: 2260 },
  'old-turkic': { x: 540, y: 2260 },
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
        zIndex: isSelected || isTraced ? 12 : 10,
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

  const visibleLineageEdges =
    viewMode === 'lineage'
      ? edges.filter((edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to))
      : []
  const graphEdges = visibleLineageEdges.map((edge) => createEdge(edge, activeTraceIds, relatedIds, selectedId))

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
      ? '#737373'
      : edge.relationship === 'disputed'
        ? '#737373'
        : '#525252'
  const isTrace = activeTraceIds.has(edge.from) && activeTraceIds.has(edge.to)
  const isRelated = Boolean(selectedId && relatedIds.has(edge.from) && relatedIds.has(edge.to))

  return {
    id: `${edge.from}-${edge.to}`,
    source: edge.from,
    target: edge.to,
    sourceHandle: 'source',
    targetHandle: 'target',
    type: 'default',
    animated: isTrace,
    className: isTrace ? 'guide-edge' : undefined,
    zIndex: isTrace ? 2 : isRelated ? 1 : 0,
    label: edge.relationship === 'disputed' ? 'disputed' : undefined,
    style: {
      stroke: isTrace ? '#111111' : isRelated ? '#111111' : relationshipColor,
      strokeWidth: isTrace ? 2 : isRelated ? 1.5 : 1,
      strokeDasharray:
        !isTrace && (edge.relationship === 'influenced_by' || edge.relationship === 'disputed') ? '7 6' : undefined,
      opacity: selectedId || activeTraceIds.size ? (isTrace || isRelated ? 0.95 : 0.18) : 0.74,
    },
  }
}

export function getTypeColor(type: ScriptNode['type']) {
  return typeColors[type]
}
