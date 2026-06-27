import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type NodeMouseHandler,
} from '@xyflow/react'
import {
  ArrowRight,
  ArrowDown,
  ArrowDownUp,
  ArrowLeft,
  ArrowLeftRight,
  BookOpen,
  Compass,
  Filter,
  GitBranch,
  Info,
  LocateFixed,
  Search,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { edges, guidedTraces, regions, scripts, scriptTypes, type ScriptNode } from './data/scripts'
import { validateContent } from './data/validate'
import { createGraph, getRelatedIds, getTypeColor, type ScriptNodeData, type ViewMode } from './graph'

validateContent()

const nodeTypes = { scriptNode: ScriptGraphNode }

type Filters = {
  type: 'all' | ScriptNode['type']
  region: 'all' | string
  status: 'all' | ScriptNode['status']
}

function App() {
  return (
    <ReactFlowProvider>
      <AlphabetWorld />
    </ReactFlowProvider>
  )
}

function AlphabetWorld() {
  const [selectedId, setSelectedId] = useState<string | null>('latin')
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({ type: 'all', region: 'all', status: 'all' })
  const [viewMode, setViewMode] = useState<ViewMode>('lineage')
  const [activeTrace, setActiveTrace] = useState<string | null>('latin-path')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { fitView, setCenter, zoomIn, zoomOut } = useReactFlow()

  const activeTraceIds = useMemo(
    () => new Set(guidedTraces.find((trace) => trace.id === activeTrace)?.nodeIds ?? []),
    [activeTrace],
  )
  const relatedIds = useMemo(() => getRelatedIds(selectedId), [selectedId])
  const visibleIds = useMemo(() => {
    return new Set(
      scripts
        .filter((script) => filters.type === 'all' || script.type === filters.type)
        .filter((script) => filters.region === 'all' || script.region.includes(filters.region))
        .filter((script) => filters.status === 'all' || script.status === filters.status)
        .map((script) => script.id),
    )
  }, [filters])

  const selectedScript = scripts.find((script) => script.id === selectedId) ?? null
  const { nodes, graphEdges } = useMemo(
    () => createGraph({ activeTraceIds, relatedIds, selectedId, visibleIds, viewMode }),
    [activeTraceIds, relatedIds, selectedId, visibleIds, viewMode],
  )

  const matchingScripts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return []
    return scripts
      .filter((script) => {
        const haystack = [
          script.name,
          script.nativeName,
          script.type,
          script.status,
          ...script.region,
          ...script.sampleGlyphs,
          ...(script.visualGlyphs?.map((glyph) => glyph.label) ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalized)
      })
      .slice(0, 5)
  }, [query])

  useEffect(() => {
    const handle = window.setTimeout(() => fitView({ padding: 0.18, duration: 600 }), 80)
    return () => window.clearTimeout(handle)
  }, [fitView, viewMode, filters])

  function selectScript(id: string) {
    const node = nodes.find((item) => item.id === id)
    setSelectedId(id)
    setActiveTrace(null)
    if (node) {
      setCenter(node.position.x + 94, node.position.y + 56, { zoom: 1.05, duration: 550 })
    }
  }

  function searchSelect(script: ScriptNode) {
    setQuery(script.name)
    setFilters({ type: 'all', region: 'all', status: 'all' })
    selectScript(script.id)
  }

  const handleNodeClick: NodeMouseHandler = (_, node) => selectScript(node.id)

  return (
    <main className="grid h-full min-w-0 grid-rows-[62px_1fr] overflow-hidden bg-background text-foreground max-[1160px]:grid-rows-[112px_1fr] max-[820px]:grid-rows-[auto_1fr]">
      <Toolbar
        activeTrace={activeTrace}
        filters={filters}
        filtersOpen={filtersOpen}
        matchingScripts={matchingScripts}
        query={query}
        setActiveTrace={setActiveTrace}
        setFilters={setFilters}
        setFiltersOpen={setFiltersOpen}
        setQuery={setQuery}
        setViewMode={setViewMode}
        viewMode={viewMode}
        onFit={() => fitView({ padding: 0.18, duration: 600 })}
        onSearchSelect={searchSelect}
        onZoomIn={() => zoomIn({ duration: 250 })}
        onZoomOut={() => zoomOut({ duration: 250 })}
      />

      <section
        className="grid min-h-0 grid-cols-[minmax(0,1fr)_390px] overflow-hidden max-[820px]:relative max-[820px]:block"
        aria-label="Alphabet relationship explorer"
      >
        <div className="relative min-h-0 min-w-0 border-r max-[820px]:h-full max-[820px]:border-r-0">
          <div
            className="pointer-events-none absolute left-4 right-4 top-3 z-10 flex justify-between text-xs font-medium uppercase text-muted-foreground max-[820px]:hidden"
            aria-hidden="true"
          >
            <span>3400 BCE</span>
            <span>1000 BCE</span>
            <span>0</span>
            <span>1000 CE</span>
            <span>Today</span>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={graphEdges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            fitView
            minZoom={0.28}
            maxZoom={1.45}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            aria-label="World alphabets family tree"
          >
            <Background color="var(--border)" gap={28} size={1} variant={BackgroundVariant.Dots} />
            <Controls showInteractive={false} />
          </ReactFlow>
          <Legend />
        </div>

        <Inspector
          script={selectedScript}
          relatedScripts={selectedScript ? getImmediateRelations(selectedScript.id) : null}
          onClose={() => setSelectedId(null)}
          onSelect={selectScript}
        />
      </section>
    </main>
  )
}

function Toolbar({
  activeTrace,
  filters,
  filtersOpen,
  matchingScripts,
  query,
  setActiveTrace,
  setFilters,
  setFiltersOpen,
  setQuery,
  setViewMode,
  viewMode,
  onFit,
  onSearchSelect,
  onZoomIn,
  onZoomOut,
}: {
  activeTrace: string | null
  filters: Filters
  filtersOpen: boolean
  matchingScripts: ScriptNode[]
  query: string
  setActiveTrace: (id: string | null) => void
  setFilters: (filters: Filters) => void
  setFiltersOpen: (open: boolean) => void
  setQuery: (query: string) => void
  setViewMode: (mode: ViewMode) => void
  viewMode: ViewMode
  onFit: () => void
  onSearchSelect: (script: ScriptNode) => void
  onZoomIn: () => void
  onZoomOut: () => void
}) {
  return (
    <header className="relative z-20 grid grid-cols-[auto_minmax(210px,360px)_auto_auto_minmax(240px,1fr)_auto] items-center gap-2.5 border-b bg-background px-3.5 py-2.5 max-[1160px]:grid-cols-[auto_minmax(180px,1fr)_auto_auto_auto] max-[820px]:grid-cols-[1fr_auto_auto] max-[820px]:gap-2 max-[820px]:p-2">
      <div className="min-w-max font-semibold text-foreground">
        <span>Alphabet World</span>
      </div>

      <div className="relative flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-2 text-muted-foreground max-[820px]:order-2 max-[820px]:col-span-full">
        <Search aria-hidden="true" className="size-4 shrink-0" />
        <Input
          className="h-7 border-0 px-0 shadow-none focus-visible:ring-0"
          aria-label="Search scripts"
          placeholder="Search scripts"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <Button variant="ghost" size="icon-xs" aria-label="Clear search" onClick={() => setQuery('')}>
            <X data-icon="inline-start" />
          </Button>
        )}
        {matchingScripts.length > 0 && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+7px)] z-30 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md"
            role="listbox"
            aria-label="Search results"
          >
            {matchingScripts.map((script) => (
              <Button
                key={script.id}
                className="w-full justify-between rounded-none"
                variant="ghost"
                onClick={() => onSearchSelect(script)}
              >
                <span>{script.name}</span>
                <Badge variant="secondary">{script.type}</Badge>
              </Button>
            ))}
          </div>
        )}
      </div>

      <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-expanded={filtersOpen}>
            <Filter data-icon="inline-start" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="filter-popover">
          <PopoverHeader>
            <PopoverTitle>Filters</PopoverTitle>
            <PopoverDescription>Limit the diagram without changing the relationship data.</PopoverDescription>
          </PopoverHeader>
          <FilterSelect
            label="Type"
            value={filters.type}
            onValueChange={(type) => setFilters({ ...filters, type: type as Filters['type'] })}
            options={[
              { value: 'all', label: 'All types' },
              ...scriptTypes.map((type) => ({ value: type, label: capitalize(type) })),
            ]}
          />
          <FilterSelect
            label="Region"
            value={filters.region}
            onValueChange={(region) => setFilters({ ...filters, region })}
            options={[
              { value: 'all', label: 'All regions' },
              ...regions.map((region) => ({ value: region, label: region })),
            ]}
          />
          <FilterSelect
            label="Status"
            value={filters.status}
            onValueChange={(status) => setFilters({ ...filters, status: status as Filters['status'] })}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'living', label: 'Living' },
              { value: 'historical', label: 'Historical' },
              { value: 'revived', label: 'Revived' },
              { value: 'constructed', label: 'Constructed' },
            ]}
          />
        </PopoverContent>
      </Popover>

      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(mode) => mode && setViewMode(mode as ViewMode)}
        variant="outline"
        size="sm"
        spacing={0}
        aria-label="View mode"
        className="max-[820px]:hidden"
      >
        {(['lineage', 'timeline', 'az'] as ViewMode[]).map((mode) => (
          <ToggleGroupItem key={mode} value={mode}>
            {mode === 'az' ? 'A-Z' : capitalize(mode)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="min-w-0 max-[1160px]:col-span-full max-[820px]:hidden">
        <Select
          value={activeTrace ?? 'none'}
          onValueChange={(traceId) => setActiveTrace(traceId === 'none' ? null : traceId)}
        >
          <SelectTrigger className="w-[260px] max-w-full" aria-label="Guided trace">
            <Compass aria-hidden="true" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="none">No guided trace</SelectItem>
              {guidedTraces.map((trace) => (
                <SelectItem key={trace.id} value={trace.id}>
                  {trace.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex items-center gap-1 max-[820px]:hidden" aria-label="Canvas controls">
        <Button variant="outline" size="icon" aria-label="Zoom out" onClick={onZoomOut}>
          -
        </Button>
        <Button variant="outline" size="icon" aria-label="Fit to view" onClick={onFit}>
          <LocateFixed data-icon="inline-start" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Zoom in" onClick={onZoomIn}>
          +
        </Button>
      </div>
    </header>
  )
}

function FilterSelect({
  label,
  onValueChange,
  options,
  value,
}: {
  label: string
  onValueChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  value: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  )
}

function ScriptGraphNode({ data }: { data: ScriptNodeData }) {
  const { script, dimmed, isRelated, isSelected, isTraced } = data
  const color = getTypeColor(script.type)

  return (
    <article
      className={cn(
        'script-node',
        isSelected && 'is-selected',
        isRelated && 'is-related',
        isTraced && 'is-traced',
        dimmed && 'is-dimmed',
      )}
      style={{ '--node-accent': color } as CSSProperties}
      tabIndex={0}
      aria-label={`${script.name}, ${script.type}, ${formatDate(script)}`}
    >
      <Handle className="node-handle" type="target" position={Position.Left} />
      <Handle className="node-handle" type="source" position={Position.Right} />
      <div className="flex items-start justify-between gap-2">
        <strong>{script.name}</strong>
        <Badge variant="secondary">{script.type}</Badge>
      </div>
      <div className="mt-2 flex justify-between gap-2 text-xs font-medium text-muted-foreground">
        <span>{formatDate(script)}</span>
        <DirectionIcon direction={script.direction} />
      </div>
      <div className="node-glyphs" dir={script.direction === 'rtl' ? 'rtl' : 'ltr'}>
        {script.visualGlyphs ? (
          <SvgGlyphStrip glyphs={script.visualGlyphs.slice(0, 4)} />
        ) : (
          script.sampleGlyphs.slice(0, 6).join(' ')
        )}
      </div>
    </article>
  )
}

function Inspector({
  onClose,
  onSelect,
  relatedScripts,
  script,
}: {
  onClose: () => void
  onSelect: (id: string) => void
  relatedScripts: { ancestors: ScriptNode[]; children: ScriptNode[] } | null
  script: ScriptNode | null
}) {
  if (!script || !relatedScripts) {
    return (
      <aside className="inspector empty-inspector" aria-label="Script details">
        <div className="p-4">
          <Badge variant="outline" className="mb-2 uppercase">No selection</Badge>
          <h1>Select a script</h1>
        </div>
        <p className="px-4 text-sm leading-6">Click a node in the diagram to inspect its characters, lineage, and sources.</p>
      </aside>
    )
  }

  const characterRows: NonNullable<ScriptNode['characterRows']> =
    script.characterRows ??
    script.sampleGlyphs.map((glyph) => ({
      glyph,
    }))

  return (
    <aside
      className="min-h-0 min-w-0 overflow-hidden border-l bg-card max-[820px]:absolute max-[820px]:inset-x-0 max-[820px]:bottom-0 max-[820px]:z-20 max-[820px]:max-h-[48%] max-[820px]:rounded-t-xl max-[820px]:border-t"
      aria-label={`${script.name} details`}
    >
      <ScrollArea className="h-full">
      <div className="flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant="outline" className="mb-2 uppercase">{script.status}</Badge>
          <h1 className="text-3xl font-semibold leading-none">{script.name}</h1>
          {script.nativeName && <p className="mt-2 text-lg text-muted-foreground">{script.nativeName}</p>}
        </div>
        <Button className="hidden max-[820px]:inline-flex" variant="outline" size="icon" aria-label="Close inspector" onClick={onClose}>
          <X data-icon="inline-start" />
        </Button>
      </div>

      <dl className="grid grid-cols-2 gap-2.5">
        <MetadataItem label="Type" value={script.type} />
        <MetadataItem label="Region" value={script.region.join(', ')} />
        <MetadataItem label="Era" value={formatDate(script)} />
        <div className="rounded-lg border bg-background p-2.5">
          <dt className="text-xs font-medium uppercase text-muted-foreground">Direction</dt>
          <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
            <DirectionIcon direction={script.direction} />
            {directionLabel(script.direction)}
          </dd>
        </div>
      </dl>

      <Separator />

      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <BookOpen className="size-4 shrink-0" />
          <h2 className="text-sm font-semibold">{script.type === 'alphabet' || script.type === 'abjad' ? 'Alphabet' : 'Representative signs'}</h2>
        </div>
        {script.visualGlyphs ? (
          <div className="grid grid-cols-2 gap-2">
            {script.visualGlyphs.map((glyph) => (
              <div className="grid min-h-28 place-items-center gap-2 rounded-lg border bg-background px-3 py-3 text-center" key={glyph.label}>
                <SvgGlyph glyph={glyph} className="h-14 w-14" />
                <small className="text-xs font-medium text-muted-foreground">{glyph.label}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 max-[820px]:grid-cols-5" dir={script.direction === 'rtl' ? 'rtl' : 'ltr'}>
            {characterRows.slice(0, 26).map((row, index) => (
              <div
                className="grid min-h-16 place-items-center gap-1 rounded-lg border bg-background px-1 py-2 text-center"
                key={`${row.glyph}-${index}`}
              >
                <span className="script-glyph text-3xl leading-none">{row.glyph}</span>
                {(row.label || row.transliteration) && (
                  <small className="text-xs font-medium text-muted-foreground">
                    {[row.label, row.transliteration].filter(Boolean).join(' · ')}
                  </small>
                )}
              </div>
            ))}
          </div>
        )}
        {script.visualGlyphs && (
          <p className="mt-2 text-xs text-muted-foreground">
            SVG glyph assets are shown for this script because plain Unicode/text samples are incomplete or misleading.
          </p>
        )}
      </section>

      <Separator />

      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <Info className="size-4 shrink-0" />
          <h2 className="text-sm font-semibold">Historical note</h2>
        </div>
        <p className="text-sm leading-6">{script.summary}</p>
        {script.notes?.map((note) => (
          <p className="mt-2 border-l pl-3 text-sm leading-6 text-muted-foreground" key={note}>
            {note}
          </p>
        ))}
      </section>

      <Separator />

      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <GitBranch className="size-4 shrink-0" />
          <h2 className="text-sm font-semibold">Lineage</h2>
        </div>
        <RelationGroup label="Ancestors" scripts={relatedScripts.ancestors} onSelect={onSelect} />
        <RelationGroup label="Children" scripts={relatedScripts.children} onSelect={onSelect} />
      </section>

      <Separator />

      <section>
        <h2 className="mb-2.5 text-sm font-semibold">Sources</h2>
        <div className="flex flex-wrap gap-2">
          {script.sources.map((source) => (
            <Button key={source.url} asChild variant="outline" size="sm">
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label}
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          ))}
        </div>
      </section>
      </div>
      </ScrollArea>
    </aside>
  )
}

function SvgGlyphStrip({ glyphs }: { glyphs: NonNullable<ScriptNode['visualGlyphs']> }) {
  return (
    <div className="flex items-center gap-2">
      {glyphs.map((glyph) => (
        <SvgGlyph className="h-7 w-7" glyph={glyph} key={glyph.label} />
      ))}
    </div>
  )
}

function SvgGlyph({
  className,
  glyph,
}: {
  className?: string
  glyph: NonNullable<ScriptNode['visualGlyphs']>[number]
}) {
  return (
    <svg
      aria-label={`${glyph.label}; source: ${glyph.sourceLabel}`}
      className={className}
      fill="none"
      role="img"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.5"
      viewBox={glyph.viewBox}
    >
      {glyph.paths.map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  )
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-2.5">
      <dt className="text-xs font-medium uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}

function DirectionIcon({ direction }: { direction?: ScriptNode['direction'] }) {
  const label = directionLabel(direction)
  const Icon =
    direction === 'rtl'
      ? ArrowLeft
      : direction === 'ttb'
        ? ArrowDown
        : direction === 'btt'
          ? ArrowDownUp
          : direction === 'mixed'
            ? ArrowLeftRight
            : ArrowRight

  return (
    <span aria-label={label} className="inline-flex items-center text-muted-foreground" title={label}>
      <Icon className="size-4 shrink-0" />
    </span>
  )
}

function RelationGroup({
  label,
  onSelect,
  scripts: relationScripts,
}: {
  label: string
  scripts: ScriptNode[]
  onSelect: (id: string) => void
}) {
  return (
    <div className="mt-2 grid gap-2">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      {relationScripts.length ? (
        <div className="flex flex-wrap gap-2">
          {relationScripts.map((script) => (
            <Button key={script.id} variant="outline" size="sm" onClick={() => onSelect(script.id)}>
              {script.name}
            </Button>
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">No direct relationship shown</span>
      )}
    </div>
  )
}

function Legend() {
  return (
    <div
      className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-3 rounded-lg border bg-card px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm max-[820px]:bottom-48 max-[820px]:left-3 max-[820px]:right-3 max-[820px]:justify-between max-[820px]:gap-2"
      aria-label="Relationship legend"
    >
      <span>
        <i className="inline-block w-7 border-t-2 border-foreground" /> descended/adapted
      </span>
      <span>
        <i className="inline-block w-7 border-t-2 border-dashed border-muted-foreground" /> influenced/disputed
      </span>
      <span>
        <i className="inline-block w-7 border-t-2 border-foreground" /> selected path
      </span>
      <span className="text-foreground">only sourced relationships are connected</span>
    </div>
  )
}

function getImmediateRelations(scriptId: string) {
  const ancestors = edges
    .filter((edge) => edge.to === scriptId)
    .map((edge) => scripts.find((script) => script.id === edge.from))
    .filter(Boolean) as ScriptNode[]
  const children = edges
    .filter((edge) => edge.from === scriptId)
    .map((edge) => scripts.find((script) => script.id === edge.to))
    .filter(Boolean) as ScriptNode[]

  return { ancestors, children }
}

function formatDate(script: ScriptNode) {
  const start = script.startYear ? formatYear(script.startYear) : 'unknown'
  const end = script.endYear === 'present' ? 'present' : script.endYear ? formatYear(script.endYear) : ''
  return end ? `c. ${start}-${end}` : `c. ${start}`
}

function formatYear(year: number) {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`
}

function directionLabel(direction?: ScriptNode['direction']) {
  if (!direction) return 'varies'
  const labels = {
    ltr: 'left-to-right',
    rtl: 'right-to-left',
    ttb: 'top-to-bottom',
    btt: 'bottom-to-top',
    mixed: 'mixed',
  }
  return labels[direction]
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default App
