import moment from 'moment';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import cities from '../data/cities.json';
import { TIME_OFFSET } from '../settings';
import { IState } from './types';

export const initialState: IState = {
  cities,
  id: parseInt(localStorage.getItem('id') || '80'),
  lang: localStorage.getItem('lang') || 'ar-ma',
  languages: ['ar-ma', 'fr-fr'], //TODO: This should not be here
  time: moment().utcOffset(TIME_OFFSET),
  theme: localStorage.getItem('theme') || 'light',
  periodicity: localStorage.getItem('periodicity') || 'daily',
  dispatch: () => ({}),
};

export const AppContext = React.createContext<IState>(initialState);

export const useCurrentTheme = () => useContext(ThemeContext);
