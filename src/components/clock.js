import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function clock({ format }) {
  const [time, setTime] = useState(moment());
  const defaultFormat = 'HH:mm:ss';
  useEffect(() => {
    const interval = setInterval(() => setTime(moment()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <span>{moment(time).format(format ? format : defaultFormat)}</span>;
}
