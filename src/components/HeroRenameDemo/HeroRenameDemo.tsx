import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import JSZip from 'jszip';
import {
  ArrowRight,
  Check,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType2,
  Presentation,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import Button from '@/components/Button';
import DownloadButton from '@/components/DownloadButton';
import { SUPABASE_URL } from '@/utils/supabase';
import type { DownloadMenuCopy, RenameDemoCopy } from '@/i18n/copy';
import type { Locale } from '@/i18n/config';
import styles from './HeroRenameDemo.module.scss';

type ContentKind = 'image' | 'text' | 'document';
type DemoStatus = 'queued' | 'preparing' | 'analyzing' | 'done' | 'error';

interface PreviewPayloadFile {
  name: string;
  original_extension: string;
  mime_type: string;
  content_kind: ContentKind;
  image?: string;
  images?: string[];
  text?: string;
  image_mime_type?: string;
  preview_page_numbers?: number[];
  page_count?: number;
}

interface DemoFile {
  id: string;
  file: File;
  originalName: string;
  extension: string;
  contentKind: ContentKind | null;
  mimeType: string;
  status: DemoStatus;
  thumbnailDataUrl?: string;
  suggestedName?: string;
  error?: string;
}

interface PreviewResult {
  original_name: string;
  suggested_name: string | null;
  title: string | null;
  error: string | null;
}

interface PreviewResponse {
  results?: PreviewResult[];
  error?: string;
}

interface PreparedFile {
  id: string;
  payload: PreviewPayloadFile;
  thumbnailDataUrl?: string;
}

interface HeroRenameDemoProps {
  copy: RenameDemoCopy;
  downloadLabel: string;
  downloadMenu?: DownloadMenuCopy;
  locale?: Locale;
}

const MAX_FILES = 5;
const MAX_IMAGE_SOURCE_BYTES = 30 * 1024 * 1024;
const MAX_TEXT_SOURCE_BYTES = 25 * 1024 * 1024;
const MAX_PDF_SOURCE_BYTES = 250 * 1024 * 1024;
const MAX_OFFICE_SOURCE_BYTES = 250 * 1024 * 1024;
const MAX_TEXT_CHARS = 12_000;
const MAX_IMAGE_SIDE = 720;
const MAX_DOCUMENT_IMAGES = 3;

const IMAGE_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'webp',
  'gif',
  'bmp',
  'tif',
  'tiff',
  'svg',
]);
const TEXT_EXTENSIONS = new Set(['txt', 'md', 'json', 'eml', 'csv']);
const DOCUMENT_EXTENSIONS = new Set(['pdf', 'docx', 'pptx', 'xlsx']);

const SUPPORTED_CHIPS = [
  '.png',
  '.jpg',
  '.webp',
  '.svg',
  '.pdf',
  '.docx',
  '.xlsx',
  '.pptx',
  '.txt',
  '.csv',
];
const SPINNER_SEGMENTS = Array.from({ length: 12 }, (_, index) => index);

const extensionIconMap = {
  image: FileImage,
  text: FileText,
  pdf: FileType2,
  docx: FileText,
  pptx: Presentation,
  xlsx: FileSpreadsheet,
} as const;

function createFileId(file: File, index: number): string {
  return `${file.name}-${file.size}-${file.lastModified}-${index}`;
}

function getExtension(file: File): string {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  return extension.replace(/[^a-z0-9]/g, '');
}

function inferContentKind(extension: string): ContentKind | null {
  if (IMAGE_EXTENSIONS.has(extension)) return 'image';
  if (TEXT_EXTENSIONS.has(extension)) return 'text';
  if (DOCUMENT_EXTENSIONS.has(extension)) return 'document';
  return null;
}

function getMaxSourceBytes(item: DemoFile): number {
  if (item.contentKind === 'image') return MAX_IMAGE_SOURCE_BYTES;
  if (item.contentKind === 'text') return MAX_TEXT_SOURCE_BYTES;
  if (item.extension === 'pdf') return MAX_PDF_SOURCE_BYTES;
  return MAX_OFFICE_SOURCE_BYTES;
}

function formatCopy(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
    template,
  );
}

function dataUrlToBase64(dataUrl: string): string {
  return dataUrl.split(',')[1] ?? '';
}

function canvasToJpegDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/jpeg', 0.72);
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\0/g, '').replace(/\s+/g, ' ').trim();
}

function truncateText(value: string): string {
  return normalizeWhitespace(value).slice(0, MAX_TEXT_CHARS);
}

async function loadImageElement(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);

  try {
    const image = new Image();
    image.decoding = 'async';
    image.src = url;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Unable to decode image'));
    });

    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function imageBlobToJpegPreview(blob: Blob) {
  const image = await loadImageElement(blob);
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error('Unable to decode image dimensions');
  }

  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is not available');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  const dataUrl = canvasToJpegDataUrl(canvas);
  return {
    dataUrl,
    base64: dataUrlToBase64(dataUrl),
  };
}

async function prepareImageFile(file: File): Promise<PreparedFile['payload'] & { thumbnailDataUrl: string }> {
  if (file.size > MAX_IMAGE_SOURCE_BYTES) {
    throw new Error('source-too-large');
  }

  const preview = await imageBlobToJpegPreview(file);
  return {
    name: file.name,
    original_extension: getExtension(file),
    mime_type: file.type || 'application/octet-stream',
    content_kind: 'image',
    image: preview.base64,
    image_mime_type: 'image/jpeg',
    thumbnailDataUrl: preview.dataUrl,
  };
}

type XmlRoot = Document | Element;

function normalizeXmlTagName(tagName: string): string {
  return tagName.split(':').pop() ?? tagName;
}

function parseXmlDocument(xml: string): XMLDocument | null {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');

  if (doc.getElementsByTagName('parsererror').length > 0) {
    return null;
  }

  return doc;
}

function getElementsByLocalName(root: XmlRoot, localName: string): Element[] {
  return Array.from(root.getElementsByTagName('*')).filter(
    (node) => node.localName === localName || normalizeXmlTagName(node.tagName) === localName,
  );
}

function parseXmlText(xml: string, tagNames: string[]): string {
  const doc = parseXmlDocument(xml);
  if (!doc) return '';

  const localNames = new Set(tagNames.map(normalizeXmlTagName));
  const values = Array.from(doc.getElementsByTagName('*'))
    .filter((node) => localNames.has(node.localName) || localNames.has(normalizeXmlTagName(node.tagName)))
    .map((node) => node.textContent ?? '');

  return truncateText(values.join(' '));
}

async function readZipText(zip: JSZip, path: string): Promise<string> {
  return zip.file(path)?.async('text') ?? Promise.resolve('');
}

function sortSlidePaths(paths: string[]) {
  return paths.sort((a, b) => {
    const aNumber = Number(a.match(/slide(\d+)\.xml$/)?.[1] ?? 0);
    const bNumber = Number(b.match(/slide(\d+)\.xml$/)?.[1] ?? 0);
    return aNumber - bNumber;
  });
}

function sortSheetPaths(paths: string[]) {
  return paths.sort((a, b) => {
    const aNumber = Number(a.match(/sheet(\d+)\.xml$/)?.[1] ?? 0);
    const bNumber = Number(b.match(/sheet(\d+)\.xml$/)?.[1] ?? 0);
    return aNumber - bNumber;
  });
}

function getFirstXmlText(root: Element, localName: string): string {
  return normalizeWhitespace(getElementsByLocalName(root, localName)[0]?.textContent ?? '');
}

function extractSharedStrings(xml: string): string[] {
  const doc = parseXmlDocument(xml);
  if (!doc) return [];

  return getElementsByLocalName(doc, 'si').map((item) =>
    normalizeWhitespace(
      getElementsByLocalName(item, 't').map((node) => node.textContent ?? '').join(''),
    )
  );
}

function extractWorkbookSheetNames(xml: string): string[] {
  const doc = parseXmlDocument(xml);
  if (!doc) return [];

  return getElementsByLocalName(doc, 'sheet')
    .map((sheet) => normalizeWhitespace(sheet.getAttribute('name') ?? ''))
    .filter(Boolean);
}

function extractSpreadsheetCellText(cell: Element, sharedStrings: string[]): string {
  const type = cell.getAttribute('t');
  const value = getFirstXmlText(cell, 'v');

  if (type === 's') {
    const index = Number.parseInt(value, 10);
    return Number.isFinite(index) ? sharedStrings[index] ?? '' : '';
  }

  if (type === 'inlineStr') {
    return normalizeWhitespace(
      getElementsByLocalName(cell, 't').map((node) => node.textContent ?? '').join(''),
    );
  }

  if (type === 'b') {
    if (value === '1') return 'true';
    if (value === '0') return 'false';
  }

  if (type === 'e') {
    return '';
  }

  return value || getFirstXmlText(cell, 'f');
}

function extractWorksheetText(xml: string, sharedStrings: string[]): string {
  const doc = parseXmlDocument(xml);
  if (!doc) return '';

  return getElementsByLocalName(doc, 'row')
    .slice(0, 120)
    .map((row) =>
      getElementsByLocalName(row, 'c')
        .map((cell) => extractSpreadsheetCellText(cell, sharedStrings))
        .filter(Boolean)
        .join(' | ')
    )
    .filter(Boolean)
    .join('\n');
}

function extractSpreadsheetText(workbookXml: string, sharedStringsXml: string, sheetXmls: string[]): string {
  const sharedStrings = extractSharedStrings(sharedStringsXml);
  const sheetNames = extractWorkbookSheetNames(workbookXml);
  const worksheetTexts = sheetXmls.map((sheetXml, index) => {
    const title = sheetNames[index] ? `Sheet: ${sheetNames[index]}` : '';
    const rows = extractWorksheetText(sheetXml, sharedStrings);
    return [title, rows].filter(Boolean).join('\n');
  });

  return truncateText([
    ...sheetNames,
    ...worksheetTexts,
    sharedStrings.join(' '),
  ].filter(Boolean).join('\n'));
}

async function extractOfficeText(file: File, extension: string): Promise<string> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  if (extension === 'docx') {
    const xml = await readZipText(zip, 'word/document.xml');
    return parseXmlText(xml, ['w:t', 't']);
  }

  if (extension === 'pptx') {
    const slidePaths = sortSlidePaths(
      Object.keys(zip.files).filter((path) => /^ppt\/slides\/slide\d+\.xml$/.test(path)),
    ).slice(0, 10);
    const slides = await Promise.all(slidePaths.map((path) => readZipText(zip, path)));
    return parseXmlText(slides.join(' '), ['a:t', 't']);
  }

  const sharedStrings = await readZipText(zip, 'xl/sharedStrings.xml');
  const workbook = await readZipText(zip, 'xl/workbook.xml');
  const sheetPaths = sortSheetPaths(
    Object.keys(zip.files).filter((path) => /^xl\/worksheets\/sheet\d+\.xml$/.test(path)),
  ).slice(0, 8);
  const sheets = await Promise.all(sheetPaths.map((path) => readZipText(zip, path)));
  return extractSpreadsheetText(workbook, sharedStrings, sheets);
}

async function getPdfJs() {
  const [pdfjsLib, worker] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.mjs?url'),
  ]);
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjsLib;
}

async function renderPdfPageToPreview(page: any) {
  const viewport = page.getViewport({ scale: 1 });
  const scale = Math.min(1.4, MAX_IMAGE_SIDE / Math.max(viewport.width, viewport.height));
  const scaledViewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(scaledViewport.width));
  canvas.height = Math.max(1, Math.floor(scaledViewport.height));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is not available');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: context,
    viewport: scaledViewport,
  }).promise;

  const dataUrl = canvasToJpegDataUrl(canvas);
  return {
    dataUrl,
    base64: dataUrlToBase64(dataUrl),
  };
}

async function preparePdfFile(file: File): Promise<PreparedFile['payload'] & { thumbnailDataUrl?: string }> {
  const pdfjsLib = await getPdfJs();
  const objectUrl = URL.createObjectURL(file);

  try {
    const pdf = await pdfjsLib.getDocument({
      url: objectUrl,
    }).promise;

    try {
      const pageCount = pdf.numPages;
      const pageNumbers = Array.from(
        { length: Math.min(pageCount, MAX_DOCUMENT_IMAGES) },
        (_, index) => index + 1,
      );
      const pages = await Promise.all(pageNumbers.map((pageNumber) => pdf.getPage(pageNumber)));
      const textItems = await Promise.all(
        pages.map(async (page) => {
          const content = await page.getTextContent();
          return content.items.map((item: any) => item.str ?? '').join(' ');
        }),
      );
      const previews = await Promise.all(pages.map((page) => renderPdfPageToPreview(page)));

      return {
        name: file.name,
        original_extension: 'pdf',
        mime_type: file.type || 'application/pdf',
        content_kind: 'document',
        text: truncateText(textItems.join(' ')),
        images: previews.map((preview) => preview.base64),
        image_mime_type: 'image/jpeg',
        preview_page_numbers: pageNumbers,
        page_count: pageCount,
        thumbnailDataUrl: previews[0]?.dataUrl,
      };
    } finally {
      await pdf.destroy?.();
    }
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function prepareTextFile(file: File): Promise<PreviewPayloadFile> {
  const text = truncateText(await file.text());
  if (!text) throw new Error('empty-text');

  return {
    name: file.name,
    original_extension: getExtension(file),
    mime_type: file.type || 'text/plain',
    content_kind: 'text',
    text,
  };
}

async function prepareDocumentFile(file: File, extension: string): Promise<PreparedFile['payload'] & { thumbnailDataUrl?: string }> {
  if (extension === 'pdf') {
    return preparePdfFile(file);
  }

  const text = await extractOfficeText(file, extension);
  if (!text) throw new Error('empty-text');

  return {
    name: file.name,
    original_extension: extension,
    mime_type: file.type || 'application/octet-stream',
    content_kind: 'document',
    text,
  };
}

async function preparePreviewFile(item: DemoFile): Promise<PreparedFile> {
  if (!item.contentKind) throw new Error('unsupported');
  if (item.file.size > getMaxSourceBytes(item)) throw new Error('source-too-large');

  if (item.contentKind === 'image') {
    const payload = await prepareImageFile(item.file);
    const { thumbnailDataUrl, ...apiPayload } = payload;
    return { id: item.id, payload: apiPayload, thumbnailDataUrl };
  }

  if (item.contentKind === 'text') {
    return { id: item.id, payload: await prepareTextFile(item.file) };
  }

  const payload = await prepareDocumentFile(item.file, item.extension);
  const { thumbnailDataUrl, ...apiPayload } = payload;
  return { id: item.id, payload: apiPayload, thumbnailDataUrl };
}

function getOrCreateVisitorId(): string {
  const storageKey = 'zush-preview-visitor-id';
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const visitorId = crypto.randomUUID();
  window.localStorage.setItem(storageKey, visitorId);
  return visitorId;
}

async function analyzePreviewFiles(files: PreviewPayloadFile[], locale: Locale | undefined) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/web-preview-analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitor_id: getOrCreateVisitorId(),
      locale,
      files,
    }),
  });
  const body = await response.json().catch(() => ({})) as PreviewResponse;

  if (!response.ok) {
    throw new Error(body.error || 'network');
  }

  return body.results ?? [];
}

function errorToCopy(error: unknown, copy: RenameDemoCopy, extension?: string) {
  const message = error instanceof Error ? error.message : String(error);

  if (message === 'unsupported') {
    return formatCopy(copy.errors.unsupportedType, { extension: extension ? `.${extension}` : '' });
  }

  if (message === 'source-too-large') {
    return copy.errors.fileTooLarge;
  }

  if (message === 'empty-text') {
    return copy.errors.emptyPreview;
  }

  return message || copy.errors.processingFailed;
}

function getStatusLabel(file: DemoFile, copy: RenameDemoCopy) {
  if (file.error) return file.error;
  if (file.status === 'queued') return copy.status.queued;
  if (file.status === 'preparing') return copy.status.preparing;
  if (file.status === 'analyzing') return copy.status.analyzing;
  if (file.status === 'done') return copy.status.done;
  return copy.status.error;
}

function getFileIcon(file: DemoFile) {
  if (file.contentKind === 'image') return extensionIconMap.image;
  if (file.contentKind === 'text') return extensionIconMap.text;
  if (file.extension === 'pdf') return extensionIconMap.pdf;
  if (file.extension === 'docx') return extensionIconMap.docx;
  if (file.extension === 'pptx') return extensionIconMap.pptx;
  if (file.extension === 'xlsx') return extensionIconMap.xlsx;
  return FileText;
}

function renderDemoTitle(title: string) {
  if (!title.startsWith('Zush ')) return title;

  return (
    <>
      <span className={styles.RenameDemo__TitleBrand}>Zush</span>
      {title.slice('Zush'.length)}
    </>
  );
}

function renderMacSpinner() {
  return (
    <span className={styles.RenameDemo__Spinner}>
      {SPINNER_SEGMENTS.map((segment) => (
        <span key={segment} style={{ '--segment-index': segment } as CSSProperties} />
      ))}
    </span>
  );
}

const HeroRenameDemo = ({
  copy,
  downloadLabel,
  downloadMenu,
  locale,
}: HeroRenameDemoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<DemoFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [runStartedAt, setRunStartedAt] = useState<number | null>(null);
  const [runFinishedAt, setRunFinishedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const analyzedCount = files.filter((file) => file.status === 'done' || file.status === 'error').length;
  const hasFiles = files.length > 0;
  const isBusy = files.some((file) => file.status === 'preparing' || file.status === 'analyzing');

  useEffect(() => {
    if (!runStartedAt || runFinishedAt) return undefined;

    const updateElapsed = () => {
      setElapsedSeconds(Math.floor((Date.now() - runStartedAt) / 1000));
    };
    updateElapsed();

    const intervalId = window.setInterval(updateElapsed, 250);
    return () => window.clearInterval(intervalId);
  }, [runFinishedAt, runStartedAt]);

  const updateFile = (id: string, patch: Partial<DemoFile>) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) => file.id === id ? { ...file, ...patch } : file),
    );
  };

  const startOver = () => {
    setFiles([]);
    setBanner(null);
    setRunStartedAt(null);
    setRunFinishedAt(null);
    setElapsedSeconds(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const processFiles = async (selectedFiles: File[]) => {
    const startedAt = Date.now();
    setBanner(null);
    setRunStartedAt(startedAt);
    setRunFinishedAt(null);
    setElapsedSeconds(0);

    try {
      const acceptedFiles = selectedFiles.slice(0, MAX_FILES);
      if (selectedFiles.length > MAX_FILES) {
        setBanner(formatCopy(copy.errors.tooManyFiles, { limit: MAX_FILES }));
      }

      const initialFiles = acceptedFiles.map((file, index) => {
        const extension = getExtension(file);
        return {
          id: createFileId(file, index),
          file,
          originalName: file.name,
          extension,
          contentKind: inferContentKind(extension),
          mimeType: file.type || 'application/octet-stream',
          status: inferContentKind(extension) ? 'queued' : 'error',
          error: inferContentKind(extension)
            ? undefined
            : formatCopy(copy.errors.unsupportedType, { extension: extension ? `.${extension}` : '' }),
        } satisfies DemoFile;
      });

      setFiles(initialFiles);

      const preparedFiles: PreparedFile[] = [];
      for (const item of initialFiles) {
        if (item.status === 'error') continue;
        updateFile(item.id, { status: 'preparing' });

        try {
          const preparedFile = await preparePreviewFile(item);
          preparedFiles.push(preparedFile);
          updateFile(item.id, {
            status: 'queued',
            thumbnailDataUrl: preparedFile.thumbnailDataUrl,
          });
        } catch (error) {
          updateFile(item.id, {
            status: 'error',
            error: errorToCopy(error, copy, item.extension),
          });
        }
      }

      if (!preparedFiles.length) return;

      preparedFiles.forEach((item) => updateFile(item.id, { status: 'analyzing' }));

      try {
        const results = await analyzePreviewFiles(
          preparedFiles.map((item) => item.payload),
          locale,
        );

        preparedFiles.forEach((item, index) => {
          const result = results[index];
          updateFile(item.id, {
            status: result?.error ? 'error' : 'done',
            suggestedName: result?.suggested_name ?? undefined,
            error: result?.error || undefined,
          });
        });
      } catch (error) {
        const message = errorToCopy(error, copy);
        setBanner(message);
        preparedFiles.forEach((item) => {
          updateFile(item.id, {
            status: 'error',
            error: message,
          });
        });
      }
    } finally {
      const finishedAt = Date.now();
      setRunFinishedAt(finishedAt);
      setElapsedSeconds(Math.max(1, Math.ceil((finishedAt - startedAt) / 1000)));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length) {
      void processFiles(selectedFiles);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (isBusy) return;
    const selectedFiles = Array.from(event.dataTransfer.files ?? []);
    if (selectedFiles.length) {
      void processFiles(selectedFiles);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isBusy) {
      event.dataTransfer.dropEffect = 'copy';
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  return (
    <>
      <div className={styles.RenameDemo}>
      <div className={styles.RenameDemo__Header}>
        <div className={styles.RenameDemo__HeaderText}>
          <div className={styles.RenameDemo__Chrome} aria-hidden='true'>
            <span />
            <span />
            <span />
          </div>
          <h2 className={styles.RenameDemo__Title}>{renderDemoTitle(copy.title)}</h2>
        </div>
        <Sparkles size={20} aria-hidden='true' />
      </div>

      {banner && (
        <div className={styles.RenameDemo__Banner} role='status'>
          {banner}
        </div>
      )}

      <div
        className={[
          styles.RenameDemo__DropZone,
          isDragging ? styles.RenameDemo__DropZone_dragging : '',
          hasFiles ? styles.RenameDemo__DropZone_hasFiles : '',
        ].filter(Boolean).join(' ')}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          className={styles.RenameDemo__Input}
          type='file'
          multiple
          accept='.png,.jpg,.jpeg,.webp,.gif,.bmp,.tif,.tiff,.svg,.pdf,.docx,.pptx,.xlsx,.txt,.md,.json,.eml,.csv'
          onChange={handleInputChange}
        />

        {!hasFiles ? (
          <div className={styles.RenameDemo__Empty}>
            <Upload size={38} strokeWidth={1.8} aria-hidden='true' />
            <p className={styles.RenameDemo__EmptyTitle}>{copy.emptyTitle}</p>
            <p className={styles.RenameDemo__EmptySubtitle}>{copy.emptySubtitle}</p>
            <Button
              as='button'
              type='button'
              variant='ghost'
              size='sm'
              className={styles.RenameDemo__SelectButton}
              onClick={() => inputRef.current?.click()}
              disabled={isBusy}
            >
              {copy.selectFiles}
            </Button>
            <div className={styles.RenameDemo__Chips} aria-label={copy.supportedFormatsLabel}>
              {SUPPORTED_CHIPS.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.RenameDemo__Results}>
            <div className={styles.RenameDemo__ProgressRow}>
              <span>
                {formatCopy(copy.progressLabel, {
                  analyzed: analyzedCount,
                  total: files.length,
                })}
              </span>
              <span>{elapsedSeconds}s</span>
            </div>
            <div className={styles.RenameDemo__ProgressTrack} aria-hidden='true'>
              <span style={{ width: `${files.length ? (analyzedCount / files.length) * 100 : 0}%` }} />
            </div>

            <div className={styles.RenameDemo__List}>
              {files.map((file) => {
                const Icon = getFileIcon(file);
                const isLoading = file.status === 'preparing' || file.status === 'analyzing';

                return (
                  <div key={file.id} className={styles.RenameDemo__Row}>
                    <div className={styles.RenameDemo__Preview} aria-hidden='true'>
                      {file.thumbnailDataUrl ? (
                        <img src={file.thumbnailDataUrl} alt='' />
                      ) : (
                        <Icon size={24} strokeWidth={2} />
                      )}
                    </div>
                    <div className={styles.RenameDemo__RowContent}>
                      <div className={styles.RenameDemo__Original}>{file.originalName}</div>
                      {file.suggestedName ? (
                        <div className={styles.RenameDemo__Suggested}>
                          <ArrowRight size={15} aria-hidden='true' />
                          <span>{file.suggestedName}</span>
                        </div>
                      ) : (
                        <div className={styles.RenameDemo__Status}>{getStatusLabel(file, copy)}</div>
                      )}
                    </div>
                    <div
                      className={[
                        styles.RenameDemo__RowAction,
                      file.status === 'done' ? styles.RenameDemo__RowAction_done : '',
                    ].filter(Boolean).join(' ')}
                    aria-hidden='true'
                  >
                      {isLoading ? renderMacSpinner() : file.status === 'done' ? <Check size={20} /> : <X size={18} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.RenameDemo__Actions}>
              <Button
                as='button'
                type='button'
                variant='ghost'
                size='sm'
                onClick={startOver}
                disabled={isBusy}
              >
                {copy.startOver}
              </Button>
              <DownloadButton
                source='hero'
                variant='primary'
                size='sm'
                label={downloadLabel}
                menuCopy={downloadMenu}
                showDropdown={false}
                className={styles.RenameDemo__Download}
              />
            </div>
          </div>
        )}
      </div>
      </div>
      <p className={styles.RenameDemoSecurityHint}>{copy.privacyHint}</p>
    </>
  );
};

export default HeroRenameDemo;
