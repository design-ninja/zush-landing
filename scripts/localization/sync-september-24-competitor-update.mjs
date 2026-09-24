#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_ROOT = join(process.cwd(), 'src/content/blog');
const RENAMECLICK_TARGETS = new Set([
  'best-ai-file-renamer-tools-2026',
  'best-ai-file-renamer-tools-mac-compared',
  'best-ai-file-renamer-tools-windows-compared',
  'zush-vs-renameclick',
]);
const ORGANIZER_TARGET = 'best-ai-file-organizers-mac';
const FINDER_TARGET = 'finder-tags-guide-organize-files-mac';

const renameClickUpdates = {
  ar: '**تحديث المنافسين — 24 سبتمبر 2026:** تعرض RenameClick حاليًا 100 عملية إعادة تسمية أو نقل ناجحة شهريًا في الخطة المجانية، واشتراك Pro شهريًا بسعر 8 دولارات + ضريبة القيمة المضافة، وترخيصًا مدى الحياة بسعر 36 دولارًا + ضريبة القيمة المضافة. تحقّق من السعر النهائي عند الدفع. في NameQuick، تشمل التجربة المُدارة 250 إعادة تسمية خلال 14 يومًا، بينما تشمل تجربة Self-Managed ‏50 إعادة تسمية من دون بطاقة.',
  de: '**Wettbewerber-Update — 24. September 2026:** RenameClick nennt aktuell 100 erfolgreiche Umbenennungen oder Verschiebungen pro Monat im Gratis-Tarif, Pro Monthly für 8 $ zzgl. MwSt. und Pro Lifetime für 36 $ zzgl. MwSt.; prüfen Sie den Checkout. Bei NameQuick umfasst der Managed-Test 250 Umbenennungen in 14 Tagen, der Self-Managed-Test 50 Umbenennungen ohne Kreditkarte.',
  es: '**Actualización de competidores — 24 de septiembre de 2026:** RenameClick anuncia actualmente 100 cambios de nombre o movimientos correctos al mes en el plan gratuito, Pro mensual por 8 USD + IVA y Pro de por vida por 36 USD + IVA; confirme el precio en el pago. La prueba Managed de NameQuick incluye 250 cambios en 14 días y la prueba Self-Managed, 50 sin tarjeta.',
  fr: '**Mise à jour concurrents — 24 septembre 2026 :** RenameClick affiche actuellement 100 renommages ou déplacements réussis par mois avec l’offre gratuite, Pro mensuel à 8 $ HT et Pro à vie à 36 $ HT ; vérifiez le paiement. L’essai Managed de NameQuick comprend 250 renommages sur 14 jours, et l’essai Self-Managed 50 renommages sans carte.',
  it: '**Aggiornamento concorrenti — 24 settembre 2026:** RenameClick indica attualmente 100 rinomine o spostamenti riusciti al mese nel piano gratuito, Pro mensile a 8 $ + IVA e Pro a vita a 36 $ + IVA; verifica il checkout. La prova Managed di NameQuick include 250 rinomine in 14 giorni, mentre la prova Self-Managed ne include 50 senza carta.',
  ja: '**競合情報の更新 — 2026年9月24日:** RenameClick の無料プランは現在、月100回の正常な名前変更または移動、Pro Monthly は8ドル＋VAT、Pro Lifetime は36ドル＋VATと案内されています。購入時に最新価格を確認してください。NameQuick は Managed が14日間250回、Self-Managed がカード不要で50回の試用です。',
  ko: '**경쟁사 정보 업데이트 — 2026년 9월 24일:** RenameClick은 현재 무료 요금제에서 월 100회의 성공한 이름 변경 또는 이동, Pro Monthly는 8달러+VAT, Pro Lifetime은 36달러+VAT로 안내합니다. 결제 화면에서 최신 가격을 확인하세요. NameQuick 체험은 Managed가 14일간 250회, Self-Managed가 카드 없이 50회입니다.',
  nl: '**Concurrentie-update — 24 september 2026:** RenameClick vermeldt momenteel 100 geslaagde hernoemingen of verplaatsingen per maand in het gratis abonnement, Pro Monthly voor $ 8 + btw en Pro Lifetime voor $ 36 + btw; controleer de checkout. De Managed-proef van NameQuick bevat 250 hernoemingen in 14 dagen en de Self-Managed-proef 50 zonder kaart.',
  'pt-br': '**Atualização de concorrentes — 24 de setembro de 2026:** a RenameClick informa atualmente 100 renomeações ou movimentações concluídas por mês no plano gratuito, Pro mensal por US$ 8 + IVA e Pro vitalício por US$ 36 + IVA; confirme no checkout. O teste Managed da NameQuick inclui 250 renomeações em 14 dias, e o Self-Managed inclui 50 sem cartão.',
  tr: '**Rakip güncellemesi — 24 Eylül 2026:** RenameClick şu anda ücretsiz planda ayda 100 başarılı yeniden adlandırma veya taşıma, aylık Pro için 8 ABD doları + KDV ve ömür boyu Pro için 36 ABD doları + KDV listeliyor; ödeme sayfasını doğrulayın. NameQuick Managed denemesi 14 günde 250, Self-Managed denemesi ise kartsız 50 yeniden adlandırma içeriyor.',
  'zh-cn': '**竞品更新 — 2026 年 9 月 24 日：** RenameClick 目前的免费方案包含每月 100 次成功重命名或移动，Pro 月付为 8 美元加增值税，Pro 终身版为 36 美元加增值税；请以结账页为准。NameQuick 的 Managed 试用为 14 天 250 次重命名，Self-Managed 试用为无需信用卡的 50 次重命名。',
};

const organizerUpdates = {
  ar: '**تحديث ميزات المنافسين — 24 سبتمبر 2026:** أصبح Quick Organize من NameQuick متاحًا الآن. وتوثّق Files Magic AI ثلاثة محركات محلية لإعادة التسمية — Apple Intelligence والنموذج المدمج وRename LLM الاختياري — إضافة إلى إعادة تسمية الملفات الجديدة تلقائيًا في المجلدات المراقبة.',
  de: '**Wettbewerber-Funktionsupdate — 24. September 2026:** NameQuick Quick Organize ist jetzt verfügbar. Files Magic AI dokumentiert drei lokale Umbenennungs-Engines – Apple Intelligence, das integrierte Modell und ein optionales Rename LLM – sowie die automatische Umbenennung neuer Dateien in überwachten Ordnern.',
  es: '**Actualización de funciones de competidores — 24 de septiembre de 2026:** Quick Organize de NameQuick ya está disponible. Files Magic AI documenta tres motores locales de renombrado — Apple Intelligence, el modelo integrado y un Rename LLM opcional — además del renombrado automático de archivos nuevos en carpetas vigiladas.',
  fr: '**Mise à jour des fonctions concurrentes — 24 septembre 2026 :** Quick Organize de NameQuick est maintenant disponible. Files Magic AI documente trois moteurs locaux de renommage — Apple Intelligence, le modèle intégré et un Rename LLM facultatif — ainsi que le renommage automatique des nouveaux fichiers dans les dossiers surveillés.',
  it: '**Aggiornamento funzionalità concorrenti — 24 settembre 2026:** Quick Organize di NameQuick è ora disponibile. Files Magic AI documenta tre motori locali di rinomina — Apple Intelligence, il modello integrato e un Rename LLM opzionale — oltre alla rinomina automatica dei nuovi file nelle cartelle monitorate.',
  ja: '**競合機能の更新 — 2026年9月24日:** NameQuick の Quick Organize は現在利用できます。Files Magic AI は、Apple Intelligence、内蔵モデル、任意の Rename LLM という3つのローカル名前変更エンジンと、監視フォルダ内の新規ファイルの自動名前変更を案内しています。',
  ko: '**경쟁사 기능 업데이트 — 2026년 9월 24일:** NameQuick의 Quick Organize가 현재 제공됩니다. Files Magic AI는 Apple Intelligence, 내장 모델, 선택형 Rename LLM의 세 가지 로컬 이름 변경 엔진과 감시 폴더의 새 파일 자동 이름 변경을 안내합니다.',
  nl: '**Functie-update concurrenten — 24 september 2026:** NameQuick Quick Organize is nu beschikbaar. Files Magic AI documenteert drie lokale hernoem-engines — Apple Intelligence, het ingebouwde model en een optionele Rename LLM — plus automatisch hernoemen van nieuwe bestanden in bewaakte mappen.',
  'pt-br': '**Atualização de recursos de concorrentes — 24 de setembro de 2026:** o Quick Organize da NameQuick já está disponível. A Files Magic AI documenta três mecanismos locais de renomeação — Apple Intelligence, o modelo integrado e um Rename LLM opcional — além da renomeação automática de novos arquivos em pastas monitoradas.',
  tr: '**Rakip özellik güncellemesi — 24 Eylül 2026:** NameQuick Quick Organize artık kullanılabilir. Files Magic AI; Apple Intelligence, yerleşik model ve isteğe bağlı Rename LLM olmak üzere üç yerel yeniden adlandırma motorunu ve izlenen klasörlerdeki yeni dosyaları otomatik yeniden adlandırmayı belgeliyor.',
  'zh-cn': '**竞品功能更新 — 2026 年 9 月 24 日：** NameQuick 的 Quick Organize 现已上线。Files Magic AI 目前说明了三种本地重命名引擎——Apple Intelligence、内置模型和可选的 Rename LLM——以及对监控文件夹中新文件的自动重命名。',
};

function refreshRenameClickNumbers(source, translation) {
  return source
    .split('\n')
    .map((originalLine) => {
      let line = originalLine;
      const hasRenameClick = /renameclick|rename\.click/i.test(line);
      const hasLimitContext = /free|gratis|gratuit|kosten|credit|apply|applic|month|monat|mois|mese|mes|maand|mês|ayda|月|월|شهري/i.test(line);
      const sourceSpecificFreeRow =
        translation === 'best-ai-file-renamer-tools-2026'
          ? /^\|/.test(line) && /250\s*\/\s*14/.test(line)
          : translation === 'best-ai-file-renamer-tools-mac-compared'
            ? /^\|/.test(line) && /\b25\b/.test(line) && /\b10\b/.test(line) && /\b14\b/.test(line)
            : translation === 'zush-vs-renameclick'
              ? /^\|/.test(line) && /\b50\b/.test(line) && !/\b48\b/.test(line)
              : false;

      if (((hasRenameClick && hasLimitContext) || sourceSpecificFreeRow) && /\b30\b(?!\s*[+'])/.test(line)) {
        line = line.replace(/\b30\b(?!\s*[+'])/g, '100');
      }

      const occurrences = line.match(/\b48\b/g)?.length ?? 0;
      const explicitPriceLine = hasRenameClick && !/zush/i.test(line) && (/\b8\b/.test(line) || /^\|\s*["“„']?RenameClick/i.test(line));
      if (explicitPriceLine && occurrences > 0) {
        line = line.replace(/\b48\b/g, '36');
      } else if (
        translation === 'zush-vs-renameclick' &&
        /^\|/.test(line) &&
        (occurrences === 2 || (occurrences > 1 && /\b8\b/.test(line)))
      ) {
        const index = line.lastIndexOf('48');
        line = `${line.slice(0, index)}36${line.slice(index + 2)}`;
      }
      return line;
    })
    .join('\n');
}

function insertAfterImports(source, update) {
  if (source.includes(update)) return source;
  const imports = [...source.matchAll(/^import .*;\s*$/gm)];
  if (!imports.length) throw new Error('No MDX imports found');
  const lastImport = imports.at(-1);
  const insertAt = lastImport.index + lastImport[0].length;
  return `${source.slice(0, insertAt)}\n\n${update}${source.slice(insertAt)}`;
}

let changed = 0;

for (const locale of Object.keys(renameClickUpdates)) {
  const localeDir = join(BLOG_ROOT, locale);
  for (const name of readdirSync(localeDir)) {
    if (!name.endsWith('.mdx')) continue;
    const path = join(localeDir, name);
    const original = readFileSync(path, 'utf8');
    const translation = original.match(/^translationOf:\s*"([^"]+)"/m)?.[1];
    if (!translation) continue;
    if (!RENAMECLICK_TARGETS.has(translation) && translation !== ORGANIZER_TARGET && translation !== FINDER_TARGET) continue;

    let source = original.replace(/^reviewed:\s*"[^"]+"/m, 'reviewed: "2026-09-24"');
    if (RENAMECLICK_TARGETS.has(translation)) {
      source = refreshRenameClickNumbers(source, translation);
      source = insertAfterImports(source, renameClickUpdates[locale]);
    } else if (translation === ORGANIZER_TARGET) {
      source = insertAfterImports(source, organizerUpdates[locale]);
    }

    if (source !== original) {
      writeFileSync(path, source);
      changed += 1;
    }
  }
}

console.log(`[sync-september-24-competitor-update] Updated ${changed} localized blog files.`);
