import type { HomeCopy } from '@/i18n/copy';
import type { ProfessionLocaleCopy } from '@/i18n/professions/types';

export const home = {
  "heroTitle": "文件重命名工具\n适用于 Mac 和 Windows",
  "heroAccent": "文件重命名工具",
  "heroSubtitle": "使用 AI 按内容批量重命名文件。Zush 支持截图、PDF、照片、视频、音频和文档等 100 多种格式，可精准提取你选择的信息，并生成由你定义的文件名。",
  "heroHighlights": [
    "使用 AI 按内容批量重命名文件",
    "精准提取你选择的信息"
  ],
  "buyPro": "购买 PRO",
  "trustSignals": [
    "免费开始",
    "无需注册",
    "无需信用卡"
  ],
  "heroModes": [
    "云端 AI",
    "BYOK",
    "本地 AI",
    "100+ 种格式"
  ],
  "featuresTitle": "Zush 功能",
  "featuresDescription": "通过预览、模板、文件夹监控和一键撤销，把杂乱的文件名整理成清晰统一的名称。",
  "supportedFormats": "支持的文件格式",
  "images": "图片",
  "designLabel": "设计",
  "documents": "文档",
  "videosLabel": "视频",
  "audioLabel": "音频",
  "cloudFoldersTitle": "适用于云文件夹",
  "cloudFoldersDescription": "Zush 重命名任何本地文件夹中的文件 - 包括 iCloud Drive、Google Drive、Dropbox 和 OneDrive 保持同步的文件。没有可连接的帐户。",
  "downloadTitle": "免费试用 Zush",
  "downloadSubtitle": "批量重命名文件、监控文件夹，并按内容重命名截图、PDF、照片、音频、视频和文档。",
  "downloadHintPrefix": "免费 · 无需信用卡",
  "useCasesTitle": "谁在使用 AI 文件重命名",
  "useCasesDescription": "选择最接近你工作流的角色。",
  "faqTitle": "常见问题",
  "faqTitleAccent": "问题",
  "faqDescription": "关于 Zush 你需要了解的一切",
  "featureCards": {
    "aiAnalysis": {
      "title": "AI 分析",
      "description": "一次批量分析并重命名 100 多种文件格式，涵盖图片、EPUB 和 FB2 电子书、PDF、音频、视频和 Office 文件。"
    },
    "foldersMonitoring": {
      "title": "文件夹监控",
      "description": "监控一个或多个文件夹。Zush 会在后台自动处理新加入的文件。"
    },
    "batchRename": {
      "title": "批量重命名",
      "description": "一次拖入多个文件。Zush 会在几秒内完成分析并批量重命名。"
    },
    "templates": {
      "title": "模板",
      "description": "为截图、报销、音乐轨道、客户工作、法律文件、旅行预订和监控文件夹保存可复用设置。"
    },
    "namingBlocks": {
      "title": "命名块",
      "description": "用 145+ 个命名块构建一致文件名，覆盖日期、元数据、音频、照片、财务、法律、旅行、客户和 AI 字段。"
    },
    "customAiBlocks": {
      "title": "自定义 AI 块",
      "description": "描述希望 Zush 提取的具体信息，然后将其作为自定义 AI 块在任意模板中复用。"
    },
    "audioSupport": {
      "title": "音频支持",
      "description": "使用内嵌元数据、识别、转录和音频字段重命名 MP3、M4A、WAV、FLAC、OGG、WebM 和 MPGA。"
    },
    "customPatterns": {
      "title": "自定义命名模式",
      "description": "用 {title}、{original}、{date}、{time} 或 {category} 等变量设置自己的文件名规则。"
    },
    "smartMetadata": {
      "title": "智能元数据",
      "description": "自动添加 Finder 标签和 Spotlight 元数据，让文件可以用自然搜索快速找到。"
    },
    "renameHistory": {
      "title": "重命名历史",
      "description": "记录每一次修改。如果结果不合适，可以一键恢复原始文件名。"
    },
    "customPrompts": {
      "title": "自定义 AI 提示词",
      "description": "设置命名、标签和元数据规则，让 AI 输出符合你的风格和工作流。"
    },
    "byok": {
      "title": "使用自己的密钥",
      "description": "连接 Gemini、OpenRouter、OpenAI 或 Claude，实现云端重命名；FREE 在所有模式间共享 50 次，PRO 无限制。密钥会安全保存在本地。"
    },
    "offlineAi": {
      "title": "私有本地 AI",
      "description": "本地 Ollama 模型会在设备上处理受支持的文件，完成设置后也可离线运行。"
    },
    "cloudAi": {
      "title": "云端 AI",
      "description": "通过我们的中继连接到商用 AI 提供商，遵循其标准 API 条款。中继的作用是让 API 密钥无法从应用中被提取。"
    },
    "bandTitle": "安全使用 Zush 的 3 种方式",
    "bandSubtitle": "开箱即用的云端 AI、接入自己的 API 密钥，或通过 Ollama 完全离线。",
    "addFolder": "添加文件夹",
    "promptRules": "提示词规则",
    "customBadge": "自定义",
    "templateActive": "当前模板",
    "templateNames": [
      "截图",
      "音乐轨道",
      "客户会议笔记"
    ],
    "namingBlockLabels": [
      "{date}",
      "{client_name}",
      "{artist}",
      "{bpm}",
      "{invoice_number}",
      "{title}"
    ],
    "apiKeyConnected": "API 密钥已连接",
    "terminal": "终端",
    "localModelReady": "本地模型已就绪",
    "today": "今天",
    "undo": "撤销",
    "analysisNewName": "巴厘岛_日落_海滩.png",
    "batchNewNames": [
      "看板界面.png",
      "招聘计划笔记.docx",
      "投资人更新演示.pptx"
    ],
    "metadataFileName": "赛博朋克_数字艺术.png",
    "metadataTags": [
      "故障艺术",
      "蒸汽波",
      "雕像",
      "赛博朋克",
      "数字艺术",
      "棕榈树"
    ],
    "historyNewNames": [
      "仪表盘评审笔记.docx",
      "Q1_收入报告.xlsx"
    ],
    "promptExample": "文件名保持简短，把主体放在最前，并添加匹配的 Finder 标签。",
    "audioNewNames": [
      "低保真钢琴循环_92BPM.mp3",
      "客户需求访谈.m4a"
    ]
  },
  "offlineAiModal": {
    "title": "不离开设备的 AI",
    "description": "离线 AI 是可选模式。本地 Ollama 模型直接在你的 Mac 或 Windows 电脑上运行，不经过云端。",
    "points": [
      "一切都留在你的设备上：不发送到 Zush 云端，也不发送给第三方 AI。",
      "最适合截图、照片、PDF 和文档预览。",
      "需要更多模型或格式时，随时切换到云端或 BYOK。"
    ],
    "proTitle": "所有方案均可使用",
    "proDescription": "FREE 在 Cloud AI、BYOK 和离线 AI 之间共享 50 次重命名；PRO 会移除此限制。Ollama 和本地模型需单独安装。",
    "closeLabel": "关闭"
  },
  "showcase": {
    "title": "来一次 Zush 漫游",
    "titleAccent": "Zush",
    "description": "每个功能一段简短演示 — 点击标签查看实际效果",
    "playShowcase": "播放演示",
    "switchTo": "切换到",
    "items": {
      "batch-rename": {
        "title": "AI 批量重命名",
        "description": "根据真实内容批量检查并重命名文件后再应用"
      },
      "monitor": {
        "title": "文件夹监控",
        "description": "监控文件夹，自动重命名新文件"
      },
      "activity": {
        "title": "活动历史",
        "description": "查看最近的重命名并在需要时撤销"
      },
      "statistics": {
        "title": "统计",
        "description": "查看重命名数量、文件夹监控占比、活动以及文件类型趋势"
      },
      "templates": {
        "title": "模板",
        "description": "为 AI 重命名和文件夹监控保存可复用的设置"
      },
      "naming-blocks": {
        "title": "命名块",
        "description": "用 145+ 个现成的命名块从文件内容生成文件名"
      },
      "custom-ai-blocks": {
        "title": "自定义 AI 块",
        "description": "描述 AI 要提取的内容，并作为你自己的命名块复用"
      },
      "tags": {
        "title": "智能标签",
        "description": "生成标签，让文件搜索更快"
      },
      "multilanguage": {
        "title": "多语言",
        "description": "生成 60 多种语言的文件名"
      },
      "custom-prompts": {
        "title": "自定义提示词",
        "description": "用自己的指令控制文件名生成"
      },
      "byok": {
        "title": "BYOK",
        "description": "通过 BYOK 连接自己的 AI 服务商"
      },
      "offline-ai": {
        "title": "离线 AI 重命名",
        "description": "对支持的文件使用 Ollama 私有本地模型"
      }
    }
  },
  "speedComparison": {
    "eyebrow": "速度测试",
    "title": "更快完成。命名更精准。",
    "titleAccent": "命名更精准。",
    "description": "同样的 10 个文件，同样的目标：根据内容重命名。专业工具与通用 AI 智能体——正面对决。",
    "zushLabel": "Zush",
    "zushBadge": "完成",
    "zushCaption": "为文件而生。拖入、获得清晰命名、继续工作。",
    "rivalLabel": "克劳德·科沃克",
    "rivalStatus": "仍在工作",
    "rivalDoneLabel": "终于完成",
    "rivalCaption": "出色的通用智能体——但日常文件工作不是它的强项。",
    "rivalPlaceholderHint": "对比视频即将上线",
    "runningLabel": "运行中",
    "replayLabel": "重新播放",
    "skipToEndLabel": "跳到结尾",
    "disclaimer": "Claude 和 Claude Cowork 是 Anthropic PBC 的商标。Zush 与 Anthropic 没有关联，也未获其背书。"
  },
  "whyZush": {
    "title": "为什么 Zush 优于通用重命名工具",
    "titlePlatform": "为什么 Zush 适合 {os}",
    "description": "AI 批量重命名、自动文件夹监控、撤销、BYOK、离线 AI 和混合格式支持集中在一个桌面应用中",
    "descriptionPlatform": "在 {os} 上提供原生体验、快速重命名、一次付费和更少干扰",
    "nativeEyebrow": "桌面原生体验",
    "nativeEyebrowPlatform": "{os} 原生体验",
    "nativeTitle": "原生、快速、现代",
    "nativeDescription": "Zush 像真正的桌面应用一样：启动快、界面清爽，并且自然融入你的系统。",
    "nativeDescriptionPlatform": "Zush 像真正的 {os} 原生应用一样：启动快、界面清爽，并且自然融入你的系统。",
    "pricingTrustItems": [
      "✨ 免费试用",
      "∞ 无限 PRO",
      "↩️ 14 天退款"
    ],
    "priceEyebrow": "可重复使用的模板",
    "priceTitle": "每个文件夹一个设置",
    "priceDescription": "保存屏幕截图、费用、音乐曲目、客户注释、法律文件、旅行预订和受监控文件夹的命名规则。",
    "priceLabel": "11 内置",
    "speedEyebrow": "非常快",
    "speedTitle": "几秒完成重命名",
    "speedDescription": "整理文件只有在不打断工作时才会坚持下去。拖入文件、检查、应用，然后继续工作。",
    "formatsEyebrow": "100+ 种支持格式",
    "formatsTitle": "截图、PDF、照片、音频、文档和视频",
    "formatsDescription": "支持 AVIF、RAW、Office 文件、EPUB 和 FB2 电子书、PDF、字幕、MP3、M4A、WAV、FLAC 和常见视频格式。",
    "controlEyebrow": "命名块",
    "controlTitle": "为专业工作而生的结构化文件名",
    "controlDescription": "专业人士可以用契合自己工作的命名块自定义文件名模板。AI 会读取每个文件，并用你选择的细节（如客户、日期、发票号、地点或项目）填充这些块。",
    "workflowSteps": [
      "摄影师：日期、客户、拍摄、场景",
      "医生：就诊类型、日期、记录类别",
      "会计：供应商、发票、周期"
    ]
  },
  "useCases": {
    "items": [
      {
        "title": "设计师",
        "description": "不用在几百张截图里翻找，几秒内找到需要的 mockup、UI 元素或灵感参考。"
      },
      {
        "title": "摄影师",
        "description": "轻松整理大型照片库，支持 CR2、NEF、ARW、DNG、RAF、RW2 等专业 RAW 格式。"
      },
      {
        "title": "营销与社媒",
        "description": "让活动方案、导出文件、截图和素材保持有序，并快速找到正确文件。"
      },
      {
        "title": "开发者",
        "description": "文档、Bug 报告和 PR Review 用的截图始终有序，方便查找。"
      },
      {
        "title": "内容创作者",
        "description": "缩略图、b-roll 参考和视觉素材都能清晰整理。"
      },
      {
        "title": "产品经理",
        "description": "PRD、会议记录、表格和相关方资料都变得可快速搜索。"
      }
    ]
  },
  "workflows": {
    "title": "Zush 能重命名什么?",
    "description": "选择一个工作流,每个页面都会展示 Zush 如何按内容为该类型文件命名。",
    "items": {
      "screenshots": {
        "title": "重命名截图",
        "description": "\"Screenshot 2026-07-03\" 会变成能说明屏幕内容的名称。"
      },
      "pdfs": {
        "title": "重命名 PDF 和扫描件",
        "description": "发票、合同和扫描件,按文档中的文字命名。"
      },
      "photos": {
        "title": "重命名照片",
        "description": "RAW、HEIC 和 JPG,按主体和场景命名。"
      },
      "documents": {
        "title": "重命名文档",
        "description": "EPUB 和 FB2 电子书及 Word、Excel、PowerPoint 和 iWork 文件,按主题命名。"
      },
      "design": {
        "title": "重命名设计文件",
        "description": "Figma、Sketch、PSD 和导出文件,按内容命名。"
      },
      "videos": {
        "title": "重命名视频",
        "description": "录屏和视频片段,按画面和上下文命名。"
      },
      "audio": {
        "title": "重命名音频",
        "description": "MP3、WAV 和语音备忘录,按声音和元数据命名。"
      },
      "organizer": {
        "title": "用 AI 整理文件",
        "description": "用可搜索名称清理下载和混合文件夹。"
      },
      "batch": {
        "title": "批量重命名文件",
        "description": "一次处理数百个文件,支持预览和一键撤销。"
      },
      "offline": {
        "title": "离线 AI 重命名",
        "description": "通过 Ollama 使用本地模型,文件绝不离开你的设备。"
      }
    }
  },
  "faqItems": [
    {
      "question": "Zush 是什么？",
      "answer": "Zush 是适用于 Mac 和 Windows 的智能桌面应用，会用 AI 分析图片、视频和支持的文档（包括 PDF），自动生成清晰、有意义的文件名和元数据。"
    },
    {
      "question": "支持哪些文件格式？",
      "answer": "Zush 支持常见图片、音频、视频、截图、EPUB 和 FB2 电子书、PDF、文档、表格、演示文稿、文本文件、CSV、SVG 等格式。"
    },
    {
      "question": "Zush 的 AI 重命名如何工作？",
      "answer": "AI Rename 会使用人工智能根据内容重命名文件。只需把一组文件拖放到 Zush 窗口，应用就会在几秒内完成分析并生成新文件名。应用更改前，你可以预览并单独重新生成某个文件名。非常适合一次性整理截图、设计文件、音频、视频、PDF、iWork 文档和下载文件。"
    },
    {
      "question": "文件夹监控如何工作？",
      "answer": "Zush 会在后台监控你选择的文件夹。新的支持文件出现后，会自动分析内容并实时重命名。"
    },
    {
      "question": "可以重新生成 AI 文件名吗？",
      "answer": "可以。在 AI Rename 区域选择文件并点击重新生成，就能得到新的建议文件名。"
    },
    {
      "question": "可以自定义用于重命名和打标签的 AI 提示词吗？",
      "answer": "可以。你可以写自己的规则来控制文件名和元数据标签，例如要求名称更短、主体靠前，或只使用指定标签。"
    },
    {
      "question": "我的数据安全吗？",
      "answer": "原始文件会留在你的电脑上。云端模式只发送重命名所需的分析内容；离线 AI 模式则通过 Ollama 本地模型在设备上处理。"
    },
    {
      "question": "可以撤销程序做出的修改吗？",
      "answer": "可以。你可以在 Activity 历史里一键恢复原始文件名。"
    },
    {
      "question": "Zush 支持多语言和日期格式吗？",
      "answer": "支持。Zush 可以用 60 多种语言生成文件名，并允许选择你偏好的日期格式。"
    },
    {
      "question": "价格如何计算？",
      "answer": "Zush PRO 有两个方案：Monthly 每月 10 美元，或 One-Time 48 美元。BYOK 和离线 AI 已在 FREE 中提供；两个 PRO 方案都会移除共用的 50 次重命名限制。"
    },
    {
      "question": "什么是 BYOK（Bring Your Own Key）？",
      "answer": "BYOK 允许所有方案的用户连接自己的 Gemini、OpenRouter、OpenAI 或 Claude API key，用于云端重命名。FREE 在所有模式间共享 50 次；PRO 会移除此限制。密钥会保存在本地安全存储中。"
    },
    {
      "question": "是否有一次性购买选项？",
      "answer": "有。除了月付方案，也可以选择 48 USD 一次性购买。BYOK 和离线 AI 已在 FREE 中提供；两个方案都会移除共用的 50 次重命名限制。"
    },
    {
      "question": "支持哪些操作系统？",
      "answer": "Zush 支持 macOS 15 Sequoia 及更新版本，以及 Windows 10 / 11。Mac 可使用签名 dmg、Mac App Store 或 Homebrew，Windows 可从 Microsoft Store 安装。"
    },
    {
      "question": "应用使用哪个 AI 模型？",
      "answer": "Zush 使用先进的多模态 AI 模型来分析图片、视频和支持的文档。具体模型可能会随着速度和准确性优化而更新。"
    },
    {
      "question": "应用可以离线使用吗？",
      "answer": "云端处理需要网络。所有方案的用户都可以安装 Ollama 和兼容模型后启用离线 AI 模式。"
    },
    {
      "question": "支持音频或视频文件吗？",
      "answer": "Zush 3.0 支持 MP4、MOV、M4V、MPEG、3GP、TS、MTS、M2TS、DV、VOB 视频，以及 MP3、M4A、WAV、FLAC、OGG、WebM、MPGA 音频。音频可使用元数据、识别结果和转录上下文。"
    },
    {
      "question": "如果不适合我，可以退款吗？",
      "answer": "可以。Zush 提供 14 天退款保证，详情可查看退款政策。"
    }
  ],
  "showcaseSlides": [
    {
      "files": [
        {
          "before": "IMG_0842.JPG",
          "after": "戴黄帽的小狗.jpg",
          "img": "/images/examples/pug.jpg",
          "type": "image"
        },
        {
          "before": "track_01_final.mp3",
          "after": "低保真钢琴循环_92BPM.mp3",
          "type": "audio"
        },
        {
          "before": "checkout-flow.fig",
          "after": "投资人更新演示.fig",
          "type": "design",
          "label": "如图"
        },
        {
          "before": "budget_export_copy(2).xlsx",
          "after": "产品发布预算.xlsx",
          "type": "sheet"
        },
        {
          "before": "client-brief-scan.pdf",
          "after": "客户创意简报.pdf",
          "type": "pdf"
        },
        {
          "before": "demo_take_02.mov",
          "after": "设置侧边栏演示.mov",
          "img": "/images/examples/videos/settings-sidebar-walkthrough.webp",
          "type": "video"
        }
      ]
    },
    {
      "files": [
        {
          "before": "voice_memo_042.m4a",
          "after": "客户需求访谈.m4a",
          "type": "audio"
        },
        {
          "before": "notes_from_call_FINAL.docx",
          "after": "招聘计划笔记.docx",
          "type": "doc"
        },
        {
          "before": "forecast_2026-03-18_export.xlsx",
          "after": "收入预测.xlsx",
          "type": "sheet"
        },
        {
          "before": "board-review.key",
          "after": "销售启动演示.key",
          "type": "slides",
          "label": "钥匙"
        },
        {
          "before": "IMG_20240812_143052.jpg",
          "after": "海滩上的快乐小狗.jpg",
          "img": "/images/examples/dog.jpg",
          "type": "image"
        },
        {
          "before": "proposal_draft_approved.pdf",
          "after": "网站提案.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "files": [
        {
          "before": "contract_notes_clean.docx",
          "after": "供应商合同笔记.docx",
          "type": "doc"
        },
        {
          "before": "episode_intro_take2.wav",
          "after": "播客开场采访.wav",
          "type": "audio"
        },
        {
          "before": "pipeline_export_march.xlsx",
          "after": "三月销售管线.xlsx",
          "type": "sheet"
        },
        {
          "before": "brand-system.sketch",
          "after": "营销活动评审演示.sketch",
          "type": "design",
          "label": "草图"
        },
        {
          "before": "scan_2026_03_19.pdf",
          "after": "已签署服务协议.pdf",
          "type": "pdf"
        },
        {
          "before": "PXL_20240720_091234.jpg",
          "after": "明亮黄色花朵.jpg",
          "img": "/images/examples/flowers.jpg",
          "type": "image"
        }
      ]
    }
  ]
} satisfies HomeCopy;

export const professions = {
  "accountants": {
    "path": "/for-accountants",
    "seo": {
      "title": "通过 AI 文件重命名进行会计凭证管理",
      "description": "Zush 读取发票、收据、报表、税表和扫描件，然后按照您的约定命名每个文件。为每个客户端构建 Template，预览每批，并随时撤消。使用不计量的 Cloud AI、您自己的提供商密钥或本地离线 AI。"
    },
    "pageTitle": "会计凭证管理",
    "hero": {
      "eyebrow": "适合会计师的 AI 文件重命名器",
      "titleLead": "将会计文件重命名为",
      "titleAccent": "供应商、日期和编号",
      "subtitle": "Zush 读取发票、收据、报表、税表和扫描件，然后按照您的约定命名每个文件。为每个客户端构建 Template，预览每批，并随时撤消。使用不计量的 Cloud AI、您自己的提供商密钥或本地离线 AI。",
      "trustLine": [
        "Unmetered paid plans",
        "Private Offline AI and BYOK",
        "Preview and undo every batch"
      ],
      "photoAlt": "会计师在明亮办公室的台式电脑上审查财务文件",
      "downloadMac": "下载 Mac 版",
      "downloadWindows": "下载 Windows 版",
      "trustAria": "为什么会计凭证管理团队使用 Zush"
    },
    "demoLabel": "Zush 重命名发票、收据和会计凭证的文件夹",
    "audiences": {
      "eyebrow": "为谁而设",
      "title": "专为会计师、簿记员和客户会计团队打造",
      "description": "相同的文件重命名工作流程适合经常性的客户接收、收据处理、对账支持和月末结算。",
      "items": [
        {
          "title": "小型会计实务",
          "description": "即使发票是通过电子邮件、门户、扫描仪和共享驱动器到达的，每个客户的收货文件夹也应遵循自己的惯例。",
          "imageAlt": "小型会计实践：即使发票通过电子邮件、门户、扫描仪和共享驱动器到达，也使每个客户的收货文件夹保持其自己的惯例。"
        },
        {
          "title": "独立簿记员",
          "description": "在对账开始之前，将每周一堆收据和下载内容转入按商家、日期、金额和类别命名的文件中。",
          "imageAlt": "独立簿记员：在对账开始之前，将每周一堆收据和下载内容转入按商家、日期、金额和类别命名的文件中。"
        },
        {
          "title": "客户会计和 AP 团队",
          "description": "使用共享的 Templates，以便每个人都以相同的方式命名账单、报表、密切支持和导出，而无需记住规则。",
          "imageAlt": "客户会计和 AP 团队：使用共享的 Templates，以便每个人都以相同的方式命名账单、报表、密切支持和导出，而无需记住规则。"
        }
      ]
    },
    "fields": {
      "title": "选择每个会计文件名的字段",
      "description": "Zush 读取每个文档的可见内容。您的 Template 选择最终名称中使用的供应商、日期、发票编号、金额、类别、纳税期或自定义字段。",
      "instruction": "选择一个字段以查看结果",
      "ariaLabel": "会计字段 Zush 读取",
      "hint": "建议的文件名",
      "items": [
        {
          "label": "文件日期",
          "before": "download (7).pdf",
          "after": "2026-06-12 – Acme 供应 – INV-10234",
          "emphasis": "2026-06-12"
        },
        {
          "label": "供应商/客户",
          "before": "invoice.pdf",
          "after": "2026-06-12 – Acme 供应 – INV-10234"
        },
        {
          "label": "发票号码",
          "before": "attachment.pdf",
          "after": "2026-06-12 – Acme 供应 – INV-10234",
          "emphasis": "INV-10234"
        },
        {
          "label": "数量",
          "before": "bill (3).pdf",
          "after": "2026-06-12 – Acme 供应 – 1,204 美元",
          "emphasis": "1,204 美元"
        },
        {
          "label": "货币",
          "before": "scan_0042.pdf",
          "after": "2026-06-12 – Acme 供应 – 1,204 美元",
          "emphasis": "美元"
        },
        {
          "label": "费用类别",
          "before": "IMG_2041.jpg",
          "after": "2026-06-03 – Whole Foods – 膳食 – 84 美元",
          "emphasis": "膳食"
        },
        {
          "label": "纳税年度/期间",
          "before": "scan.pdf",
          "after": "2025 – 1099-NEC – 里维拉咨询"
        },
        {
          "label": "付款状态",
          "before": "invoice_copy.pdf",
          "after": "Vertex GmbH – INV-0088 – 付费"
        },
        {
          "label": "报表期限",
          "before": "statement_final.pdf",
          "after": "2026 年 5 月 – 第一份国家 – 银行对账单"
        },
        {
          "label": "账户/实体",
          "before": "export (1).xlsx",
          "after": "2026 年第二季度 – Vertex GmbH – 费用摘要"
        },
        {
          "label": "自定义字段——用简单的语言描述它",
          "before": "doc.pdf",
          "after": "2026-06-08 – W-9 – Rivera 咨询",
          "emphasis": "W-9"
        }
      ]
    },
    "privacy": {
      "eyebrow": "处理和隐私",
      "title": "选择财务文件的处理方式",
      "description": "使用托管云 AI 快速启动，使用 BYOK 通过公司的提供商帐户进行分析，或使用本地离线 AI 在计算机上保留受支持的文档分析。",
      "items": [
        {
          "title": "具有本地模型的离线人工智能",
          "description": "本地 Ollama 模型分析存储它们的 Mac 或 Windows PC 上支持的发票、收据、报表和扫描件。文件内容不会发送到 Zush 或第三方 AI 提供商。",
          "badge": "文件保留在机器上",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "您的提供商帐户 BYOK",
          "description": "通过您公司控制的 AI 提供商帐户和 API 密钥进行路由分析。密钥保留在安全的本地存储中，您的团队选择用于客户工作的提供商和模型。",
          "badge": "您的密钥和帐户",
          "kind": "byok"
        },
        {
          "title": "托管云人工智能",
          "description": "当优先考虑便利性时，请使用内置管理模式。付费计划不计量，因此定期接收和积压清理不会消耗每个文档的积分。",
          "badge": "最快的设置",
          "kind": "cloud-ai"
        }
      ],
      "note": "选择符合您公司和客户政策的处理模式。在每种模式下，Zush 都会就地重命名文件并且不存储它们。",
      "docsLinkLabel": "了解模式如何处理数据"
    },
    "workflow": {
      "eyebrow": "工作流程",
      "title": "自动重命名客户端接收文件夹中的文件",
      "description": "设置客户端 Template，监视接收文件夹，并在发生任何更改之前检查每个建议的批次。",
      "items": [
        {
          "title": "将文件路由到接收文件夹",
          "description": "电子邮件附件、门户下载、扫描仪输出和收据照片可以存放在每个客户或实体的一个受监控文件夹中。"
        },
        {
          "title": "查看客户端的姓名 Template",
          "description": "选择属于文件名的日期、供应商、编号、金额、类别或自定义字段，然后在应用之前读取建议的批次。"
        },
        {
          "title": "应用撤消并保持监控",
          "description": "重命名历史记录可以恢复批次。保留分配给该文件夹的 Template，以便新的源文档到达时已经按照相同的约定命名。"
        }
      ],
      "links": [
        {
          "label": "逐步构建发票 Template",
          "href": "/docs/templates/invoices"
        },
        {
          "label": "发票重命名的工作原理",
          "href": "/rename-invoices-with-ai"
        },
        {
          "label": "组织接收到归档的工作流程",
          "href": "/blog/how-to-organize-invoices-and-receipts"
        }
      ]
    },
    "documents": {
      "eyebrow": "支持的会计文件",
      "title": "会计凭证Zush可自动重命名",
      "description": "使用单独的 Templates 来存储应付账款、收据、税务文件和密切支持。每个工作流程都保留自己的字段和命名模式，而不更改原始内容。",
      "items": [
        {
          "title": "供应商发票和账单",
          "description": "按发票日期、供应商、发票编号、金额、货币或客户约定所需的字段命名 AP 文档。",
          "example": "2026-06-12 – Acme 供应 – INV-10234 – 1,204 美元.pdf"
        },
        {
          "title": "收据和费用证据",
          "description": "读取 PDF、JPG 和 HEIC 收据，然后添加用 Custom AI Block 描述的商家、日期、金额和类别。",
          "example": "2026-06-03 – Whole Foods – 膳食 – 84 USD.jpg"
        },
        {
          "title": "银行和卡对账单",
          "description": "将通用下载转换为按机构、账户标签和报表期间命名的报表，以便在对账期间更快地检索。",
          "example": "2026 年 5 月 – 首次全国 – 运营 – 声明.pdf"
        },
        {
          "title": "税务表格和客户文件",
          "description": "按表格类型、纳税年度、发行人或实体命名 W-9、1099、税务通知和支持扫描，而无需键入每个文件名。",
          "example": "2025 – 1099-NEC – Rivera Consulting.pdf"
        },
        {
          "title": "工资单和结算报告",
          "description": "按期间、实体、报告类型和审批状态保持工资登记册、日记帐支持和月度报告一致。",
          "example": "2026 年 5 月 – Vertex GmbH – 薪资报告 – FINAL.pdf"
        },
        {
          "title": "电子表格和导出",
          "description": "按客户、期间和内容重命名费用导出、对账和工作簿可交付成果，以便在移交后可以搜索最新文件。",
          "example": "2026 年第二季度 – Vertex GmbH – 费用摘要.xlsx"
        }
      ]
    },
    "testimonialsTitle": "会计团队如何运用 Zush 进行工作",
    "testimonialsDescription": "基于常见会计凭证模式的说明性工作流程。",
    "testimonialsRatingAria": "5 星（满分 5 星）",
    "testimonials": [
      {
        "name": "Elena Park",
        "role": "会计执业所有者",
        "quote": "每个客户端的文件名规则略有不同。 Templates 让这些规则远离我的脑海，我可以在应用之前检查整个提议的批次。"
      },
      {
        "name": "Marco Ruiz",
        "role": "独立簿记员",
        "quote": "消耗的时间不是一张收据，而是一个月的 IMG 文件和下载。按日期、商家、金额和类别命名它们，为我提供了一个可用的接收文件夹。"
      },
      {
        "name": "Nia Brown",
        "role": "客户会计主管",
        "quote": "我们对需要保留在工作站上的客户端文件夹使用离线 AI。在任何人应用批次之前，预览都会捕捉到奇怪的扫描。"
      }
    ],
    "faq": {
      "title": "会计文件重命名，已解答",
      "description": "客户端 Templates、文件夹监控、本地离线 AI、BYOK、预览、撤消和不限流量重命名如何适应会计凭证工作流程。",
      "items": [
        {
          "question": "Zush是否取代会计凭证管理软件？",
          "answer": "不。Zush 是现有会计堆栈周围的文件命名层。它会就地重命名发票、收据、报表、扫描、下载和导出，但不会存储客户记录、控制访问、批准账单、过帐交易或替换文档管理系统、QuickBooks、Xero 或您公司的门户。"
        },
        {
          "question": "Zush 如何帮助会计师和簿记员？",
          "answer": "Zush 读取发票、收据、报表、税表、电子表格和扫描件，然后建议根据供应商、日期、发票编号、金额、货币和类别等字段构建的文件名。您可以在应用批处理之前对其进行检查，并且之后仍可以进行撤消操作。"
        },
        {
          "question": "每个客户端可以有不同的命名约定吗？",
          "answer": "是的。为每个客户、实体或工作流程创建一个可重复使用的 Template。 Template 控制文件名结构、日期格式、Naming Blocks 和任何 Custom AI Block 字段，例如费用类别、帐户代码或审批状态。"
        },
        {
          "question": "Zush 可以监视客户端接收文件夹吗？",
          "answer": "是的。将 Template 分配给文件夹监控，Zush 可以在新电子邮件保存、门户下载或扫描仪输出到达时对其进行处理。重命名历史记录使应用的批次保持可逆。"
        },
        {
          "question": "它适用于扫描的发票和收据照片吗？",
          "answer": "是的。 Zush 使用 AI 视觉来读取纯图像 PDF 和支持的图像格式，因此扫描件和收据照片可以遵循与原生数字文档相同的约定，无需单独的 OCR 步骤。"
        },
        {
          "question": "客户财务数据是否保密？",
          "answer": "文件被就地重命名并且不被 Zush 存储。为了进行分析，可以通过提供商帐户选择托管云 AI、BYOK 并锁定您的公司控制权，或者使用本地 Ollama 模型选择离线 AI，以便支持的文件分析保留在计算机上。"
        },
        {
          "question": "Zush是否连接到QuickBooks或Xero？",
          "answer": "Zush 围绕会计软件组织文件层 - 下载、电子邮件附件、扫描、导出和支持文档。它不会将交易发布到 QuickBooks、Xero 或其他分类账中，也不会修改其中的记录。"
        },
        {
          "question": "Zush 按文件收费吗？",
          "answer": "不需要。付费计划包括无限重命名，而不是按文件积分，因此您可以在更改 Template 后重新运行文件夹，而无需再次为相同的文档付费。前 50 个重命名可以免费评估。"
        }
      ]
    },
    "guides": {
      "title": "会计凭证指南",
      "description": "发票、收据、税表以及 QuickBooks 或 Xero 周围文件的命名约定和接收工作流程。",
      "slugs": [
        "invoice-file-naming-convention",
        "automatically-rename-invoices-ai",
        "how-to-organize-invoices-and-receipts",
        "rename-invoices-for-quickbooks-xero"
      ]
    },
    "finalCta": {
      "title": "在一个客户端接收文件夹上尝试 Zush",
      "subtitle": "添加一批复制的发票或收据，读取建议的名称，如果 Template 需要另一次通行证，则撤消重命名。"
    }
  },
  "medical": {
    "path": "/for-medical",
    "seo": {
      "title": "具有离线 AI 文件重命名功能的医疗保健文档管理",
      "description": "Zush 处理医疗保健文档管理的文件名层：它使用您的实践选择的字段重命名扫描的医疗记录、传真、实验室报告和摄入表格。它与您的 EHR 一起使用本地离线 AI 或组织控制的 BYOK，以及批量预览和撤消。"
    },
    "pageTitle": "医疗文件管理",
    "hero": {
      "eyebrow": "医疗实践的医疗保健文档管理",
      "titleLead": "将医疗保健文档重命名为",
      "titleAccent": "MRN、日期和类型",
      "subtitle": "Zush 处理医疗保健文档管理的文件名层：它使用您的实践选择的字段重命名扫描的医疗记录、传真、实验室报告和摄入表格。它与您的 EHR 一起使用本地离线 AI 或组织控制的 BYOK，以及批量预览和撤消。",
      "trustLine": [
        "Local Offline AI",
        "Organization-controlled BYOK",
        "Preview and undo every batch"
      ],
      "photoAlt": "医生使用台式计算机整理扫描的医疗记录",
      "downloadMac": "下载 Mac 版",
      "downloadWindows": "下载 Windows 版",
      "trustAria": "为什么医疗文档管理团队使用 Zush"
    },
    "demoLabel": "Zush 重命名扫描医疗记录的文件夹",
    "audiences": {
      "eyebrow": "为谁而设",
      "title": "专为小型医疗机构和文档较多的团队而设计",
      "description": "相同的文件重命名工作流程适用于临床接收、前台扫描和医疗计费，而无需更换 EHR。",
      "items": [
        {
          "title": "单独执业和诊所业主",
          "description": "当天的摄入量一夜之间就变成了一组归档记录——由 MRN、服务日期和记录类型命名，无需任何人打字。",
          "imageAlt": "单独执业和诊所业主：当天的摄入量一夜之间就变成了一组归档记录——由 MRN、服务日期和记录类型命名，无需任何人打字。"
        },
        {
          "title": "业务经理和前台",
          "description": "每个扫描人员都参加一次会议，无需培训。 Template 持有规则；工作人员只需将文件放入即可。",
          "imageAlt": "业务经理和前台：每个扫描人员都参加一次会议，无需培训课程。 Template 持有规则；工作人员只需将文件放入即可。"
        },
        {
          "title": "医疗账单",
          "description": "EOB、ERA 和索赔信件以帐号和付款人命名，因此将汇款与索赔进行匹配不再是一件麻烦事。",
          "imageAlt": "医疗账单：EOB、ERA 和索赔信函以帐号和付款人命名，因此将汇款与索赔进行匹配不再是一件麻烦事。"
        }
      ]
    },
    "fields": {
      "title": "医疗记录字段",
      "description": "选择每个医疗记录文件名的字段",
      "instruction": "选择一个字段以查看结果",
      "ariaLabel": "医疗领域 Zush 读取",
      "hint": "建议的文件名",
      "footnote": "Custom AI Blocks 可以提取您描述的任何字段 - “订购医生”、“程序代码”或“签署日期”。您的 Template 决定哪些字段成为文件名的一部分。",
      "filenamePattern": "{内部 ID} – {服务日期} – {文件类型}",
      "filenameExamples": [
        "MRN-48211 – 2026-06-12 – Lab Results.pdf",
        "MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf",
        "MRN-51402 – 2026-06-05 – Intake Form.pdf"
      ],
      "items": [
        {
          "label": "MRN / 患者 ID",
          "before": "Scan0001.pdf",
          "after": "MRN-48211 – 2026-06-12 – 实验室结果",
          "emphasis": "MRN-48211"
        },
        {
          "label": "服务日期",
          "before": "Scan0002.pdf",
          "after": "MRN-48211 – 2026-06-12 – 实验室结果",
          "emphasis": "2026-06-12"
        },
        {
          "label": "记录类型",
          "before": "fax_received.pdf",
          "after": "MRN-30177 – 2026-05-30 – 胸部 X 光检查"
        },
        {
          "label": "推荐提供者",
          "before": "referral.pdf",
          "after": "MRN-30177 – 2026-06-02 – 陈博士",
          "emphasis": "陈博士"
        },
        {
          "label": "专业",
          "before": "consult_note.pdf",
          "after": "MRN-30177 – 2026-06-02 – 心脏病学",
          "emphasis": "心脏病学"
        },
        {
          "label": "付款人/保险",
          "before": "eob.pdf",
          "after": "ACC-2210 – 2026-06-04 – 蓝十字",
          "emphasis": "蓝十字"
        },
        {
          "label": "宣称 ＃",
          "before": "Scan_0052.pdf",
          "after": "ACC-2210 – 2026-06-04 – 索赔 88213"
        },
        {
          "label": "数量",
          "before": "statement.pdf",
          "after": "ACC-2210 – 2026-06-04 – 安泰保险 $1,240"
        },
        {
          "label": "程序代码",
          "before": "procedure.pdf",
          "after": "MRN-51402 – 2026-06-05 – CPT 93000",
          "emphasis": "CPT 93000"
        },
        {
          "label": "文件日期",
          "before": "outside_records.pdf",
          "after": "MRN-51402 – 2026-06-05 – 外部记录",
          "emphasis": "2026-06-05"
        },
        {
          "label": "自定义字段——用简单的语言描述它",
          "before": "doc_20260608.pdf",
          "after": "MRN-51402 – 2026-06-05 – 同意书",
          "emphasis": "同意书"
        }
      ]
    },
    "privacy": {
      "eyebrow": "私人加工",
      "title": "医疗文件的离线和 BYOK 处理",
      "description": "使用本地 Ollama 模型运行受支持的分析，或通过 AI 提供商帐户和关键组织控制进行路由。 Zush 就地重命名文件并且不存储它们。",
      "items": [
        {
          "title": "具有本地模型的离线人工智能",
          "description": "本地 Ollama 模型分析存储它们的 Mac 或 Windows PC 上支持的扫描和文档。文件内容不会发送到 Zush 或第三方 AI 提供商。",
          "badge": "推荐用于记录",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "组织控制 BYOK",
          "description": "通过您的组织控制的 AI 提供商帐户和 API 密钥进行路由分析。密钥保留在安全的本地存储中，您的团队选择用于工作流程的提供商和模型。",
          "badge": "您的提供商帐户",
          "kind": "byok"
        },
        {
          "title": "托管云人工智能",
          "description": "托管云处理可用于普通文件。对于医疗文档工作流程，请根据您的团队遵循的策略使用离线 AI 或您组织的 BYOK 设置。",
          "badge": "对于一般文件",
          "kind": "cloud-ai"
        }
      ],
      "note": "当文档内容必须保留在计算机上时，请使用离线 AI。当您的组织通过自己的提供商帐户和密钥路由分析时，请使用 BYOK。在每种模式下，Zush 都会就地重命名文件并且不存储它们。",
      "docsLinkLabel": "了解模式如何处理数据"
    },
    "workflow": {
      "eyebrow": "工作流程",
      "title": "自动重命名扫描仪和传真文件夹中的记录",
      "description": "设置一份医疗记录 Template，监控摄入文件夹，并在发生任何更改之前审查每个建议批次。",
      "items": [
        {
          "title": "将 Zush 指向扫描文件夹",
          "description": "文件夹监控监视扫描仪或传真软件写入的任何内容 - 接收文件夹、共享驱动器、传真假脱机。"
        },
        {
          "title": "审查建议的名称",
          "description": "预览是一种控制，而不是一种形式：读取批次，确认每个文件名中仅出现批准的字段，然后重新生成任何看起来错误的内容。"
        },
        {
          "title": "应用并撤消",
          "description": "重命名历史记录会恢复任何批次。约定更改是重新运行，而不是清理项目。"
        }
      ],
      "links": [
        {
          "label": "逐步构建记录Template",
          "href": "/docs/templates/medical-records"
        },
        {
          "label": "扫描文档重命名的工作原理",
          "href": "/rename-scanned-documents"
        },
        {
          "label": "组织小型扫描工作流程",
          "href": "/blog/how-to-organize-scanned-medical-records-small-practice"
        }
      ]
    },
    "documents": {
      "eyebrow": "支持的医疗文件",
      "title": "医疗文件Zush可自动重命名",
      "description": "使用一台 Template 进行临床记录，另一台用于计费文书工作。每个流程都保留自己的字段和命名模式，而不更改原始文档。",
      "items": [
        {
          "title": "扫描的患者记录",
          "description": "将扫描仪输出和存档导出转换为根据内部 ID、服务日期和文档类型构建的一致文件名。",
          "example": "MRN-48211 – 2026-06-12 – 进度说明.pdf"
        },
        {
          "title": "实验室报告",
          "description": "读取纯图像实验室 PDF，并按标识符、服务日期和报告类型命名，无需单独的 OCR 工作流程。",
          "example": "MRN-48211 – 2026-06-12 – 实验室结果.pdf"
        },
        {
          "title": "推荐和传真文件",
          "description": "识别传入的推荐、咨询信和传真记录，然后应用与其余实践相同的命名模式。",
          "example": "MRN-30177 – 2026-06-02 – 转诊 – Cardiology.pdf"
        },
        {
          "title": "摄入和同意书",
          "description": "从前台扫描中提取表格类型和签名日期，以便每个接收批次都遵循一个可重复使用的 Template。",
          "example": "MRN-51402 – 2026-06-05 – 同意书.pdf"
        },
        {
          "title": "成像和咨询报告",
          "description": "按您的团队稍后检索时使用的字段命名成像报告、专家注释和外部记录。",
          "example": "MRN-30177 – 2026-05-30 – 成像 – 胸部 X 光检查.pdf"
        },
        {
          "title": "EOB、ERA 和索赔信函",
          "description": "使用单独的账单 Template 来存储付款人文件、账户参考、汇款和索赔信函。",
          "example": "ACC-2210 – 2026-06-04 – ERA – Aetna.pdf"
        }
      ]
    },
    "testimonialsTitle": "临床医生怎么说",
    "testimonialsDescription": "来自以归档记录为生的人的反馈。",
    "testimonialsRatingAria": "5 星（满分 5 星）",
    "testimonials": [
      {
        "name": "Dr. Amir Khan",
        "role": "诊所老板",
        "quote": "我保留了一个单独的去识别化档案以供后续笔记使用。借助离线人工智能，Zush 可以按访问日期和记录类型命名扫描。这不是我盲目运行的东西，但它减少了打字的时间。"
      },
      {
        "name": "Renata Alves",
        "role": "实践经理",
        "quote": "前台将所有内容扫描到一个文件夹中，到了晚上，就会有四百个文件，称为“扫描某事”。现在它以 MRN 和日期命名。在申请之前我仍然会阅读预览列表——这是让我感到满意的部分。"
      },
      {
        "name": "Dana Whitfield",
        "role": "医疗账单员",
        "quote": "将汇款与索赔相匹配是我一周中最糟糕的时刻。通过账号和付款人命名 EOB 就完成了大部分工作。几次扫描返回通用结果，我手动修复它们。"
      }
    ],
    "pricingPreface": "一张许可证，不计量。没有每个文档的积分 - 在模板更改后免费重新运行文件夹。",
    "faq": {
      "title": "病历文件重命名，已解答",
      "description": "本地模型、组织控制的 BYOK、扫描仪文件夹、Templates、预览和撤消如何适应医疗文档工作流程。",
      "items": [
        {
          "question": "Zush 是否符合 HIPAA 要求？",
          "answer": "Zush 并不声称该应用程序本身使工作流程符合 HIPAA 标准。离线人工智能将受支持的文件分析保留在工作站上，但合规性还取决于设备安全性、访问控制、备份、保留、文件名策略和组织的程序。在处理受保护的健康信息之前，让您的隐私或安全主管检查完整的工作流程。"
        },
        {
          "question": "Zush 可以重命名患者记录而不将其上传到任何地方吗？",
          "answer": "是的。在离线 AI 模式下，Zush 在 Mac 或 Windows 上使用本地 Ollama 模型分析支持的文件 - 记录完全在计算机上读取和重命名。文件内容不会发送到 Zush 或第三方 AI 提供商，并且 Zush 不会存储文件。"
        },
        {
          "question": "诊所应如何构建病历文件名？",
          "answer": "实用的起始模式是内部 ID、服务日期和文档类型。您的组织决定确切的命名策略，并且 Zush Template 一致地应用它。保留不需要出现在文档内的文件夹列表中的详细信息，并在应用之前检查建议的批次。"
        },
        {
          "question": "它可以处理扫描的记录和传真吗？",
          "answer": "是的。大多数记录作为扫描仪或传真输出输入，没有文本层。 Zush 使用 AI 视觉读取页面图像（无需单独的 OCR 通行证），并从页面上打印的内容中提取标识符、服务日期和记录类型。"
        },
        {
          "question": "Zush 可以读取手写体或质量较差的扫描件吗？",
          "answer": "典型的办公室扫描件——打印的实验室报告、传真转介、带有手写字段的表格——都可以可靠地读取。密集的手写笔记和严重倾斜或模糊的页面则不然：它们会以通用名称而不是错误的名称返回，并且预览是您在应用任何内容之前捕获它们的地方。"
        },
        {
          "question": "Zush 是否会取代医疗文档管理软件或我们的 EHR？",
          "answer": "不会。Zush 处理 EHR 或文档管理系统周围的文件名层 - 扫描仪和传真输出、导出的记录、等待导入的附件以及存档文件夹。它不会连接、读取或修改 EHR 本身。如果文档位于 EHR 内部，则不涉及 Zush；如果它位于文件夹中，则 Zush 可以为其命名。"
        },
        {
          "question": "医疗实践应该使用哪种人工智能模式？",
          "answer": "当受支持的文档分析必须保留在计算机上时，请使用离线 AI；它在 Mac 或 Windows 上运行本地 Ollama 模型。当您的组织希望通过其自己的 AI 提供商帐户和 API 密钥进行分析时，请使用 BYOK。您的团队选择与其内部政策相匹配的模式。"
        },
        {
          "question": "当我们改变系统后，命名约定仍然有意义吗？",
          "answer": "这就是将标识符、服务日期和记录类型放入文件名本身的原因。记录的寿命比生成它们的软件要长：导出、迁移或存档驱动器会删除赋予这些文件含义的数据库，而自描述的文件名会保留下来。以这种方式命名的文件夹十年后仍然可以通过文件浏览器读取。"
        },
        {
          "question": "扫描仪文件夹可以自动重命名吗？",
          "answer": "是的。将 Template 分配给扫描仪或传真软件保存到的文件夹上的文件夹监控，每个新文档在到达时都会按照您的惯例重命名 - 具有预览批次和重命名历史记录以供恢复。"
        }
      ]
    },
    "guides": {
      "title": "医疗文件组织指南",
      "description": "适用于处理 EHR 之外的记录的小型诊所的实用扫描仪、命名和隐私工作流程。",
      "slugs": [
        "how-to-organize-scanned-medical-records-small-practice",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "在一个扫描文件夹上尝试 Zush",
      "subtitle": "将其指向昨天的摄入量，阅读建议的名称，如果您不喜欢它们，则撤消该批次。离线人工智能将整个运行过程保留在您的机器上。"
    }
  },
  "photographers": {
    "path": "/for-photographers",
    "seo": {
      "title": "适合摄影师和摄像师的 AI 文件重命名器",
      "description": "Zush 读取 RAW 照片、JPEG 和视频剪辑，然后根据每个文件中已有的内容和元数据建议可搜索的文件名。为您的工作室构建一个命名为 Template 的文件，检查该批次，并将原始媒体保留在原来的位置。"
    },
    "pageTitle": "适合摄影师和摄像师的 AI 文件重命名",
    "hero": {
      "eyebrow": "对于摄影师和摄像师",
      "titleLead": "将每个镜头重命名为",
      "titleAccent": "项目、场景和拍摄",
      "subtitle": "Zush 读取 RAW 照片、JPEG 和视频剪辑，然后根据每个文件中已有的内容和元数据建议可搜索的文件名。为您的工作室构建一个命名为 Template 的文件，检查该批次，并将原始媒体保留在原来的位置。",
      "trustLine": [
        "RAW, photo, and video formats",
        "Custom naming Templates",
        "Preview and undo every batch"
      ],
      "photoAlt": "摄影师和摄像师在日光工作室一起审查拍摄结果",
      "downloadMac": "下载 Mac 版",
      "downloadWindows": "下载 Windows 版",
      "trustAria": "为什么摄影师和摄像师团队的ai文件重命名使用Zush"
    },
    "demoLabel": "Zush 重命名照片和视频剪辑的混合文件夹",
    "audiences": {
      "eyebrow": "对于创意团队",
      "title": "从卡摄取到客户交付，保持每个文件名有用",
      "description": "在剧照、素材、导出和存档中使用相同的命名层，而无需替换您的团队已经知道的创意工具。",
      "items": [
        {
          "title": "肖像、婚礼和活动摄影师",
          "description": "用项目、日期、主题、时刻和地点替换重复的相机计数器——在剔除之前有用，几年后仍然可以理解。",
          "imageAlt": "肖像、婚礼和活动摄影师：用项目、日期、主题、时刻和地点替换重复的相机计数器——在剔除之前有用，几年后仍然可以理解。"
        },
        {
          "title": "摄像师和编辑",
          "description": "将通用的摄像机剪辑转换为可搜索的花絮、采访、地点、场景，并在编辑开始之前命名。",
          "imageAlt": "摄像师和剪辑师：将通用摄像机剪辑转换为可搜索的花絮、采访、地点、场景，并在剪辑开始之前命名。"
        },
        {
          "title": "工作室和制作团队",
          "description": "为助理、制作人和编辑提供一种用于摄取文件夹、活动项目、可交付成果和档案的共享约定。",
          "imageAlt": "工作室和制作团队：为助理、制作人和编辑提供一种共享约定，用于提取文件夹、活动项目、可交付成果和档案。"
        }
      ]
    },
    "fields": {
      "title": "工作室命名字段",
      "description": "根据您的工作室搜索的详细信息构建文件名",
      "instruction": "点击字段即可查看结果",
      "ariaLabel": "照片和视频字段 Zush 读取",
      "hint": "建议的文件名",
      "items": [
        {
          "label": "拍摄日期",
          "before": "DSC_4831.NEF",
          "after": "2026-06-14 – 奥尔特加婚礼 – 仪式",
          "emphasis": "2026-06-14"
        },
        {
          "label": "客户/项目",
          "before": "IMG_7294.CR3",
          "after": "奥尔特加婚礼 – 肖像 – 庭院",
          "emphasis": "奥尔特加婚礼"
        },
        {
          "label": "主题",
          "before": "DSCF1042.RAF",
          "after": "玛雅·陈 – 工作室肖像 – Look 02"
        },
        {
          "label": "场景/地点",
          "before": "A001_C003.mov",
          "after": "River House – 黄金时段外观 – Take 03",
          "emphasis": "黄金时段外观"
        },
        {
          "label": "射击类型",
          "before": "MVI_8842.MP4",
          "after": "Northwind 活动 – 产品特写 – 拍摄 02",
          "emphasis": "产品特写"
        },
        {
          "label": "拿",
          "before": "C0048.MOV",
          "after": "创始人访谈 – 摄像机 A – 拍摄 04"
        },
        {
          "label": "相机",
          "before": "A003_0614AB.MOV",
          "after": "创始人访谈 – 摄像机 A – 拍摄 03"
        },
        {
          "label": "方向",
          "before": "IMG_9107.ARW",
          "after": "沿海社论 – 纵向 – 垂直"
        },
        {
          "label": "交付类型",
          "before": "final_final_03.mp4",
          "after": "Northwind 发布 – 社交剪辑 – 9x16",
          "emphasis": "社交剪辑"
        },
        {
          "label": "自定义字段——用简单的语言描述它",
          "before": "DSC_4908.NEF",
          "after": "奥尔特加婚礼 – 第一支舞 – 选择",
          "emphasis": "第一支舞"
        }
      ]
    },
    "privacy": {
      "eyebrow": "处理和隐私",
      "title": "选择如何分析每个客户的拍摄",
      "description": "从托管 AI 开始，连接工作室控制的提供商帐户，或在本地运行受支持的视觉分析以进行私人和未发布的工作。",
      "items": [
        {
          "title": "快速开始使用 Cloud AI",
          "description": "使用 Zush 管理的 AI 分析视觉预览和采样视频帧，然后在将其应用于拍摄之前检查建议的名称。",
          "badge": "最快的设置",
          "badgeTone": "success",
          "kind": "cloud-ai"
        },
        {
          "title": "使用您自己的AI帐户",
          "description": "连接您的工作室已使用的提供商和模型。当您控制提供商帐户时，您的 API 密钥保留在安全的本地存储中。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "让客户在机器上工作",
          "description": "当未发布的活动、私人活动或客户镜头应保留在本地时，在 Mac 或 Windows 上使用本地 Ollama 模型运行受支持的视觉分析。",
          "badge": "离线人工智能",
          "kind": "offline-ai"
        }
      ],
      "note": "Zush 会就地重命名媒体，并且不会成为新的资源库。为每个工作流程选择处理模式，保留现有文件夹结构，并在需要恢复批次时使用重命名历史记录。",
      "docsLinkLabel": "了解模式如何处理数据"
    },
    "workflow": {
      "eyebrow": "工作流程",
      "title": "批量重命名拍摄，无需重建工作流程",
      "description": "保留 Lightroom、Capture One、您的 NLE 和您的存储布局。在媒体已放置的文件夹周围添加一个可重复使用的命名步骤。",
      "items": [
        {
          "title": "建立工作室命名规则",
          "description": "将日期、客户、项目、主题、地点、场景、镜头类型、镜头、摄像机以及您的团队需要的任何自定义字段合并到一个可重复使用的 Template 中。"
        },
        {
          "title": "在摄取或存档文件夹上运行它",
          "description": "添加 RAW 照片、JPEG 和视频剪辑的复制拍摄、卡摄取、导出文件夹或混合存档，而无需移动源媒体。"
        },
        {
          "title": "审查、应用和重用",
          "description": "将建议的名称作为一批读取，更正异常，应用可撤消的情况，然后在下一个作业中重复使用相同的 Template。"
        }
      ],
      "links": [
        {
          "label": "使用 AI 重命名照片",
          "href": "/rename-photos-with-ai"
        },
        {
          "label": "使用 AI 重命名视频",
          "href": "/rename-videos-with-ai"
        },
        {
          "label": "构建可重用命名 Template",
          "href": "/docs/templates"
        }
      ]
    },
    "documents": {
      "eyebrow": "支持的媒体",
      "title": "静态图片、素材和可交付成果的一种命名工作流程",
      "description": "使用单独的 Templates 来捕获媒体和导出，或在混合项目文件夹中应用一种工作室约定。",
      "items": [
        {
          "title": "RAW 照片拍摄",
          "description": "将相机计数器转换为包含项目、日期、主题、场景或位置的名称，同时保留原始的 RAW 扩展名。",
          "example": "2026-06-14 – 奥尔特加婚礼 – 仪式 – First Kiss.nef"
        },
        {
          "title": "肖像和活动画廊",
          "description": "在剔除、交付或长期存档之前，对 JPEG、HEIC、TIFF 和 RAW 选择应用一种可读约定。",
          "example": "玛雅·陈 – 工作室肖像 – Look 02.cr3"
        },
        {
          "title": "幕后花絮和外景镜头",
          "description": "按可见主题、设置、镜头类型和项目命名短片，以便剪辑师可以在打开每个文件之前找到有用的素材。",
          "example": "河屋 – 外观 – 黄金时刻 – Wide.mov"
        },
        {
          "title": "采访和多机位拍摄",
          "description": "使用演讲者、采访主题、摄像机和拍摄字段，使一天中编号相似的剪辑更容易在 Finder 或 File Explorer 中扫描。",
          "example": "创始人访谈 – 摄像机 A – 拍摄 04.mp4"
        },
        {
          "title": "社会和客户出口",
          "description": "将最终文件名替换为移交所需的项目、可交付成果、宽高比、语言或版本字段。",
          "example": "Northwind 发布 – 社交剪辑 – 9x16 – v03.mp4"
        },
        {
          "title": "混合工作室档案",
          "description": "对照片、素材、音频、字幕和制作文档运行一批，并根据每个文件的可用上下文建议文件名。",
          "example": "沿海社论 – 幕后 – 工作室设置.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "组织成果",
      "title": "有什么更好的媒体文件名更改",
      "description": "回报不是表面的。它是在导入之前、协作期间和交付之后保持易于理解的媒体。",
      "items": [
        {
          "title": "在打开之前找到镜头",
          "description": "描述性主题、场景、地点或镜头将文件夹列表变成有用的拍摄首轮索引。"
        },
        {
          "title": "在每台相机上保持惯例",
          "description": "可重复使用的Template使来自不同主体、卡牌和操作员的文件遵循相同的工作室命名顺序。"
        },
        {
          "title": "放弃能够自我解释的媒体",
          "description": "编辑和客户收到的文件名保留了目录、NLE、共享驱动器或交付平台之外的项目上下文。"
        }
      ]
    },
    "faq": {
      "title": "照片和视频文件重命名，已解答",
      "description": "Zush 如何处理 RAW 照片、视频剪辑、Templates、处理模式、批量审核、现有创意工具和撤消。",
      "items": [
        {
          "question": "对于摄影师来说，什么是好的文件命名约定？",
          "answer": "实际的起点是拍摄日期、客户或项目、主题或场景，以及一个简短的区别因素，例如位置、镜头类型或选择状态。保持顺序一致，并使用您的团队稍后将实际搜索的字段。"
        },
        {
          "question": "Zush可以重命名RAW照片吗？",
          "answer": "是的。 Zush 支持常见的 RAW 格式，包括 CR2、CR3、NEF、ARW、DNG、ORF、RAF、RW2、PEF、SRW、SR2 和 RAW。它分析可用的预览和元数据，提出新的文件名，并保留文件扩展名。"
        },
        {
          "question": "人工智能可以根据视频片段中的内容重命名吗？",
          "answer": "是的。 Zush 对帧进行采样并使用可用的字幕或转录上下文（如果存在），然后为支持的格式（例如 MP4、MOV、M4V、MTS、M2TS 等）提出描述性名称。在应用之前检查批次。"
        },
        {
          "question": "它可以按场景、地点或镜头命名剪辑吗？",
          "answer": "是的。将这些字段添加到 Template 或使用 Custom AI Block 描述工作室特定的字段。结果取决于每个文件中可用的视觉和元数据上下文，因此预览步骤对于不明确的剪辑非常重要。"
        },
        {
          "question": "Zush 是否会替代 Lightroom、Capture One 或 NLE？",
          "answer": "不会。Zush 处理现有工作流程周围的文件名层。它会在导入前、移交过程中或存档中重命名普通文件夹中的媒体；它不会取代剔除、颜色、编辑、目录、时间线或数字资产管理。"
        },
        {
          "question": "我可以让未发布的或私人客户端离线工作吗？",
          "answer": "是的。离线AI使用本地Ollama模型在Mac或Windows上进行支持的分析，因此文件内容不会发送到Zush或第三方AI提供商。当您的工作室通过自己的提供商帐户路由分析时，您还可以使用 BYOK。"
        },
        {
          "question": "我可以撤消重命名的拍摄吗？",
          "answer": "是的。在应用之前检查所有建议的文件名，如果命名规则需要另一遍，则使用重命名历史记录来恢复批处理。"
        },
        {
          "question": "Zush 是否会移动或上传我的照片和视频文件？",
          "answer": "Zush 会就地重命名文件，并且不会将它们移动到新库中或存储它们。云处理可以发送紧凑的分析负载； BYOK 使用您的提供商帐户；离线人工智能将支持的分析保留在机器上。"
        }
      ]
    },
    "guides": {
      "title": "照片和视频组织指南",
      "description": "RAW 拍摄、照片库、客户端导出和视频剪辑的命名和存档工作流程。",
      "slugs": [
        "how-to-rename-images-with-ai-on-macos",
        "best-ways-to-organize-photos-on-mac",
        "rename-video-files-with-ai",
        "digital-photo-organization-mistakes-to-avoid"
      ]
    },
    "finalCta": {
      "title": "在一个复制的拍摄文件夹上尝试 Zush",
      "subtitle": "从一小组 RAW 照片或剪辑开始，审查建议的名称，完善 Template，如果需要另一遍，则撤消该批次。"
    }
  },
  "legal": {
    "path": "/for-legal",
    "seo": {
      "title": "离线 AI 文件重命名的法律文档管理",
      "description": "Zush 读取诉状、合同、信件、发现和扫描，然后为它们提供一致的、可搜索的文件名。将其与 Mac 或 Windows 上的现有文件夹、共享驱动器和 DMS 导出一起使用。"
    },
    "pageTitle": "法律文件管理",
    "hero": {
      "eyebrow": "对于律师事务所和法律团队",
      "titleLead": "将法律文件重命名为",
      "titleAccent": "事项、日期和类型",
      "subtitle": "Zush 读取诉状、合同、信件、发现和扫描，然后为它们提供一致的、可搜索的文件名。将其与 Mac 或 Windows 上的现有文件夹、共享驱动器和 DMS 导出一起使用。",
      "trustLine": [
        "Works with your existing folders",
        "Offline AI for confidential files",
        "Preview before every rename"
      ],
      "photoAlt": "一位年轻律师在办公室的台式电脑上审查案件文件",
      "downloadMac": "下载 Mac 版",
      "downloadWindows": "下载 Windows 版",
      "trustAria": "为什么法律文档管理团队使用 Zush"
    },
    "demoLabel": "Zush 将法律文件组织成可搜索的事项文件",
    "audiences": {
      "eyebrow": "法律档案组织",
      "title": "当文件夹是工作区时，文件名成为索引",
      "description": "Zush 帮助法律团队组织正式文档管理系统之前、旁边和之外的文档。",
      "items": [
        {
          "title": "使用共享文件夹工作的小公司",
          "description": "保持案例文件在 Finder、File Explorer、OneDrive、Dropbox 或网络驱动器上易于理解，而无需购买其他文档存储库。",
          "imageAlt": "使用共享文件夹工作的小型公司：使案例文件在 Finder、File Explorer、OneDrive、Dropbox 或网络驱动器上保持可理解性，而无需购买其他文档存储库。"
        },
        {
          "title": "诉讼和律师助理团队",
          "description": "在归档或审查之前，将下载的诉状、作品、证物、信件和扫描仪输出放入按时间顺序排列的文件夹中。",
          "imageAlt": "诉讼和律师助理团队：在归档或审查之前，将下载的诉状、作品、证物、信件和扫描仪输出放入按时间顺序排列的文件夹中。"
        },
        {
          "title": "法律操作人员和 DMS 管理员",
          "description": "在导入、迁移和导出时标准化文件名，以便文档在系统之间移动或离开 DMS 时保留其上下文。",
          "imageAlt": "法律操作人员和 DMS 管理员：在导入、迁移和导出时标准化文件名，以便文档在系统之间移动或离开 DMS 时保留其上下文。"
        }
      ]
    },
    "fields": {
      "title": "事项命名字段",
      "description": "将每个案件文件夹变成可搜索的案件记录",
      "instruction": "点击字段即可查看结果",
      "ariaLabel": "法律字段 Zush 读取",
      "hint": "建议的文件名",
      "items": [
        {
          "label": "案件编号",
          "before": "document (7).pdf",
          "after": "2026-0142 – 2026-06-12 – 发现令",
          "emphasis": "2026-0142"
        },
        {
          "label": "文件日期",
          "before": "scan_0048.pdf",
          "after": "2026-0142 – 2026-06-13 – 律师函",
          "emphasis": "2026-06-13"
        },
        {
          "label": "文件类型",
          "before": "download (3).pdf",
          "after": "2026-0142 – 2026-05-06 – 投诉"
        },
        {
          "label": "客户",
          "before": "signed_final.pdf",
          "after": "Northwind – 2026-06-01 – 保密协议 – 已执行"
        },
        {
          "label": "当事人/交易对手",
          "before": "contract_v2.docx",
          "after": "Northwind – NDA – Meridian – Draft v02"
        },
        {
          "label": "法庭/场地",
          "before": "efile.pdf",
          "after": "2026-0142 – 2026-05-29 – 答案 – SDNY"
        },
        {
          "label": "地位",
          "before": "agreement.pdf",
          "after": "Northwind – 服务协议 – 已执行",
          "emphasis": "执行"
        },
        {
          "label": "版本",
          "before": "ltr_draft_final2.docx",
          "after": "2026-0142 – 需求函 – v03",
          "emphasis": "v03"
        },
        {
          "label": "作者/顾问",
          "before": "correspondence.pdf",
          "after": "2026-0142 – 2026-06-13 – 信 – J. Chen"
        },
        {
          "label": "自定义字段——用简单的语言描述它",
          "before": "Scan0091.pdf",
          "after": "2026-0158 – 附件 B – 发票集"
        }
      ]
    },
    "privacy": {
      "eyebrow": "保密处理",
      "title": "按照您的要求整理机密法律文件",
      "description": "根据工作流程中的文档选择本地处理、贵公司认可的 AI 提供商或 Zush 管理的 AI。源文件保留在您的团队已经保存的位置。",
      "items": [
        {
          "title": "具有本地模型的离线人工智能",
          "description": "使用存储它们的 Mac 或 Windows PC 上的本地 Ollama 模型来组织受支持的案例文件。文档内容不会发送到 Zush 或 AI 提供商。",
          "badge": "将文件保留在机器上",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "使用您公司的 AI 帐户",
          "description": "连接您公司批准的人工智能提供商帐户和模型。 API 密钥保留在安全的本地存储中，而提供商则处理您选择的文档。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "从托管人工智能开始",
          "description": "使用Zush管理的AI进行非机密文档和快速评估。当客户端文件需要不同的处理策略时，选择Offline AI或BYOK。",
          "badge": "最快的设置",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush 永远不会成为您的案例文件的存储库：它会就地重命名文档，但不会存储它们。您的公司选择每个工作流程处理文档内容的方式。",
      "docsLinkLabel": "了解模式如何处理数据"
    },
    "workflow": {
      "eyebrow": "工作流程",
      "title": "为您已使用的工具添加一致的文件组织",
      "description": "使用 Zush 作为电子邮件、法庭下载、扫描仪、共享文件夹和法律文件管理系统之间的命名层。",
      "items": [
        {
          "title": "定义事项命名规则",
          "description": "根据客户或事项编号、文档日期、类型、当事人、状态、版本以及您的实践使用的任何字段构建 Template。"
        },
        {
          "title": "在摄入或存档上运行它",
          "description": "组织复制的案例文件夹、下载的文件、扫描仪输出或 DMS 导出，无需将文档移至新平台。"
        },
        {
          "title": "批准已准备就绪的文件名",
          "description": "检查整个批次，纠正异常，然后将其与重命名历史记录一起应用。然后使用相同的规则监视定期接收文件夹。"
        }
      ],
      "links": [
        {
          "label": "建立一个法律文件，命名为Template",
          "href": "/docs/templates/legal-documents"
        },
        {
          "label": "自动化法律文件接收文件夹",
          "href": "/docs/folder-monitoring"
        },
        {
          "label": "请参阅合法文件命名约定和示例",
          "href": "/blog/legal-file-naming-conventions"
        }
      ]
    },
    "documents": {
      "eyebrow": "支持的法律文件",
      "title": "每个法律事务的文件都有一个组织者",
      "description": "为诉讼、交易工作、证据开示和客户吸收创建单独的命名规则，同时在整个公司内保持一致的基于问题的结构。",
      "items": [
        {
          "title": "法庭文件",
          "description": "按事项、日期、文件类型和地点列出投诉、答复、动议、命令、通知和电子归档收据。",
          "example": "2026-0142 – 2026-05-29 – 答案 – SDNY.pdf"
        },
        {
          "title": "合同和协议",
          "description": "让客户和交易对手的草稿、红线、干净副本和已执行的协议保持清晰。",
          "example": "Northwind – NDA – Meridian – 执行 – 2026-06-01.pdf"
        },
        {
          "title": "一致",
          "description": "按时间顺序组织需求信函、客户信函以及与对方律师的沟通。",
          "example": "2026-0142 – 2026-06-10 – 需求函 – v03.docx"
        },
        {
          "title": "发现和展览",
          "description": "列出特定领域的作品、回应、展览布景、证词材料和证据扫描。",
          "example": "2026-0158 – 2026-06-11 – 附件 B – 发票集.pdf"
        },
        {
          "title": "内部工作产品",
          "description": "将相同的惯例应用于研究、访谈记录、策略备忘录和证词准备文件。",
          "example": "2026-0142 – 2026-06-12 – 备忘录 – 沉积准备.docx"
        },
        {
          "title": "扫描仪输出",
          "description": "将纯图像 PDF 和具有通用来源名称的纸质信件转换为可搜索的物质文件。",
          "example": "2026-0158 – 2026-06-13 – 通讯 – 律师.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "组织成果",
      "title": "有什么更好的法律档案组织变化",
      "description": "目标不是更漂亮的文件名。这是一个无论文件放在哪里都可以被理解的案例卷宗。",
      "items": [
        {
          "title": "打开之前找到正确的文档",
          "description": "事项编号、文档类型、当事人和状态将文件夹列表变成有用的索引，而不是下载和扫描编号的墙。"
        },
        {
          "title": "案例年表一目了然",
          "description": "将文档日期采用一致的 ISO 格式，并将事项文件夹分类为文件、信件、协议和事件的时间线。"
        },
        {
          "title": "保留 DMS 外部的上下文",
          "description": "自描述文件名在电子邮件附件、客户端导出、共享驱动器、发现集和闭门档案中仍然有用。"
        }
      ]
    },
    "faq": {
      "title": "法律文件整理、解答",
      "description": "AI 文件组织如何与案件文件夹、共享驱动器、法律文档管理软件、机密文件、预览和撤消配合使用。",
      "items": [
        {
          "question": "组织法律文件的最佳方式是什么？",
          "answer": "按客户和事项组织文档，然后使用根据事项编号、文档日期、文档类型、当事人以及版本或状态构建的一致文件名。这使得每个文件夹都可搜索并按时间顺序排列，同时保持约定在共享驱动器、导出和文档管理系统之间的可移植性。"
        },
        {
          "question": "AI能自动整理法律文件吗？",
          "answer": "是的。 Zush 读取 PDF、Word 文档的内容并扫描，提取 Template 中定义的字段，并为批次建议一致的文件名。在任何文件名更改之前，有人会检查结果。"
        },
        {
          "question": "Zush是否可以替代法律文档管理软件？",
          "answer": "不会。Zush 是 DMS 周围文档的组织层：接收文件夹、共享驱动器、下载的文件、扫描仪输出、迁移批次和导出。它会就地重命名文件，并且不提供文档存储、访问控制、法律研究或事务管理。"
        },
        {
          "question": "Zush能否在不上传的情况下整理机密案件文件？",
          "answer": "是的。在离线 AI 模式下，支持的文件使用 Mac 或 Windows 上的本地 Ollama 模型进行分析，因此文档内容保留在该计算机上。 Zush 就地重命名文件并且不存储它们。"
        },
        {
          "question": "律师事务所如何整理旧案卷？",
          "answer": "从复制的已关闭事项文件夹开始，为这些文档中已存在的字段定义 Template，并批量预览建议的名称。一旦规则可靠，将其应用到存档，并具有可撤消的重命名历史记录。"
        },
        {
          "question": "Zush可以从法律文件中提取案件编号吗？",
          "answer": "是的。添加描述事项或案件编号及其所需格式的 Custom AI Block。该块可以与文档日期、类型、当事人、地点、状态、版本或其他公司特定字段一起出现在命名 Template 中。"
        },
        {
          "question": "它是否整理法庭文件和扫描的法律文件？",
          "answer": "是的。 Zush 可以通过 AI 视觉读取电子归档 PDF 和纯图像扫描仪输出，无需单独的 OCR 步骤。文件夹监控可以监视这些文档到达的位置。"
        },
        {
          "question": "它能区分草稿、红线和执行副本吗？",
          "answer": "是的。在事务性 Template 中包含状态和版本字段，以便每个建议的文件名标识该文档是草稿、红线、干净副本还是已执行的协议。"
        }
      ]
    },
    "guides": {
      "title": "法律文件组织指南",
      "description": "对律师事务所 DMS 周围的文档进行基于事件的命名、扫描仪接收和私人 AI 处理。",
      "slugs": [
        "legal-file-naming-conventions",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "使用 Zush 整理一份复制的案例文件夹",
      "subtitle": "从一个充满下载、草稿和扫描的问题文件夹开始。检查建议的文件名，完善命名规则，并在需要另一遍时撤消该批处理。"
    }
  },
  "hr": {
    "path": "/for-hr",
    "seo": {
      "title": "具有离线 AI 文件重命名功能的 HR 文档管理",
      "description": "使用 AI 为简历、录用信、入职表格、评论、政策和导出记录生成一致且可搜索的文件名。该工作流程适用于 Mac 或 Windows 上的现有文件夹、共享驱动器、ATS 下载和 HRIS 导出。"
    },
    "pageTitle": "人力资源文档管理",
    "hero": {
      "eyebrow": "对于人力资源和人员团队",
      "titleLead": "将 HR 文档重命名为",
      "titleAccent": "员工、日期和类型",
      "subtitle": "Zush 读取简历、录用信、入职表格、评论、政策和导出记录，然后为它们提供一致的、可搜索的文件名。将其与 Mac 或 Windows 上的现有文件夹、共享驱动器、ATS 下载和 HRIS 导出一起使用。",
      "trustLine": [
        "Works with your existing folders",
        "Offline AI for sensitive records",
        "Preview before every rename"
      ],
      "photoAlt": "人力资源专业人员在现代化办公室中审查员工入职文件",
      "downloadMac": "下载 Mac 版",
      "downloadWindows": "下载 Windows 版",
      "trustAria": "为什么人力资源文档管理团队使用Zush"
    },
    "demoLabel": "Zush 将 HR 文档组织到可搜索的员工和候选人文件中",
    "audiences": {
      "eyebrow": "人力资源档案整理",
      "title": "当文件在人员系统之间移动时，文件名携带上下文",
      "description": "Zush 帮助人员团队组织 ATS 或 HRIS 之前、旁边和外部的文档。",
      "items": [
        {
          "title": "人力资源通才和小团队",
          "description": "在 Finder、File Explorer、OneDrive、Dropbox 或网络驱动器上保持入职、员工变更、审核和离职文档易于理解。",
          "imageAlt": "人力资源通才和小型团队：在 Finder、File Explorer、OneDrive、Dropbox 或网络驱动器上保持入职、员工变动、审查和离职文档易于理解。"
        },
        {
          "title": "招聘和人才获取",
          "description": "在移交或存档之前，将 ATS 下载、简历、作品集、面试笔记、记分卡和签名录用信息转化为一致的候选人记录。",
          "imageAlt": "招聘和人才获取：在移交或存档之前，将 ATS 下载、简历、作品集、面试记录、记分卡和签名录用信息转化为一致的候选人记录。"
        },
        {
          "title": "人员操作和 HRIS 管理员",
          "description": "在导入、迁移和导出时标准化文件名，以便员工记录在系统之间移动或离开 HRIS 时保留其上下文。",
          "imageAlt": "人员运营和 HRIS 管理员：在导入、迁移和导出时标准化文件名，以便员工记录在系统之间移动或离开 HRIS 时保留其上下文。"
        }
      ]
    },
    "fields": {
      "title": "人们记录字段",
      "description": "将每个 HR 文件夹变成可搜索的人员记录",
      "instruction": "点击字段即可查看结果",
      "ariaLabel": "HR 字段 Zush 读取",
      "hint": "建议的文件名",
      "items": [
        {
          "label": "员工编号",
          "before": "scan_0048.pdf",
          "after": "EMP-1042 – 2026-08-03 – 福利登记",
          "emphasis": "EMP-1042"
        },
        {
          "label": "候选人",
          "before": "resume-final.pdf",
          "after": "Rivera Sofia – 产品设计师 – 简历"
        },
        {
          "label": "文件日期",
          "before": "document (7).pdf",
          "after": "EMP-1042 – 2026-08-03 – 录取通知书",
          "emphasis": "2026-08-03"
        },
        {
          "label": "文件类型",
          "before": "download (3).pdf",
          "after": "EMP-1042 – 2026-08-05 – 纳税表",
          "emphasis": "税表"
        },
        {
          "label": "角色/职位",
          "before": "candidate_notes.docx",
          "after": "Rivera Sofia – 产品设计师 – 采访记录",
          "emphasis": "产品设计师"
        },
        {
          "label": "部门",
          "before": "policy_ack.pdf",
          "after": "EMP-1186 – 财务 – 安全策略确认"
        },
        {
          "label": "生效日期",
          "before": "signed_letter.pdf",
          "after": "EMP-1042 – 促销 – 2026 年 9 月 1 日生效"
        },
        {
          "label": "审核期",
          "before": "review_final2.docx",
          "after": "EMP-1042 – 绩效评估 – 2026 年上半年"
        },
        {
          "label": "地位",
          "before": "offer.pdf",
          "after": "Rivera Sofia – 产品设计师 – 报价 – 签名",
          "emphasis": "签名"
        },
        {
          "label": "自定义字段——用简单的语言描述它",
          "before": "Form0091.pdf",
          "after": "EMP-1042 – 设备协议 – 笔记本电脑退货",
          "emphasis": "笔记本电脑退货"
        }
      ]
    },
    "privacy": {
      "eyebrow": "敏感文件处理",
      "title": "按照您的要求整理敏感的人力资源文件",
      "description": "根据工作流程中的文档选择本地处理、组织认可的 AI 提供商或 Zush 管理的 AI。源文件保留在您的团队已经保存的位置。",
      "items": [
        {
          "title": "具有本地模型的离线人工智能",
          "description": "使用存储文件的 Mac 或 Windows PC 上的本地 Ollama 模型来组织受支持的员工和候选人文件。文档内容不会发送到 Zush 或 AI 提供商。",
          "badge": "将文件保留在机器上",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "使用您组织的 AI 帐户",
          "description": "连接您的组织批准的 AI 提供商帐户和模型。 API 密钥保留在安全的本地存储中，而提供商则处理您选择的文档。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "从托管人工智能开始",
          "description": "使用 Zush 管理的 AI 进行示例或非敏感文档和快速评估。当人事记录需要不同的处理策略时，选择离线AI或BYOK。",
          "badge": "最快的设置",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush 永远不会成为员工或候选人文件的记录系统：它会就地重命名文档，但不会存储它们。您的组织选择如何处理每个工作流程的文档内容。",
      "docsLinkLabel": "了解模式如何处理数据"
    },
    "workflow": {
      "eyebrow": "工作流程",
      "title": "将一致的文件组织添加到您已使用的 HR 工具中",
      "description": "使用 Zush 作为电子邮件、招聘下载、扫描仪、共享文件夹和 ATS 或 HRIS 之间的命名层。",
      "items": [
        {
          "title": "定义HR命名规则",
          "description": "根据员工或候选人 ID、文档日期、类型、角色、部门、审核周期、状态以及您的人员团队使用的任何字段构建 Template。"
        },
        {
          "title": "在入口或出口上运行它",
          "description": "组织复制的员工文件夹、招聘下载、入职扫描、政策确认或 ATS 或 HRIS 导出，而无需将文件移动到新平台。"
        },
        {
          "title": "批准可搜索的文件名",
          "description": "检查整个批次，纠正异常，然后将其与重命名历史记录一起应用。然后使用相同的规则监视定期接收文件夹。"
        }
      ],
      "links": [
        {
          "label": "建立员工文件命名约定",
          "href": "/blog/hr-employee-file-naming-convention"
        },
        {
          "label": "组织入职文件的接收",
          "href": "/blog/organize-employee-onboarding-documents"
        },
        {
          "label": "整理候选人和招聘档案",
          "href": "/blog/organize-candidate-files-recruiting"
        }
      ]
    },
    "documents": {
      "eyebrow": "支持的人力资源文件",
      "title": "一个文件管理器，可管理整个员工生命周期的文件",
      "description": "为招聘、入职、员工变动、绩效、政策确认和离职创建单独的命名规则，同时保持一致的以人为本的结构。",
      "items": [
        {
          "title": "招聘和候选人档案",
          "description": "按候选人、职位、日期和状态列出简历、作品集、面试记录、记分卡、背景调查文件和录用通知。",
          "example": "Rivera Sofia – 产品设计师 – 报价 – Signed.pdf"
        },
        {
          "title": "入职记录",
          "description": "保持签署的报价、纳税表格、福利选择、身份证件、设备协议和政策确认的清晰。",
          "example": "EMP-1042 – 2026-08-05 – 福利注册.pdf"
        },
        {
          "title": "员工变动",
          "description": "按生效日期和状态整理晋升信函、薪酬变更、调动、休假记录和弹性工作协议。",
          "example": "EMP-1042 – 促销 – 2026-09-01 生效.pdf"
        },
        {
          "title": "绩效与发展",
          "description": "按员工和审核周期列出审核表、目标、发展计划、培训证书和经理注释。",
          "example": "EMP-1042 – 绩效评估 – 2026 H1.pdf"
        },
        {
          "title": "政策和致谢",
          "description": "按员工、政策和日期单独列出手册收据、安全培训、行为准则确认和政策更新。",
          "example": "EMP-1186 – 安全策略确认 – 2026-07-22.pdf"
        },
        {
          "title": "离职和档案",
          "description": "在保留或归档工作流程之前，将出口表格、设备退货、最终信件和导出的人事记录转换为清晰的文件。",
          "example": "EMP-1042 – 设备返还 – 已完成 – 2026-10-04.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "组织成果",
      "title": "HR档案组织有什么更好的改变",
      "description": "目标不是更漂亮的文件名。这是一份人员记录，无论批准的工作流程将文档发送到何处，它仍然是可以理解的。",
      "items": [
        {
          "title": "打开记录之前先识别该记录",
          "description": "员工或候选人 ID、文档类型、角色、期间和状态将文件夹列表变成有用的索引，而不是下载和扫描号码的墙。"
        },
        {
          "title": "使生命周期交接更容易审查",
          "description": "一致的名称有助于招聘、人力资源、经理、薪资、IT 和运营人员了解文件通过批准的工作流程时的含义。"
        },
        {
          "title": "保留 HRIS 之外的上下文",
          "description": "自描述文件名在批准的导出、迁移批次、共享文件夹、员工数据包和保留存档中仍然有用。"
        }
      ]
    },
    "faq": {
      "title": "HR文件整理、解答",
      "description": "AI 文件组织如何与员工文件夹、招聘下载、HRIS 和 ATS 导出、敏感记录、预览和撤消配合使用。",
      "items": [
        {
          "question": "组织人力资源文件的最佳方式是什么？",
          "answer": "使用 HRIS 或 ATS 作为记录系统，然后根据员工或候选人 ID 以及根据文档日期、类型、角色或部门、期间和状态构建的一致文件名来组织周围的文件。除非您的组织的政策要求，否则不要在文件名中包含敏感的个人详细信息。"
        },
        {
          "question": "AI能自动整理员工档案吗？",
          "answer": "是的。 Zush 读取 PDF、Word 文档、图像和扫描件，提取 Template 中定义的字段，并为批次建议一致的文件名。在任何文件名更改之前，有人会检查结果。"
        },
        {
          "question": "Zush 是否取代 HRIS、ATS 或员工文档管理系统？",
          "answer": "不。Zush 是用于接收文件夹、共享驱动器、招聘下载、扫描仪输出、迁移批次和导出的组织层。它会重命名适当的文件，并且不提供员工记录存储、权限、招聘、工资单、保留执行或案例管理。"
        },
        {
          "question": "Zush能否在不上传敏感HR文件的情况下整理它们？",
          "answer": "是的。在离线 AI 模式下，支持的文件使用 Mac 或 Windows 上的本地 Ollama 模型进行分析，因此文档内容保留在该计算机上。 Zush 就地重命名文件并且不存储它们。"
        },
        {
          "question": "HR应该如何命名员工文件？",
          "answer": "实用的模式是 EmployeeID – YYYY-MM-DD – DocumentType – periodOrStatus。对于候选文件，使用候选 - 角色 - 文档类型 - 状态。确切的字段应遵循您组织的访问、隐私和保留策略。"
        },
        {
          "question": "Zush可以提取员工ID和生效日期吗？",
          "answer": "是的。添加 Custom AI Blocks，描述员工 ID、生效日期、审核周期、角色、部门或其他组织特定字段和所需格式。"
        },
        {
          "question": "它会组织扫描的入职表格吗？",
          "answer": "是的。 Zush 可以通过 AI 视觉读取纯图像 PDF 和拍照文档，无需单独的 OCR 步骤。文件夹监控可以查看入职文档到达的批准位置。"
        },
        {
          "question": "HR 可以对招聘记录和员工记录使用不同的命名规则吗？",
          "answer": "是的。为候选人录取、入职、员工变动、绩效文档和离职创建单独的 Templates，以便每个工作流程仅提取其需要的字段。"
        }
      ]
    },
    "guides": {
      "title": "HR文件组织指南",
      "description": "员工、候选人和入职文档的命名约定和接收工作流程。",
      "slugs": [
        "hr-employee-file-naming-convention",
        "organize-employee-onboarding-documents",
        "organize-candidate-files-recruiting"
      ]
    },
    "finalCta": {
      "title": "使用 Zush 整理一份复制的 HR 文件夹",
      "subtitle": "从招聘下载、入职表格或导出的员工文档的文件夹开始。检查建议的文件名，完善命名规则，并在需要另一遍时撤消该批处理。"
    }
  },
  "real-estate": {
    "path": "/for-real-estate",
    "seo": {
      "title": "具有 AI 文件重命名功能的房地产文档管理",
      "description": "Zush 读取购买协议、披露信息、检查报告、评估、产权文件和房产照片，然后为它们提供一致的文件名。在 Mac 或 Windows 上保留现有的交易系统、文件夹和共享驱动器。"
    },
    "pageTitle": "房地产文件管理",
    "hero": {
      "eyebrow": "对于房地产经纪人和交易团队",
      "titleLead": "将属性文件重命名为",
      "titleAccent": "地址、日期和类型",
      "subtitle": "Zush 读取购买协议、披露信息、检查报告、评估、产权文件和房产照片，然后为它们提供一致的文件名。在 Mac 或 Windows 上保留现有的交易系统、文件夹和共享驱动器。",
      "trustLine": [
        "Works beside your transaction system",
        "Offline AI for sensitive files",
        "Preview and undo every batch"
      ],
      "photoAlt": "一位房地产经纪人在明亮的办公室里向两位潜在买家展示房屋计划",
      "downloadMac": "下载 Mac 版",
      "downloadWindows": "下载 Windows 版",
      "trustAria": "为什么房地产文档管理团队使用 Zush"
    },
    "demoLabel": "Zush 按房产地址整理房产交易文件",
    "audiences": {
      "eyebrow": "房地产档案整理",
      "title": "保持每个财产文件从报价到存档的可识别性",
      "description": "Zush 为每笔交易的文档和媒体提供一致的基于地址的身份，而无需替换您的经纪公司已经使用的工具。",
      "items": [
        {
          "title": "代理管理活跃交易",
          "description": "保持 DocuSign 下载、披露、检查报告、贷方请求和结账文件在电子邮件、下载、共享文件夹和交易平台上可识别。",
          "imageAlt": "代理管理活跃交易：保持 DocuSign 下载、披露、检查报告、贷方请求和结账文档可通过电子邮件、下载、共享文件夹和交易平台进行识别。"
        },
        {
          "title": "交易协调员和经纪人业务",
          "description": "在组装合规性文件、响应请求或归档已关闭的事务之前，在整个团队中应用一种基于地址的约定。",
          "imageAlt": "交易协调员和经纪人操作：在组装合规性文件、响应请求或归档已关闭的交易之前，在整个团队中应用一种基于地址的约定。"
        },
        {
          "title": "列出处理文件和媒体的团队",
          "description": "将房产照片、平面图、信息披露、列表包和营销导出与正确的地址相关联，而无需将它们强行放入一份应用程序中。",
          "imageAlt": "处理文件和媒体的上市团队：将房产照片、平面图、信息披露、上市套餐和营销导出与正确的地址相关联，而无需将它们强行放入一份应用程序中。"
        }
      ]
    },
    "fields": {
      "title": "属性命名字段",
      "description": "将交易文件夹变成财产记录",
      "instruction": "点击字段即可查看结果",
      "ariaLabel": "房地产领域 Zush 读取",
      "hint": "建议的文件名",
      "items": [
        {
          "label": "物业地址",
          "before": "DocuSign_892347234.pdf",
          "after": "742 Evergreen Terrace - 购买协议 - 已执行"
        },
        {
          "label": "文件日期",
          "before": "download (8).pdf",
          "after": "742 长青台 - 2026-06-08 - 检验报告",
          "emphasis": "2026-06-08"
        },
        {
          "label": "文件类型",
          "before": "Document (4).pdf",
          "after": "742长青台 - 产权承诺 - 2026-06-05",
          "emphasis": "产权承诺"
        },
        {
          "label": "买家/卖家",
          "before": "signed_final.pdf",
          "after": "742 Evergreen Terrace - 约翰逊到史密斯 - 购买协议"
        },
        {
          "label": "交易ID",
          "before": "attachment.pdf",
          "after": "TX-2026-0184 - 742 常青露台 - 披露",
          "emphasis": "TX-2026-0184"
        },
        {
          "label": "地位",
          "before": "contract_v3.pdf",
          "after": "742 Evergreen Terrace - 购买协议 - 已执行",
          "emphasis": "执行"
        },
        {
          "label": "截止日期",
          "before": "closing.pdf",
          "after": "742 常青台 - 成交披露 - 2026-07-02",
          "emphasis": "2026-07-02"
        },
        {
          "label": "代理/经纪",
          "before": "listing_docs.zip",
          "after": "88 Harbour Lane - 房源套餐 - J. Chen"
        },
        {
          "label": "清单编号",
          "before": "property.pdf",
          "after": "MLS-884201 - 88 港湾巷 - 卖家披露",
          "emphasis": "MLS-884201"
        },
        {
          "label": "照片主题",
          "before": "IMG_4821.jpg",
          "after": "88 港巷 - 厨房 - 宽 - 01",
          "emphasis": "厨房"
        },
        {
          "label": "自定义字段 - 用简单的语言描述它",
          "before": "scan_0042.pdf",
          "after": "742 长青露台 - HOA 文件 - 2026"
        }
      ]
    },
    "privacy": {
      "eyebrow": "交易文件处理",
      "title": "按照您的条件处理交易文件",
      "description": "根据工作流程中的文件选择本地处理、经纪公司认可的 AI 提供商或 Zush 管理的 AI。源文档保留在其现有文件夹中。",
      "items": [
        {
          "title": "具有本地模型的离线人工智能",
          "description": "使用存储它们的 Mac 或 Windows PC 上的本地 Ollama 模型来分析受支持的交易文档和财产介质。文件内容不会发送到 Zush 或 AI 提供商。",
          "badge": "将文件保留在机器上",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "使用您经纪公司的 AI 账户",
          "description": "连接您的经纪公司批准的人工智能提供商帐户和模型。 API 密钥保留在安全的本地存储中，而提供商仅处理您选择的文件。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "从托管人工智能开始",
          "description": "使用 Zush 管理的 AI 进行快速评估或非敏感列表材料。当交易需要不同的处理策略时，选择离线AI或BYOK。",
          "badge": "最快的设置",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush 不会成为您的交易存储库。它会就地重命名文件，而不存储它们，并在您的经纪公司已使用的系统内保留权限、保留、合规性检查表和通信。",
      "docsLinkLabel": "了解模式如何处理数据"
    },
    "workflow": {
      "eyebrow": "工作流程",
      "title": "将一致的文件名添加到您已有的事务流中",
      "description": "在电子邮件、电子签名下载、扫描仪、财产访问、共享文件夹和交易管理系统之间使用 Zush。",
      "items": [
        {
          "title": "定义属性命名规则",
          "description": "根据财产地址、交易 ID、文档日期、类型、当事人、状态、成交日期和任何经纪特定字段构建 Template。"
        },
        {
          "title": "在交易摄入量上运行它",
          "description": "组织 DocuSign 下载、电子邮件附件、扫描仪输出、检查报告、所有权文档、列表照片或成交存档，而无需将其移动到新平台。"
        },
        {
          "title": "批准属性就绪文件名",
          "description": "检查批次，更正异常，然后将其与重命名历史记录一起应用。在下一个事务的受监控的接收文件夹上重复使用相同的规则。"
        }
      ],
      "links": [
        {
          "label": "建立房地产文件命名约定",
          "href": "/blog/real-estate-document-naming-convention"
        },
        {
          "label": "整理完整的交易文件夹",
          "href": "/blog/how-to-organize-real-estate-transaction-files"
        },
        {
          "label": "按属性重命名 DocuSign 下载",
          "href": "/blog/rename-docusign-files-by-property-address"
        }
      ]
    },
    "documents": {
      "eyebrow": "支持的交易文件",
      "title": "每笔房产交易的文件都有一个组织者",
      "description": "使用单独的 Templates 进行购买、列表、租赁、关闭包和财产媒体，同时在每个工作流程中保持地址一致。",
      "items": [
        {
          "title": "采购协议和附录",
          "description": "按财产、当事人、状态和文件日期列出要约、反驳、修订和签署的协议。",
          "example": "742 长青台 - 购买协议 - 已执行 - 2026-06-12.pdf"
        },
        {
          "title": "检查和维修",
          "description": "将房屋检查、专家报告、维修估算和收据附在正确的地址上。",
          "example": "742 长青台 - 检验报告 - 2026-06-08.pdf"
        },
        {
          "title": "所有权、托管和结束",
          "description": "无需依赖门户下载名称即可组织所有权承诺、和解声明、成交披露、电汇指示和记录文档。",
          "example": "742 长青台 - 成交披露 - 2026-07-02.pdf"
        },
        {
          "title": "评估和贷款人文件",
          "description": "按属性和日期列出评估报告、贷方请求、批准函和支持文件。",
          "example": "742长青台 - 评估 - 2026-06-18.pdf"
        },
        {
          "title": "披露和 HOA 文件",
          "description": "在一个交易文件夹中区分卖方信息披露、含铅油漆表格、HOA 套餐、保险记录和本地表格。",
          "example": "88 Harbor Lane - 卖方披露 - 签名 - 2026-05-27.pdf"
        },
        {
          "title": "挂牌和检验照片",
          "description": "将相同的房产地址应用于列表照片、房间详细信息、检查图像和营销导出，以便媒体与交易背景保持一致。",
          "example": "88 Harbour Lane - 厨房 - 宽 - 01.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "组织成果",
      "title": "当属性文件具有有用的名称时会发生什么变化",
      "description": "目标是一个在门户之外和交易结束后仍然有意义的交易文件夹。",
      "items": [
        {
          "title": "搜索地址并查看交易",
          "description": "每个文件名中一致的属性地址使得协议、报告、披露和照片在打开之前就可以被发现。"
        },
        {
          "title": "减少猜测，构建结束方案",
          "description": "文档类型、日期、当事人和状态使列出的文件夹成为可用的清单，而不是门户 ID 和重复下载的集合。"
        },
        {
          "title": "交易结束后保留​​背景信息",
          "description": "自描述文件名在电子邮件附件、经纪档案、本地备份、共享驱动器和交易系统导出中仍然有用。"
        }
      ]
    },
    "faq": {
      "title": "房地产文件整理，解答",
      "description": "AI 文件重命名如何与交易系统、DocuSign 下载、关闭文档、财产照片、敏感文件、预览和撤消配合使用。",
      "items": [
        {
          "question": "什么是房地产文件管理？",
          "answer": "房地产文件管理是在整个交易过程中保持协议、披露、检查、产权文件、贷款人文件、结账记录和房地产媒体可识别的过程。 Zush 通过读取每个文件并应用一致的基于属性的命名约定来处理文件名层。"
        },
        {
          "question": "Zush是否会取代房产交易管理软件？",
          "answer": "不会。Zush 会重命名交易系统周围的文件，包括 DocuSign 下载、电子邮件附件、扫描仪输出、检查报告、财产照片、导出和存档。它不管理截止日期、签名、合规性清单、通信、权限或交易记录。"
        },
        {
          "question": "Zush可以通过属性地址重命名DocuSign文件吗？",
          "answer": "是的。 Template 可以从 DocuSign PDF 中提取财产地址、文档类型、执行日期、当事人、交易 ID 和状态，然后提出一个文件名，例如“742 Evergreen Terrace - 购买协议 - 已执行 - 2026-06-12.pdf”。"
        },
        {
          "question": "它可以自动整理结账文件吗？",
          "answer": "Zush 可以将产权承诺、评估报告、成交披露、结算报表、贷方文件和记录文件重命名为已审核的批次。文件夹监控还可以监视新交易文档到达的位置。"
        },
        {
          "question": "Zush 可以重命名房产照片和 PDF 吗？",
          "answer": "是的。 Zush 可以按地址、房间、视图、拍摄类型或 Template 中的其他字段命名支持的财产照片。当文件名结构与交易文档不同时，请使用单独的 Template 列出媒体。"
        },
        {
          "question": "Zush 是否将文件移动到属性文件夹中？",
          "answer": "不会。Zush 会就地重命名文件并保持现有文件夹结构不变。这样可以安全地在经纪公司的当前交易文件夹、共享驱动器、Dropbox、OneDrive 或本地存档周围添加命名层。"
        },
        {
          "question": "交易文件可以在不上传的情况下进行处理吗？",
          "answer": "是的。离线 AI 模式会在 Mac 或 Windows 上使用本地 Ollama 模型分析支持的文件，因此文档内容保留在该计算机上。当经纪公司更愿意使用自己批准的提供商帐户时，可以使用 BYOK。"
        },
        {
          "question": "它适用于扫描的房地产文件吗？",
          "answer": "是的。 AI 视觉可以读取纯图像 PDF 和支持的图像，无需单独的 OCR 通行证。其中包括办公室扫描仪输出、拍照的文书工作、较旧的结案文件以及作为扫描件返回的签名文档。"
        },
        {
          "question": "经纪公司可以跨多个代理标准化文件名吗？",
          "answer": "是的。为购买交易、列表、租赁、成交包和房产媒体创建可重复使用的 Templates。每个代理或协调员都可以应用相同的所需字段顺序，并在更改批次之前预览建议的名称。"
        }
      ]
    },
    "guides": {
      "title": "房地产交易文件指南",
      "description": "有关命名约定、交易文件夹结构和电子签名下载自动清理的单独指南。",
      "slugs": [
        "real-estate-document-naming-convention",
        "how-to-organize-real-estate-transaction-files",
        "rename-docusign-files-by-property-address"
      ]
    },
    "finalCta": {
      "title": "在一个复制的交易文件夹上尝试 Zush",
      "subtitle": "从一小批 DocuSign 下载、检查报告、披露或关闭文件开始。检查建议的名称，优化 Template，并在需要另一遍时撤消该批次。"
    }
  }
} satisfies ProfessionLocaleCopy;
