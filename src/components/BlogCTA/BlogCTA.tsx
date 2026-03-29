import Button from '@/components/Button'
import AppleIcon from '@/components/AppleIcon'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import { DOWNLOAD_URL, APP_STORE_URL } from '@/constants'
import styles from './BlogCTA.module.scss'

type BlogCTAPlacement = 'early' | 'inline' | 'footer'

interface BlogCTAProps {
  placement?: BlogCTAPlacement
}

const placementTitles: Record<BlogCTAPlacement, string> = {
  early: 'Rename files faster on Mac',
  inline: 'Automate file renaming on Mac',
  footer: 'Try Zush — AI file organizer for macOS',
}

const placementDescriptions: Record<BlogCTAPlacement, string> = {
  early:
    'Use AI to rename screenshots, PDFs, documents, and downloads before they pile up under useless filenames.',
  inline:
    'Batch rename files, monitor folders, and make your documents and visuals easier to find with descriptive names and metadata.',
  footer:
    'Automatically rename and tag your files with AI. Monitor folders, batch process files, and find everything instantly with Spotlight.',
}

const BlogCTA = ({ placement = 'footer' }: BlogCTAProps) => {
  return (
    <aside className={styles.BlogCTA} data-placement={placement}>
      <div className={styles.BlogCTA__Content}>
        <Heading as='h3' className={styles.BlogCTA__Title}>{placementTitles[placement]}</Heading>
        <Text as='p' size='sm' color='subtle' className={styles.BlogCTA__Description}>
          {placementDescriptions[placement]}
        </Text>
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
        <Text as='p' size='xs' color='subtle' className={styles.BlogCTA__Hint}>Free, no credit card required</Text>
      </div>
    </aside>
  )
}

export default BlogCTA
