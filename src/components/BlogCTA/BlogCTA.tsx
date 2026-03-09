import Button from "@/components/Button";
import AppleIcon from "@/components/AppleIcon";
import { DOWNLOAD_URL, APP_STORE_URL } from "@/constants";
import styles from "./BlogCTA.module.scss";

const BlogCTA = () => {
  return (
    <aside className={styles.BlogCTA}>
      <div className={styles.BlogCTA__Content}>
        <p className={styles.BlogCTA__Title}>
          Try Zush — AI image organizer for macOS
        </p>
        <p className={styles.BlogCTA__Description}>
          Automatically rename and tag your images with AI. Monitor folders,
          batch process files, and find everything instantly with Spotlight.
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
        <p className={styles.BlogCTA__Hint}>Free to try — 30 images included</p>
      </div>
    </aside>
  );
};

export default BlogCTA;
