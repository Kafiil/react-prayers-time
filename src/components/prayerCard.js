import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { timesFromStringtoDate } from '../utils/dates';
import { toTitleCase } from '../utils/strings';
import Clock from './clock';
const NAMES = require('../data/prayers');

const PrayerCard = ({ prayer }) => {
  let [difference, setDifference] = useState();
  let [nextOne, setNextOne] = useState();
  const times = timesFromStringtoDate(prayer);

  const updateDifference = () => {
    const nextOnes = Object.keys(times).filter(t =>
      moment().isBefore(times[t])
    );
    nextOne = nextOnes.length === 0 ? NAMES[0] : nextOnes[0];
    setNextOne(nextOne);
    const diff = moment(times[nextOne].diff(moment())).format('HH:mm');
    setDifference(diff);
  };

  useEffect(() => {
    updateDifference();
    const interval = setInterval(updateDifference, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [prayer]);

  let date = toTitleCase(moment(prayer.date).format('dddd LL'));

  return (
    <div className="card">
      <h1>{prayer.city}</h1>
      <h2>{date}</h2>
      <h2>
        <Clock />
      </h2>
      <ul>
        {NAMES.map(name => {
          return (
            <li key={name} className={name === nextOne ? 'next-prayer' : ''}>
              <span className="name">{name}</span>
              <span className="time">{prayer[name]}</span>
              {name === nextOne && (
                <span className="difference">{difference}</span>
              )}
            </li>
          );
        })}
      </ul>
      <dl />
    </div>
  );
};

export default PrayerCard;
