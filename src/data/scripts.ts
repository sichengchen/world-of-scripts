export type ScriptType =
  | 'alphabet'
  | 'abjad'
  | 'abugida'
  | 'syllabary'
  | 'semisyllabary'
  | 'featural'
  | 'logographic'
  | 'mixed'
  | 'undeciphered'

export type ScriptStatus = 'living' | 'historical' | 'revived' | 'constructed'

export type VisualGlyph = {
  label: string
  sourceLabel: string
  sourceUrl: string
  imageUrl?: string
  crop?: 'right-half'
  viewBox?: string
  paths?: string[]
}

export type ScriptNode = {
  id: string
  name: string
  commonName?: string
  // Display label in the script or community language; not always a formal script autonym.
  nativeName?: string
  nativeNameVisual?: VisualGlyph[]
  type: ScriptType
  status: ScriptStatus
  region: string[]
  startYear?: number
  endYear?: number | 'present'
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt' | 'mixed'
  unicodeBlock?: string[]
  inventoryMode?: 'full' | 'representative'
  // For scripts without practical Unicode glyphs, these may be modern descendants or labels.
  sampleGlyphs: string[]
  visualGlyphs?: VisualGlyph[]
  characterRows?: Array<{
    glyph: string
    alternateGlyph?: string
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

function characterRows(glyphs: string, labels?: string, alternateGlyphs?: string): NonNullable<ScriptNode['characterRows']> {
  const labelList = labels?.split('|')
  const alternateGlyphList = alternateGlyphs?.split(' ')

  return glyphs.split(' ').map((glyph, index) => ({
    glyph,
    alternateGlyph: alternateGlyphList?.[index],
    label: labelList?.[index],
  }))
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
    characterRows: characterRows(
      '𓀀 𓁐 𓃀 𓇋 𓈖 𓂋 𓉐 𓊖 𓆑 𓅱 𓃭 𓇳 𓏏 𓂝 𓄿 𓈎',
      'man|woman|foot|reed|water|mouth|house|town|viper|quail|lion|sun|loaf|arm|vulture|slope',
    ),
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
    characterRows: characterRows(
      '𐤀 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇 𐤈 𐤉 𐤊 𐤋 𐤌 𐤍 𐤎 𐤏 𐤐 𐤑 𐤒 𐤓 𐤔 𐤕',
      'aleph|beth|gimel|daleth|he|waw|zayin|heth|teth|yodh|kaph|lamedh|mem|nun|samekh|ayin|pe|tsade|qoph|resh|shin|taw',
    ),
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
    characterRows: characterRows(
      '𐤀 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇 𐤈 𐤉 𐤊 𐤋 𐤌 𐤍 𐤎 𐤏 𐤐 𐤑 𐤒 𐤓 𐤔 𐤕',
      'aleph|beth|gimel|daleth|he|waw|zayin|heth|teth|yodh|kaph|lamedh|mem|nun|samekh|ayin|pe|tsade|qoph|resh|shin|taw',
    ),
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
    characterRows: characterRows(
      'Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω',
      'alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega',
      'α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω',
    ),
    summary:
      'Adapted from Phoenician, Greek added systematic vowel letters and became a key ancestor of several European alphabets.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Greek_alphabet' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/greek.htm' },
    ],
  },
  {
    id: 'paleo-hebrew',
    name: 'Paleo-Hebrew',
    type: 'abjad',
    status: 'historical',
    region: ['Levant'],
    startYear: -1000,
    endYear: -135,
    direction: 'rtl',
    unicodeBlock: ['Phoenician'],
    sampleGlyphs: ['𐤀', '𐤁', '𐤌', '𐤔'],
    characterRows: characterRows(
      '𐤀 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇 𐤈 𐤉 𐤊 𐤋 𐤌 𐤍 𐤎 𐤏 𐤐 𐤑 𐤒 𐤓 𐤔 𐤕',
      'aleph|beth|gimel|daleth|he|waw|zayin|heth|teth|yodh|kaph|lamedh|mem|nun|samekh|ayin|pe|tsade|qoph|resh|shin|taw',
    ),
    summary:
      'An ancient Hebrew-script branch used in the southern Levant before square Hebrew became dominant. Samaritan writing preserves a related continuation of this branch.',
    notes: ['Glyphs shown use encoded Phoenician forms as readable representatives for closely related Paleo-Hebrew letterforms.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Paleo-Hebrew_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10900.pdf' },
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
    characterRows: '𐌀 𐌁 𐌂 𐌃 𐌄 𐌅 𐌆 𐌇 𐌈 𐌉 𐌊 𐌋 𐌌 𐌍 𐌎 𐌏 𐌐 𐌑 𐌒 𐌓 𐌔 𐌕 𐌖 𐌗 𐌘 𐌙 𐌚'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: characterRows(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').join(' '),
      undefined,
      'abcdefghijklmnopqrstuvwxyz'.split('').join(' '),
    ),
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
    characterRows: characterRows(
      'Ⲁ Ⲃ Ⲅ Ⲇ Ⲉ Ⲋ Ⲍ Ⲏ Ⲑ Ⲓ Ⲕ Ⲗ Ⲙ Ⲛ Ⲝ Ⲟ Ⲡ Ⲣ Ⲥ Ⲧ Ⲩ Ⲫ Ⲭ Ⲯ Ⲱ Ϣ Ϥ Ϧ Ϩ Ϫ Ϭ Ϯ',
      'alpha|vida|gamma|dalda|ei|so|zata|eta|theta|iota|kappa|laula|mi|ni|ksi|o|pi|ro|sima|tau|ua|fi|khi|psi|oou|shai|fai|khai|hori|djanja|shima|ti',
      'ⲁ ⲃ ⲅ ⲇ ⲉ ⲋ ⲍ ⲏ ⲑ ⲓ ⲕ ⲗ ⲙ ⲛ ⲝ ⲟ ⲡ ⲣ ⲥ ⲧ ⲩ ⲫ ⲭ ⲯ ⲱ ϣ ϥ ϧ ϩ ϫ ϭ ϯ',
    ),
    summary:
      'An Egyptian Christian script based largely on Greek letters with additional signs from Demotic for Egyptian sounds. It remains in liturgical use today.',
    notes: ['Historical here means no longer a broad vernacular script, not extinct from use.'],
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
    characterRows: '𐌰 𐌱 𐌲 𐌳 𐌴 𐌵 𐌶 𐌷 𐌸 𐌹 𐌺 𐌻 𐌼 𐌽 𐌾 𐌿 𐍀 𐍁 𐍂 𐍃 𐍄 𐍅 𐍆 𐍇 𐍈 𐍉 𐍊'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: characterRows(
      'А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я',
      'a|be|ve|ge|de|ye|yo|zhe|ze|i|short i|ka|el|em|en|o|pe|er|es|te|u|ef|ha|tse|che|sha|shcha|hard sign|yery|soft sign|e|yu|ya',
      'а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я',
    ),
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
    characterRows: characterRows(
      '𐡀 𐡁 𐡂 𐡃 𐡄 𐡅 𐡆 𐡇 𐡈 𐡉 𐡊 𐡋 𐡌 𐡍 𐡎 𐡏 𐡐 𐡑 𐡒 𐡓 𐡔 𐡕',
      'alaph|beth|gamal|dalath|he|waw|zain|heth|teth|yodh|kaph|lamadh|mem|nun|semkath|ayin|pe|sadhe|qoph|resh|shin|taw',
    ),
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
    characterRows: characterRows(
      'א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת',
      'aleph|bet|gimel|dalet|he|vav|zayin|het|tet|yod|kaf|lamed|mem|nun|samekh|ayin|pe|tsadi|qof|resh|shin|tav',
    ),
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
    characterRows: characterRows(
      'ܐ ܒ ܓ ܕ ܗ ܘ ܙ ܚ ܛ ܝ ܟ ܠ ܡ ܢ ܣ ܥ ܦ ܨ ܩ ܪ ܫ ܬ',
      'alaph|beth|gamal|dalath|he|waw|zain|heth|teth|yodh|kaph|lamadh|mim|nun|semkath|e|pe|sadhe|qoph|rish|shin|taw',
    ),
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
    characterRows: characterRows(
      '𐢀 𐢁 𐢂 𐢃 𐢄 𐢅 𐢆 𐢇 𐢈 𐢉 𐢊 𐢋 𐢌 𐢍 𐢎 𐢏 𐢐 𐢑 𐢒 𐢓 𐢔 𐢕',
      'alaph|beth|gamal|dalath|he|waw|zain|heth|teth|yodh|kaph|lamadh|mem|nun|semkath|ayin|pe|sadhe|qoph|resh|shin|taw',
    ),
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
    characterRows: characterRows(
      'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي',
      'alif|ba|ta|tha|jim|ha|kha|dal|dhal|ra|zay|sin|shin|sad|dad|ta emphatic|za emphatic|ayn|ghayn|fa|qaf|kaf|lam|mim|nun|ha|waw|ya',
    ),
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
    characterRows: '𑀅 𑀆 𑀇 𑀈 𑀉 𑀊 𑀋 𑀌 𑀍 𑀎 𑀏 𑀐 𑀑 𑀒 𑀓 𑀔 𑀕 𑀖 𑀗 𑀘 𑀙 𑀚 𑀛 𑀜 𑀝 𑀞 𑀟 𑀠 𑀡 𑀢 𑀣 𑀤 𑀥 𑀦 𑀧 𑀨 𑀩 𑀪 𑀫 𑀬 𑀭 𑀮 𑀯 𑀰 𑀱 𑀲 𑀳'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह'
      .split(' ')
      .map((glyph) => ({ glyph })),
    summary:
      'A North Indian abugida used for Hindi, Marathi, Nepali, Sanskrit, and other languages. Its visible headline gives words a distinctive horizontal rhythm.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Devanagari' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/devanagari.htm' },
    ],
  },
  {
    id: 'kharoshthi',
    name: 'Kharoshthi',
    type: 'abugida',
    status: 'historical',
    region: ['South Asia', 'Central Asia'],
    startYear: -300,
    endYear: 300,
    direction: 'rtl',
    unicodeBlock: ['Kharoshthi'],
    sampleGlyphs: ['𐨀', '𐨐', '𐨨', '𐨪'],
    characterRows:
      '𐨀 𐨐 𐨑 𐨒 𐨓 𐨕 𐨖 𐨗 𐨙 𐨚 𐨛 𐨜 𐨝 𐨞 𐨟 𐨠 𐨡 𐨢 𐨣 𐨤 𐨥 𐨦 𐨧 𐨨 𐨩 𐨪 𐨫 𐨬 𐨭 𐨮 𐨯'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'An ancient right-to-left Indic abugida used in Gandhara and along Central Asian trade routes. It is historically tied to Aramaic influence and sits beside Brahmi in early South Asian writing history rather than descending from Brahmi.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Kharosthi' },
      { label: 'Unicode Core Spec: South and Central Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10A00.pdf' },
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
    characterRows: 'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ড় ঢ় য় ৰ ৱ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'અ આ ઇ ઈ ઉ ઊ ઋ એ ઐ ઓ ઔ ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ શ ષ સ હ ળ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'ੳ ਅ ੲ ਸ ਹ ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ੜ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ ஃ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ஜ ஷ ஸ ஹ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಎ ಏ ಐ ಒ ಓ ಔ ಅಂ ಅಃ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఎ ఏ ఐ ఒ ఓ ఔ అం అః క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'ក ខ គ ឃ ង ច ឆ ជ ឈ ញ ដ ឋ ឌ ឍ ណ ត ថ ទ ធ ន ប ផ ព ភ ម យ រ ល វ ស ហ ឡ អ ឥ ឦ ឧ ឩ ឪ ឫ ឬ ឭ ឮ ឯ ឰ ឱ ឲ ឳ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'ก ข ฃ ค ฅ ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ฤ ล ฦ ว ศ ษ ส ห ฬ อ ฮ'
      .split(' ')
      .map((glyph) => ({ glyph })),
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
    characterRows: 'ཀ ཁ ག ང ཅ ཆ ཇ ཉ ཏ ཐ ད ན པ ཕ བ མ ཙ ཚ ཛ ཝ ཞ ཟ འ ཡ ར ལ ཤ ས ཧ ཨ'
      .split(' ')
      .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic-derived script used for Tibetan and related languages, preserving many historical spelling conventions.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tibetan_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0F00.pdf' },
    ],
  },
  {
    id: 'old-south-arabian',
    name: 'Old South Arabian',
    type: 'abjad',
    status: 'historical',
    region: ['Arabia', 'Horn of Africa'],
    startYear: -900,
    endYear: 600,
    direction: 'rtl',
    unicodeBlock: ['Old South Arabian'],
    sampleGlyphs: ['𐩠', '𐩡', '𐩢', '𐩣'],
    characterRows: characterRows(
      '𐩠 𐩡 𐩢 𐩣 𐩤 𐩥 𐩦 𐩧 𐩨 𐩩 𐩪 𐩫 𐩬 𐩭 𐩮 𐩯 𐩰 𐩱 𐩲 𐩳 𐩴 𐩵 𐩶 𐩷 𐩸 𐩹 𐩺 𐩻 𐩼',
      'he|lamedh|heth|mem|qoph|waw|shin|resh|beth|taw|sat|kaph|nun|kheth|sadhe|samekh|fe|aleph|ayn|dadhe|gimel|daleth|ghayn|tet|zayn|dhaleth|yodh|thaw|theth',
    ),
    summary:
      'A family of ancient South Arabian abjads used in inscriptions in southern Arabia and nearby regions. It provides the clearest lineage context for Ethiopic/Geʽez writing.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ancient_South_Arabian_script' },
      { label: 'Unicode Core Spec: Africa', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-19/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10A60.pdf' },
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
    characterRows: 'ሀ ለ ሐ መ ሠ ረ ሰ ቀ በ ተ ኀ ነ አ ከ ወ ዐ ዘ የ ደ ገ ጠ ጰ ጸ ፀ ፈ ፐ'
      .split(' ')
      .map((glyph) => ({ glyph })),
    summary:
      'A South Semitic script that developed into a vocalized abugida. It is used for Amharic, Tigrinya, liturgical Geʽez, and related languages.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ge%CA%BDez_script' },
      { label: 'Unicode Core Spec: Africa', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-19/' },
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
    characterRows: characterRows(
      'Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ Ր Ց Ւ Փ Ք Օ Ֆ և',
      'ayb|ben|gim|da|ech|za|eh|et|to|zhe|ini|liwn|xeh|ca|ken|ho|ja|ghad|cheh|men|yi|now|sha|vo|cha|peh|jheh|ra|seh|vew|tiwn|re|co|yiwn|piwr|keh|oh|feh|ew',
      'ա բ գ դ ե զ է ը թ ժ ի լ խ ծ կ հ ձ ղ ճ մ յ ն շ ո չ պ ջ ռ ս վ տ ր ց ւ փ ք օ ֆ և',
    ),
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
    characterRows: characterRows(
      'Ა Ბ Გ Დ Ე Ვ Ზ Თ Ი Კ Ლ Მ Ნ Ო Პ Ჟ Რ Ს Ტ Უ Ფ Ქ Ღ Ყ Შ Ჩ Ც Ძ Წ Ჭ Ხ Ჯ Ჰ',
      'an|ban|gan|don|en|vin|zen|tan|in|kan|las|man|nar|on|par|zhar|rae|san|tar|un|phar|khar|ghan|qar|shin|chin|tsan|dzil|tsil|char|khan|jhan|hae',
      'ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ',
    ),
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
    characterRows: characterRows(
      'ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ',
      'fehu|uruz|thurisaz|ansuz|raido|kaunan|gebo|wunjo|hagalaz|naudiz|isaz|jera|eihwaz|pertho|algiz|sowilo|tiwaz|berkanan|ehwaz|mannaz|laguz|ingwaz|dagaz|othala',
    ),
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
    characterRows: characterRows(
      'ᚁ ᚂ ᚃ ᚄ ᚅ ᚆ ᚇ ᚈ ᚉ ᚊ ᚋ ᚌ ᚍ ᚎ ᚏ ᚐ ᚑ ᚒ ᚓ ᚔ',
      'beith|luis|fearn|saille|nion|uath|dair|tinne|coll|ceirt|muin|gort|ngetal|straif|ruis|ailm|onn|ur|edad|idad',
    ),
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
    characterRows: characterRows(
      'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ',
      'giyeok|nieun|digeut|rieul|mieum|bieup|siot|ieung|jieut|chieut|kieuk|tieut|pieup|hieut|a|ya|eo|yeo|o|yo|u|yu|eu|i',
    ),
    summary:
      'A deliberately designed featural script for Korean, with letters grouped into syllable blocks. It is contextual rather than descended from the Phoenician alphabetic line.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Hangul' },
      { label: 'Omniglot', url: 'https://www.omniglot.com/writing/korean.htm' },
    ],
  },
  {
    id: 'oracle-bone',
    name: 'Jiaguwen',
    commonName: 'Oracle Bone Script',
    type: 'logographic',
    status: 'historical',
    region: ['East Asia'],
    startYear: -1250,
    endYear: -1050,
    direction: 'ttb',
    sampleGlyphs: ['日', '月', '山', '水'],
    characterRows: characterRows(
      '日 月 山 水 木 火 土 金 人 口 心 手 馬 鳥 魚 門',
      'sun / day|moon|mountain|water|wood|fire|earth|metal|person|mouth|heart|hand|horse|bird|fish|gate',
    ),
    visualGlyphs: [
      {
        label: 'sun / day',
        sourceLabel: 'Wikimedia Commons: 日-oracle.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%97%A5-oracle.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/%E6%97%A5-oracle.svg',
      },
      {
        label: 'moon',
        sourceLabel: 'Wikimedia Commons: 月-oracle.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%9C%88-oracle.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/%E6%9C%88-oracle.svg',
      },
      {
        label: 'mountain',
        sourceLabel: 'Wikimedia Commons: 山-oracle.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E5%B1%B1-oracle.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/%E5%B1%B1-oracle.svg',
      },
      {
        label: 'water',
        sourceLabel: 'Wikimedia Commons: 水-oracle.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%B0%B4-oracle.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/%E6%B0%B4-oracle.svg',
      },
    ],
    summary:
      'The earliest widely attested stage of Chinese writing, ancestral to later Chinese characters. It belongs to a separate logographic lineage.',
    notes: ['Shown with sourced image examples because oracle-bone forms are not encoded as ordinary text.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Oracle_bone_script' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Wikimedia Commons: 日-oracle.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%97%A5-oracle.svg' },
      { label: 'Wikimedia Commons: 月-oracle.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%9C%88-oracle.svg' },
      { label: 'Wikimedia Commons: 山-oracle.svg', url: 'https://commons.wikimedia.org/wiki/File:%E5%B1%B1-oracle.svg' },
      { label: 'Wikimedia Commons: 水-oracle.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%B0%B4-oracle.svg' },
    ],
  },
  {
    id: 'bronze-script',
    name: 'Jinwen',
    commonName: 'Bronze Script',
    type: 'logographic',
    status: 'historical',
    region: ['East Asia'],
    startYear: -1100,
    endYear: -300,
    direction: 'ttb',
    sampleGlyphs: ['日', '月', '山', '水'],
    characterRows: characterRows(
      '日 月 山 水 木 火 土 金 人 口 心 手 馬 鳥 魚 門',
      'sun / day|moon|mountain|water|wood|fire|earth|metal|person|mouth|heart|hand|horse|bird|fish|gate',
    ),
    visualGlyphs: [
      {
        label: 'sun / day',
        sourceLabel: 'Wikimedia Commons: 日-bronze.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%97%A5-bronze.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/%E6%97%A5-bronze.svg',
      },
      {
        label: 'moon',
        sourceLabel: 'Wikimedia Commons: 月-bronze.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%9C%88-bronze.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/%E6%9C%88-bronze.svg',
      },
      {
        label: 'mountain',
        sourceLabel: 'Wikimedia Commons: 山-bronze.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E5%B1%B1-bronze.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/%E5%B1%B1-bronze.svg',
      },
      {
        label: 'water',
        sourceLabel: 'Wikimedia Commons: 水-bronze.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%B0%B4-bronze.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/%E6%B0%B4-bronze.svg',
      },
    ],
    summary:
      'A Chinese inscriptional style used especially on ritual bronzes from the Shang and Zhou periods. It continues the early Chinese logographic tradition between oracle-bone writing and later standardizing forms.',
    notes: ['Shown with sourced image examples because bronze inscription forms are not encoded as ordinary text.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bronze_script' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Wikimedia Commons: 日-bronze.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%97%A5-bronze.svg' },
      { label: 'Wikimedia Commons: 月-bronze.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%9C%88-bronze.svg' },
      { label: 'Wikimedia Commons: 山-bronze.svg', url: 'https://commons.wikimedia.org/wiki/File:%E5%B1%B1-bronze.svg' },
      { label: 'Wikimedia Commons: 水-bronze.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%B0%B4-bronze.svg' },
    ],
  },
  {
    id: 'seal-script',
    name: 'Zhuanshu',
    commonName: 'Seal Script',
    nativeName: '篆書',
    nativeNameVisual: [
      {
        label: '篆書',
        sourceLabel: 'Wikimedia Commons: Seal Eg.png',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Seal_Eg.png',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Seal_Eg.png',
        crop: 'right-half',
      },
    ],
    type: 'logographic',
    status: 'historical',
    region: ['East Asia'],
    startYear: -700,
    endYear: 200,
    direction: 'ttb',
    sampleGlyphs: ['日', '月', '山', '水'],
    characterRows: characterRows(
      '日 月 山 水 木 火 土 金 人 口 心 手 馬 鳥 魚 門',
      'sun / day|moon|mountain|water|wood|fire|earth|metal|person|mouth|heart|hand|horse|bird|fish|gate',
    ),
    visualGlyphs: [
      {
        label: 'sun / day',
        sourceLabel: 'Wikimedia Commons: 日-seal.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%97%A5-seal.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/%E6%97%A5-seal.svg',
      },
      {
        label: 'moon',
        sourceLabel: 'Wikimedia Commons: 月-seal.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%9C%88-seal.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/%E6%9C%88-seal.svg',
      },
      {
        label: 'mountain',
        sourceLabel: 'Wikimedia Commons: 山-seal.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E5%B1%B1-seal.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/%E5%B1%B1-seal.svg',
      },
      {
        label: 'water',
        sourceLabel: 'Wikimedia Commons: 水-seal.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E6%B0%B4-seal.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/%E6%B0%B4-seal.svg',
      },
    ],
    summary:
      'A family of ancient Chinese character forms that includes the Qin standard Small Seal Script. It is a key standardizing stage between earlier inscriptional writing and later clerical forms.',
    notes: ['Shown with sourced image examples while Seal Script font support remains limited.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Seal_script' },
      { label: 'Unicode Seal Script Documents', url: 'https://www.unicode.org/L2/topical/seal/' },
      { label: 'Unicode Pipeline', url: 'https://www.unicode.org/alloc/Pipeline.html' },
      { label: 'Wikimedia Commons: 日-seal.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%97%A5-seal.svg' },
      { label: 'Wikimedia Commons: 月-seal.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%9C%88-seal.svg' },
      { label: 'Wikimedia Commons: 山-seal.svg', url: 'https://commons.wikimedia.org/wiki/File:%E5%B1%B1-seal.svg' },
      { label: 'Wikimedia Commons: 水-seal.svg', url: 'https://commons.wikimedia.org/wiki/File:%E6%B0%B4-seal.svg' },
      { label: 'Wikimedia Commons: Seal Eg.png', url: 'https://commons.wikimedia.org/wiki/File:Seal_Eg.png' },
    ],
  },
  {
    id: 'clerical-script',
    name: 'Lishu',
    commonName: 'Clerical Script',
    nativeName: '隸書',
    nativeNameVisual: [
      {
        label: '隸書',
        sourceLabel: 'Wikimedia Commons: Regular and clerical script eg.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Regular_and_clerical_script_eg.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Regular_and_clerical_script_eg.svg',
        crop: 'right-half',
      },
    ],
    type: 'logographic',
    status: 'historical',
    region: ['East Asia'],
    startYear: -300,
    endYear: 300,
    direction: 'ttb',
    sampleGlyphs: ['日', '月', '山', '水'],
    characterRows: characterRows(
      '日 月 山 水 木 火 土 金 人 口 心 手 馬 鳥 魚 門',
      'sun / day|moon|mountain|water|wood|fire|earth|metal|person|mouth|heart|hand|horse|bird|fish|gate',
    ),
    visualGlyphs: [
      {
        label: 'sun / day',
        sourceLabel: 'Wikimedia Commons: Character Ri4 Cler.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Character_Ri4_Cler.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Character_Ri4_Cler.svg',
      },
      {
        label: 'moon',
        sourceLabel: 'Wikimedia Commons: Character Yue4 Cler.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Character_Yue4_Cler.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Character_Yue4_Cler.svg',
      },
      {
        label: 'mountain',
        sourceLabel: 'Wikimedia Commons: Character Shan1 Cler.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Character_Shan1_Cler.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Character_Shan1_Cler.svg',
      },
      {
        label: 'water',
        sourceLabel: 'Wikimedia Commons: Character Shui3 Cler.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Character_Shui3_Cler.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Character_Shui3_Cler.svg',
      },
    ],
    summary:
      'A Chinese script style associated with the Qin and Han administrative world. Its flattened, brush-shaped forms mark the major transition from ancient seal forms toward the later standard character tradition.',
    notes: ['Shown as a historical shape stage in the Han-character lineage, not as a separate writing system for a different language.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Clerical_script' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Wikimedia Commons: Character Ri4 Cler.svg', url: 'https://commons.wikimedia.org/wiki/File:Character_Ri4_Cler.svg' },
      { label: 'Wikimedia Commons: Character Yue4 Cler.svg', url: 'https://commons.wikimedia.org/wiki/File:Character_Yue4_Cler.svg' },
      { label: 'Wikimedia Commons: Character Shan1 Cler.svg', url: 'https://commons.wikimedia.org/wiki/File:Character_Shan1_Cler.svg' },
      { label: 'Wikimedia Commons: Character Shui3 Cler.svg', url: 'https://commons.wikimedia.org/wiki/File:Character_Shui3_Cler.svg' },
      { label: 'Wikimedia Commons: Regular and clerical script eg.svg', url: 'https://commons.wikimedia.org/wiki/File:Regular_and_clerical_script_eg.svg' },
    ],
  },
  {
    id: 'chinese',
    name: 'Hanzi',
    commonName: 'Chinese Characters',
    nativeName: '漢字',
    type: 'logographic',
    status: 'living',
    region: ['East Asia'],
    startYear: 200,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['CJK Unified Ideographs'],
    sampleGlyphs: ['日', '月', '山', '水'],
    characterRows: characterRows(
      '日 月 山 水 木 火 土 金 人 口 心 手 馬 鳥 魚 門',
      'sun / day|moon|mountain|water|wood|fire|earth|metal|person|mouth|heart|hand|horse|bird|fish|gate',
    ),
    summary:
      'The living Han-character tradition that developed out of earlier Chinese inscriptional, seal, and clerical forms. It is used for Chinese and Japanese writing and is not alphabetic.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Chinese_characters' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
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
    characterRows: characterRows(
      '𒀀 𒁀 𒂗 𒆠 𒄑 𒇻 𒈠 𒉌 𒊒 𒋾 𒌓 𒌋 𒍣 𒀭 𒂍 𒅗',
      'a|ba|en|ki|gesh|lu|ma|ni|ru|ti|ud|u|zi|dingir|e|ka',
    ),
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
    characterRows: characterRows(
      "AJ K'IN BALAM CHAN KAB HA' WITZ IK' K'AN SAK CHAK K'UH TUN WINIK IX AJAW",
      "aj|k'in|balam|chan|kab|ha'|witz|ik'|k'an|sak|chak|k'uh|tun|winik|ix|ajaw",
    ),
    visualGlyphs: [
      {
        label: 'Ajaw day glyph',
        sourceLabel: 'Wikimedia Commons: MAYA-g-log-cal-D20-Ajaw.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D20-Ajaw.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/MAYA-g-log-cal-D20-Ajaw.svg',
      },
      {
        label: 'Ikʼ day glyph',
        sourceLabel: 'Wikimedia Commons: MAYA-g-log-cal-D02-Ik.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D02-Ik.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/MAYA-g-log-cal-D02-Ik.svg',
      },
      {
        label: 'Kʼan day glyph',
        sourceLabel: 'Wikimedia Commons: MAYA-g-log-cal-D04-Kan.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D04-Kan.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/MAYA-g-log-cal-D04-Kan.svg',
      },
      {
        label: 'Ix day glyph',
        sourceLabel: 'Wikimedia Commons: MAYA-g-log-cal-D14-Ix.svg',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D14-Ix.svg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/MAYA-g-log-cal-D14-Ix.svg',
      },
    ],
    summary:
      'A logosyllabic Mesoamerican writing system. It is included as a separate world writing tradition rather than an alphabetic descendant.',
    notes: ['Latin strings are transliterations or labels; representative signs use sourced Maya day-glyph images.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Maya_script' },
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikimedia Commons: Ajaw glyph', url: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D20-Ajaw.svg' },
      { label: 'Wikimedia Commons: Ikʼ glyph', url: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D02-Ik.svg' },
      { label: 'Wikimedia Commons: Kʼan glyph', url: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D04-Kan.svg' },
      { label: 'Wikimedia Commons: Ix glyph', url: 'https://commons.wikimedia.org/wiki/File:MAYA-g-log-cal-D14-Ix.svg' },
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
    characterRows:
      'Ꭰ Ꭱ Ꭲ Ꭳ Ꭴ Ꭵ Ꭶ Ꭷ Ꭸ Ꭹ Ꭺ Ꭻ Ꭼ Ꭽ Ꭾ Ꭿ Ꮀ Ꮁ Ꮂ Ꮃ Ꮄ Ꮅ Ꮆ Ꮇ Ꮈ Ꮉ Ꮊ Ꮋ Ꮌ Ꮍ Ꮎ Ꮏ Ꮐ Ꮑ Ꮒ Ꮓ Ꮔ Ꮕ Ꮖ Ꮗ Ꮘ Ꮙ Ꮚ Ꮛ Ꮜ Ꮝ Ꮞ Ꮟ Ꮠ Ꮡ Ꮢ Ꮣ Ꮤ Ꮥ Ꮦ Ꮧ Ꮨ Ꮩ Ꮪ Ꮫ Ꮬ Ꮭ Ꮮ Ꮯ Ꮰ Ꮱ Ꮳ Ꮴ Ꮵ Ꮶ Ꮷ Ꮸ Ꮹ Ꮺ Ꮻ Ꮼ Ꮽ Ꮾ Ꮿ Ᏸ Ᏹ Ᏺ Ᏻ Ᏼ Ᏽ'
        .split(' ')
        .map((glyph) => ({ glyph })),
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
    characterRows:
      'ᐁ ᐃ ᐄ ᐅ ᐆ ᐊ ᐋ ᐯ ᐱ ᐲ ᐳ ᐴ ᐸ ᐹ ᑌ ᑎ ᑏ ᑐ ᑑ ᑕ ᑖ ᑫ ᑭ ᑮ ᑯ ᑰ ᑲ ᑳ ᒉ ᒋ ᒌ ᒍ ᒎ ᒐ ᒑ ᒣ ᒥ ᒦ ᒧ ᒨ ᒪ ᒫ ᓀ ᓂ ᓃ ᓄ ᓅ ᓇ ᓈ ᓭ ᓯ ᓰ ᓱ ᓲ ᓴ ᓵ ᔦ ᔨ ᔩ ᔪ ᔫ ᔭ ᔮ ᕃ ᕆ ᕇ ᕈ ᕉ ᕋ ᕌ ᓓ ᓕ ᓖ ᓗ ᓘ ᓚ ᓛ ᐍ ᐏ ᐑ ᐓ ᐕ ᐘ ᐚ ᐦ ᑊ ᐟ ᐠ ᐨ ᒼ ᐣ ᐢ ᐩ ᕑ ᓫ ᐤ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A family of scripts used for Cree, Inuktitut, and other Indigenous languages in Canada. It is a modern constructed system influenced by shorthand and missionary literacy.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Canadian_Aboriginal_syllabics' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1400.pdf' },
    ],
  },
  {
    id: 'manyogana',
    name: 'Man’yōgana',
    nativeName: '万葉仮名',
    type: 'syllabary',
    status: 'historical',
    region: ['East Asia'],
    startYear: 500,
    endYear: 900,
    direction: 'mixed',
    unicodeBlock: ['CJK Unified Ideographs'],
    inventoryMode: 'representative',
    sampleGlyphs: ['安', '以', '宇', '衣'],
    characterRows: characterRows(
      '安 以 宇 衣 於 加 幾 久 計 己 左 之 寸 世 曽 太 知 川 天 止 奈 仁 奴 禰 乃 波 比 不 部 保',
      'a|i|u|e|o|ka|ki|ku|ke|ko|sa|shi|su|se|so|ta|chi|tsu|te|to|na|ni|nu|ne|no|ha|hi|fu|he|ho',
    ),
    summary:
      'A historical Japanese phonographic use of Chinese characters for their sounds. Its cursive forms led toward hiragana, while abbreviated character parts led toward katakana.',
    notes: ['Shown with representative phonograms; Man’yōgana used many Chinese characters rather than a small standardized kana inventory.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Man%27y%C5%8Dgana' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
    ],
  },
  {
    id: 'hiragana',
    name: 'Hiragana',
    nativeName: 'ひらがな',
    type: 'syllabary',
    status: 'living',
    region: ['East Asia'],
    startYear: 800,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['Hiragana'],
    sampleGlyphs: ['あ', 'い', 'う', 'え'],
    characterRows: characterRows(
      'あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん',
      'a|i|u|e|o|ka|ki|ku|ke|ko|sa|shi|su|se|so|ta|chi|tsu|te|to|na|ni|nu|ne|no|ha|hi|fu|he|ho|ma|mi|mu|me|mo|ya|yu|yo|ra|ri|ru|re|ro|wa|wo|n',
    ),
    summary:
      'A Japanese syllabary used with katakana and kanji. Hiragana developed from cursive forms of Man’yōgana, Chinese characters used phonetically for Japanese sounds.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Hiragana' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U3040.pdf' },
    ],
  },
  {
    id: 'katakana',
    name: 'Katakana',
    nativeName: 'カタカナ',
    type: 'syllabary',
    status: 'living',
    region: ['East Asia'],
    startYear: 800,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['Katakana'],
    sampleGlyphs: ['ア', 'イ', 'ウ', 'エ'],
    characterRows: characterRows(
      'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン',
      'a|i|u|e|o|ka|ki|ku|ke|ko|sa|shi|su|se|so|ta|chi|tsu|te|to|na|ni|nu|ne|no|ha|hi|fu|he|ho|ma|mi|mu|me|mo|ya|yu|yo|ra|ri|ru|re|ro|wa|wo|n',
    ),
    summary:
      'A Japanese syllabary used for loanwords, emphasis, transcription, and technical terms. Katakana developed from abbreviated parts of Man’yōgana, Chinese characters used phonetically for Japanese sounds.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Katakana' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U30A0.pdf' },
    ],
  },
  {
    id: 'bopomofo',
    name: 'Zhuyin',
    commonName: 'Bopomofo',
    nativeName: '注音符號',
    type: 'semisyllabary',
    status: 'living',
    region: ['East Asia'],
    startYear: 1913,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['Bopomofo'],
    sampleGlyphs: ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ'],
    characterRows: characterRows(
      'ㄅ ㄆ ㄇ ㄈ ㄉ ㄊ ㄋ ㄌ ㄍ ㄎ ㄏ ㄐ ㄑ ㄒ ㄓ ㄔ ㄕ ㄖ ㄗ ㄘ ㄙ ㄚ ㄛ ㄜ ㄝ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄦ ㄧ ㄨ ㄩ',
      'b|p|m|f|d|t|n|l|g|k|h|j|q|x|zh|ch|sh|r|z|c|s|a|o|e|eh|ai|ei|ao|ou|an|en|ang|eng|er|i|u|yu',
    ),
    summary:
      'A Mandarin phonetic semisyllabary that served as the standard pronunciation system before Hanyu Pinyin and is now used mainly in Taiwan. Its forms are drawn from older Chinese character shapes and strokes.',
    notes: ['Zhuyin is phonetic annotation for Chinese pronunciation, not the ordinary script for writing Chinese text.'],
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bopomofo' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U3100.pdf' },
    ],
  },
  {
    id: 'yi',
    name: 'Yi',
    nativeName: 'ꆈꌠꁱꂷ',
    type: 'syllabary',
    status: 'living',
    region: ['East Asia'],
    startYear: 1400,
    endYear: 'present',
    direction: 'mixed',
    unicodeBlock: ['Yi Syllables'],
    inventoryMode: 'representative',
    sampleGlyphs: ['ꀀ', 'ꀁ', 'ꀂ', 'ꀃ'],
    characterRows:
      'ꀀ ꀁ ꀂ ꀃ ꀄ ꀅ ꀆ ꀇ ꀈ ꀉ ꀊ ꀋ ꀌ ꀍ ꀎ ꀏ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A family of scripts for Yi languages. The modern standardized Yi syllabary has a large encoded inventory, so the inspector shows representative signs.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Yi_script' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/UA000.pdf' },
    ],
  },
  {
    id: 'tangut',
    name: 'Tangut',
    type: 'logographic',
    status: 'historical',
    region: ['East Asia'],
    startYear: 1036,
    endYear: 1500,
    direction: 'mixed',
    unicodeBlock: ['Tangut'],
    sampleGlyphs: ['𗀀', '𗀁', '𗀂', '𗀃'],
    characterRows:
      '𗀀 𗀁 𗀂 𗀃 𗀄 𗀅 𗀆 𗀇 𗀈 𗀉 𗀊 𗀋 𗀌 𗀍 𗀎 𗀏'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A logographic script created for the Tangut language of the Western Xia. Its inventory is far too large for full display here.',
    notes: ['Tangut is siniform and Chinese-influenced, but it is not a descendant branch of Chinese characters.'],
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tangut_script' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U17000.pdf' },
    ],
  },
  {
    id: 'khitan-small-script',
    name: 'Khitan Small',
    commonName: 'Khitan Small Script',
    type: 'mixed',
    status: 'historical',
    region: ['East Asia'],
    startYear: 925,
    endYear: 1200,
    direction: 'ttb',
    unicodeBlock: ['Khitan Small Script'],
    inventoryMode: 'representative',
    sampleGlyphs: ['𘬂', '𘬃', '𘬄', '𘬆'],
    characterRows:
      '𘬀 𘬁 𘬂 𘬃 𘬄 𘬅 𘬆 𘬇 𘬈 𘬉 𘬊 𘬋 𘬌 𘬍 𘬎 𘬏'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A partly deciphered script created for the Khitan language of the Liao dynasty. It combines logographic and phonographic behavior and was written vertically in the broader Chinese-script cultural sphere.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Khitan_small_script' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U18B00.pdf' },
    ],
  },
  {
    id: 'nushu',
    name: 'Nüshu',
    nativeName: '女书',
    type: 'syllabary',
    status: 'revived',
    region: ['East Asia'],
    startYear: 1200,
    endYear: 'present',
    direction: 'ttb',
    unicodeBlock: ['Nushu'],
    inventoryMode: 'representative',
    sampleGlyphs: ['𛆁', '𛆂', '𛆃', '𛆄'],
    characterRows:
      '𛆁 𛆂 𛆃 𛆄 𛆅 𛆆 𛆇 𛆈 𛆉 𛆊 𛆋 𛆌 𛆍 𛆎 𛆏 𛆐'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A syllabic script historically used by women in Jiangyong, China, now preserved through cultural transmission and revival work. The encoded inventory is large, so the app shows representative signs.',
    notes: ['The early date is approximate; Nüshu origins are uncertain.'],
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/N%C3%BCshu' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1B170.pdf' },
    ],
  },
  {
    id: 'lisu',
    name: 'Lisu',
    nativeName: 'ꓡꓲ-ꓢꓴ',
    type: 'alphabet',
    status: 'living',
    region: ['East Asia', 'Southeast Asia'],
    startYear: 1915,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Lisu'],
    sampleGlyphs: ['ꓐ', 'ꓑ', 'ꓒ', 'ꓓ'],
    characterRows:
      'ꓐ ꓑ ꓒ ꓓ ꓔ ꓕ ꓖ ꓗ ꓘ ꓙ ꓚ ꓛ ꓜ ꓝ ꓞ ꓟ ꓠ ꓡ ꓢ ꓣ ꓤ ꓥ ꓦ ꓧ ꓨ ꓩ ꓪ ꓫ ꓬ ꓭ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A modern alphabet for the Lisu language, also called the Fraser script. Its letter shapes are related to Latin capitals and rotated forms.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Fraser_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/UA4D0.pdf' },
    ],
  },
  {
    id: 'glagolitic',
    name: 'Glagolitic',
    type: 'alphabet',
    status: 'historical',
    region: ['Europe'],
    startYear: 862,
    endYear: 1900,
    direction: 'ltr',
    unicodeBlock: ['Glagolitic'],
    sampleGlyphs: ['Ⰰ', 'Ⰱ', 'Ⰲ', 'Ⰳ'],
    characterRows:
      'Ⰰ Ⰱ Ⰲ Ⰳ Ⰴ Ⰵ Ⰶ Ⰷ Ⰸ Ⰹ Ⰺ Ⰻ Ⰼ Ⰽ Ⰾ Ⰿ Ⱀ Ⱁ Ⱂ Ⱃ Ⱄ Ⱅ Ⱆ Ⱇ Ⱈ Ⱉ Ⱊ Ⱋ Ⱌ Ⱍ Ⱎ Ⱏ Ⱐ Ⱑ Ⱒ Ⱓ Ⱔ Ⱕ Ⱖ Ⱗ Ⱘ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'The oldest known Slavic alphabet, created in a Byzantine Christian context before Cyrillic became dominant in many Slavic traditions.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Glagolitic_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U2C00.pdf' },
    ],
  },
  {
    id: 'linear-b',
    name: 'Linear B',
    type: 'syllabary',
    status: 'historical',
    region: ['Europe'],
    startYear: -1400,
    endYear: -1200,
    direction: 'ltr',
    unicodeBlock: ['Linear B'],
    sampleGlyphs: ['𐀀', '𐀁', '𐀂', '𐀃'],
    inventoryMode: 'representative',
    characterRows:
      '𐀀 𐀁 𐀂 𐀃 𐀄 𐀅 𐀆 𐀇 𐀈 𐀉 𐀊 𐀋 𐀍 𐀎 𐀏 𐀐'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Bronze Age syllabary used for Mycenaean Greek. It is related to Aegean writing traditions rather than the later Greek alphabet.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Linear_B' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10000.pdf' },
    ],
  },
  {
    id: 'deseret',
    name: 'Deseret',
    type: 'alphabet',
    status: 'historical',
    region: ['North America'],
    startYear: 1854,
    endYear: 1877,
    direction: 'ltr',
    unicodeBlock: ['Deseret'],
    sampleGlyphs: ['𐐀', '𐐁', '𐐂', '𐐃'],
    characterRows:
      '𐐀 𐐁 𐐂 𐐃 𐐄 𐐅 𐐆 𐐇 𐐈 𐐉 𐐊 𐐋 𐐌 𐐍 𐐎 𐐏 𐐐 𐐑 𐐒 𐐓 𐐔 𐐕 𐐖 𐐗 𐐘 𐐙 𐐚 𐐛 𐐜 𐐝 𐐞 𐐟 𐐠 𐐡 𐐢 𐐣 𐐤 𐐥'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A nineteenth-century phonemic alphabet developed for English in Utah. It is historically separate from inherited Latin writing.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Deseret_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10400.pdf' },
    ],
  },
  {
    id: 'sinhala',
    name: 'Sinhala',
    nativeName: 'සිංහල',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: -300,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Sinhala'],
    sampleGlyphs: ['අ', 'ආ', 'ක', 'ග'],
    characterRows:
      'අ ආ ඇ ඈ ඉ ඊ උ ඌ ඍ ඎ එ ඒ ඓ ඔ ඕ ඖ ක ඛ ග ඝ ඞ ච ඡ ජ ඣ ඤ ට ඨ ඩ ඪ ණ ත ථ ද ධ න ප ඵ බ භ ම ය ර ල ව ශ ෂ ස හ ළ ෆ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic abugida used for Sinhala and Pali in Sri Lanka, with rounded letterforms shaped by manuscript traditions.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sinhala_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0D80.pdf' },
    ],
  },
  {
    id: 'odia',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1100,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Oriya'],
    sampleGlyphs: ['ଅ', 'ଆ', 'କ', 'ଗ'],
    characterRows:
      'ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଌ ଏ ଐ ଓ ଔ କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଳ ଵ ଶ ଷ ସ ହ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic abugida used for Odia. It is closely related to eastern Indic scripts but has a distinctive rounded visual profile.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Odia_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0B00.pdf' },
    ],
  },
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 830,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Malayalam'],
    sampleGlyphs: ['അ', 'ആ', 'ക', 'ഗ'],
    characterRows:
      'അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A southern Brahmic abugida used for Malayalam. Its modern form descends through southern Indian manuscript traditions.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Malayalam_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0D00.pdf' },
    ],
  },
  {
    id: 'meetei-mayek',
    name: 'Meetei Mayek',
    nativeName: 'ꯃꯤꯇꯩ ꯃꯌꯦꯛ',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1100,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Meetei Mayek'],
    sampleGlyphs: ['ꯀ', 'ꯁ', 'ꯂ', 'ꯃ'],
    characterRows:
      'ꯀ ꯁ ꯂ ꯃ ꯄ ꯅ ꯆ ꯇ ꯈ ꯉ ꯊ ꯋ ꯌ ꯍ ꯎ ꯏ ꯐ ꯑ ꯒ ꯓ ꯔ ꯕ ꯖ ꯗ ꯘ ꯙ ꯚ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A revived abugida for Meitei/Manipuri, used alongside Bengali-Assamese-derived writing in Manipur.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Meitei_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/UABC0.pdf' },
    ],
  },
  {
    id: 'ol-chiki',
    name: 'Ol Chiki',
    nativeName: 'ᱚᱞ ᱪᱤᱠᱤ',
    type: 'alphabet',
    status: 'living',
    region: ['South Asia'],
    startYear: 1925,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Ol Chiki'],
    sampleGlyphs: ['ᱚ', 'ᱛ', 'ᱜ', 'ᱢ'],
    characterRows:
      'ᱚ ᱛ ᱜ ᱝ ᱞ ᱟ ᱠ ᱡ ᱢ ᱣ ᱤ ᱥ ᱦ ᱧ ᱨ ᱩ ᱪ ᱫ ᱬ ᱭ ᱮ ᱯ ᱰ ᱱ ᱲ ᱳ ᱴ ᱵ ᱶ ᱷ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A twentieth-century alphabet created for Santali. It is deliberately separate from neighboring Brahmic scripts.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ol_Chiki_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1C50.pdf' },
    ],
  },
  {
    id: 'thaana',
    name: 'Thaana',
    nativeName: 'ތާނަ',
    type: 'abugida',
    status: 'living',
    region: ['South Asia'],
    startYear: 1700,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Thaana'],
    sampleGlyphs: ['ހ', 'ށ', 'ނ', 'ރ'],
    characterRows:
      'ހ ށ ނ ރ ބ ޅ ކ އ ވ މ ފ ދ ތ ލ ގ ޏ ސ ޑ ޒ ޓ ޔ ޕ ޖ ޗ ޘ ޙ ޚ ޛ ޜ ޝ ޞ ޟ ޠ ޡ ޢ ޣ ޤ ޥ ަ ާ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A right-to-left script used for Dhivehi in the Maldives. It combines consonant letters with vowel marks and has distinctive numeral-derived forms.',
    notes: ['Classed here as an abugida-like consonant-and-vowel-mark system, though it does not behave like a classic inherent-vowel Brahmic abugida.'],
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Thaana' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0780.pdf' },
    ],
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    nativeName: 'မြန်မာ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 1000,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Myanmar'],
    sampleGlyphs: ['က', 'ခ', 'ဂ', 'ဃ'],
    characterRows:
      'က ခ ဂ ဃ င စ ဆ ဇ ဈ ဉ ည ဋ ဌ ဍ ဎ ဏ တ ထ ဒ ဓ န ပ ဖ ဗ ဘ မ ယ ရ လ ဝ သ ဟ ဠ အ ဣ ဤ ဥ ဦ ဧ ဩ ဪ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic abugida used for Burmese and other languages of Myanmar, with rounded forms from palm-leaf manuscript habits.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Burmese_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1000.pdf' },
    ],
  },
  {
    id: 'lao',
    name: 'Lao',
    nativeName: 'ລາວ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 1350,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Lao'],
    sampleGlyphs: ['ກ', 'ຂ', 'ຄ', 'ງ'],
    characterRows:
      'ກ ຂ ຄ ງ ຈ ສ ຊ ຍ ດ ຕ ຖ ທ ນ ບ ປ ຜ ຝ ພ ຟ ມ ຢ ຣ ລ ວ ຫ ອ ຮ ະ າ ຳ ິ ີ ຶ ື ຸ ູ ເ ແ ໂ ໃ ໄ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic-derived abugida used for Lao. It is historically related to Thai and earlier Tai writing traditions.',
    notes: ['Kept under abugida for lineage and vowel-mark behavior, while Lao orthography represents vowels more explicitly than many Indic abugidas.'],
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Lao_script' },
      { label: 'Unicode Core Spec: Southeast Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-16/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0E80.pdf' },
    ],
  },
  {
    id: 'javanese',
    name: 'Javanese',
    nativeName: 'ꦲꦏ꧀ꦱꦫꦗꦮ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 900,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Javanese'],
    sampleGlyphs: ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ'],
    characterRows:
      'ꦲ ꦤ ꦕ ꦫ ꦏ ꦢ ꦠ ꦱ ꦮ ꦭ ꦥ ꦝ ꦗ ꦪ ꦚ ꦩ ꦒ ꦧ ꦛ ꦔ ꦉ ꦊ ꦋ ꦌ ꦍ ꦎ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic-derived script used historically and ceremonially for Javanese and related languages.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Javanese_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/UA980.pdf' },
    ],
  },
  {
    id: 'balinese',
    name: 'Balinese',
    nativeName: 'ᬅᬓ᭄ᬱᬭᬩᬮᬶ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 1000,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Balinese'],
    sampleGlyphs: ['ᬅ', 'ᬓ', 'ᬕ', 'ᬫ'],
    characterRows:
      'ᬅ ᬆ ᬇ ᬈ ᬉ ᬊ ᬋ ᬌ ᬏ ᬐ ᬑ ᬒ ᬓ ᬔ ᬕ ᬖ ᬗ ᬘ ᬙ ᬚ ᬛ ᬜ ᬝ ᬞ ᬟ ᬠ ᬡ ᬢ ᬣ ᬤ ᬥ ᬦ ᬧ ᬨ ᬩ ᬪ ᬫ ᬬ ᬭ ᬮ ᬯ ᬰ ᬱ ᬲ ᬳ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic-derived script used for Balinese and liturgical texts, related to Javanese and Kawi traditions.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Balinese_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1B00.pdf' },
    ],
  },
  {
    id: 'sundanese',
    name: 'Sundanese',
    nativeName: 'ᮃᮊ᮪ᮞᮛ ᮞᮥᮔ᮪ᮓ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 1300,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Sundanese'],
    sampleGlyphs: ['ᮃ', 'ᮊ', 'ᮌ', 'ᮙ'],
    characterRows:
      'ᮃ ᮄ ᮅ ᮆ ᮇ ᮈ ᮉ ᮊ ᮋ ᮌ ᮍ ᮎ ᮏ ᮐ ᮑ ᮒ ᮓ ᮔ ᮕ ᮖ ᮗ ᮘ ᮙ ᮚ ᮛ ᮜ ᮝ ᮞ ᮟ ᮠ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic-derived script for Sundanese. Its modern revival uses a standardized set of base letters and vowel marks.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sundanese_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1B80.pdf' },
    ],
  },
  {
    id: 'cham',
    name: 'Cham',
    nativeName: 'ꨀꨇꩉ ꨌꩌ',
    type: 'abugida',
    status: 'living',
    region: ['Southeast Asia'],
    startYear: 400,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Cham'],
    sampleGlyphs: ['ꨀ', 'ꨁ', 'ꨂ', 'ꨃ'],
    characterRows:
      'ꨀ ꨁ ꨂ ꨃ ꨄ ꨅ ꨆ ꨇ ꨈ ꨉ ꨊ ꨋ ꨌ ꨍ ꨎ ꨏ ꨐ ꨑ ꨒ ꨓ ꨔ ꨕ ꨖ ꨗ ꨘ ꨙ ꨚ ꨛ ꨜ ꨝ ꨞ ꨟ ꨠ ꨡ ꨢ ꨣ ꨤ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Brahmic-derived abugida used for Cham languages in mainland Southeast Asia.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Cham_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/UAA00.pdf' },
    ],
  },
  {
    id: 'tagalog',
    name: 'Tagalog / Baybayin',
    nativeName: 'ᜊᜌ᜔ᜊᜌᜒᜈ᜔',
    type: 'abugida',
    status: 'historical',
    region: ['Oceania', 'Southeast Asia'],
    startYear: 1300,
    endYear: 1800,
    direction: 'ltr',
    unicodeBlock: ['Tagalog'],
    sampleGlyphs: ['ᜀ', 'ᜊ', 'ᜃ', 'ᜇ'],
    characterRows:
      'ᜀ ᜁ ᜂ ᜃ ᜄ ᜅ ᜆ ᜇ ᜈ ᜉ ᜊ ᜋ ᜌ ᜎ ᜏ ᜐ ᜑ ᜒ ᜓ ᜔'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Philippine Brahmic abugida historically used for Tagalog and related languages, often called Baybayin.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Baybayin' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1700.pdf' },
    ],
  },
  {
    id: 'tifinagh',
    name: 'Tifinagh',
    nativeName: 'ⵜⵉⴼⵉⵏⴰⵖ',
    type: 'alphabet',
    status: 'living',
    region: ['North Africa'],
    startYear: -300,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Tifinagh'],
    sampleGlyphs: ['ⴰ', 'ⴱ', 'ⴳ', 'ⴷ'],
    characterRows:
      'ⴰ ⴱ ⴳ ⴷ ⴹ ⴻ ⴼ ⴽ ⵀ ⵃ ⵄ ⵅ ⵇ ⵉ ⵊ ⵍ ⵎ ⵏ ⵓ ⵔ ⵕ ⵖ ⵙ ⵚ ⵛ ⵜ ⵟ ⵡ ⵢ ⵣ ⵥ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Berber/Amazigh alphabet with ancient Libyco-Berber ancestry and modern standardized forms used in North Africa.',
    notes: ['Ancient Libyco-Berber and modern Neo-Tifinagh conventions differ; the node represents the broader Tifinagh tradition.'],
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tifinagh' },
      { label: 'Unicode Core Spec: Africa', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-19/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U2D30.pdf' },
    ],
  },
  {
    id: 'nko',
    name: 'N’Ko',
    nativeName: 'ߒߞߏ',
    type: 'alphabet',
    status: 'living',
    region: ['West Africa'],
    startYear: 1949,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['NKo'],
    sampleGlyphs: ['ߊ', 'ߋ', 'ߌ', 'ߍ'],
    characterRows:
      'ߊ ߋ ߌ ߍ ߎ ߏ ߐ ߓ ߔ ߕ ߖ ߗ ߘ ߙ ߚ ߛ ߜ ߝ ߞ ߟ ߠ ߡ ߢ ߣ ߤ ߥ ߦ ߧ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A right-to-left alphabet created for Manding languages of West Africa, with its own literary and educational tradition.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/N%27Ko_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U07C0.pdf' },
    ],
  },
  {
    id: 'adlam',
    name: 'Adlam',
    nativeName: '𞤀𞤣𞤤𞤢𞤥',
    type: 'alphabet',
    status: 'living',
    region: ['West Africa'],
    startYear: 1989,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Adlam'],
    sampleGlyphs: ['𞤀', '𞤁', '𞤂', '𞤃'],
    characterRows: characterRows(
      '𞤀 𞤁 𞤂 𞤃 𞤄 𞤅 𞤆 𞤇 𞤈 𞤉 𞤊 𞤋 𞤌 𞤍 𞤎 𞤏 𞤐 𞤑 𞤒 𞤓 𞤔 𞤕 𞤖 𞤗 𞤘 𞤙 𞤚 𞤛',
      undefined,
      '𞤢 𞤣 𞤤 𞤥 𞤦 𞤧 𞤨 𞤩 𞤪 𞤫 𞤬 𞤭 𞤮 𞤯 𞤰 𞤱 𞤲 𞤳 𞤴 𞤵 𞤶 𞤷 𞤸 𞤹 𞤺 𞤻 𞤼 𞤽',
    ),
    summary:
      'A modern right-to-left alphabet for Fulani/Pular. It has case pairs and is actively used in publishing and education.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Adlam_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1E900.pdf' },
    ],
  },
  {
    id: 'vai',
    name: 'Vai',
    type: 'syllabary',
    status: 'living',
    region: ['West Africa'],
    startYear: 1833,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Vai'],
    inventoryMode: 'representative',
    sampleGlyphs: ['ꔀ', 'ꔁ', 'ꔂ', 'ꔃ'],
    characterRows:
      'ꔀ ꔁ ꔂ ꔃ ꔄ ꔅ ꔆ ꔇ ꔈ ꔉ ꔊ ꔋ ꔌ ꔍ ꔎ ꔏ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A West African syllabary for the Vai language. Its large finite inventory is shown here with representative signs.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Vai_syllabary' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/UA500.pdf' },
    ],
  },
  {
    id: 'old-turkic',
    name: 'Old Turkic',
    type: 'alphabet',
    status: 'historical',
    region: ['Central Asia'],
    startYear: 700,
    endYear: 1000,
    direction: 'rtl',
    unicodeBlock: ['Old Turkic'],
    sampleGlyphs: ['𐰀', '𐰁', '𐰂', '𐰃'],
    characterRows:
      '𐰀 𐰁 𐰂 𐰃 𐰄 𐰅 𐰆 𐰇 𐰈 𐰉 𐰊 𐰋 𐰌 𐰍 𐰎 𐰏 𐰐 𐰑 𐰒 𐰓 𐰔 𐰕 𐰖 𐰗 𐰘 𐰙 𐰚 𐰛 𐰜 𐰝 𐰞 𐰟 𐰠 𐰡 𐰢 𐰣 𐰤 𐰥'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A runiform alphabet used for early Turkic inscriptions in Central Asia. It is not a descendant of Germanic runes despite superficial visual comparison.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Old_Turkic_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10C00.pdf' },
    ],
  },
  {
    id: 'sogdian',
    name: 'Sogdian',
    type: 'abjad',
    status: 'historical',
    region: ['Central Asia'],
    startYear: 300,
    endYear: 1000,
    direction: 'rtl',
    unicodeBlock: ['Sogdian'],
    sampleGlyphs: ['𐼰', '𐼱', '𐼲', '𐼳'],
    characterRows: characterRows(
      '𐼰 𐼱 𐼲 𐼳 𐼴 𐼵 𐼶 𐼷 𐼸 𐼹 𐼺 𐼻 𐼼 𐼽 𐼾 𐼿 𐽀 𐽁 𐽂 𐽃 𐽄',
      'aleph|beth|gimel|he|waw|zayin|heth|yodh|kaph|lamedh|mem|nun|samekh|ayin|pe|sadhe|resh|shin|taw|feth|lesh',
    ),
    summary:
      'A Syriac-derived Central Asian script used for the Sogdian language, within the broader Aramaic script family. Its cursive forms are an important ancestor of Old Uyghur and, through that branch, Mongolian writing.',
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sogdian_alphabet' },
      { label: 'Unicode Core Spec: South and Central Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10F30.pdf' },
    ],
  },
  {
    id: 'old-uyghur',
    name: 'Old Uyghur',
    type: 'alphabet',
    status: 'historical',
    region: ['Central Asia'],
    startYear: 800,
    endYear: 1700,
    direction: 'ttb',
    unicodeBlock: ['Old Uyghur'],
    sampleGlyphs: ['𐽰', '𐽱', '𐽲', '𐽳'],
    characterRows: characterRows(
      '𐽰 𐽱 𐽲 𐽳 𐽴 𐽵 𐽶 𐽷 𐽸 𐽹 𐽺 𐽻 𐽼 𐽽 𐽾 𐽿 𐾀 𐾁',
      'aleph|beth|gimel-heth|waw|zayin|final heth|yodh|kaph|lamedh|mem|nun|samekh|pe|resh|shin|taw|leshz|beth-2',
    ),
    summary:
      'A Central Asian cursive joining alphabet developed from Sogdian and used for Old Uyghur and related manuscript traditions. It is the immediate historical model for traditional Mongolian writing.',
    notes: ['Old Uyghur inherits abjad features from Sogdian, but sources describe it as largely alphabetized because vowel letters were used more systematically.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Old_Uyghur_alphabet' },
      { label: 'Unicode Core Spec: South and Central Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10F70.pdf' },
    ],
  },
  {
    id: 'mongolian',
    name: 'Mongolian',
    nativeName: 'ᠮᠣᠩᠭᠣᠯ',
    type: 'alphabet',
    status: 'living',
    region: ['Central Asia'],
    startYear: 1204,
    endYear: 'present',
    direction: 'ttb',
    unicodeBlock: ['Mongolian'],
    sampleGlyphs: ['ᠠ', 'ᠡ', 'ᠢ', 'ᠣ'],
    characterRows:
      'ᠠ ᠡ ᠢ ᠣ ᠤ ᠥ ᠦ ᠧ ᠨ ᠩ ᠪ ᠫ ᠬ ᠭ ᠮ ᠯ ᠰ ᠱ ᠲ ᠳ ᠴ ᠵ ᠶ ᠷ ᠸ ᠹ ᠺ ᠻ ᠼ ᠽ ᠾ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A vertical alphabet used for Mongolian and related languages, now especially in Inner Mongolia, China. The state of Mongolia mainly uses the Cyrillic alphabet for everyday Mongolian writing.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mongolian_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1800.pdf' },
    ],
  },
  {
    id: 'manchu',
    name: 'Manchu',
    nativeName: 'ᠮᠠᠨᠵᡠ',
    type: 'alphabet',
    status: 'historical',
    region: ['East Asia'],
    startYear: 1599,
    direction: 'ttb',
    unicodeBlock: ['Mongolian'],
    sampleGlyphs: ['ᠠ', 'ᡝ', 'ᡳ', 'ᡠ'],
    characterRows: characterRows(
      'ᠠ ᡝ ᡳ ᠣ ᡠ ᡡ ᠨ ᡢ ᡴ ᡤ ᡥ ᠪ ᡦ ᠰ ᡧ ᡨ ᡩ ᠯ ᠮ ᠴ ᠵ ᠶ ᡵ ᡶ ᠸ',
      'a|e|i|o|u|ū|na|ng|ka|ga|ha|ba|pa|sa|sha|ta|da|la|ma|ca|ja|ya|ra|fa|wa',
    ),
    summary:
      'A vertical alphabet created for the Manchu language by adapting the Mongolian script. It belongs to the Old Uyghur-derived Mongolian script lineage, with later reforms adding distinguishing dots and circles.',
    notes: ['Manchu should not be confused with the earlier Jurchen script, which belongs to a different graphically Chinese-influenced tradition.'],
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Manchu_alphabet' },
      { label: 'Unicode Core Spec: East Asia', url: 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-13/' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U1800.pdf' },
    ],
  },
  {
    id: 'ugaritic',
    name: 'Ugaritic',
    type: 'abjad',
    status: 'historical',
    region: ['Middle East'],
    startYear: -1400,
    endYear: -1200,
    direction: 'ltr',
    unicodeBlock: ['Ugaritic'],
    sampleGlyphs: ['𐎀', '𐎁', '𐎂', '𐎃'],
    characterRows:
      '𐎀 𐎁 𐎂 𐎃 𐎄 𐎅 𐎆 𐎇 𐎈 𐎉 𐎊 𐎋 𐎌 𐎍 𐎎 𐎏 𐎐 𐎑 𐎒 𐎓 𐎔 𐎕 𐎖 𐎗 𐎘 𐎙 𐎚 𐎛 𐎜 𐎝'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A cuneiform abjad used for Ugaritic. It is alphabetic in structure but graphically belongs to the cuneiform writing environment.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ugaritic_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U10380.pdf' },
    ],
  },
  {
    id: 'samaritan',
    name: 'Samaritan',
    nativeName: 'ࠔࠌࠓࠉࠌ',
    type: 'abjad',
    status: 'living',
    region: ['Middle East'],
    startYear: -600,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Samaritan'],
    sampleGlyphs: ['ࠀ', 'ࠁ', 'ࠂ', 'ࠃ'],
    characterRows:
      'ࠀ ࠁ ࠂ ࠃ ࠄ ࠅ ࠆ ࠇ ࠈ ࠉ ࠊ ࠋ ࠌ ࠍ ࠎ ࠏ ࠐ ࠑ ࠒ ࠓ ࠔ ࠕ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A Northwest Semitic abjad used by the Samaritan community. It preserves a branch related to Paleo-Hebrew forms.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Samaritan_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0800.pdf' },
    ],
  },
  {
    id: 'mandaic',
    name: 'Mandaic',
    nativeName: 'ࡌࡀࡍࡃࡀࡉࡀ',
    type: 'abjad',
    status: 'living',
    region: ['Middle East'],
    startYear: 200,
    endYear: 'present',
    direction: 'rtl',
    unicodeBlock: ['Mandaic'],
    sampleGlyphs: ['ࡀ', 'ࡁ', 'ࡂ', 'ࡃ'],
    characterRows:
      'ࡀ ࡁ ࡂ ࡃ ࡄ ࡅ ࡆ ࡇ ࡈ ࡉ ࡊ ࡋ ࡌ ࡍ ࡎ ࡏ ࡐ ࡑ ࡒ ࡓ ࡔ ࡕ'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'An Aramaic-derived abjad used by Mandaean communities. It remains a living liturgical and community script.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mandaic_alphabet' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U0840.pdf' },
    ],
  },
  {
    id: 'old-persian',
    name: 'Old Persian Cuneiform',
    type: 'syllabary',
    status: 'historical',
    region: ['Middle East'],
    startYear: -525,
    endYear: -330,
    direction: 'ltr',
    unicodeBlock: ['Old Persian'],
    sampleGlyphs: ['𐎠', '𐎡', '𐎢', '𐎣'],
    characterRows:
      '𐎠 𐎡 𐎢 𐎣 𐎤 𐎥 𐎦 𐎧 𐎨 𐎩 𐎪 𐎫 𐎬 𐎭 𐎮 𐎯 𐎰 𐎱 𐎲 𐎳 𐎴 𐎵 𐎶 𐎷 𐎸 𐎹 𐎺 𐎻 𐎼 𐎽 𐎾 𐎿 𐏀 𐏁 𐏂 𐏃 𐏈 𐏉 𐏊 𐏋'
        .split(' ')
        .map((glyph) => ({ glyph })),
    summary:
      'A cuneiform syllabary and logographic system created for royal Old Persian inscriptions. It should not be connected as a descendant of Phoenician letters.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Old_Persian_cuneiform' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U103A0.pdf' },
    ],
  },
  {
    id: 'osage',
    name: 'Osage',
    nativeName: '𐓏𐓘𐓻𐓘𐓻𐓟',
    type: 'alphabet',
    status: 'living',
    region: ['North America'],
    startYear: 2006,
    endYear: 'present',
    direction: 'ltr',
    unicodeBlock: ['Osage'],
    sampleGlyphs: ['𐒰', '𐒱', '𐒲', '𐒳'],
    characterRows: characterRows(
      '𐒰 𐒱 𐒲 𐒳 𐒴 𐒵 𐒶 𐒷 𐒸 𐒹 𐒺 𐒻 𐒼 𐒽 𐒾 𐒿 𐓀 𐓁 𐓂 𐓃 𐓄 𐓅 𐓆 𐓇 𐓈 𐓉 𐓊',
      undefined,
      '𐓘 𐓙 𐓚 𐓛 𐓜 𐓝 𐓞 𐓟 𐓠 𐓡 𐓢 𐓣 𐓤 𐓥 𐓦 𐓧 𐓨 𐓩 𐓪 𐓫 𐓬 𐓭 𐓮 𐓯 𐓰 𐓱 𐓲',
    ),
    summary:
      'A modern alphabet for the Osage language, with uppercase and lowercase forms encoded in Unicode.',
    sources: [
      { label: 'World Writing Systems', url: 'https://www.worldswritingsystems.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Osage_script' },
      { label: 'Unicode', url: 'https://www.unicode.org/charts/PDF/U104B0.pdf' },
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
  { from: 'phoenician', to: 'paleo-hebrew', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Paleo-Hebrew_alphabet'] },
  { from: 'aramaic', to: 'hebrew', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Hebrew_alphabet'] },
  { from: 'aramaic', to: 'syriac', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Syriac_alphabet'] },
  { from: 'aramaic', to: 'nabataean', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Nabataean_script'] },
  { from: 'aramaic', to: 'kharoshthi', relationship: 'adapted_from', confidence: 'medium', note: 'Kharoshthi is usually linked to Aramaic influence, while the exact mechanism of adaptation is reconstructed.', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/'] },
  { from: 'aramaic', to: 'brahmi', relationship: 'disputed', confidence: 'medium', note: 'Brahmi is often proposed as deriving from or adapting an Aramaic/Semitic model, but its origin remains debated and direct descent is not established.', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/', 'https://en.wikipedia.org/wiki/Brahmi_script', 'https://www.jstor.org/stable/604670', 'https://archive.org/details/onoriginofindian00bhuoft'] },
  { from: 'syriac', to: 'sogdian', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Sogdian_alphabet', 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/'] },
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
  { from: 'oracle-bone', to: 'bronze-script', relationship: 'descended', confidence: 'high', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'bronze-script', to: 'seal-script', relationship: 'descended', confidence: 'high', sources: ['https://www.unicode.org/L2/topical/seal/'] },
  { from: 'seal-script', to: 'clerical-script', relationship: 'descended', confidence: 'high', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'clerical-script', to: 'chinese', relationship: 'descended', confidence: 'high', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'chinese', to: 'manyogana', relationship: 'adapted_from', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Man%27y%C5%8Dgana', 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'manyogana', to: 'hiragana', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Hiragana', 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'manyogana', to: 'katakana', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Katakana', 'https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'chinese', to: 'bopomofo', relationship: 'adapted_from', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Bopomofo'] },
  { from: 'chinese', to: 'tangut', relationship: 'influenced_by', confidence: 'high', note: 'Tangut was constructed for a separate language and is graphically inspired by Chinese characters, not descended from them.', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'chinese', to: 'khitan-small-script', relationship: 'influenced_by', confidence: 'medium', note: 'Khitan Small Script belongs to the Chinese-script cultural sphere but is not a direct descendant of Chinese characters.', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-18/'] },
  { from: 'greek', to: 'glagolitic', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Glagolitic_script'] },
  { from: 'brahmi', to: 'sinhala', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Sinhala_script'] },
  { from: 'brahmi', to: 'odia', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Odia_script'] },
  { from: 'brahmi', to: 'malayalam', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Malayalam_script'] },
  { from: 'brahmi', to: 'meetei-mayek', relationship: 'descended', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Meitei_script'] },
  { from: 'brahmi', to: 'myanmar', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Burmese_alphabet'] },
  { from: 'brahmi', to: 'cham', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Cham_script'] },
  { from: 'brahmi', to: 'javanese', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Javanese_script'] },
  { from: 'brahmi', to: 'balinese', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Balinese_script'] },
  { from: 'brahmi', to: 'sundanese', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Sundanese_script'] },
  { from: 'brahmi', to: 'tagalog', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Baybayin'] },
  { from: 'thai', to: 'lao', relationship: 'adapted_from', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Lao_script'] },
  { from: 'paleo-hebrew', to: 'samaritan', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Samaritan_script', 'https://en.wikipedia.org/wiki/Paleo-Hebrew_alphabet'] },
  { from: 'aramaic', to: 'mandaic', relationship: 'descended', confidence: 'high', sources: ['https://en.wikipedia.org/wiki/Mandaic_alphabet'] },
  { from: 'sogdian', to: 'old-uyghur', relationship: 'descended', confidence: 'high', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/'] },
  { from: 'old-uyghur', to: 'mongolian', relationship: 'descended', confidence: 'high', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-14/'] },
  { from: 'mongolian', to: 'manchu', relationship: 'adapted_from', confidence: 'high', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-13/', 'https://www.unicode.org/charts/PDF/U1800.pdf'] },
  { from: 'old-south-arabian', to: 'geez', relationship: 'descended', confidence: 'medium', note: 'Ethiopic is rooted in the South Semitic inscriptional tradition; the exact early development is compressed here.', sources: ['https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-19/'] },
  { from: 'latin', to: 'deseret', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Deseret_alphabet'] },
  { from: 'latin', to: 'osage', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Osage_script'] },
  { from: 'latin', to: 'lisu', relationship: 'influenced_by', confidence: 'medium', sources: ['https://en.wikipedia.org/wiki/Fraser_script', 'https://www.unicode.org/charts/PDF/UA4D0.pdf'] },
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
  {
    id: 'chinese-path',
    label: 'Hanzi',
    nodeIds: ['oracle-bone', 'bronze-script', 'seal-script', 'clerical-script', 'chinese', 'manyogana', 'hiragana', 'katakana', 'bopomofo'],
  },
] as const

export const scriptTypes: ScriptType[] = [
  'alphabet',
  'abjad',
  'abugida',
  'syllabary',
  'semisyllabary',
  'featural',
  'logographic',
  'mixed',
  'undeciphered',
]

export const regions = Array.from(new Set(scripts.flatMap((script) => script.region))).sort()
