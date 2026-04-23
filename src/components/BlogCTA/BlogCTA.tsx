import DownloadButton from '@/components/DownloadButton'
import AppleIcon from '@/components/AppleIcon'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import WindowsIcon from '@/components/WindowsIcon'
import type { BlogPlatform } from '@/data/blogSchema'
import {
  getDownloadUrl,
  getOSLabel,
  getShortRequirements,
} from '@/utils/download'
import downloadStyles from '@/components/DownloadButton/DownloadButton.module.scss'
import styles from './BlogCTA.module.scss'

type BlogCTAPlacement = 'early' | 'inline' | 'footer'

interface BlogCTAProps {
  placement?: BlogCTAPlacement
  platform?: BlogPlatform
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

const BlogCTA = ({ placement = 'footer', platform = 'general' }: BlogCTAProps) => {
  if (platform === 'general') {
    const macTitle = placementTitles[placement]('Mac')
    const windowsTitle = placementTitles[placement]('Windows')
    const macHint = `Free · 50 AI renames · ${getShortRequirements('mac')} · No signup`
    const windowsHint = `Free · 50 AI renames · ${getShortRequirements('windows')} · No signup`

    return (
      <aside
        className={styles.BlogCTA}
        data-placement={placement}
        data-blog-cta-platform='general'
        data-blog-cta-os='mac'
      >
        <div className={styles.BlogCTA__Content}>
          <Heading
            as='h3'
            className={styles.BlogCTA__Title}
            data-blog-cta-title
            data-title-mac={macTitle}
            data-title-windows={windowsTitle}
          >
            {macTitle}
          </Heading>
          <Text as='p' size='sm' color='subtle' className={styles.BlogCTA__Description}>
            {placementDescriptions[placement]}
          </Text>
          <div className={styles.BlogCTA__Buttons}>
            <div
              className={[
                downloadStyles.Group,
                downloadStyles.Group_black,
                downloadStyles.Group_md,
                downloadStyles.Group_single,
              ].join(' ')}
            >
              <a
                className={[downloadStyles.Main, downloadStyles.Main_single].join(' ')}
                href={getDownloadUrl('mac')}
                target='_blank'
                rel='noopener noreferrer'
                data-blog-cta-link
                data-href-mac={getDownloadUrl('mac')}
                data-href-windows={getDownloadUrl('windows')}
              >
                <span className={styles.BlogCTA__ButtonIcon} data-blog-cta-icon='mac'>
                  <AppleIcon />
                </span>
                <span className={styles.BlogCTA__ButtonIcon} data-blog-cta-icon='windows' hidden>
                  <WindowsIcon />
                </span>
                <span data-blog-cta-label>Download for Mac</span>
              </a>
            </div>
          </div>
          <Text
            as='p'
            size='xs'
            color='subtle'
            className={styles.BlogCTA__Hint}
            data-blog-cta-hint
            data-hint-mac={macHint}
            data-hint-windows={windowsHint}
          >
            {macHint}
          </Text>
        </div>
      </aside>
    )
  }

  const resolvedOS = platform === 'windows' ? 'windows' : 'mac'
  const osLabel = getOSLabel(resolvedOS)

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
            forceOS={resolvedOS}
            showDropdown={false}
          />
        </div>
        <Text as='p' size='xs' color='subtle' className={styles.BlogCTA__Hint}>
          Free · 50 AI renames · {getShortRequirements(resolvedOS)} · No signup
        </Text>
      </div>
    </aside>
  )
}

export default BlogCTA
