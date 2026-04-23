import Navbar from '@/components/Navbar';
import { useTheme } from '@/hooks/useTheme';
import type { DownloadOS } from '@/utils/download';

interface ThemeNavbarProps {
  forceOS?: DownloadOS;
  basePath?: string;
}

const ThemeNavbar = ({ forceOS, basePath }: ThemeNavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return <Navbar theme={theme} toggleTheme={toggleTheme} forceOS={forceOS} basePath={basePath} />;
};

export default ThemeNavbar;
