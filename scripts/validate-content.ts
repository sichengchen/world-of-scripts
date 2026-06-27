import { validateContent } from '../src/data/validate'
import { scripts } from '../src/data/scripts'
import { createGraph, type ViewMode } from '../src/graph'

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

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i]
        const b = nodes[j]
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
  }

  if (errors.length) {
    throw new Error(`Graph layout validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  }
}
