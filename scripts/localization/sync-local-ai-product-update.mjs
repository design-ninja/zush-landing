#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_ROOT = join(process.cwd(), 'src/content/blog');
const TARGETS = new Set([
  'best-ai-file-renamer-tools-2026',
  'best-ai-file-renamer-tools-mac-compared',
  'best-ai-file-renamer-tools-windows-compared',
  'zush-vs-renameclick',
  'best-ai-file-organizers-mac',
]);

const updates = {
  ar: '**تحديث منتج Zush — 24 أغسطس 2026:** توفر تطبيقات Zush الحالية على Mac وWindows خمسة أوضاع للذكاء الاصطناعي ضمن سير عمل واحد: Zush Cloud AI وBYOK عبر الإنترنت، وBuilt-in Local AI وLM Studio وOllama محليًا. تُشارك حصة FREE البالغة 50 عملية إعادة تسمية بين الأوضاع الخمسة، وتزيل خطط PRO المدفوعة حد Zush في جميعها. إذا وصف سطر أو جدول أقدم أدناه Zush بأنه يعتمد على Ollama فقط، فهذا التحديث يحل محله. تحتفظ ادعاءات المنافسين بتواريخ التحقق المنفصلة المذكورة لها.',
  de: '**Zush-Produktupdate — 24. August 2026:** Die aktuellen Zush-Apps für Mac und Windows bieten fünf KI-Modi in einem Workflow: Zush Cloud AI und BYOK online sowie Built-in Local AI, LM Studio und Ollama lokal. Das FREE-Kontingent von 50 Umbenennungen gilt gemeinsam für alle fünf Modi; bezahltes PRO entfernt das Zush-Limit in allen fünf. Falls eine ältere Zeile oder Tabelle unten Zush als Ollama-only beschreibt, ersetzt dieses Update diese Angabe. Aussagen zu Wettbewerbern behalten ihre jeweils separat genannten Prüfdaten.',
  es: '**Actualización del producto Zush — 24 de agosto de 2026:** Las aplicaciones actuales de Zush para Mac y Windows ofrecen cinco modos de IA en el mismo flujo de trabajo: Zush Cloud AI y BYOK en línea, y Built-in Local AI, LM Studio y Ollama en local. El cupo FREE de 50 cambios de nombre se comparte entre los cinco modos; PRO elimina el límite de Zush en todos ellos. Si una línea o tabla anterior describe Zush como limitado a Ollama, esta actualización sustituye esa información. Las afirmaciones sobre competidores conservan sus fechas de verificación indicadas por separado.',
  fr: '**Mise à jour du produit Zush — 24 août 2026 :** Les applications Zush actuelles pour Mac et Windows proposent cinq modes d’IA dans le même flux de travail : Zush Cloud AI et BYOK en ligne, puis Built-in Local AI, LM Studio et Ollama en local. Le quota FREE de 50 renommages est partagé entre les cinq modes ; PRO supprime la limite Zush dans les cinq. Si une ligne ou un tableau plus ancien ci-dessous présente Zush comme limité à Ollama, cette mise à jour le remplace. Les affirmations sur les concurrents conservent leurs dates de vérification indiquées séparément.',
  it: '**Aggiornamento del prodotto Zush — 24 agosto 2026:** Le app Zush attuali per Mac e Windows offrono cinque modalità AI nello stesso flusso di lavoro: Zush Cloud AI e BYOK online, più Built-in Local AI, LM Studio e Ollama in locale. Il limite FREE di 50 rinomine è condiviso tra tutte e cinque le modalità; PRO rimuove il limite Zush in tutte e cinque. Se una riga o tabella precedente descrive Zush come limitato a Ollama, questo aggiornamento sostituisce tale informazione. Le affermazioni sui concorrenti mantengono le date di verifica indicate separatamente.',
  ja: '**Zush 製品アップデート — 2026 年 8 月 24 日:** 現在の Mac 版と Windows 版 Zush では、同じワークフローで 5 つの AI モードを利用できます。オンラインは Zush Cloud AI と BYOK、ローカルは Built-in Local AI、LM Studio、Ollama です。FREE の 50 回の名前変更枠は 5 モードで共有され、PRO では全 5 モードの Zush 側の上限がなくなります。以下の古い文章や表に Zush が Ollama のみに対応するとある場合は、この更新が優先されます。競合製品の記述には、それぞれ個別に記載された確認日が適用されます。',
  ko: '**Zush 제품 업데이트 — 2026년 8월 24일:** 현재 Mac 및 Windows용 Zush는 하나의 워크플로에서 다섯 가지 AI 모드를 제공합니다. 온라인 모드는 Zush Cloud AI와 BYOK이며, 로컬 모드는 Built-in Local AI, LM Studio, Ollama입니다. FREE의 파일명 변경 50회 한도는 다섯 모드가 공유하고, 유료 PRO는 다섯 모드 모두에서 Zush 한도를 제거합니다. 아래의 이전 문장이나 표가 Zush를 Ollama 전용으로 설명한다면 이 업데이트가 우선합니다. 경쟁사 관련 주장은 별도로 표시된 각 검증 날짜를 유지합니다.',
  nl: '**Zush-productupdate — 24 augustus 2026:** De huidige Zush-apps voor Mac en Windows bieden vijf AI-modi in één workflow: Zush Cloud AI en BYOK online, plus Built-in Local AI, LM Studio en Ollama lokaal. De FREE-limiet van 50 hernoemingen wordt gedeeld door alle vijf modi; betaald PRO verwijdert de Zush-limiet in alle vijf. Als een oudere regel of tabel hieronder Zush als alleen-Ollama beschrijft, vervangt deze update die informatie. Claims over concurrenten behouden hun afzonderlijk vermelde controledatums.',
  'pt-br': '**Atualização do produto Zush — 24 de agosto de 2026:** Os aplicativos Zush atuais para Mac e Windows oferecem cinco modos de IA no mesmo fluxo de trabalho: Zush Cloud AI e BYOK on-line, além de Built-in Local AI, LM Studio e Ollama localmente. A cota FREE de 50 renomeações é compartilhada entre os cinco modos; o PRO pago remove o limite do Zush em todos eles. Se uma linha ou tabela anterior abaixo descrever o Zush como limitado ao Ollama, esta atualização substitui essa informação. As alegações sobre concorrentes mantêm as datas de verificação indicadas separadamente.',
  tr: '**Zush ürün güncellemesi — 24 Ağustos 2026:** Güncel Mac ve Windows Zush uygulamaları tek iş akışında beş yapay zekâ modu sunar: çevrimiçi Zush Cloud AI ve BYOK ile yerel Built-in Local AI, LM Studio ve Ollama. FREE planındaki 50 yeniden adlandırma hakkı beş mod arasında paylaşılır; ücretli PRO, beş modun tamamında Zush sınırını kaldırır. Aşağıdaki eski bir satır veya tablo Zush’ı yalnızca Ollama ile sınırlı gösteriyorsa bu güncelleme onun yerini alır. Rakiplerle ilgili iddialar, ayrı ayrı belirtilen doğrulama tarihlerini korur.',
  'zh-cn': '**Zush 产品更新 — 2026 年 8 月 24 日：** 当前 Mac 和 Windows 版 Zush 在同一工作流程中提供五种 AI 模式：在线的 Zush Cloud AI 和 BYOK，以及本地的 Built-in Local AI、LM Studio 和 Ollama。FREE 的 50 次重命名额度由五种模式共享；付费 PRO 会移除全部五种模式中的 Zush 限制。如果下方较早的文字或表格将 Zush 描述为仅支持 Ollama，请以本更新为准。竞争对手相关说明仍采用各自单独标注的核验日期。',
};

let changed = 0;

for (const [locale, update] of Object.entries(updates)) {
  const localeDir = join(BLOG_ROOT, locale);
  for (const name of readdirSync(localeDir)) {
    if (!name.endsWith('.mdx')) continue;
    const path = join(localeDir, name);
    let source = readFileSync(path, 'utf8');
    const translation = source.match(/^translationOf:\s*"([^"]+)"/m)?.[1];
    if (!translation || !TARGETS.has(translation)) continue;

    source = source.replace(/^reviewed:\s*"[^"]+"/m, 'reviewed: "2026-08-24"');
    if (!source.includes('Built-in Local AI') || !source.includes(update)) {
      const imports = [...source.matchAll(/^import .*;\s*$/gm)];
      if (!imports.length) throw new Error(`No MDX imports found in ${path}`);
      const lastImport = imports.at(-1);
      const insertAt = lastImport.index + lastImport[0].length;
      source = `${source.slice(0, insertAt)}\n\n${update}${source.slice(insertAt)}`;
    }
    writeFileSync(path, source);
    changed += 1;
  }
}

console.log(`[sync-local-ai-product-update] Updated ${changed} localized comparison files.`);
