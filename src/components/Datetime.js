import React, { useState } from 'react';
import locale from 'date-fns/locale/ko';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useUpdate from '@/hooks/useUpdate';

const distance = (time) => formatDistanceToNow(time, { locale, addSuffix: true });
const Datetime = ({ time }) => {
  const [datetime, setDatetime] = useState(distance(time));
  useUpdate(() => setDatetime(distance(time)), [time]);

  return <span className="datetime">{datetime}</span>;
};

export default Datetime;
