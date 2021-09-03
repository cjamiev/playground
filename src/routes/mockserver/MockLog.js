import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'components/alert/alertActions';
import { loadMockServerLog, clearMockServerLog } from './mockserverActions';
import Page from 'components/layout';
import { openGlobalModal } from 'components/modal/globalModalActions';
import { copyToClipboard } from 'helper/copy';
import Table from 'components/table';
import Button from 'components/button';

const MockLog = () => {
  const dispatch = useDispatch();
  const { log } = useSelector(state => state.mockserver);

  useEffect(() => {
    dispatch(loadMockServerLog());
  }, [dispatch]);

  const renderCells = log.map(({ timestamp, url, payload }, index) => {
    return (
      <tr key={timestamp + index}>
        <td>{timestamp}</td>
        <td>{url}</td>
        <td>
          <Button
            label="Load"
            onClick={
              () => {
                dispatch(openGlobalModal({
                  title: 'View Request Details',
                  message: JSON.stringify(payload),
                  buttonList: [{ label: 'Copy', classProps: { classColor: 'primary' }, action: () => { copyToClipboard(JSON.stringify(payload));}}]
                }));
              }
            } />
        </td>
      </tr>
    );
  });

  return (
    <section>
      <Button label='Clear Log' onClick={() => { dispatch(clearMockServerLog());}} />
      <p>Run Log must be set to yes in configuration</p>
      <Table headers={['Timestamp', 'Url', 'Payload']} body={renderCells}/>
    </section>
  );
};

export default MockLog;