import React, { ReactNode, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
interface ILayoutProps {
  children: ReactNode;
}
function DefaultLayout({ children }: ILayoutProps) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={`flex flex-col min-h-screen px-4 container mx-auto ${theme.defaultLayout.container}`}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
