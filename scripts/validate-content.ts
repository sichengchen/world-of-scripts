import { validateContent } from '../src/data/validate'
import { edges, scripts } from '../src/data/scripts'
import {
  createGraph,
  getTimelineYearX,
  SCRIPT_NODE_HEIGHT,
  SCRIPT_NODE_WIDTH,
  TIMELINE_NODE_WIDTH,
  type ViewMode,
} from '../src/graph'

validateContent()
validateGraphLayout()
console.log('Content validation passed')

function validateGraphLayout() {
  const visibleIds = new Set(scripts.map((script) => script.id))
  const modes: ViewMode[] = ['lineage', 'timeline', 'az']
  const minGap = 6
  const errors: string[] = []

  for (const viewMode of modes) {
    const { nodes } = createGraph({
      activeTraceIds: new Set(),
      relatedIds: new Set(),
      selectedId: null,
      visibleIds,
      viewMode,
    })

    const scriptNodes = nodes.filter((node) => node.type === 'scriptNode')

    for (let i = 0; i < scriptNodes.length; i += 1) {
      for (let j = i + 1; j < scriptNodes.length; j += 1) {
        const a = scriptNodes[i]
        const b = scriptNodes[j]
        const xGap = Math.max(
          b.position.x - (a.position.x + SCRIPT_NODE_WIDTH),
          a.position.x - (b.position.x + SCRIPT_NODE_WIDTH),
        )
        const yGap = Math.max(
          b.position.y - (a.position.y + SCRIPT_NODE_HEIGHT),
          a.position.y - (b.position.y + SCRIPT_NODE_HEIGHT),
        )

        if (xGap < minGap && yGap < minGap) {
          errors.push(`${viewMode}: ${a.id} overlaps ${b.id}`)
        }
      }
    }

    if (viewMode === 'lineage') {
      const rects = new Map(
        scriptNodes.map((node) => [
          node.id,
          {
            x: node.position.x,
            y: node.position.y,
            width: SCRIPT_NODE_WIDTH,
            height: SCRIPT_NODE_HEIGHT,
          },
        ]),
      )

      for (const edge of edges) {
        const source = rects.get(edge.from)
        const target = rects.get(edge.to)
        if (!source || !target) continue

        const route = getSmoothStepRoute(source, target)
        for (const [id, rect] of rects) {
          if (id === edge.from || id === edge.to) continue
          if (route.some(([from, to]) => segmentIntersectsRect(from, to, rect))) {
            errors.push(`lineage: edge ${edge.from}->${edge.to} intersects ${id}`)
          }
        }
      }
    }

    if (viewMode === 'timeline') {
      for (const node of scriptNodes) {
        const script = scripts.find((item) => item.id === node.id)
        if (!script?.startYear) continue

        const actualYearX = node.position.x + TIMELINE_NODE_WIDTH / 2
        const expectedYearX = getTimelineYearX(script.startYear)
        if (Math.abs(actualYearX - expectedYearX) > 0.5) {
          errors.push(
            `timeline: ${node.id} is not aligned to ${script.startYear}; expected x=${expectedYearX}, got x=${actualYearX}`,
          )
        }
      }
    }
  }

  if (errors.length) {
    throw new Error(`Graph layout validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  }
}

type Point = { x: number; y: number }
type Rect = { x: number; y: number; width: number; height: number }

function getSmoothStepRoute(source: Rect, target: Rect): Array<[Point, Point]> {
  const sourcePoint = { x: source.x + source.width, y: source.y + source.height / 2 }
  const targetPoint = { x: target.x, y: target.y + target.height / 2 }
  const midX = Math.round((sourcePoint.x + targetPoint.x) / 2)
  const bendA = { x: midX, y: sourcePoint.y }
  const bendB = { x: midX, y: targetPoint.y }

  return [
    [sourcePoint, bendA],
    [bendA, bendB],
    [bendB, targetPoint],
  ]
}

function segmentIntersectsRect(from: Point, to: Point, rect: Rect) {
  const padding = 8
  const left = rect.x - padding
  const right = rect.x + rect.width + padding
  const top = rect.y - padding
  const bottom = rect.y + rect.height + padding

  if (Math.max(from.x, to.x) < left || Math.min(from.x, to.x) > right) return false
  if (Math.max(from.y, to.y) < top || Math.min(from.y, to.y) > bottom) return false

  const isInside = (point: Point) => point.x >= left && point.x <= right && point.y >= top && point.y <= bottom
  if (isInside(from) || isInside(to)) return true

  const borderSegments: Array<[Point, Point]> = [
    [{ x: left, y: top }, { x: right, y: top }],
    [{ x: right, y: top }, { x: right, y: bottom }],
    [{ x: right, y: bottom }, { x: left, y: bottom }],
    [{ x: left, y: bottom }, { x: left, y: top }],
  ]

  return borderSegments.some(([borderFrom, borderTo]) => segmentsIntersect(from, to, borderFrom, borderTo))
}

function segmentsIntersect(a: Point, b: Point, c: Point, d: Point) {
  return isCounterClockwise(a, c, d) !== isCounterClockwise(b, c, d) &&
    isCounterClockwise(a, b, c) !== isCounterClockwise(a, b, d)
}

function isCounterClockwise(a: Point, b: Point, c: Point) {
  return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x)
}
