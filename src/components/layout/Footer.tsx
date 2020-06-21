import React from 'react';
import { useCurrentTheme } from '../../context/AppContext';

function Footer() {
  const theme = useCurrentTheme();
  return (
    <footer className={`${theme.header.container} p-2`}>
      Salat
      <span className="m-2" role="img" aria-label="Makkah">
        🕋
      </span>
      @ 2020
    </footer>
  );
}

export default Footer;
