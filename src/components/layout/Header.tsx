import React from 'react';
import { useCurrentTheme } from '../../context/AppContext';
import LanguageToggle from '../LanguageToggle';
import ThemeToggle from '../ThemeToggle';

function Header() {
  const theme = useCurrentTheme();
  return (
    <header className={`flex justify-between p-2 ${theme.header.container} `}>
      <LanguageToggle />
      <ThemeToggle />
    </header>
  );
}

export default Header;
