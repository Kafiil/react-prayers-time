import React, { useState, useEffect } from 'react';
import 'reset-css';
import './App.css';
import axios from 'axios';
import moment from 'moment';

import Spinner from './common/spinner';
import PrayerCard from './components/prayerCard';
import SelectList from './components/selectList';

const API_URL = 'https://maroc-salat.herokuapp.com/';


/**
 *Delete all items in the localStorage that are not specified as arguments
 *
 * @param {*} args  keys that should not be deleted from localStorage
 */
const cleanLocalStorage = (...args) => {
  Object.keys({ ...localStorage })
    .filter(e => !args.includes(e))
    .forEach(e => localStorage.removeItem(e));
};

const App = () => {
  let [cities, setCities] = useState();
  let [prayers, setPrayers] = useState();
  let [id, setId] = useState(+localStorage.getItem('id') || 1);

  useEffect(() => {
    async function init() {
      const today = moment();
      const PRAYERS_KEY = `prayers_${today.date()}_${today.month()}`;

      //TODO: Extract a custom hook
      const cities = localStorage.getItem('cities')
        ? JSON.parse(localStorage.getItem('cities'))
        : (await axios.get(`${API_URL}city`)).data;

      setCities(cities);
      localStorage.setItem('cities', JSON.stringify(cities));

      const URL = `${API_URL}prayer?month=${today.month()}&day=${today.date()}`;

      const prayers = localStorage.getItem(PRAYERS_KEY)
        ? JSON.parse(localStorage.getItem(PRAYERS_KEY))
        : (await axios.get(URL)).data;
      setPrayers(prayers);
      localStorage.setItem(PRAYERS_KEY, JSON.stringify(prayers));

      cleanLocalStorage('cities', 'id', PRAYERS_KEY);
    }

    init();
  }, []);

  useEffect(() => {
    localStorage.setItem('id', id);
  }, [id]);


  return (
    <div id="main">
      {id && prayers ? (
        <>
          <SelectList value={id} values={cities} onChange={e=>setId(e.value)} />
          <PrayerCard prayer={prayers.find(e => e.id === id)} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App;
