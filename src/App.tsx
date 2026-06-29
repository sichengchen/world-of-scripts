import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  getViewportForBounds,
  useReactFlow,
  type NodeMouseHandler,
  type Rect,
} from '@xyflow/react'
import {
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Check,
  CircleHelp,
  Compass,
  Filter,
  Github,
  GitBranch,
  Info,
  Languages,
  MessageSquare,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Waypoints,
  X,
} from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
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
import {
  annotateHistoricalTerms,
  englishScriptDisplayName,
  localizedCharacterLabel,
  localizedScriptName,
  localizedTraceLabel,
  localizeScript,
} from './data/localized'
import { edges, guidedTraces, regions, scripts, scriptTypes, type ScriptNode } from './data/scripts'
import { validateContent } from './data/validate'
import {
  SCRIPT_NODE_HEIGHT,
  SCRIPT_NODE_WIDTH,
  createGraph,
  getRelatedIds,
  getTypeColor,
  type ScriptNodeData,
  type TimelineTickData,
  type ViewMode,
} from './graph'
import {
  type AppText,
  type Locale,
  directionLabel,
  formatDate,
  regionLabel,
  statusLabel,
  timelineTickLabel,
  translations,
  typeLabel,
  viewModeLabel,
} from './i18n'

validateContent()

const nodeTypes = { scriptNode: ScriptGraphNode, timelineTick: TimelineTickNode }
const flowMinZoom = 0.28
const flowMaxZoom = 1.45
const mobileBreakpoint = 820
const mobileSheetRatio = 0.48
const mobileSheetGap = 12
const letterBasedTypes: ScriptNode['type'][] = ['alphabet', 'abjad', 'abugida', 'featural']
const representativeExampleLimit = 16
const finiteInventoryTypes: ScriptNode['type'][] = [...letterBasedTypes, 'syllabary', 'semisyllabary']
const repositoryUrl = 'https://github.com/sichengchen/world-of-scripts'
const feedbackUrl = `${repositoryUrl}/issues`
const referenceLinks = [
  { label: 'Wikipedia: Alphabet', url: 'https://en.wikipedia.org/wiki/Alphabet' },
  { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
]
const fallbackScriptFont = '"Noto Sans", "Noto Sans Symbols 2", "Segoe UI Symbol", "Apple Symbols", serif'
const scriptFontStacks: Record<string, string> = {
  'egyptian-hieroglyphs': `"Noto Sans Egyptian Hieroglyphs", "Segoe UI Historic", ${fallbackScriptFont}`,
  'proto-sinaitic': `"Noto Sans Proto-Sinaitic", "Segoe UI Historic", ${fallbackScriptFont}`,
  phoenician: `"Noto Sans Phoenician", "Segoe UI Historic", ${fallbackScriptFont}`,
  greek: `"Noto Serif Greek", "Noto Serif", "Times New Roman", ${fallbackScriptFont}`,
  'old-italic': `"Noto Sans Old Italic", "Segoe UI Historic", ${fallbackScriptFont}`,
  latin: `"Noto Serif", Georgia, "Times New Roman", ${fallbackScriptFont}`,
  coptic: `"Noto Sans Coptic", "Segoe UI Historic", ${fallbackScriptFont}`,
  gothic: `"Noto Sans Gothic", "Segoe UI Historic", ${fallbackScriptFont}`,
  cyrillic: `"Noto Serif", Georgia, "Times New Roman", ${fallbackScriptFont}`,
  aramaic: `"Noto Sans Imperial Aramaic", "Segoe UI Historic", ${fallbackScriptFont}`,
  hebrew: `"Noto Sans Hebrew", "Arial Hebrew", "SBL Hebrew", ${fallbackScriptFont}`,
  syriac: `"Noto Sans Syriac", "Estrangelo Edessa", ${fallbackScriptFont}`,
  nabataean: `"Noto Sans Nabataean", "Segoe UI Historic", ${fallbackScriptFont}`,
  arabic: `"Noto Naskh Arabic", "Noto Sans Arabic", "Geeza Pro", "Segoe UI", ${fallbackScriptFont}`,
  brahmi: `"Noto Sans Brahmi", "Segoe UI Historic", ${fallbackScriptFont}`,
  devanagari: `"Noto Sans Devanagari", "Kohinoor Devanagari", Mangal, ${fallbackScriptFont}`,
  'bengali-assamese': `"Noto Sans Bengali", "Kohinoor Bangla", "Bangla MN", Vrinda, ${fallbackScriptFont}`,
  gujarati: `"Noto Sans Gujarati", "Gujarati Sangam MN", Shruti, ${fallbackScriptFont}`,
  gurmukhi: `"Noto Sans Gurmukhi", "Gurmukhi MN", Raavi, ${fallbackScriptFont}`,
  tamil: `"Noto Sans Tamil", "Tamil Sangam MN", Latha, ${fallbackScriptFont}`,
  kannada: `"Noto Sans Kannada", "Kannada Sangam MN", Tunga, ${fallbackScriptFont}`,
  telugu: `"Noto Sans Telugu", "Telugu Sangam MN", Gautami, ${fallbackScriptFont}`,
  khmer: `"Noto Sans Khmer", "Khmer MN", "Leelawadee UI", ${fallbackScriptFont}`,
  thai: `"Noto Sans Thai", "Thonburi", "Leelawadee UI", Tahoma, ${fallbackScriptFont}`,
  tibetan: `"Noto Sans Tibetan", "Kailasa", "Microsoft Himalaya", ${fallbackScriptFont}`,
  geez: `"Noto Sans Ethiopic", "Kefa", "Nyala", ${fallbackScriptFont}`,
  armenian: `"Noto Sans Armenian", "Mshtakan", "Sylfaen", ${fallbackScriptFont}`,
  georgian: `"Noto Sans Georgian", "Noto Serif Georgian", "Sylfaen", ${fallbackScriptFont}`,
  runic: `"Noto Sans Runic", "Segoe UI Historic", ${fallbackScriptFont}`,
  ogham: `"Noto Sans Ogham", "Segoe UI Historic", ${fallbackScriptFont}`,
  hangul: `"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans CJK KR", "Noto Sans KR", ${fallbackScriptFont}`,
  'oracle-bone': `"Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "SimSun", ${fallbackScriptFont}`,
  chinese: `"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", ${fallbackScriptFont}`,
  cuneiform: `"Noto Sans Cuneiform", "Segoe UI Historic", ${fallbackScriptFont}`,
  maya: `"Noto Sans Mayan Numerals", ${fallbackScriptFont}`,
  cherokee: `"Noto Sans Cherokee", "Plantagenet Cherokee", ${fallbackScriptFont}`,
  'canadian-aboriginal': `"Noto Sans Canadian Aboriginal", "Euphemia UCAS", ${fallbackScriptFont}`,
  hiragana: `"Hiragino Sans", "Yu Gothic", Meiryo, "Noto Sans CJK JP", "Noto Sans JP", ${fallbackScriptFont}`,
  katakana: `"Hiragino Sans", "Yu Gothic", Meiryo, "Noto Sans CJK JP", "Noto Sans JP", ${fallbackScriptFont}`,
  manyogana: `"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", "Noto Serif JP", ${fallbackScriptFont}`,
  bopomofo: `"PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "Source Han Sans TC", ${fallbackScriptFont}`,
  yi: `"Noto Sans Yi", "Nuosu SIL", ${fallbackScriptFont}`,
  tangut: `"Noto Serif Tangut", "Tangut Yinchuan", ${fallbackScriptFont}`,
  'khitan-small-script': `"Noto Serif Khitan Small Script", ${fallbackScriptFont}`,
  'khitan-large-script': `"BabelStone Khitan Large Glyphs", ${fallbackScriptFont}`,
  nushu: `"Noto Sans Nushu", "Noto Traditional Nushu", ${fallbackScriptFont}`,
  lisu: `"Noto Sans Lisu", ${fallbackScriptFont}`,
  glagolitic: `"Noto Sans Glagolitic", "Segoe UI Historic", ${fallbackScriptFont}`,
  'linear-b': `"Noto Sans Linear B", "Aegean", "Segoe UI Historic", ${fallbackScriptFont}`,
  deseret: `"Noto Sans Deseret", "Segoe UI Historic", ${fallbackScriptFont}`,
  sinhala: `"Noto Sans Sinhala", "Sinhala Sangam MN", Iskoola Pota, ${fallbackScriptFont}`,
  odia: `"Noto Sans Oriya", "Noto Sans Odia", "Oriya Sangam MN", Kalinga, ${fallbackScriptFont}`,
  malayalam: `"Noto Sans Malayalam", "Malayalam Sangam MN", Kartika, ${fallbackScriptFont}`,
  'meetei-mayek': `"Noto Sans Meetei Mayek", ${fallbackScriptFont}`,
  'ol-chiki': `"Noto Sans Ol Chiki", ${fallbackScriptFont}`,
  thaana: `"Noto Sans Thaana", "MV Boli", ${fallbackScriptFont}`,
  myanmar: `"Noto Sans Myanmar", "Myanmar MN", "Myanmar Text", ${fallbackScriptFont}`,
  lao: `"Noto Sans Lao", "Lao MN", "Leelawadee UI", ${fallbackScriptFont}`,
  javanese: `"Noto Sans Javanese", "Tuladha Jejeg", ${fallbackScriptFont}`,
  balinese: `"Noto Sans Balinese", "Aksara Bali", ${fallbackScriptFont}`,
  sundanese: `"Noto Sans Sundanese", ${fallbackScriptFont}`,
  cham: `"Noto Sans Cham", ${fallbackScriptFont}`,
  tagalog: `"Noto Sans Tagalog", "Segoe UI Historic", ${fallbackScriptFont}`,
  tifinagh: `"Noto Sans Tifinagh", "Ebrima", ${fallbackScriptFont}`,
  nko: `"Noto Sans NKo", "Ebrima", ${fallbackScriptFont}`,
  adlam: `"Noto Sans Adlam", "Ebrima", ${fallbackScriptFont}`,
  vai: `"Noto Sans Vai", ${fallbackScriptFont}`,
  'old-turkic': `"Noto Sans Old Turkic", "Segoe UI Historic", ${fallbackScriptFont}`,
  sogdian: `"Noto Sans Sogdian", "Segoe UI Historic", ${fallbackScriptFont}`,
  'old-uyghur': `"Noto Serif Old Uyghur", "Noto Sans Old Uyghur", ${fallbackScriptFont}`,
  mongolian: `"Noto Sans Mongolian", "Mongolian Baiti", ${fallbackScriptFont}`,
  'phags-pa': `"Noto Sans PhagsPa", "Noto Sans Phags Pa", "BabelStone Phags-pa Book", "Microsoft PhagsPa", "Segoe UI Historic", ${fallbackScriptFont}`,
  manchu: `"Noto Sans Mongolian", "Mongolian Baiti", ${fallbackScriptFont}`,
  ugaritic: `"Noto Sans Ugaritic", "Segoe UI Historic", ${fallbackScriptFont}`,
  samaritan: `"Noto Sans Samaritan", ${fallbackScriptFont}`,
  mandaic: `"Noto Sans Mandaic", ${fallbackScriptFont}`,
  'old-persian': `"Noto Sans Old Persian", "Segoe UI Historic", ${fallbackScriptFont}`,
  osage: `"Noto Sans Osage", ${fallbackScriptFont}`,
}
const scriptLanguageTags: Record<string, string> = {
  arabic: 'ar',
  armenian: 'hy',
  'bengali-assamese': 'bn',
  bopomofo: 'zh-TW',
  chinese: 'zh-Hans',
  cyrillic: 'ru',
  devanagari: 'hi',
  geez: 'gez',
  georgian: 'ka',
  greek: 'el',
  gujarati: 'gu',
  gurmukhi: 'pa',
  hangul: 'ko',
  hebrew: 'he',
  hiragana: 'ja',
  kannada: 'kn',
  katakana: 'ja',
  'khitan-large-script': 'zkt-Kitl',
  'khitan-small-script': 'zkt-Kits',
  khmer: 'km',
  lao: 'lo',
  malayalam: 'ml',
  manyogana: 'ja',
  manchu: 'mnc-Mong',
  mongolian: 'mn-Mong',
  myanmar: 'my',
  nushu: 'zh-Nshu',
  'phags-pa': 'mn-Phag',
  'oracle-bone': 'zh-Hant',
  odia: 'or',
  sinhala: 'si',
  syriac: 'syr',
  tamil: 'ta',
  tangut: 'txg-Tang',
  telugu: 'te',
  thai: 'th',
  tibetan: 'bo',
  yi: 'ii',
}

const verticalNodeGlyphScriptIds = new Set(['ogham', 'mongolian', 'manchu', 'old-uyghur', 'khitan-large-script', 'phags-pa'])

type Filters = {
  type: 'all' | ScriptNode['type']
  region: 'all' | string
  status: 'all' | ScriptNode['status']
}

type I18nContextValue = {
  locale: Locale
  t: AppText
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('I18nContext is missing')
  return value
}

function App() {
  return (
    <ReactFlowProvider>
      <AlphabetWorld />
    </ReactFlowProvider>
  )
}

function AlphabetWorld() {
  const [locale, setLocale] = useState<Locale>('en')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({ type: 'all', region: 'all', status: 'all' })
  const [viewMode, setViewMode] = useState<ViewMode>('lineage')
  const [activeTrace, setActiveTrace] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [inspectorExpanded, setInspectorExpanded] = useState(false)
  const flowPaneRef = useRef<HTMLDivElement>(null)
  const { fitBounds, fitView, setCenter, setViewport, zoomIn, zoomOut } = useReactFlow()
  const t = translations[locale]
  const i18n = useMemo(() => ({ locale, t, setLocale }), [locale, t])

  const activeTraceIds = useMemo<Set<string>>(
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
    () => createGraph({
      activeTraceIds,
      getScriptSortName: (script) => localizedScriptName(script, locale),
      relatedIds,
      selectedId,
      visibleIds,
      viewMode,
    }),
    [activeTraceIds, locale, relatedIds, selectedId, visibleIds, viewMode],
  )
  const activeTraceBounds = useMemo(() => {
    const traceNodes = nodes.filter((node) => node.type === 'scriptNode' && activeTraceIds.has(node.id))
    if (!traceNodes.length) return null

    const left = Math.min(...traceNodes.map((node) => node.position.x))
    const top = Math.min(...traceNodes.map((node) => node.position.y))
    const right = Math.max(...traceNodes.map((node) => node.position.x + SCRIPT_NODE_WIDTH))
    const bottom = Math.max(...traceNodes.map((node) => node.position.y + SCRIPT_NODE_HEIGHT))

    return { x: left, y: top, width: right - left, height: bottom - top }
  }, [activeTraceIds, nodes])
  const visibleGraphBounds = useMemo(() => {
    const scriptNodes = nodes.filter((node) => node.type === 'scriptNode')
    if (!scriptNodes.length) return null

    const left = Math.min(...scriptNodes.map((node) => node.position.x))
    const top = Math.min(...scriptNodes.map((node) => node.position.y))
    const right = Math.max(...scriptNodes.map((node) => node.position.x + SCRIPT_NODE_WIDTH))
    const bottom = Math.max(...scriptNodes.map((node) => node.position.y + SCRIPT_NODE_HEIGHT))

    return { x: left, y: top, width: right - left, height: bottom - top }
  }, [nodes])

  const matchingScripts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return []
    return scripts
      .filter((script) => {
        const localized = localizeScript(script, locale)
        const haystack = [
          script.name,
          script.commonName,
          localized.localizedName,
          localized.localizedCommonName,
          localized.localizedSummary,
          ...(localized.localizedNotes ?? []),
          script.nativeName,
          script.type,
          script.status,
          statusLabel(script.status, t),
          ...script.region,
          ...script.region.map((region) => regionLabel(region, t)),
          ...script.sampleGlyphs,
          typeLabel(script.type, t),
          ...(script.characterRows?.flatMap((row) => [
            row.label,
            row.label ? localizedCharacterLabel(row.label, locale, script.id) : undefined,
            row.transliteration,
          ]) ?? []),
          ...(script.nativeNameVisual?.map((glyph) => glyph.label) ?? []),
          ...(script.visualGlyphs?.flatMap((glyph) => [glyph.label, localizedCharacterLabel(glyph.label, locale, script.id)]) ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalized)
      })
      .slice(0, 5)
  }, [locale, query, t])

  const getMobileFlowSize = useCallback((reserveInspector = false) => {
    const pane = flowPaneRef.current
    if (!pane || !window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches) return null

    const rect = pane.getBoundingClientRect()
    const reservedHeight = selectedScript || reserveInspector ? window.innerHeight * mobileSheetRatio + mobileSheetGap : 0
    const availableHeight = Math.max(180, rect.height - reservedHeight)

    return { width: rect.width, height: availableHeight }
  }, [selectedScript])

  const fitBoundsForLayout = useCallback(
    (bounds: Rect, padding: number, duration: number) => {
      const mobileSize = getMobileFlowSize()

      if (!mobileSize) {
        fitBounds(bounds, { padding, duration })
        return
      }

      const viewport = getViewportForBounds(bounds, mobileSize.width, mobileSize.height, flowMinZoom, flowMaxZoom, padding)
      setViewport(viewport, { duration })
    },
    [fitBounds, getMobileFlowSize, setViewport],
  )

  const fitGraphForLayout = useCallback(
    (duration = 600) => {
      if (!visibleGraphBounds) {
        fitView({ padding: 0.18, duration })
        return
      }

      fitBoundsForLayout(visibleGraphBounds, 0.18, duration)
    },
    [fitBoundsForLayout, fitView, visibleGraphBounds],
  )

  const centerNodeForLayout = useCallback(
    (x: number, y: number, zoom: number, duration: number) => {
      const mobileSize = getMobileFlowSize(true)

      if (!mobileSize) {
        setCenter(x, y, { zoom, duration })
        return
      }

      setViewport(
        {
          x: mobileSize.width / 2 - x * zoom,
          y: mobileSize.height / 2 - y * zoom,
          zoom,
        },
        { duration },
      )
    },
    [getMobileFlowSize, setCenter, setViewport],
  )

  const resetViewForLayout = useCallback(
    (duration = 600) => {
      const mobileSize = getMobileFlowSize()

      if (mobileSize) {
        if (activeTrace && activeTraceBounds) {
          fitBoundsForLayout(activeTraceBounds, 0.24, duration)
          return
        }

        const selectedNode = selectedId ? nodes.find((node) => node.id === selectedId) : null
        if (selectedNode) {
          centerNodeForLayout(selectedNode.position.x + SCRIPT_NODE_WIDTH / 2, selectedNode.position.y + SCRIPT_NODE_HEIGHT / 2, 1.05, duration)
          return
        }
      }

      fitGraphForLayout(duration)
    },
    [activeTrace, activeTraceBounds, centerNodeForLayout, fitBoundsForLayout, fitGraphForLayout, getMobileFlowSize, nodes, selectedId],
  )

  useEffect(() => {
    if (activeTrace || selectedId) return undefined
    const handle = window.setTimeout(() => fitGraphForLayout(600), 80)
    return () => window.clearTimeout(handle)
  }, [activeTrace, fitGraphForLayout, selectedId, viewMode, filters])

  useEffect(() => {
    if (!activeTrace || !activeTraceBounds) return undefined
    const handle = window.setTimeout(() => {
      fitBoundsForLayout(activeTraceBounds, 0.24, 650)
    }, 80)
    return () => window.clearTimeout(handle)
  }, [activeTrace, activeTraceBounds, fitBoundsForLayout, viewMode])

  useEffect(() => {
    setInspectorExpanded(false)
  }, [selectedId])

  function selectScript(id: string) {
    const node = nodes.find((item) => item.id === id)
    setSelectedId(id)
    setActiveTrace(null)
    if (node) {
      centerNodeForLayout(node.position.x + 94, node.position.y + 56, 1.05, 550)
    }
  }

  function searchSelect(script: ScriptNode) {
    setQuery('')
    setFilters({ type: 'all', region: 'all', status: 'all' })
    selectScript(script.id)
  }

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    if (node.type === 'scriptNode') selectScript(node.id)
  }

  function selectTrace(id: string | null) {
    setActiveTrace(id)
    if (id) setSelectedId(null)
  }

  return (
    <I18nContext.Provider value={i18n}>
      <main
        className="relative grid h-full min-w-0 grid-rows-[62px_1fr] overflow-hidden bg-background text-foreground max-[1160px]:grid-rows-[112px_1fr] max-[820px]:grid-rows-[1fr]"
        aria-describedby="app-summary"
        lang={locale}
      >
      <Toolbar
        activeTrace={activeTrace}
        filters={filters}
        filtersOpen={filtersOpen}
        matchingScripts={matchingScripts}
        query={query}
        searchOpen={searchOpen}
        setFilters={setFilters}
        setFiltersOpen={setFiltersOpen}
        setQuery={setQuery}
        setSearchOpen={setSearchOpen}
        setViewMode={setViewMode}
        viewMode={viewMode}
        onSearchSelect={searchSelect}
        onTraceSelect={selectTrace}
      />

      <section
        className="grid min-h-0 grid-cols-[minmax(0,1fr)_390px] overflow-hidden max-[820px]:relative max-[820px]:block"
        aria-label={t.relationshipExplorer}
      >
        <div ref={flowPaneRef} className="relative min-h-0 min-w-0 border-r max-[820px]:h-full max-[820px]:border-r-0">
          <ReactFlow
            nodes={nodes}
            edges={graphEdges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            onPaneClick={() => setSelectedId(null)}
            fitView
            minZoom={flowMinZoom}
            maxZoom={flowMaxZoom}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            aria-label={t.flowLabel}
          >
            <Background color="var(--border)" gap={28} size={1} variant={BackgroundVariant.Dots} />
          </ReactFlow>
          <Legend
            inspectorDocked={Boolean(selectedScript && !inspectorExpanded)}
            inspectorExpanded={Boolean(selectedScript && inspectorExpanded)}
          />
          <CanvasControls
            inspectorDocked={Boolean(selectedScript && !inspectorExpanded)}
            inspectorExpanded={Boolean(selectedScript && inspectorExpanded)}
            onFit={() => resetViewForLayout(600)}
            onZoomIn={() => zoomIn({ duration: 250 })}
            onZoomOut={() => zoomOut({ duration: 250 })}
          />
        </div>

        <Inspector
          script={selectedScript}
          expanded={inspectorExpanded}
          relatedScripts={selectedScript ? getImmediateRelations(selectedScript.id) : null}
          onClose={() => setSelectedId(null)}
          onExpandedChange={setInspectorExpanded}
          onSelect={selectScript}
        />
      </section>
      </main>
    </I18nContext.Provider>
  )
}

function Toolbar({
  activeTrace,
  filters,
  filtersOpen,
  matchingScripts,
  onTraceSelect,
  query,
  searchOpen,
  setFilters,
  setFiltersOpen,
  setQuery,
  setSearchOpen,
  setViewMode,
  viewMode,
  onSearchSelect,
}: {
  activeTrace: string | null
  filters: Filters
  filtersOpen: boolean
  matchingScripts: ScriptNode[]
  onTraceSelect: (id: string | null) => void
  query: string
  searchOpen: boolean
  setFilters: (filters: Filters) => void
  setFiltersOpen: (open: boolean) => void
  setQuery: (query: string) => void
  setSearchOpen: (open: boolean) => void
  setViewMode: (mode: ViewMode) => void
  viewMode: ViewMode
  onSearchSelect: (script: ScriptNode) => void
}) {
  const { locale, t } = useI18n()
  const desktopSearchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const [mobileGuideOpen, setMobileGuideOpen] = useState(false)
  const [desktopGuideOpen, setDesktopGuideOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  useEffect(() => {
    if (!searchOpen) return
    const handle = window.setTimeout(() => {
      const target = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches
        ? mobileSearchInputRef.current
        : desktopSearchInputRef.current
      target?.focus()
    }, 80)
    return () => window.clearTimeout(handle)
  }, [searchOpen])

  function closeSearch() {
    setQuery('')
    setSearchOpen(false)
  }

  const viewOptions = (['lineage', 'timeline', 'az'] as ViewMode[]).map((mode) => ({
    value: mode,
    label: viewModeLabel(mode, t),
  }))
  const typeOptions = [
    { value: 'all', label: t.allTypes },
    ...scriptTypes.map((type) => ({ value: type, label: typeLabel(type, t) })),
  ]
  const regionOptions = [
    { value: 'all', label: t.allRegions },
    ...regions.map((region) => ({ value: region, label: regionLabel(region, t) })),
  ]
  const statusOptions = [
    { value: 'all', label: t.allStatuses },
    ...(['living', 'historical', 'revived', 'constructed'] as ScriptNode['status'][]).map((status) => ({
      value: status,
      label: statusLabel(status, t),
    })),
  ]

  return (
    <header className="relative z-20 flex min-h-[62px] flex-wrap items-center justify-between gap-3 border-b bg-background px-3.5 py-2.5 max-[820px]:pointer-events-none max-[820px]:absolute max-[820px]:inset-x-0 max-[820px]:top-0 max-[820px]:z-40 max-[820px]:grid max-[820px]:min-h-0 max-[820px]:grid-cols-[minmax(0,1fr)_auto] max-[820px]:items-start max-[820px]:gap-x-2 max-[820px]:gap-y-2 max-[820px]:border-0 max-[820px]:bg-transparent max-[820px]:p-2">
      <div className="flex min-w-0 items-center gap-2.5 max-[820px]:contents">
        <h1 className="min-w-max text-base font-semibold leading-none text-foreground max-[820px]:sr-only">{t.appName}</h1>
        <p id="app-summary" className="sr-only">{t.appSummary}</p>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(mode) => mode && setViewMode(mode as ViewMode)}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label={t.viewMode}
          className="max-[820px]:hidden"
        >
          {viewOptions.map((mode) => (
            <ToggleGroupItem key={mode.value} value={mode.value}>
              {mode.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="ml-auto flex min-w-0 items-center justify-end gap-2 max-[820px]:contents">
        <ButtonGroup
          className="hidden max-[820px]:pointer-events-auto max-[820px]:col-start-1 max-[820px]:row-start-1 max-[820px]:inline-flex max-[820px]:justify-self-start"
          aria-label={t.navigationTools}
        >
          <Button
            variant="outline"
            size="icon"
            aria-label={t.searchScripts}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(true)}
          >
            <Search data-icon="inline-start" />
          </Button>
          <Popover open={viewOpen} onOpenChange={setViewOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t.viewMode} aria-expanded={viewOpen}>
                <Waypoints data-icon="inline-start" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-44 p-1 min-[821px]:hidden">
              <div className="flex flex-col gap-1">
                {viewOptions.map((mode) => (
                  <Button
                    key={mode.value}
                    className="w-full justify-between"
                    variant={viewMode === mode.value ? 'secondary' : 'ghost'}
                    onClick={() => {
                      setViewMode(mode.value)
                      setViewOpen(false)
                    }}
                  >
                    {mode.label}
                    {viewMode === mode.value && <Check data-icon="inline-end" />}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </ButtonGroup>

        <div
          className={cn(
            'absolute left-2 right-2 top-[calc(100%+0.5rem)] z-40 items-center gap-2 rounded-lg border border-input bg-background px-2 text-muted-foreground shadow-md transition-opacity duration-150 max-[820px]:pointer-events-auto max-[820px]:backdrop-blur',
            searchOpen ? 'hidden max-[820px]:flex' : 'hidden',
          )}
          aria-hidden={!searchOpen}
        >
          <Search aria-hidden="true" className="size-4 shrink-0" />
          <Input
            ref={mobileSearchInputRef}
            className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
            aria-label={t.searchScripts}
            placeholder={t.searchScripts}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            tabIndex={searchOpen ? undefined : -1}
          />
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={t.closeSearch}
            onClick={closeSearch}
            tabIndex={searchOpen ? undefined : -1}
          >
            <X data-icon="inline-start" />
          </Button>
          {searchOpen && matchingScripts.length > 0 && (
            <div
              className="absolute left-0 right-0 top-[calc(100%+7px)] z-30 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md"
              role="listbox"
              aria-label={t.searchResults}
            >
              {matchingScripts.map((script) => (
                <Button
                  key={script.id}
                  className="w-full justify-between rounded-none"
                  variant="ghost"
                  onClick={() => {
                    onSearchSelect(script)
                    setSearchOpen(false)
                  }}
                >
                  <span>{localizedScriptName(script, locale)}</span>
                  <Badge variant="secondary">{typeLabel(script.type, t)}</Badge>
                </Button>
              ))}
            </div>
          )}
        </div>

        <ButtonGroup
          className="hidden max-[820px]:pointer-events-auto max-[820px]:col-start-2 max-[820px]:row-start-1 max-[820px]:inline-flex max-[820px]:justify-self-end"
          aria-label={t.scriptTools}
        >
          <Popover open={mobileGuideOpen} onOpenChange={setMobileGuideOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t.guidedTrace} aria-expanded={mobileGuideOpen}>
                <Compass data-icon="inline-start" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 p-1 min-[821px]:hidden">
              <div className="flex flex-col gap-1">
                <Button
                  className="w-full justify-between"
                  variant={activeTrace === null ? 'secondary' : 'ghost'}
                  onClick={() => {
                    onTraceSelect(null)
                    setMobileGuideOpen(false)
                  }}
                >
                  {t.noGuidedTrace}
                  {activeTrace === null && <Check data-icon="inline-end" />}
                </Button>
                {guidedTraces.map((trace) => (
                  <Button
                    key={trace.id}
                    className="w-full justify-between"
                    variant={activeTrace === trace.id ? 'secondary' : 'ghost'}
                    onClick={() => {
                      onTraceSelect(trace.id)
                      setMobileGuideOpen(false)
                    }}
                  >
                    {localizedTraceLabel(trace.id, trace.label, locale)}
                    {activeTrace === trace.id && <Check data-icon="inline-end" />}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t.filters} aria-expanded={mobileFiltersOpen}>
                <Filter data-icon="inline-start" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="filter-popover min-[821px]:hidden">
              <FilterSelect
                label={t.type}
                value={filters.type}
                onValueChange={(type) => setFilters({ ...filters, type: type as Filters['type'] })}
                options={typeOptions}
              />
              <FilterSelect
                label={t.region}
                value={filters.region}
                onValueChange={(region) => setFilters({ ...filters, region })}
                options={regionOptions}
              />
              <FilterSelect
                label={t.status}
                value={filters.status}
                onValueChange={(status) => setFilters({ ...filters, status: status as Filters['status'] })}
                options={statusOptions}
              />
            </PopoverContent>
          </Popover>

          <LanguageSelect />

          <Button variant="outline" size="icon" asChild>
            <a href={feedbackUrl} target="_blank" rel="noreferrer" aria-label={t.feedback}>
              <MessageSquare data-icon="inline-start" />
            </a>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t.about}>
                <Info data-icon="inline-start" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{t.appName}</DialogTitle>
                <DialogDescription>
                  {t.aboutDescription}
                </DialogDescription>
              </DialogHeader>
              <AboutContent />
            </DialogContent>
          </Dialog>
        </ButtonGroup>

        <div
          className={cn(
            'relative h-8 shrink-0 transition-[width,max-width,flex-basis] duration-200 ease-out max-[820px]:hidden',
            searchOpen
              ? 'w-[300px] max-w-[32vw]'
              : 'w-8',
          )}
        >
          <Button
            className={cn('absolute inset-0 transition-opacity duration-150', searchOpen && 'pointer-events-none opacity-0')}
            variant="outline"
            size="icon"
            aria-label={t.searchScripts}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(true)}
          >
            <Search data-icon="inline-start" />
          </Button>
          <div
            className={cn(
              'absolute inset-0 flex items-center gap-2 rounded-lg border border-input bg-background px-2 text-muted-foreground transition-opacity duration-150',
              searchOpen ? 'opacity-100 delay-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={!searchOpen}
          >
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <Input
              ref={desktopSearchInputRef}
              className="h-6 border-0 px-0 shadow-none focus-visible:ring-0"
              aria-label={t.searchScripts}
              placeholder={t.searchScripts}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              tabIndex={searchOpen ? undefined : -1}
            />
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={t.closeSearch}
              onClick={closeSearch}
              tabIndex={searchOpen ? undefined : -1}
            >
              <X data-icon="inline-start" />
            </Button>
          </div>
          {searchOpen && matchingScripts.length > 0 && (
            <div
              className="absolute left-0 right-0 top-[calc(100%+7px)] z-30 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md"
              role="listbox"
              aria-label={t.searchResults}
            >
              {matchingScripts.map((script) => (
                <Button
                  key={script.id}
                  className="w-full justify-between rounded-none"
                  variant="ghost"
                  onClick={() => {
                    onSearchSelect(script)
                    setSearchOpen(false)
                  }}
                >
                  <span>{localizedScriptName(script, locale)}</span>
                  <Badge variant="secondary">{typeLabel(script.type, t)}</Badge>
                </Button>
              ))}
            </div>
          )}
        </div>

        <Popover open={desktopGuideOpen} onOpenChange={setDesktopGuideOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="max-[820px]:hidden" aria-label={t.guidedTrace} aria-expanded={desktopGuideOpen}>
              <Compass data-icon="inline-start" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-1 max-[820px]:hidden">
            <div className="flex flex-col gap-1">
              <Button
                className="w-full justify-between"
                variant={activeTrace === null ? 'secondary' : 'ghost'}
                onClick={() => {
                  onTraceSelect(null)
                  setDesktopGuideOpen(false)
                }}
              >
                {t.noGuidedTrace}
                {activeTrace === null && <Check data-icon="inline-end" />}
              </Button>
              {guidedTraces.map((trace) => (
                <Button
                  key={trace.id}
                  className="w-full justify-between"
                  variant={activeTrace === trace.id ? 'secondary' : 'ghost'}
                  onClick={() => {
                    onTraceSelect(trace.id)
                    setDesktopGuideOpen(false)
                  }}
                >
                  {localizedTraceLabel(trace.id, trace.label, locale)}
                  {activeTrace === trace.id && <Check data-icon="inline-end" />}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="max-[820px]:hidden" aria-label={t.filters} aria-expanded={filtersOpen}>
              <Filter data-icon="inline-start" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="filter-popover max-[820px]:hidden">
            <FilterSelect
              label={t.type}
              value={filters.type}
              onValueChange={(type) => setFilters({ ...filters, type: type as Filters['type'] })}
              options={typeOptions}
            />
            <FilterSelect
              label={t.region}
              value={filters.region}
              onValueChange={(region) => setFilters({ ...filters, region })}
              options={regionOptions}
            />
            <FilterSelect
              label={t.status}
              value={filters.status}
              onValueChange={(status) => setFilters({ ...filters, status: status as Filters['status'] })}
              options={statusOptions}
            />
          </PopoverContent>
        </Popover>

        <LanguageSelect className="max-[820px]:hidden" />

        <Button variant="outline" className="max-[820px]:hidden" asChild>
          <a href={feedbackUrl} target="_blank" rel="noreferrer">
            <MessageSquare data-icon="inline-start" />
            {t.feedback}
          </a>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="max-[820px]:hidden" aria-label={t.about}>
              <Info data-icon="inline-start" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t.appName}</DialogTitle>
              <DialogDescription>
                {t.aboutDescription}
              </DialogDescription>
            </DialogHeader>
            <AboutContent />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

function LanguageSelect({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const options: Array<{ label: string; value: Locale }> = [
    { value: 'en', label: 'English' },
    { value: 'zh-Hant-CN', label: '繁體中文（中國大陸）' },
  ]

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger
        aria-label={t.language}
        className={cn('h-8 w-8 justify-center px-0 [&>svg:last-child]:hidden', className)}
      >
        <Languages data-icon="inline-start" />
      </SelectTrigger>
      <SelectContent align="end" className="w-56" position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function AboutContent() {
  const { t } = useI18n()

  return (
    <div className="grid gap-4 text-sm">
      <section className="grid gap-2">
        <h2 className="font-medium">{t.project}</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={repositoryUrl} target="_blank" rel="noreferrer">
              <Github data-icon="inline-start" />
              sichengchen/world-of-scripts
            </a>
          </Button>
        </div>
      </section>
      <section className="grid gap-2">
        <h2 className="font-medium">{t.references}</h2>
        <div className="flex flex-wrap gap-2">
          {referenceLinks.map((link) => (
            <Button key={link.url} variant="outline" size="sm" asChild>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          ))}
        </div>
      </section>
      <Separator />
      <p className="text-sm leading-6 text-muted-foreground">
        {t.disclaimer}
      </p>
    </div>
  )
}

function CanvasControls({
  inspectorDocked,
  inspectorExpanded,
  onFit,
  onZoomIn,
  onZoomOut,
}: {
  inspectorDocked: boolean
  inspectorExpanded: boolean
  onFit: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}) {
  const { locale, t } = useI18n()

  return (
    <ButtonGroup
      className={cn(
        'absolute bottom-4 right-4 z-10 max-[820px]:right-3',
        inspectorExpanded && 'max-[820px]:hidden',
        inspectorDocked && 'max-[820px]:bottom-[calc(48dvh+0.75rem)]',
      )}
      aria-label={t.canvasControls}
    >
      <Button variant="outline" size="icon" aria-label={t.zoomOut} onClick={onZoomOut}>
        <Minus data-icon="inline-start" />
      </Button>
      <Button variant="outline" size="icon" aria-label={t.resetView} onClick={onFit}>
        <RotateCcw data-icon="inline-start" />
      </Button>
      <Button variant="outline" size="icon" aria-label={t.zoomIn} onClick={onZoomIn}>
        <Plus data-icon="inline-start" />
      </Button>
    </ButtonGroup>
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
  const { locale, t } = useI18n()
  const { script, dimmed, isRelated, isSelected, isTraced } = data
  const scriptName = localizedScriptName(script, locale)
  const color = getTypeColor(script.type)
  const scriptText = getScriptTextAttributes(script)
  const useVerticalNodeGlyphs = verticalNodeGlyphScriptIds.has(script.id)
  const useCompactNodeGlyphs = script.id === 'khitan-small-script'

  return (
    <article
      className={cn(
        'script-node',
        isSelected && 'is-selected',
        isRelated && 'is-related',
        isTraced && 'is-traced',
        dimmed && 'is-dimmed',
      )}
      data-script-id={script.id}
      style={{ '--node-accent': color, '--script-font': scriptText.fontFamily } as CSSProperties}
      tabIndex={0}
      aria-label={`${scriptName}, ${typeLabel(script.type, t)}, ${formatDate(script, t)}`}
    >
      <Handle className="node-handle" id="target" position={Position.Left} type="target" />
      <Handle className="node-handle" id="source" position={Position.Right} type="source" />
      <div className="node-title-row">
        <strong>{scriptName}</strong>
        <Badge variant="secondary">{typeLabel(script.type, t)}</Badge>
      </div>
      <div className="node-meta-row">
        <span>{formatDate(script, t)}</span>
        <DirectionIcon direction={script.direction} />
      </div>
      <div className="node-glyphs" dir={script.direction === 'rtl' ? 'rtl' : 'ltr'} lang={scriptText.lang}>
        {script.visualGlyphs ? (
          <SvgGlyphStrip glyphs={script.visualGlyphs.slice(0, 4)} />
        ) : useVerticalNodeGlyphs ? (
          <span className="node-vertical-glyphs">
            {script.sampleGlyphs.slice(0, 4).map((glyph) => (
              <span className="script-glyph node-vertical-sample is-vertical" key={glyph}>
                {glyph}
              </span>
            ))}
          </span>
        ) : useCompactNodeGlyphs ? (
          <span className="node-inline-glyphs">
            {script.sampleGlyphs.slice(0, 4).map((glyph) => (
              <span className="script-glyph node-inline-sample" key={glyph}>
                {glyph}
              </span>
            ))}
          </span>
        ) : (
          script.sampleGlyphs.slice(0, 6).join(' ')
        )}
      </div>
    </article>
  )
}

function TimelineTickNode({ data }: { data: TimelineTickData }) {
  const { t } = useI18n()

  return (
    <div className="pointer-events-none flex w-[104px] flex-col items-center gap-2 text-xs font-medium text-muted-foreground">
      <span>{timelineTickLabel(data.year, t)}</span>
      <span className="h-8 border-l" aria-hidden="true" />
    </div>
  )
}

function Inspector({
  expanded,
  onClose,
  onExpandedChange,
  onSelect,
  relatedScripts,
  script,
}: {
  expanded: boolean
  onClose: () => void
  onExpandedChange: (expanded: boolean) => void
  onSelect: (id: string) => void
  relatedScripts: { ancestors: ScriptNode[]; children: ScriptNode[] } | null
  script: ScriptNode | null
}) {
  const { locale, t } = useI18n()
  const dragStartY = useRef<number | null>(null)
  const dragHandled = useRef(false)

  if (!script || !relatedScripts) {
    return (
      <aside className="inspector empty-inspector" aria-label={t.scriptDetails}>
        <div className="p-4">
          <Badge variant="outline" className="mb-2">{t.noSelection}</Badge>
          <h2>{t.selectScript}</h2>
        </div>
        <p className="px-4 text-sm leading-6">{t.emptyInspectorCopy}</p>
      </aside>
    )
  }

  const inventoryMode = script.inventoryMode ?? (finiteInventoryTypes.includes(script.type) ? 'full' : 'representative')
  const isFiniteInventory = inventoryMode === 'full'
  const fallbackCharacterRows: NonNullable<ScriptNode['characterRows']> = script.sampleGlyphs.map((glyph) => ({
    glyph,
  }))
  const characterRows = (script.characterRows ?? fallbackCharacterRows).slice(
    0,
    isFiniteInventory ? undefined : representativeExampleLimit,
  )
  const scriptText = getScriptTextAttributes(script)
  const isVertical = isVerticalDirection(script.direction)
  const localizedScript = localizeScript(script, locale)
  const inspectorTitle = localizedScript.localizedCommonName ?? localizedScript.localizedName
  const shouldShowEnglishTitle = locale !== 'en'
  const englishTitle = englishScriptDisplayName(script)
  const shouldShowNativeName = Boolean(
    script.nativeName && !script.visualGlyphs && script.nativeName.trim() !== inspectorTitle.trim(),
  )
  const useVerticalInspectorGlyphs = verticalNodeGlyphScriptIds.has(script.id)
  const hasCroppedNativeNameVisual = script.nativeNameVisual?.some((glyph) => glyph.crop)
  const nativeNameVisualClassName = hasCroppedNativeNameVisual
    ? 'h-20 w-12 max-w-full'
    : script.nativeNameVisual?.length === 1
      ? 'h-24 w-40 max-w-full'
      : 'h-10 w-10'

  function handleSheetPointerDown(event: PointerEvent<HTMLButtonElement>) {
    dragStartY.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleSheetPointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (dragStartY.current === null) return

    const deltaY = event.clientY - dragStartY.current
    dragStartY.current = null
    dragHandled.current = Math.abs(deltaY) > 28

    if (deltaY < -28) {
      onExpandedChange(true)
      return
    }

    if (deltaY > 28) {
      onExpandedChange(false)
    }
  }

  function handleSheetClick() {
    if (dragHandled.current) {
      dragHandled.current = false
      return
    }

    onExpandedChange(!expanded)
  }

  return (
    <aside
      className={cn(
        'min-h-0 min-w-0 overflow-hidden border-l bg-card max-[820px]:absolute max-[820px]:inset-x-2 max-[820px]:bottom-0 max-[820px]:z-50 max-[820px]:flex max-[820px]:flex-col max-[820px]:rounded-t-xl max-[820px]:border-t max-[820px]:shadow-2xl max-[820px]:transition-[height,max-height] max-[820px]:duration-200 max-[820px]:ease-out',
        expanded
          ? 'max-[820px]:h-full max-[820px]:max-h-full'
          : 'max-[820px]:h-[48dvh] max-[820px]:max-h-[48dvh]',
      )}
      aria-label={`${inspectorTitle} ${t.scriptDetails}`}
      style={{ '--script-font': scriptText.fontFamily } as CSSProperties}
    >
      <button
        className="hidden h-8 shrink-0 touch-none items-center justify-center text-muted-foreground max-[820px]:flex"
        type="button"
        aria-label={expanded ? t.collapseDetailsSheet : t.expandDetailsSheet}
        aria-expanded={expanded}
        onClick={handleSheetClick}
        onPointerDown={handleSheetPointerDown}
        onPointerUp={handleSheetPointerUp}
      >
        <span className="h-1 w-10 rounded-full bg-muted-foreground/40" aria-hidden="true" />
      </button>
      <ScrollArea className="h-full min-h-0">
      <div className="flex flex-col gap-4 p-4 max-[820px]:pb-8 max-[820px]:pt-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3 max-[820px]:justify-start max-[820px]:gap-2">
            <h2 className="min-w-0 text-3xl font-semibold leading-none">{inspectorTitle}</h2>
            <Badge variant="outline" className="shrink-0">{statusLabel(script.status, t)}</Badge>
          </div>
          {shouldShowEnglishTitle && (
            <p className="mt-1 text-sm font-medium leading-none text-muted-foreground" lang="en">
              {englishTitle}
            </p>
          )}
          {script.nativeNameVisual ? (
            <SvgGlyphStrip
              className="mt-2"
              glyphClassName={nativeNameVisualClassName}
              glyphs={script.nativeNameVisual}
              orientation={isVertical ? 'vertical' : 'horizontal'}
            />
          ) : shouldShowNativeName ? (
            <p
              className={cn('script-native mt-2 text-lg text-muted-foreground', isVertical && 'is-vertical')}
              lang={scriptText.lang}
            >
              {script.nativeName}
            </p>
          ) : null}
        </div>
        <Button className="hidden max-[820px]:inline-flex" variant="outline" size="icon" aria-label={t.closeInspector} onClick={onClose}>
          <X data-icon="inline-start" />
        </Button>
      </div>

      <dl className="grid grid-cols-2 gap-2.5">
        <MetadataItem label={t.type} value={typeLabel(script.type, t)} />
        <MetadataItem label={t.region} value={script.region.map((region) => regionLabel(region, t)).join(', ')} />
        <MetadataItem label={t.era} value={formatDate(script, t)} />
        <div className="rounded-lg border bg-background p-2.5">
          <dt className="text-xs font-medium text-muted-foreground">{t.direction}</dt>
          <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
            <DirectionIcon direction={script.direction} />
            {directionLabel(script.direction, t)}
          </dd>
        </div>
      </dl>

      <Separator />

      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <BookOpen className="size-4 shrink-0" />
          <h2 className="text-sm font-semibold">{isFiniteInventory ? t.characters : t.representativeSigns}</h2>
        </div>
        {script.visualGlyphs ? (
          <div className="grid grid-cols-2 gap-2">
            {script.visualGlyphs.map((glyph) => (
              <div className="grid min-h-28 place-items-center gap-2 rounded-lg border bg-background px-3 py-3 text-center" key={glyph.label}>
                <SvgGlyph glyph={glyph} className="h-14 w-14" scriptId={script.id} />
                <small className="text-xs font-medium text-muted-foreground">{localizedCharacterLabel(glyph.label, locale, script.id)}</small>
              </div>
            ))}
          </div>
        ) : null}
        {!script.visualGlyphs && characterRows.length > 0 && (
          <div
            className="grid grid-cols-4 gap-2 max-[820px]:grid-cols-5"
            dir={script.direction === 'rtl' ? 'rtl' : 'ltr'}
            lang={scriptText.lang}
          >
            {characterRows.map((row, index) => {
              const characterLabel = [
                row.label ? localizedCharacterLabel(row.label, locale, script.id) : undefined,
                row.transliteration,
              ]
                .filter(Boolean)
                .join(' · ')

              return (
                <div
                  className="grid min-h-20 grid-rows-[2.75rem_minmax(1rem,auto)] content-center justify-items-center gap-1 rounded-lg border bg-background px-1.5 py-2 text-center"
                  key={`${row.glyph}-${index}`}
                >
                  <span className="flex h-11 items-center justify-center gap-1.5">
                    <span className={cn('script-glyph text-3xl leading-none', useVerticalInspectorGlyphs && 'is-vertical')}>
                      {row.glyph}
                    </span>
                    {row.alternateGlyph && (
                      <span className={cn('script-glyph text-2xl leading-none text-muted-foreground', useVerticalInspectorGlyphs && 'is-vertical')}>
                        {row.alternateGlyph}
                      </span>
                    )}
                  </span>
                  <small
                    className={cn(
                      'min-h-4 max-w-full text-xs font-medium leading-tight text-muted-foreground',
                      !characterLabel && 'invisible',
                    )}
                    aria-hidden={!characterLabel}
                  >
                    {characterLabel || ' '}
                  </small>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Separator />

      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <Info className="size-4 shrink-0" />
          <h2 className="text-sm font-semibold">{t.historicalNote}</h2>
        </div>
        <p className="text-sm leading-6">{annotateHistoricalTerms(localizedScript.localizedSummary, script, locale)}</p>
        {localizedScript.localizedNotes?.map((note) => (
          <p className="mt-2 border-l pl-3 text-sm leading-6 text-muted-foreground" key={note}>
            {annotateHistoricalTerms(note, script, locale)}
          </p>
        ))}
      </section>

      <Separator />

      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <GitBranch className="size-4 shrink-0" />
          <h2 className="text-sm font-semibold">{t.lineage}</h2>
        </div>
        <RelationGroup label={t.ancestors} scripts={relatedScripts.ancestors} onSelect={onSelect} />
        <RelationGroup label={t.children} scripts={relatedScripts.children} onSelect={onSelect} />
      </section>

      <Separator />

      <section>
        <h2 className="mb-2.5 text-sm font-semibold">{t.sources}</h2>
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

function SvgGlyphStrip({
  className,
  glyphClassName = 'h-7 w-7',
  glyphs,
  orientation = 'horizontal',
}: {
  className?: string
  glyphClassName?: string
  glyphs: NonNullable<ScriptNode['visualGlyphs']>
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <div
      className={cn(
        'flex gap-2',
        orientation === 'vertical' ? 'w-fit flex-col items-center' : 'items-center',
        className,
      )}
    >
      {glyphs.map((glyph) => (
        <SvgGlyph className={glyphClassName} glyph={glyph} key={glyph.label} />
      ))}
    </div>
  )
}

function SvgGlyph({
  className,
  glyph,
  scriptId,
}: {
  className?: string
  glyph: NonNullable<ScriptNode['visualGlyphs']>[number]
  scriptId?: string
}) {
  const { locale, t } = useI18n()
  const glyphLabel = localizedCharacterLabel(glyph.label, locale, scriptId)

  if (glyph.imageUrl) {
    if (glyph.crop === 'right-half') {
      return (
        <span className={cn(className, 'inline-block overflow-hidden')} role="img" aria-label={`${glyphLabel}; ${t.source}: ${glyph.sourceLabel}`}>
          <img
            alt=""
            aria-hidden="true"
            className="h-full w-[200%] max-w-none object-fill"
            src={glyph.imageUrl}
            style={{ transform: 'translateX(-50%)' }}
          />
        </span>
      )
    }

    return (
      <img
        alt={`${glyphLabel}; ${t.source}: ${glyph.sourceLabel}`}
        className={cn(className, 'object-contain')}
        src={glyph.imageUrl}
      />
    )
  }

  return (
    <svg
      aria-label={`${glyphLabel}; ${t.source}: ${glyph.sourceLabel}`}
      className={className}
      fill="none"
      role="img"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.5"
      viewBox={glyph.viewBox}
    >
      {glyph.paths?.map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  )
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-2.5">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}

function DirectionIcon({ direction }: { direction?: ScriptNode['direction'] }) {
  const { t } = useI18n()
  const label = directionLabel(direction, t)
  const Icon =
    direction === 'rtl'
      ? ArrowLeft
      : direction === 'ttb'
        ? ArrowDown
        : direction === 'btt'
          ? ArrowUp
          : direction === 'mixed'
            ? Waypoints
            : ArrowRight

  return (
    <span aria-label={label} className="inline-flex items-center text-muted-foreground" title={label}>
      <Icon className="size-4 shrink-0" />
    </span>
  )
}

function getScriptTextAttributes(script: ScriptNode) {
  return {
    fontFamily: scriptFontStacks[script.id] ?? fallbackScriptFont,
    lang: scriptLanguageTags[script.id],
  }
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
  const { locale, t } = useI18n()

  return (
    <div className="mt-2 grid gap-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {relationScripts.length ? (
        <div className="flex flex-wrap gap-2">
          {relationScripts.map((script) => (
            <Button key={script.id} variant="outline" size="sm" onClick={() => onSelect(script.id)}>
              {localizedScriptName(script, locale)}
            </Button>
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">{t.noDirectRelationship}</span>
      )}
    </div>
  )
}

function Legend({
  inspectorDocked,
  inspectorExpanded,
}: {
  inspectorDocked: boolean
  inspectorExpanded: boolean
}) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        'group absolute bottom-4 left-4 z-10 inline-flex items-center whitespace-nowrap rounded-lg border bg-card px-2 py-2 text-xs font-medium text-muted-foreground transition-all focus-within:px-3 hover:px-3 max-[820px]:left-3',
        inspectorExpanded && 'max-[820px]:hidden',
        inspectorDocked && 'max-[820px]:bottom-[calc(48dvh+0.75rem)]',
      )}
      aria-label={t.relationshipLegend}
      tabIndex={0}
    >
      <CircleHelp className="size-4 shrink-0" aria-hidden="true" />
      <div className="grid max-w-0 grid-cols-[max-content_max-content_max-content_max-content] items-center gap-0 overflow-hidden opacity-0 transition-all duration-200 group-focus-within:ml-3 group-focus-within:max-w-[680px] group-focus-within:gap-3 group-focus-within:opacity-100 group-hover:ml-3 group-hover:max-w-[680px] group-hover:gap-3 group-hover:opacity-100 max-[820px]:hidden max-[820px]:grid-cols-1 max-[820px]:items-start max-[820px]:group-focus-within:grid max-[820px]:group-hover:grid">
        <LegendItem label={t.legendLabels.descended} />
        <LegendItem dash="7 6" label={t.legendLabels.influenced} />
        <LegendItem dash="2 5" label={t.legendLabels.disputed} />
        <LegendItem strong label={t.legendLabels.selectedPath} />
      </div>
    </div>
  )
}

function LegendItem({
  dash,
  label,
  strong = false,
}: {
  dash?: string
  label: string
  strong?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <svg className="h-3.5 w-8 shrink-0" aria-hidden="true" viewBox="0 0 32 14">
        <line
          x1="2"
          x2="30"
          y1="7"
          y2="7"
          stroke="currentColor"
          strokeDasharray={dash}
          strokeLinecap="round"
          strokeWidth={strong ? 2 : 1.4}
        />
      </svg>
      <span className={strong ? 'text-foreground' : undefined}>{label}</span>
    </span>
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

function isVerticalDirection(direction?: ScriptNode['direction']) {
  return direction === 'ttb' || direction === 'btt'
}

export default App
