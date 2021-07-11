import { useState, useEffect } from 'react';
import { clockBetweenDates } from 'clock';

const useFilter = (data, key, filter) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if(data.length > 0 && key && filter) {
      setFilteredData(data.filter(item => item[key].includes(filter)));
    } else {
      setFilteredData(data);
    }
  }, [data, key, filter]);

  return filteredData;
};

export default useFilter;