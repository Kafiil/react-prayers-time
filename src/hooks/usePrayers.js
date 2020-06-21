import { useEffect, useState } from 'react';
import { API_URL } from '../settings';
import {
  cleanLocalStorage,
  getFromLocalStorageOrApi,
  getStorageKey,
} from '../utils/localStorage';

const byDay = (a, b) => new Date(a.day).getDate() - new Date(b.day).getDate();

export default (cityId, isDayly = false) => {
  const [prayers, setPrayers] = useState(null);

  useEffect(() => {
    async function init() {
      // init prayers on change
      setPrayers(null);

      // Form the key string
      const key = getStorageKey(cityId, isDayly);

      // Form the URL
      let URL = `${API_URL}prayer?lang=fr-fr&cityId=${cityId}&month=${
        new Date().getUTCMonth() + 1
      }`;

      if (isDayly) {
        URL += `&day=${new Date().getUTCDate()}`;
      }

      // Load initial values from localstorage or API
      const initialPrayers = await getFromLocalStorageOrApi(key, URL);
      setPrayers(initialPrayers);

      // Clean the localStorage
      cleanLocalStorage(key);
    }
    init();
  }, [cityId, isDayly]);

  return isDayly ? prayers : (prayers || []).sort(byDay);
};
