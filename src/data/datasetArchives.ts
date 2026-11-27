/**
 * Public archives of Zush datasets (Zenodo DOIs and Hugging Face mirrors).
 * Published 2026-11-27. Zenodo files are frozen; new data means a new version.
 */

export interface DatasetArchive {
  /** Version DOI, without the https://doi.org/ prefix. */
  doi: string;
  doiUrl: string;
  zenodoUrl: string;
  huggingFaceUrl: string;
}

export const INDEX_ARCHIVE: DatasetArchive = {
  doi: '10.5281/zenodo.24574921',
  doiUrl: 'https://doi.org/10.5281/zenodo.24574921',
  zenodoUrl: 'https://zenodo.org/records/24574921',
  huggingFaceUrl: 'https://huggingface.co/datasets/zushapp/zush-file-renaming-index-2026',
};

export const WINDOWS_RENAMERS_ARCHIVE: DatasetArchive = {
  doi: '10.5281/zenodo.24574947',
  doiUrl: 'https://doi.org/10.5281/zenodo.24574947',
  zenodoUrl: 'https://zenodo.org/records/24574947',
  huggingFaceUrl: 'https://huggingface.co/datasets/zushapp/windows-ai-renamers-test-2026',
};
