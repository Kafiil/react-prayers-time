import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { timesFromStringtoDate } from '../utils/dates';
import { toTitleCase } from '../utils/strings';
const NAMES = require('../data/prayers');

//TODO: extract to a lib

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

  let date = toTitleCase(
    moment(prayer.date)
      // .locale(local)
      .format('dddd LL')
  );

  // toTitleCase function does not work for arabic
  // if (local !== 'ar') {
  //   date = toTitleCase(date);
  // }

  return (
    <div className="card">
      {/* <h1>{prayer.city}</h1> */}
      <h2>{date}</h2>
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
