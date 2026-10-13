# Baseline перед сменой позиционирования главной на «AI File Renamer & Organizer»

Снято 13 октября 2026, до публикации изменений. Окно: 15 сентября — 12 октября 2026 (28 полных дней). GSC: Web, все страны и устройства, ресурс `sc-domain:zushapp.com`. PostHog: проект 455666, Web analytics.

Сравнивать через 4–6 недель после деплоя на таком же 28-дневном окне.

## GSC: весь сайт

| Метрика | Значение |
|---|---:|
| Клики | 1 360 |
| Показы | 88 100 |
| CTR | 1,5 % |
| Средняя позиция | 7,2 |

## GSC: три целевые страницы

| URL | Клики | Показы | CTR | Позиция |
|---|---:|---:|---:|---:|
| `/` всего | 203 | 2 554 | 7,9 % | 3,0 |
| `/` без запросов с «zush» | 2 | 109 | 1,8 % | 4,9 |
| `/ai-file-organizer` | 4 | 353 | 1,1 % | 10,7 |
| `/ai-file-sorter` | 10 | 237 | 4,2 % | 7,0 |

## GSC: фиксированный набор запросов (точное совпадение)

| Запрос | Клики | Показы | Позиция | Какие URL показываются (показы, позиция) |
|---|---:|---:|---:|---|
| zush | 161 | 1 270 | 2,2 | `/` 1 192 / 2,2 (119 кликов); `/fr`, `/de` по ~210 / 1,9 |
| zush app | 13 | 25 | 1,3 | `/` 18 / 1,2 (7 кликов); `/es` 7 / 2,0 |
| ai file renamer | 0 | 57 | 6,7 | `/blog/best-ai-file-renamer-tools-windows-compared` 54 / 6,9; `/` 3 / 4,3 |
| ai file renamer mac | 0 | 8 | 4,1 | `/mac` 5 / 2,6; `/blog/best-ai-file-renamer-tools-mac-compared` 4 / 7,8 |
| ai file organizer | 0 | 85 | 26,9 | `/blog/best-ai-file-organizers-windows` 64 / 25,7; `/ai-file-organizer` 12 / 37,1; `/blog/best-ai-file-organizers-mac` 9 / 22,2 |
| ai file organizer mac | 0 | 62 | 10,1 | `/blog/best-ai-file-organizers-mac` 60 / 9,7; `/ai-file-sorter` 1 / 17 |
| ai file organizer for windows | 0 | 50 | 16,5 | `/blog/best-ai-file-organizers-windows` 50 / 16,5 |
| best ai file organizer | 0 | 81 | 14,3 | `/blog/best-ai-file-organizers-mac` 52 / 14,4; `…-windows` 26 / 14,7; `/ai-file-organizer` 2 / 31 |
| ai file sorter | 0 | 9 | 20,6 | `/blog/best-ai-file-sorters` 6 / 24; `/ai-file-organizer` 1 / 47 |
| ai file sorter mac | 1 | 22 | 4,3 | `/blog/best-ai-file-organizers-mac` 14 / 5,1; `/ai-file-sorter` 7 / 2,3; `/ai-file-organizer` 2 / 1,5 |
| sort files into folders ai | — | — | — | не снято (браузер отключился) |
| auto sort files into folders | — | — | — | не снято (браузер отключился) |

Наблюдение: по всем organizer-запросам Google показывает обзоры блога, а не `/ai-file-organizer` (позиции 31–47). Цель изменений — чтобы продуктовая страница вытеснила обзор хотя бы по двум запросам и вошла в топ-10.

## PostHog: поисковые входные сессии и download_click

Фильтр: session `$channel_type = Organic Search`, разбивка по `InitialPage`, цель `download_click` (уникальные конверсии на посетителя). Это не тот же расчёт, что в аудите (там сессии по `$session_id`), поэтому сравнивать нужно с этой же таблицей, тем же запросом.

| Входная страница | Посетители | С download_click | Доля |
|---|---:|---:|---:|
| `/` | 318 | 135 | 42,5 % |
| `/ai-file-organizer` | 7 | 4 | 57 % |
| `/ai-file-sorter` | 12 | 4 | 33 % |
| `/blog/best-ai-file-organizers-mac` | 68 | 15 | 22,1 % |
| `/blog/best-ai-file-organizers-windows` | 51 | 12 | 23,5 % |
| `/blog/best-ai-file-sorters` | 39 | 11 | 28,2 % |
| `/blog/automate-file-organization-macos` | < 6 | — | — |

Выборки по продуктовым страницам слишком малы для выводов о конверсии; важна динамика числа входов.

## Контрольные метрики

- Брендовые клики `zush` + `zush app` на `/`: 126. Если через 4 недели падение > 15 % при стабильных показах — откатить title/H1 главной.
- Доля download_click у поисковых входов на `/`: 42,5 %. Не должна упасть больше чем на 3 п. п.

## Изменения, которые вносятся после этого baseline

См. `marketing/positioning-renamer-organizer-implementation-brief-2026-10-13.md` (локальный бриф) и коммиты от 13.10.2026 с префиксом `seo(positioning)`.
