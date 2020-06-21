import React, { useContext } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import Spinner from '../../common/spinner';
import { AppContext } from '../../context/AppContext';
import usePrayers from '../../hooks/usePrayers';
import { KEYS } from '../../i18n';
import { parseTime } from '../../utils/dates';
import { Table, Tbody, Td, Thead, Tr } from './styles';

const NAMES = require('../../data/prayers.json');

const NAMES_FR = Object.keys(NAMES).map(e => e);

const Monthly = () => {
  const { lang, id } = useContext(AppContext);
  const today = new Date().getDate();

  let prayers = usePrayers(id);

  const table = (
    <>
      {/* TODO: Add an i18n title */}
      <Table>
        <Thead>
          <Tr lang={lang} className="header">
            <Td className="first">
              <FormattedMessage id={KEYS.DAY} />
            </Td>
            {Object.keys(NAMES).map((name: any, i: number) => {
              return <Td key={i}>{NAMES[name][lang]}</Td>;
            })}
          </Tr>
        </Thead>

        <Tbody>
          {Object.entries(prayers || []).map(([_, prayer]: any, i: number) => {
            return (
              <Tr
                lang={lang}
                key={i}
                className={`${
                  new Date(prayer.day).getDate() === today ? 'today' : ''
                }`}>
                <Td className="first">
                  <FormattedDate
                    value={new Date(prayer.day)}
                    month="long"
                    day="numeric"
                    weekday="long"></FormattedDate>
                </Td>
                {NAMES_FR.map((name: string, j: number) => (
                  <Td key={j}>{parseTime(prayer[name])}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );

  return (prayers || []).length > 0 ? table : <Spinner />;
};

export default Monthly;
