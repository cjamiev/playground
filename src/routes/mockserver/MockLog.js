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


  const renderCells = log.map(entry => {
    return (
      <tr key={entry.timestamp}>
        {Object.keys(entry).map(item => {
          const value = entry[item] || 'none';
          if (typeof value === 'object') {
            return (<td key={entry.timestamp + 'load'}><button className="btns" onClick={() => { dispatch(openGlobalModal({ title: 'View Request Details', message: JSON.stringify(value), action: () => { copyToClipboard(JSON.stringify(value)); } }));}}>Load</button></td>);
          } else {
            return <td key={entry.timestamp + value}>{value}</td>;
          }
        })}
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