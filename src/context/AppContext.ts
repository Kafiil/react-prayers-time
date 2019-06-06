import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ar-ma';
import { IState } from './types';
import cities from '../data/cities.json';
import { TIME_OFFSET } from '../settings';

export const initialState: IState = {
  prayers: null,
  cities,
  id: parseInt(localStorage.getItem('id') || '80'),
  lang: localStorage.getItem('lang') || 'fr',
  languages: ['ar', 'fr'],
  time: moment().utcOffset(TIME_OFFSET)
};

export const AppContext = React.createContext(initialState);