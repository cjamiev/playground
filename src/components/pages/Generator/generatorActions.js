import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';

const THREE_SECOND = 3000;
const ZERO = 0;
const LOAD_GENERATOR_RECORDS = 'LOAD_GENERATOR_RECORDS';

const loadGeneratorRecords = () => {
  return (dispatch) => {
    api
      .get('/file/?name=generator.json')
      .then((response) => {
        dispatch({ type: LOAD_GENERATOR_RECORDS, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updatedGeneratorRecords = (content) => {
  return (dispatch) => {
    api
      .post('/file', { filename: 'generator.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: THREE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_GENERATOR_RECORDS, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { LOAD_GENERATOR_RECORDS, loadGeneratorRecords, updatedGeneratorRecords };
