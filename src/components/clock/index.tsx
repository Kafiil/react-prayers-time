import React, { useContext } from 'react';
import moment from 'moment';

import { AppContext } from '../../context/AppContext';
import { DEFAULT_TIME_FORMAT } from '../../settings';
import { Wrapper, H2, H3 } from './styles';
import { FormattedDate } from 'react-intl';

const Clock = ({ displayClock = false }) => {
  const { time } = useContext(AppContext);

  return (
    <Wrapper>
      <H2>
        <FormattedDate
          value={new Date(time)}
          year="numeric"
          month="long"
          day="numeric"
          weekday="long"></FormattedDate>
      </H2>
      {displayClock && (
        <H3>
          <span>{moment(time).format(DEFAULT_TIME_FORMAT)}</span>
        </H3>
      )}
    </Wrapper>
  );
};

export default Clock;
