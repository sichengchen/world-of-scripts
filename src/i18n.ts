import type { ScriptNode, ScriptStatus, ScriptType } from './data/scripts'
import type { ViewMode } from './graph'

export type Locale = 'en' | 'zh-Hant-CN'

type Direction = NonNullable<ScriptNode['direction']>

export type AppText = {
  appName: string
  appSummary: string
  relationshipExplorer: string
  flowLabel: string
  navigationTools: string
  scriptTools: string
  viewMode: string
  searchScripts: string
  closeSearch: string
  searchResults: string
  guidedTrace: string
  noGuidedTrace: string
  filters: string
  language: string
  feedback: string
  about: string
  aboutDescription: string
  project: string
  references: string
  disclaimer: string
  canvasControls: string
  zoomOut: string
  resetView: string
  zoomIn: string
  scriptDetails: string
  noSelection: string
  selectScript: string
  emptyInspectorCopy: string
  closeInspector: string
  collapseDetailsSheet: string
  expandDetailsSheet: string
  type: string
  region: string
  status: string
  era: string
  direction: string
  characters: string
  representativeSigns: string
  historicalNote: string
  lineage: string
  ancestors: string
  children: string
  sources: string
  source: string
  noDirectRelationship: string
  relationshipLegend: string
  allTypes: string
  allRegions: string
  allStatuses: string
  circa: string
  bce: string
  ce: string
  present: string
  unknown: string
  today: string
  dateStyle: 'western' | 'zh-Hant-CN'
  viewModes: Record<ViewMode, string>
  typeLabels: Record<ScriptType, string>
  statusLabels: Record<ScriptStatus, string>
  directionLabels: Record<Direction | 'varies', string>
  legendLabels: {
    descended: string
    influenced: string
    disputed: string
    selectedPath: string
  }
  regionLabels: Record<string, string>
}

const englishText: AppText = {
  appName: 'Writing Systems: Ancient to Modern',
  appSummary: 'Explore the histories and lineages of writing systems across the world.',
  relationshipExplorer: 'Alphabet relationship explorer',
  flowLabel: 'World alphabets family tree',
  navigationTools: 'Navigation tools',
  scriptTools: 'Script tools',
  viewMode: 'View mode',
  searchScripts: 'Search scripts',
  closeSearch: 'Close search',
  searchResults: 'Search results',
  guidedTrace: 'Guided trace',
  noGuidedTrace: 'No guided trace',
  filters: 'Filters',
  language: 'Language',
  feedback: 'Feedback',
  about: 'About Writing Systems: Ancient to Modern',
  aboutDescription: 'An interactive map of writing systems, their sourced relationships, dates, examples, and reading directions.',
  project: 'Project',
  references: 'References',
  disclaimer:
    'This project is for reference only and is not a professional source. It may contain mistakes. If you find an error or have suggestions for additional content, use the Feedback button in the header.',
  canvasControls: 'Canvas controls',
  zoomOut: 'Zoom out',
  resetView: 'Reset view',
  zoomIn: 'Zoom in',
  scriptDetails: 'Script details',
  noSelection: 'No selection',
  selectScript: 'Select a script',
  emptyInspectorCopy: 'Click a node in the diagram to inspect its characters, lineage, and sources.',
  closeInspector: 'Close inspector',
  collapseDetailsSheet: 'Collapse details sheet',
  expandDetailsSheet: 'Expand details sheet',
  type: 'Type',
  region: 'Region',
  status: 'Status',
  era: 'Era',
  direction: 'Direction',
  characters: 'Characters',
  representativeSigns: 'Representative signs',
  historicalNote: 'Historical note',
  lineage: 'Lineage',
  ancestors: 'Ancestors',
  children: 'Children',
  sources: 'Sources',
  source: 'source',
  noDirectRelationship: 'No direct relationship shown',
  relationshipLegend: 'Relationship legend',
  allTypes: 'All types',
  allRegions: 'All regions',
  allStatuses: 'All statuses',
  circa: 'c.',
  bce: 'BCE',
  ce: 'CE',
  present: 'present',
  unknown: 'unknown',
  today: 'Today',
  dateStyle: 'western',
  viewModes: {
    lineage: 'Lineage',
    timeline: 'Timeline',
    az: 'A-Z',
  },
  typeLabels: {
    alphabet: 'Alphabet',
    abjad: 'Abjad',
    abugida: 'Abugida',
    syllabary: 'Syllabary',
    semisyllabary: 'Semisyllabary',
    featural: 'Featural',
    logographic: 'Logographic',
    mixed: 'Mixed',
    undeciphered: 'Undeciphered',
  },
  statusLabels: {
    living: 'Living',
    historical: 'Historical',
    revived: 'Revived',
    constructed: 'Constructed',
  },
  directionLabels: {
    ltr: 'left-to-right',
    rtl: 'right-to-left',
    ttb: 'top-to-bottom',
    btt: 'bottom-to-top',
    mixed: 'mixed',
    varies: 'varies',
  },
  legendLabels: {
    descended: 'descended/adapted',
    influenced: 'influenced',
    disputed: 'disputed',
    selectedPath: 'selected path',
  },
  regionLabels: {},
}

const traditionalChineseText: AppText = {
  appName: '古今文字概覽',
  appSummary: '探索世界各地文字體系的歷史與譜系。',
  relationshipExplorer: '字母關係探索器',
  flowLabel: '世界字母譜系圖',
  navigationTools: '導航工具',
  scriptTools: '文字工具',
  viewMode: '視圖模式',
  searchScripts: '搜索文字體系',
  closeSearch: '關閉搜索',
  searchResults: '搜索結果',
  guidedTrace: '導航路徑',
  noGuidedTrace: '不使用導航路徑',
  filters: '篩選',
  language: '語言',
  feedback: '意見反饋',
  about: '關於古今文字概覽',
  aboutDescription: '以互動圖表形式呈現古今文字體系及其關係、年代、示例與書寫方向。',
  project: '項目',
  references: '參考資料',
  disclaimer:
    '本項目僅供參考，並非專業資料來源。受編者能力所限，內容可能有誤。若有錯誤，懇請讀者或同好通過頁首的意見反饋按鈕給予糾正或建議。',
  canvasControls: '畫布控制',
  zoomOut: '縮小',
  resetView: '重置視圖',
  zoomIn: '放大',
  scriptDetails: '文字體系詳細信息',
  noSelection: '尚未選取',
  selectScript: '選擇一種文字體系',
  emptyInspectorCopy: '點擊圖中的節點，即可查看字符、譜系與來源。',
  closeInspector: '關閉查看面板',
  collapseDetailsSheet: '折疊詳細信息面板',
  expandDetailsSheet: '展開詳細信息面板',
  type: '類型',
  region: '地區',
  status: '狀態',
  era: '年代',
  direction: '方向',
  characters: '字符',
  representativeSigns: '代表性符號',
  historicalNote: '歷史說明',
  lineage: '譜系',
  ancestors: '祖先',
  children: '子系',
  sources: '來源',
  source: '來源',
  noDirectRelationship: '未顯示直接關係',
  relationshipLegend: '關係圖例',
  allTypes: '所有類型',
  allRegions: '所有地區',
  allStatuses: '所有狀態',
  circa: '約',
  bce: '公元前',
  ce: '公元',
  present: '今',
  unknown: '未知',
  today: '今日',
  dateStyle: 'zh-Hant-CN',
  viewModes: {
    lineage: '譜系',
    timeline: '時間軸',
    az: 'A-Z',
  },
  typeLabels: {
    alphabet: '字母',
    abjad: '輔音音素',
    abugida: '元音附標',
    syllabary: '音節',
    semisyllabary: '半音節',
    featural: '特徵',
    logographic: '表語',
    mixed: '混合',
    undeciphered: '未破譯',
  },
  statusLabels: {
    living: '現用',
    historical: '歷史',
    revived: '復興',
    constructed: '人造',
  },
  directionLabels: {
    ltr: '由左至右',
    rtl: '由右至左',
    ttb: '由上至下',
    btt: '由下至上',
    mixed: '混合',
    varies: '不定',
  },
  legendLabels: {
    descended: '承襲／改編',
    influenced: '受影響',
    disputed: '有爭議',
    selectedPath: '已選路徑',
  },
  regionLabels: {
    Arabia: '阿拉伯半島',
    Britain: '不列顛',
    Caucasus: '高加索',
    'Central Asia': '中亞',
    'East Asia': '東亞',
    'Eastern Europe': '東歐',
    Egypt: '埃及',
    Europe: '歐洲',
    Global: '全球',
    Himalayas: '喜馬拉雅',
    'Horn of Africa': '非洲之角',
    Ireland: '愛爾蘭',
    Italy: '義大利',
    Korea: '韓國',
    Levant: '黎凡特',
    Mediterranean: '地中海',
    Mesoamerica: '中部美洲',
    Mesopotamia: '美索不達米亞',
    'Middle East': '中東',
    'Near East': '近東',
    'North Africa': '北非',
    'North America': '北美',
    'Northern Europe': '北歐',
    Oceania: '大洋洲',
    Sinai: '西奈',
    'South Asia': '南亞',
    'Southeast Asia': '東南亞',
    Tibet: '西藏',
    'West Africa': '西非',
  },
}

export const translations: Record<Locale, AppText> = {
  en: englishText,
  'zh-Hant-CN': traditionalChineseText,
}

export function viewModeLabel(mode: ViewMode, text: AppText) {
  return text.viewModes[mode]
}

export function typeLabel(type: ScriptType, text: AppText) {
  return text.typeLabels[type]
}

export function statusLabel(status: ScriptStatus, text: AppText) {
  return text.statusLabels[status]
}

export function regionLabel(region: string, text: AppText) {
  return text.regionLabels[region] ?? region
}

export function directionLabel(direction: ScriptNode['direction'], text: AppText) {
  return text.directionLabels[direction ?? 'varies']
}

export function timelineTickLabel(year: number, text: AppText) {
  if (year === new Date().getFullYear()) return text.today
  if (year === 0) return '0'
  if (text.dateStyle === 'zh-Hant-CN') return year < 0 ? `前 ${Math.abs(year)}` : String(year)
  return formatYear(year, text)
}

export function formatDate(script: ScriptNode, text: AppText) {
  if (text.dateStyle === 'zh-Hant-CN') return formatChineseDate(script, text)

  const start = script.startYear ? formatYear(script.startYear, text) : text.unknown
  const end = script.endYear === 'present' ? text.present : script.endYear ? formatYear(script.endYear, text) : ''
  return end ? `${text.circa} ${start}-${end}` : `${text.circa} ${start}`
}

function formatYear(year: number, text: AppText) {
  return year < 0 ? `${Math.abs(year)} ${text.bce}` : `${year} ${text.ce}`
}

function formatChineseDate(script: ScriptNode, text: AppText) {
  const start = script.startYear
  const end = script.endYear

  if (!start) return text.unknown
  if (!end) return formatChineseSingleYear(start)
  if (end === 'present') return start < 0 ? `約前 ${Math.abs(start)} - ${text.present}` : `${start} - ${text.present}`
  if (start < 0 && end < 0) return `約前 ${Math.abs(start)} - ${Math.abs(end)}`
  if (start < 0) return `約前 ${Math.abs(start)} - 公元 ${end}`
  return `約 ${start} - ${end}`
}

function formatChineseSingleYear(year: number) {
  return year < 0 ? `約前 ${Math.abs(year)}` : `約 ${year}`
}
