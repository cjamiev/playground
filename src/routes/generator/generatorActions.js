import api from 'api';
import { createAlert } from 'components/alert/alertActions';
import { filterOutEmptyKeys } from 'objectHelper';

const ONE_SECOND = 1000;
const ZERO = 0;
const LOAD_GENERATOR_RECORDS = 'LOAD_GENERATOR_RECORDS';

const loadGeneratorRecords = () => {
  return (dispatch) => {
    api
      .get('/db/?name=generator.json')
      .then((response) => {
        dispatch({ type: LOAD_GENERATOR_RECORDS, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updatedGeneratorRecords = (content) => {
  const filteredContent = content.length > ZERO ? content.map(item => {
    const filteredValue = {
      parentBackgroundColor: item.value.parentBackgroundColor,
      normalStyle: filterOutEmptyKeys(item.value.normalStyle),
      hoverStyle: filterOutEmptyKeys(item.value.hoverStyle),
      activeStyle: filterOutEmptyKeys(item.value.activeStyle)
    };

    return { name: item.name, value: filteredValue };
  }) : [];

  return (dispatch) => {
    api
      .post('/db', { filename: 'generator.json', content: JSON.stringify(filteredContent) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: ONE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_GENERATOR_RECORDS, data: filteredContent });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_GENERATOR_RECORDS,
  loadGeneratorRecords,
  updatedGeneratorRecords
};
