import { validateContent } from '../src/data/validate'
import { scripts } from '../src/data/scripts'
import { createGraph, getTimelineYearX, TIMELINE_NODE_WIDTH, type ViewMode } from '../src/graph'

validateContent()
validateGraphLayout()
console.log('Content validation passed')

function validateGraphLayout() {
  const visibleIds = new Set(scripts.map((script) => script.id))
  const modes: ViewMode[] = ['lineage', 'timeline', 'az']
  const nodeWidth = 188
  const nodeHeight = 106
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
          b.position.x - (a.position.x + nodeWidth),
          a.position.x - (b.position.x + nodeWidth),
        )
        const yGap = Math.max(
          b.position.y - (a.position.y + nodeHeight),
          a.position.y - (b.position.y + nodeHeight),
        )

        if (xGap < minGap && yGap < minGap) {
          errors.push(`${viewMode}: ${a.id} overlaps ${b.id}`)
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
