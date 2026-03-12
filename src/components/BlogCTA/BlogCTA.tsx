import Button from '@/components/Button'
import AppleIcon from '@/components/AppleIcon'
import { DOWNLOAD_URL, APP_STORE_URL } from '@/constants'
import styles from './BlogCTA.module.scss'

type BlogCTAPlacement = 'early' | 'inline' | 'footer'

interface BlogCTAProps {
  placement?: BlogCTAPlacement
}

const placementTitles: Record<BlogCTAPlacement, string> = {
  early: 'Rename images faster on Mac',
  inline: 'Automate image renaming on Mac',
  footer: 'Try Zush — AI image organizer for macOS',
}

const placementDescriptions: Record<BlogCTAPlacement, string> = {
  early:
    'Use AI to rename screenshots, photos, and downloads before they pile up under useless filenames.',
  inline:
    'Batch rename files, monitor folders, and make images easier to find with descriptive names and metadata.',
  footer:
    'Automatically rename and tag your images with AI. Monitor folders, batch process files, and find everything instantly with Spotlight.',
}

const BlogCTA = ({ placement = 'footer' }: BlogCTAProps) => {
  return (
    <aside className={styles.BlogCTA} data-placement={placement}>
      <div className={styles.BlogCTA__Content}>
        <p className={styles.BlogCTA__Title}>{placementTitles[placement]}</p>
        <p className={styles.BlogCTA__Description}>
          {placementDescriptions[placement]}
        </p>
        <div className={styles.BlogCTA__Buttons}>
          <Button
            as="a"
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="black"
            size="md"
          >
            <AppleIcon />
            Download
          </Button>
          <Button
            as="a"
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="md"
          >
            <AppleIcon />
            Mac App Store
          </Button>
        </div>
        <p className={styles.BlogCTA__Hint}>Free, no credit card required</p>
      </div>
    </aside>
  )
}

export default BlogCTA
