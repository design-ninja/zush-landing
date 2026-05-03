import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';
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

interface CfbFileEntry {
  name: string;
  content?: Uint8Array | number[];
}

interface CfbFile {
  FileIndex: CfbFileEntry[];
}

interface XlsxWithCfb {
  CFB?: {
    read: (data: Uint8Array, options: { type: 'array' }) => CfbFile;
  };
}

const MAX_FILES = 5;
const COMPLETION_SOUND_SRC = '/sounds/ding.wav';
const MAX_IMAGE_SOURCE_BYTES = 30 * 1024 * 1024;
const MAX_HEIC_SOURCE_BYTES = 80 * 1024 * 1024;
const MAX_TIFF_SOURCE_BYTES = 120 * 1024 * 1024;
const MAX_RAW_SOURCE_BYTES = 250 * 1024 * 1024;
const MAX_TEXT_SOURCE_BYTES = 25 * 1024 * 1024;
const MAX_PDF_SOURCE_BYTES = 250 * 1024 * 1024;
const MAX_OFFICE_SOURCE_BYTES = 250 * 1024 * 1024;
const MAX_LEGACY_OFFICE_SCAN_BYTES = 30 * 1024 * 1024;
const MAX_TIFF_PIXELS = 36_000_000;
const MAX_EMBEDDED_JPEG_BYTES = 42 * 1024 * 1024;
const MAX_RAW_DECODE_PIXELS = 4_000_000;
const MAX_JPEG_CANDIDATES = 14;
const MAX_TEXT_CHARS = 12_000;
const MAX_PPTX_TEXT_SLIDES = 12;
const MAX_IMAGE_SIDE = 720;
const MAX_DOCUMENT_IMAGES = 3;
const PREVIEW_THUMBNAIL_WIDTH = 360;
const PREVIEW_THUMBNAIL_HEIGHT = 272;
const PREVIEW_THUMBNAIL_BACKGROUND = '#111117';
const ALPHA_CROP_SAMPLE_SIDE = 420;

const IMAGE_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'webp',
  'gif',
  'bmp',
  'tif',
  'tiff',
  'heic',
  'heif',
  'svg',
]);
const RAW_EXTENSIONS = new Set([
  'cr2',
  'cr3',
  'nef',
  'arw',
  'dng',
  'orf',
  'raf',
  'rw2',
  'pef',
  'srw',
  'sr2',
  'raw',
]);
const HEIC_EXTENSIONS = new Set(['heic', 'heif']);
const TIFF_EXTENSIONS = new Set(['tif', 'tiff']);
const TEXT_EXTENSIONS = new Set(['txt', 'md', 'json', 'eml', 'csv']);
const DOCUMENT_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx']);

const SUPPORTED_CHIP_GROUPS = [
  [
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.gif',
    '.bmp',
    '.tiff',
    '.tif',
    '.heic',
    '.heif',
    '.svg',
    '.cr2',
    '.cr3',
    '.nef',
    '.arw',
    '.dng',
    '.orf',
    '.raf',
    '.rw2',
    '.pef',
    '.srw',
    '.sr2',
    '.raw',
  ],
  [
    '.txt',
    '.md',
    '.json',
    '.eml',
    '.csv',
    '.doc',
    '.docx',
    '.ppt',
    '.pptx',
    '.xls',
    '.xlsx',
    '.pdf',
  ],
];
const SPINNER_SEGMENTS = Array.from({ length: 12 }, (_, index) => index);

const SUMMARY_PROPERTY_LABELS = new Map([
  [2, 'Title'],
  [3, 'Subject'],
  [4, 'Author'],
  [5, 'Keywords'],
  [6, 'Comments'],
  [7, 'Template'],
  [8, 'Last saved by'],
  [14, 'Pages'],
  [15, 'Words'],
  [16, 'Characters'],
  [18, 'Application'],
]);

const DOCUMENT_SUMMARY_PROPERTY_LABELS = new Map([
  [2, 'Category'],
  [3, 'Presentation target'],
  [4, 'Bytes'],
  [5, 'Lines'],
  [6, 'Paragraphs'],
  [7, 'Slides'],
  [8, 'Notes'],
  [9, 'Hidden slides'],
  [12, 'Company'],
  [13, 'Links up to date'],
]);

const DESCRIPTIVE_LEGACY_METADATA_LABELS = new Set([
  'Title',
  'Subject',
  'Keywords',
  'Comments',
  'Category',
  'Presentation target',
]);

const extensionIconMap = {
  image: FileImage,
  text: FileText,
  pdf: FileType2,
  doc: FileText,
  docx: FileText,
  ppt: Presentation,
  pptx: Presentation,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
} as const;

const DOCUMENT_PREVIEW_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'txt', 'md', 'json', 'eml']);
const SPREADSHEET_PREVIEW_EXTENSIONS = new Set(['xls', 'xlsx', 'csv']);
const PRESENTATION_PREVIEW_EXTENSIONS = new Set(['ppt', 'pptx']);

function createFileId(file: File, index: number): string {
  return `${file.name}-${file.size}-${file.lastModified}-${index}`;
}

function getExtension(file: File): string {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  return extension.replace(/[^a-z0-9]/g, '');
}

function inferContentKind(extension: string): ContentKind | null {
  if (IMAGE_EXTENSIONS.has(extension) || RAW_EXTENSIONS.has(extension)) return 'image';
  if (TEXT_EXTENSIONS.has(extension)) return 'text';
  if (DOCUMENT_EXTENSIONS.has(extension)) return 'document';
  return null;
}

function getMaxSourceBytes(item: DemoFile): number {
  if (RAW_EXTENSIONS.has(item.extension)) return MAX_RAW_SOURCE_BYTES;
  if (HEIC_EXTENSIONS.has(item.extension)) return MAX_HEIC_SOURCE_BYTES;
  if (TIFF_EXTENSIONS.has(item.extension)) return MAX_TIFF_SOURCE_BYTES;
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

interface SourceCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getVisibleSourceCrop(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
): SourceCrop {
  const fullCrop = { x: 0, y: 0, width: sourceWidth, height: sourceHeight };
  const sampleScale = Math.min(1, ALPHA_CROP_SAMPLE_SIDE / Math.max(sourceWidth, sourceHeight));
  const sampleWidth = Math.max(1, Math.round(sourceWidth * sampleScale));
  const sampleHeight = Math.max(1, Math.round(sourceHeight * sampleScale));
  const sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = sampleWidth;
  sampleCanvas.height = sampleHeight;

  const context = sampleCanvas.getContext('2d', { willReadFrequently: true });
  if (!context) return fullCrop;

  try {
    context.clearRect(0, 0, sampleWidth, sampleHeight);
    context.drawImage(source, 0, 0, sampleWidth, sampleHeight);

    const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
    let minX = sampleWidth;
    let minY = sampleHeight;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < sampleHeight; y += 1) {
      for (let x = 0; x < sampleWidth; x += 1) {
        const alpha = pixels[(y * sampleWidth + x) * 4 + 3];
        if (alpha <= 8) continue;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }

    if (maxX < minX || maxY < minY) return fullCrop;

    const padding = 2 / sampleScale;
    const x = Math.max(0, Math.floor(minX / sampleScale - padding));
    const y = Math.max(0, Math.floor(minY / sampleScale - padding));
    const right = Math.min(sourceWidth, Math.ceil((maxX + 1) / sampleScale + padding));
    const bottom = Math.min(sourceHeight, Math.ceil((maxY + 1) / sampleScale + padding));
    const width = Math.max(1, right - x);
    const height = Math.max(1, bottom - y);

    if (width / sourceWidth > 0.985 && height / sourceHeight > 0.985) {
      return fullCrop;
    }

    return { x, y, width, height };
  } catch {
    return fullCrop;
  }
}

function createCoverThumbnailDataUrl(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
): string {
  const crop = getVisibleSourceCrop(source, sourceWidth, sourceHeight);
  const canvas = document.createElement('canvas');
  canvas.width = PREVIEW_THUMBNAIL_WIDTH;
  canvas.height = PREVIEW_THUMBNAIL_HEIGHT;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is not available');

  const scale = Math.max(canvas.width / crop.width, canvas.height / crop.height);
  const width = crop.width * scale;
  const height = crop.height * scale;
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  context.fillStyle = PREVIEW_THUMBNAIL_BACKGROUND;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, crop.x, crop.y, crop.width, crop.height, x, y, width, height);

  return canvasToJpegDataUrl(canvas);
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
    thumbnailDataUrl: createCoverThumbnailDataUrl(image, sourceWidth, sourceHeight),
  };
}

function rgbaToJpegPreview(rgba: Uint8Array, sourceWidth: number, sourceHeight: number) {
  if (!sourceWidth || !sourceHeight || sourceWidth * sourceHeight > MAX_TIFF_PIXELS) {
    throw new Error('source-too-large');
  }

  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.width = sourceWidth;
  sourceCanvas.height = sourceHeight;

  const sourceContext = sourceCanvas.getContext('2d');
  if (!sourceContext) throw new Error('Canvas is not available');
  sourceContext.putImageData(
    new ImageData(
      new Uint8ClampedArray(rgba),
      sourceWidth,
      sourceHeight,
    ),
    0,
    0,
  );

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is not available');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(sourceCanvas, 0, 0, width, height);

  const dataUrl = canvasToJpegDataUrl(canvas);
  return {
    dataUrl,
    base64: dataUrlToBase64(dataUrl),
    thumbnailDataUrl: createCoverThumbnailDataUrl(sourceCanvas, sourceWidth, sourceHeight),
  };
}

type ImagePreview = ReturnType<typeof rgbaToJpegPreview>;

function uint8ArrayToArrayBuffer(value: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(value.byteLength);
  copy.set(value);
  return copy.buffer;
}

type UtifIfd = Record<string, unknown> & {
  width?: number;
  height?: number;
  data?: unknown;
};

interface UtifModule {
  decode: (buffer: ArrayBuffer) => UtifIfd[];
  decodeImage: (buffer: ArrayBuffer, ifd: UtifIfd) => void;
  toRGBA8: (ifd: UtifIfd) => Uint8Array;
}

interface JpegCandidate {
  offset: number;
  length: number;
  source: 'tiff-tag' | 'scan';
}

function numbersFromTag(value: unknown): number[] {
  if (typeof value === 'number') return [value];
  if (Array.isArray(value)) return value.filter((item): item is number => typeof item === 'number');
  if (ArrayBuffer.isView(value) && 'length' in value) {
    return Array.from(value as unknown as ArrayLike<number>).filter((item) => Number.isFinite(item));
  }
  return [];
}

function firstPositiveInteger(value: unknown): number | null {
  const number = numbersFromTag(value).find((item) => Number.isInteger(item) && item > 0);
  return typeof number === 'number' ? number : null;
}

async function getUtif(): Promise<UtifModule> {
  const module = await import('utif');
  return (module.default ?? module) as UtifModule;
}

function looksLikeJpegStart(bytes: Uint8Array, offset: number): boolean {
  if (offset < 0 || offset + 3 >= bytes.length) return false;
  const marker = bytes[offset + 3];
  return bytes[offset] === 0xff &&
    bytes[offset + 1] === 0xd8 &&
    bytes[offset + 2] === 0xff &&
    marker >= 0xc0 &&
    marker <= 0xfe &&
    marker !== 0xd8 &&
    marker !== 0xd9;
}

function pushJpegCandidate(
  candidates: JpegCandidate[],
  seen: Set<string>,
  bytes: Uint8Array,
  offset: number,
  length: number,
  source: JpegCandidate['source'],
) {
  if (
    !Number.isInteger(offset) ||
    !Number.isInteger(length) ||
    offset < 0 ||
    length <= 2048 ||
    length > MAX_EMBEDDED_JPEG_BYTES ||
    offset + length > bytes.length ||
    !looksLikeJpegStart(bytes, offset)
  ) {
    return;
  }

  const key = `${offset}:${length}`;
  if (seen.has(key)) return;
  seen.add(key);
  candidates.push({ offset, length, source });
}

function pushJpegCandidatesFromTags(
  candidates: JpegCandidate[],
  seen: Set<string>,
  bytes: Uint8Array,
  offsetValue: unknown,
  lengthValue: unknown,
) {
  const offsets = numbersFromTag(offsetValue);
  const lengths = numbersFromTag(lengthValue);
  const count = Math.min(offsets.length, lengths.length);

  for (let index = 0; index < count; index += 1) {
    pushJpegCandidate(candidates, seen, bytes, offsets[index], lengths[index], 'tiff-tag');
  }
}

function extractTiffTaggedJpegCandidates(bytes: Uint8Array, ifds: UtifIfd[]): JpegCandidate[] {
  const candidates: JpegCandidate[] = [];
  const seen = new Set<string>();

  for (const ifd of ifds) {
    pushJpegCandidatesFromTags(candidates, seen, bytes, ifd.t513, ifd.t514);
    pushJpegCandidatesFromTags(candidates, seen, bytes, ifd.t273, ifd.t279);
    pushJpegCandidatesFromTags(candidates, seen, bytes, ifd.t324, ifd.t325);
  }

  return candidates;
}

function rankJpegCandidates(candidates: JpegCandidate[]): JpegCandidate[] {
  return [...candidates]
    .sort((a, b) => {
      if (a.source !== b.source) return a.source === 'tiff-tag' ? -1 : 1;
      return b.length - a.length;
    })
    .slice(0, MAX_JPEG_CANDIDATES);
}

function jpegCandidateToBlob(bytes: Uint8Array, candidate: JpegCandidate): Blob {
  const jpeg = bytes.slice(candidate.offset, candidate.offset + candidate.length);
  return new Blob([uint8ArrayToArrayBuffer(jpeg)], { type: 'image/jpeg' });
}

async function jpegCandidateToPreview(bytes: Uint8Array, candidate: JpegCandidate): Promise<ImagePreview | null> {
  try {
    return await imageBlobToJpegPreview(jpegCandidateToBlob(bytes, candidate));
  } catch {
    return null;
  }
}

function findNextJpegEnd(bytes: Uint8Array, start: number): number {
  for (let index = start + 2; index < bytes.length - 1; index += 1) {
    if (bytes[index] === 0xff && bytes[index + 1] === 0xd9) {
      return index + 2;
    }
  }

  return -1;
}

function extractScannedJpegCandidates(bytes: Uint8Array, seen: Set<string>): JpegCandidate[] {
  const candidates: JpegCandidate[] = [];

  for (let index = 0; index < bytes.length - 1; index += 1) {
    if (!looksLikeJpegStart(bytes, index)) continue;

    const end = findNextJpegEnd(bytes, index);
    if (end === -1) break;

    const length = end - index;
    pushJpegCandidate(candidates, seen, bytes, index, length, 'scan');

    index = end - 1;
  }

  return candidates;
}

async function imagePreviewFromEmbeddedJpeg(buffer: ArrayBuffer): Promise<ImagePreview | null> {
  const bytes = new Uint8Array(buffer);
  const seen = new Set<string>();
  let candidates: JpegCandidate[] = [];

  try {
    const UTIF = await getUtif();
    const ifds = UTIF.decode(buffer);
    candidates = candidates.concat(extractTiffTaggedJpegCandidates(bytes, ifds));
    candidates.forEach((candidate) => seen.add(`${candidate.offset}:${candidate.length}`));
  } catch {
    // Some RAW containers are not TIFF-ish. Fall back to scanning for embedded JPEG previews.
  }

  candidates = candidates.concat(extractScannedJpegCandidates(bytes, seen));

  for (const candidate of rankJpegCandidates(candidates)) {
    const preview = await jpegCandidateToPreview(bytes, candidate);
    if (preview) return preview;
  }

  return null;
}

async function decodeTiffIfdPreview(buffer: ArrayBuffer, maxPixels: number): Promise<ImagePreview | null> {
  try {
    const UTIF = await getUtif();
    const ifds = UTIF.decode(buffer)
      .map((ifd) => {
        const width = firstPositiveInteger(ifd.t256) ?? ifd.width ?? 0;
        const height = firstPositiveInteger(ifd.t257) ?? ifd.height ?? 0;
        return { ifd, width, height, pixels: width * height };
      })
      .filter(({ width, height, pixels }) => width > 0 && height > 0 && pixels > 0 && pixels <= maxPixels)
      .sort((a, b) => b.pixels - a.pixels);

    for (const { ifd } of ifds) {
      try {
        UTIF.decodeImage(buffer, ifd);
        const rgba = UTIF.toRGBA8(ifd);
        return rgbaToJpegPreview(rgba, ifd.width ?? 0, ifd.height ?? 0);
      } catch {
        // Keep trying smaller preview IFDs; some RAW IFDs use unsupported compression.
      }
    }
  } catch {
    return null;
  }

  return null;
}

async function tiffBlobToJpegPreview(file: File) {
  try {
    return await imageBlobToJpegPreview(file);
  } catch {
    // Most browsers except Safari do not decode TIFF natively, so use UTIF below.
  }

  const buffer = await file.arrayBuffer();
  const UTIF = await getUtif();
  const ifds = UTIF.decode(buffer);
  const imageIfd = ifds.find((ifd) => {
    const width = firstPositiveInteger(ifd.t256);
    const height = firstPositiveInteger(ifd.t257);
    return width && height && width * height <= MAX_TIFF_PIXELS;
  }) ?? ifds[0];

  if (!imageIfd) throw new Error('empty-preview');

  try {
    UTIF.decodeImage(buffer, imageIfd);
    const rgba = UTIF.toRGBA8(imageIfd);
    return rgbaToJpegPreview(rgba, imageIfd.width ?? 0, imageIfd.height ?? 0);
  } catch {
    const embeddedPreview = await imagePreviewFromEmbeddedJpeg(buffer);
    if (!embeddedPreview) throw new Error('empty-preview');
    return embeddedPreview;
  }
}

async function heicBlobToJpegPreview(file: File) {
  const { heicTo } = await import('heic-to/csp');
  const jpeg = await heicTo({
    blob: file,
    type: 'image/jpeg',
    quality: 0.72,
  });

  if (!(jpeg instanceof Blob)) {
    throw new Error('empty-preview');
  }

  return imageBlobToJpegPreview(jpeg);
}

async function rawBlobToJpegPreview(file: File) {
  const buffer = await file.arrayBuffer();
  const embeddedPreview = await imagePreviewFromEmbeddedJpeg(buffer);
  if (embeddedPreview) return embeddedPreview;

  const decodedPreview = await decodeTiffIfdPreview(buffer, MAX_RAW_DECODE_PIXELS);
  if (decodedPreview) return decodedPreview;

  throw new Error('empty-preview');
}

async function prepareImageFile(file: File): Promise<PreparedFile['payload'] & { thumbnailDataUrl: string }> {
  const extension = getExtension(file);
  if (file.size > getMaxSourceBytes({
    id: '',
    file,
    originalName: file.name,
    extension,
    contentKind: 'image',
    mimeType: file.type || 'application/octet-stream',
    status: 'queued',
  })) {
    throw new Error('source-too-large');
  }

  const preview = HEIC_EXTENSIONS.has(extension)
    ? await heicBlobToJpegPreview(file)
    : RAW_EXTENSIONS.has(extension)
    ? await rawBlobToJpegPreview(file)
    : TIFF_EXTENSIONS.has(extension)
    ? await tiffBlobToJpegPreview(file)
    : await imageBlobToJpegPreview(file);

  return {
    name: file.name,
    original_extension: extension,
    mime_type: file.type || 'application/octet-stream',
    content_kind: 'image',
    image: preview.base64,
    image_mime_type: 'image/jpeg',
    thumbnailDataUrl: preview.thumbnailDataUrl,
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

async function extractOoxmlCoreProperties(zip: JSZip): Promise<string[]> {
  const xml = await readZipText(zip, 'docProps/core.xml');
  const doc = xml ? parseXmlDocument(xml) : null;
  if (!doc) return [];

  const fields = [
    ['Title', 'title'],
    ['Subject', 'subject'],
    ['Creator', 'creator'],
    ['Keywords', 'keywords'],
    ['Description', 'description'],
    ['Category', 'category'],
    ['Content status', 'contentStatus'],
  ] as const;

  return fields
    .map(([label, localName]) => {
      const value = normalizeWhitespace(getElementsByLocalName(doc, localName)[0]?.textContent ?? '');
      return value ? `${label}: ${value}` : '';
    })
    .filter(Boolean);
}

function sortSlidePaths(paths: string[]) {
  return paths.sort((a, b) => {
    const aNumber = Number(a.match(/slide(\d+)\.xml$/)?.[1] ?? 0);
    const bNumber = Number(b.match(/slide(\d+)\.xml$/)?.[1] ?? 0);
    return aNumber - bNumber;
  });
}

function sampleIndices(itemCount: number, limit: number): number[] {
  if (itemCount <= 0 || limit <= 0) return [];
  if (itemCount <= limit) return Array.from({ length: itemCount }, (_, index) => index);

  const lastIndex = itemCount - 1;
  const selected: number[] = [];
  for (let position = 0; position < limit; position += 1) {
    const denominator = Math.max(limit - 1, 1);
    const index = Math.round((position * lastIndex) / denominator);
    if (!selected.includes(index)) selected.push(index);
  }

  return selected;
}

function parseXmlRelationships(xml: string): Record<string, string> {
  const doc = parseXmlDocument(xml);
  if (!doc) return {};

  return Object.fromEntries(
    getElementsByLocalName(doc, 'Relationship')
      .map((relationship) => {
        const id = relationship.getAttribute('Id') ?? relationship.getAttribute('id') ?? '';
        const target = relationship.getAttribute('Target') ?? relationship.getAttribute('target') ?? '';
        return [id, target];
      })
      .filter(([id, target]) => id && target),
  );
}

function getNamespacedAttribute(element: Element, localName: string): string {
  const attributes = Array.from(element.attributes);
  const namespaced = attributes.find(
    (attribute) => attribute.name.includes(':') && normalizeXmlTagName(attribute.name) === localName,
  );
  if (namespaced) return namespaced.value;

  return element.getAttribute(localName) ??
    attributes.find((attribute) => normalizeXmlTagName(attribute.name) === localName)?.value ??
    '';
}

function resolveOoxmlPath(target: string, baseDirectory: string): string {
  const withoutFragment = target.split('#')[0] ?? target;
  if (withoutFragment.startsWith('/')) return withoutFragment.slice(1);
  if (withoutFragment.startsWith(`${baseDirectory}/`)) return withoutFragment;

  const components = baseDirectory.split('/').filter(Boolean);
  for (const component of withoutFragment.split('/')) {
    if (!component || component === '.') continue;
    if (component === '..') {
      components.pop();
      continue;
    }
    components.push(component);
  }

  return components.join('/');
}

async function getOrderedPptxSlidePaths(zip: JSZip): Promise<string[]> {
  const fallback = sortSlidePaths(
    Object.keys(zip.files).filter((path) => /^ppt\/slides\/slide\d+\.xml$/.test(path)),
  );

  const [presentationXml, relsXml] = await Promise.all([
    readZipText(zip, 'ppt/presentation.xml'),
    readZipText(zip, 'ppt/_rels/presentation.xml.rels'),
  ]);
  const presentation = presentationXml ? parseXmlDocument(presentationXml) : null;
  if (!presentation || !relsXml) return fallback;

  const relationships = parseXmlRelationships(relsXml);
  const availableSlides = new Set(fallback);
  const ordered = getElementsByLocalName(presentation, 'sldId')
    .map((slide) => getNamespacedAttribute(slide, 'id'))
    .map((relationshipId) => relationships[relationshipId] ?? '')
    .map((target) => target ? resolveOoxmlPath(target, 'ppt') : '')
    .filter((path) => availableSlides.has(path));

  return ordered.length > 0 ? [...new Set(ordered)] : fallback;
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

async function extractSpreadsheetWorkbookText(file: File): Promise<string> {
  const workbook = XLSX.read(await file.arrayBuffer(), {
    type: 'array',
    sheetRows: 120,
    cellText: true,
    cellFormula: false,
  });

  return truncateText(
    workbook.SheetNames.slice(0, 8)
      .map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_csv(sheet, {
          FS: ' | ',
          RS: '\n',
          blankrows: false,
        });
        return [`Sheet: ${sheetName}`, rows].filter(Boolean).join('\n');
      })
      .filter(Boolean)
      .join('\n'),
  );
}

function contentToBytes(content: CfbFileEntry['content']): Uint8Array | null {
  if (!content) return null;
  if (content instanceof Uint8Array) return content;
  return Uint8Array.from(content);
}

async function readCfbFile(file: File): Promise<CfbFile | null> {
  const CFB = (XLSX as unknown as XlsxWithCfb).CFB;
  if (!CFB) return null;

  return CFB.read(new Uint8Array(await file.arrayBuffer()), { type: 'array' });
}

function findCfbEntryBytes(cfb: CfbFile, names: string[]): Uint8Array | null {
  const lowerNames = names.map((name) => name.toLowerCase());
  const entry = cfb.FileIndex.find((item) => {
    const lowerEntryName = item.name.toLowerCase();
    return lowerNames.some((name) =>
      lowerEntryName === name || lowerEntryName.endsWith(`/${name}`)
    );
  });

  return contentToBytes(entry?.content);
}

function getLegacyTextDecoder(codePage: number) {
  const normalizedCodePage = codePage < 0 ? codePage + 65536 : codePage;
  const label = normalizedCodePage === 1200
    ? 'utf-16le'
    : normalizedCodePage === 65001
      ? 'utf-8'
      : normalizedCodePage >= 1250 && normalizedCodePage <= 1258
        ? `windows-${normalizedCodePage}`
        : 'windows-1252';

  try {
    return new TextDecoder(label);
  } catch {
    return new TextDecoder('windows-1252');
  }
}

function readLegacyPropertyValue(
  view: DataView,
  offset: number,
  codePage: number,
): string | number | boolean | null {
  if (offset < 0 || offset + 8 > view.byteLength) return null;

  const type = view.getUint32(offset, true);
  const valueOffset = offset + 4;

  if (type === 0x02 && valueOffset + 2 <= view.byteLength) return view.getInt16(valueOffset, true);
  if (type === 0x03 && valueOffset + 4 <= view.byteLength) return view.getInt32(valueOffset, true);
  if (type === 0x13 && valueOffset + 4 <= view.byteLength) return view.getUint32(valueOffset, true);
  if (type === 0x0b && valueOffset + 2 <= view.byteLength) return view.getUint16(valueOffset, true) !== 0;

  if (type === 0x1e && valueOffset + 4 <= view.byteLength) {
    const byteLength = view.getUint32(valueOffset, true);
    const start = valueOffset + 4;
    const end = Math.min(view.byteLength, start + Math.max(0, byteLength - 1));
    if (end <= start) return null;
    const bytes = new Uint8Array(view.buffer, view.byteOffset + start, end - start);
    return normalizeWhitespace(getLegacyTextDecoder(codePage).decode(bytes));
  }

  if (type === 0x1f && valueOffset + 4 <= view.byteLength) {
    const characterCount = view.getUint32(valueOffset, true);
    const start = valueOffset + 4;
    const end = Math.min(view.byteLength, start + Math.max(0, characterCount - 1) * 2);
    if (end <= start) return null;
    const bytes = new Uint8Array(view.buffer, view.byteOffset + start, end - start);
    return normalizeWhitespace(new TextDecoder('utf-16le').decode(bytes));
  }

  return null;
}

function readLegacyCodePage(view: DataView, propertyOffset: number): number | null {
  if (propertyOffset < 0 || propertyOffset + 6 > view.byteLength) return null;

  const type = view.getUint32(propertyOffset, true);
  if (type === 0x02) return view.getInt16(propertyOffset + 4, true);
  if (type === 0x03 && propertyOffset + 8 <= view.byteLength) return view.getInt32(propertyOffset + 4, true);
  return null;
}

function parseLegacyPropertySet(
  bytes: Uint8Array,
  labels: Map<number, string>,
): Array<{ label: string; value: string }> {
  if (bytes.byteLength < 48) return [];

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const propertySetCount = view.getUint32(24, true);
  const sections: Array<{ offset: number }> = [];

  for (let index = 0; index < propertySetCount; index += 1) {
    const descriptorOffset = 28 + index * 20;
    if (descriptorOffset + 20 > view.byteLength) break;
    sections.push({ offset: view.getUint32(descriptorOffset + 16, true) });
  }

  const entries: Array<{ label: string; value: string }> = [];
  for (const section of sections) {
    if (section.offset + 8 > view.byteLength) continue;

    const propertyCount = view.getUint32(section.offset + 4, true);
    const properties: Array<{ id: number; offset: number }> = [];
    let codePage = 1252;

    for (let index = 0; index < propertyCount; index += 1) {
      const tableOffset = section.offset + 8 + index * 8;
      if (tableOffset + 8 > view.byteLength) break;

      const id = view.getUint32(tableOffset, true);
      const offset = section.offset + view.getUint32(tableOffset + 4, true);
      properties.push({ id, offset });

      if (id === 1) {
        codePage = readLegacyCodePage(view, offset) ?? codePage;
      }
    }

    for (const property of properties) {
      const label = labels.get(property.id);
      if (!label) continue;

      const value = readLegacyPropertyValue(view, property.offset, codePage);
      if (value === null || value === '') continue;

      entries.push({ label, value: normalizeWhitespace(String(value)) });
    }
  }

  return entries;
}

function extractLegacyOfficeMetadataFromCfb(cfb: CfbFile): {
  text: string;
  hasDescriptiveMetadata: boolean;
} {
  const entries = [
    {
      name: '\u0005SummaryInformation',
      labels: SUMMARY_PROPERTY_LABELS,
    },
    {
      name: '\u0005DocumentSummaryInformation',
      labels: DOCUMENT_SUMMARY_PROPERTY_LABELS,
    },
  ].flatMap(({ name, labels }) => {
    const content = findCfbEntryBytes(cfb, [name]);
    return content ? parseLegacyPropertySet(content, labels) : [];
  });

  const seen = new Set<string>();
  const lines = entries
    .map((entry) => `${entry.label}: ${entry.value}`)
    .filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    });

  return {
    text: lines.join('\n'),
    hasDescriptiveMetadata: entries.some((entry) => DESCRIPTIVE_LEGACY_METADATA_LABELS.has(entry.label)),
  };
}

function readLegacyUint16(bytes: Uint8Array, offset: number): number | null {
  if (offset < 0 || offset + 2 > bytes.byteLength) return null;
  return new DataView(bytes.buffer, bytes.byteOffset + offset, 2).getUint16(0, true);
}

function readLegacyUint32(bytes: Uint8Array, offset: number): number | null {
  if (offset < 0 || offset + 4 > bytes.byteLength) return null;
  return new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0, true);
}

function cleanLegacyOfficeText(value: string): string {
  return normalizeWhitespace(
    value
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]+/g, ' ')
      .replace(/\r+/g, '\n'),
  );
}

function decodeLegacyWordPiece(
  wordDocument: Uint8Array,
  fileCharacterPosition: number,
  characterCount: number,
): string {
  const isCompressed = (fileCharacterPosition & 0x40000000) !== 0;
  const fileOffset = fileCharacterPosition & 0x3fffffff;

  if (isCompressed) {
    const byteOffset = Math.floor(fileOffset / 2);
    const end = Math.min(wordDocument.byteLength, byteOffset + characterCount);
    if (end <= byteOffset) return '';

    return getLegacyTextDecoder(1252).decode(wordDocument.slice(byteOffset, end));
  }

  const byteOffset = fileOffset;
  const end = Math.min(wordDocument.byteLength, byteOffset + characterCount * 2);
  if (end <= byteOffset) return '';

  return new TextDecoder('utf-16le').decode(wordDocument.slice(byteOffset, end));
}

function extractLegacyWordText(cfb: CfbFile): string {
  const wordDocument = findCfbEntryBytes(cfb, ['WordDocument']);
  if (!wordDocument) return '';

  const flags = readLegacyUint16(wordDocument, 0x0a) ?? 0;
  const tableName = (flags & 0x0200) !== 0 ? '1Table' : '0Table';
  const table = findCfbEntryBytes(cfb, [tableName]);
  if (!table) return '';

  const fcClx = readLegacyUint32(wordDocument, 0x01a2);
  const lcbClx = readLegacyUint32(wordDocument, 0x01a6);
  if (
    fcClx === null ||
    lcbClx === null ||
    lcbClx <= 0 ||
    fcClx < 0 ||
    fcClx + lcbClx > table.byteLength
  ) {
    return '';
  }

  const clx = table.slice(fcClx, fcClx + lcbClx);
  let offset = 0;
  const chunks: string[] = [];

  while (offset < clx.byteLength) {
    const marker = clx[offset];
    offset += 1;

    if (marker === 0x01) {
      const skipLength = readLegacyUint16(clx, offset);
      if (skipLength === null) break;
      offset += 2 + skipLength;
      continue;
    }

    if (marker !== 0x02) break;

    const pieceTableLength = readLegacyUint32(clx, offset);
    if (pieceTableLength === null || pieceTableLength < 4) break;

    const pieceCount = (pieceTableLength - 4) / 12;
    if (!Number.isInteger(pieceCount) || pieceCount <= 0) break;

    const pieceTableOffset = offset + 4;
    const characterPositionsOffset = pieceTableOffset;
    const pieceDescriptorsOffset = characterPositionsOffset + (pieceCount + 1) * 4;
    const pieceTableEnd = pieceTableOffset + pieceTableLength;
    if (pieceTableEnd > clx.byteLength) break;

    for (let index = 0; index < pieceCount; index += 1) {
      const startCp = readLegacyUint32(clx, characterPositionsOffset + index * 4);
      const endCp = readLegacyUint32(clx, characterPositionsOffset + (index + 1) * 4);
      const fileCharacterPosition = readLegacyUint32(clx, pieceDescriptorsOffset + index * 8 + 2);
      if (startCp === null || endCp === null || fileCharacterPosition === null || endCp <= startCp) {
        continue;
      }

      chunks.push(decodeLegacyWordPiece(wordDocument, fileCharacterPosition, endCp - startCp));
    }

    offset = pieceTableEnd;
  }

  return truncateText(cleanLegacyOfficeText(chunks.join('\n')));
}

function isUsefulLegacyPowerPointText(value: string): boolean {
  if (value.length < 3) return false;
  if (/^\*+$/.test(value)) return false;
  if (/^click to edit master/i.test(value)) return false;
  if (/second level third level fourth level fifth level/i.test(value)) return false;
  return hasUsefulLetters(value);
}

function extractLegacyPowerPointText(cfb: CfbFile): string {
  const stream = findCfbEntryBytes(cfb, ['PowerPoint Document']);
  if (!stream) return '';

  const texts: string[] = [];
  const seen = new Set<string>();

  const parseRange = (start: number, end: number) => {
    let offset = start;

    while (offset + 8 <= end) {
      const recordInfo = readLegacyUint16(stream, offset);
      const recordType = readLegacyUint16(stream, offset + 2);
      const recordLength = readLegacyUint32(stream, offset + 4);
      if (recordInfo === null || recordType === null || recordLength === null) break;

      const dataStart = offset + 8;
      const dataEnd = dataStart + recordLength;
      if (recordLength < 0 || dataEnd > end || dataEnd > stream.byteLength) {
        offset += 1;
        continue;
      }

      if (recordType === 4000 || recordType === 4008) {
        const rawText = recordType === 4000
          ? new TextDecoder('utf-16le').decode(stream.slice(dataStart, dataEnd))
          : getLegacyTextDecoder(1252).decode(stream.slice(dataStart, dataEnd));
        const text = cleanLegacyOfficeText(rawText);

        if (isUsefulLegacyPowerPointText(text) && !seen.has(text)) {
          seen.add(text);
          texts.push(text);
        }
      }

      if ((recordInfo & 0x000f) === 0x000f && recordLength > 0) {
        parseRange(dataStart, dataEnd);
      }

      offset = dataEnd;
    }
  };

  parseRange(0, stream.byteLength);
  return truncateText(texts.join('\n'));
}

function isReadableAsciiByte(byte: number) {
  return byte === 9 || byte === 10 || byte === 13 || (byte >= 32 && byte <= 126);
}

function isReadableUtf16CodeUnit(codeUnit: number) {
  return codeUnit === 9 ||
    codeUnit === 10 ||
    codeUnit === 13 ||
    (codeUnit >= 32 && codeUnit <= 0xd7ff) ||
    (codeUnit >= 0xe000 && codeUnit <= 0xfffd);
}

function hasUsefulLetters(value: string) {
  const letters = value.match(/\p{L}/gu)?.length ?? 0;
  return letters >= 4;
}

function collectAsciiStrings(bytes: Uint8Array): string[] {
  const strings: string[] = [];
  let current = '';

  for (const byte of bytes) {
    if (isReadableAsciiByte(byte)) {
      current += String.fromCharCode(byte);
      continue;
    }

    const normalized = normalizeWhitespace(current);
    if (normalized.length >= 4 && hasUsefulLetters(normalized)) {
      strings.push(normalized);
    }
    current = '';
  }

  const normalized = normalizeWhitespace(current);
  if (normalized.length >= 4 && hasUsefulLetters(normalized)) {
    strings.push(normalized);
  }

  return strings;
}

function collectUtf16LeStrings(bytes: Uint8Array): string[] {
  const strings: string[] = [];

  for (const startOffset of [0, 1]) {
    let current = '';

    for (let index = startOffset; index < bytes.length - 1; index += 2) {
      const codeUnit = bytes[index] | (bytes[index + 1] << 8);
      if (isReadableUtf16CodeUnit(codeUnit)) {
        current += String.fromCharCode(codeUnit);
        continue;
      }

      const normalized = normalizeWhitespace(current);
      if (normalized.length >= 4 && hasUsefulLetters(normalized)) {
        strings.push(normalized);
      }
      current = '';
    }

    const normalized = normalizeWhitespace(current);
    if (normalized.length >= 4 && hasUsefulLetters(normalized)) {
      strings.push(normalized);
    }
  }

  return strings;
}

async function extractLegacyOfficeText(file: File, extension: string): Promise<string> {
  const cfb = await readCfbFile(file);
  if (!cfb) return '';

  const metadata = extractLegacyOfficeMetadataFromCfb(cfb);
  const structuredText = extension === 'doc'
    ? extractLegacyWordText(cfb)
    : extension === 'ppt'
      ? extractLegacyPowerPointText(cfb)
      : '';

  if (structuredText) {
    return truncateText([metadata.text, structuredText].filter(Boolean).join('\n'));
  }

  const buffer = await file.slice(0, MAX_LEGACY_OFFICE_SCAN_BYTES).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const seen = new Set<string>();
  const strings = [...collectUtf16LeStrings(bytes), ...collectAsciiStrings(bytes)]
    .map((value) => normalizeWhitespace(value))
    .filter((value) => {
      if (value.length < 4 || value.length > 800 || seen.has(value)) return false;
      seen.add(value);
      return true;
    });

  return truncateText([metadata.text, strings.join('\n')].filter(Boolean).join('\n'));
}

async function extractOfficeText(file: File, extension: string): Promise<string> {
  if (extension === 'xls' || extension === 'xlsx') {
    return extractSpreadsheetWorkbookText(file);
  }

  if (extension === 'doc' || extension === 'ppt') {
    return extractLegacyOfficeText(file, extension);
  }

  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const coreProperties = await extractOoxmlCoreProperties(zip);

  if (extension === 'docx') {
    const xml = await readZipText(zip, 'word/document.xml');
    const documentText = parseXmlText(xml, ['t']);
    return truncateText([...coreProperties, documentText].filter(Boolean).join('\n'));
  }

  if (extension === 'pptx') {
    const slidePaths = await getOrderedPptxSlidePaths(zip);
    const slideIndices = sampleIndices(slidePaths.length, MAX_PPTX_TEXT_SLIDES);
    const slideSections = await Promise.all(slideIndices.map(async (slideIndex) => {
      const slidePath = slidePaths[slideIndex];
      if (!slidePath) return '';
      const slideText = parseXmlText(await readZipText(zip, slidePath), ['t']);
      return slideText ? `Slide ${slideIndex + 1}: ${slideText}` : '';
    }));
    return truncateText([...coreProperties, ...slideSections].filter(Boolean).join('\n'));
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

  if (message === 'empty-text' || message === 'empty-preview') {
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
  if (SPREADSHEET_PREVIEW_EXTENSIONS.has(file.extension)) return extensionIconMap.xls;
  if (file.contentKind === 'text') return extensionIconMap.text;
  if (file.extension === 'pdf') return extensionIconMap.pdf;
  if (file.extension === 'doc') return extensionIconMap.doc;
  if (file.extension === 'docx') return extensionIconMap.docx;
  if (file.extension === 'ppt') return extensionIconMap.ppt;
  if (file.extension === 'pptx') return extensionIconMap.pptx;
  if (file.extension === 'xls') return extensionIconMap.xls;
  if (file.extension === 'xlsx') return extensionIconMap.xlsx;
  return FileText;
}

function getPreviewToneClass(file: DemoFile) {
  if (SPREADSHEET_PREVIEW_EXTENSIONS.has(file.extension)) return styles.RenameDemo__Preview_spreadsheet;
  if (PRESENTATION_PREVIEW_EXTENSIONS.has(file.extension)) return styles.RenameDemo__Preview_presentation;
  if (DOCUMENT_PREVIEW_EXTENSIONS.has(file.extension)) return styles.RenameDemo__Preview_document;
  return '';
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
  const completionSoundRef = useRef<HTMLAudioElement | null>(null);
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

  const getCompletionSound = () => {
    if (!completionSoundRef.current) {
      const sound = new Audio(COMPLETION_SOUND_SRC);
      sound.preload = 'auto';
      sound.volume = 0.5;
      completionSoundRef.current = sound;
    }

    return completionSoundRef.current;
  };

  const primeCompletionSound = () => {
    const sound = getCompletionSound();
    sound.muted = true;
    sound.currentTime = 0;
    void sound.play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
        sound.muted = false;
      })
      .catch(() => {
        sound.muted = false;
        sound.load();
      });
  };

  const playCompletionSound = () => {
    const sound = getCompletionSound();
    sound.muted = false;
    sound.pause();
    sound.currentTime = 0;
    void sound.play().catch(() => undefined);
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
    let shouldPlayCompletionSound = false;
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
        shouldPlayCompletionSound = results.some((result) => Boolean(result?.suggested_name && !result.error));

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
      if (shouldPlayCompletionSound) {
        playCompletionSound();
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length) {
      primeCompletionSound();
      void processFiles(selectedFiles);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (isBusy) return;
    const selectedFiles = Array.from(event.dataTransfer.files ?? []);
    if (selectedFiles.length) {
      primeCompletionSound();
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
          accept='.png,.jpg,.jpeg,.webp,.gif,.bmp,.tif,.tiff,.heic,.heif,.svg,.cr2,.cr3,.nef,.arw,.dng,.orf,.raf,.rw2,.pef,.srw,.sr2,.raw,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.json,.eml,.csv'
          onChange={handleInputChange}
        />

        {!hasFiles ? (
          <div className={styles.RenameDemo__Empty}>
            <Upload size={32} strokeWidth={1.8} aria-hidden='true' />
            <p className={styles.RenameDemo__EmptyTitle}>{copy.emptyTitle}</p>
            <p className={styles.RenameDemo__EmptySubtitle}>{copy.emptySubtitle}</p>
            <Button
              as='button'
              type='button'
              variant='primary'
              size='sm'
              className={styles.RenameDemo__SelectButton}
              onClick={() => inputRef.current?.click()}
              disabled={isBusy}
            >
              {copy.selectFiles}
            </Button>
            <div className={styles.RenameDemo__ChipGroups} aria-label={copy.supportedFormatsLabel}>
              {SUPPORTED_CHIP_GROUPS.map((chips) => (
                <div key={chips.join('-')} className={styles.RenameDemo__Chips}>
                  {chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
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
                    <div
                      className={[
                        styles.RenameDemo__Preview,
                        getPreviewToneClass(file),
                      ].filter(Boolean).join(' ')}
                      aria-hidden='true'
                    >
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
