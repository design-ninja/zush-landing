import type { HomeCopy } from '@/i18n/copy';
import type { ProfessionLocaleCopy } from '@/i18n/professions/types';

export const home = {
  "heroTitle": "파일 이름 변경 도구\nMac 및 Windows용",
  "heroAccent": "파일 이름 변경 도구",
  "heroSubtitle": "AI로 파일 내용을 기준으로 일괄 이름 변경하세요. Zush는 스크린샷, PDF, 사진, 비디오, 오디오, 문서 등 100개 이상의 형식을 지원하며, 사용자가 선택한 세부 정보만 정확히 추출해 원하는 파일 이름으로 바꿉니다.",
  "heroHighlights": [
    "AI로 파일 내용을 기준으로 일괄 이름 변경하세요",
    "사용자가 선택한 세부 정보만 정확히 추출"
  ],
  "buyPro": "PRO 구매",
  "trustSignals": [
    "무료로 시작하기",
    "회원가입 불필요",
    "카드 필요 없음"
  ],
  "heroModes": [
    "클라우드 AI",
    "BYOK",
    "로컬 AI",
    "100개 이상 형식"
  ],
  "featuresTitle": "Zush 기능",
  "featuresDescription": "미리보기, 템플릿, 폴더 모니터링, 원클릭 실행 취소로 복잡한 파일 이름을 명확하고 일관되게 정리하세요.",
  "supportedFormats": "지원 파일 형식",
  "images": "이미지",
  "designLabel": "디자인",
  "documents": "문서",
  "videosLabel": "비디오",
  "audioLabel": "오디오",
  "cloudFoldersTitle": "클라우드 폴더에서도 작동",
  "cloudFoldersDescription": "Zush는 모든 로컬 폴더의 파일 이름을 변경합니다. iCloud Drive, Google Drive, Dropbox, OneDrive가 동기화하는 폴더도 포함됩니다. 계정을 연결할 필요가 없습니다.",
  "downloadTitle": "Zush 무료 체험",
  "downloadSubtitle": "파일을 일괄 이름 변경하고, 폴더를 모니터링하며, 스크린샷, PDF, 사진, 오디오, 비디오, 문서를 내용 기준으로 이름 변경합니다.",
  "downloadHintPrefix": "무료 · 카드 필요 없음",
  "useCasesTitle": "AI 파일 이름 변경을 쓰는 사람들",
  "useCasesDescription": "작업 흐름에 가장 가까운 역할을 선택하세요.",
  "faqTitle": "자주 묻는 질문",
  "faqTitleAccent": "질문",
  "faqDescription": "Zush에 대해 알아야 할 모든 것",
  "featureCards": {
    "aiAnalysis": {
      "title": "AI 분석",
      "description": "이미지와 PDF부터 오디오, 비디오, Office 파일까지 100개 이상의 파일 형식을 한 번에 분석하고 이름을 변경합니다."
    },
    "foldersMonitoring": {
      "title": "폴더 모니터링",
      "description": "iCloud Drive, Google Drive, Dropbox, OneDrive 폴더를 포함해 하나 이상의 폴더를 감시하고 새 파일을 백그라운드에서 자동 처리합니다."
    },
    "batchRename": {
      "title": "일괄 이름 변경",
      "description": "여러 파일을 끌어다 놓으면 Zush가 몇 초 만에 분석하고 이름을 변경합니다."
    },
    "templates": {
      "title": "템플릿",
      "description": "스크린샷, 지출, 음악 트랙, 고객 작업, 법무, 여행, 모니터링 폴더용 이름 변경 설정을 재사용합니다."
    },
    "namingBlocks": {
      "title": "이름 블록",
      "description": "날짜, 메타데이터, 오디오, 사진, 재무, 법무, 여행, 고객, AI 필드 등 145개 이상 블록으로 일관된 이름을 만듭니다."
    },
    "customAiBlocks": {
      "title": "사용자 지정 AI 블록",
      "description": "Zush가 추출할 세부 정보를 설명하고, 이를 사용자 지정 AI 블록으로 만들어 어떤 템플릿에서든 다시 사용하세요."
    },
    "audioSupport": {
      "title": "오디오 지원",
      "description": "MP3, M4A, WAV, FLAC, OGG, WebM, MPGA를 메타데이터, 인식, 전사, 오디오 필드로 이름 변경합니다."
    },
    "customPatterns": {
      "title": "사용자 지정 패턴",
      "description": "{title}, {original}, {date}, {time}, {category} 같은 변수로 이름 규칙을 만들 수 있습니다."
    },
    "smartMetadata": {
      "title": "스마트 메타데이터",
      "description": "Finder 태그와 Spotlight 메타데이터를 자동 추가해 파일을 더 빨리 찾을 수 있습니다."
    },
    "renameHistory": {
      "title": "이름 변경 기록",
      "description": "모든 변경을 기록하고 클릭 한 번으로 원래 이름을 복원할 수 있습니다."
    },
    "customPrompts": {
      "title": "사용자 지정 AI 프롬프트",
      "description": "이름, 태그, 메타데이터 규칙을 설정해 AI 결과를 작업 방식에 맞춥니다."
    },
    "byok": {
      "title": "내 키 가져오기",
      "description": "Gemini, OpenRouter, OpenAI, Claude를 연결해 클라우드에서 이름을 변경하세요. FREE는 모든 모드에서 공통 50회이며 PRO는 제한이 없습니다. 키는 로컬에 저장됩니다."
    },
    "offlineAi": {
      "title": "비공개 로컬 AI",
      "description": "로컬 Ollama 모델이 지원 파일을 기기에서 처리하며 설정 후에는 오프라인으로 작동합니다."
    },
    "cloudAi": {
      "title": "클라우드 AI",
      "description": "자체 릴레이를 거쳐 상용 AI 제공업체로 연결되며, 해당 업체의 표준 API 약관을 따릅니다. 릴레이는 API 키를 앱에서 빼낼 수 없도록 하기 위해 존재합니다."
    },
    "bandTitle": "Zush를 안전하게 사용하는 3가지 방법",
    "bandSubtitle": "바로 쓸 수 있는 클라우드 AI, 내 API 키 연결, 또는 Ollama로 완전 오프라인.",
    "addFolder": "폴더 추가",
    "promptRules": "프롬프트 규칙",
    "customBadge": "사용자 지정",
    "templateActive": "활성 템플릿",
    "templateNames": [
      "스크린샷",
      "음악 트랙",
      "고객 미팅 노트"
    ],
    "namingBlockLabels": [
      "{date}",
      "{client_name}",
      "{artist}",
      "{bpm}",
      "{invoice_number}",
      "{title}"
    ],
    "apiKeyConnected": "API 키 연결됨",
    "terminal": "터미널",
    "localModelReady": "로컬 모델 준비됨",
    "today": "오늘",
    "undo": "되돌리기",
    "analysisNewName": "발리_석양_해변.png",
    "batchNewNames": [
      "칸반_UI.png",
      "채용_계획_노트.docx",
      "투자자_업데이트_덱.pptx"
    ],
    "metadataFileName": "사이버펑크_아트.png",
    "metadataTags": [
      "글리치 아트",
      "베이퍼웨이브",
      "조각상",
      "사이버펑크",
      "디지털 아트",
      "야자수"
    ],
    "historyNewNames": [
      "대시보드_리뷰_노트.docx",
      "Q1_매출_보고서.xlsx"
    ],
    "promptExample": "이름은 짧게 유지하고 주제를 먼저 두며 관련 Finder 태그를 추가합니다.",
    "audioNewNames": [
      "로파이_피아노_루프_92BPM.mp3",
      "고객_디스커버리_콜.m4a"
    ]
  },
  "offlineAiModal": {
    "title": "기기 밖으로 나가지 않는 AI",
    "description": "오프라인 AI는 선택형 모드입니다. 로컬 Ollama 모델이 Mac이나 Windows PC에서 직접 실행되며 클라우드를 쓰지 않습니다.",
    "points": [
      "아무것도 기기를 떠나지 않습니다. Zush 클라우드도, 외부 AI도 없습니다.",
      "스크린샷, 사진, PDF, 문서 미리보기에 가장 좋습니다.",
      "더 많은 모델과 형식이 필요하면 언제든 클라우드나 BYOK로 전환하세요."
    ],
    "proTitle": "모든 플랜에서 사용 가능",
    "proDescription": "FREE는 Cloud AI, BYOK, 오프라인 AI에서 공통으로 50회 이름 변경을 제공합니다. PRO는 이 제한을 제거합니다. Ollama와 로컬 모델은 별도로 설치합니다.",
    "closeLabel": "닫기"
  },
  "showcase": {
    "title": "Zush 둘러보기",
    "titleAccent": "Zush",
    "description": "기능마다 짧은 데모 하나 — 탭을 클릭해 작동 모습을 확인하세요",
    "playShowcase": "데모 재생",
    "switchTo": "전환:",
    "items": {
      "batch-rename": {
        "title": "AI 일괄 이름 변경",
        "description": "실제 내용으로 여러 파일을 검토한 뒤 적용"
      },
      "monitor": {
        "title": "폴더 모니터링",
        "description": "폴더를 감시하고 새 파일 이름을 자동 변경"
      },
      "activity": {
        "title": "활동 기록",
        "description": "최근 이름 변경을 확인하고 되돌리기"
      },
      "statistics": {
        "title": "통계",
        "description": "이름 변경 양, 폴더 모니터링 비중, 활동, 파일 유형 추이를 확인"
      },
      "templates": {
        "title": "템플릿",
        "description": "AI 이름 변경과 폴더 모니터링에 재사용할 설정을 저장"
      },
      "naming-blocks": {
        "title": "Naming Blocks",
        "description": "파일 내용을 기반으로 145개 이상의 준비된 블록으로 파일명 구성"
      },
      "custom-ai-blocks": {
        "title": "사용자 지정 AI 블록",
        "description": "AI가 추출할 내용을 설명하고 나만의 이름 블록으로 재사용"
      },
      "tags": {
        "title": "스마트 태그",
        "description": "빠른 검색을 위한 태그 생성"
      },
      "multilanguage": {
        "title": "다국어",
        "description": "60개 이상 언어로 파일 이름 생성"
      },
      "custom-prompts": {
        "title": "사용자 지정 프롬프트",
        "description": "직접 작성한 지침으로 이름 생성 제어"
      },
      "byok": {
        "title": "BYOK",
        "description": "BYOK로 내 AI 제공자 연결"
      },
      "offline-ai": {
        "title": "오프라인 AI 이름 변경",
        "description": "지원 파일에 Ollama 개인 로컬 모델 사용"
      }
    }
  },
  "speedComparison": {
    "eyebrow": "속도 테스트",
    "title": "더 빠르게. 더 깔끔한 이름.",
    "titleAccent": "더 깔끔한 이름.",
    "description": "같은 파일 10개, 같은 목표: 내용 기반으로 이름 바꾸기. 전용 도구와 범용 AI 에이전트의 정면 대결.",
    "zushLabel": "Zush",
    "zushBadge": "완료",
    "zushCaption": "파일 전용으로 설계. 드롭하고, 깔끔한 이름을 받고, 다음 작업으로.",
    "rivalLabel": "클로드 코워크",
    "rivalStatus": "작업 중",
    "rivalDoneLabel": "드디어 완료",
    "rivalCaption": "뛰어난 범용 에이전트 — 하지만 일상적인 파일 작업은 그 강점이 아닙니다.",
    "rivalPlaceholderHint": "비교 영상 준비 중",
    "runningLabel": "실행 중",
    "replayLabel": "다시 재생",
    "skipToEndLabel": "끝으로 건너뛰기",
    "disclaimer": "Claude 및 Claude Cowork는 Anthropic PBC의 상표입니다. Zush는 Anthropic과 제휴되거나 후원받지 않습니다."
  },
  "whyZush": {
    "title": "Zush가 일반 이름 변경 도구보다 강한 이유",
    "titlePlatform": "{os}에서 Zush가 강한 이유",
    "description": "AI 일괄 이름 변경, 자동 폴더 모니터링, 되돌리기, BYOK, 오프라인 AI, 혼합 형식 지원을 하나의 데스크톱 앱에 담았습니다",
    "descriptionPlatform": "{os}에서 네이티브 느낌, 빠른 이름 변경, 일회성 가격, 줄어든 결정 피로",
    "nativeEyebrow": "데스크톱 네이티브 느낌",
    "nativeEyebrowPlatform": "{os} 네이티브 느낌",
    "nativeTitle": "네이티브, 빠름, 모던함",
    "nativeDescription": "Zush는 빠르게 열리고 깔끔하게 사용할 수 있으며 시스템에 자연스럽게 어울리는 진짜 데스크톱 앱처럼 느껴집니다.",
    "nativeDescriptionPlatform": "Zush는 빠르게 열리고 깔끔하게 사용할 수 있으며 {os}에 자연스럽게 어울리는 진짜 네이티브 앱처럼 느껴집니다.",
    "pricingTrustItems": [
      "✨ 무료 체험",
      "∞ 무제한 PRO",
      "↩️ 14일 환불"
    ],
    "priceEyebrow": "재사용 가능한 템플릿",
    "priceTitle": "모든 폴더에 대해 하나의 설정",
    "priceDescription": "스크린샷, 비용, 음악 트랙, 고객 메모, 법률 파일, 여행 예약 및 모니터링되는 폴더에 대한 명명 규칙을 저장하세요.",
    "priceLabel": "11개 내장",
    "speedEyebrow": "매우 빠름",
    "speedTitle": "몇 초 만에 이름 변경",
    "speedDescription": "정리는 작업을 방해하지 않을 때 지속됩니다. 파일을 넣고, 확인하고, 적용하고, 계속하세요.",
    "formatsEyebrow": "100+개 지원 형식",
    "formatsTitle": "스크린샷, PDF, 사진, 오디오, 문서, 비디오",
    "formatsDescription": "AVIF, RAW, Office 파일, PDF, 자막, MP3, M4A, WAV, FLAC, 일반 비디오 형식을 지원합니다.",
    "controlEyebrow": "Naming Blocks",
    "controlTitle": "전문 업무를 위한 구조화된 파일명",
    "controlDescription": "전문가는 자신의 작업에 맞는 블록으로 직접 파일명 패턴을 구성할 수 있습니다. AI가 각 파일을 읽고 선택한 세부 정보(고객, 날짜, 송장 번호, 장소, 프로젝트 등)로 블록을 채웁니다.",
    "workflowSteps": [
      "포토그래퍼: 날짜, 고객, 촬영, 장면",
      "의사: 방문 유형, 날짜, 기록 종류",
      "회계사: 거래처, 송장, 기간"
    ]
  },
  "useCases": {
    "items": [
      {
        "title": "디자이너",
        "description": "수백 장의 스크린샷을 뒤지지 않고 목업, UI 요소, 레퍼런스를 몇 초 만에 찾습니다."
      },
      {
        "title": "사진가",
        "description": "CR2, NEF, ARW, DNG, RAF, RW2 등 RAW 형식을 지원해 대형 사진 라이브러리를 정리합니다."
      },
      {
        "title": "마케팅 & SMM",
        "description": "캠페인 덱, 내보낸 파일, 스크린샷, 자산을 정리하고 빠르게 찾습니다."
      },
      {
        "title": "개발자",
        "description": "문서, 버그 리포트, PR 리뷰용 스크린샷을 정리하고 쉽게 검색합니다."
      },
      {
        "title": "콘텐츠 크리에이터",
        "description": "썸네일, b-roll 레퍼런스, 시각 자산을 깔끔하게 정리합니다."
      },
      {
        "title": "프로덕트 매니저",
        "description": "PRD, 회의 노트, 스프레드시트, 덱을 즉시 검색 가능하게 만듭니다."
      }
    ]
  },
  "workflows": {
    "title": "Zush로 무엇의 이름을 바꿀 수 있나요?",
    "description": "워크플로를 선택하면 각 페이지에서 해당 파일 형식을 내용 기반으로 명명하는 방법을 볼 수 있습니다.",
    "items": {
      "screenshots": {
        "title": "스크린샷 이름 바꾸기",
        "description": "\"스크린샷 2026-07-03\"이 화면 내용을 설명하는 이름으로 바뀝니다."
      },
      "pdfs": {
        "title": "PDF·스캔 이름 바꾸기",
        "description": "청구서, 계약서, 스캔본을 문서 속 텍스트 기반으로 명명."
      },
      "photos": {
        "title": "사진 이름 바꾸기",
        "description": "RAW, HEIC, JPG를 피사체와 장면 기준으로 명명."
      },
      "documents": {
        "title": "문서 이름 바꾸기",
        "description": "Word, Excel, PowerPoint, iWork 파일을 주제별로 명명."
      },
      "design": {
        "title": "디자인 파일 이름 바꾸기",
        "description": "Figma, Sketch, PSD와 내보낸 파일을 내용 기준으로 명명."
      },
      "videos": {
        "title": "동영상 이름 바꾸기",
        "description": "녹화와 클립을 프레임과 맥락 기준으로 명명."
      },
      "audio": {
        "title": "오디오 이름 바꾸기",
        "description": "MP3, WAV, 음성 메모를 소리와 메타데이터로 명명."
      },
      "organizer": {
        "title": "AI로 파일 정리",
        "description": "Downloads와 혼합 폴더를 검색 가능한 이름으로 정리합니다."
      },
      "batch": {
        "title": "파일 일괄 이름 바꾸기",
        "description": "수백 개 파일을 한 번에, 미리보기와 원클릭 되돌리기 지원."
      },
      "offline": {
        "title": "오프라인 AI 리네이머",
        "description": "Ollama 로컬 모델 사용 — 파일이 기기를 벗어나지 않습니다."
      }
    }
  },
  "faqItems": [
    {
      "question": "Zush란 무엇인가요?",
      "answer": "Zush는 Mac과 Windows용 지능형 데스크톱 앱으로, AI를 사용해 파일 이름을 자동 변경합니다. 이미지, 비디오, PDF를 포함한 지원 문서를 분석해 의미 있는 이름과 메타데이터를 만듭니다."
    },
    {
      "question": "어떤 파일 형식을 지원하나요?",
      "answer": "이미지, 비디오, 스크린샷, PDF, 문서, 스프레드시트, 프레젠테이션, 텍스트, CSV, SVG 등 일반적인 형식을 지원합니다."
    },
    {
      "question": "Zush AI Rename은 어떻게 작동하나요?",
      "answer": "AI Rename은 AI로 파일 내용을 분석해 이름을 바꿉니다. 파일 모음을 Zush 창에 끌어다 놓기만 하면 몇 초 안에 분석되고 새 이름이 생성됩니다. 변경 사항을 적용하기 전에 개별 파일명을 검토하거나 다시 생성할 수 있습니다. 스크린샷, 디자인 파일, 오디오, 비디오, PDF, iWork 문서, 다운로드를 한 번에 정리하기에 적합합니다."
    },
    {
      "question": "폴더 모니터링은 어떻게 작동하나요?",
      "answer": "선택한 폴더를 백그라운드에서 감시합니다. 새 지원 파일이 추가되면 온라인 상태에서 자동 분석하고 이름을 변경합니다."
    },
    {
      "question": "Zush는 Google Drive, Dropbox, iCloud와 함께 작동하나요?",
      "answer": "예. Zush는 클라우드 계정에 연결하지 않습니다. 클라우드 앱이 이미 동기화하는 로컬 폴더에서 파일 이름을 직접 변경하므로 별도의 인증이 필요 없습니다. Mac에서는 iCloud Drive, Google Drive, Dropbox, OneDrive, Box를 지원하며, Windows에서는 OneDrive, Google Drive, Dropbox 폴더를 지원합니다. 이름을 변경하면 새 이름이 다른 기기에 자동으로 동기화됩니다."
    },
    {
      "question": "AI가 생성한 파일명을 다시 만들 수 있나요?",
      "answer": "예. AI Rename에서 파일을 선택하고 다시 생성을 클릭하면 새 제안을 받을 수 있습니다."
    },
    {
      "question": "이름 및 태그용 AI 프롬프트를 사용자 지정할 수 있나요?",
      "answer": "예. 짧은 이름, 주제 먼저, 특정 태그만 사용 같은 사용자 규칙을 작성할 수 있습니다."
    },
    {
      "question": "데이터는 안전한가요?",
      "answer": "원본 파일은 컴퓨터에 남아 있습니다. 클라우드 모드에서는 분석에 필요한 내용만 선택한 AI 제공자에게 전송됩니다. 오프라인 모드에서는 Ollama가 로컬에서 처리합니다."
    },
    {
      "question": "변경을 되돌릴 수 있나요?",
      "answer": "예. 활동 기록에서 원래 파일 이름을 복원할 수 있습니다."
    },
    {
      "question": "Zush는 여러 언어와 날짜 형식을 지원하나요?",
      "answer": "예. Zush는 60개 이상 언어로 이름을 생성하고 원하는 날짜 형식을 사용할 수 있습니다."
    },
    {
      "question": "가격은 어떻게 되나요?",
      "answer": "Zush PRO는 두 가지 플랜입니다: Monthly 월 $10 또는 One-Time $48. BYOK와 오프라인 AI는 FREE에서도 제공되며, 두 PRO 플랜 모두 공통 50회 제한을 제거합니다."
    },
    {
      "question": "BYOK(Bring Your Own Key)이란 무엇인가요?",
      "answer": "모든 플랜의 사용자가 Gemini, OpenRouter, OpenAI, Claude API 키를 연결해 클라우드 이름 변경을 사용하며 FREE는 모든 모드에서 공통 50회, PRO는 무제한인 기능입니다. 키는 로컬에 안전하게 저장됩니다."
    },
    {
      "question": "일회성 구매 옵션이 있나요?",
      "answer": "예. 월간 플랜 외에도 48 USD 일회성 구매를 선택할 수 있습니다. BYOK와 오프라인 AI는 FREE에서도 제공되며, 두 플랜 모두 공통 50회 제한을 제거합니다."
    },
    {
      "question": "지원 운영체제는 무엇인가요?",
      "answer": "macOS 15 Sequoia 이상과 Windows 10 / 11을 지원합니다. Mac은 서명된 dmg, Mac App Store, Homebrew로 제공되며 Windows는 Microsoft Store에서 제공됩니다."
    },
    {
      "question": "앱은 어떤 AI 모델을 사용하나요?",
      "answer": "이미지, 비디오, 지원 문서를 빠르고 정확하게 분석하기 위해 최신 멀티모달 AI 모델을 사용합니다. 구체적인 모델은 최적화에 따라 바뀔 수 있습니다."
    },
    {
      "question": "오프라인으로 사용할 수 있나요?",
      "answer": "클라우드 처리는 인터넷이 필요합니다. 모든 플랜의 사용자는 Ollama와 호환 모델을 설치한 뒤 오프라인 AI를 활성화할 수 있습니다."
    },
    {
      "question": "오디오나 비디오 파일도 지원하나요?",
      "answer": "Zush 3.0은 MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, VOB 비디오와 MP3, M4A, WAV, FLAC, OGG, WebM, MPGA 오디오를 지원합니다. 오디오는 메타데이터, 인식, 전사 맥락을 활용할 수 있습니다."
    },
    {
      "question": "필요에 맞지 않으면 환불받을 수 있나요?",
      "answer": "예. Zush는 14일 환불 보장을 제공합니다. 자세한 내용은 환불 정책에서 확인할 수 있습니다."
    }
  ],
  "showcaseSlides": [
    {
      "files": [
        {
          "before": "IMG_0842.JPG",
          "after": "노란_비니를_쓴_퍼그.jpg",
          "img": "/images/examples/pug.jpg",
          "type": "image"
        },
        {
          "before": "track_01_final.mp3",
          "after": "로파이_피아노_루프_92BPM.mp3",
          "type": "audio"
        },
        {
          "before": "checkout-flow.fig",
          "after": "투자자_업데이트_덱.fig",
          "type": "design",
          "label": "무화과"
        },
        {
          "before": "budget_export_copy(2).xlsx",
          "after": "제품_출시_예산.xlsx",
          "type": "sheet"
        },
        {
          "before": "client-brief-scan.pdf",
          "after": "고객_크리에이티브_브리프.pdf",
          "type": "pdf"
        },
        {
          "before": "demo_take_02.mov",
          "after": "설정_사이드바_워크스루.mov",
          "img": "/images/examples/videos/settings-sidebar-walkthrough.webp",
          "type": "video"
        }
      ]
    },
    {
      "files": [
        {
          "before": "voice_memo_042.m4a",
          "after": "고객_디스커버리_콜.m4a",
          "type": "audio"
        },
        {
          "before": "notes_from_call_FINAL.docx",
          "after": "채용_계획_노트.docx",
          "type": "doc"
        },
        {
          "before": "forecast_2026-03-18_export.xlsx",
          "after": "매출_전망.xlsx",
          "type": "sheet"
        },
        {
          "before": "board-review.key",
          "after": "영업_킥오프_슬라이드.key",
          "type": "slides",
          "label": "키"
        },
        {
          "before": "IMG_20240812_143052.jpg",
          "after": "해변의_행복한_강아지.jpg",
          "img": "/images/examples/dog.jpg",
          "type": "image"
        },
        {
          "before": "proposal_draft_approved.pdf",
          "after": "웹사이트_제안서.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "files": [
        {
          "before": "contract_notes_clean.docx",
          "after": "공급업체_계약_노트.docx",
          "type": "doc"
        },
        {
          "before": "episode_intro_take2.wav",
          "after": "팟캐스트_인트로_인터뷰.wav",
          "type": "audio"
        },
        {
          "before": "pipeline_export_march.xlsx",
          "after": "3월_영업_파이프라인.xlsx",
          "type": "sheet"
        },
        {
          "before": "brand-system.sketch",
          "after": "캠페인_리뷰_슬라이드.sketch",
          "type": "design",
          "label": "스케치"
        },
        {
          "before": "scan_2026_03_19.pdf",
          "after": "서명된_서비스_계약.pdf",
          "type": "pdf"
        },
        {
          "before": "PXL_20240720_091234.jpg",
          "after": "선명한_노란_꽃.jpg",
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
      "title": "AI 파일 이름 변경을 통한 회계 문서 관리",
      "description": "Zush는 송장, 영수증, 명세서, 세금 양식 및 스캔을 읽은 다음 각 파일의 이름을 규칙에 맞게 지정합니다. 각 클라이언트에 대해 Template를 구축하고, 모든 배치를 미리 보고, 언제든지 실행 취소하세요. 무제한 Cloud AI, 자체 공급자 키 또는 로컬 오프라인 AI를 사용하세요."
    },
    "pageTitle": "회계 문서 관리",
    "hero": {
      "eyebrow": "회계사를 위한 AI 파일 이름 바꾸기",
      "titleLead": "회계 파일 이름 바꾸기:",
      "titleAccent": "공급업체, 날짜 및 번호",
      "subtitle": "Zush는 송장, 영수증, 명세서, 세금 양식 및 스캔을 읽은 다음 각 파일의 이름을 규칙에 맞게 지정합니다. 각 클라이언트에 대해 Template를 구축하고, 모든 배치를 미리 보고, 언제든지 실행 취소하세요. 무제한 Cloud AI, 자체 공급자 키 또는 로컬 오프라인 AI를 사용하세요.",
      "trustLine": [
        "Unmetered paid plans",
        "Private Offline AI and BYOK",
        "Preview and undo every batch"
      ],
      "photoAlt": "밝은 사무실의 데스크톱 컴퓨터에서 재무 문서를 검토하는 회계사",
      "downloadMac": "Mac용 다운로드",
      "downloadWindows": "Windows용 다운로드",
      "trustAria": "회계 문서 관리 팀이 Zush를 사용하는 이유"
    },
    "demoLabel": "Zush 송장, 영수증 및 회계 문서 폴더 이름 바꾸기",
    "audiences": {
      "eyebrow": "누구를 위한 것인가",
      "title": "회계사, 장부 담당자 및 고객 회계 팀을 위해 구축됨",
      "description": "동일한 파일 이름 바꾸기 워크플로우는 반복되는 클라이언트 접수, 영수증 처리, 조정 지원 및 월말 마감에 적합합니다.",
      "items": [
        {
          "title": "소규모 회계 관행",
          "description": "이메일, 포털, 스캐너, 공유 드라이브를 통해 청구서가 도착하는 경우에도 모든 클라이언트 접수 폴더를 자체 규칙에 따라 유지하세요.",
          "imageAlt": "소규모 회계 관행: 이메일, 포털, 스캐너 및 공유 드라이브를 통해 청구서가 도착하는 경우에도 모든 클라이언트 접수 폴더를 고유한 규칙에 따라 유지합니다."
        },
        {
          "title": "독립 회계사",
          "description": "조정이 시작되기 전에 주간 영수증 더미와 다운로드를 판매자, 날짜, 금액 및 카테고리별로 이름이 지정된 파일로 변환합니다.",
          "imageAlt": "독립적인 회계 담당자: 조정이 시작되기 전에 매주 영수증과 다운로드 파일을 판매자, 날짜, 금액, 카테고리별로 이름이 지정된 파일로 변환합니다."
        },
        {
          "title": "클라이언트 회계 및 AP팀",
          "description": "공유된 Templates를 사용하면 모든 사람이 규칙을 기억하지 않고도 청구서, 명세서, 긴밀한 지원에 이름을 지정하고 동일한 방식으로 내보낼 수 있습니다.",
          "imageAlt": "고객 회계 및 AP 팀: 공유된 Templates를 사용하면 모든 사람이 규칙을 기억하지 않고도 청구서, 명세서, 긴밀한 지원에 이름을 지정하고 동일한 방식으로 내보낼 수 있습니다."
        }
      ]
    },
    "fields": {
      "title": "모든 회계 파일 이름에 대한 필드를 선택하세요",
      "description": "Zush는 각 문서의 표시되는 내용을 읽습니다. Template는 공급업체, 날짜, 송장 번호, 금액, 카테고리, 세금 기간 또는 최종 이름에 사용되는 사용자 정의 필드를 선택합니다.",
      "instruction": "결과를 보려면 필드를 선택하세요.",
      "ariaLabel": "회계 필드 Zush 읽기",
      "hint": "제안된 파일 이름",
      "items": [
        {
          "label": "문서 날짜",
          "before": "download (7).pdf",
          "after": "2026-06-12 – Acme 공급 – INV-10234",
          "emphasis": "2026-06-12"
        },
        {
          "label": "공급업체/클라이언트",
          "before": "invoice.pdf",
          "after": "2026-06-12 – Acme 공급 – INV-10234"
        },
        {
          "label": "송장 번호",
          "before": "attachment.pdf",
          "after": "2026-06-12 – Acme 공급 – INV-10234",
          "emphasis": "INV-10234"
        },
        {
          "label": "금액",
          "before": "bill (3).pdf",
          "after": "2026-06-12 – Acme 공급 – 1,204 USD"
        },
        {
          "label": "통화",
          "before": "scan_0042.pdf",
          "after": "2026-06-12 – Acme 공급 – 1,204 USD",
          "emphasis": "USD"
        },
        {
          "label": "비용 항목",
          "before": "IMG_2041.jpg",
          "after": "2026-06-03 – Whole Foods – 식사 – 84 USD",
          "emphasis": "식사"
        },
        {
          "label": "과세연도/기간",
          "before": "scan.pdf",
          "after": "2025 – 1099-NEC – 리베라 컨설팅"
        },
        {
          "label": "결제 상태",
          "before": "invoice_copy.pdf",
          "after": "Vertex GmbH – INV-0088 – 유료",
          "emphasis": "유료"
        },
        {
          "label": "명세서 기간",
          "before": "statement_final.pdf",
          "after": "2026-05 – 최초의 국립 – 은행 명세서",
          "emphasis": "2026-05"
        },
        {
          "label": "계정/엔티티",
          "before": "export (1).xlsx",
          "after": "2026-Q2 – Vertex GmbH – 비용 요약",
          "emphasis": "Vertex GmbH"
        },
        {
          "label": "사용자 정의 필드 - 일반 언어로 설명",
          "before": "doc.pdf",
          "after": "2026-06-08 – W-9 – 리베라 컨설팅",
          "emphasis": "W-9"
        }
      ]
    },
    "privacy": {
      "eyebrow": "처리 및 개인정보 보호",
      "title": "재무 문서 처리 방법 선택",
      "description": "관리형 클라우드 AI로 빠르게 시작하고, BYOK를 사용하여 회사의 공급자 계정을 통해 분석을 라우팅하거나, 로컬 오프라인 AI를 사용하여 머신에서 지원되는 문서 분석을 유지하세요.",
      "items": [
        {
          "title": "로컬 모델을 사용한 오프라인 AI",
          "description": "로컬 Ollama 모델은 지원되는 송장, 영수증, 명세서 및 스캔이 저장된 Mac 또는 Windows PC에서 분석합니다. 파일 콘텐츠는 Zush 또는 타사 AI 제공업체로 전송되지 않습니다.",
          "badge": "파일은 컴퓨터에 남아 있습니다.",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "BYOK를 사용하는 공급자 계정",
          "description": "회사가 관리하는 AI 제공업체 계정 및 API 키를 통해 경로 분석을 수행합니다. 키는 안전한 로컬 저장소에 보관되며 팀은 클라이언트 작업에 사용되는 공급자와 모델을 선택합니다.",
          "badge": "귀하의 키와 계정",
          "kind": "byok"
        },
        {
          "title": "관리형 클라우드 AI",
          "description": "편의성이 최우선인 경우 내장된 관리 모드를 사용하세요. 유료 요금제는 계량되지 않으므로 반복적인 접수 및 백로그 정리에는 문서당 크레딧이 소비되지 않습니다.",
          "badge": "가장 빠른 설정",
          "kind": "cloud-ai"
        }
      ],
      "note": "귀하의 회사 및 고객 정책에 맞는 처리 모드를 선택하십시오. 모든 모드에서 Zush는 파일 이름을 바꾸고 저장하지 않습니다.",
      "docsLinkLabel": "모드가 데이터를 처리하는 방법 읽기"
    },
    "workflow": {
      "eyebrow": "작업 흐름",
      "title": "클라이언트 접수 폴더에서 파일 이름을 자동으로 바꿉니다.",
      "description": "클라이언트 Template를 설정하고, 섭취 폴더를 모니터링하고, 변경되기 전에 제안된 각 배치를 검토하세요.",
      "items": [
        {
          "title": "파일을 접수 폴더로 라우팅",
          "description": "이메일 첨부 파일, 포털 다운로드, 스캐너 출력 및 영수증 사진은 클라이언트 또는 엔터티당 하나의 모니터링되는 폴더에 보관될 수 있습니다."
        },
        {
          "title": "클라이언트 Template의 이름 검토",
          "description": "파일 이름에 속하는 날짜, 공급업체, 번호, 금액, 카테고리 또는 사용자 정의 필드를 선택한 다음 제안된 배치를 적용하기 전에 읽어보세요."
        },
        {
          "title": "실행 취소로 적용하고 계속 모니터링하세요",
          "description": "이름 바꾸기 기록은 배치를 되돌릴 수 있습니다. 새 소스 문서가 이미 동일한 규칙으로 명명되어 도착할 수 있도록 Template를 폴더에 할당된 상태로 유지하세요."
        }
      ],
      "links": [
        {
          "label": "단계별 송장 Template 작성",
          "href": "/docs/templates/invoices"
        },
        {
          "label": "송장 이름 변경 작동 방식",
          "href": "/rename-invoices-with-ai"
        },
        {
          "label": "접수부터 보관까지의 워크플로 구성",
          "href": "/blog/how-to-organize-invoices-and-receipts"
        }
      ]
    },
    "documents": {
      "eyebrow": "지원되는 회계 파일",
      "title": "회계 문서 Zush는 자동으로 이름을 바꿀 수 있습니다",
      "description": "지급금, 영수증, 세금 문서 및 긴밀한 지원을 위해 별도의 Templates를 사용하십시오. 각 워크플로는 원본 콘텐츠를 변경하지 않고 자체 필드와 이름 지정 패턴을 유지합니다.",
      "items": [
        {
          "title": "공급업체 송장 및 청구서",
          "description": "송장 날짜, 공급업체, 송장 번호, 금액, 통화 또는 고객 규칙에서 요구하는 필드별로 AP 문서의 이름을 지정합니다.",
          "example": "2026-06-12 – Acme 공급 – INV-10234 – 1,204 USD.pdf"
        },
        {
          "title": "영수증 및 비용 증빙",
          "description": "PDF, JPG 및 HEIC 영수증을 읽은 다음 Custom AI Block에 설명된 판매자, 날짜, 금액 및 카테고리를 추가하세요.",
          "example": "2026-06-03 – Whole Foods – 식사 – 84 USD.jpg"
        },
        {
          "title": "은행 및 카드 명세서",
          "description": "조정 중 더 빠른 검색을 위해 일반 다운로드를 기관, 계정 레이블 및 명세서 기간별로 명명된 명세서로 전환합니다.",
          "example": "2026-05 – 최초의 국가 – 운영 – 성명서.pdf"
        },
        {
          "title": "세금 양식 및 고객 문서",
          "description": "모든 파일 이름을 입력하지 않고도 양식 유형, 과세 연도, 발급자 또는 법인별로 W-9, 1099, 세금 통지 및 지원 스캔의 이름을 지정할 수 있습니다.",
          "example": "2025 – 1099-NEC – 리베라 컨설팅.pdf"
        },
        {
          "title": "급여 및 마감 보고서",
          "description": "급여 기록부, 저널 지원, 월간 보고서를 기간, 엔터티, 보고서 유형 및 승인 상태별로 정렬하세요.",
          "example": "2026-05 – Vertex GmbH – 급여 보고서 – FINAL.pdf"
        },
        {
          "title": "스프레드시트 및 내보내기",
          "description": "전달 후 최신 파일을 검색할 수 있도록 비용 내보내기, 조정 및 통합 문서 결과물의 이름을 클라이언트, 기간 및 콘텐츠별로 변경합니다.",
          "example": "2026-Q2 – Vertex GmbH – 비용 요약.xlsx"
        }
      ]
    },
    "testimonialsTitle": "회계팀이 Zush를 업무에 활용하는 방법",
    "testimonialsDescription": "일반적인 회계 문서 패턴을 기반으로 한 예시적인 워크플로우입니다.",
    "testimonialsRatingAria": "별점 5점 만점에 5점",
    "testimonials": [
      {
        "name": "Elena Park",
        "role": "회계 실무 소유자",
        "quote": "각 클라이언트에는 약간 다른 파일 이름 규칙이 있습니다. Templates는 이러한 규칙을 머릿속에 저장하고 적용하기 전에 제안된 전체 배치를 확인할 수 있습니다."
      },
      {
        "name": "Marco Ruiz",
        "role": "독립 회계사",
        "quote": "시간 낭비는 한 번의 영수증이 아니라 한 달 간의 IMG 파일 및 다운로드였습니다. 날짜, 판매자, 금액 및 카테고리별로 이름을 지정하면 사용 가능한 섭취 폴더가 제공됩니다."
      },
      {
        "name": "Nia Brown",
        "role": "고객 회계 책임자",
        "quote": "우리는 워크스테이션에 있어야 하는 클라이언트 폴더에 오프라인 AI를 사용합니다. 미리보기는 누군가 배치를 적용하기 전에 이상한 스캔을 포착합니다."
      }
    ],
    "faq": {
      "title": "회계 파일 이름 바꾸기, 답변",
      "description": "클라이언트 Templates, 폴더 모니터링, 로컬 오프라인 AI, BYOK, 미리 보기, 실행 취소 및 계량되지 않은 이름 변경이 회계 문서 워크플로우에 적합한 방식입니다.",
      "items": [
        {
          "question": "Zush는 회계 문서 관리 소프트웨어를 대체합니까?",
          "answer": "아니요. Zush는 기존 회계 스택 주변의 파일 명명 계층입니다. 송장, 영수증, 명세서, 스캔, 다운로드 및 내보내기의 이름을 바꾸지만 고객 기록을 저장하고, 액세스를 제어하고, 청구서를 승인하고, 거래를 게시하거나 문서 관리 시스템, QuickBooks, Xero 또는 회사 포털을 교체하지 않습니다."
        },
        {
          "question": "Zush는 회계사와 장부 담당자에게 어떻게 도움이 됩니까?",
          "answer": "Zush는 송장, 영수증, 명세서, 세금 양식, 스프레드시트 및 스캔을 읽은 다음 공급업체, 날짜, 송장 번호, 금액, 통화 및 카테고리와 같은 필드에서 작성된 파일 이름을 제안합니다. 배치를 적용하기 전에 검토하고 나중에 실행 취소할 수 있습니다."
        },
        {
          "question": "각 클라이언트가 서로 다른 명명 규칙을 가질 수 있습니까?",
          "answer": "그렇습니다. 클라이언트, 엔터티 또는 워크플로당 재사용 가능한 Template를 하나씩 만듭니다. Template는 파일 이름 구조, 날짜 형식, Naming Blocks 및 비용 범주, 계정 코드 또는 승인 상태와 같은 모든 Custom AI Block 필드를 제어합니다."
        },
        {
          "question": "Zush는 클라이언트 흡입 폴더를 감시할 수 있습니까?",
          "answer": "그렇습니다. Template를 폴더 모니터링에 할당하면 Zush는 새로운 이메일 저장, 포털 다운로드 또는 스캐너 출력이 도착하는 대로 처리할 수 있습니다. 이름 바꾸기 기록은 적용된 배치를 되돌릴 수 있는 상태로 유지됩니다."
        },
        {
          "question": "스캔한 송장과 영수증 사진에도 작동하나요?",
          "answer": "그렇습니다. Zush는 AI 비전을 사용하여 이미지 전용 PDF 및 지원되는 이미지 형식을 읽으므로 스캔 및 영수증 사진은 별도의 OCR 단계 없이 디지털 문서와 동일한 규칙을 따를 수 있습니다."
        },
        {
          "question": "고객 금융 데이터는 비공개로 유지되나요?",
          "answer": "파일 이름은 제자리에서 바뀌며 Zush에 의해 저장되지 않습니다. 분석을 위해 제공자 계정과 주요 회사 제어를 통해 관리형 클라우드 AI인 BYOK를 선택하거나 로컬 Ollama 모델이 포함된 오프라인 AI를 선택하여 지원되는 파일 분석이 시스템에 유지되도록 하세요."
        },
        {
          "question": "Zush는 QuickBooks 또는 Xero에 연결됩니까?",
          "answer": "Zush는 다운로드, 이메일 첨부 파일, 스캔, 내보내기 및 지원 문서 등 회계 소프트웨어를 중심으로 파일 계층을 구성합니다. QuickBooks, Xero 또는 다른 원장 내의 기록을 게시하거나 수정하지 않습니다."
        },
        {
          "question": "Zush는 문서당 비용을 청구합니까?",
          "answer": "아니요. 유료 요금제에는 파일당 크레딧이 아닌 무제한 이름 변경이 포함되어 있으므로 Template를 변경한 후 동일한 문서에 대해 다시 비용을 지불하지 않고도 폴더를 다시 실행할 수 있습니다. 처음 50개의 이름 변경은 무료로 평가할 수 있습니다."
        }
      ]
    },
    "guides": {
      "title": "회계 문서 가이드",
      "description": "QuickBooks 또는 Xero 주변에 있는 송장, 영수증, 세금 양식 및 파일에 대한 명명 규칙 및 접수 워크플로입니다.",
      "slugs": [
        "invoice-file-naming-convention",
        "automatically-rename-invoices-ai",
        "how-to-organize-invoices-and-receipts",
        "rename-invoices-for-quickbooks-xero"
      ]
    },
    "finalCta": {
      "title": "하나의 클라이언트 흡입 폴더에서 Zush를 사용해 보세요.",
      "subtitle": "복사된 송장 또는 영수증 배치를 추가하고, 제안된 이름을 읽고, Template에 다른 패스가 필요한 경우 이름 변경을 취소하세요."
    }
  },
  "medical": {
    "path": "/for-medical",
    "seo": {
      "title": "오프라인 AI 파일 이름 변경을 통한 의료 문서 관리",
      "description": "Zush는 의료 문서 관리의 파일 이름 레이어를 처리합니다. 이는 귀하가 선택한 필드를 사용하여 스캔한 의료 기록, 팩스, 실험실 보고서 및 접수 양식의 이름을 바꿉니다. 로컬 오프라인 AI 또는 조직에서 제어하는 ​​BYOK를 사용하여 EHR와 함께 작동하며 일괄 미리보기 및 실행 취소도 가능합니다."
    },
    "pageTitle": "의료 문서 관리",
    "hero": {
      "eyebrow": "의료 행위를 위한 의료 문서 관리",
      "titleLead": "의료 문서 이름 바꾸기",
      "titleAccent": "MRN, 날짜 및 유형",
      "subtitle": "Zush는 의료 문서 관리의 파일 이름 레이어를 처리합니다. 이는 귀하가 선택한 필드를 사용하여 스캔한 의료 기록, 팩스, 실험실 보고서 및 접수 양식의 이름을 바꿉니다. 로컬 오프라인 AI 또는 조직에서 제어하는 ​​BYOK를 사용하여 EHR와 함께 작동하며 일괄 미리보기 및 실행 취소도 가능합니다.",
      "trustLine": [
        "Local Offline AI",
        "Organization-controlled BYOK",
        "Preview and undo every batch"
      ],
      "photoAlt": "데스크톱 컴퓨터를 사용하여 스캔한 의료 기록을 정리하는 의사",
      "downloadMac": "Mac용 다운로드",
      "downloadWindows": "Windows용 다운로드",
      "trustAria": "의료 문서 관리 팀이 Zush를 사용하는 이유"
    },
    "demoLabel": "Zush 스캔한 의료 기록 폴더 이름 바꾸기",
    "audiences": {
      "eyebrow": "누구를 위한 것인가",
      "title": "소규모 의료 행위 및 문서 작업이 많은 팀을 위해 제작됨",
      "description": "동일한 파일 이름 변경 워크플로우는 EHR를 교체하지 않고도 진료 접수, 프론트 데스크 스캔 및 의료 청구에 적합합니다.",
      "items": [
        {
          "title": "개인 연습 및 클리닉 소유자",
          "description": "그날의 섭취량 더미는 누구도 입력하지 않고도 하룻밤 사이에 MRN, 서비스 날짜 및 기록 유형별로 이름이 지정된 기록 세트가 됩니다.",
          "imageAlt": "개인 진료소 및 진료소 소유자: 그날의 접수 더미는 누구도 입력하지 않고도 하룻밤 사이에 MRN, 서비스 날짜 및 기록 유형별로 이름이 지정된 기록 세트가 됩니다."
        },
        {
          "title": "실무 관리자 및 프론트 데스크",
          "description": "교육 세션 없이 스캔하는 모든 사람에 대한 하나의 규칙입니다. Template는 규칙을 유지합니다. 직원이 그냥 파일을 넣어요.",
          "imageAlt": "실무 관리자 및 프런트 데스크: 교육 세션 없이 스캔하는 모든 사람에 대한 하나의 규칙입니다. Template는 규칙을 유지합니다. 직원이 그냥 파일을 넣어요."
        },
        {
          "title": "의료비 청구",
          "description": "EOB, ERA, 청구 서신은 계좌 번호와 지불인별로 이름이 지정되므로 송금액을 청구서와 일치시키는 것이 더 이상 사냥이 아닙니다.",
          "imageAlt": "의료 청구: EOB, ERA 및 계좌 번호와 지불인별로 이름이 지정된 청구 서신이므로 송금액을 청구서와 일치시키는 것이 더 이상 사냥이 아닙니다."
        }
      ]
    },
    "fields": {
      "title": "의료 기록 필드",
      "description": "모든 의료 기록 파일 이름에 대한 필드를 선택하세요.",
      "instruction": "결과를 보려면 필드를 선택하세요.",
      "ariaLabel": "의료 분야 Zush 읽기",
      "hint": "제안된 파일 이름",
      "footnote": "Custom AI Blocks는 \"의뢰 의사\", \"시술 코드\" 또는 \"서명 날짜\" 등 귀하가 설명하는 모든 필드를 추출할 수 있습니다. Template는 파일 이름의 일부가 될 필드를 결정합니다.",
      "filenamePattern": "{내부 ID} - {서비스 날짜} - {문서 유형}",
      "filenameExamples": [
        "MRN-48211 – 2026-06-12 – Lab Results.pdf",
        "MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf",
        "MRN-51402 – 2026-06-05 – Intake Form.pdf"
      ],
      "items": [
        {
          "label": "MRN / 환자 ID",
          "before": "Scan0001.pdf",
          "after": "MRN-48211 – 2026-06-12 – 랩 결과",
          "emphasis": "MRN-48211"
        },
        {
          "label": "서비스 날짜",
          "before": "Scan0002.pdf",
          "after": "MRN-48211 – 2026-06-12 – 랩 결과",
          "emphasis": "2026-06-12"
        },
        {
          "label": "레코드 유형",
          "before": "fax_received.pdf",
          "after": "MRN-30177 – 2026-05-30 – 흉부 엑스레이",
          "emphasis": "흉부 엑스레이"
        },
        {
          "label": "추천 제공자",
          "before": "referral.pdf",
          "after": "MRN-30177 – 2026-06-02 – 첸 박사",
          "emphasis": "첸 박사"
        },
        {
          "label": "전문 분야",
          "before": "consult_note.pdf",
          "after": "MRN-30177 – 2026-06-02 – 심장학",
          "emphasis": "심장학"
        },
        {
          "label": "지급인/보험",
          "before": "eob.pdf",
          "after": "ACC-2210 – 2026-06-04 – 블루 크로스",
          "emphasis": "블루 크로스"
        },
        {
          "label": "청구번호",
          "before": "Scan_0052.pdf",
          "after": "ACC-2210 – 2026-06-04 – 클레임 88213",
          "emphasis": "클레임 88213"
        },
        {
          "label": "금액",
          "before": "statement.pdf",
          "after": "ACC-2210 – 2026-06-04 – 애트나 $1,240",
          "emphasis": "$1,240"
        },
        {
          "label": "절차 코드",
          "before": "procedure.pdf",
          "after": "MRN-51402 – 2026-06-05 – CPT 93000",
          "emphasis": "CPT 93000"
        },
        {
          "label": "문서 날짜",
          "before": "outside_records.pdf",
          "after": "MRN-51402 – 2026-06-05 – 외부 기록",
          "emphasis": "2026-06-05"
        },
        {
          "label": "사용자 정의 필드 - 일반 언어로 설명",
          "before": "doc_20260608.pdf",
          "after": "MRN-51402 – 2026-06-05 – 동의서",
          "emphasis": "동의서"
        }
      ]
    },
    "privacy": {
      "eyebrow": "비공개 처리",
      "title": "의료 문서에 대한 오프라인 및 BYOK 처리",
      "description": "로컬 Ollama 모델을 사용하여 지원되는 분석을 실행하거나 AI 공급자 계정 및 주요 조직 제어를 통해 라우팅하세요. Zush는 파일 이름을 바꾸고 저장하지 않습니다.",
      "items": [
        {
          "title": "로컬 모델을 사용한 오프라인 AI",
          "description": "로컬 Ollama 모델은 저장된 Mac 또는 Windows PC에서 지원되는 스캔 및 문서를 분석합니다. 파일 콘텐츠는 Zush 또는 타사 AI 제공업체로 전송되지 않습니다.",
          "badge": "기록용으로 추천",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "조직 관리 BYOK",
          "description": "조직이 제어하는 AI 공급자 계정 및 API 키를 통해 경로 분석을 수행합니다. 키는 안전한 로컬 저장소에 보관되며 팀은 워크플로에 사용되는 공급자와 모델을 선택합니다.",
          "badge": "귀하의 제공업체 계정",
          "kind": "byok"
        },
        {
          "title": "관리형 클라우드 AI",
          "description": "일반 파일에는 관리형 클라우드 처리가 가능합니다. 의료 문서 워크플로의 경우 팀이 따르는 정책에 따라 오프라인 AI 또는 조직의 BYOK 설정을 사용하세요.",
          "badge": "일반 파일의 경우",
          "kind": "cloud-ai"
        }
      ],
      "note": "문서 콘텐츠가 컴퓨터에 유지되어야 하는 경우 오프라인 AI를 사용하세요. 조직에서 자체 공급자 계정 및 키를 통해 분석을 라우팅하는 경우 BYOK를 사용하세요. 모든 모드에서 Zush는 파일 이름을 바꾸고 저장하지 않습니다.",
      "docsLinkLabel": "모드가 데이터를 처리하는 방법 읽기"
    },
    "workflow": {
      "eyebrow": "작업 흐름",
      "title": "스캐너 및 팩스 폴더의 레코드 이름을 자동으로 바꿉니다.",
      "description": "하나의 의료 기록 Template를 설정하고 접수 폴더를 모니터링하며 변경 사항이 발생하기 전에 제안된 각 배치를 검토합니다.",
      "items": [
        {
          "title": "스캔 폴더에 Zush를 지정하세요.",
          "description": "폴더 모니터링은 흡입 폴더, 공유 드라이브, 팩스 스풀 등 스캐너나 팩스 소프트웨어가 기록하는 모든 내용을 감시합니다."
        },
        {
          "title": "제안된 이름 검토",
          "description": "미리보기는 형식이 아닌 컨트롤입니다. 일괄 처리를 읽고, 승인된 필드만 각 파일 이름에 나타나는지 확인하고, 잘못된 것으로 보이는 항목을 다시 생성합니다."
        },
        {
          "title": "실행 취소하여 적용",
          "description": "이름 바꾸기 기록은 모든 배치를 되돌립니다. 규칙 변경은 정리 프로젝트가 아닌 재실행입니다."
        }
      ],
      "links": [
        {
          "label": "Template 레코드를 단계별로 구축",
          "href": "/docs/templates/medical-records"
        },
        {
          "label": "스캔한 문서 이름 바꾸기 작동 방식",
          "href": "/rename-scanned-documents"
        },
        {
          "label": "소규모 스캔 작업 흐름 구성",
          "href": "/blog/how-to-organize-scanned-medical-records-small-practice"
        }
      ]
    },
    "documents": {
      "eyebrow": "지원되는 의료 파일",
      "title": "의료 문서 Zush는 자동으로 이름을 바꿀 수 있습니다",
      "description": "임상 기록용으로 하나의 Template를 사용하고 청구 서류 작업용으로 다른 하나를 사용하십시오. 각 흐름은 원본 문서를 변경하지 않고 자체 필드와 이름 지정 패턴을 유지합니다.",
      "items": [
        {
          "title": "스캔된 환자 기록",
          "description": "스캐너 출력 및 아카이브 내보내기를 내부 ID, 서비스 날짜 및 문서 유형을 기반으로 구축된 일관된 파일 이름으로 변환합니다.",
          "example": "MRN-48211 – 2026-06-12 – 진행 상황 노트.pdf"
        },
        {
          "title": "실험실 보고서",
          "description": "이미지 전용 연구실 PDF를 읽고 별도의 OCR 워크플로 없이 식별자, 서비스 날짜, 보고서 유형별로 이름을 지정하세요.",
          "example": "MRN-48211 – 2026-06-12 – 실험실 결과.pdf"
        },
        {
          "title": "추천 및 팩스 문서",
          "description": "들어오는 추천, 상담 편지 및 팩스 기록을 식별한 다음 나머지 진료에서 사용하는 것과 동일한 명명 패턴을 적용합니다.",
          "example": "MRN-30177 – 2026-06-02 – 추천 – 심장학.pdf"
        },
        {
          "title": "섭취 및 동의서",
          "description": "모든 접수 배치가 하나의 재사용 가능한 Template를 따르도록 프런트 데스크 스캔에서 양식 유형과 서명 날짜를 추출합니다.",
          "example": "MRN-51402 – 2026-06-05 – 동의서.pdf"
        },
        {
          "title": "이미징 및 상담 보고서",
          "description": "팀이 나중에 검색하는 데 사용하는 필드별로 이미징 보고서, 전문가 메모 및 외부 기록의 이름을 지정하세요.",
          "example": "MRN-30177 – 2026-05-30 – 영상 – 흉부 X-Ray.pdf"
        },
        {
          "title": "EOB, ERA 및 청구 서신",
          "description": "지불인 문서, 계좌 참조, 송금 및 청구 서신에는 별도의 청구서 Template를 사용하십시오.",
          "example": "ACC-2210 – 2026-06-04 – 시대 – Aetna.pdf"
        }
      ]
    },
    "testimonialsTitle": "임상의가 말하는 것",
    "testimonialsDescription": "생계를 위해 기록을 제출하는 사람들의 피드백입니다.",
    "testimonialsRatingAria": "별점 5점 만점에 5점",
    "testimonials": [
      {
        "name": "Dr. Amir Khan",
        "role": "진료소 주인",
        "quote": "후속 메모를 위해 별도의 익명화된 아카이브를 보관합니다. 오프라인 AI를 사용하면 Zush는 방문 날짜와 기록 유형별로 스캔 이름을 지정할 수 있습니다. 맹목적으로 실행하는 것은 아니지만 타이핑 시간을 단축시킵니다."
      },
      {
        "name": "Renata Alves",
        "role": "실무 관리자",
        "quote": "프론트 데스크에서는 모든 것을 하나의 폴더로 스캔하고 저녁에는 Scan-something이라는 파일이 400개로 늘어났습니다. 이제 MRN과 날짜로 이름이 나옵니다. 나는 아직도 지원하기 전에 미리보기 목록을 읽습니다. 그것이 나를 편안하게 해주는 부분입니다."
      },
      {
        "name": "Dana Whitfield",
        "role": "의료 청구인",
        "quote": "청구에 대한 송금을 일치시키는 것은 내 주 중 최악의 시간이었습니다. 계좌 번호와 지불인별로 EOB의 이름을 지정하는 것이 대부분의 작업이었습니다. 몇 가지 스캔이 일반으로 돌아와서 직접 수정합니다."
      }
    ],
    "pricingPreface": "무제한 라이선스 1개. 문서당 크레딧이 없습니다. 템플릿을 변경한 후 무료로 폴더를 다시 실행하세요.",
    "faq": {
      "title": "의료 기록 파일 이름 변경, 답변",
      "description": "로컬 모델, 조직 제어 BYOK, 스캐너 폴더, Templates, 미리 보기 및 실행 취소가 의료 문서 워크플로우에 어떻게 적합합니까?",
      "items": [
        {
          "question": "Zush HIPAA를 준수합니까?",
          "answer": "Zush는 앱 자체가 워크플로 HIPAA를 준수한다고 주장하지 않습니다. 오프라인 AI는 워크스테이션에서 지원되는 파일 분석을 유지하지만 규정 준수는 장치 보안, 액세스 제어, 백업, 보존, 파일 이름 정책 및 조직의 절차에 따라 달라집니다. 보호된 건강 정보를 처리하기 전에 개인 정보 보호 책임자 또는 보안 책임자에게 전체 작업 흐름을 검토하도록 하세요."
        },
        {
          "question": "Zush는 환자 기록을 어디에도 업로드하지 않고도 이름을 바꿀 수 있습니까?",
          "answer": "그렇습니다. 오프라인 AI 모드에서 Zush는 Mac 또는 Windows의 로컬 Ollama 모델을 사용하여 지원되는 파일을 분석합니다. 레코드는 머신에서 완전히 읽고 이름이 변경됩니다. 파일 콘텐츠는 Zush 또는 타사 AI 공급자에게 전송되지 않으며 Zush는 파일을 저장하지 않습니다."
        },
        {
          "question": "진료실에서는 의료 기록 파일 이름을 어떻게 구성해야 합니까?",
          "answer": "실용적인 시작 패턴은 내부 ID, 서비스 날짜 및 문서 유형입니다. 조직에서 정확한 명명 정책을 결정하고 Zush Template가 이를 일관되게 적용합니다. 문서 내부의 폴더 목록에 표시할 필요가 없는 세부 정보를 보관하고 제안된 배치를 적용하기 전에 검토하세요."
        },
        {
          "question": "스캔한 기록과 팩스를 처리합니까?",
          "answer": "그렇습니다. 대부분의 기록은 텍스트 레이어 없이 스캐너 또는 팩스 출력으로 입력됩니다. Zush는 별도의 OCR 패스 없이 AI 비전으로 페이지 이미지를 읽고 페이지에 인쇄된 내용에서 식별자, 서비스 날짜 및 기록 유형을 추출합니다."
        },
        {
          "question": "Zush는 필기 또는 품질이 낮은 스캔을 읽을 수 있습니까?",
          "answer": "인쇄된 실험실 보고서, 팩스로 전송된 추천서, 손으로 직접 작성한 양식 등 일반적인 사무실 스캔은 안정적으로 읽혀집니다. 촘촘하게 손으로 쓴 메모와 심하게 비뚤어지거나 희미한 페이지는 그렇지 않습니다. 이러한 메모는 잘못된 이름 대신 일반적인 이름으로 돌아오고, 미리 보기를 통해 무엇이든 적용하기 전에 확인할 수 있습니다."
        },
        {
          "question": "Zush는 의료 문서 관리 소프트웨어나 EHR를 대체합니까?",
          "answer": "아니요. Zush는 EHR 또는 문서 관리 시스템 주변의 파일 이름 레이어(스캐너 및 팩스 출력, 내보낸 기록, 가져오기 대기 중인 첨부 파일 및 보관 폴더)를 처리합니다. EHR 자체에 연결하거나 읽거나 수정하지 않습니다. 문서가 EHR 내에 있는 경우 Zush는 관련되지 않습니다. 폴더에 있는 경우 Zush로 이름을 지정할 수 있습니다."
        },
        {
          "question": "의료 행위에서는 어떤 AI 모드를 사용해야 합니까?",
          "answer": "지원되는 문서 분석이 컴퓨터에 남아 있어야 하는 경우 오프라인 AI를 사용하십시오. Mac 또는 Windows에서 로컬 Ollama 모델을 실행합니다. 조직에서 자체 AI 공급자 계정 및 API 키를 통해 분석을 라우팅하려는 경우 BYOK를 사용하세요. 팀은 내부 정책과 일치하는 모드를 선택합니다."
        },
        {
          "question": "시스템을 변경한 후에도 명명 규칙이 여전히 유효합니까?",
          "answer": "파일명 자체에 식별자와 서비스 날짜, 기록 종류 등을 넣는 이유다. 기록은 기록을 생성한 소프트웨어보다 오래 지속됩니다. 내보내기, 마이그레이션 또는 아카이브 드라이브는 해당 파일에 의미를 부여한 데이터베이스를 제거하고 자체 설명적인 파일 이름이 살아남습니다. 이런 방식으로 명명된 폴더는 파일 브라우저 외에는 아무것도 없이 10년 후에도 여전히 읽을 수 있습니다."
        },
        {
          "question": "스캐너 폴더 이름을 자동으로 바꿀 수 있나요?",
          "answer": "그렇습니다. 스캐너 또는 팩스 소프트웨어가 저장하는 폴더의 폴더 모니터링에 Template를 할당하면 각 새 문서가 도착할 때 규칙에 따라 이름이 변경됩니다. 미리보기 배치 및 되돌리기 위한 이름 변경 기록이 포함됩니다."
        }
      ]
    },
    "guides": {
      "title": "의료문서 정리 안내",
      "description": "EHR 외부의 기록을 처리하는 소규모 업무를 위한 실용적인 스캐너, 이름 지정 및 개인 정보 보호 워크플로우입니다.",
      "slugs": [
        "how-to-organize-scanned-medical-records-small-practice",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "스캔 폴더 하나에서 Zush를 사용해 보세요.",
      "subtitle": "어제 섭취량을 가리키고 제안된 이름을 읽고 마음에 들지 않으면 배치를 취소하세요. 오프라인 AI는 컴퓨터에서 전체 실행을 유지합니다."
    }
  },
  "photographers": {
    "path": "/for-photographers",
    "seo": {
      "title": "사진 작가 및 비디오 작가를 위한 AI 파일 이름 바꾸기",
      "description": "Zush는 RAW 사진, JPEG 및 비디오 클립을 읽은 다음 각 파일에 이미 있는 콘텐츠와 메타데이터에서 검색 가능한 파일 이름을 제안합니다. 스튜디오에 맞게 Template라는 이름을 만들고 배치를 검토한 후 원본 미디어를 현재 위치에 정확하게 유지하세요."
    },
    "pageTitle": "사진작가와 영상작가를 위한 AI 파일 이름 바꾸기",
    "hero": {
      "eyebrow": "사진 작가 및 비디오 작가의 경우",
      "titleLead": "모든 촬영의 이름을 다음으로 변경하세요.",
      "titleAccent": "프로젝트, 씬, 테이크",
      "subtitle": "Zush는 RAW 사진, JPEG 및 비디오 클립을 읽은 다음 각 파일에 이미 있는 콘텐츠와 메타데이터에서 검색 가능한 파일 이름을 제안합니다. 스튜디오에 맞게 Template라는 이름을 만들고 배치를 검토한 후 원본 미디어를 현재 위치에 정확하게 유지하세요.",
      "trustLine": [
        "RAW, photo, and video formats",
        "Custom naming Templates",
        "Preview and undo every batch"
      ],
      "photoAlt": "일광 스튜디오에서 함께 촬영을 검토하는 사진작가와 비디오그래퍼",
      "downloadMac": "Mac용 다운로드",
      "downloadWindows": "Windows용 다운로드",
      "trustAria": "사진 작가 및 비디오 작가 팀이 AI 파일 이름을 바꾸는 데 Zush를 사용하는 이유"
    },
    "demoLabel": "Zush 사진과 비디오 클립이 혼합된 폴더 이름 바꾸기",
    "audiences": {
      "eyebrow": "크리에이티브 팀을 위한",
      "title": "카드 수집부터 클라이언트 전달까지 모든 파일 이름을 유용하게 유지하세요.",
      "description": "팀이 이미 알고 있는 크리에이티브 도구를 교체하지 않고도 스틸, 영상, 내보내기 및 아카이브 전반에 동일한 이름 지정 레이어를 사용할 수 있습니다.",
      "items": [
        {
          "title": "인물사진, 웨딩, 이벤트 사진작가",
          "description": "반복되는 카메라 카운터를 프로젝트, 날짜, 주제, 순간 및 위치로 대체합니다. 선별하기 전에도 유용하고 몇 년이 지나도 여전히 이해할 수 있습니다.",
          "imageAlt": "인물 사진, 웨딩 및 이벤트 사진 작가: 반복되는 카메라 카운터를 프로젝트, 날짜, 주제, 순간 및 위치로 교체합니다. 선별하기 전에도 유용하고 몇 년이 지난 후에도 여전히 이해할 수 있습니다."
        },
        {
          "title": "비디오그래퍼 및 편집자",
          "description": "일반 카메라 클립을 검색 가능한 B-롤, 인터뷰, 위치, 장면으로 변환하고 편집이 시작되기 전에 이름을 지정하세요.",
          "imageAlt": "비디오 제작자 및 편집자: 일반 카메라 클립을 검색 가능한 B-롤, 인터뷰, 위치, 장면으로 변환하고 편집이 시작되기 전에 이름을 지정합니다."
        },
        {
          "title": "스튜디오 및 제작팀",
          "description": "보조자, 제작자 및 편집자에게 수집 폴더, 활성 프로젝트, 결과물 및 아카이브에 대한 하나의 공유 규칙을 제공합니다.",
          "imageAlt": "스튜디오 및 제작팀: 어시스턴트, 프로듀서, 편집자에게 수집 폴더, 활성 프로젝트, 결과물 및 아카이브에 대한 하나의 공유 규칙을 제공합니다."
        }
      ]
    },
    "fields": {
      "title": "스튜디오 이름 지정 필드",
      "description": "스튜디오에서 검색한 세부정보를 바탕으로 파일 이름을 만드세요.",
      "instruction": "결과를 보려면 필드를 탭하세요.",
      "ariaLabel": "사진 및 비디오 필드 Zush 읽기",
      "hint": "제안된 파일 이름",
      "items": [
        {
          "label": "캡처 날짜",
          "before": "DSC_4831.NEF",
          "after": "2026-06-14 – 오르테가 웨딩 – 식전",
          "emphasis": "2026-06-14"
        },
        {
          "label": "클라이언트/프로젝트",
          "before": "IMG_7294.CR3",
          "after": "오르테가 웨딩 – 초상화 – 안뜰",
          "emphasis": "오르테가 웨딩"
        },
        {
          "label": "주제",
          "before": "DSCF1042.RAF",
          "after": "마야 첸 – 스튜디오 초상화 – 룩 02",
          "emphasis": "마야 첸"
        },
        {
          "label": "장면 / 위치",
          "before": "A001_C003.mov",
          "after": "리버 하우스 - 골든 아워 외관 - 03번 탑승"
        },
        {
          "label": "샷 유형",
          "before": "MVI_8842.MP4",
          "after": "Northwind 캠페인 – 제품 클로즈업 – Take 02",
          "emphasis": "제품 클로즈업"
        },
        {
          "label": "테이크",
          "before": "C0048.MOV",
          "after": "창립자 인터뷰 – 카메라 A – Take 04"
        },
        {
          "label": "카메라",
          "before": "A003_0614AB.MOV",
          "after": "창립자 인터뷰 – 카메라 A – Take 03",
          "emphasis": "카메라 A"
        },
        {
          "label": "오리엔테이션",
          "before": "IMG_9107.ARW",
          "after": "해안 사설 – 세로 – 세로"
        },
        {
          "label": "결과물 유형",
          "before": "final_final_03.mp4",
          "after": "Northwind 출시 – 소셜 컷 – 9x16"
        },
        {
          "label": "사용자 정의 필드 - 일반 언어로 설명",
          "before": "DSC_4908.NEF",
          "after": "오르테가 웨딩 – 첫 번째 댄스 – 선택",
          "emphasis": "첫 번째 댄스"
        }
      ]
    },
    "privacy": {
      "eyebrow": "처리 및 개인정보 보호",
      "title": "각 클라이언트 촬영을 분석하는 방법을 선택하세요",
      "description": "관리형 AI로 시작하고, 스튜디오가 제어하는 공급자 계정을 연결하거나, 비공개 및 미공개 작업에 대해 지원되는 시각적 분석을 로컬에서 실행하세요.",
      "items": [
        {
          "title": "Cloud AI로 빠르게 시작하세요",
          "description": "Zush 관리형 AI를 사용하여 시각적 미리보기와 샘플링된 비디오 프레임을 분석한 다음 제안된 이름을 검토한 후 촬영에 적용합니다.",
          "badge": "가장 빠른 설정",
          "badgeTone": "success",
          "kind": "cloud-ai"
        },
        {
          "title": "자신의 AI 계정을 사용하세요",
          "description": "스튜디오에서 이미 사용하고 있는 공급자와 모델을 연결하세요. 귀하가 공급자 계정을 제어하는 ​​동안 API 키는 안전한 로컬 저장소에 유지됩니다.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "클라이언트 작업을 컴퓨터에 유지",
          "description": "미공개 캠페인, 비공개 이벤트 또는 고객 영상을 로컬에 유지해야 하는 경우 Mac 또는 Windows에서 로컬 Ollama 모델을 사용하여 지원되는 시각적 분석을 실행하세요.",
          "badge": "오프라인 AI",
          "kind": "offline-ai"
        }
      ],
      "note": "Zush는 미디어의 이름을 바꾸며 새 자산 라이브러리가 되지 않습니다. 각 워크플로에 대한 처리 모드를 선택하고, 기존 폴더 구조를 유지하며, 일괄 처리를 되돌려야 할 경우 이름 변경 기록을 사용하세요.",
      "docsLinkLabel": "모드가 데이터를 처리하는 방법 읽기"
    },
    "workflow": {
      "eyebrow": "작업 흐름",
      "title": "워크플로를 재구성하지 않고도 촬영 이름을 일괄적으로 변경할 수 있습니다.",
      "description": "Lightroom, Capture One, NLE 및 스토리지 레이아웃을 유지하세요. 미디어가 이미 있는 폴더 주위에 재사용 가능한 이름 지정 단계를 하나 추가합니다.",
      "items": [
        {
          "title": "스튜디오 명명 규칙 구축",
          "description": "날짜, 클라이언트, 프로젝트, 주제, 위치, 장면, 촬영 유형, 촬영, 카메라 및 팀에 필요한 모든 사용자 정의 필드를 재사용 가능한 하나의 Template에 결합하세요."
        },
        {
          "title": "수집 또는 보관 폴더에서 실행",
          "description": "소스 미디어를 이동하지 않고도 복사된 촬영, 카드 수집, 내보내기 폴더 또는 RAW 사진, JPEG 및 비디오 클립의 혼합 아카이브를 추가할 수 있습니다."
        },
        {
          "title": "검토, 적용 및 재사용",
          "description": "제안된 이름을 하나의 배치로 읽고 예외를 수정하고 실행 취소가 가능한 상태로 적용한 후 다음 작업에서 동일한 Template를 재사용합니다."
        }
      ],
      "links": [
        {
          "label": "Zush가 사진 이름을 바꾸는 방법 보기",
          "href": "/rename-photos-with-ai"
        },
        {
          "label": "Zush가 비디오 클립의 이름을 바꾸는 방법을 확인하세요.",
          "href": "/rename-videos-with-ai"
        },
        {
          "label": "재사용 가능한 이름 Template 구축",
          "href": "/docs/templates"
        }
      ]
    },
    "documents": {
      "eyebrow": "지원되는 미디어",
      "title": "스틸, 영상, 결과물에 대한 단일 이름 지정 워크플로",
      "description": "미디어 캡처 및 내보내기를 위해 별도의 Templates를 사용하거나 혼합 프로젝트 폴더에 하나의 스튜디오 규칙을 적용하십시오.",
      "items": [
        {
          "title": "RAW 사진 촬영",
          "description": "원래 RAW 확장자를 유지하면서 카메라 카운터를 프로젝트, 날짜, 주제, 장면 또는 위치를 전달하는 이름으로 바꾸십시오.",
          "example": "2026-06-14 – 오르테가 결혼식 – 식 – 첫 키스.nef"
        },
        {
          "title": "초상화 및 이벤트 갤러리",
          "description": "선별, 전달 또는 장기 보관 전에 JPEG, HEIC, TIFF 및 RAW 선택에 걸쳐 하나의 읽기 가능한 규칙을 적용합니다.",
          "example": "Maya Chen – 스튜디오 초상화 – Look 02.cr3"
        },
        {
          "title": "B-롤 및 위치 영상",
          "description": "편집자가 모든 파일을 열기 전에 유용한 영상을 찾을 수 있도록 보이는 주제, 설정, 샷 유형 및 프로젝트별로 짧은 클립의 이름을 지정하세요.",
          "example": "리버 하우스 – 외부 – 골든 아워 – Wide.mov"
        },
        {
          "title": "인터뷰 및 멀티 카메라 촬영",
          "description": "발표자, 인터뷰 주제, 카메라 및 필드 촬영을 사용하여 비슷한 번호의 클립을 Finder 또는 File Explorer에서 쉽게 스캔할 수 있도록 하세요.",
          "example": "창립자 인터뷰 – 카메라 A – Take 04.mp4"
        },
        {
          "title": "소셜 및 클라이언트 내보내기",
          "description": "최종 파일 이름을 전달에 필요한 프로젝트, 결과물, 화면비, 언어 또는 버전 필드로 바꿉니다.",
          "example": "Northwind 출시 – 소셜 컷 – 9x16 – v03.mp4"
        },
        {
          "title": "혼합 스튜디오 아카이브",
          "description": "각 파일의 사용 가능한 컨텍스트에서 제안된 파일 이름을 사용하여 사진, 영상, 오디오, 자막 및 제작 문서 전반에 걸쳐 하나의 배치를 실행합니다.",
          "example": "해안 사설 – 비하인드 스토리 – 스튜디오 설정.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "조직 성과",
      "title": "더 나은 미디어 파일 이름이 변경되는 이유",
      "description": "그 대가는 미용적인 것이 아닙니다. 가져오기 전, 협업 중, 전달 후에도 계속해서 이해할 수 있는 미디어입니다.",
      "items": [
        {
          "title": "열기 전에 샷을 찾아보세요",
          "description": "설명적인 주제, 장면, 위치 또는 테이크는 폴더 목록을 촬영의 유용한 첫 번째 통과 인덱스로 바꿉니다."
        },
        {
          "title": "모든 카메라에서 규칙을 유지하세요",
          "description": "재사용 가능한 Template는 다양한 본체, 카드 및 운영자의 파일이 동일한 스튜디오 명명 순서를 따르도록 만듭니다."
        },
        {
          "title": "스스로 설명하는 미디어 전달",
          "description": "편집자와 클라이언트는 카탈로그, NLE, 공유 드라이브 또는 전달 플랫폼 외부의 프로젝트 컨텍스트를 유지하는 파일 이름을 받습니다."
        }
      ]
    },
    "faq": {
      "title": "사진 및 비디오 파일 이름 바꾸기, 답변",
      "description": "Zush가 RAW 사진, 비디오 클립, Templates, 처리 모드, 일괄 검토, 기존 크리에이티브 도구 및 실행 취소를 처리하는 방법.",
      "items": [
        {
          "question": "사진작가를 위한 좋은 파일 명명 규칙은 무엇입니까?",
          "answer": "실용적인 시작점은 캡처 날짜, 클라이언트 또는 프로젝트, 피사체 또는 장면, 그리고 위치, 샷 유형 또는 선택 상태와 같은 간단한 차별화 요소입니다. 순서를 일관되게 유지하고 팀이 나중에 실제로 검색할 필드를 사용하세요."
        },
        {
          "question": "Zush는 RAW 사진의 이름을 바꿀 수 있습니까?",
          "answer": "그렇습니다. Zush는 CR2, CR3, NEF, ARW, DNG, ORF, RAF, RW2, PEF, SRW, SR2 및 RAW를 포함한 일반적인 RAW 형식을 지원합니다. 사용 가능한 미리 보기와 메타데이터를 분석하고 새 파일 이름을 제안하며 파일 확장자를 유지합니다."
        },
        {
          "question": "AI가 비디오 클립의 내용을 기준으로 이름을 바꿀 수 있나요?",
          "answer": "예. Zush는 프레임을 샘플링하고 사용 가능한 자막 또는 대본 컨텍스트가 있는 경우 이를 사용한 다음 MP4, MOV, M4V, MTS, M2TS 등과 같은 지원되는 형식에 대한 설명 이름을 제안합니다. 배치를 적용하기 전에 검토하십시오."
        },
        {
          "question": "장면, 위치 또는 테이크별로 클립 이름을 지정할 수 있나요?",
          "answer": "그렇습니다. 해당 필드를 Template에 추가하거나 Custom AI Block를 사용하여 스튜디오별 필드를 설명하세요. 결과는 각 파일에서 사용 가능한 시각적 및 메타데이터 컨텍스트에 따라 달라지므로 모호한 클립의 경우 미리 보기 단계가 중요합니다."
        },
        {
          "question": "Zush는 Lightroom, Capture One 또는 NLE를 대체합니까?",
          "answer": "아니요. Zush는 기존 워크플로 주변의 파일 이름 레이어를 처리합니다. 가져오기 전, 전달 중 또는 아카이브에서 일반 폴더의 미디어 이름을 바꿉니다. 선별, 색상, 편집, 카탈로그, 타임라인 또는 디지털 자산 관리를 대체하지 않습니다."
        },
        {
          "question": "아직 출시되지 않은 클라이언트 작업이나 개인 클라이언트 작업을 오프라인으로 유지할 수 있나요?",
          "answer": "그렇습니다. 오프라인 AI는 Mac 또는 Windows에서 지원되는 분석을 위해 로컬 Ollama 모델을 사용하므로 파일 콘텐츠가 Zush 또는 타사 AI 제공업체로 전송되지 않습니다. 스튜디오가 자체 공급자 계정을 통해 분석을 라우팅할 때 BYOK를 사용할 수도 있습니다."
        },
        {
          "question": "이름이 변경된 촬영을 취소할 수 있나요?",
          "answer": "그렇습니다. 제안된 모든 파일 이름을 적용하기 전에 검토하고, 명명 규칙에 또 다른 단계가 필요한 경우 이름 변경 기록을 사용하여 배치를 되돌립니다."
        },
        {
          "question": "Zush는 내 사진 및 비디오 파일을 이동하거나 업로드합니까?",
          "answer": "Zush는 파일의 이름을 바꾸고 새 라이브러리로 이동하거나 저장하지 않습니다. 클라우드 처리는 압축 분석 페이로드를 보낼 수 있습니다. BYOK는 귀하의 공급자 계정을 사용합니다. 오프라인 AI는 머신에서 지원되는 분석을 유지합니다."
        }
      ]
    },
    "guides": {
      "title": "사진 및 영상 정리 가이드",
      "description": "RAW 촬영, 사진 라이브러리, 클라이언트 내보내기 및 비디오 클립에 대한 이름 지정 및 보관 워크플로우입니다.",
      "slugs": [
        "ai-photo-renamer-guide",
        "best-ways-to-organize-photos-on-mac",
        "rename-video-files-with-ai",
        "digital-photo-organization-mistakes-to-avoid"
      ]
    },
    "finalCta": {
      "title": "복사된 촬영 폴더 하나에 Zush를 사용해 보세요.",
      "subtitle": "작은 RAW 사진 또는 클립 세트로 시작하고, 제안된 이름을 검토하고, Template를 다듬고, 다른 패스가 필요한 경우 배치를 실행 취소합니다."
    }
  },
  "legal": {
    "path": "/for-legal",
    "seo": {
      "title": "오프라인 AI 파일 이름 변경을 통한 법률 문서 관리",
      "description": "Zush는 탄원서, 계약서, 서신, 발견 및 스캔을 읽은 다음 일관되고 검색 가능한 파일 이름을 제공합니다. Mac 또는 Windows의 기존 폴더, 공유 드라이브 및 DMS 내보내기와 함께 사용하세요."
    },
    "pageTitle": "법률 문서 관리",
    "hero": {
      "eyebrow": "법률회사 및 법무팀용",
      "titleLead": "법률 문서 이름 바꾸기:",
      "titleAccent": "사안, 날짜, 유형",
      "subtitle": "Zush는 탄원서, 계약서, 서신, 발견 및 스캔을 읽은 다음 일관되고 검색 가능한 파일 이름을 제공합니다. Mac 또는 Windows의 기존 폴더, 공유 드라이브 및 DMS 내보내기와 함께 사용하세요.",
      "trustLine": [
        "Works with your existing folders",
        "Offline AI for confidential files",
        "Preview before every rename"
      ],
      "photoAlt": "사무실에 있는 데스크톱 컴퓨터에서 사건 문서를 검토하고 있는 젊은 변호사",
      "downloadMac": "Mac용 다운로드",
      "downloadWindows": "Windows용 다운로드",
      "trustAria": "법률 문서 관리팀이 Zush를 사용하는 이유"
    },
    "demoLabel": "Zush 법률 문서를 검색 가능한 문제 파일로 정리",
    "audiences": {
      "eyebrow": "법적 파일 정리",
      "title": "폴더가 작업 공간이면 파일 이름이 색인이 됩니다.",
      "description": "Zush는 법무팀이 공식 문서 관리 시스템 이전, 옆, 외부에 있는 문서를 정리하는 데 도움을 줍니다.",
      "items": [
        {
          "title": "공유 폴더로 작업하는 소규모 회사",
          "description": "다른 문서 저장소를 구입하지 않고도 Finder, File Explorer, OneDrive, Dropbox 또는 네트워크 드라이브에서 케이스 파일을 이해할 수 있도록 유지합니다.",
          "imageAlt": "공유 폴더에서 작업하는 소규모 회사: 다른 문서 저장소를 구입하지 않고도 Finder, File Explorer, OneDrive, Dropbox 또는 네트워크 드라이브 전체에서 사례 파일을 이해할 수 있도록 유지합니다."
        },
        {
          "title": "소송 및 법률 보조팀",
          "description": "다운로드한 탄원서, 제작물, 전시회, 서신 및 스캐너 출력물을 제출하거나 검토하기 전에 연대순 문제 폴더로 전환하세요.",
          "imageAlt": "소송 및 법률 보조원 팀: 제출 또는 검토 전에 다운로드한 변론, 제작물, 전시물, 서신 및 스캐너 출력물을 연대순 문제 폴더로 전환합니다."
        },
        {
          "title": "법무팀 및 DMS 관리자",
          "description": "문서가 시스템 간에 이동하거나 DMS를 떠날 때 컨텍스트를 유지할 수 있도록 접수, 마이그레이션 및 내보내기 시 파일 이름을 표준화합니다.",
          "imageAlt": "법무팀 및 DMS 관리자: 문서가 시스템 간에 이동하거나 DMS를 떠날 때 컨텍스트를 유지할 수 있도록 접수, 마이그레이션 및 내보내기 시 파일 이름을 표준화합니다."
        }
      ]
    },
    "fields": {
      "title": "법적 사안 명명 필드",
      "description": "모든 사건 폴더를 검색 가능한 문제 기록으로 전환",
      "instruction": "결과를 보려면 필드를 탭하세요.",
      "ariaLabel": "법적 필드 Zush 읽기",
      "hint": "제안된 파일 이름",
      "items": [
        {
          "label": "문제번호",
          "before": "document (7).pdf",
          "after": "2026-0142 – 2026-06-12 – 발견 명령",
          "emphasis": "2026-0142"
        },
        {
          "label": "문서 날짜",
          "before": "scan_0048.pdf",
          "after": "2026-0142 – 2026-06-13 – 변호사 편지",
          "emphasis": "2026-06-13"
        },
        {
          "label": "문서 유형",
          "before": "download (3).pdf",
          "after": "2026-0142 – 2026-05-06 – 불만 사항",
          "emphasis": "불만 사항"
        },
        {
          "label": "클라이언트",
          "before": "signed_final.pdf",
          "after": "Northwind – 2026-06-01 – NDA – 실행됨"
        },
        {
          "label": "당사자 / 상대방",
          "before": "contract_v2.docx",
          "after": "Northwind – NDA – Meridian – 초안 v02"
        },
        {
          "label": "법원 / 장소",
          "before": "efile.pdf",
          "after": "2026-0142 – 2026-05-29 – 답변 – SDNY",
          "emphasis": "SDNY"
        },
        {
          "label": "상태",
          "before": "agreement.pdf",
          "after": "Northwind – 서비스 계약 – 실행됨",
          "emphasis": "실행됨"
        },
        {
          "label": "버전",
          "before": "ltr_draft_final2.docx",
          "after": "2026-0142 – 요구서 – v03",
          "emphasis": "v03"
        },
        {
          "label": "작성자/변호사",
          "before": "correspondence.pdf",
          "after": "2026-0142 – 2026-06-13 – 편지 – J. Chen"
        },
        {
          "label": "사용자 정의 필드 - 일반 언어로 설명",
          "before": "Scan0091.pdf",
          "after": "2026-0158 – 별첨 B – 송장 세트"
        }
      ]
    },
    "privacy": {
      "eyebrow": "기밀 처리",
      "title": "원하는 방식으로 기밀 법률 문서를 정리하세요.",
      "description": "워크플로의 문서를 기반으로 로컬 처리, 회사에서 승인한 AI 제공업체 또는 Zush 관리형 AI를 선택하세요. 소스 파일은 팀이 이미 보관하고 있는 곳에 유지됩니다.",
      "items": [
        {
          "title": "로컬 모델을 사용한 오프라인 AI",
          "description": "저장된 Mac 또는 Windows PC에서 로컬 Ollama 모델로 지원되는 케이스 파일을 구성합니다. 문서 내용은 Zush 또는 AI 공급자에게 전송되지 않습니다.",
          "badge": "컴퓨터에 파일 보관",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "회사의 AI 계정을 사용하세요",
          "description": "귀사에서 승인한 AI 제공업체 계정과 모델을 연결하세요. API 키는 안전한 로컬 저장소에 유지되며, 공급자는 귀하가 선택한 문서를 처리합니다.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "관리형 AI로 시작하기",
          "description": "기밀이 아닌 문서와 빠른 평가를 위해 Zush 관리형 AI를 사용하세요. 클라이언트 파일에 다른 처리 정책이 필요한 경우 오프라인 AI 또는 BYOK를 선택하세요.",
          "badge": "가장 빠른 설정",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush는 케이스 파일의 저장소가 되지 않습니다. 문서의 이름을 바꾸고 저장하지 않습니다. 귀하의 회사는 각 워크플로에 대해 문서 콘텐츠가 처리되는 방법을 선택합니다.",
      "docsLinkLabel": "모드가 데이터를 처리하는 방법 읽기"
    },
    "workflow": {
      "eyebrow": "작업 흐름",
      "title": "이미 사용하고 있는 도구에 일관된 파일 구성을 추가하세요.",
      "description": "Zush를 이메일, 법원 다운로드, 스캐너, 공유 폴더 및 법률 문서 관리 시스템 간의 이름 지정 레이어로 사용하세요.",
      "items": [
        {
          "title": "법적 사안 명명 규칙 정의",
          "description": "고객 또는 사안 번호, 문서 날짜, 유형, 당사자, 상태, 버전 및 실무에서 사용하는 모든 분야에서 Template를 구축하세요."
        },
        {
          "title": "섭취 또는 아카이브에서 실행",
          "description": "문서를 새 플랫폼으로 이동하지 않고도 복사된 사례 폴더, 다운로드한 파일, 스캐너 출력 또는 DMS 내보내기를 구성합니다."
        },
        {
          "title": "법적 사안에 준비된 파일 이름 승인",
          "description": "전체 배치를 검토하고 예외를 수정한 후 이름 변경 내역을 적용합니다. 그런 다음 동일한 규칙으로 반복 섭취 폴더를 모니터링합니다."
        }
      ],
      "links": [
        {
          "label": "Template라는 법적 문서를 작성하세요.",
          "href": "/docs/templates/legal-documents"
        },
        {
          "label": "법률 문서 접수 폴더 자동화",
          "href": "/docs/folder-monitoring"
        },
        {
          "label": "법적 파일 명명 규칙 및 예를 확인하세요.",
          "href": "/blog/legal-file-naming-conventions"
        }
      ]
    },
    "documents": {
      "eyebrow": "지원되는 법적 파일",
      "title": "모든 법적 문제와 관련된 문서를 하나의 정리 도구로 정리",
      "description": "회사 전체에서 일관된 문제 기반 구조를 유지하면서 소송, 거래 작업, 검색 및 고객 접수에 대해 별도의 명명 규칙을 만듭니다.",
      "items": [
        {
          "title": "법원 서류",
          "description": "문제, 날짜, 문서 유형 및 장소별로 불만 사항, 답변, 발의, 명령, 통지 및 전자 접수 영수증의 이름을 지정합니다.",
          "example": "2026-0142 – 2026-05-29 – 답변 – SDNY.pdf"
        },
        {
          "title": "계약 및 합의",
          "description": "초안, 수정 지시, 깨끗한 사본, 실행된 계약을 고객과 거래 상대방 간에 뚜렷하게 유지하십시오.",
          "example": "Northwind – NDA – Meridian – 실행 – 2026-06-01.pdf"
        },
        {
          "title": "대응",
          "description": "요구서, 의뢰인 서신, 상대 변호인과의 의사소통 내용을 시간순으로 정리합니다.",
          "example": "2026-0142 – 2026-06-10 – 요구서 – v03.docx"
        },
        {
          "title": "발견과 전시",
          "description": "제작물, 답변, 전시 세트, 증언 자료, 증거 스캔 등을 사안별 분야별로 명명합니다.",
          "example": "2026-0158 – 2026-06-11 – 첨부 B – 송장 세트.pdf"
        },
        {
          "title": "내부 작업 제품",
          "description": "연구, 인터뷰 메모, 전략 메모, 증언 준비 파일에 동일한 규칙을 적용합니다.",
          "example": "2026-0142 – 2026-06-12 – 메모 – 기탁 준비.docx"
        },
        {
          "title": "스캐너 출력",
          "description": "이미지 전용 PDF와 일반 소스 이름이 포함된 서면 서신을 검색 가능한 자료 파일로 전환하세요.",
          "example": "2026-0158 – 2026-06-13 – 서신 – 변호사.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "조직 성과",
      "title": "더 나은 법적 파일 구성 변경 사항",
      "description": "목표는 더 예쁜 파일 이름이 아닙니다. 문서가 어디를 가든 이해가 가능한 사건 파일입니다.",
      "items": [
        {
          "title": "열기 전에 올바른 문서를 찾으세요",
          "description": "문제 번호, 문서 유형, 당사자 및 상태는 폴더 목록을 다운로드 및 스캔 번호의 벽 대신 유용한 색인으로 바꿉니다."
        },
        {
          "title": "사건 연대기를 한눈에 읽어보세요",
          "description": "문서 날짜를 일관된 ISO 형식으로 지정하면 문제 폴더가 서류, 편지, 계약 및 이벤트의 타임라인으로 정렬됩니다."
        },
        {
          "title": "DMS 외부에서 컨텍스트 유지",
          "description": "자체 설명적 파일 이름은 이메일 첨부 파일, 클라이언트 내보내기, 공유 드라이브, 검색 세트 및 비공개 자료 아카이브에서 여전히 유용합니다."
        }
      ]
    },
    "faq": {
      "title": "법률 문서 정리, 답변",
      "description": "AI 파일 구성이 문제 폴더, 공유 드라이브, 법률 문서 관리 소프트웨어, 기밀 파일, 미리보기 및 실행 취소와 함께 작동하는 방식입니다.",
      "items": [
        {
          "question": "법률 문서를 정리하는 가장 좋은 방법은 무엇입니까?",
          "answer": "고객 및 사안별로 문서를 정리한 다음, 사안 번호, 문서 날짜, 문서 유형, 당사자, 버전 또는 상태를 기반으로 구축된 일관된 파일 이름을 사용하세요. 이를 통해 각 폴더를 검색 가능하고 시간순으로 작성하는 동시에 공유 드라이브, 내보내기 및 문서 관리 시스템 전반에 걸쳐 규칙을 이식할 수 있습니다."
        },
        {
          "question": "AI가 법률 문서를 자동으로 정리할 수 있나요?",
          "answer": "그렇습니다. Zush는 PDF, Word 문서 및 스캔의 내용을 읽고 Template에 정의된 필드를 추출하며 배치에 대해 일관된 파일 이름을 제안합니다. 파일 이름이 변경되기 전에 사람이 결과를 검토합니다."
        },
        {
          "question": "Zush가 법률 문서 관리 소프트웨어를 대체합니까?",
          "answer": "아니요. Zush는 DMS 관련 문서(인테이크 폴더, 공유 드라이브, 다운로드한 파일, 스캐너 출력, 마이그레이션 배치 및 내보내기)를 위한 조직 레이어입니다. 파일 이름을 바꾸며 문서 저장, 액세스 제어, 법률 조사 또는 문제 관리를 제공하지 않습니다."
        },
        {
          "question": "Zush는 기밀 사건 파일을 업로드하지 않고도 정리할 수 있나요?",
          "answer": "그렇습니다. 오프라인 AI 모드에서는 지원되는 파일이 Mac 또는 Windows의 로컬 Ollama 모델로 분석되므로 문서 콘텐츠가 해당 시스템에 유지됩니다. Zush는 파일 이름을 바꾸고 저장하지 않습니다."
        },
        {
          "question": "법률 회사는 오래된 사건 파일을 어떻게 정리할 수 있나요?",
          "answer": "복사된 비공개 문제 폴더로 시작하여 해당 문서에 이미 존재하는 필드에 대해 Template를 정의하고 제안된 이름을 일괄적으로 미리 봅니다. 규칙이 신뢰할 수 있으면 실행 취소할 수 있는 이름 변경 기록이 있는 아카이브에 규칙을 적용하세요."
        },
        {
          "question": "Zush는 법률 문서에서 문제 번호를 추출할 수 있나요?",
          "answer": "그렇습니다. 문제 또는 사건 번호와 필수 형식을 설명하는 Custom AI Block를 추가합니다. 블록은 문서 날짜, 유형, 당사자, 장소, 상태, 버전 또는 Template라는 이름의 기타 회사별 필드와 함께 나타날 수 있습니다."
        },
        {
          "question": "법원 서류와 스캔된 법률 문서를 정리합니까?",
          "answer": "그렇습니다. Zush는 별도의 OCR 단계 없이 AI 비전으로 전자파일링 PDF와 이미지 전용 스캐너 출력을 읽을 수 있습니다. 폴더 모니터링은 해당 문서가 도착하는 위치를 감시할 수 있습니다."
        },
        {
          "question": "초안, 수정 지시, 실행된 사본을 구별할 수 있습니까?",
          "answer": "그렇습니다. 트랜잭션 Template에 상태 및 버전 필드를 포함하면 제안된 각 파일 이름이 문서가 초안, 수정 사항, 깨끗한 사본 또는 실행된 계약인지 식별할 수 있습니다."
        }
      ]
    },
    "guides": {
      "title": "법률 문서 구성 가이드",
      "description": "로펌 DMS 관련 문서에 대한 사안별 네이밍, 스캐너 접수, 프라이빗 AI 처리 등을 수행합니다.",
      "slugs": [
        "legal-file-naming-conventions",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "Zush를 사용하여 하나의 복사된 사례 폴더 구성",
      "subtitle": "다운로드, 초안, 스캔이 가득한 법적 사안 폴더로 시작하세요. 제안된 파일 이름을 검토하고, 명명 규칙을 구체화하고, 또 다른 단계가 필요한 경우 배치를 실행 취소합니다."
    }
  },
  "hr": {
    "path": "/for-hr",
    "seo": {
      "title": "오프라인 AI 파일 이름 변경을 통한 HR 문서 관리",
      "description": "Zush는 이력서, 제안 편지, 온보딩 양식, 리뷰, 정책 및 내보낸 기록을 읽은 다음 일관되고 검색 가능한 파일 이름을 제공합니다. Mac 또는 Windows에서 기존 폴더, 공유 드라이브, ATS 다운로드 및 HRIS 내보내기와 함께 사용하세요."
    },
    "pageTitle": "인사 문서 관리",
    "hero": {
      "eyebrow": "HR 및 인력 팀용",
      "titleLead": "HR 문서 이름 바꾸기",
      "titleAccent": "직원, 날짜 및 유형",
      "subtitle": "Zush는 이력서, 제안 편지, 온보딩 양식, 리뷰, 정책 및 내보낸 기록을 읽은 다음 일관되고 검색 가능한 파일 이름을 제공합니다. Mac 또는 Windows에서 기존 폴더, 공유 드라이브, ATS 다운로드 및 HRIS 내보내기와 함께 사용하세요.",
      "trustLine": [
        "Works with your existing folders",
        "Offline AI for sensitive records",
        "Preview before every rename"
      ],
      "photoAlt": "현대 사무실에서 직원 온보딩 문서를 검토하는 HR 전문가",
      "downloadMac": "Mac용 다운로드",
      "downloadWindows": "Windows용 다운로드",
      "trustAria": "HR 문서 관리 팀이 Zush를 사용하는 이유"
    },
    "demoLabel": "Zush HR 문서를 검색 가능한 직원 및 후보자 파일로 구성",
    "audiences": {
      "eyebrow": "HR 파일 구성",
      "title": "사람 시스템 간에 파일이 이동할 때 파일 이름은 컨텍스트를 전달합니다.",
      "description": "Zush는 인력 팀이 ATS 또는 HRIS 앞, 옆, 외부에 있는 문서를 구성하는 데 도움이 됩니다.",
      "items": [
        {
          "title": "HR 일반직 및 소규모 인력 팀",
          "description": "Finder, File Explorer, OneDrive, Dropbox 또는 네트워크 드라이브 전체에서 온보딩, 직원 변경 사항, 검토 및 오프보딩 문서를 이해할 수 있도록 유지하세요.",
          "imageAlt": "HR 일반 직원 및 소규모 인력 팀: Finder, File Explorer, OneDrive, Dropbox 또는 네트워크 드라이브 전체에서 온보딩, 직원 변경, 검토 및 오프보딩 문서를 이해할 수 있도록 유지합니다."
        },
        {
          "title": "채용 및 인재 확보",
          "description": "ATS 다운로드, 이력서, 포트폴리오, 인터뷰 노트, 스코어카드, 서명된 제안을 핸드오프 또는 보관하기 전에 일관된 후보자 기록으로 전환하세요.",
          "imageAlt": "채용 및 인재 확보: ATS 다운로드, 이력서, 포트폴리오, 인터뷰 노트, 스코어카드, 서명된 제안을 핸드오프 또는 보관하기 전에 일관된 후보자 기록으로 전환합니다."
        },
        {
          "title": "인력 운영 및 HRIS 관리자",
          "description": "직원 기록이 시스템 간에 이동하거나 HRIS를 떠날 때 컨텍스트를 유지할 수 있도록 접수, 마이그레이션 및 내보내기 시 파일 이름을 표준화합니다.",
          "imageAlt": "인력 운영 및 HRIS 관리자: 직원 기록이 시스템 간에 이동하거나 HRIS를 떠날 때 컨텍스트를 유지할 수 있도록 접수, 마이그레이션 및 내보내기 시 파일 이름을 표준화합니다."
        }
      ]
    },
    "fields": {
      "title": "인물 기록 필드",
      "description": "모든 HR 폴더를 검색 가능한 인사 기록으로 전환",
      "instruction": "결과를 보려면 필드를 탭하세요.",
      "ariaLabel": "HR 필드 Zush 읽기",
      "hint": "제안된 파일 이름",
      "items": [
        {
          "label": "직원 ID",
          "before": "scan_0048.pdf",
          "after": "EMP-1042 – 2026-08-03 – 혜택 등록",
          "emphasis": "EMP-1042"
        },
        {
          "label": "후보자",
          "before": "resume-final.pdf",
          "after": "Rivera Sofia – 제품 디자이너 – 이력서"
        },
        {
          "label": "문서 날짜",
          "before": "document (7).pdf",
          "after": "EMP-1042 – 2026-08-03 – 제안서",
          "emphasis": "2026-08-03"
        },
        {
          "label": "문서 유형",
          "before": "download (3).pdf",
          "after": "EMP-1042 – 2026-08-05 – 세금 양식",
          "emphasis": "세금 양식"
        },
        {
          "label": "역할/직위",
          "before": "candidate_notes.docx",
          "after": "Rivera Sofia – 제품 디자이너 – 인터뷰 노트",
          "emphasis": "제품 디자이너"
        },
        {
          "label": "부서",
          "before": "policy_ack.pdf",
          "after": "EMP-1186 – 재무 – 보안 정책 승인"
        },
        {
          "label": "발효일",
          "before": "signed_letter.pdf",
          "after": "EMP-1042 – 프로모션 – 2026년 9월 1일 발효"
        },
        {
          "label": "검토기간",
          "before": "review_final2.docx",
          "after": "EMP-1042 – 성능 검토 – 2026년 상반기",
          "emphasis": "2026년 상반기"
        },
        {
          "label": "상태",
          "before": "offer.pdf",
          "after": "Rivera Sofia – 제품 디자이너 – 제안 – 서명됨",
          "emphasis": "서명됨"
        },
        {
          "label": "사용자 정의 필드 - 일반 언어로 설명",
          "before": "Form0091.pdf",
          "after": "EMP-1042 – 장비 계약 – 노트북 반환"
        }
      ]
    },
    "privacy": {
      "eyebrow": "민감한 파일 처리",
      "title": "중요한 HR 문서를 원하는 방식으로 정리하세요",
      "description": "워크플로의 문서를 기반으로 로컬 처리, 조직에서 승인한 AI 제공업체 또는 Zush 관리형 AI를 선택하세요. 소스 파일은 팀이 이미 보관하고 있는 곳에 보관됩니다.",
      "items": [
        {
          "title": "로컬 모델을 사용한 오프라인 AI",
          "description": "지원되는 직원 및 후보자 파일이 저장된 Mac 또는 Windows PC에서 로컬 Ollama 모델을 사용하여 구성합니다. 문서 내용은 Zush 또는 AI 공급자에게 전송되지 않습니다.",
          "badge": "컴퓨터에 파일 보관",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "조직의 AI 계정을 사용하세요",
          "description": "조직에서 승인한 AI 공급자 계정과 모델을 연결하세요. API 키는 안전한 로컬 저장소에 유지되며, 공급자는 귀하가 선택한 문서를 처리합니다.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "관리형 AI로 시작하기",
          "description": "샘플 또는 중요하지 않은 문서와 빠른 평가를 위해 Zush 관리형 AI를 사용하세요. 인사 기록에 다른 처리 정책이 필요한 경우 오프라인 AI 또는 BYOK를 선택하세요.",
          "badge": "가장 빠른 설정",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush는 직원 또는 후보자 파일에 대한 기록 시스템이 되지 않습니다. 문서의 이름을 바꾸고 저장하지 않습니다. 조직은 각 워크플로우에 대해 문서 콘텐츠가 처리되는 방식을 선택합니다.",
      "docsLinkLabel": "모드가 데이터를 처리하는 방법 읽기"
    },
    "workflow": {
      "eyebrow": "작업 흐름",
      "title": "이미 사용하고 있는 HR 도구에 일관된 파일 구성을 추가하세요.",
      "description": "Zush를 이메일, 모집 다운로드, 스캐너, 공유 폴더와 ATS 또는 HRIS 사이의 명명 레이어로 사용하세요.",
      "items": [
        {
          "title": "HR 명명 규칙 정의",
          "description": "직원 또는 후보자 ID, 문서 날짜, 유형, 역할, 부서, 검토 기간, 상태 및 인력 팀이 사용하는 모든 필드를 바탕으로 Template를 구축하세요."
        },
        {
          "title": "섭취 또는 내보내기 시 실행",
          "description": "파일을 새 플랫폼으로 이동하지 않고도 복사된 직원 폴더, 다운로드 모집, 온보딩 스캔, 정책 승인, ATS 또는 HRIS 내보내기를 구성할 수 있습니다."
        },
        {
          "title": "검색 가능한 파일명 승인",
          "description": "전체 배치를 검토하고 예외를 수정한 후 이름 변경 내역을 적용합니다. 그런 다음 동일한 규칙으로 반복 섭취 폴더를 모니터링합니다."
        }
      ],
      "links": [
        {
          "label": "직원 파일 명명 규칙 구축",
          "href": "/blog/hr-employee-file-naming-convention"
        },
        {
          "label": "온보딩 문서 접수 구성",
          "href": "/blog/organize-employee-onboarding-documents"
        },
        {
          "label": "후보자 및 모집 파일 정리",
          "href": "/blog/organize-candidate-files-recruiting"
        }
      ]
    },
    "documents": {
      "eyebrow": "지원되는 HR 파일",
      "title": "직원 수명주기 전반에 걸쳐 파일을 하나의 정리 도구로 관리",
      "description": "일관된 인력 기반 구조를 유지하면서 채용, 온보딩, 직원 변경, 성과, 정책 승인 및 오프보딩에 대한 별도의 명명 규칙을 만듭니다.",
      "items": [
        {
          "title": "모집 및 후보자 파일",
          "description": "이력서, 포트폴리오, 인터뷰 노트, 스코어카드, 배경 조사 문서, 제안, 역할, 날짜, 상태별로 이름을 지정하세요.",
          "example": "Rivera Sofia – 제품 디자이너 – 제안 – Signed.pdf"
        },
        {
          "title": "온보딩 기록",
          "description": "서명된 제안, 세금 양식, 혜택 선택, 신분 증명서, 장비 계약 및 정책 승인서를 뚜렷하게 유지하십시오.",
          "example": "EMP-1042 – 2026-08-05 – 혜택 등록.pdf"
        },
        {
          "title": "직원 변경",
          "description": "승진 편지, 보상 변경, 이동, 휴가 기록, 유연 근무 계약을 발효 날짜 및 상태별로 정리합니다.",
          "example": "EMP-1042 – 프로모션 – 2026-09-01 발효.pdf"
        },
        {
          "title": "성능 및 개발",
          "description": "직원 및 검토 기간별로 검토 양식, 목표, 개발 계획, 교육 수료증, 관리자 메모를 지정합니다.",
          "example": "EMP-1042 – 성능 검토 – 2026 H1.pdf"
        },
        {
          "title": "정책 및 승인",
          "description": "직원, 정책 및 날짜별로 별도의 핸드북 영수증, 보안 교육, 행동 강령 승인 및 정책 업데이트를 제공합니다.",
          "example": "EMP-1186 – 보안 정책 승인 – 2026-07-22.pdf"
        },
        {
          "title": "오프보딩 및 아카이브",
          "description": "워크플로를 보존하거나 보관하기 전에 퇴사 양식, 장비 반환, 최종 편지 및 내보낸 인사 기록을 일반 파일로 전환하세요.",
          "example": "EMP-1042 – 장비 반납 – 완료 – 2026-10-04.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "조직 성과",
      "title": "더 나은 HR 파일 구성 변경 사항",
      "description": "목표는 더 예쁜 파일 이름이 아닙니다. 승인된 워크플로가 문서를 보낼 때마다 이해할 수 있는 인력 기록입니다.",
      "items": [
        {
          "title": "기록을 열기 전에 식별하십시오.",
          "description": "직원 또는 후보자 ID, 문서 유형, 역할, 기간 및 상태는 폴더 목록을 다운로드 및 스캔 번호의 벽 대신 유용한 색인으로 바꿉니다."
        },
        {
          "title": "수명주기 전달을 더 쉽게 검토할 수 있도록 합니다.",
          "description": "일관된 이름은 채용, HR, 관리자, 급여, IT 및 운영팀이 승인된 워크플로를 통과할 때 파일이 무엇인지 이해하는 데 도움이 됩니다."
        },
        {
          "title": "HRIS 외부의 컨텍스트를 유지합니다.",
          "description": "자체 설명적 파일 이름은 승인된 내보내기, 마이그레이션 일괄 처리, 공유 폴더, 직원 패킷 및 보존 아카이브에서 여전히 유용합니다."
        }
      ]
    },
    "faq": {
      "title": "HR 문서 구성, 답변",
      "description": "AI 파일 구성이 직원 폴더, 채용 다운로드, HRIS 및 ATS 내보내기, 민감한 기록, 미리보기 및 실행 취소와 함께 작동하는 방식.",
      "items": [
        {
          "question": "HR 문서를 구성하는 가장 좋은 방법은 무엇입니까?",
          "answer": "HRIS 또는 ATS를 기록 시스템으로 사용한 다음 문서 날짜, 유형, 역할 또는 부서, 기간 및 상태를 기반으로 구축된 직원 또는 후보자 ID와 일관된 파일 이름별로 파일을 구성합니다. 조직의 정책에서 요구하지 않는 한 파일 이름에서 민감한 개인 정보를 보호하세요."
        },
        {
          "question": "AI가 직원 파일을 자동으로 정리할 수 있나요?",
          "answer": "그렇습니다. Zush는 PDF, Word 문서, 이미지 및 스캔을 읽고 Template에 정의된 필드를 추출하며 배치에 대해 일관된 파일 이름을 제안합니다. 파일 이름이 변경되기 전에 사람이 결과를 검토합니다."
        },
        {
          "question": "Zush는 HRIS, ATS 또는 직원 문서 관리 시스템을 대체합니까?",
          "answer": "아니요. Zush는 접수 폴더, 공유 드라이브, 채용 다운로드, 스캐너 출력, 마이그레이션 일괄 처리 및 내보내기를 위한 조직 레이어입니다. 파일 이름을 바꾸며 직원 기록 저장, 권한, 채용, 급여, 보존 시행 또는 사례 관리를 제공하지 않습니다."
        },
        {
          "question": "Zush는 민감한 HR 파일을 업로드하지 않고도 정리할 수 있나요?",
          "answer": "그렇습니다. 오프라인 AI 모드에서는 지원되는 파일이 Mac 또는 Windows의 로컬 Ollama 모델로 분석되므로 문서 콘텐츠가 해당 시스템에 유지됩니다. Zush는 파일 이름을 바꾸고 저장하지 않습니다."
        },
        {
          "question": "HR에서는 직원 문서의 이름을 어떻게 지정해야 합니까?",
          "answer": "실용적인 패턴은 EmployeeID – YYYY-MM-DD – DocumentType – PeriodOrStatus입니다. 후보 파일의 경우 후보 – 역할 – 문서 유형 – 상태를 사용합니다. 정확한 필드는 조직의 액세스, 개인 정보 보호 및 보존 정책을 따라야 합니다."
        },
        {
          "question": "Zush는 직원 ID와 유효 날짜를 추출할 수 있나요?",
          "answer": "그렇습니다. 직원 ID, 유효 날짜, 검토 기간, 역할, 부서 또는 기타 조직별 필드와 필수 형식을 설명하는 Custom AI Blocks를 추가합니다."
        },
        {
          "question": "스캔한 온보딩 양식을 정리합니까?",
          "answer": "그렇습니다. Zush는 별도의 OCR 단계 없이 AI 비전으로 이미지 전용 PDF와 사진 촬영된 문서를 읽을 수 있습니다. 폴더 모니터링은 온보딩 문서가 도착하는 승인된 위치를 감시할 수 있습니다."
        },
        {
          "question": "HR에서는 채용 및 직원 기록에 대해 서로 다른 명명 규칙을 사용할 수 있습니까?",
          "answer": "그렇습니다. 후보자 모집, 온보딩, 직원 변경, 성과 문서 및 오프보딩을 위해 별도의 Templates를 생성하여 각 워크플로에서 필요한 필드만 추출합니다."
        }
      ]
    },
    "guides": {
      "title": "HR 문서 구성 가이드",
      "description": "직원, 후보자 및 온보딩 문서에 대한 명명 규칙 및 접수 워크플로입니다.",
      "slugs": [
        "hr-employee-file-naming-convention",
        "organize-employee-onboarding-documents",
        "organize-candidate-files-recruiting"
      ]
    },
    "finalCta": {
      "title": "Zush를 사용하여 복사된 HR 폴더 하나를 구성합니다.",
      "subtitle": "채용 다운로드, 온보딩 양식 또는 내보낸 직원 문서 폴더로 시작하세요. 제안된 파일 이름을 검토하고, 명명 규칙을 구체화하고, 또 다른 단계가 필요한 경우 배치를 실행 취소합니다."
    }
  },
  "real-estate": {
    "path": "/for-real-estate",
    "seo": {
      "title": "AI 파일 이름 변경을 통한 부동산 문서 관리",
      "description": "Zush는 구매 계약서, 공개, 검사 보고서, 감정서, 소유권 문서 및 부동산 사진을 읽은 다음 일관된 파일 이름을 제공합니다. Mac 또는 Windows에서 기존 거래 시스템, 폴더, 공유 드라이브를 유지하세요."
    },
    "pageTitle": "부동산 문서 관리",
    "hero": {
      "eyebrow": "부동산 중개인 및 거래팀용",
      "titleLead": "속성 파일 이름 바꾸기",
      "titleAccent": "주소, 날짜 및 유형",
      "subtitle": "Zush는 구매 계약서, 공개, 검사 보고서, 감정서, 소유권 문서 및 부동산 사진을 읽은 다음 일관된 파일 이름을 제공합니다. Mac 또는 Windows에서 기존 거래 시스템, 폴더, 공유 드라이브를 유지하세요.",
      "trustLine": [
        "Works beside your transaction system",
        "Offline AI for sensitive files",
        "Preview and undo every batch"
      ],
      "photoAlt": "밝은 사무실에서 두 명의 잠재 구매자에게 주택 계획을 보여주는 부동산 중개인",
      "downloadMac": "Mac용 다운로드",
      "downloadWindows": "Windows용 다운로드",
      "trustAria": "부동산 문서 관리 팀이 Zush를 사용하는 이유"
    },
    "demoLabel": "Zush 부동산 주소별로 부동산 거래 문서 정리",
    "audiences": {
      "eyebrow": "부동산 파일 정리",
      "title": "제안부터 아카이브까지 모든 속성 파일을 인식 가능하게 유지하세요.",
      "description": "Zush는 중개 회사에서 이미 사용하고 있는 도구를 대체하지 않고도 각 거래와 관련된 문서와 미디어에 일관된 주소 기반 ID를 제공합니다.",
      "items": [
        {
          "title": "활성 트랜잭션을 관리하는 에이전트",
          "description": "DocuSign 다운로드, 공개, 검사 보고서, 대출 기관 요청 및 마감 문서를 이메일, 다운로드, 공유 폴더 및 거래 플랫폼 전반에서 식별할 수 있도록 유지하세요.",
          "imageAlt": "활성 거래를 관리하는 에이전트: DocuSign 다운로드, 공개, 검사 보고서, 대출 기관 요청 및 마감 문서를 이메일, 다운로드, 공유 폴더 및 거래 플랫폼 전반에서 식별할 수 있도록 유지합니다."
        },
        {
          "title": "거래 조정자 및 브로커 운영",
          "description": "규정 준수 파일을 수집하거나, 요청에 응답하거나, 종료된 거래를 보관하기 전에 팀 전체에 하나의 주소 기반 규칙을 적용하세요.",
          "imageAlt": "트랜잭션 코디네이터 및 브로커 운영: 규정 준수 파일을 수집하거나 요청에 응답하거나 닫힌 트랜잭션을 보관하기 전에 팀 전체에 하나의 주소 기반 규칙을 적용합니다."
        },
        {
          "title": "문서 및 미디어를 처리하는 팀 나열",
          "description": "부동산 사진, 평면도, 공개, 목록 패키지 및 마케팅 내보내기를 하나의 애플리케이션에 강제로 적용하지 않고도 올바른 주소에 연결하여 보관할 수 있습니다.",
          "imageAlt": "문서 및 미디어를 처리하는 목록 팀: 부동산 사진, 평면도, 공개, 목록 패키지 및 마케팅 내보내기를 하나의 애플리케이션에 강제로 적용하지 않고도 올바른 주소에 연결하여 보관할 수 있습니다."
        }
      ]
    },
    "fields": {
      "title": "속성 이름 지정 필드",
      "description": "거래 폴더를 재산 기록으로 전환",
      "instruction": "결과를 보려면 필드를 탭하세요.",
      "ariaLabel": "부동산 필드 Zush 읽기",
      "hint": "제안된 파일 이름",
      "items": [
        {
          "label": "부동산 주소",
          "before": "DocuSign_892347234.pdf",
          "after": "742 에버그린 테라스 - 구매 계약 - 실행됨",
          "emphasis": "742 에버그린 테라스"
        },
        {
          "label": "문서 날짜",
          "before": "download (8).pdf",
          "after": "742 에버그린 테라스 - 2026-06-08 - 점검 보고서",
          "emphasis": "2026-06-08"
        },
        {
          "label": "문서 유형",
          "before": "Document (4).pdf",
          "after": "742 에버그린 테라스 - 타이틀 약속 - 2026-06-05"
        },
        {
          "label": "구매자 / 판매자",
          "before": "signed_final.pdf",
          "after": "742 에버그린 테라스 - 존슨에서 스미스까지 - 구매 계약"
        },
        {
          "label": "거래 ID",
          "before": "attachment.pdf",
          "after": "TX-2026-0184 - 742 Evergreen Terrace - 공개",
          "emphasis": "TX-2026-0184"
        },
        {
          "label": "상태",
          "before": "contract_v3.pdf",
          "after": "742 에버그린 테라스 - 구매 계약 - 실행됨",
          "emphasis": "실행됨"
        },
        {
          "label": "마감일",
          "before": "closing.pdf",
          "after": "742 에버그린 테라스 - 마감 공개 - 2026-07-02",
          "emphasis": "2026-07-02"
        },
        {
          "label": "대리인 / 중개",
          "before": "listing_docs.zip",
          "after": "88 Harbour Lane - 리스팅 패키지 - J. Chen"
        },
        {
          "label": "목록 번호",
          "before": "property.pdf",
          "after": "MLS-884201 - 88 Harbour Lane - 판매자 공개",
          "emphasis": "MLS-884201"
        },
        {
          "label": "사진 주제",
          "before": "IMG_4821.jpg",
          "after": "88 Harbour Lane - 주방 - 와이드 - 01",
          "emphasis": "주방"
        },
        {
          "label": "사용자 정의 필드 - 일반 언어로 설명",
          "before": "scan_0042.pdf",
          "after": "742 에버그린 테라스 - HOA 문서 - 2026",
          "emphasis": "HOA 문서"
        }
      ]
    },
    "privacy": {
      "eyebrow": "트랜잭션 파일 처리",
      "title": "귀하의 조건에 따라 거래 문서를 처리하십시오.",
      "description": "워크플로의 파일을 기반으로 로컬 처리, 중개 회사의 승인된 AI 제공업체 또는 Zush 관리형 AI를 선택하세요. 소스 문서는 기존 폴더에 남아 있습니다.",
      "items": [
        {
          "title": "로컬 모델을 사용한 오프라인 AI",
          "description": "저장된 Mac 또는 Windows PC에서 로컬 Ollama 모델을 사용하여 지원되는 거래 문서 및 자산 미디어를 분석하세요. 파일 콘텐츠는 Zush 또는 AI 공급자에게 전송되지 않습니다.",
          "badge": "컴퓨터에 파일 보관",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "중개회사의 AI 계정을 사용하세요",
          "description": "귀하의 중개회사가 승인한 AI 공급자 계정과 모델을 연결하세요. API 키는 안전한 로컬 저장소에 유지되며 공급자는 귀하가 선택한 파일만 처리합니다.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "관리형 AI로 시작하기",
          "description": "빠른 평가 또는 민감하지 않은 목록 자료를 위해 Zush 관리형 AI를 사용하세요. 거래에 다른 처리 정책이 필요한 경우 오프라인 AI 또는 BYOK를 선택하세요.",
          "badge": "가장 빠른 설정",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush는 트랜잭션 저장소가 되지 않습니다. 파일 이름을 변경하고 저장하지 않으며 중개 회사가 이미 사용하고 있는 시스템 내부에 권한, 보존, 규정 준수 체크리스트 및 통신을 남겨둡니다.",
      "docsLinkLabel": "모드가 데이터를 처리하는 방법 읽기"
    },
    "workflow": {
      "eyebrow": "작업 흐름",
      "title": "이미 보유하고 있는 거래 흐름에 일관된 파일 이름을 추가하세요.",
      "description": "이메일, 전자 서명 다운로드, 스캐너, 자산 방문, 공유 폴더 및 거래 관리 시스템 간에 Zush를 사용하세요.",
      "items": [
        {
          "title": "속성 명명 규칙 정의",
          "description": "부동산 주소, 거래 ID, 문서 날짜, 유형, 당사자, 상태, 마감 날짜 및 중개업 관련 필드로부터 Template를 구축합니다."
        },
        {
          "title": "트랜잭션 수신 시 실행",
          "description": "DocuSign 다운로드, 이메일 첨부 파일, 스캐너 출력, 검사 보고서, 제목 문서, 목록 사진 또는 마감 거래 아카이브를 새 플랫폼으로 이동하지 않고도 정리할 수 있습니다."
        },
        {
          "title": "속성에 준비된 파일 이름 승인",
          "description": "배치를 검토하고, 예외를 수정하고, 이름 변경 내역을 적용합니다. 다음 거래에 대해 모니터링되는 접수 폴더에 동일한 규칙을 재사용합니다."
        }
      ],
      "links": [
        {
          "label": "부동산 문서 명명 규칙 구축",
          "href": "/blog/real-estate-document-naming-convention"
        },
        {
          "label": "전체 거래 폴더 구성",
          "href": "/blog/how-to-organize-real-estate-transaction-files"
        },
        {
          "label": "속성별로 DocuSign 다운로드 이름 바꾸기",
          "href": "/blog/rename-docusign-files-by-property-address"
        }
      ]
    },
    "documents": {
      "eyebrow": "지원되는 트랜잭션 파일",
      "title": "모든 부동산 거래와 관련된 파일을 위한 하나의 정리함",
      "description": "구매, 목록, 임대, 패키지 마감 및 자산 미디어에 대해 별도의 Templates를 사용하는 동시에 각 워크플로에서 주소를 일관되게 유지합니다.",
      "items": [
        {
          "title": "구매 계약 및 부록",
          "description": "재산, 당사자, 상태 및 문서 날짜별로 제안, 반대, 수정 및 실행된 계약을 지정합니다.",
          "example": "742 에버그린테라스 - 구매계약 - 실행 - 2026-06-12.pdf"
        },
        {
          "title": "검사 및 수리",
          "description": "주택 검사, 전문가 보고서, 수리 견적, 영수증을 올바른 주소에 첨부해 두십시오.",
          "example": "742 에버그린 테라스 - 검사 보고서 - 2026-06-08.pdf"
        },
        {
          "title": "소유권, 에스크로 및 종결",
          "description": "포털 다운로드 이름에 의존하지 않고 소유권 약정, 결산 명세서, 마감 공개, 전신 지침 및 기록된 문서를 구성합니다.",
          "example": "742 에버그린 테라스 - 클로징 공개 - 2026-07-02.pdf"
        },
        {
          "title": "평가 및 대출 기관 문서",
          "description": "평가 보고서, 대출 기관 요청, 승인 편지, 증빙 문서를 부동산 및 날짜별로 이름을 지정하세요.",
          "example": "742 상록테라스 - 감정 - 2026-06-18.pdf"
        },
        {
          "title": "공개 및 HOA 파일",
          "description": "하나의 거래 폴더에서 판매자 공개, 납 성분 페인트 양식, HOA 패키지, 보험 기록 및 현지 양식을 구별하세요.",
          "example": "88 Harbour Lane - 판매자 공개 - 서명됨 - 2026-05-27.pdf"
        },
        {
          "title": "상장 및 검사 사진",
          "description": "목록 사진, 객실 세부 정보, 검사 이미지 및 마케팅 내보내기에 동일한 부동산 주소를 적용하여 미디어가 거래 상황과 함께 유지되도록 합니다.",
          "example": "88 Harbour Lane - 주방 - 와이드 - 01.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "조직 성과",
      "title": "속성 파일에 유용한 이름이 있을 때 변경되는 사항",
      "description": "목표는 포털 외부와 거래가 종료된 후에도 여전히 의미가 있는 거래 폴더입니다.",
      "items": [
        {
          "title": "주소를 검색하고 거래를 확인하세요",
          "description": "모든 파일 이름에 일관된 자산 주소가 있으면 계약, 보고서, 공개 및 사진을 열기 전에 검색할 수 있습니다."
        },
        {
          "title": "추측을 최소화하면서 최종 패키지를 조립하세요.",
          "description": "문서 유형, 날짜, 당사자 및 상태는 포털 ID 모음 및 반복 다운로드 대신 폴더 목록을 사용 가능한 체크리스트로 만듭니다."
        },
        {
          "title": "거래가 종료된 후에도 상황을 유지하세요",
          "description": "자체 설명 파일 이름은 이메일 첨부 파일, 중개 아카이브, 로컬 백업, 공유 드라이브 및 트랜잭션 시스템에서 내보내기에 여전히 유용합니다."
        }
      ]
    },
    "faq": {
      "title": "부동산 서류 정리, 답변",
      "description": "AI 파일 이름 바꾸기가 거래 시스템, DocuSign 다운로드, 문서 닫기, 부동산 사진, 민감한 파일, 미리보기 및 실행 취소에서 작동하는 방식.",
      "items": [
        {
          "question": "부동산 문서관리란?",
          "answer": "부동산 문서 관리는 거래 전반에 걸쳐 계약서, 공개, 조사, 소유권 파일, 대출 기관 문서, 마감 기록 및 자산 매체를 식별 가능하게 유지하는 프로세스입니다. Zush는 각 파일을 읽고 일관된 속성 기반 명명 규칙을 적용하여 파일 이름 레이어를 처리합니다."
        },
        {
          "question": "Zush는 부동산 거래 관리 소프트웨어를 대체합니까?",
          "answer": "아니요. Zush는 DocuSign 다운로드, 이메일 첨부 파일, 스캐너 출력, 검사 보고서, 부동산 사진, 내보내기 및 아카이브를 포함하여 거래 시스템 주변의 파일 이름을 바꿉니다. 마감일, 서명, 규정 준수 체크리스트, 커뮤니케이션, 권한 또는 거래 기록을 관리하지 않습니다."
        },
        {
          "question": "Zush는 속성 주소로 DocuSign 파일의 이름을 바꿀 수 있습니까?",
          "answer": "그렇습니다. Template는 DocuSign PDF에서 부동산 주소, 문서 유형, 실행 날짜, 당사자, 거래 ID 및 상태를 추출한 다음 \"742 Evergreen Terrace - 구매 계약 - 실행됨 - 2026-06-12.pdf\"와 같은 파일 이름을 제안할 수 있습니다."
        },
        {
          "question": "마감 문서를 자동으로 정리할 수 있나요?",
          "answer": "Zush는 소유권 약정, 평가 보고서, 마감 공개, 정산 명세서, 대출 기관 문서 및 기록된 파일을 검토된 배치로 이름을 바꿀 수 있습니다. 폴더 모니터링은 새로운 거래 문서가 도착하는 위치도 감시할 수 있습니다."
        },
        {
          "question": "Zush는 부동산 사진과 PDF의 이름을 바꿀 수 있습니까?",
          "answer": "그렇습니다. Zush는 주소, 방, 전망, 촬영 유형 또는 Template의 다른 필드별로 지원되는 부동산 사진의 이름을 지정할 수 있습니다. 파일 이름 구조가 거래 문서와 다른 경우 미디어 나열을 위해 별도의 Template를 사용하십시오."
        },
        {
          "question": "Zush는 파일을 속성 폴더로 이동합니까?",
          "answer": "아니요. Zush는 파일 이름을 바꾸고 기존 폴더 구조를 변경하지 않은 채로 둡니다. 이를 통해 중개 회사의 현재 거래 폴더, 공유 드라이브, Dropbox, OneDrive 또는 로컬 아카이브 주위에 명명 레이어를 추가하는 것이 안전합니다."
        },
        {
          "question": "거래 파일을 업로드하지 않고도 처리할 수 있나요?",
          "answer": "그렇습니다. 오프라인 AI 모드는 Mac 또는 Windows에서 로컬 Ollama 모델을 사용하여 지원되는 파일을 분석하므로 문서 콘텐츠가 해당 시스템에 유지됩니다. BYOK는 중개회사가 승인된 자체 공급자 계정을 사용하기를 원할 때 사용할 수 있습니다."
        },
        {
          "question": "스캔한 부동산 문서에도 작동하나요?",
          "answer": "그렇습니다. AI Vision은 별도의 OCR 패스 없이 이미지 전용 PDF와 지원되는 이미지를 읽을 수 있습니다. 여기에는 사무실 스캐너 출력, 사진으로 찍은 서류, 오래된 마감 파일, 스캔으로 반환된 서명된 문서가 포함됩니다."
        },
        {
          "question": "중개업체가 여러 에이전트의 파일 이름을 표준화할 수 있나요?",
          "answer": "그렇습니다. 구매 거래, 목록, 임대, 마감 패키지 및 자산 미디어를 위해 재사용 가능한 Templates를 만듭니다. 각 에이전트 또는 코디네이터는 동일한 필수 필드 순서를 적용하고 배치를 변경하기 전에 제안된 이름을 미리 볼 수 있습니다."
        }
      ]
    },
    "guides": {
      "title": "부동산 거래 파일 안내",
      "description": "명명 규칙, 거래 폴더 구조, 전자 서명 다운로드 자동 정리에 대한 별도의 가이드입니다.",
      "slugs": [
        "real-estate-document-naming-convention",
        "how-to-organize-real-estate-transaction-files",
        "rename-docusign-files-by-property-address"
      ]
    },
    "finalCta": {
      "title": "복사된 트랜잭션 폴더 하나에서 Zush를 사용해 보세요.",
      "subtitle": "DocuSign 다운로드, 검사 보고서, 공개 또는 파일 닫기의 작은 배치부터 시작하세요. 제안된 이름을 검토하고 Template를 구체화한 후 다른 패스가 필요한 경우 배치를 실행 취소합니다."
    }
  }
} satisfies ProfessionLocaleCopy;
