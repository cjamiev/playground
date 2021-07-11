import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'components/alert/alertActions';
import { loadMockServerLog, clearMockServerLog } from './mockserverActions';
import Page from 'components/layout';
import { openGlobalModal } from 'components/modal/globalModalActions';
import { copyToClipboard } from 'helper/copy';

const MockLog = () => {
  const dispatch = useDispatch();
  const { log, message } = useSelector(state => state.mockserver);

  useEffect(() => {
    dispatch(loadMockServerLog());
  }, [dispatch]);


  useEffect(() => {
    if(message.message) {
      dispatch(createAlert({ content: message.message, status: message.error ? 'error': 'success' }));
    }
  }, [dispatch, message]);


  const renderCells = log.map(({ timestamp, url, payload }) => {
    return (
      <tr key={timestamp}>
        <td>{timestamp}</td>
        <td>{url}</td>
        <td>
          <button
            className="btn btn--secondary"
            onClick={
              () => {
                dispatch(openGlobalModal({
                  title: 'View Request Details',
                  message: JSON.stringify(payload),
                  action: () => { copyToClipboard(JSON.stringify(payload));
                  }}));
              }
            }>
            Load
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section>
      <h2>Logs</h2><button className="btns" onClick={() => { dispatch(clearMockServerLog());}}>Clear Log</button>
      <p>Run Log must be set to yes in configuration</p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Url</th>
              <th>Payload</th>
            </tr>
          </thead>
          <tbody>{renderCells}</tbody>
        </table>
      </div>
    </section>
  );
};

export default MockLog;