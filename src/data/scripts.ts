export type ScriptType =
  | 'alphabet'
  | 'abjad'
  | 'abugida'
  | 'syllabary'
  | 'featural'
  | 'logographic'
  | 'mixed'
  | 'undeciphered'

export type ScriptStatus = 'living' | 'historical' | 'revived' | 'constructed'

export type ScriptNode = {
  id: string
  name: string
  nativeName?: string
  type: ScriptType
  status: ScriptStatus
  region: string[]
  startYear?: number
  endYear?: number | 'present'
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt' | 'mixed'
  unicodeBlock?: string[]
  sampleGlyphs: string[]
  visualGlyphs?: Array<{
    label: string
    sourceLabel: string
    sourceUrl: string
    viewBox: string
    paths: string[]
  }>
  characterRows?: Array<{
    glyph: string
    label?: string
    transliteration?: string
  }>
  summary: string
  notes?: string[]
  sources: Array<{
    label: string
    url: string
  }>
}

export type ScriptEdge = {
  from: string
  to: string
  relationship:
    | 'descended'
    | 'adapted_from'
    | 'influenced_by'
    | 'disputed'
    | 'related_variant'
  confidence: 'high' | 'medium' | 'low'
  note?: string
  sources: string[]
}

export const scripts: ScriptNode[] = [
  {
    id: 'egyptian-hieroglyphs',
    name: 'Egyptian Hieroglyphs',
    type: 'mixed',
    status: 'historical',
    region: ['North Africa'],
    startYear: -3200,
    endYear: 400,
    direction: 'mixed',
    sampleGlyphs: ['𓀀', '𓃀', '𓇋', '𓊖'],
    characterRows: [
      { glyph: '𓃀', label: 'foot', transliteration: 'b' },
      { glyph: '𓇋', label: 'reed', transliteration: 'i' },
      { glyph: '𓈖', label: 'water', transliteration: 'n' },
      { glyph: '𓂋', label: 'mouth', transliteration: 'r' },
    ],
    summary:
      'A monumental and manuscript writing tradition that combined logographic, syllabic, and alphabetic signs. It is an important background source for early alphabetic experiments in the Sinai and Levant.',
    notes: ['Mixed systems should not be described as alphabets.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Egyptian_hieroglyphs' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U13000.pdf' },
    ],
  },
  {
    id: 'proto-sinaitic',
    name: 'Proto-Sinaitic',
    type: 'abjad',
    status: 'historical',
    region: ['Sinai', 'Levant'],
    startYear: -1850,
    endYear: -1500,
    direction: 'rtl',
    sampleGlyphs: ['𐤀', '𐤁', '𐤌', '𐤍'],
    summary:
      'An early consonantal writing system often associated with the emergence of alphabetic writing. Its exact relationship to later Canaanite and Phoenician forms is partly reconstructed and debated.',
    notes: ['Glyphs shown use later Northwest Semitic forms as readable representatives.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Proto-Sinaitic_script' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/protosinaitc.htm' },
    ],
  },
  {
    id: 'phoenician',
    name: 'Phoenician',
    type: 'abjad',
    status: 'historical',
    region: ['Levant', 'Mediterranean'],
    startYear: -1050,
    endYear: -150,
    direction: 'rtl',
    unicodeBlock: ['Phoenician'],
    sampleGlyphs: ['𐤀', '𐤁', '𐤂', '𐤃', '𐤄'],
    characterRows: [
      { glyph: '𐤀', label: 'aleph', transliteration: 'ʾ' },
      { glyph: '𐤁', label: 'beth', transliteration: 'b' },
      { glyph: '𐤂', label: 'gimel', transliteration: 'g' },
      { glyph: '𐤃', label: 'daleth', transliteration: 'd' },
      { glyph: '𐤄', label: 'he', transliteration: 'h' },
      { glyph: '𐤅', label: 'waw', transliteration: 'w' },
    ],
    summary:
      'A compact consonantal script that became one of the most influential ancestors of later Mediterranean and Near Eastern writing systems.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Phoenician_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10900.pdf' },
    ],
  },
  {
    id: 'greek',
    name: 'Greek',
    nativeName: 'Ελληνικό',
    type: 'alphabet',
    status: 'living',
    region: ['Mediterranean', 'Europe'],
    startYear: -800,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Greek and Coptic'],
    sampleGlyphs: ['Α', 'Β', 'Γ', 'Δ', 'Ω'],
    characterRows: [
      { glyph: 'Α', label: 'alpha', transliteration: 'a' },
      { glyph: 'Β', label: 'beta', transliteration: 'b' },
      { glyph: 'Γ', label: 'gamma', transliteration: 'g' },
      { glyph: 'Δ', label: 'delta', transliteration: 'd' },
      { glyph: 'Ε', label: 'epsilon', transliteration: 'e' },
      { glyph: 'Ω', label: 'omega', transliteration: 'o' },
    ],
    summary:
      'Adapted from Phoenician, Greek added systematic vowel letters and became a key ancestor of several European alphabets.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Greek_alphabet' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/greek.htm' },
    ],
  },
  {
    id: 'old-italic',
    name: 'Old Italic',
    type: 'alphabet',
    status: 'historical',
    region: ['Italy'],
    startYear: -700,
    endYear: -100,
    direction: 'mixed',
    unicodeBlock: ['Old Italic'],
    sampleGlyphs: ['𐌀', '𐌁', '𐌂', '𐌃'],
    summary:
      'A family of scripts used in ancient Italy, including Etruscan. It transmitted Greek-derived letterforms toward Latin and other Italic writing traditions.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Old_Italic_scripts' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10300.pdf' },
    ],
  },
  {
    id: 'latin',
    name: 'Latin',
    type: 'alphabet',
    status: 'living',
    region: ['Europe', 'Global'],
    startYear: -700,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Basic Latin', 'Latin Extended'],
    sampleGlyphs: ['A', 'B', 'C', 'D', 'E', 'F'],
    characterRows: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((glyph) => ({ glyph })),
    summary:
      'A Greek-derived alphabet transmitted through Old Italic and Roman use. It is now the most widely used alphabetic script family in the world.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Latin_alphabet' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/latin.htm' },
    ],
  },
  {
    id: 'coptic',
    name: 'Coptic',
    nativeName: 'Ⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ',
    type: 'alphabet',
    status: 'historical',
    region: ['Egypt'],
    startYear: 200,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Coptic'],
    sampleGlyphs: ['Ⲁ', 'Ⲃ', 'Ⲅ', 'Ⲇ'],
    summary:
      'An Egyptian Christian script based largely on Greek letters with additional signs from Demotic for Egyptian sounds.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Coptic_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U2C80.pdf' },
    ],
  },
  {
    id: 'gothic',
    name: 'Gothic',
    type: 'alphabet',
    status: 'historical',
    region: ['Europe'],
    startYear: 350,
    endYear: 900,
    direction: 'ltr',
    unicodeBlock: ['Gothic'],
    sampleGlyphs: ['𐌰', '𐌱', '𐌲', '𐌳'],
    summary:
      'A late antique alphabet created for the Gothic language, drawing primarily from Greek with influence from Latin and Runic forms.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Gothic_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10330.pdf' },
    ],
  },
  {
    id: 'cyrillic',
    name: 'Cyrillic',
    nativeName: 'Кириллица',
    type: 'alphabet',
    status: 'living',
    region: ['Eastern Europe', 'Central Asia'],
    startYear: 900,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Cyrillic'],
    sampleGlyphs: ['А', 'Б', 'В', 'Г', 'Д'],
    characterRows: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М'].map((glyph) => ({
      glyph,
    })),
    summary:
      'A Slavic alphabet developed in the orbit of Greek Christian literacy. It is used for Russian, Bulgarian, Serbian, Ukrainian, and many other languages.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Cyrillic_script' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/cyrillic.htm' },
    ],
  },
  {
    id: 'aramaic',
    name: 'Aramaic',
    type: 'abjad',
    status: 'historical',
    region: ['Near East'],
    startYear: -900,
    endYear: 700,
    direction: 'rtl',
    unicodeBlock: ['Imperial Aramaic'],
    sampleGlyphs: ['𐡀', '𐡁', '𐡂', '𐡃'],
    summary:
      'A major administrative and cultural script of the ancient Near East. Several later abjads and abugidas are linked to Aramaic branches.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Aramaic_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10840.pdf' },
    ],
  },
  {
    id: 'hebrew',
    name: 'Hebrew',
    nativeName: 'עברית',
    type: 'abjad',
    status: 'living',
    region: ['Levant'],
    startYear: -300,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Hebrew'],
    sampleGlyphs: ['א', 'ב', 'ג', 'ד', 'ה'],
    characterRows: [
      { glyph: 'א', label: 'aleph' },
      { glyph: 'ב', label: 'bet' },
      { glyph: 'ג', label: 'gimel' },
      { glyph: 'ד', label: 'dalet' },
      { glyph: 'ה', label: 'he' },
      { glyph: 'ו', label: 'vav' },
    ],
    summary:
      'A Northwest Semitic abjad used for Hebrew and Jewish languages. Its square script form is historically connected to Aramaic writing.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Hebrew_alphabet' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/hebrew.htm' },
    ],
  },
  {
    id: 'syriac',
    name: 'Syriac',
    nativeName: 'ܣܘܪܝܝܐ',
    type: 'abjad',
    status: 'living',
    region: ['Near East'],
    startYear: -100,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Syriac'],
    sampleGlyphs: ['ܐ', 'ܒ', 'ܓ', 'ܕ'],
    summary:
      'An Aramaic-derived script used for Syriac and several Christian communities of the Near East, with multiple calligraphic styles.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Syriac_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0700.pdf' },
    ],
  },
  {
    id: 'nabataean',
    name: 'Nabataean',
    type: 'abjad',
    status: 'historical',
    region: ['Arabia', 'Levant'],
    startYear: -200,
    endYear: 400,
    direction: 'rtl',
    unicodeBlock: ['Nabataean'],
    sampleGlyphs: ['𐢀', '𐢁', '𐢂', '𐢃'],
    summary:
      'An Aramaic-derived script used by the Nabataeans. Its cursive development is closely associated with the emergence of Arabic script.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Nabataean_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10880.pdf' },
    ],
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    type: 'abjad',
    status: 'living',
    region: ['Middle East', 'North Africa', 'Global'],
    startYear: 400,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Arabic'],
    sampleGlyphs: ['ا', 'ب', 'ت', 'ث', 'ج'],
    characterRows: [
      { glyph: 'ا', label: 'alif' },
      { glyph: 'ب', label: 'ba' },
      { glyph: 'ت', label: 'ta' },
      { glyph: 'ث', label: 'tha' },
      { glyph: 'ج', label: 'jim' },
      { glyph: 'ح', label: 'ha' },
    ],
    summary:
      'A cursive abjad used for Arabic and many other languages. It descends from Nabataean forms and spread widely with Islamic literary culture.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Arabic_alphabet' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/arabic.htm' },
    ],
  },
  {
    id: 'brahmi',
    name: 'Brahmi',
    type: 'abugida',
    status: 'historical',
    region: ['South Asia'],
    startYear: -300,
    endYear: 500,
    direction: 'ltr',
    unicodeBlock: ['Brahmi'],
    sampleGlyphs: ['𑀅', '𑀓', '𑀢', '𑀫'],
    summary:
      'An ancient South Asian abugida and ancestor of many Indic and Southeast Asian scripts. Its deeper origin is still debated.',
    notes: ['Relationship to Aramaic is often proposed but not treated here as certain descent.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Brahmi_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U11000.pdf' },
    ],
  },
  {
    id: 'devanagari',
    name: 'Devanagari',
    nativeName: 'देवनागरी',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1000,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Devanagari'],
    sampleGlyphs: ['अ', 'क', 'ग', 'म', 'ह'],
    characterRows: [
      { glyph: 'अ', label: 'a' },
      { glyph: 'आ', label: 'aa' },
      { glyph: 'क', label: 'ka' },
      { glyph: 'ग', label: 'ga' },
      { glyph: 'च', label: 'ca' },
      { glyph: 'म', label: 'ma' },
    ],
    summary:
      'A North Indian abugida used for Hindi, Marathi, Nepali, Sanskrit, and other languages. Its visible headline gives words a distinctive horizontal rhythm.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Devanagari' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/devanagari.htm' },
    ],
  },
  {
    id: 'bengali-assamese',
    name: 'Bengali-Assamese',
    nativeName: 'বাংলা',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1100,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Bengali'],
    sampleGlyphs: ['অ', 'ক', 'গ', 'ম'],
    summary:
      'An eastern Indic script used for Bengali, Assamese, and related languages, descended through Brahmic writing traditions.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bengali%E2%80%93Assamese_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0980.pdf' },
    ],
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1500,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Gujarati'],
    sampleGlyphs: ['અ', 'ક', 'ગ', 'મ'],
    summary:
      'A Brahmic abugida used for Gujarati and related languages, visually related to Devanagari but without the continuous headline.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Gujarati_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0A80.pdf' },
    ],
  },
  {
    id: 'gurmukhi',
    name: 'Gurmukhi',
    nativeName: 'ਗੁਰਮੁਖੀ',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1500,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Gurmukhi'],
    sampleGlyphs: ['ਅ', 'ਕ', 'ਗ', 'ਮ'],
    summary:
      'A Brahmic script standardized for Punjabi and Sikh scripture, with a compact letter rhythm and vowel signs typical of abugidas.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Gurmukhi' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0A00.pdf' },
    ],
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 600,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Tamil'],
    sampleGlyphs: ['அ', 'க', 'ச', 'ம'],
    summary:
      'A southern Brahmic script used for Tamil. Its modern form has relatively few base consonant signs compared with many related Indic scripts.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tamil_script' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/tamil.htm' },
    ],
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 450,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Kannada'],
    sampleGlyphs: ['ಅ', 'ಕ', 'ಗ', 'ಮ'],
    summary:
      'A southern Brahmic script used for Kannada and related languages, with rounded forms shaped by manuscript traditions.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Kannada_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0C80.pdf' },
    ],
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 600,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Telugu'],
    sampleGlyphs: ['అ', 'క', 'గ', 'మ'],
    summary:
      'A southern Brahmic script used for Telugu, notable for rounded letterforms and complex vowel signs.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Telugu_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0C00.pdf' },
    ],
  },
  {
    id: 'khmer',
    name: 'Khmer',
    nativeName: 'អក្សរខ្មែរ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 600,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Khmer'],
    sampleGlyphs: ['អ', 'ក', 'ខ', 'ម'],
    summary:
      'A Southeast Asian Brahmic abugida used for Khmer. It has a large inventory and historically influenced neighboring scripts.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Khmer_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1780.pdf' },
    ],
  },
  {
    id: 'thai',
    name: 'Thai',
    nativeName: 'ไทย',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 1283,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Thai'],
    sampleGlyphs: ['ก', 'ข', 'ค', 'ง'],
    characterRows: [
      { glyph: 'ก', label: 'ko kai' },
      { glyph: 'ข', label: 'kho khai' },
      { glyph: 'ค', label: 'kho khwai' },
      { glyph: 'ง', label: 'ngo ngu' },
      { glyph: 'จ', label: 'cho chan' },
      { glyph: 'ม', label: 'mo ma' },
    ],
    summary:
      'A Brahmic-derived script used for Thai. It combines consonant letters, vowel marks, tone marks, and spacing conventions distinct from Latin writing.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Thai_script' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/thai.htm' },
    ],
  },
  {
    id: 'tibetan',
    name: 'Tibetan',
    nativeName: 'བོད་ཡིག',
    type: 'abugida',
    status: 'living',
    region: ['Tibet', 'Himalayas'],
    startYear: 650,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Tibetan'],
    sampleGlyphs: ['ཀ', 'ཁ', 'ག', 'མ'],
    summary:
      'A Brahmic-derived script used for Tibetan and related languages, preserving many historical spelling conventions.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tibetan_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0F00.pdf' },
    ],
  },
  {
    id: 'geez',
    name: 'Geʽez / Ethiopic',
    nativeName: 'ግዕዝ',
    type: 'abugida',
    status: 'living',
    region: ['Horn of Africa'],
    startYear: -500,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Ethiopic'],
    sampleGlyphs: ['ሀ', 'ለ', 'መ', 'ሰ'],
    summary:
      'A South Semitic script that developed into a vocalized abugida. It is used for Amharic, Tigrinya, liturgical Geʽez, and related languages.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ge%CA%BDez_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1200.pdf' },
    ],
  },
  {
    id: 'armenian',
    name: 'Armenian',
    nativeName: 'Հայոց գրեր',
    type: 'alphabet',
    status: 'living',
    region: ['Caucasus'],
    startYear: 405,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Armenian'],
    sampleGlyphs: ['Ա', 'Բ', 'Գ', 'Դ'],
    summary:
      'A Christian-era alphabet created for Armenian. It reflects regional influences while remaining a distinct script family.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Armenian_alphabet' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/armenian.htm' },
    ],
  },
  {
    id: 'georgian',
    name: 'Georgian',
    nativeName: 'ქართული',
    type: 'alphabet',
    status: 'living',
    region: ['Caucasus'],
    startYear: 430,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Georgian'],
    sampleGlyphs: ['ა', 'ბ', 'გ', 'დ'],
    summary:
      'A distinctive Caucasian alphabet used for Georgian and related languages, with historical forms including Asomtavruli, Nuskhuri, and Mkhedruli.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Georgian_scripts' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10A0.pdf' },
    ],
  },
  {
    id: 'runic',
    name: 'Runic',
    type: 'alphabet',
    status: 'historical',
    region: ['Northern Europe'],
    startYear: 150,
    endYear: 1200,
    direction: 'mixed',
    unicodeBlock: ['Runic'],
    sampleGlyphs: ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ'],
    summary:
      'A family of Germanic alphabets with debated letterform influences from Italic, Latin, and other Mediterranean scripts.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Runes' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U16A0.pdf' },
    ],
  },
  {
    id: 'ogham',
    name: 'Ogham',
    type: 'alphabet',
    status: 'historical',
    region: ['Ireland', 'Britain'],
    startYear: 300,
    endYear: 700,
    direction: 'btt',
    unicodeBlock: ['Ogham'],
    sampleGlyphs: ['ᚁ', 'ᚂ', 'ᚃ', 'ᚄ'],
    summary:
      'An early medieval alphabet used mainly for Primitive Irish inscriptions. It is graphically unlike Latin but historically belongs near literate contact with Roman Britain.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ogham' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1680.pdf' },
    ],
  },
  {
    id: 'hangul',
    name: 'Hangul',
    nativeName: '한글',
    type: 'featural',
    status: 'living',
    region: ['Korea'],
    startYear: 1443,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['Hangul'],
    sampleGlyphs: ['ㄱ', 'ㄴ', 'ㄷ', 'ㅏ'],
    characterRows: [
      { glyph: 'ㄱ', label: 'g/k' },
      { glyph: 'ㄴ', label: 'n' },
      { glyph: 'ㄷ', label: 'd/t' },
      { glyph: 'ㅁ', label: 'm' },
      { glyph: 'ㅏ', label: 'a' },
      { glyph: 'ㅓ', label: 'eo' },
    ],
    summary:
      'A deliberately designed featural script for Korean, with letters grouped into syllable blocks. It is contextual rather than descended from the Phoenician alphabetic line.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Hangul' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/korean.htm' },
    ],
  },
  {
    id: 'oracle-bone',
    name: 'Oracle Bone Script',
    type: 'logographic',
    status: 'historical',
    region: ['East Asia'],
    startYear: -1250,
    endYear: -1050,
    direction: 'ttb',
    sampleGlyphs: ['日', '月', '山', '水'],
    visualGlyphs: [
      {
        label: 'sun / day',
        sourceLabel: 'Oracle bone script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Oracle_bone_script',
        viewBox: '0 0 64 64',
        paths: ['M20 10 L45 15 L42 52 L18 48 Z', 'M25 29 L39 31'],
      },
      {
        label: 'moon',
        sourceLabel: 'Oracle bone script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Oracle_bone_script',
        viewBox: '0 0 64 64',
        paths: ['M40 9 C24 15 18 30 24 46 C28 55 39 58 47 50 C36 49 29 40 30 29 C31 20 35 14 40 9 Z'],
      },
      {
        label: 'mountain',
        sourceLabel: 'Oracle bone script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Oracle_bone_script',
        viewBox: '0 0 64 64',
        paths: ['M13 48 L24 18 L33 47 L42 14 L53 48', 'M10 49 L56 49'],
      },
      {
        label: 'water',
        sourceLabel: 'Oracle bone script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Oracle_bone_script',
        viewBox: '0 0 64 64',
        paths: ['M33 8 C24 20 43 28 30 39 C24 44 25 52 35 57', 'M18 18 C22 25 22 34 15 42', 'M49 18 C44 27 44 35 52 44'],
      },
    ],
    summary:
      'The earliest widely attested stage of Chinese writing, ancestral to later Chinese characters. It belongs to a separate logographic lineage.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Oracle_bone_script' },
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
    ],
  },
  {
    id: 'chinese',
    name: 'Chinese Characters',
    nativeName: '漢字',
    type: 'logographic',
    status: 'living',
    region: ['East Asia'],
    startYear: -1200,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['CJK Unified Ideographs'],
    sampleGlyphs: ['漢', '字', '文', '書'],
    summary:
      'A logographic writing system used historically across East Asia and still used for Chinese and Japanese writing. It is not alphabetic.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Chinese_characters' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/' },
    ],
  },
  {
    id: 'cuneiform',
    name: 'Cuneiform',
    type: 'mixed',
    status: 'historical',
    region: ['Mesopotamia'],
    startYear: -3400,
    endYear: 100,
    direction: 'ltr',
    unicodeBlock: ['Cuneiform'],
    sampleGlyphs: ['𒀀', '𒁀', '𒂗', '𒆠'],
    summary:
      'A wedge-shaped writing technology used for Sumerian, Akkadian, and other languages. It is shown as a separate ancient writing lineage.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Cuneiform' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U12000.pdf' },
    ],
  },
  {
    id: 'maya',
    name: 'Maya Script',
    type: 'mixed',
    status: 'historical',
    region: ['Mesoamerica'],
    startYear: -300,
    endYear: 1700,
    direction: 'mixed',
    sampleGlyphs: ['AJ', 'KʼIN', 'BALAM'],
    visualGlyphs: [
      {
        label: 'ajaw-style sign',
        sourceLabel: 'Maya script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Maya_script',
        viewBox: '0 0 64 64',
        paths: ['M16 11 H48 Q55 11 55 18 V46 Q55 53 48 53 H16 Q9 53 9 46 V18 Q9 11 16 11 Z', 'M22 24 Q32 15 42 24', 'M23 38 Q32 45 41 38', 'M23 31 H41'],
      },
      {
        label: 'kʼin sun sign',
        sourceLabel: 'Maya script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Maya_script',
        viewBox: '0 0 64 64',
        paths: ['M32 14 L37 26 L50 26 L40 34 L44 48 L32 40 L20 48 L24 34 L14 26 L27 26 Z', 'M32 24 V40', 'M24 32 H40'],
      },
      {
        label: 'balam-style sign',
        sourceLabel: 'Maya script reference',
        sourceUrl: 'https://en.wikipedia.org/wiki/Maya_script',
        viewBox: '0 0 64 64',
        paths: ['M14 19 Q27 6 43 14 Q55 20 51 35 Q48 50 33 54 Q19 52 13 39 Q8 28 14 19 Z', 'M23 28 H42', 'M24 37 Q33 43 42 36', 'M22 20 L30 26 L38 19'],
      },
    ],
    summary:
      'A logosyllabic Mesoamerican writing system. It is included as a separate world writing tradition rather than an alphabetic descendant.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Maya_script' },
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
    ],
  },
  {
    id: 'cherokee',
    name: 'Cherokee',
    nativeName: 'ᏣᎳᎩ',
    type: 'syllabary',
    status: 'living',
    region: ['North America'],
    startYear: 1821,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Cherokee'],
    sampleGlyphs: ['Ꭰ', 'Ꭱ', 'Ꭲ', 'Ꭳ'],
    summary:
      'A syllabary created by Sequoyah for the Cherokee language. Some glyphs resemble Latin letters, but the system assigns syllabic values.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Cherokee_syllabary' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U13A0.pdf' },
    ],
  },
  {
    id: 'canadian-aboriginal',
    name: 'Canadian Syllabics',
    nativeName: 'ᐊᐃᐅᐁ',
    type: 'abugida',
    status: 'living',
    region: ['North America'],
    startYear: 1840,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Unified Canadian Aboriginal Syllabics'],
    sampleGlyphs: ['ᐊ', 'ᐃ', 'ᐅ', 'ᐁ'],
    summary:
      'A family of scripts used for Cree, Inuktitut, and other Indigenous languages in Canada. It is a modern constructed system influenced by shorthand and missionary literacy.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Canadian_Aboriginal_syllabics' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1400.pdf' },
    ],
  },
]

export const edges: ScriptEdge[] = [
  { from: 'egyptian-hieroglyphs', to: 'proto-sinaitic', relationship: 'influenced_by', confidence: 'medium', note: 'Early alphabetic signs are often interpreted as adapting Egyptian sign models.', sources: ['https://en.wikipedia.org/wiki/Proto-Sinaitic_script'] },
  { from: 'proto-sinaitic', to: 'phoenician', relationship: 'descended', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Phoenician_alphabet'] },
  { from: 'phoenician', to: 'greek', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Greek_alphabet'] },
  { from: 'greek', to: 'old-italic', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Old_Italic_scripts'] },
  { from: 'old-italic', to: 'latin', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Latin_alphabet'] },
  { from: 'greek', to: 'coptic', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Coptic_alphabet'] },
  { from: 'greek', to: 'gothic', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Gothic_alphabet'] },
  { from: 'greek', to: 'cyrillic', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Cyrillic_script'] },
  { from: 'phoenician', to: 'aramaic', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Aramaic_alphabet'] },
  { from: 'aramaic', to: 'hebrew', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Hebrew_alphabet'] },
  { from: 'aramaic', to: 'syriac', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Syriac_alphabet'] },
  { from: 'aramaic', to: 'nabataean', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Nabataean_script'] },
  { from: 'nabataean', to: 'arabic', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Arabic_alphabet'] },
  { from: 'brahmi', to: 'devanagari', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Devanagari'] },
  { from: 'brahmi', to: 'bengali-assamese', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Bengali%E2%80%93Assamese_script'] },
  { from: 'brahmi', to: 'gujarati', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Gujarati_script'] },
  { from: 'brahmi', to: 'gurmukhi', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Gurmukhi'] },
  { from: 'brahmi', to: 'tamil', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Tamil_script'] },
  { from: 'brahmi', to: 'kannada', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Kannada_script'] },
  { from: 'brahmi', to: 'telugu', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Telugu_script'] },
  { from: 'brahmi', to: 'khmer', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Khmer_script'] },
  { from: 'khmer', to: 'thai', relationship: 'adapted_from', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Thai_script'] },
  { from: 'brahmi', to: 'tibetan', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Tibetan_script'] },
  { from: 'greek', to: 'armenian', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Armenian_alphabet'] },
  { from: 'old-italic', to: 'runic', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Runes'] },
  { from: 'latin', to: 'ogham', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Ogham'] },
  { from: 'oracle-bone', to: 'chinese', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Chinese_characters'] },
]

export const guidedTraces = [
  {
    id: 'latin-path',
    label: 'Hieroglyphs to Latin',
    nodeIds: ['egyptian-hieroglyphs', 'proto-sinaitic', 'phoenician', 'greek', 'old-italic', 'latin'],
  },
  {
    id: 'arabic-path',
    label: 'Phoenician to Arabic',
    nodeIds: ['phoenician', 'aramaic', 'nabataean', 'arabic'],
  },
  {
    id: 'brahmi-path',
    label: 'Brahmi and South Asia',
    nodeIds: ['brahmi', 'devanagari', 'tamil', 'kannada', 'telugu', 'tibetan'],
  },
] as const

export const scriptTypes: ScriptType[] = [
  'alphabet',
  'abjad',
  'abugida',
  'syllabary',
  'featural',
  'logographic',
  'mixed',
  'undeciphered',
]

export const regions = Array.from(new Set(scripts.flatMap((script) => script.region))).sort()
