import { useEffect } from 'react';
import useThemeStore from '../../utils/themeStore';
import { applyThemePreference } from '../../utils/toggleDarkLightTheme';
import MoonIcon from './ThemeIcons/moon.svg?react';
import SunIcon from './ThemeIcons/sun.svg?react';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  return (
    <button
      className='bg-teal dark:bg-sherpaBlue text-white'
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <MoonIcon className='text-white w-[30px] h-[30px]' />
      ) : (
        <SunIcon className='text-white w-[30px] h-[30px]' />
      )}
    </button>
  );
};
