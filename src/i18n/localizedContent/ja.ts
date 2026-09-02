import type { HomeCopy } from '@/i18n/copy';
import type { ProfessionLocaleCopy } from '@/i18n/professions/types';

export const home = {
  "heroTitle": "AIでファイルをリネーム\nMac・Windows対応",
  "heroAccent": "ファイルリネーム",
  "heroSubtitle": "AIでファイルを内容に基づいて一括リネーム。Zushはスクリーンショット、PDF、写真、動画、音声、文書など100以上の形式に対応し、指定した情報だけを正確に抽出して、定義したファイル名に変換します。",
  "heroHighlights": [
    "AIでファイルを内容に基づいて一括リネーム",
    "指定した情報だけを正確に抽出"
  ],
  "buyPro": "PROを購入",
  "trustSignals": [
    "無料で始める",
    "登録不要",
    "クレジットカード不要"
  ],
  "heroModes": [
    "クラウドAI",
    "BYOK",
    "ローカルAI",
    "100以上の形式"
  ],
  "featuresTitle": "Zushの主な機能",
  "featuresDescription": "プレビュー、テンプレート、フォルダ監視、ワンクリックの取り消しで、乱雑なファイル名を明確で統一された名前に整えます。",
  "supportedFormats": "対応ファイル形式",
  "images": "画像",
  "designLabel": "デザイン",
  "documents": "文書",
  "videosLabel": "動画",
  "audioLabel": "音声",
  "cloudFoldersTitle": "クラウドフォルダにも対応",
  "cloudFoldersDescription": "Zush はどんなローカルフォルダのファイルもリネームします。iCloud Drive、Google Drive、Dropbox、OneDrive が同期しているフォルダも対象です。アカウント接続は不要です。",
  "downloadTitle": "Zushを無料で試す",
  "downloadSubtitle": "ファイルを一括リネームし、フォルダを監視し、スクリーンショット、PDF、写真、音声、動画、文書を内容でリネームします。",
  "downloadHintPrefix": "無料 · クレジットカード不要",
  "useCasesTitle": "AIファイルリネームはこんな方におすすめ",
  "useCasesDescription": "用途に近い職種を選ぶと、具体的な活用方法を確認できます。",
  "faqTitle": "よくある質問",
  "faqTitleAccent": "質問",
  "faqDescription": "Zush について知っておきたいこと",
  "featureCards": {
    "aiAnalysis": {
      "title": "AI 解析",
      "description": "画像、EPUB・FB2電子書籍、PDFから音声、動画、Officeファイルまで、100種類以上の形式を解析し、内容が分かる名前にまとめてリネームします。"
    },
    "foldersMonitoring": {
      "title": "フォルダ監視",
      "description": "1つ以上のフォルダを監視します。iCloud Drive、Google Drive、Dropbox、OneDrive のフォルダも対象です。新しいファイルはバックグラウンドで自動処理されます。"
    },
    "batchRename": {
      "title": "一括リネーム",
      "description": "複数のファイルをドラッグ＆ドロップするだけで、Zushが内容を解析し、数秒で分かりやすい名前を提案します。"
    },
    "templates": {
      "title": "テンプレート",
      "description": "スクリーンショット、経費、音楽トラック、クライアント作業、法務、旅行、監視フォルダ向けの設定を再利用できます。"
    },
    "namingBlocks": {
      "title": "命名ブロック",
      "description": "日付、メタデータ、音声、写真、財務、法務、旅行、顧客、AIフィールドなど、145種類以上のブロックで一貫した名前を作れます。"
    },
    "customAiBlocks": {
      "title": "カスタムAIブロック",
      "description": "Zushに抽出してほしい詳細を指示し、カスタムAIブロックとしてどのテンプレートでも再利用できます。"
    },
    "audioSupport": {
      "title": "音声対応",
      "description": "MP3、M4A、WAV、FLAC、OGG、WebM、MPGA をメタデータ、認識、文字起こし、音声フィールドでリネームできます。"
    },
    "customPatterns": {
      "title": "カスタムパターン",
      "description": "{title}、{original}、{date}、{time}、{category} などの変数で独自の命名ルールを作れます。"
    },
    "smartMetadata": {
      "title": "スマートメタデータ",
      "description": "Finder タグや Spotlight メタデータを自動追加し、自然な検索ですぐに見つけられます。"
    },
    "renameHistory": {
      "title": "リネーム履歴",
      "description": "すべての変更を記録し、必要ならワンクリックで元の名前に戻せます。"
    },
    "customPrompts": {
      "title": "カスタム AI プロンプト",
      "description": "名前、タグ、メタデータのルールを設定し、AI の出力を自分のワークフローに合わせます。"
    },
    "byok": {
      "title": "自分のAPIキーを使う（BYOK）",
      "description": "Gemini、OpenRouter、OpenAI、Claude を接続してクラウドリネーム。FREE は全モード共通 50 回、PRO は無制限。キーはローカルに安全保存されます。"
    },
    "offlineAi": {
      "title": "プライベートなローカル AI",
      "description": "ローカルの Ollama モデルが対応ファイルをデバイス上で処理し、セットアップ後はオフラインでも動作します。"
    },
    "cloudAi": {
      "title": "クラウド AI",
      "description": "Zushの安全なリレーを介して商用AIプロバイダーに接続します。APIキーをアプリに埋め込まず、安全に管理するための仕組みです。処理には各プロバイダーの標準API規約が適用されます。"
    },
    "bandTitle": "Zush を安全に使う 3 つの方法",
    "bandSubtitle": "すぐ使えるクラウド AI、自分の API キー、または Ollama による完全オフライン。",
    "addFolder": "フォルダを追加",
    "promptRules": "プロンプトルール",
    "customBadge": "カスタム",
    "templateActive": "有効なテンプレート",
    "templateNames": [
      "スクリーンショット",
      "音楽トラック",
      "クライアント議事録"
    ],
    "namingBlockLabels": [
      "{date}",
      "{client_name}",
      "{artist}",
      "{bpm}",
      "{invoice_number}",
      "{title}"
    ],
    "apiKeyConnected": "APIキー接続済み",
    "terminal": "ターミナル",
    "localModelReady": "ローカルモデル準備完了",
    "today": "今日",
    "undo": "元に戻す",
    "analysisNewName": "バリ島_夕日_ビーチ.png",
    "batchNewNames": [
      "カンバンUI.png",
      "採用計画メモ.docx",
      "投資家向けアップデート資料.pptx"
    ],
    "metadataFileName": "サイバーパンクアート.png",
    "metadataTags": [
      "グリッチアート",
      "ヴェイパーウェーブ",
      "彫像",
      "サイバーパンク",
      "デジタルアート",
      "ヤシの木"
    ],
    "historyNewNames": [
      "ダッシュボードレビュー_メモ.docx",
      "Q1_売上レポート.xlsx"
    ],
    "promptExample": "名前は短く、主題を先頭に置き、関連する Finder タグを追加します。",
    "audioNewNames": [
      "ローファイピアノループ_92BPM.mp3",
      "クライアント初回ヒアリング.m4a"
    ]
  },
  "offlineAiModal": {
    "title": "デバイスから出ない AI",
    "description": "オフライン AI はオプションのモードです。ローカルの Ollama モデルが Mac や Windows PC 上で直接動き、クラウドは使いません。",
    "points": [
      "データはデバイスの外に出ません。Zush クラウドにも他社 AI にも送信されません。",
      "スクリーンショット、写真、PDF、書類プレビューに最適です。",
      "モデルや形式を増やしたいときは、いつでもクラウドや BYOK に切り替えられます。"
    ],
    "proTitle": "すべてのプランで利用可能",
    "proDescription": "FREE では Cloud AI、BYOK、オフライン AI 共通で 50 回リネームできます。PRO はこの上限を解除します。Ollama とローカルモデルは別途インストールします。",
    "closeLabel": "閉じる"
  },
  "showcase": {
    "title": "Zushの機能を見てみる",
    "titleAccent": "Zush",
    "description": "タブを選んで、各機能の短いデモをご覧ください。",
    "playShowcase": "デモを再生",
    "switchTo": "切り替え:",
    "items": {
      "batch-rename": {
        "title": "AI一括リネーム",
        "description": "実際の内容に基づいて複数ファイルを確認してから適用"
      },
      "monitor": {
        "title": "フォルダ監視",
        "description": "フォルダを監視し、新しいファイルを自動リネーム"
      },
      "activity": {
        "title": "アクティビティ履歴",
        "description": "最近のリネームを確認し、必要なら元に戻す"
      },
      "statistics": {
        "title": "統計",
        "description": "リネーム量、フォルダ監視の割合、アクティビティ、ファイル種別の傾向を確認"
      },
      "templates": {
        "title": "テンプレート",
        "description": "AIリネームとフォルダ監視で繰り返し使える設定を保存"
      },
      "naming-blocks": {
        "title": "命名ブロック",
        "description": "ファイルの内容を使い、145種類以上の命名ブロックからファイル名を構築"
      },
      "custom-ai-blocks": {
        "title": "カスタム AI ブロック",
        "description": "抽出したい内容を指定して、自分専用の命名ブロックとして再利用"
      },
      "tags": {
        "title": "スマートタグ",
        "description": "検索しやすいタグを生成"
      },
      "multilanguage": {
        "title": "多言語対応",
        "description": "60以上の言語でファイル名を生成"
      },
      "custom-prompts": {
        "title": "カスタムプロンプト",
        "description": "独自の指示で名前生成を調整"
      },
      "byok": {
        "title": "BYOK",
        "description": "自分の AI プロバイダーを BYOK で接続"
      },
      "offline-ai": {
        "title": "オフラインAIリネーム",
        "description": "対応ファイルに Ollama のプライベートなローカルモデルを使用"
      }
    }
  },
  "speedComparison": {
    "eyebrow": "スピードテスト",
    "title": "もっと速く、もっと分かりやすい名前に。",
    "titleAccent": "もっと分かりやすい名前に。",
    "description": "同じ10ファイル、同じ目的：内容に基づいてリネーム。専用ツールと汎用AIエージェントの直接対決。",
    "zushLabel": "Zush",
    "zushBadge": "完了",
    "zushCaption": "ファイル専用に設計。ドロップして、わかりやすい名前を受け取り、次へ。",
    "rivalLabel": "Claude Cowork",
    "rivalStatus": "作業中",
    "rivalDoneLabel": "ようやく完了",
    "rivalCaption": "優れた汎用エージェントですが、日常的なファイル整理に特化したツールではありません。",
    "rivalPlaceholderHint": "比較動画は準備中",
    "runningLabel": "実行中",
    "replayLabel": "もう一度",
    "skipToEndLabel": "最後までスキップ",
    "disclaimer": "ClaudeおよびClaude CoworkはAnthropic PBCの商標です。ZushはAnthropicと提携・支援関係にありません。"
  },
  "whyZush": {
    "title": "汎用ツールではなくZushが選ばれる理由",
    "titlePlatform": "{os} で Zush が選ばれる理由",
    "description": "AI一括リネーム、自動フォルダ監視、取り消し、BYOK、オフラインAI、混在形式対応を1つのデスクトップアプリに統合",
    "descriptionPlatform": "{os} でのネイティブ感、速いリネーム、買い切り価格、迷いの少ない操作",
    "nativeEyebrow": "デスクトップネイティブ",
    "nativeEyebrowPlatform": "{os} ネイティブ",
    "nativeTitle": "高速で使いやすいネイティブアプリ",
    "nativeDescription": "Zush は本物のデスクトップアプリのように、すぐ開けて、使いやすく、OS に自然になじみます。",
    "nativeDescriptionPlatform": "Zush は本物の {os} ネイティブアプリのように、すぐ開けて、使いやすく、OS に自然になじみます。",
    "pricingTrustItems": [
      "✨ 無料で試せる",
      "∞ 無制限 PRO",
      "↩️ 14日返金"
    ],
    "priceEyebrow": "再利用可能なテンプレート",
    "priceTitle": "フォルダごとに設定を1つ保存",
    "priceDescription": "スクリーンショット、経費、音楽、クライアントのメモ、法務文書、旅行予約、監視フォルダなど、用途別の命名ルールを保存できます。",
    "priceLabel": "11種類を内蔵",
    "speedEyebrow": "超高速",
    "speedTitle": "リネームは数秒で完了",
    "speedDescription": "整理は作業を止めないことが大切です。ファイルを入れ、確認し、適用して次へ進めます。",
    "formatsEyebrow": "100+種類の対応形式",
    "formatsTitle": "スクリーンショット、PDF、写真、音声、文書、動画",
    "formatsDescription": "AVIF、RAW、Officeファイル、EPUB・FB2電子書籍、PDF、字幕、MP3、M4A、WAV、FLAC、一般的な動画形式に対応します。",
    "controlEyebrow": "命名ブロック",
    "controlTitle": "業務に合った、構造化されたファイル名",
    "controlDescription": "用途に合う命名ブロックを組み合わせて、独自のファイル名パターンを作れます。AIが各ファイルを読み取り、クライアント名、日付、請求書番号、場所、プロジェクトなど、選んだ情報を各ブロックに入力します。",
    "workflowSteps": [
      "フォトグラファー: 日付、クライアント、撮影、シーン",
      "医師: 受診種別、日付、記録種別",
      "会計士: 取引先、請求書、期間"
    ]
  },
  "useCases": {
    "items": [
      {
        "title": "デザイナー",
        "description": "モックアップ、UI要素、参考資料に分かりやすい名前を付け、大量のスクリーンショットからすぐに見つけられます。"
      },
      {
        "title": "写真家",
        "description": "CR2、NEF、ARW、DNG、RAF、RW2 などの RAW 形式に対応し、大量の写真を整理できます。"
      },
      {
        "title": "マーケター・SNS担当",
        "description": "キャンペーン資料、書き出し、スクリーンショット、素材を整理してすぐ見つけられます。"
      },
      {
        "title": "開発者",
        "description": "ドキュメント、バグ報告、PR レビュー用のスクリーンショットを整理できます。"
      },
      {
        "title": "コンテンツ制作者",
        "description": "サムネイル、Bロール参考、ビジュアル素材をきれいに整理できます。"
      },
      {
        "title": "プロダクトマネージャー",
        "description": "PRD、議事録、表計算、資料をすぐ検索できる状態にします。"
      }
    ]
  },
  "workflows": {
    "title": "Zushは何をリネームできる？",
    "description": "ワークフローを選ぶと、各ページでそのファイルタイプを内容に基づいて命名する方法がわかります。",
    "items": {
      "screenshots": {
        "title": "スクリーンショットをリネーム",
        "description": "「スクリーンショット 2026-07-03」が、画面の内容を表す名前になります。"
      },
      "pdfs": {
        "title": "PDF・スキャンをリネーム",
        "description": "請求書・契約書・スキャンを、文書内のテキストに基づいて命名。"
      },
      "photos": {
        "title": "写真をリネーム",
        "description": "RAW・HEIC・JPGを被写体とシーンで命名。"
      },
      "documents": {
        "title": "書類をリネーム",
        "description": "EPUB・FB2電子書籍、Word・Excel・PowerPoint・iWorkファイルをテーマで命名。"
      },
      "design": {
        "title": "デザインファイルをリネーム",
        "description": "Figma・Sketch・PSD・書き出しファイルを内容で命名。"
      },
      "videos": {
        "title": "動画をリネーム",
        "description": "録画やクリップをフレームと文脈で命名。"
      },
      "audio": {
        "title": "音声をリネーム",
        "description": "MP3・WAV・ボイスメモを音声とメタデータで命名。"
      },
      "organizer": {
        "title": "AIでファイル整理",
        "description": "ダウンロードフォルダや複数形式が混在するフォルダを、検索しやすい名前に整えます。"
      },
      "batch": {
        "title": "ファイルを一括リネーム",
        "description": "数百ファイルを一度に。プレビューとワンクリックで元に戻す機能付き。"
      },
      "offline": {
        "title": "オフラインAIリネーマー",
        "description": "Ollamaによるローカルモデル。ファイルはデバイスの外に出ません。"
      }
    }
  },
  "faqItems": [
    {
      "question": "Zush とは？",
      "answer": "Zush は Mac と Windows 向けのスマートなデスクトップアプリで、AI によりファイル名を自動変更します。画像、動画、PDF を含む対応文書を分析し、分かりやすい名前とメタデータを生成します。"
    },
    {
      "question": "対応しているファイル形式は？",
      "answer": "画像、動画、スクリーンショット、EPUB・FB2電子書籍、PDF、文書、表計算、プレゼン、テキスト、CSV、SVG などの一般的な形式に対応しています。"
    },
    {
      "question": "ZushのAIリネームはどのように動作しますか？",
      "answer": "ファイルをZushのウィンドウにドラッグ＆ドロップすると、AIが内容を解析し、数秒で新しい名前を提案します。適用前にファイルごとの候補を確認したり、生成し直したりできます。スクリーンショット、デザインファイル、音声、動画、PDF、iWork書類、ダウンロードしたファイルをまとめて整理するのに便利です。"
    },
    {
      "question": "フォルダ監視はどう動きますか？",
      "answer": "選択したフォルダをバックグラウンドで監視し、対応ファイルが追加されると、設定した処理モードで内容を解析して自動的にリネームします。"
    },
    {
      "question": "Zush は Google Drive、Dropbox、iCloud に対応していますか？",
      "answer": "はい。Zush はクラウドアカウントに接続しません。クラウドアプリがすでに同期しているローカルフォルダ内のファイル名を直接変更するため、認証の必要はありません。Mac では iCloud Drive、Google Drive、Dropbox、OneDrive、Box に対応し、Windows では OneDrive、Google Drive、Dropbox のフォルダに対応しています。リネーム後、新しいファイル名は自動的に他のデバイスに同期されます。"
    },
    {
      "question": "AI が生成した名前を再生成できますか？",
      "answer": "はい。AI Rename でファイルを選び、再生成をクリックすると新しい候補を取得できます。"
    },
    {
      "question": "名前やタグ用の AI プロンプトをカスタマイズできますか？",
      "answer": "はい。短い名前、主題を先頭にする、特定タグだけ使うなど、独自ルールを書けます。"
    },
    {
      "question": "データは安全ですか？",
      "answer": "元ファイルはコンピュータ上に残ります。クラウドモードでは分析に必要な内容だけを選択した AI プロバイダーへ送信します。オフラインでは Ollama がローカル処理します。"
    },
    {
      "question": "変更を元に戻せますか？",
      "answer": "はい。アクティビティ履歴から元のファイル名を復元できます。"
    },
    {
      "question": "複数言語と日付形式に対応していますか？",
      "answer": "はい。Zush は 60 以上の言語で名前を生成でき、好みの日付形式も使えます。"
    },
    {
      "question": "料金はどうなっていますか？",
      "answer": "Zush PROには月額10ドルのプランと、48ドルの買い切りプランがあります。BYOKとオフラインAIはFREEでも利用でき、どちらのPROプランでも全モード共通の50回という上限がなくなります。"
    },
    {
      "question": "BYOK（Bring Your Own Key）とは？",
      "answer": "Gemini、OpenRouter、OpenAI、Claudeの自分のAPIキーを接続して、クラウドAIでリネームする機能です。全プランで利用でき、FREEでは全モード共通で50回、PROでは無制限にリネームできます。APIキーは端末内に安全に保存されます。"
    },
    {
      "question": "買い切りプランはありますか？",
      "answer": "はい。月額プランに加えて、48 ドルの買い切りプランを選べます。BYOK とオフライン AI は FREE でも利用でき、どちらの PRO プランも共通 50 回の上限を解除します。"
    },
    {
      "question": "対応 OS は？",
      "answer": "macOS 15 Sequoia以降とWindows 10／11に対応しています。Mac版は署名済みDMG、Mac App Store、Homebrewで、Windows版はMicrosoft Storeで提供しています。"
    },
    {
      "question": "アプリはどの AI モデルを使いますか？",
      "answer": "画像、動画、対応文書を高速かつ正確に分析するため、最新のマルチモーダル AI モデルを使います。具体的なモデルは最適化により変わる場合があります。"
    },
    {
      "question": "オフラインで使えますか？",
      "answer": "クラウド処理にはインターネットが必要です。すべてのプランのユーザーは Ollama と対応モデルを入れるとオフライン AI を有効化できます。"
    },
    {
      "question": "音声や動画ファイルに対応していますか？",
      "answer": "Zush 3.0はMP4、MOV、M4V、MPEG、3GP、TS、MTS、M2TS、DV、VOBなどの動画に加え、MP3、M4A、WAV、FLAC、OGG、WebM、MPGAの音声にも対応しています。音声ファイルでは、メタデータ、音声認識、文字起こし結果をファイル名に利用できます。"
    },
    {
      "question": "合わなかった場合は返金できますか？",
      "answer": "はい。Zush は 14 日間の返金保証を提供しています。詳細は返金ポリシーをご確認ください。"
    }
  ],
  "showcaseSlides": [
    {
      "files": [
        {
          "before": "IMG_0842.JPG",
          "after": "黄色い帽子のパグ.jpg",
          "img": "/images/examples/pug.jpg",
          "type": "image"
        },
        {
          "before": "track_01_final.mp3",
          "after": "ローファイピアノループ_92BPM.mp3",
          "type": "audio"
        },
        {
          "before": "checkout-flow.fig",
          "after": "投資家向けアップデート資料.fig",
          "type": "design",
          "label": "図"
        },
        {
          "before": "budget_export_copy(2).xlsx",
          "after": "製品ローンチ予算.xlsx",
          "type": "sheet"
        },
        {
          "before": "client-brief-scan.pdf",
          "after": "クライアント_クリエイティブブリーフ.pdf",
          "type": "pdf"
        },
        {
          "before": "demo_take_02.mov",
          "after": "設定サイドバー紹介.mov",
          "img": "/images/examples/video/settings-sidebar-walkthrough.webp",
          "type": "video"
        }
      ]
    },
    {
      "files": [
        {
          "before": "voice_memo_042.m4a",
          "after": "クライアント初回ヒアリング.m4a",
          "type": "audio"
        },
        {
          "before": "notes_from_call_FINAL.docx",
          "after": "採用計画メモ.docx",
          "type": "doc"
        },
        {
          "before": "forecast_2026-03-18_export.xlsx",
          "after": "売上予測.xlsx",
          "type": "sheet"
        },
        {
          "before": "board-review.key",
          "after": "営業キックオフ資料.key",
          "type": "slides",
          "label": "キー"
        },
        {
          "before": "IMG_20240812_143052.jpg",
          "after": "ビーチの楽しそうな犬.jpg",
          "img": "/images/examples/dog.jpg",
          "type": "image"
        },
        {
          "before": "proposal_draft_approved.pdf",
          "after": "Webサイト提案書.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "files": [
        {
          "before": "contract_notes_clean.docx",
          "after": "ベンダー契約メモ.docx",
          "type": "doc"
        },
        {
          "before": "episode_intro_take2.wav",
          "after": "ポッドキャスト導入インタビュー.wav",
          "type": "audio"
        },
        {
          "before": "pipeline_export_march.xlsx",
          "after": "3月_営業パイプライン.xlsx",
          "type": "sheet"
        },
        {
          "before": "brand-system.sketch",
          "after": "キャンペーンレビュー資料.sketch",
          "type": "design",
          "label": "スケッチ"
        },
        {
          "before": "scan_2026_03_19.pdf",
          "after": "署名済みサービス契約.pdf",
          "type": "pdf"
        },
        {
          "before": "PXL_20240720_091234.jpg",
          "after": "鮮やかな黄色い花.jpg",
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
      "title": "AIファイルリネームで会計書類を整理",
      "description": "Zushは請求書、領収書、明細書、税務書類、スキャンを読み取り、指定したルールに沿ったファイル名を提案します。クライアントごとのテンプレートを保存し、適用前にバッチ全体を確認。必要ならいつでも元に戻せます。マネージドクラウドAI、BYOK、ローカルのオフラインAIから処理方法を選べます。"
    },
    "pageTitle": "会計書類の整理",
    "hero": {
      "eyebrow": "会計士向けAIファイルリネーム",
      "titleLead": "会計書類を",
      "titleAccent": "取引先・日付・番号でリネーム",
      "subtitle": "Zushは請求書、領収書、明細書、税務書類、スキャンを読み取り、指定したルールに沿ったファイル名を提案します。クライアントごとのテンプレートを保存し、適用前にバッチ全体を確認。必要ならいつでも元に戻せます。マネージドクラウドAI、BYOK、ローカルのオフラインAIから処理方法を選べます。",
      "trustLine": [
        "有料プランはリネーム回数無制限",
        "プライベートなオフラインAIとBYOK",
        "すべてのバッチを確認・取り消し可能"
      ],
      "photoAlt": "明るいオフィスのデスクトップ コンピューターで財務書類を確認する会計士",
      "downloadMac": "Mac版をダウンロード",
      "downloadWindows": "Windows版をダウンロード",
      "trustAria": "会計文書管理チームが Zush を使用する理由"
    },
    "demoLabel": "請求書・領収書・会計書類をZushでリネーム",
    "audiences": {
      "eyebrow": "誰のためのものか",
      "title": "会計士、簿記担当者、クライアントの会計チーム向けに構築",
      "description": "クライアントから定期的に届く書類、領収書の処理、照合作業、月次決算まで、同じリネームの仕組みを活用できます。",
      "items": [
        {
          "title": "小規模な会計事務所",
          "description": "請求書がメール、ポータル、スキャナー、共有ドライブのどこから届いても、クライアントごとの受け取りフォルダを決めたルールで整理できます。",
          "imageAlt": "会計事務所でクライアントから届いた請求書を整理する担当者"
        },
        {
          "title": "独立した簿記担当者",
          "description": "毎週たまる領収書やダウンロードを、照合作業の前に取引先、日付、金額、カテゴリが分かる名前へ整えます。",
          "imageAlt": "領収書を取引先、日付、金額、カテゴリ別に整理する簿記担当者"
        },
        {
          "title": "社内会計チームと買掛金（AP）チーム",
          "description": "共有テンプレートを使えば、ルールを暗記しなくても、請求書、明細書、月次決算資料、エクスポートに全員が同じ形式で名前を付けられます。",
          "imageAlt": "共有テンプレートで会計書類のファイル名を統一する社内会計チーム"
        }
      ]
    },
    "fields": {
      "title": "会計書類のファイル名に使う項目を選択",
      "description": "Zushは各書類に表示されている内容を読み取ります。テンプレートで、取引先、日付、請求書番号、金額、カテゴリ、対象年度・期間、カスタム項目のうち、ファイル名に含める情報を指定できます。",
      "instruction": "フィールドを選択して結果を確認します",
      "ariaLabel": "Zush が読み取る会計フィールド",
      "hint": "提案されたファイル名",
      "items": [
        {
          "label": "文書の日付",
          "before": "download (7).pdf",
          "after": "2026-06-12 – Acme サプライ – INV-10234",
          "emphasis": "2026-06-12"
        },
        {
          "label": "ベンダー/クライアント",
          "before": "invoice.pdf",
          "after": "2026-06-12 – Acme サプライ – INV-10234"
        },
        {
          "label": "請求書番号",
          "before": "attachment.pdf",
          "after": "2026-06-12 – Acme サプライ – INV-10234",
          "emphasis": "INV-10234"
        },
        {
          "label": "金額",
          "before": "bill (3).pdf",
          "after": "2026-06-12 – Acme Supply – 1,204 USD"
        },
        {
          "label": "通貨",
          "before": "scan_0042.pdf",
          "after": "2026-06-12 – Acme Supply – 1,204 USD"
        },
        {
          "label": "経費カテゴリ",
          "before": "IMG_2041.jpg",
          "after": "2026-06-03 – ホールフーズ – 食事 – 84 USD",
          "emphasis": "食事"
        },
        {
          "label": "対象年度／期間",
          "before": "scan.pdf",
          "after": "2025 – 1099-NEC – リベラコンサルティング"
        },
        {
          "label": "支払状況",
          "before": "invoice_copy.pdf",
          "after": "Vertex GmbH – INV-0088 – 支払済み",
          "emphasis": "支払済み"
        },
        {
          "label": "明細期間",
          "before": "statement_final.pdf",
          "after": "2026-05 – First National – 銀行取引明細書",
          "emphasis": "2026-05"
        },
        {
          "label": "アカウント/エンティティ",
          "before": "export (1).xlsx",
          "after": "2026-Q2 – Vertex GmbH – 経費概要"
        },
        {
          "label": "カスタム項目（抽出したい情報を自由に指定）",
          "before": "doc.pdf",
          "after": "2026-06-08 – W-9 – リベラコンサルティング",
          "emphasis": "W-9"
        }
      ]
    },
    "privacy": {
      "eyebrow": "処理とプライバシー",
      "title": "財務書類の処理方法を選択する",
      "description": "すぐに使えるマネージドクラウドAI、会社で契約しているプロバイダーを利用するBYOK、対応書類を端末内で処理するローカルのオフラインAIから選べます。",
      "items": [
        {
          "title": "ローカルモデルを使用したオフライン AI",
          "description": "ローカルのOllamaモデルが、請求書、領収書、明細書、スキャンなどの対応ファイルをMacまたはWindows PC上で解析します。ファイルの内容はZushや外部のAIプロバイダーには送信されません。",
          "badge": "ファイルは端末内に残ります",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "BYOKで会社のプロバイダーを利用",
          "description": "会社が管理するAIプロバイダーのアカウントとAPIキーを使って解析します。キーは端末内の安全な領域に保存され、使用するプロバイダーとモデルをチームで選べます。",
          "badge": "自分のキーとアカウント",
          "kind": "byok"
        },
        {
          "title": "マネージドクラウドAI",
          "description": "手軽さを重視する場合は、組み込みのマネージドモードを利用できます。有料プランは従量制ではないため、定期的な書類整理や過去ファイルの一括処理でも、書類ごとのクレジットを気にする必要はありません。",
          "badge": "最速のセットアップ",
          "kind": "cloud-ai"
        }
      ],
      "note": "会社やクライアントのポリシーに合った処理モードを選んでください。どのモードでも、Zushは元の保存場所でファイルをリネームし、ファイル自体を保管しません。",
      "docsLinkLabel": "モードがデータをどのように処理するかを読む"
    },
    "workflow": {
      "eyebrow": "ワークフロー",
      "title": "クライアントの受け取りフォルダに届くファイルを自動リネーム",
      "description": "クライアント用テンプレートを設定して受け取りフォルダを監視し、リネームを適用する前に候補をバッチ単位で確認できます。",
      "items": [
        {
          "title": "ファイルを受け取りフォルダに集約",
          "description": "メールの添付ファイル、ポータルからのダウンロード、スキャナー出力、領収書の写真を、クライアントや法人ごとの監視フォルダにまとめます。"
        },
        {
          "title": "クライアント用テンプレートで名前を確認",
          "description": "日付、取引先、番号、金額、カテゴリ、カスタム項目からファイル名に含める情報を選び、候補を確認してからバッチを適用します。"
        },
        {
          "title": "適用後も取り消し可能。監視はそのまま継続",
          "description": "リネーム履歴からバッチを元に戻せます。テンプレートをフォルダに割り当てておけば、新しく届く書類にも同じ命名ルールが適用されます。"
        }
      ],
      "links": [
        {
          "label": "請求書テンプレートを作成する手順",
          "href": "/docs/templates/invoices"
        },
        {
          "label": "請求書の名前変更の仕組み",
          "href": "/rename-invoices-with-ai"
        },
        {
          "label": "受け取りからアーカイブまでの流れを整理する",
          "href": "/blog/how-to-organize-invoices-and-receipts"
        }
      ]
    },
    "documents": {
      "eyebrow": "対応している会計書類",
      "title": "Zushで自動リネームできる会計書類",
      "description": "買掛金、領収書、税務書類、月次決算資料には、それぞれ別のテンプレートを使えます。元の内容を変更せず、用途ごとに項目と命名パターンを保存できます。",
      "items": [
        {
          "title": "仕入先の請求書・支払依頼書",
          "description": "請求日、取引先、請求書番号、金額、通貨など、クライアントのルールで必要な項目を使って買掛金書類に名前を付けます。",
          "example": "2026-06-12 – Acme Supply – INV-10234 – 1,204 USD.pdf"
        },
        {
          "title": "領収書と経費の証拠",
          "description": "PDF、JPG、HEICの領収書を読み取り、取引先、日付、金額、カテゴリなど、カスタムAIブロックで指定した情報をファイル名に追加します。",
          "example": "2026-06-03 – ホールフーズ – 食事 – 84 USD.jpg"
        },
        {
          "title": "銀行とカードの明細書",
          "description": "一般的なダウンロード名を、金融機関、口座名、明細期間が分かる名前に変え、照合作業中に探しやすくします。",
          "example": "2026-05 – First National – 運用口座 – 明細書.pdf"
        },
        {
          "title": "納税フォームと顧客の書類",
          "description": "W-9、1099、税務通知、補足資料のスキャンを、書類種別、対象年度、発行者、法人名でリネームし、手入力を減らします。",
          "example": "2025 – 1099-NEC – Rivera Consulting.pdf"
        },
        {
          "title": "給与計算および決算レポート",
          "description": "給与台帳、仕訳サポート、月次レポートを期間、エンティティ、レポートの種類、承認ステータスごとに整理します。",
          "example": "2026-05 – Vertex GmbH – 給与報告書 – FINAL.pdf"
        },
        {
          "title": "スプレッドシートとエクスポート",
          "description": "経費のエクスポート、調整、ワークブックの成果物の名前をクライアント、期間、コンテンツごとに変更して、引き継ぎ後に最新のファイルを検索できるようにします。",
          "example": "2026-Q2 – Vertex GmbH – 経費概要.xlsx"
        }
      ]
    },
    "testimonialsTitle": "会計チームでのZush活用例",
    "testimonialsDescription": "一般的な会計書類の処理を想定したワークフロー例です。",
    "testimonialsRatingAria": "5つ星のうち5",
    "testimonials": [
      {
        "name": "Elena Park",
        "role": "会計事務所代表",
        "quote": "クライアントごとにファイル名のルールが少しずつ違います。テンプレートに保存しておけば覚えておく必要がなく、適用前にバッチ全体を確認できます。"
      },
      {
        "name": "Marco Ruiz",
        "role": "独立系の簿記担当者",
        "quote": "時間を奪っていたのは1件ずつの処理ではなく、1か月分たまったIMGファイルやダウンロードでした。日付、取引先、金額、カテゴリでリネームすると、受け取りフォルダがすぐ使える状態になります。"
      },
      {
        "name": "Nia Brown",
        "role": "クライアントの会計責任者",
        "quote": "端末内に置いておく必要があるクライアントフォルダにはオフラインAIを使っています。プレビューで、読み取りにくいスキャンも適用前に見つけられます。"
      }
    ],
    "faq": {
      "title": "会計書類のリネームに関するよくある質問",
      "description": "クライアント用テンプレート、フォルダ監視、オフラインAI、BYOK、プレビュー、取り消し、料金について説明します。",
      "items": [
        {
          "question": "Zushは会計文書管理ソフトウェアの代わりになりますか？",
          "answer": "いいえ。Zushは既存の会計環境にファイル命名機能を追加するツールです。請求書、領収書、明細書、スキャン、ダウンロード、エクスポートをリネームしますが、顧客記録の保管、アクセス制御、請求書の承認、仕訳の転記は行わず、QuickBooks、Xero、社内ポータルなどを置き換えるものではありません。"
        },
        {
          "question": "Zushは会計士や簿記担当者にどう役立ちますか？",
          "answer": "Zush は、請求書、領収書、明細書、税務フォーム、スプレッドシート、スキャンを読み取り、ベンダー、日付、請求書番号、金額、通貨、カテゴリなどのフィールドから構築されたファイル名を提案します。適用する前にバッチを確認すると、後で元に戻すことができます。"
        },
        {
          "question": "クライアントごとに異なる命名ルールを使えますか？",
          "answer": "はい。クライアント、法人、ワークフローごとに再利用できるテンプレートを作成できます。テンプレートでは、ファイル名の構造、日付形式、命名ブロックに加え、経費カテゴリ、勘定コード、承認状況などを抽出するカスタムAIブロックも設定できます。"
        },
        {
          "question": "Zushはクライアントの受け取りフォルダを監視できますか？",
          "answer": "はい。フォルダ監視にテンプレートを割り当てると、メールから保存したファイル、ポータルからのダウンロード、スキャナー出力を、届いた時点で処理できます。適用したバッチはリネーム履歴から元に戻せます。"
        },
        {
          "question": "スキャンした請求書や領収書の写真も使えますか？",
          "answer": "はい。 Zush は、AI ビジョンを使用して画像のみの PDF とサポートされている画像形式を読み取るため、別の OCR ステップを必要とせずに、スキャンとレシートの写真をボーンデジタル文書と同じ規則に従うことができます。"
        },
        {
          "question": "クライアントの財務データは非公開に保てますか？",
          "answer": "ファイルは元の保存場所でリネームされ、Zushが保管することはありません。解析方法は、マネージドクラウドAI、会社が管理するプロバイダーとAPIキーを使うBYOK、対応ファイルをローカルのOllamaモデルで端末内処理するオフラインAIから選べます。"
        },
        {
          "question": "ZushはQuickBooksやXeroに接続しますか？",
          "answer": "Zushは、会計ソフトウェア周辺にあるダウンロード、メール添付、スキャン、エクスポート、補足資料をファイル名で整理します。QuickBooks、Xero、その他の会計システムへ取引を転記したり、システム内の記録を変更したりすることはありません。"
        },
        {
          "question": "Zushは書類ごとに料金がかかりますか？",
          "answer": "いいえ。有料プランではリネーム回数が無制限です。テンプレートを変更して同じ書類を処理し直しても、ファイルごとの追加料金はかかりません。最初の50回は無料で試せます。"
        }
      ]
    },
    "guides": {
      "title": "会計書類ガイド",
      "description": "請求書、領収書、納税フォーム、および QuickBooks または Xero の周囲にあるファイルの命名規則と取り込みワークフロー。",
      "slugs": [
        "invoice-file-naming-convention",
        "automatically-rename-invoices-ai",
        "how-to-organize-invoices-and-receipts",
        "rename-invoices-for-quickbooks-xero"
      ]
    },
    "finalCta": {
      "title": "まずは1つのクライアント受け取りフォルダでZushを試す",
      "subtitle": "請求書や領収書をコピーした小さなバッチで、提案された名前を確認してください。ルールを調整したい場合は、リネームを元に戻してやり直せます。"
    }
  },
  "medical": {
    "path": "/for-medical",
    "seo": {
      "title": "オフラインAIで医療書類を安全にリネーム",
      "description": "Zushは、スキャンした診療記録、FAX、検査報告書、問診票を、医療機関が指定した項目でリネームします。EHR周辺のファイル整理に、ローカルのオフラインAIまたは組織管理のBYOKを利用でき、適用前のバッチ確認と取り消しにも対応します。"
    },
    "pageTitle": "医療文書管理",
    "hero": {
      "eyebrow": "医療現場向けの文書整理",
      "titleLead": "医療書類を",
      "titleAccent": "MRN・日付・文書種別でリネーム",
      "subtitle": "Zushは、スキャンした診療記録、FAX、検査報告書、問診票を、医療機関が指定した項目でリネームします。EHR周辺のファイル整理に、ローカルのオフラインAIまたは組織管理のBYOKを利用でき、適用前のバッチ確認と取り消しにも対応します。",
      "trustLine": [
        "ローカルのオフラインAI",
        "組織が管理するBYOK",
        "すべてのバッチを確認・取り消し可能"
      ],
      "photoAlt": "デスクトップコンピュータを使用してスキャンした医療記録を整理する医師",
      "downloadMac": "Mac版をダウンロード",
      "downloadWindows": "Windows版をダウンロード",
      "trustAria": "医療文書管理チームが Zush を使用する理由"
    },
    "demoLabel": "スキャンした医療記録をZushでリネーム",
    "audiences": {
      "eyebrow": "誰のためのものか",
      "title": "小規模な医療現場や大量の文書を扱うチーム向けに構築",
      "description": "EHRを置き換えることなく、診療記録の受け取り、受付でのスキャン、医療請求書類の整理に同じリネームの仕組みを使えます。",
      "items": [
        {
          "title": "個人開業およびクリニックのオーナー",
          "description": "その日に受け取った書類を、手入力せずにMRN、診療日、記録種別でリネームし、翌朝には整理された状態にできます。",
          "imageAlt": "診療日に受け取った医療書類をMRNと記録種別で整理するクリニック職員"
        },
        {
          "title": "クリニック管理者と受付スタッフ",
          "description": "命名ルールはテンプレートに保存されるため、担当者ごとの特別な研修は不要です。スタッフはスキャンしたファイルをフォルダに入れるだけです。",
          "imageAlt": "共通テンプレートでスキャン書類を整理するクリニックの受付スタッフ"
        },
        {
          "title": "医療請求担当者",
          "description": "EOB、ERA、請求関連書類を口座番号と保険者でリネームし、入金と請求の照合作業を効率化します。",
          "imageAlt": "EOBとERAを口座番号と保険者で整理する医療請求担当者"
        }
      ]
    },
    "fields": {
      "title": "医療記録フィールド",
      "description": "医療記録のファイル名に含める項目を選べます。",
      "instruction": "フィールドを選択して結果を確認します",
      "ariaLabel": "医療分野 Zush 読み取り",
      "hint": "提案されたファイル名",
      "footnote": "カスタムAIブロックでは、「依頼医師」「処置コード」「署名日」など、文章で指定した項目を抽出できます。ファイル名に含める項目はテンプレートで決められます。",
      "filenamePattern": "{内部ID} – {診療日} – {文書種別}",
      "filenameExamples": [
        "MRN-48211 – 2026-06-12 – Lab Results.pdf",
        "MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf",
        "MRN-51402 – 2026-06-05 – Intake Form.pdf"
      ],
      "items": [
        {
          "label": "MRN / 患者 ID",
          "before": "Scan0001.pdf",
          "after": "MRN-48211 – 2026-06-12 – ラボの結果",
          "emphasis": "MRN-48211"
        },
        {
          "label": "診療日",
          "before": "Scan0002.pdf",
          "after": "MRN-48211 – 2026-06-12 – ラボの結果",
          "emphasis": "2026-06-12"
        },
        {
          "label": "記録種別",
          "before": "fax_received.pdf",
          "after": "MRN-30177 – 2026-05-30 – 胸部 X 線検査"
        },
        {
          "label": "紹介元の医師",
          "before": "referral.pdf",
          "after": "MRN-30177 – 2026-06-02 – チェン博士",
          "emphasis": "チェン博士"
        },
        {
          "label": "専門分野",
          "before": "consult_note.pdf",
          "after": "MRN-30177 – 2026-06-02 – 心臓病学",
          "emphasis": "心臓病学"
        },
        {
          "label": "支払者/保険",
          "before": "eob.pdf",
          "after": "ACC-2210 – 2026-06-04 – ブルークロス",
          "emphasis": "ブルークロス"
        },
        {
          "label": "クレーム番号",
          "before": "Scan_0052.pdf",
          "after": "ACC-2210 – 2026-06-04 – クレーム 88213",
          "emphasis": "クレーム 88213"
        },
        {
          "label": "金額",
          "before": "statement.pdf",
          "after": "ACC-2210 – 2026-06-04 – エトナ $1,240"
        },
        {
          "label": "処置コード",
          "before": "procedure.pdf",
          "after": "MRN-51402 – 2026-06-05 – CPT 93000",
          "emphasis": "CPT 93000"
        },
        {
          "label": "文書の日付",
          "before": "outside_records.pdf",
          "after": "MRN-51402 – 2026-06-05 – 外部記録",
          "emphasis": "2026-06-05"
        },
        {
          "label": "カスタム項目（抽出したい情報を自由に指定）",
          "before": "doc_20260608.pdf",
          "after": "MRN-51402 – 2026-06-05 – 同意書",
          "emphasis": "同意書"
        }
      ]
    },
    "privacy": {
      "eyebrow": "専用処理",
      "title": "医療書類をオフラインAIまたはBYOKで処理",
      "description": "対応ファイルをローカルのOllamaモデルで解析するか、組織が管理するAIプロバイダーのアカウントとAPIキーを使って処理できます。Zushは元の保存場所でファイルをリネームし、ファイル自体を保管しません。",
      "items": [
        {
          "title": "ローカルモデルを使用したオフライン AI",
          "description": "ローカルのOllamaモデルが、対応するスキャンや書類を保存先のMacまたはWindows PC上で解析します。ファイルの内容はZushや外部のAIプロバイダーには送信されません。",
          "badge": "医療記録におすすめ",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "組織管理の BYOK",
          "description": "組織が管理するAIプロバイダーのアカウントとAPIキーを使って解析します。キーは端末内の安全な領域に保存され、使用するプロバイダーとモデルをチームで選べます。",
          "badge": "あなたのプロバイダーアカウント",
          "kind": "byok"
        },
        {
          "title": "マネージドクラウドAI",
          "description": "通常のファイルはマネージドクラウド処理が可能です。医療文書ワークフローの場合は、チームが従うポリシーに従って、オフライン AI または組織の BYOK セットアップを使用します。",
          "badge": "一般的なファイルの場合",
          "kind": "cloud-ai"
        }
      ],
      "note": "書類の内容を端末内に保持する必要がある場合はオフラインAIを、組織のプロバイダーアカウントとAPIキーを使う場合はBYOKを選んでください。どのモードでも、Zushは元の保存場所でファイルをリネームし、ファイル自体を保管しません。",
      "docsLinkLabel": "モードがデータをどのように処理するかを読む"
    },
    "workflow": {
      "eyebrow": "ワークフロー",
      "title": "スキャナーやFAXの保存フォルダに届く記録を自動リネーム",
      "description": "医療記録用テンプレートを設定して受け取りフォルダを監視し、リネームを適用する前に候補をバッチ単位で確認できます。",
      "items": [
        {
          "title": "Zushでスキャン保存フォルダを監視",
          "description": "スキャナーやFAXソフトウェアの保存先となる受け取りフォルダ、共有ドライブ、FAXスプールをフォルダ監視の対象にします。"
        },
        {
          "title": "提案された名前を確認する",
          "description": "バッチ全体をプレビューし、承認した項目だけが各ファイル名に含まれているか確認します。不適切な候補はその場で生成し直せます。"
        },
        {
          "title": "元に戻して適用する",
          "description": "リネーム履歴からバッチ全体を元に戻せます。命名ルールを変えた場合も、テンプレートを修正して処理し直せます。"
        }
      ],
      "links": [
        {
          "label": "医療記録テンプレートを作成する手順",
          "href": "/docs/templates/medical-records"
        },
        {
          "label": "スキャンした書類をリネームする仕組み",
          "href": "/rename-scanned-documents"
        },
        {
          "label": "小規模な診療所でスキャン書類を整理する方法",
          "href": "/blog/how-to-organize-scanned-medical-records-small-practice"
        }
      ]
    },
    "documents": {
      "eyebrow": "サポートされている医療ファイル",
      "title": "Zushで自動リネームできる医療書類",
      "description": "診療記録用と請求書類用に別々のテンプレートを使えます。元の内容を変更せず、用途ごとに項目と命名パターンを保存できます。",
      "items": [
        {
          "title": "スキャンされた患者記録",
          "description": "スキャナー出力やアーカイブのエクスポートを、内部ID、診療日、文書種別が分かる一貫したファイル名へ変えます。",
          "example": "MRN-48211 – 2026-06-12 – 進捗ノート.pdf"
        },
        {
          "title": "研究室レポート",
          "description": "別途OCR処理を行わずに画像だけの検査PDFを読み取り、識別子、診療日、報告書種別でリネームします。",
          "example": "MRN-48211 – 2026-06-12 – ラボ結果.pdf"
        },
        {
          "title": "紹介状とFAXで送られた書類",
          "description": "受信した紹介、相談レター、FAX で送信された記録を識別し、残りの診療で使用されているのと同じ命名パターンを適用します。",
          "example": "MRN-30177 – 2026-06-02 – 紹介 – Cardiology.pdf"
        },
        {
          "title": "問診票・同意書",
          "description": "受付でスキャンした書類からフォーム種別と署名日を抽出し、すべての受け取りバッチに同じテンプレートを適用します。",
          "example": "MRN-51402 – 2026-06-05 – 同意書.pdf"
        },
        {
          "title": "イメージングおよびコンサルトレポート",
          "description": "画像レポート、専門家によるメモ、および外部記録を、チームが後で取得するために使用するフィールドごとに名前を付けます。",
          "example": "MRN-30177 – 2026-05-30 – 画像検査 – 胸部 X 線.pdf"
        },
        {
          "title": "EOB、ERA、クレーム対応",
          "description": "保険者からの書類、口座情報、送金通知、請求関連の通信には、専用の請求書類テンプレートを使えます。",
          "example": "ACC-2210 – 2026-06-04 – ERA – Aetna.pdf"
        }
      ]
    },
    "testimonialsTitle": "医療現場でのZush活用例",
    "testimonialsDescription": "日々、多くの医療記録を扱う方を想定したワークフロー例です。",
    "testimonialsRatingAria": "5つ星のうち5",
    "testimonials": [
      {
        "name": "Dr. Amir Khan",
        "role": "クリニックオーナー",
        "quote": "私はフォローアップメモ用に、匿名化されたアーカイブを別に保管しています。オフライン AI を使用すると、Zush は訪問日と記録タイプに基づいてスキャンに名前を付けることができます。やみくもに実行するわけではありませんが、タイピングの手間が大幅に軽減されます。"
      },
      {
        "name": "Renata Alves",
        "role": "クリニック管理者",
        "quote": "受付が1つのフォルダにまとめてスキャンすると、夕方には『Scan-something』という名前のファイルが400件も並んでいました。今ではMRNと日付で整理され、適用前に一覧を確認できるので安心です。"
      },
      {
        "name": "Dana Whitfield",
        "role": "医療請求者",
        "quote": "送金と請求を照合するのは、私にとって一週間で最悪の時間でした。口座番号と支払者によって EOB に名前を付けることが、ほとんどの作業でした。いくつかのスキャンで一般的な結果が返されたので、それらを手動で修正します。"
      }
    ],
    "pricingPreface": "1ライセンスで従量課金なし。書類ごとのクレジット制ではないため、テンプレートを変更した後も追加料金なしでフォルダを処理し直せます。",
    "faq": {
      "title": "医療記録のリネームに関するよくある質問",
      "description": "ローカル モデル、組織が管理する BYOK、スキャナー フォルダ、テンプレート、プレビュー、および元に戻す機能が医療文書ワークフローにどのように適合するか。",
      "items": [
        {
          "question": "ZushはHIPAAに準拠していますか？",
          "answer": "Zush は、アプリ自体がワークフローを HIPAA に準拠させるとは主張しません。オフライン AI はサポートされているファイル分析をワークステーション上で維持しますが、コンプライアンスはデバイスのセキュリティ、アクセス制御、バックアップ、保存、ファイル名ポリシー、および組織の手順にも依存します。保護された医療情報を処理する前に、プライバシーまたはセキュリティ担当者にワークフロー全体を確認してもらいます。"
        },
        {
          "question": "患者記録を外部へアップロードせずにリネームできますか？",
          "answer": "はい。オフラインAIモードでは、MacまたはWindows上のローカルOllamaモデルで対応ファイルを解析し、端末内でリネームまで完了します。ファイルの内容はZushや外部のAIプロバイダーに送信されず、Zushがファイルを保管することもありません。"
        },
        {
          "question": "診療所では医療記録にどのようなファイル名を付けるべきですか？",
          "answer": "基本形としては、内部ID、診療日、文書種別の組み合わせが実用的です。具体的な命名方針は組織で決定し、Zushのテンプレートで一貫して適用できます。フォルダ一覧に表示する必要のない情報はファイル名に含めず、候補をバッチ単位で確認してから適用してください。"
        },
        {
          "question": "スキャンした記録やFAXも処理できますか？",
          "answer": "はい。ほとんどのレコードは、テキスト レイヤーのないスキャナーまたは FAX 出力として入力されます。 Zush は、AI ビジョンを使用してページ画像を読み取り (別途 OCR パスを必要とせず)、ページに印刷されている内容から識別子、サービスの日付、レコード タイプを抽出します。"
        },
        {
          "question": "手書きや低画質のスキャンも読み取れますか？",
          "answer": "一般的なオフィス スキャン (印刷された検査レポート、FAX で送られた紹介状、手書きのフィールドのあるフォーム) は確実に読み取られます。密集した手書きのメモやひどく歪んだり薄いページはそうではありません。それらは間違った名前ではなく一般的な名前で返され、何かが適用される前にプレビューで確認できます。"
        },
        {
          "question": "Zushは医療文書管理システムやEHRの代わりになりますか？",
          "answer": "いいえ。Zushは、スキャナーやFAXの出力、エクスポートした記録、取り込み待ちの添付ファイル、アーカイブフォルダなど、EHRや文書管理システムの周辺にあるファイルをリネームします。EHR自体へ接続して内容を読み取ったり、記録を変更したりすることはありません。EHR内だけにある文書は対象外ですが、通常のフォルダにあるファイルはZushで整理できます。"
        },
        {
          "question": "医療現場ではどのAIモードを使うべきですか？",
          "answer": "対応書類の解析を端末内で完結させる必要がある場合は、MacまたはWindows上のOllamaモデルを使うオフラインAIを選びます。組織が契約するAIプロバイダーのアカウントとAPIキーを使う場合はBYOKを選びます。内部ポリシーに合うモードをチームで決定してください。"
        },
        {
          "question": "システムを変更した後も命名ルールは役立ちますか？",
          "answer": "これが、ファイル名自体に識別子、サービスの日付、レコード タイプを含める理由です。レコードは、それを作成したソフトウェアよりも存続します。エクスポート、移行、またはアーカイブ ドライブによって、それらのファイルに意味を与えていたデータベースが削除され、自己記述的なファイル名が生き残ります。このように名前を付けたフォルダは、10 年後もファイル ブラウザーだけで読み取ることができます。"
        },
        {
          "question": "スキャナーの保存フォルダを自動処理できますか？",
          "answer": "はい。スキャナーやFAXソフトウェアの保存先をフォルダ監視に設定し、テンプレートを割り当てると、新しい書類が届くたびにルールに沿ってリネームされます。バッチのプレビューと、リネーム履歴からの取り消しにも対応しています。"
        }
      ]
    },
    "guides": {
      "title": "医療文書整理ガイド",
      "description": "EHR 以外のレコードを処理する小規模な業務向けの実用的なスキャナー、命名、およびプライバシーのワークフロー。",
      "slugs": [
        "how-to-organize-scanned-medical-records-small-practice",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "まずは1つのスキャン保存フォルダでZushを試す",
      "subtitle": "前日に受け取った書類のコピーで候補を確認し、合わなければバッチを元に戻せます。オフラインAIなら、対応ファイルの解析からリネームまで端末内で完了します。"
    }
  },
  "photographers": {
    "path": "/for-photographers",
    "seo": {
      "title": "写真家・映像制作者向けAIファイルリネーム",
      "description": "ZushはRAW写真、JPEG、動画クリップの内容とメタデータを読み取り、検索しやすいファイル名を提案します。スタジオ用の命名テンプレートを保存し、バッチを確認してから、メディアを元の場所でリネームできます。"
    },
    "pageTitle": "写真家・映像制作者向けAIファイルリネーム",
    "hero": {
      "eyebrow": "写真家やビデオグラファー向け",
      "titleLead": "すべての撮影素材を",
      "titleAccent": "プロジェクト・シーン・テイクでリネーム",
      "subtitle": "ZushはRAW写真、JPEG、動画クリップの内容とメタデータを読み取り、検索しやすいファイル名を提案します。スタジオ用の命名テンプレートを保存し、バッチを確認してから、メディアを元の場所でリネームできます。",
      "trustLine": [
        "RAW・写真・動画形式に対応",
        "命名テンプレートを自由に設定",
        "すべてのバッチを確認・取り消し可能"
      ],
      "photoAlt": "日光が当たるスタジオで一緒に撮影をレビューする写真家とビデオグラファー",
      "downloadMac": "Mac版をダウンロード",
      "downloadWindows": "Windows版をダウンロード",
      "trustAria": "写真家やビデオグラファーのチームが Zush を使用する理由"
    },
    "demoLabel": "写真と動画が混在するフォルダをZushでリネーム",
    "audiences": {
      "eyebrow": "クリエイティブチーム向け",
      "title": "カードの取り込みから納品まで、役立つファイル名を保つ",
      "description": "使い慣れた制作ツールを置き換えることなく、写真、映像、書き出しファイル、アーカイブに共通の命名ルールを適用できます。",
      "items": [
        {
          "title": "ポートレート、結婚式、イベントの写真家",
          "description": "連番だけのカメラ名を、プロジェクト、日付、被写体、瞬間、場所が分かる名前に変えます。セレクト前にも、数年後のアーカイブにも役立ちます。",
          "imageAlt": "結婚式の写真をプロジェクト、日付、被写体、場所で整理する写真家"
        },
        {
          "title": "ビデオグラファーと編集者",
          "description": "編集を始める前に、連番の動画クリップを、Bロール、インタビュー、場所、シーン、テイクで検索できる名前に変えます。",
          "imageAlt": "ビデオグラファーと編集者: 編集を開始する前に、一般的なカメラ クリップを検索可能な B ロール、インタビュー、場所、シーン、テイク名に変換します。"
        },
        {
          "title": "スタジオと制作チーム",
          "description": "アシスタント、プロデューサー、編集者が、取り込みフォルダ、進行中の案件、納品物、アーカイブで同じ命名ルールを使えます。",
          "imageAlt": "スタジオと制作チーム: アシスタント、プロデューサー、編集者に、フォルダ、アクティブなプロジェクト、成果物、アーカイブの取り込みに関する 1 つの共有規約を提供します。"
        }
      ]
    },
    "fields": {
      "title": "スタジオの命名項目",
      "description": "現場で実際に検索する情報を使ってファイル名を作成します。",
      "instruction": "フィールドをタップして結果を確認します",
      "ariaLabel": "写真およびビデオフィールド Zush の読み取り",
      "hint": "提案されたファイル名",
      "items": [
        {
          "label": "撮影日",
          "before": "DSC_4831.NEF",
          "after": "2026-06-14 – オルテガの結婚式 – 挙式",
          "emphasis": "2026-06-14"
        },
        {
          "label": "クライアント/プロジェクト",
          "before": "IMG_7294.CR3",
          "after": "オルテガの結婚式 – ポートレート – 中庭",
          "emphasis": "オルテガの結婚式"
        },
        {
          "label": "被写体",
          "before": "DSCF1042.RAF",
          "after": "マヤ・チェン – スタジオポートレート – ルック 02",
          "emphasis": "マヤ・チェン"
        },
        {
          "label": "シーン・場所",
          "before": "A001_C003.mov",
          "after": "リバーハウス – ゴールデンアワーの外観 – Take 03",
          "emphasis": "ゴールデンアワーの外観"
        },
        {
          "label": "ショットタイプ",
          "before": "MVI_8842.MP4",
          "after": "Northwind キャンペーン – 製品クローズアップ – Take 02"
        },
        {
          "label": "テイク",
          "before": "C0048.MOV",
          "after": "創設者インタビュー – カメラ A – Take 04"
        },
        {
          "label": "カメラ",
          "before": "A003_0614AB.MOV",
          "after": "創設者インタビュー – カメラ A – Take 03"
        },
        {
          "label": "向き",
          "before": "IMG_9107.ARW",
          "after": "沿岸社説 – ポートレート – 縦型"
        },
        {
          "label": "成果物の種類",
          "before": "final_final_03.mp4",
          "after": "Northwind のローンチ – ソーシャル カット – 9x16"
        },
        {
          "label": "カスタム項目（抽出したい情報を自由に指定）",
          "before": "DSC_4908.NEF",
          "after": "オルテガの結婚式 – ファーストダンス – 選択",
          "emphasis": "ファーストダンス"
        }
      ]
    },
    "privacy": {
      "eyebrow": "処理とプライバシー",
      "title": "撮影案件ごとに解析方法を選択",
      "description": "すぐに使えるマネージドAI、スタジオが管理するプロバイダーアカウント、未公開作品や非公開案件を端末内で処理するオフラインAIから選べます。",
      "items": [
        {
          "title": "クラウドAIですぐに開始",
          "description": "Zushが管理するAIで画像プレビューや動画から抽出したフレームを解析し、候補を確認してから撮影素材に適用します。",
          "badge": "最速のセットアップ",
          "badgeTone": "success",
          "kind": "cloud-ai"
        },
        {
          "title": "自分の AI アカウントを使用する",
          "description": "スタジオがすでに使用しているプロバイダーとモデルを接続します。プロバイダー アカウントを管理している間、API キーは安全なローカル ストレージに保管されます。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "クライアント素材を端末内で処理",
          "description": "未公開のキャンペーン、非公開イベント、クライアント映像をローカルに残す必要がある場合は、MacまたはWindows上のOllamaモデルで対応する画像解析を実行できます。",
          "badge": "オフラインAI",
          "kind": "offline-ai"
        }
      ],
      "note": "Zushは元の保存場所でメディアをリネームするツールで、新しい素材ライブラリを作るものではありません。既存のフォルダ構成を保ったまま処理方法を選び、必要ならリネーム履歴からバッチを元に戻せます。",
      "docsLinkLabel": "モードがデータをどのように処理するかを読む"
    },
    "workflow": {
      "eyebrow": "ワークフロー",
      "title": "既存の制作フローを変えずに撮影素材を一括リネーム",
      "description": "Lightroom、Capture One、NLE、現在の保存構成はそのまま。メディアがあるフォルダに、再利用できる命名ステップを追加します。",
      "items": [
        {
          "title": "スタジオの命名規則を作成する",
          "description": "日付、クライアント、プロジェクト、被写体、場所、シーン、ショット種別、テイク、カメラ、独自項目を組み合わせ、再利用できるテンプレートに保存します。"
        },
        {
          "title": "取り込み先やアーカイブのフォルダで実行",
          "description": "元のメディアを移動せず、コピーした撮影フォルダ、カードの取り込み先、書き出しフォルダ、RAW写真・JPEG・動画が混在するアーカイブを追加します。"
        },
        {
          "title": "確認、適用、再利用",
          "description": "候補をバッチ単位で確認し、例外を修正してから適用します。必要なら元に戻せ、次の案件でも同じテンプレートを再利用できます。"
        }
      ],
      "links": [
        {
          "label": "Zush が写真の名前を変更する方法をご覧ください",
          "href": "/rename-photos-with-ai"
        },
        {
          "label": "Zush がビデオ クリップの名前を変更する方法をご覧ください。",
          "href": "/rename-videos-with-ai"
        },
        {
          "label": "再利用できる命名テンプレートを作成する",
          "href": "/docs/templates"
        }
      ]
    },
    "documents": {
      "eyebrow": "サポートされているメディア",
      "title": "写真・映像・納品物を1つの命名フローで整理",
      "description": "撮影素材と書き出しファイルで別のテンプレートを使うことも、形式が混在するプロジェクトフォルダ全体に共通ルールを適用することもできます。",
      "items": [
        {
          "title": "RAW 写真撮影",
          "description": "元の RAW 拡張子を維持しながら、カメラ カウンターをプロジェクト、日付、主題、シーン、または場所を表す名前に変換します。",
          "example": "2026-06-14 – オルテガの結婚式 – 挙式 – First Kiss.nef"
        },
        {
          "title": "ポートレートとイベントギャラリー",
          "description": "カリング、配信、または長期アーカイブの前に、JPEG、HEIC、TIFF、および RAW 選択全体に 1 つの読み取り可能な規則を適用します。",
          "example": "マヤ・チェン – スタジオポートレート – ルック 02.cr3"
        },
        {
          "title": "Bロールとロケーション映像",
          "description": "表示される主題、設定、ショット タイプ、プロジェクトごとに短いクリップに名前を付けると、編集者が各ファイルを開く前に有用な映像を見つけられるようになります。",
          "example": "リバーハウス – 外観 – ゴールデンアワー – Wide.mov"
        },
        {
          "title": "インタビューとマルチカメラ撮影",
          "description": "講演者、インタビュートピック、カメラ、フィールド撮影を使用して、Finder または File Explorer で同じ番号の付いた 1 日のクリップを簡単にスキャンできるようにします。",
          "example": "創設者インタビュー – カメラ A – Take 04.mp4"
        },
        {
          "title": "SNS用・クライアント納品用の書き出し",
          "description": "final-finalのような名前を、引き継ぎに必要なプロジェクト、納品物、アスペクト比、言語、バージョンが分かる名前に変えます。",
          "example": "Northwind Launch – Social Cut – 9x16 – v03.mp4"
        },
        {
          "title": "混合スタジオのアーカイブ",
          "description": "写真、映像、音声、字幕、制作資料が混在していても、各ファイルから読み取れる情報を基に、1つのバッチで名前を提案します。",
          "example": "Coastal エディトリアル – 舞台裏 – Studio Setup.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "組織の成果",
      "title": "分かりやすいファイル名が制作を支える",
      "description": "見た目を整えるだけではありません。取り込み前、共同作業中、納品後にも内容が分かるメディアになります。",
      "items": [
        {
          "title": "ファイルを開く前に必要なショットを見つける",
          "description": "説明的な主題、シーン、場所、またはテイクは、フォルダのリストを撮影の便利な最初のインデックスに変えます。"
        },
        {
          "title": "すべてのカメラで規則を維持する",
          "description": "再利用できるテンプレートにより、異なるカメラ本体、カード、撮影担当者のファイルにも、スタジオ共通の命名順序を適用できます。"
        },
        {
          "title": "それ自体を説明するメディアを手放す",
          "description": "編集者とクライアントは、カタログ、NLE、共有ドライブ、配信プラットフォームの外部でプロジェクトのコンテキストを保持するファイル名を受け取ります。"
        }
      ]
    },
    "faq": {
      "title": "写真・動画のリネームに関するよくある質問",
      "description": "Zush が RAW 写真、ビデオ クリップ、テンプレート、処理モード、バッチ レビュー、既存のクリエイティブ ツール、および元に戻す方法を処理する方法。",
      "items": [
        {
          "question": "写真家に適したファイル命名ルールは何ですか？",
          "answer": "実際の開始点は、撮影日、クライアントまたはプロジェクト、被写体またはシーン、および場所、ショット タイプ、選択ステータスなどの簡単な差別化要因です。順序に一貫性を保ち、後でチームが実際に検索するフィールドを使用してください。"
        },
        {
          "question": "ZushはRAW写真をリネームできますか？",
          "answer": "はい。 Zush は、CR2、CR3、NEF、ARW、DNG、ORF、RAF、RW2、PEF、SRW、SR2、RAW を含む一般的な RAW 形式をサポートします。利用可能なプレビューとメタデータを分析し、新しいファイル名を提案し、ファイル拡張子を保持します。"
        },
        {
          "question": "動画クリップの内容に合わせてAIでリネームできますか？",
          "answer": "はい。 Zush はフレームをサンプリングし、存在する場合は利用可能な字幕またはトランスクリプト コンテキストを使用し、MP4、MOV、M4V、MTS、M2TS などのサポートされている形式の説明的な名前を提案します。適用する前にバッチを確認してください。"
        },
        {
          "question": "シーン、場所、テイクを使ってクリップに名前を付けられますか？",
          "answer": "はい。必要な項目をテンプレートへ追加するか、スタジオ独自の項目をカスタムAIブロックで指定します。候補は各ファイルから得られる画像情報とメタデータに基づくため、内容が曖昧なクリップはプレビューで確認してください。"
        },
        {
          "question": "Zush は、Lightroom、Capture One、または NLE を置き換えますか?",
          "answer": "いいえ。Zushは、既存の制作フローにファイル命名機能を追加するツールです。取り込み前、引き継ぎ時、アーカイブ内にある通常のフォルダでメディアをリネームします。セレクト、カラー調整、編集、カタログ管理、タイムライン、デジタル素材管理を置き換えるものではありません。"
        },
        {
          "question": "未公開作品や非公開のクライアント案件をオフラインで処理できますか？",
          "answer": "はい。オフライン AI は、Mac または Windows でサポートされている分析にローカル Ollama モデルを使用するため、ファイル コンテンツは Zush またはサードパーティ AI プロバイダーに送信されません。スタジオが独自のプロバイダー アカウントを通じて分析をルーティングする場合は、BYOK を使用することもできます。"
        },
        {
          "question": "リネームした撮影素材を元に戻せますか？",
          "answer": "はい。候補を適用前にすべて確認でき、命名ルールを調整したい場合は、リネーム履歴からバッチを元に戻せます。"
        },
        {
          "question": "Zushは写真や動画を移動したりアップロードしたりしますか？",
          "answer": "Zushは元の保存場所でファイルをリネームし、新しいライブラリへ移動したり保管したりしません。クラウドAIでは解析用の小さなデータを送信し、BYOKでは自分のプロバイダーアカウントを利用します。オフラインAIなら、対応する解析を端末内で完了できます。"
        }
      ]
    },
    "guides": {
      "title": "写真とビデオの整理ガイド",
      "description": "RAW 撮影、写真ライブラリ、クライアント エクスポート、ビデオ クリップの名前付けとアーカイブのワークフロー。",
      "slugs": [
        "ai-photo-renamer-guide",
        "best-ways-to-organize-photos-on-mac",
        "rename-video-files-with-ai",
        "digital-photo-organization-mistakes-to-avoid"
      ]
    },
    "finalCta": {
      "title": "まずはコピーした撮影フォルダ1つでZushを試す",
      "subtitle": "少量のRAW写真や動画クリップで候補を確認し、テンプレートを調整してください。必要ならバッチを元に戻してやり直せます。"
    }
  },
  "legal": {
    "path": "/for-legal",
    "seo": {
      "title": "オフラインAIで法務文書を安全にリネーム",
      "description": "Zushは訴状、契約書、通信、ディスカバリー資料、スキャンを読み取り、一貫した検索しやすいファイル名を提案します。MacやWindowsの既存フォルダ、共有ドライブ、DMSからのエクスポートをそのまま利用できます。"
    },
    "pageTitle": "法務文書の整理",
    "hero": {
      "eyebrow": "法律事務所および法務チーム向け",
      "titleLead": "法務文書を",
      "titleAccent": "案件・日付・文書種別でリネーム",
      "subtitle": "Zushは訴状、契約書、通信、ディスカバリー資料、スキャンを読み取り、一貫した検索しやすいファイル名を提案します。MacやWindowsの既存フォルダ、共有ドライブ、DMSからのエクスポートをそのまま利用できます。",
      "trustLine": [
        "既存のフォルダをそのまま利用",
        "機密ファイル向けのオフラインAI",
        "リネーム前に必ずプレビュー"
      ],
      "photoAlt": "オフィスのデスクトップ コンピューターで事件文書を検討する若い弁護士",
      "downloadMac": "Mac版をダウンロード",
      "downloadWindows": "Windows版をダウンロード",
      "trustAria": "法務文書を扱うチームがZushを使用する理由"
    },
    "demoLabel": "法務文書をZushで検索しやすい案件ファイルに整理",
    "audiences": {
      "eyebrow": "法務ファイルの整理",
      "title": "フォルダで仕事をするなら、ファイル名が索引になる",
      "description": "Zushは、正式な文書管理システムへ入れる前の書類、DMSと並行して扱う書類、DMS外にある書類の整理を支援します。",
      "items": [
        {
          "title": "共有フォルダで運用する小規模な法律事務所",
          "description": "新たな文書管理システムを導入せず、Finder、エクスプローラー、OneDrive、Dropbox、ネットワークドライブ上の案件ファイルを分かりやすく保てます。",
          "imageAlt": "共有フォルダで案件ファイルを整理する小規模な法律事務所"
        },
        {
          "title": "訴訟チームとパラリーガルチーム",
          "description": "ダウンロードした訴訟書面、提出書類、証拠、通信、スキャンを、提出・レビュー前に案件別かつ時系列で整理します。",
          "imageAlt": "訴訟およびパラリーガル チーム: 提出または審査する前に、ダウンロードした弁論調書、証拠書類、証拠書類、通信、およびスキャナー出力を時系列事項フォルダに変換します。"
        },
        {
          "title": "法務担当者および DMS 管理者",
          "description": "取り込み、移行、エクスポート時にファイル名を標準化し、文書がシステム間を移動したりDMS外へ出たりしても、案件の文脈を失わないようにします。",
          "imageAlt": "法務部門および DMS 管理者: ドキュメントがシステム間を移動するとき、または DMS から離れるときにドキュメントがコンテキストを保持できるように、取り込み、移行、およびエクスポート時にファイル名を標準化します。"
        }
      ]
    },
    "fields": {
      "title": "案件命名フィールド",
      "description": "案件フォルダを検索しやすい記録へ整えます。",
      "instruction": "フィールドをタップして結果を確認します",
      "ariaLabel": "有効なフィールド Zush が読み取ります",
      "hint": "提案されたファイル名",
      "items": [
        {
          "label": "案件番号",
          "before": "document (7).pdf",
          "after": "2026-0142 – 2026-06-12 – 発見命令",
          "emphasis": "2026-0142"
        },
        {
          "label": "文書の日付",
          "before": "scan_0048.pdf",
          "after": "2026-0142 – 2026-06-13 – 顧問レター",
          "emphasis": "2026-06-13"
        },
        {
          "label": "文書の種類",
          "before": "download (3).pdf",
          "after": "2026-0142 – 2026-05-06 – 苦情",
          "emphasis": "苦情"
        },
        {
          "label": "クライアント",
          "before": "signed_final.pdf",
          "after": "ノースウィンド – 2026-06-01 – NDA – 締結済み",
          "emphasis": "ノースウィンド"
        },
        {
          "label": "当事者/相手方",
          "before": "contract_v2.docx",
          "after": "ノースウィンド – NDA – メリディアン – ドラフト v02"
        },
        {
          "label": "裁判所・管轄",
          "before": "efile.pdf",
          "after": "2026-0142 – 2026-05-29 – 回答 – SDNY",
          "emphasis": "SDNY"
        },
        {
          "label": "ステータス",
          "before": "agreement.pdf",
          "after": "Northwind – サービス契約 – 締結"
        },
        {
          "label": "バージョン",
          "before": "ltr_draft_final2.docx",
          "after": "2026-0142 – 要求書 – v03",
          "emphasis": "v03"
        },
        {
          "label": "著者/顧問",
          "before": "correspondence.pdf",
          "after": "2026-0142 – 2026-06-13 – 手紙 – J. Chen"
        },
        {
          "label": "カスタム項目（抽出したい情報を自由に指定）",
          "before": "Scan0091.pdf",
          "after": "2026-0158 – 証拠 B – 請求書セット"
        }
      ]
    },
    "privacy": {
      "eyebrow": "機密処理",
      "title": "機密性に合わせて法務文書の処理方法を選択",
      "description": "書類の機密性や社内方針に応じて、ローカル処理、事務所が承認したAIプロバイダー、ZushのマネージドAIから選べます。元のファイルは現在の保存場所に残ります。",
      "items": [
        {
          "title": "ローカルモデルを使用したオフライン AI",
          "description": "対応する案件ファイルを、保存先のMacまたはWindows PC上にあるローカルOllamaモデルで解析します。文書の内容はZushや外部のAIプロバイダーには送信されません。",
          "badge": "ファイルは端末内に残ります",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "事務所のAIアカウントを利用",
          "description": "AI プロバイダーのアカウントと会社が承認したモデルを接続します。プロバイダーが選択したドキュメントを処理している間、API キーは安全なローカル ストレージに保管されます。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "マネージド AI から始める",
          "description": "非機密文書と迅速な評価には、Zush が管理する AI を使用します。クライアント ファイルに別の処理ポリシーが必要な場合は、オフライン AI または BYOK を選択します。",
          "badge": "最速のセットアップ",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zushは案件ファイルの保管場所にはなりません。文書は元の保存場所でリネームされ、Zushが保管することはありません。処理方法はワークフローごとに選べます。",
      "docsLinkLabel": "モードがデータをどのように処理するかを読む"
    },
    "workflow": {
      "eyebrow": "ワークフロー",
      "title": "既存のツールに一貫したファイル命名ルールを追加",
      "description": "メール、裁判所からのダウンロード、スキャナー、共有フォルダ、法務文書管理システムの間をつなぐ命名レイヤーとしてZushを使えます。",
      "items": [
        {
          "title": "案件の命名規則を定義する",
          "description": "クライアント名、案件番号、文書日付、文書種別、当事者、ステータス、バージョンなど、事務所で使う項目からテンプレートを作成します。"
        },
        {
          "title": "受け取りフォルダやアーカイブで実行",
          "description": "文書を別のプラットフォームへ移さず、コピーした案件フォルダ、ダウンロードした提出書類、スキャナー出力、DMSエクスポートを整理します。"
        },
        {
          "title": "案件で使えるファイル名を確認して適用",
          "description": "バッチ全体を確認し、例外を修正してから適用します。リネーム履歴から取り消すこともでき、その後は同じルールで受け取りフォルダを継続的に監視できます。"
        }
      ],
      "links": [
        {
          "label": "法務文書の命名テンプレートを作成する",
          "href": "/docs/templates/legal-documents"
        },
        {
          "label": "法務文書の受け取りフォルダを自動化する",
          "href": "/docs/folder-monitoring"
        },
        {
          "label": "法務ファイルの命名ルールと例を見る",
          "href": "/blog/legal-file-naming-conventions"
        }
      ]
    },
    "documents": {
      "eyebrow": "対応している法務ファイル",
      "title": "あらゆる案件の法務文書を1つの仕組みで整理",
      "description": "事務所全体で案件単位の構造を統一しながら、訴訟、取引、ディスカバリー、顧客受け入れごとに命名ルールを分けられます。",
      "items": [
        {
          "title": "裁判所への提出書類",
          "description": "苦情、回答、動議、命令、通知、電子提出の領収書に、事項、日付、文書の種類、および場所ごとに名前を付けます。",
          "example": "2026-0142 – 2026-05-29 – 回答 – SDNY.pdf"
        },
        {
          "title": "契約と協定",
          "description": "草案、レッドライン、クリーンコピー、および締結された契約書をクライアントと取引相手間で区別できるようにします。",
          "example": "ノースウィンド – NDA – メリディアン – 実行済み – 2026-06-01.pdf"
        },
        {
          "title": "通信",
          "description": "要求書、クライアントからの手紙、相手方弁護士とのやり取りを時系列に整理します。",
          "example": "2026-0142 – 2026-06-10 – 要求書 – v03.docx"
        },
        {
          "title": "ディスカバリーと証拠資料",
          "description": "案件固有の項目を使い、提出物、回答、証拠セット、証言録取資料、証拠スキャンに名前を付けます。",
          "example": "2026-0158 – 2026-06-11 – 証拠 B – 請求書セット.pdf"
        },
        {
          "title": "内部作業成果物",
          "description": "研究、インタビューメモ、戦略メモ、証言録取準備ファイルにも同じ規則を適用します。",
          "example": "2026-0142 – 2026-06-12 – メモ – 蒸着準備.docx"
        },
        {
          "title": "スキャナ出力",
          "description": "画像のみの PDF と一般的なソース名を含む紙の通信を、検索可能な事項ファイルに変換します。",
          "example": "2026-0158 – 2026-06-13 – 通信 – Counsel.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "組織の成果",
      "title": "法務ファイルを整理する効果",
      "description": "目的は見た目を整えることではありません。文書がどこへ移動しても案件との関係が分かる状態を保つことです。",
      "items": [
        {
          "title": "開く前に適切な文書を見つける",
          "description": "案件番号、文書タイプ、関係者、およびステータスにより、フォルダのリストが、ダウンロード数やスキャン数の壁ではなく、有用なインデックスに変わります。"
        },
        {
          "title": "案件の時系列を一目で把握",
          "description": "文書の日付を一貫した ISO 形式にすると、案件フォルダは提出書類、手紙、契約書、イベントのタイムラインに分類されます。"
        },
        {
          "title": "DMS の外部でコンテキストを保持する",
          "description": "内容が分かるファイル名は、メール添付、クライアント向けエクスポート、共有ドライブ、ディスカバリー資料、完了案件のアーカイブでも役立ちます。"
        }
      ]
    },
    "faq": {
      "title": "法務文書の整理に関するよくある質問",
      "description": "案件フォルダ、共有ドライブ、法務文書管理システム、機密ファイル、プレビュー、取り消しについて説明します。",
      "items": [
        {
          "question": "法務文書を整理するには、どのような方法が適していますか？",
          "answer": "クライアントと案件ごとに文書を分け、案件番号、文書日付、文書種別、当事者、バージョン、ステータスを組み合わせた一貫したファイル名を使います。共有ドライブ、エクスポート、文書管理システムの間を移動しても意味が保たれ、フォルダ内を検索・時系列表示しやすくなります。"
        },
        {
          "question": "AIで法務文書を自動整理できますか？",
          "answer": "はい。ZushはPDF、Word文書、スキャンの内容を読み取り、テンプレートで指定した項目を抽出して、バッチ全体に一貫したファイル名を提案します。担当者が結果を確認してからリネームを適用します。"
        },
        {
          "question": "Zushは法務文書管理システムの代わりになりますか？",
          "answer": "いいえ。Zushは、受け取りフォルダ、共有ドライブ、ダウンロード、スキャナー出力、移行バッチ、エクスポートなど、DMS周辺にある書類を整理するための命名ツールです。元の保存場所でファイルをリネームしますが、文書保管、アクセス制御、リーガルリサーチ、案件管理の機能は提供しません。"
        },
        {
          "question": "機密性の高い案件ファイルをアップロードせずに整理できますか？",
          "answer": "はい。オフラインAIモードでは、MacまたはWindows上のローカルOllamaモデルで対応ファイルを解析するため、文書の内容は端末内に残ります。Zushは元の保存場所でファイルをリネームし、ファイル自体を保管しません。"
        },
        {
          "question": "法律事務所で古い案件ファイルを整理するには？",
          "answer": "まずは完了案件フォルダのコピーで試します。文書に含まれている項目に合わせてテンプレートを作り、候補をバッチ単位で確認してください。ルールに問題がないと確認できたら、取り消し可能なリネーム履歴を残したままアーカイブへ適用します。"
        },
        {
          "question": "法務文書から案件番号を抽出できますか？",
          "answer": "はい。案件番号と必要な形式を指定するカスタムAIブロックを追加できます。命名テンプレートでは、文書日付、文書種別、当事者、裁判所、ステータス、バージョンなど、事務所独自の項目と組み合わせられます。"
        },
        {
          "question": "裁判所への提出書類やスキャンした法務文書も整理できますか？",
          "answer": "はい。 Zush は、別の OCR ステップを必要とせずに、電子ファイリング PDF と画像のみのスキャナー出力を AI ビジョンで読み取ることができます。フォルダ監視では、それらのドキュメントが到着する場所を監視できます。"
        },
        {
          "question": "ドラフト、レッドライン、締結済み文書を区別できますか？",
          "answer": "はい。取引用テンプレートにステータスとバージョンの項目を追加すると、候補のファイル名からドラフト、レッドライン、クリーン版、締結済み契約を区別できます。"
        }
      ]
    },
    "guides": {
      "title": "法務文書の整理ガイド",
      "description": "法律事務所のDMS周辺にある文書を、案件単位で命名し、スキャナーから受け取り、プライベートAIで処理する方法を紹介します。",
      "slugs": [
        "legal-file-naming-conventions",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "まずはコピーした案件フォルダ1つをZushで整理",
      "subtitle": "ダウンロード、下書き、スキャンが入った案件フォルダで候補を確認し、命名ルールを調整してください。必要ならバッチを元に戻してやり直せます。"
    }
  },
  "hr": {
    "path": "/for-hr",
    "seo": {
      "title": "オフラインAIで人事書類を安全にリネーム",
      "description": "Zushは履歴書、採用通知書、入社手続き書類、人事評価、社内規程、エクスポートした記録を読み取り、一貫した検索しやすいファイル名を提案します。MacやWindowsの既存フォルダ、共有ドライブ、ATSからのダウンロード、HRISエクスポートをそのまま利用できます。"
    },
    "pageTitle": "人事文書管理",
    "hero": {
      "eyebrow": "人事・採用チーム向け",
      "titleLead": "人事書類を",
      "titleAccent": "従業員・日付・文書種別でリネーム",
      "subtitle": "Zushは履歴書、採用通知書、入社手続き書類、人事評価、社内規程、エクスポートした記録を読み取り、一貫した検索しやすいファイル名を提案します。MacやWindowsの既存フォルダ、共有ドライブ、ATSからのダウンロード、HRISエクスポートをそのまま利用できます。",
      "trustLine": [
        "既存のフォルダをそのまま利用",
        "機密記録向けのオフラインAI",
        "リネーム前に必ずプレビュー"
      ],
      "photoAlt": "現代のオフィスで従業員の入社書類を確認する人事担当者",
      "downloadMac": "Mac版をダウンロード",
      "downloadWindows": "Windows版をダウンロード",
      "trustAria": "人事文書管理チームが Zush を使用する理由"
    },
    "demoLabel": "人事書類をZushで検索しやすい従業員・候補者ファイルに整理",
    "audiences": {
      "eyebrow": "人事ファイルの構成",
      "title": "システム間を移動しても、ファイル名が記録の意味を伝える",
      "description": "Zushは、ATSやHRISへ入れる前の書類、システムと並行して扱う書類、システム外へ出した書類の整理を支援します。",
      "items": [
        {
          "title": "人事ジェネラリストと少人数チーム",
          "description": "入社手続き、人事異動、評価、退職手続きの書類を、Finder、エクスプローラー、OneDrive、Dropbox、ネットワークドライブ上で分かりやすく整理します。",
          "imageAlt": "人事ジェネラリストおよび小規模チーム: Finder、File Explorer、OneDrive、Dropbox、またはネットワーク ドライブ全体で、オンボーディング、従業員の変更、レビュー、オフボーディングに関するドキュメントを理解しやすくします。"
        },
        {
          "title": "採用・タレントアクイジション",
          "description": "ATS のダウンロード、履歴書、ポートフォリオ、面接メモ、スコアカード、署名済みのオファーを、引き継ぎやアーカイブの前に一貫した候補者記録に変換します。",
          "imageAlt": "採用と人材獲得: ATS のダウンロード、履歴書、ポートフォリオ、面接メモ、スコアカード、署名済みのオファーを、引き継ぎやアーカイブの前に一貫した候補者記録に変換します。"
        },
        {
          "title": "人事管理者および HRIS 管理者",
          "description": "取り込み、移行、エクスポート時にファイル名を標準化し、従業員記録がシステム間を移動したりHRIS外へ出たりしても文脈を失わないようにします。",
          "imageAlt": "人事管理者と HRIS 管理者: 従業員のレコードがシステム間を移動するとき、または HRIS から離れるときにコンテキストが保持されるように、取り込み、移行、およびエクスポート時にファイル名を標準化します。"
        }
      ]
    },
    "fields": {
      "title": "人事記録の命名項目",
      "description": "人事フォルダを検索しやすい従業員・候補者記録へ整えます。",
      "instruction": "フィールドをタップして結果を確認します",
      "ariaLabel": "HR フィールド Zush の読み取り",
      "hint": "提案されたファイル名",
      "items": [
        {
          "label": "従業員ID",
          "before": "scan_0048.pdf",
          "after": "EMP-1042 – 2026-08-03 – 福利厚生の登録",
          "emphasis": "EMP-1042"
        },
        {
          "label": "候補者",
          "before": "resume-final.pdf",
          "after": "Rivera Sofia – プロダクト デザイナー – 履歴書"
        },
        {
          "label": "文書の日付",
          "before": "document (7).pdf",
          "after": "EMP-1042 – 2026-08-03 – オファーレター",
          "emphasis": "2026-08-03"
        },
        {
          "label": "文書の種類",
          "before": "download (3).pdf",
          "after": "EMP-1042 – 2026-08-05 – 納税フォーム",
          "emphasis": "納税フォーム"
        },
        {
          "label": "役割・役職",
          "before": "candidate_notes.docx",
          "after": "Rivera Sofia – プロダクト デザイナー – インタビューノート"
        },
        {
          "label": "部門",
          "before": "policy_ack.pdf",
          "after": "EMP-1186 – 財務 – セキュリティ ポリシーの承認"
        },
        {
          "label": "発効日",
          "before": "signed_letter.pdf",
          "after": "EMP-1042 – プロモーション – 2026-09-01 発効",
          "emphasis": "2026-09-01"
        },
        {
          "label": "評価期間",
          "before": "review_final2.docx",
          "after": "EMP-1042 – パフォーマンスレビュー – 2026 年上半期"
        },
        {
          "label": "ステータス",
          "before": "offer.pdf",
          "after": "Rivera Sofia – プロダクト デザイナー – オファー – 署名"
        },
        {
          "label": "カスタム項目（抽出したい情報を自由に指定）",
          "before": "Form0091.pdf",
          "after": "EMP-1042 – 機器契約 – ラップトップの返却"
        }
      ]
    },
    "privacy": {
      "eyebrow": "機密ファイルの処理",
      "title": "機密性に合わせて人事書類の処理方法を選択",
      "description": "書類の機密性や社内方針に応じて、ローカル処理、組織が承認したAIプロバイダー、ZushのマネージドAIから選べます。元のファイルは現在の保存場所に残ります。",
      "items": [
        {
          "title": "ローカルモデルを使用したオフライン AI",
          "description": "対応する従業員・候補者ファイルを、保存先のMacまたはWindows PC上にあるローカルOllamaモデルで解析します。文書の内容はZushや外部のAIプロバイダーには送信されません。",
          "badge": "ファイルは端末内に残ります",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "組織の AI アカウントを使用する",
          "description": "AI プロバイダー アカウントと組織によって承認されたモデルを接続します。プロバイダーが選択したドキュメントを処理している間、API キーは安全なローカル ストレージに保管されます。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "マネージド AI から始める",
          "description": "サンプルまたは機密性の低いドキュメントと迅速な評価には、Zush が管理する AI を使用します。人事レコードに別の処理ポリシーが必要な場合は、オフライン AI または BYOK を選択します。",
          "badge": "最速のセットアップ",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zushは従業員・候補者記録の保管システムにはなりません。文書は元の保存場所でリネームされ、Zushが保管することはありません。処理方法はワークフローごとに選べます。",
      "docsLinkLabel": "モードがデータをどのように処理するかを読む"
    },
    "workflow": {
      "eyebrow": "ワークフロー",
      "title": "既存の人事ツールに一貫したファイル命名ルールを追加",
      "description": "メール、採用サイトからのダウンロード、スキャナー、共有フォルダとATS・HRISの間をつなぐ命名レイヤーとしてZushを使えます。",
      "items": [
        {
          "title": "HR 命名規則を定義する",
          "description": "従業員・候補者ID、文書日付、文書種別、役職、部門、評価期間、ステータスなど、人事チームで使う項目からテンプレートを作成します。"
        },
        {
          "title": "取り込み時またはエクスポート時に実行します",
          "description": "ファイルを別のプラットフォームへ移さず、コピーした従業員フォルダ、採用ダウンロード、入社書類のスキャン、規程への同意書、ATS・HRISエクスポートを整理します。"
        },
        {
          "title": "検索可能なファイル名を承認する",
          "description": "バッチ全体を確認し、例外を修正してから適用します。リネーム履歴から取り消すこともでき、その後は同じルールで受け取りフォルダを継続的に監視できます。"
        }
      ],
      "links": [
        {
          "label": "従業員ファイルの命名規則を構築する",
          "href": "/blog/hr-employee-file-naming-convention"
        },
        {
          "label": "入社手続き書類の受け取りを整理する",
          "href": "/blog/organize-employee-onboarding-documents"
        },
        {
          "label": "候補者および採用ファイルを整理する",
          "href": "/blog/organize-candidate-files-recruiting"
        }
      ]
    },
    "documents": {
      "eyebrow": "サポートされている HR ファイル",
      "title": "従業員ライフサイクル全体の書類を1つの仕組みで整理",
      "description": "従業員単位の構造を統一しながら、採用、入社手続き、人事異動、評価、規程への同意、退職手続きごとに命名ルールを分けられます。",
      "items": [
        {
          "title": "採用および候補者ファイル",
          "description": "履歴書、ポートフォリオ、面接メモ、スコアカード、経歴調査書類、オファーに候補者、役割、日付、ステータスごとに名前を付けます。",
          "example": "Rivera Sofia – プロダクト デザイナー – オファー – Signed.pdf"
        },
        {
          "title": "オンボーディング記録",
          "description": "署名済みのオファー、納税フォーム、福利厚生の選択、身分証明書、機器契約、およびポリシーの承認を明確に保ちます。",
          "example": "EMP-1042 – 2026-08-05 – 福利厚生登録.pdf"
        },
        {
          "title": "従業員の異動",
          "description": "昇進通知、報酬変更、異動、休暇記録、フレキシブルワーク協定を発効日とステータスごとに整理します。",
          "example": "EMP-1042 – プロモーション – 発効 2026-09-01.pdf"
        },
        {
          "title": "パフォーマンスと開発",
          "description": "レビューフォーム、目標、能力開発計画、トレーニング証明書、およびマネージャーのメモに従業員およびレビュー期間ごとに名前を付けます。",
          "example": "EMP-1042 – パフォーマンスレビュー – 2026 H1.pdf"
        },
        {
          "title": "社内規程と同意記録",
          "description": "ハンドブックの受領書、セキュリティ トレーニング、行動規範の承認、ポリシーの更新を従業員、ポリシー、日付ごとに分けます。",
          "example": "EMP-1186 – セキュリティ ポリシー承認 – 2026-07-22.pdf"
        },
        {
          "title": "オフボーディングとアーカイブ",
          "description": "保管・アーカイブ前に、退職届、機器返却記録、最終通知書、エクスポートした人事記録を分かりやすいファイル名へ整えます。",
          "example": "EMP-1042 – 機器の返却 – 完了 – 2026-10-04.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "組織の成果",
      "title": "人事ファイルを整理する効果",
      "description": "目的は見た目を整えることではありません。承認されたワークフローの中で書類がどこへ移動しても、誰のどの記録か分かる状態を保つことです。",
      "items": [
        {
          "title": "レコードを開く前にレコードを識別する",
          "description": "従業員または候補者の ID、文書タイプ、役割、期間、およびステータスにより、フォルダのリストが、ダウンロード数やスキャン数の壁ではなく、有用なインデックスに変わります。"
        },
        {
          "title": "ライフサイクルの引き継ぎをレビューしやすくする",
          "description": "一貫した名前は、承認されたワークフローを通過するファイルが何であるかを採用、人事、マネージャー、給与計算、IT、および運用担当者が理解するのに役立ちます。"
        },
        {
          "title": "HRIS の外側のコンテキストを保持する",
          "description": "自己記述型ファイル名は、承認されたエクスポート、移行バッチ、共有フォルダ、従業員パケット、および保存アーカイブで引き続き役立ちます。"
        }
      ]
    },
    "faq": {
      "title": "人事書類の整理に関するよくある質問",
      "description": "AI ファイル整理が従業員フォルダ、採用ダウンロード、HRIS および ATS エクスポート、機密レコード、プレビュー、および元に戻す機能をどのように操作するか。",
      "items": [
        {
          "question": "人事書類を整理するには、どのような方法が適していますか？",
          "answer": "HRIS または ATS を記録システムとして使用し、従業員または候補者の ID と、文書の日付、タイプ、役割または部門、期間、およびステータスから構築された一貫したファイル名によってファイルを整理します。組織のポリシーで要求されていない限り、機密の個人情報をファイル名に含めないでください。"
        },
        {
          "question": "AIで従業員ファイルを自動整理できますか？",
          "answer": "はい。ZushはPDF、Word文書、画像、スキャンを読み取り、テンプレートで指定した項目を抽出して、バッチ全体に一貫したファイル名を提案します。担当者が結果を確認してからリネームを適用します。"
        },
        {
          "question": "ZushはHRIS、ATS、従業員文書管理システムの代わりになりますか？",
          "answer": "いいえ。Zushは、受け取りフォルダ、共有ドライブ、採用サイトからのダウンロード、スキャナー出力、移行バッチ、エクスポートをファイル名で整理するツールです。元の保存場所でリネームしますが、従業員記録の保管、権限管理、採用管理、給与計算、保存期間の強制、案件管理は行いません。"
        },
        {
          "question": "機密性の高い人事ファイルをアップロードせずに整理できますか？",
          "answer": "はい。オフラインAIモードでは、MacまたはWindows上のローカルOllamaモデルで対応ファイルを解析するため、文書の内容は端末内に残ります。Zushは元の保存場所でファイルをリネームし、ファイル自体を保管しません。"
        },
        {
          "question": "従業員書類にはどのような名前を付けるべきですか？",
          "answer": "実際のパターンは、EmployeeID – YYYY-MM-DD – DocumentType – PeriodOrStatus です。候補ファイルの場合は、「Candidate」-「Role」-「DocumentType」-「Status」を使用します。正確なフィールドは、組織のアクセス、プライバシー、および保持ポリシーに従う必要があります。"
        },
        {
          "question": "従業員IDと発効日を抽出できますか？",
          "answer": "はい。従業員 ID、発効日、レビュー期間、役割、部門、またはその他の組織固有のフィールドと必要な形式を記述する カスタムAIブロック を追加します。"
        },
        {
          "question": "スキャンした入社手続き書類も整理できますか？",
          "answer": "はい。 Zush は、別の OCR ステップを必要とせずに、AI ビジョンを使用して画像のみの PDF や写真付きドキュメントを読み取ることができます。フォルダ監視では、オンボーディング ドキュメントが到着する承認された場所を監視できます。"
        },
        {
          "question": "候補者記録と従業員記録で別の命名ルールを使えますか？",
          "answer": "はい。候補者の受け入れ、入社手続き、人事異動、評価書類、退職手続きごとにテンプレートを分け、それぞれに必要な項目だけを抽出できます。"
        }
      ]
    },
    "guides": {
      "title": "人事文書整理ガイド",
      "description": "従業員、候補者、およびオンボーディング文書の命名規則と受け入れワークフロー。",
      "slugs": [
        "hr-employee-file-naming-convention",
        "organize-employee-onboarding-documents",
        "organize-candidate-files-recruiting"
      ]
    },
    "finalCta": {
      "title": "まずはコピーした人事フォルダ1つをZushで整理",
      "subtitle": "採用サイトからのダウンロード、入社手続き書類、エクスポートした従業員記録で候補を確認し、命名ルールを調整してください。必要ならバッチを元に戻してやり直せます。"
    }
  },
  "real-estate": {
    "path": "/for-real-estate",
    "seo": {
      "title": "AIファイルリネームで不動産書類を整理",
      "description": "Zushは売買契約書、開示書類、検査報告書、鑑定書、権原関係書類、物件写真を読み取り、一貫したファイル名を提案します。MacやWindows上の既存の取引管理システム、フォルダ、共有ドライブをそのまま利用できます。"
    },
    "pageTitle": "不動産文書管理",
    "hero": {
      "eyebrow": "不動産業者および取引チーム向け",
      "titleLead": "不動産ファイルを",
      "titleAccent": "住所・日付・文書種別でリネーム",
      "subtitle": "Zushは売買契約書、開示書類、検査報告書、鑑定書、権原関係書類、物件写真を読み取り、一貫したファイル名を提案します。MacやWindows上の既存の取引管理システム、フォルダ、共有ドライブをそのまま利用できます。",
      "trustLine": [
        "既存の取引管理システムと併用",
        "機密ファイル向けのオフラインAI",
        "すべてのバッチを確認・取り消し可能"
      ],
      "photoAlt": "明るいオフィスで 2 人の購入希望者に住宅計画を示す不動産業者",
      "downloadMac": "Mac版をダウンロード",
      "downloadWindows": "Windows版をダウンロード",
      "trustAria": "不動産文書管理チームが Zush を使用する理由"
    },
    "demoLabel": "Zush 不動産取引書類を物件住所ごとに整理",
    "audiences": {
      "eyebrow": "不動産ファイルの整理",
      "title": "オファーからアーカイブまで、すべての物件ファイルを見分けやすく",
      "description": "Zushは既存の仲介業務ツールを置き換えず、取引書類や物件メディアに住所を軸とした一貫した名前を付けます。",
      "items": [
        {
          "title": "進行中の取引を管理するエージェント",
          "description": "DocuSignからのダウンロード、開示書類、検査報告書、金融機関からの依頼、決済書類を、メール、ダウンロードフォルダ、共有フォルダ、取引プラットフォームのどこでも見分けられるようにします。",
          "imageAlt": "アクティブな取引を管理するエージェント: DocuSign のダウンロード、開示、検査報告書、貸し手リクエスト、決算書類を電子メール、ダウンロード、共有フォルダ、取引プラットフォーム全体で識別できるようにします。"
        },
        {
          "title": "取引コーディネーターと仲介業務チーム",
          "description": "コンプライアンス資料の作成、照会への対応、完了した取引のアーカイブ前に、チーム全体で住所ベースの命名ルールを適用します。",
          "imageAlt": "トランザクション コーディネーターとブローカーの操作: コンプライアンス ファイルを組み立てたり、リクエストに応答したり、終了したトランザクションをアーカイブしたりする前に、チーム全体に 1 つのアドレスベースの規則を適用します。"
        },
        {
          "title": "書類とメディアを扱う物件掲載チーム",
          "description": "物件写真、間取り図、開示書類、掲載資料、マーケティング用の書き出しを、1つのアプリへ無理に集約せず、正しい住所と関連付けて保管できます。",
          "imageAlt": "書類やメディアを扱うリスティングチーム: 物件の写真、間取り図、開示情報、パッケージのリスティング、マーケティング輸出などを、無理に 1 つのアプリケーションにまとめることなく、適切な住所に関連付けて保管します。"
        }
      ]
    },
    "fields": {
      "title": "物件ファイルの命名項目",
      "description": "取引フォルダを検索しやすい物件記録へ整えます。",
      "instruction": "フィールドをタップして結果を確認します",
      "ariaLabel": "不動産フィールド Zush の読み取り",
      "hint": "提案されたファイル名",
      "items": [
        {
          "label": "物件の住所",
          "before": "DocuSign_892347234.pdf",
          "after": "742 エバーグリーン テラス - 購入契約 - 締結"
        },
        {
          "label": "文書の日付",
          "before": "download (8).pdf",
          "after": "742 エバーグリーンテラス - 2026-06-08 - 検査報告書",
          "emphasis": "2026-06-08"
        },
        {
          "label": "文書の種類",
          "before": "Document (4).pdf",
          "after": "742 エバーグリーンテラス - タイトルコミットメント - 2026-06-05"
        },
        {
          "label": "買い手/売り手",
          "before": "signed_final.pdf",
          "after": "742 エバーグリーン テラス - ジョンソンからスミスへ - 購入契約",
          "emphasis": "ジョンソンからスミスへ"
        },
        {
          "label": "トランザクションID",
          "before": "attachment.pdf",
          "after": "TX-2026-0184 - 742 エバーグリーン テラス - 開示",
          "emphasis": "TX-2026-0184"
        },
        {
          "label": "ステータス",
          "before": "contract_v3.pdf",
          "after": "742 エバーグリーン テラス - 購入契約 - 締結"
        },
        {
          "label": "締切日",
          "before": "closing.pdf",
          "after": "742 エバーグリーンテラス - 最終開示 - 2026-07-02",
          "emphasis": "2026-07-02"
        },
        {
          "label": "代理店・仲介",
          "before": "listing_docs.zip",
          "after": "88 ハーバー レーン - リスティング パッケージ - J. チェン"
        },
        {
          "label": "出品番号",
          "before": "property.pdf",
          "after": "MLS-884201 - 88 ハーバー レーン - 販売者の開示",
          "emphasis": "MLS-884201"
        },
        {
          "label": "写真の被写体",
          "before": "IMG_4821.jpg",
          "after": "88 ハーバーレーン - キッチン - ワイド - 01",
          "emphasis": "キッチン"
        },
        {
          "label": "カスタム項目（抽出したい情報を自由に指定）",
          "before": "scan_0042.pdf",
          "after": "742 エバーグリーン テラス - HOA 文書 - 2026",
          "emphasis": "HOA 文書"
        }
      ]
    },
    "privacy": {
      "eyebrow": "取引ファイルの処理",
      "title": "機密性に合わせて取引書類の処理方法を選択",
      "description": "ファイルの機密性や社内方針に応じて、ローカル処理、仲介会社が承認したAIプロバイダー、ZushのマネージドAIから選べます。元の書類は既存のフォルダに残ります。",
      "items": [
        {
          "title": "ローカルモデルを使用したオフライン AI",
          "description": "対応する取引書類や物件メディアを、保存先のMacまたはWindows PC上にあるローカルOllamaモデルで解析します。ファイルの内容はZushや外部のAIプロバイダーには送信されません。",
          "badge": "ファイルは端末内に残ります",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "仲介会社のAIアカウントを利用",
          "description": "仲介会社が承認したAIプロバイダーのアカウントとモデルを接続します。APIキーは端末内の安全な領域に保存され、選択したファイルだけがプロバイダーで処理されます。",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "マネージド AI から始める",
          "description": "迅速な評価や機密性の低いリスト資料には、Zush が管理する AI を使用します。トランザクションに別の処理ポリシーが必要な場合は、オフライン AI または BYOK を選択します。",
          "badge": "最速のセットアップ",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zushは取引ファイルの保管システムにはなりません。ファイルは元の保存場所でリネームされ、Zushが保管することはありません。権限管理、保存期間、コンプライアンス用チェックリスト、連絡履歴は、仲介会社が現在利用しているシステムに残ります。",
      "docsLinkLabel": "モードがデータをどのように処理するかを読む"
    },
    "workflow": {
      "eyebrow": "ワークフロー",
      "title": "既存の取引フローに一貫したファイル命名ルールを追加",
      "description": "メール、電子署名サービスからのダウンロード、スキャナー、物件訪問、共有フォルダ、取引管理システムの間をつなぐ命名レイヤーとしてZushを使えます。",
      "items": [
        {
          "title": "物件ファイルの命名ルールを定義",
          "description": "物件住所、取引ID、文書日付、文書種別、当事者、ステータス、決済日、仲介会社独自の項目からテンプレートを作成します。"
        },
        {
          "title": "取引書類の受け取り時に実行",
          "description": "DocuSignからのダウンロード、メール添付、スキャナー出力、検査報告書、権原関係書類、物件写真、成約済み取引のアーカイブを、別のプラットフォームへ移さず整理します。"
        },
        {
          "title": "物件が分かるファイル名を確認して適用",
          "description": "バッチを確認し、例外を修正してから適用します。リネーム履歴から取り消すこともでき、次の取引でも監視対象の受け取りフォルダに同じルールを使えます。"
        }
      ],
      "links": [
        {
          "label": "不動産書類の命名ルールを作成する",
          "href": "/blog/real-estate-document-naming-convention"
        },
        {
          "label": "取引フォルダ全体を整理する",
          "href": "/blog/how-to-organize-real-estate-transaction-files"
        },
        {
          "label": "DocuSignのダウンロードを物件住所でリネームする",
          "href": "/blog/rename-docusign-files-by-property-address"
        }
      ]
    },
    "documents": {
      "eyebrow": "対応している取引ファイル",
      "title": "不動産取引に関するファイルを1つの仕組みで整理",
      "description": "すべてのワークフローで住所表記を統一しながら、購入、売却、賃貸、決済書類、物件メディアごとに別のテンプレートを使えます。",
      "items": [
        {
          "title": "購入契約書と付録",
          "description": "提案、反対意見、修正案、締結された契約書を、資産、当事者、ステータス、文書の日付ごとに名前付けします。",
          "example": "742 エバーグリーン テラス - 購入契約書 - 締結済み - 2026-06-12.pdf"
        },
        {
          "title": "点検と修理",
          "description": "住宅検査、専門家の報告書、修理見積もり、領収書を正しい住所に添付して保管してください。",
          "example": "742 エバーグリーンテラス - 検査報告書 - 2026-06-08.pdf"
        },
        {
          "title": "タイトル、エスクロー、クロージング",
          "description": "ポータルから付く元の名前に頼らず、権原保険の確約書、決済明細書、クロージング開示書、送金指示、登記済み書類を整理します。",
          "example": "742 エバーグリーン テラス - 最終開示 - 2026-07-02.pdf"
        },
        {
          "title": "評価と貸し手の書類",
          "description": "評価報告書、貸し手リクエスト、承認書、裏付け書類を物件と日付ごとに名前を付けます。",
          "example": "742 エバーグリーンテラス - 鑑定書 - 2026-06-18.pdf"
        },
        {
          "title": "開示とHOAファイル",
          "description": "販売者の開示情報、鉛ベースの塗料フォーム、HOA パッケージ、保険記録、およびローカル フォームを 1 つのトランザクション フォルダで区別します。",
          "example": "88 ハーバー レーン - 販売者の開示 - 署名済み - 2026-05-27.pdf"
        },
        {
          "title": "リストおよび検査写真",
          "description": "同じ物件の住所を物件写真、部屋の詳細、検査画像、マーケティング エクスポートに適用して、メディアがトランザクションのコンテキストに留まるようにします。",
          "example": "88 ハーバー レーン - キッチン - ワイド - 01.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "組織の成果",
      "title": "物件ファイルに分かりやすい名前を付ける効果",
      "description": "ポータルの外へ出しても、取引完了後に見返しても内容が分かる取引フォルダを作れます。",
      "items": [
        {
          "title": "住所で検索して取引書類を確認",
          "description": "すべてのファイル名に物件住所を統一して入れることで、契約書、報告書、開示書類、写真を開かずに見つけられます。"
        },
        {
          "title": "推測せずに最終書類一式をそろえる",
          "description": "文書種別、日付、当事者、ステータスが分かるため、フォルダ一覧をポータルIDや同名ダウンロードの山ではなく、実用的なチェックリストとして使えます。"
        },
        {
          "title": "取引成立後もコンテキストを維持する",
          "description": "自己記述型ファイル名は、電子メールの添付ファイル、仲介アーカイブ、ローカル バックアップ、共有ドライブ、トランザクション システムからのエクスポートなどで引き続き役立ちます。"
        }
      ]
    },
    "faq": {
      "title": "不動産書類の整理に関するよくある質問",
      "description": "取引管理システム、DocuSignからのダウンロード、決済書類、物件写真、機密ファイル、プレビュー、取り消しについて説明します。",
      "items": [
        {
          "question": "不動産文書管理とは何ですか？",
          "answer": "不動産文書管理とは、取引の最初から最後まで、契約書、開示書類、検査、権原関係書類、金融機関の書類、決済記録、物件メディアを見分けられる状態に保つことです。Zushは各ファイルを読み取り、物件住所を軸とした一貫した命名ルールを適用します。"
        },
        {
          "question": "Zushは不動産取引管理システムの代わりになりますか？",
          "answer": "いいえ。Zushは、DocuSignからのダウンロード、メール添付、スキャナー出力、検査報告書、物件写真、エクスポート、アーカイブなど、取引管理システム周辺のファイルをリネームします。期限、署名、コンプライアンス用チェックリスト、連絡、権限、取引記録は管理しません。"
        },
        {
          "question": "DocuSignのファイルを物件住所でリネームできますか？",
          "answer": "はい。テンプレートで、DocuSignのPDFから物件住所、文書種別、締結日、当事者、取引ID、ステータスを抽出し、「742 Evergreen Terrace - Purchase Contract - Executed - 2026-06-12.pdf」のようなファイル名を提案できます。"
        },
        {
          "question": "決済書類を自動で整理できますか？",
          "answer": "Zush は、権原コミットメント、評価報告書、決算開示情報、決済明細書、貸し手文書、記録ファイルの名前をレビュー済みバッチとして変更できます。フォルダ監視では、新しいトランザクション文書が到着する場所を監視することもできます。"
        },
        {
          "question": "PDFだけでなく物件写真もリネームできますか？",
          "answer": "はい。対応する物件写真を、住所、部屋、眺望、ショット種別など、テンプレートで指定した項目を使ってリネームできます。取引書類と異なるファイル名にしたい場合は、物件メディア用に別のテンプレートを作成してください。"
        },
        {
          "question": "Zushはファイルを物件フォルダへ移動しますか？",
          "answer": "いいえ。Zushは元の保存場所でファイルをリネームし、既存のフォルダ構成は変更しません。仲介会社が現在使っている取引フォルダ、共有ドライブ、Dropbox、OneDrive、ローカルアーカイブに命名機能だけを追加できます。"
        },
        {
          "question": "取引ファイルをアップロードせずに処理できますか？",
          "answer": "はい。オフラインAIモードでは、MacまたはWindows上のローカルOllamaモデルで対応ファイルを解析するため、書類の内容は端末内に残ります。仲介会社が承認したプロバイダーアカウントを使いたい場合はBYOKも利用できます。"
        },
        {
          "question": "スキャンした不動産書類も使えますか？",
          "answer": "はい。 AI ビジョンは、別の OCR パスを必要とせずに、画像のみの PDF とサポートされている画像を読み取ることができます。これには、オフィス スキャナーの出力、写真撮影された書類、古い決算ファイル、スキャンとして返された署名付き文書が含まれます。"
        },
        {
          "question": "複数のエージェントでファイル名を統一できますか？",
          "answer": "はい。購入取引、物件掲載、賃貸、決済書類、物件メディア用に再利用できるテンプレートを作成できます。各エージェントやコーディネーターが同じ項目順を適用し、リネーム前に候補をプレビューできます。"
        }
      ]
    },
    "guides": {
      "title": "不動産取引ファイルガイド",
      "description": "命名ルール、取引フォルダの構成、電子署名サービスからダウンロードしたファイルの自動整理を紹介します。",
      "slugs": [
        "real-estate-document-naming-convention",
        "how-to-organize-real-estate-transaction-files",
        "rename-docusign-files-by-property-address"
      ]
    },
    "finalCta": {
      "title": "まずはコピーした取引フォルダ1つでZushを試す",
      "subtitle": "DocuSignからのダウンロード、検査報告書、開示書類、決済書類の小さなバッチで候補を確認し、テンプレートを調整してください。必要ならバッチを元に戻してやり直せます。"
    }
  }
} satisfies ProfessionLocaleCopy;
