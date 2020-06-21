import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import messages from './messages';

const Provider = ({ children, locale = 'fr' }) => {
  return (
    <IntlProvider
      textComponent={Fragment}
      locale={locale}
      messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default Provider;
