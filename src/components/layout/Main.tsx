import React, { ReactNode, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { AppContext } from '../../context/AppContext';

const Wrapper = styled.main`
  direction: ${props => (props.lang === 'ar-ma' ? 'rtl' : 'ltr')};
  flex-grow: 1;
`;

function Main({ children }: { children: ReactNode }) {
  const theme = useContext(ThemeContext);
  const context = useContext(AppContext);
  return (
    <Wrapper
      lang={context.lang}
      className={`flex flex-col p-2 ${theme.main.container}`}>
      {children}
    </Wrapper>
  );
}

export default Main;
