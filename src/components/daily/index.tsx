import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import Spinner from '../../common/spinner';
import { AppContext } from '../../context/AppContext';
import { REFRESH_TIME } from '../../context/types';
import usePrayers from '../../hooks/usePrayers';
import { DEFAULT_TIME_FORMAT, TIME_OFFSET } from '../../settings';
import { parseTime } from '../../utils/dates';

const NAMES = require('../../data/prayers.json');

const Daily = () => {
  const { time, lang, dispatch, id } = useContext(AppContext);
  const theme = useContext(ThemeContext);
  const prayers = usePrayers(id, true);
  let prayer = (prayers || [])[0];

  let [diff, setDifference] = useState('');
  let [next, setNextOne] = useState('');

  useEffect(() => {
    if (prayer) {
      const nextOnes = Object.keys(prayer).filter(t =>
        time.isBefore(prayer[t])
      );
      const next = nextOnes.length === 0 ? Object.keys(NAMES)[0] : nextOnes[0];
      setNextOne(next);
      //FIXME: Fix this mess
      const diff = moment(
        moment.utc(prayer[next]).utcOffset(TIME_OFFSET).diff(time)
      ).format(DEFAULT_TIME_FORMAT);

      setDifference(diff);
    }
  }, [time, prayer]);

  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch({ type: REFRESH_TIME, payload: null }),
      1000
    );
    return () => {
      clearTimeout(timeout);
    };
  });

  return prayer ? (
    <ul className={`flex flex-col flex-1 justify-between items-center`}>
      {Object.keys(NAMES).map(name => {
        return (
          <li
            className={`flex w-1/2 justify-between ${
              name === next ? 'font-bold' : ''
            }`}
            key={name}
            lang={lang}>
            <div className="capitalize">{NAMES[name][lang]}</div>
            {name === next && (
              <div className={`${theme.daily.difference}`}>{diff}</div>
            )}
            <div>{parseTime((prayer as any)[name])}</div>
          </li>
        );
      })}
    </ul>
  ) : (
    <Spinner />
  );
};
export default Daily;
