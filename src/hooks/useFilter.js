import { useState, useEffect } from 'react';
import { clockBetweenDates } from 'clock';

const ZERO = 0;

const useFilter = (data, key, filter) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data.length > ZERO && key && filter) {
      setFilteredData(data.filter((item) => item[key].includes(filter)));
    } else {
      setFilteredData(data);
    }
  }, [data, key, filter]);

  return filteredData;
};

export default useFilter;
