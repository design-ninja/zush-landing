import Navbar from '@/components/Navbar';
import { useTheme } from '@/hooks/useTheme';

const ThemeNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return <Navbar theme={theme} toggleTheme={toggleTheme} />;
};

export default ThemeNavbar;
