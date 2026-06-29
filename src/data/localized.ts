import type { Locale } from '../i18n'
import { scripts, type ScriptNode } from './scripts'

type LocalizedScriptContent = {
  name: string
  commonName?: string
  summary: string
  notes?: string[]
}

type LocalizedScript = ScriptNode & {
  localizedName: string
  localizedCommonName?: string
  localizedSummary: string
  localizedNotes?: string[]
}

const eastAsianScriptIds = new Set([
  'oracle-bone',
  'bronze-script',
  'seal-script',
  'clerical-script',
  'chinese',
  'manyogana',
  'hiragana',
  'katakana',
  'bopomofo',
  'yi',
  'tangut',
  'khitan-small-script',
  'khitan-large-script',
  'nushu',
  'hangul',
])

export const localizedGuidedTraceLabels: Record<Locale, Record<string, string>> = {
  en: {},
  'zh-Hant-CN': {
    'latin-path': '字母起源至拉丁文字',
    'arabic-path': '阿拉姆文字至阿拉伯文字',
    'south-asia-path': '婆羅米文字與南亞',
    'southeast-asia-path': '婆羅米文字與東南亞',
    'inner-asia-path': '阿拉姆文字至滿文',
    'chinese-path': '漢字至假名與注音',
  },
}

export const localizedScripts: Record<Locale, Record<string, LocalizedScriptContent>> = {
  en: {},
  'zh-Hant-CN': {
    'egyptian-hieroglyphs': {
      name: '埃及聖書體',
      summary: '埃及聖書體是碑刻與手稿傳統中使用的混合文字，結合表語、音節和字母性符號。它也是西奈和黎凡特早期字母化實驗的重要背景來源。',
      notes: ['混合文字體系不應直接描述為字母文字。'],
    },
    'proto-sinaitic': {
      name: '原始西奈文字',
      summary: '原始西奈文字是早期輔音文字，常被視為字母文字形成過程中的關鍵環節。它與後來迦南、腓尼基形式的關係仍有部分需要重構，也存在爭議。',
      notes: ['圖中字符使用較晚的西北閃米特形式作為便於辨認的代表。'],
    },
    phoenician: {
      name: '腓尼基文字',
      summary: '腓尼基文字是一套緊湊的輔音文字，對後來地中海和近東多種文字體系具有深遠影響。',
    },
    greek: {
      name: '希臘字母',
      summary: '希臘字母由腓尼基字母改編而來，系統地標記元音，成為歐洲多種字母文字的重要來源。',
    },
    'paleo-hebrew': {
      name: '古希伯來文字',
      summary: '古希伯來文字屬於迦南文字傳統，與腓尼基文字十分接近，曾用於古代以色列和猶大地區。',
      notes: ['圖中字符使用已編碼的腓尼基形式，作為相近古希伯來字形的可讀代表。'],
    },
    'old-italic': {
      name: '古意大利文字',
      summary: '古意大利文字泛指意大利半島古代一組由希臘字母改編的文字，其中包括通向拉丁字母的分支。',
    },
    latin: {
      name: '拉丁字母',
      summary: '拉丁字母源自古意大利文字，是今天使用範圍最廣的字母文字之一，並被大量語言和轉寫系統採用。',
    },
    coptic: {
      name: '科普特字母',
      summary: '科普特字母以希臘字母為主，加入源自埃及世俗體的符號，用於書寫科普特語並延續於宗教用途。',
      notes: ['此處的「歷史」指不再作為廣泛日常書寫文字，而不是完全停止使用。'],
    },
    gothic: {
      name: '哥特字母',
      summary: '哥特字母是為書寫哥特語而創制的字母文字，主要受希臘字母影響，也吸收拉丁和符文因素。',
    },
    cyrillic: {
      name: '西里爾字母',
      summary: '西里爾字母形成於斯拉夫基督教文化背景中，以希臘字母為主要來源，今天用於俄語、烏克蘭語、保加利亞語等多種語言。',
    },
    aramaic: {
      name: '阿拉姆文字',
      summary: '阿拉姆文字源自腓尼基傳統，曾在近東廣泛使用，並成為希伯來、敘利亞、納巴泰和多個亞洲文字分支的重要祖源。',
    },
    hebrew: {
      name: '希伯來文字',
      summary: '希伯來文字由阿拉姆文字傳統發展而來，是書寫希伯來語和猶太語文獻的主要文字。',
    },
    syriac: {
      name: '敘利亞文字',
      summary: '敘利亞文字是阿拉姆文字的一個重要分支，用於敘利亞語，並影響中亞多種文字傳統。',
    },
    nabataean: {
      name: '納巴泰文字',
      summary: '納巴泰文字是阿拉姆文字分支之一，字形逐漸草寫化，通常被視為阿拉伯文字的重要前身。',
    },
    arabic: {
      name: '阿拉伯文字',
      summary: '阿拉伯文字由納巴泰文字傳統發展而來，是一種輔音文字，後來擴展為書寫阿拉伯語、波斯語、烏爾都語等多種語言。',
    },
    brahmi: {
      name: '婆羅米文字',
      summary: '婆羅米文字是南亞多數文字體系的祖源之一。它與阿拉姆文字的關係常被提出，但直接來源仍有爭議。',
      notes: ['與阿拉姆文字的關係常被提出，但此處不視為確定的直接傳承。'],
    },
    devanagari: {
      name: '天城文',
      summary: '天城文是源自婆羅米傳統的元音附標文字，用於印地語、梵語、尼泊爾語等語言。',
    },
    kharoshthi: {
      name: '佉盧文',
      summary: '佉盧文是古代西北印度和中亞使用的文字，通常被認為受到阿拉姆文字影響，書寫方向多為由右至左。',
    },
    'bengali-assamese': {
      name: '孟加拉-阿薩姆文字',
      summary: '孟加拉-阿薩姆文字源自婆羅米傳統，用於孟加拉語、阿薩姆語等語言。',
    },
    gujarati: {
      name: '古吉拉特文',
      summary: '古吉拉特文由婆羅米傳統發展而來，與天城文關係密切，但通常沒有頂線。',
    },
    gurmukhi: {
      name: '古木基文',
      summary: '古木基文用於旁遮普語，源自北印度婆羅米系文字傳統。',
    },
    tamil: {
      name: '泰米爾文',
      summary: '泰米爾文源自婆羅米文字傳統，用於泰米爾語，具有獨特的南印度字形發展。',
    },
    kannada: {
      name: '卡納達文',
      summary: '卡納達文是南印度婆羅米系文字，用於卡納達語，與泰盧固文有相近的歷史來源。',
    },
    telugu: {
      name: '泰盧固文',
      summary: '泰盧固文是南印度婆羅米系文字，用於泰盧固語，字形以圓曲為特徵。',
    },
    khmer: {
      name: '高棉文',
      summary: '高棉文源自南印度婆羅米系文字，是東南亞多種文字的重要中介來源。',
    },
    thai: {
      name: '泰文',
      summary: '泰文由高棉文字改編而來，用於泰語，結合輔音字母、元音符號和聲調標記。',
    },
    tibetan: {
      name: '藏文',
      summary: '藏文源自婆羅米系文字，用於藏語和相關語言，並影響八思巴文等文字。',
    },
    'old-south-arabian': {
      name: '古南阿拉伯文字',
      summary: '古南阿拉伯文字是南阿拉伯碑銘傳統中的輔音文字，與埃塞俄比亞文字的早期發展有關。',
    },
    geez: {
      name: '吉茲文／埃塞俄比亞文字',
      summary: '吉茲文由南閃米特碑銘傳統發展而來，後來形成元音附標性質的埃塞俄比亞文字，用於吉茲語和阿姆哈拉語等。',
      notes: ['更早的未標元音埃塞俄比亞文字和南阿拉伯先行傳統早於此處的元音化埃塞俄比亞文字節點。'],
    },
    armenian: {
      name: '亞美尼亞字母',
      summary: '亞美尼亞字母是為書寫亞美尼亞語而創制的字母文字，傳統上與基督教文獻翻譯密切相關。',
    },
    georgian: {
      name: '格魯吉亞文字',
      summary: '格魯吉亞文字用於格魯吉亞語及相關語言，具有獨立而連續的書寫傳統。',
    },
    runic: {
      name: '盧恩文字',
      summary: '盧恩文字是日耳曼語族早期使用的一組字母文字，可能受到意大利半島字母傳統影響。',
    },
    ogham: {
      name: '歐甘文字',
      summary: '歐甘文字主要見於愛爾蘭和不列顛碑刻，由刻痕組成，通常與早期愛爾蘭語相關。',
    },
    hangul: {
      name: '諺文',
      summary: '諺文是朝鮮半島創制的特徵文字，以字母組成音節塊，明確反映發音部位和音系結構。',
    },
    'oracle-bone': {
      name: '甲骨文',
      summary: '甲骨文是商代占卜材料上的早期漢字形態，是漢字譜系中可見的早期階段之一。',
      notes: ['由於甲骨文字形不是普通文本編碼字符，圖中使用有來源的圖像示例。'],
    },
    'bronze-script': {
      name: '金文',
      summary: '金文是青銅器銘文中的漢字形態，位於甲骨文與後來篆書、隸書之間的字形發展鏈條中。',
      notes: ['由於青銅器銘文字形不是普通文本編碼字符，圖中使用有來源的圖像示例。'],
    },
    'seal-script': {
      name: '篆書',
      summary: '篆書是漢字歷史中的重要字形階段，尤其與秦系標準化文字和後來印章書寫相關。',
      notes: ['在篆書字體支持仍有限的情況下，圖中使用有來源的圖像示例。'],
    },
    'clerical-script': {
      name: '隸書',
      summary: '隸書是漢字由篆書向更接近楷書形態過渡的重要階段，與漢代書寫實踐密切相關。',
      notes: ['此節點表示漢字譜系中的歷史字形階段，不是另一種語言的獨立文字體系。'],
    },
    chinese: {
      name: '漢字',
      summary: '漢字是以表語和語素文字特徵為核心的文字體系，長期用於漢語，也深刻影響日本、朝鮮半島和越南等地的書寫傳統。',
    },
    cuneiform: {
      name: '楔形文字',
      summary: '楔形文字起源於美索不達米亞，以楔狀筆畫書寫於泥板上，曾用於蘇美爾語、阿卡德語等多種語言。',
    },
    maya: {
      name: '瑪雅文字',
      summary: '瑪雅文字是中部美洲的標音-表語混合文字，用於碑刻、手稿和曆法文本。',
      notes: ['拉丁字符串為轉寫或標籤；代表性符號使用有來源的瑪雅日名符號圖像。'],
    },
    cherokee: {
      name: '切羅基音節文字',
      summary: '切羅基音節文字由 Sequoyah 創制，用於切羅基語，是近代創制文字成功普及的著名案例。',
    },
    'canadian-aboriginal': {
      name: '加拿大原住民音節文字',
      summary: '加拿大原住民音節文字是一組用於克里語、因紐特語等語言的音節文字，符號方向和形態常表示元音差異。',
    },
    manyogana: {
      name: '萬葉假名',
      summary: '萬葉假名使用漢字記錄日語音值，是平假名和片假名形成前的重要日本書寫實踐。',
      notes: ['圖中使用代表性音符；萬葉假名使用大量漢字，而不是小型標準化假名表。'],
    },
    hiragana: {
      name: '平假名',
      summary: '平假名由萬葉假名草書化發展而來，是現代日語假名體系的重要組成部分。',
    },
    katakana: {
      name: '片假名',
      summary: '片假名由取漢字局部作音符的實踐發展而來，用於現代日語中的外來語、擬聲詞和強調等功能。',
    },
    bopomofo: {
      name: '注音符號',
      summary: '注音符號是標注漢語讀音的音標系統，字形受到漢字部件影響，主要用於教學和注音。',
      notes: ['注音是漢語發音標注工具，不是普通漢語文本的主要書寫文字。'],
    },
    yi: {
      name: '彝文',
      summary: '彝文是用於彝語的文字傳統，現代規範彝文具有音節文字特徵。',
    },
    tangut: {
      name: '西夏文',
      summary: '西夏文是為西夏語創制的表意性文字，字形受漢字啟發，但不是漢字的直接後代。',
      notes: ['西夏文具有類漢字外觀並受漢字影響，但不是漢字的後代分支。'],
    },
    'khitan-small-script': {
      name: '契丹小字',
      summary: '契丹小字是契丹語文字之一，屬於遼代文字傳統，受到漢字文化圈影響但具有自身結構。',
    },
    'khitan-large-script': {
      name: '契丹大字',
      summary: '契丹大字是契丹語文字之一，圖形上受漢字影響，但不是漢字字形演變的一個階段。',
      notes: ['契丹大字字體支持有限；圖中使用 BabelStone 字體中的代表性字形。'],
    },
    nushu: {
      name: '女書',
      summary: '女書是湖南江永一帶女性社群使用的文字傳統，通常與當地漢語方言和女性書寫文化相關。',
      notes: ['圖中年代採較保守表示；女書起源仍不確定，也可能更早。'],
    },
    lisu: {
      name: '傈僳文',
      summary: '傈僳文又稱 Fraser 文字，受拉丁字母啟發，用於傈僳語。',
    },
    glagolitic: {
      name: '格拉哥里文字',
      summary: '格拉哥里文字是早期斯拉夫書寫傳統的重要文字，與基督教傳教和禮儀文本有關。',
    },
    'linear-b': {
      name: '線形文字 B',
      summary: '線形文字 B 是邁錫尼希臘語的音節文字，主要見於青銅時代晚期的行政泥板。',
    },
    deseret: {
      name: '德瑟雷特字母',
      summary: '德瑟雷特字母是 19 世紀在美國創制的英語音素字母文字，與摩門社群歷史相關。',
    },
    sinhala: {
      name: '僧伽羅文',
      summary: '僧伽羅文源自婆羅米文字傳統，用於僧伽羅語，具有南亞元音附標文字特徵。',
    },
    odia: {
      name: '奧迪亞文',
      summary: '奧迪亞文是婆羅米系文字，用於奧迪亞語，字形以圓曲筆畫為特徵。',
    },
    malayalam: {
      name: '馬拉雅拉姆文',
      summary: '馬拉雅拉姆文源自南印度婆羅米系文字，用於馬拉雅拉姆語。',
    },
    'meetei-mayek': {
      name: '曼尼普爾文',
      summary: '曼尼普爾文（Meetei Mayek）用於曼尼普爾語，近現代經歷復興和標準化。',
    },
    'ol-chiki': {
      name: '奧爾奇基文',
      summary: '奧爾奇基文是為桑塔利語創制的字母文字，與周邊婆羅米系文字不同。',
    },
    thaana: {
      name: '塔安那文',
      summary: '塔安那文是用於迪維希語的由右至左字母文字，以輔音字母配合必寫的元音符號，字形來源與數字符號有關。',
      notes: ['塔安那文使用組合式元音符號，但不像典型婆羅米系元音附標文字那樣具有固有元音。'],
    },
    myanmar: {
      name: '緬甸文',
      summary: '緬甸文源自婆羅米文字傳統，用於緬甸語及相關語言。',
    },
    lao: {
      name: '老撾文',
      summary: '老撾文由泰文相關傳統發展而來，用於老撾語，具有元音附標和聲調標記。',
      notes: ['此處按譜系和元音標記行為歸入元音附標文字；老撾正字法比許多印度系元音附標文字更明確地表示元音。'],
    },
    javanese: {
      name: '爪哇文',
      summary: '爪哇文源自婆羅米系文字，用於爪哇語和相關文化文本。',
    },
    balinese: {
      name: '巴厘文',
      summary: '巴厘文源自婆羅米系文字，用於巴厘語及宗教、文學文本。',
    },
    sundanese: {
      name: '巽他文',
      summary: '巽他文是印度尼西亞巽他語的文字傳統，源自婆羅米系文字。',
    },
    cham: {
      name: '占文',
      summary: '占文源自婆羅米系文字，用於占語及相關東南亞文字傳統。',
    },
    tagalog: {
      name: '他加祿文／拜巴因文',
      summary: '拜巴因文是菲律賓古代文字之一，源自婆羅米系文字，用於他加祿語等語言。',
    },
    tifinagh: {
      name: '提非納文',
      summary: '提非納文是柏柏爾語族相關的文字傳統，包含古代利比亞-柏柏爾文字和現代 Neo-Tifinagh。',
      notes: ['古代利比亞-柏柏爾文字與現代 Neo-Tifinagh 慣例不同；此節點表示較廣義的提非納文字傳統。'],
    },
    nko: {
      name: '恩科文',
      summary: '恩科文是為曼丁語支語言創制的字母文字，書寫方向由右至左。',
    },
    adlam: {
      name: '阿德拉姆文',
      summary: '阿德拉姆文是為富拉語創制的字母文字，近年已進入 Unicode 並持續推廣使用。',
    },
    vai: {
      name: '瓦伊音節文字',
      summary: '瓦伊音節文字用於利比里亞和塞拉利昂的瓦伊語，是西非重要的本土文字傳統。',
    },
    'old-turkic': {
      name: '古突厥文',
      summary: '古突厥文用於早期突厥語碑銘，常見於鄂爾渾碑銘傳統。',
    },
    sogdian: {
      name: '粟特文',
      summary: '粟特文源自阿拉姆文字傳統，曾在中亞商貿和宗教傳播中扮演重要角色。',
    },
    'old-uyghur': {
      name: '回鶻文',
      summary: '回鶻文由粟特文字發展而來，後來影響蒙古文和滿文等縱書文字傳統。',
      notes: ['回鶻文繼承粟特文的輔音文字特徵，但資料常因元音字母使用更系統而將其描述為更字母化。'],
    },
    mongolian: {
      name: '蒙古文',
      summary: '傳統蒙古文由回鶻文傳統發展而來，採用縱向書寫，用於蒙古語及相關語言。',
    },
    'phags-pa': {
      name: '八思巴文',
      summary: '八思巴文由藏文改編而來，是元代為多語書寫而創制的文字。',
      notes: ['八思巴文在此歸入藏文衍生分支，而不是回鶻文衍生的蒙古文譜系。'],
    },
    manchu: {
      name: '滿文',
      summary: '滿文由蒙古文改編而來，用於滿語，保持縱向書寫方向。',
      notes: [
        '此處表示清代滿文；相關的錫伯文書寫仍在使用。',
        '滿文不應與更早的女真文字混淆；女真文字屬於另一種受漢字影響的圖形傳統。',
      ],
    },
    ugaritic: {
      name: '烏加里特楔形字母',
      summary: '烏加里特文字是以楔形筆畫書寫的輔音字母文字，用於古代烏加里特語。',
    },
    samaritan: {
      name: '撒馬利亞文字',
      summary: '撒馬利亞文字由古希伯來文字傳統發展而來，用於撒馬利亞宗教文本。',
    },
    mandaic: {
      name: '曼達文字',
      summary: '曼達文字源自阿拉姆文字傳統，用於曼達語和曼達教文本。',
    },
    'old-persian': {
      name: '古波斯楔形文字',
      summary: '古波斯楔形文字是阿契美尼德時期為古波斯語使用的楔形文字，結構上不同於早期美索不達米亞楔形文字。',
    },
    osage: {
      name: '奧塞奇字母',
      summary: '奧塞奇字母是為奧塞奇語創制並標準化的字母文字，受到拉丁字母形式影響。',
    },
  },
}

const localizedCharacterLabels: Record<Locale, Record<string, string>> = {
  en: {},
  'zh-Hant-CN': {
    man: '男人',
    woman: '女人',
    foot: '足',
    reed: '蘆葦',
    water: '水',
    mouth: '口',
    house: '房屋',
    town: '城鎮',
    viper: '蝰蛇',
    quail: '鵪鶉',
    lion: '獅子',
    sun: '太陽',
    'sun / day': '太陽／日',
    moon: '月',
    mountain: '山',
    loaf: '麵包',
    arm: '手臂',
    vulture: '兀鷲',
    slope: '斜坡',
    alpha: '阿爾法',
    beta: '貝塔',
    gamma: '伽馬',
    delta: '德爾塔',
    epsilon: '艾普西龍',
    zeta: '澤塔',
    eta: '伊塔',
    theta: '西塔',
    iota: '約塔',
    kappa: '卡帕',
    lambda: '拉姆達',
    mu: '繆',
    nu: '紐',
    xi: '克西',
    omicron: '奧密克戎',
    pi: '派',
    rho: '柔',
    sigma: '西格馬',
    tau: '陶',
    upsilon: '宇普西龍',
    phi: '斐',
    chi: '希',
    psi: '普西',
    omega: '歐米伽',
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    person: '人',
    heart: '心',
    hand: '手',
    horse: '馬',
    bird: '鳥',
    fish: '魚',
    gate: '門',
    'Ajaw day glyph': 'Ajaw 日名符號',
    'Ikʼ day glyph': 'Ikʼ 日名符號',
    'Kʼan day glyph': 'Kʼan 日名符號',
    'Ix day glyph': 'Ix 日名符號',
  },
}

const modernHanCharacterLabels: Record<string, string> = {
  'sun / day': '日',
  moon: '月',
  mountain: '山',
  water: '水',
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  person: '人',
  mouth: '口',
  heart: '心',
  hand: '手',
  horse: '馬',
  bird: '鳥',
  fish: '魚',
  gate: '門',
}

const historicalHanFormScriptIds = new Set([
  'oracle-bone',
  'bronze-script',
  'seal-script',
  'clerical-script',
])

export function localizedTraceLabel(id: string, label: string, locale: Locale) {
  return localizedGuidedTraceLabels[locale][id] ?? label
}

export function localizeScript(script: ScriptNode, locale: Locale): LocalizedScript {
  const localized = localizedScripts[locale][script.id]
  return {
    ...script,
    localizedName: localized?.name ?? script.name,
    localizedCommonName: localized?.commonName ?? (locale === 'en' ? script.commonName : undefined),
    localizedSummary: localized?.summary ?? script.summary,
    localizedNotes: localized?.notes ?? script.notes,
  }
}

export function localizedScriptName(script: ScriptNode, locale: Locale) {
  return localizedScripts[locale][script.id]?.name ?? script.name
}

export function englishScriptDisplayName(script: ScriptNode) {
  return script.commonName ?? script.name
}

export function annotateHistoricalTerms(text: string, script: ScriptNode, locale: Locale) {
  if (locale === 'en' || eastAsianScriptIds.has(script.id)) return text

  const terms = Object.entries(localizedScripts[locale])
    .filter(([id]) => !eastAsianScriptIds.has(id))
    .map(([id, localized]) => ({
      english: englishScriptDisplayName(scriptById[id] ?? { ...script, id, name: localized.name }),
      localized: localized.name,
    }))
    .filter((term) => text.includes(term.localized))
    .sort((a, b) => b.localized.length - a.localized.length)

  return terms.reduce((annotated, term) => {
    const annotatedTerm = `${term.localized}（${term.english}）`
    if (annotated.includes(annotatedTerm)) return annotated
    return annotated.replace(term.localized, annotatedTerm)
  }, text)
}

export function localizedCharacterLabel(label: string, locale: Locale, scriptId?: string) {
  if (locale === 'zh-Hant-CN' && scriptId && historicalHanFormScriptIds.has(scriptId)) {
    return modernHanCharacterLabels[label] ?? label
  }

  return localizedCharacterLabels[locale][label] ?? label
}

const scriptById = Object.fromEntries(scripts.map((script) => [script.id, script]))
