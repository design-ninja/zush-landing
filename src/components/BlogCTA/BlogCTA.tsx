import DownloadButton from '@/components/DownloadButton'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import { useOS } from '@/hooks/useOS'
import { getOSLabel, getShortRequirements } from '@/utils/download'
import styles from './BlogCTA.module.scss'

type BlogCTAPlacement = 'early' | 'inline' | 'footer'

interface BlogCTAProps {
  placement?: BlogCTAPlacement
}

const placementTitles: Record<BlogCTAPlacement, (osLabel: string) => string> = {
  early: (os) => `Rename files in one click on ${os}`,
  inline: (os) => `Automate file renaming on ${os}`,
  footer: (os) => `Stop renaming files by hand — get Zush for ${os}`,
}

const placementDescriptions: Record<BlogCTAPlacement, string> = {
  early:
    'Zush uses AI to rename screenshots, PDFs, documents, and downloads before they pile up. 50 free renames, no signup.',
  inline:
    'Batch rename files, monitor folders, and make your documents and visuals easier to find with descriptive names and metadata.',
  footer:
    'AI renaming, folder monitoring and search-friendly names. 50 free renames to start — one-time $10 Pro, no subscription.',
}

const BlogCTA = ({ placement = 'footer' }: BlogCTAProps) => {
  const { downloadOS } = useOS()
  const osLabel = getOSLabel(downloadOS)

  return (
    <aside className={styles.BlogCTA} data-placement={placement}>
      <div className={styles.BlogCTA__Content}>
        <Heading as='h3' className={styles.BlogCTA__Title}>{placementTitles[placement](osLabel)}</Heading>
        <Text as='p' size='sm' color='subtle' className={styles.BlogCTA__Description}>
          {placementDescriptions[placement]}
        </Text>
        <div className={styles.BlogCTA__Buttons}>
          <DownloadButton
            source='blog-cta'
            size='md'
            label={`Download for ${osLabel}`}
            showDropdown={false}
          />
        </div>
        <Text as='p' size='xs' color='subtle' className={styles.BlogCTA__Hint}>
          Free · 50 AI renames · {getShortRequirements(downloadOS)} · No signup
        </Text>
      </div>
    </aside>
  )
}

export default BlogCTA
