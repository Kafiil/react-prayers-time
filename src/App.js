import React, { useState, useEffect } from 'react';
import 'reset-css';
import './App.css';
import moment from 'moment';
import {
  PDFDownloadLink,
  Page,
  Font,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer';

import Spinner from './common/spinner';
import PrayerCard from './components/prayerCard';
import SelectList from './components/selectList';
import { useLocalStorage } from './utils/customHooks';
import {
  cleanLocalStorage,
  getFromLocalStorageOrApi
} from './utils/localStorage';

const API_URL = 'https://maroc-salat.herokuapp.com/';
const NAMES = require('./data/prayers')

// Register font
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    backgroundImage:'url(img/bg.png) no-repeat top center',
    fontFamily: 'Oswald'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = ({prayer}) => (
  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Prayers times in {prayer.city}</Text>
        <Text>{moment(prayer.date).format('dddd LL')}</Text>
      {NAMES.map(e=>{
        return <Text>{e} : {prayer[e]}</Text>
      })}

      </View>
    </Page>
  </Document>
);

const App = () => {
  const [id, setId] = useLocalStorage('id', 1);
  const [cities, setCities] = useState();
  const [prayers, setPrayers] = useState();
  const PRAYERS_KEY = `prayers_${moment().date()}_${moment().month() + 1}`;
  const URL = `${API_URL}prayer?month=${moment().month()}&day=${moment().date()}`;

  useEffect(() => {
    async function init() {
      const initalCities = await getFromLocalStorageOrApi(
        'cities',
        `${API_URL}city`
      );
      setCities(initalCities);
      const initialPrayers = await getFromLocalStorageOrApi(PRAYERS_KEY, URL);
      setPrayers(initialPrayers);

      cleanLocalStorage('id', 'cities', PRAYERS_KEY);
    }
    init();
  }, []);

  // const downloadPdf = () => {
  //   ReactPDF.render(<MyDocument />, `example.pdf`);
  // };

  return (
    <div id="main">
      {id && prayers ? (
        <>
          <PrayerCard prayer={prayers.find(e => e.id === id)} />
          <SelectList
            value={id}
            values={cities}
            onChange={e => setId(e.value)}
          />
          <div>
            <PDFDownloadLink document={<MyDocument prayer={prayers.find(e => e.id === id)} />} fileName={`${moment()}.pdf`}>
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App;
