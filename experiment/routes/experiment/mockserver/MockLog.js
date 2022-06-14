import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMockServerLog, clearMockServerLog } from './mockserverActions';
import Page from 'components/layout';
import { openGlobalModal } from 'components/molecules/Global/globalActions';
import { copyToClipboard } from 'helper/copy';
import Table from 'components/atoms/Table';
import Button from 'components/atoms/Button';

const MockLog = () => {
  const dispatch = useDispatch();
  const { log } = useSelector((state) => state.mockserver);

  useEffect(() => {
    dispatch(loadMockServerLog());
  }, [dispatch]);

  const renderCells = log.map(({ timestamp, url, payload }, index) => {
    return (
      <tr key={timestamp + index} className="flex--horizontal">
        <td className="flex--one">{timestamp}</td>
        <td className="flex--one horizontal-center">
          <Button
            label="Load"
            onClick={() => {
              dispatch(
                openGlobalModal({
                  title: 'View Request Details',
                  message: JSON.stringify(payload),
                  buttonList: [
                    {
                      label: 'Copy',
                      classProps: { classColor: 'primary' },
                      action: () => {
                        copyToClipboard(JSON.stringify(payload));
                      }
                    }
                  ]
                })
              );
            }}
          />
        </td>
        <td className="flex--five">{url}</td>
      </tr>
    );
  });

  return (
    <section>
      <Button
        isPrimary
        label="Clear Log"
        onClick={() => {
          dispatch(clearMockServerLog());
        }}
      />
      <p>Run Log must be set to yes in configuration</p>
      <Table
        headers={[
          { label: 'Timestamp', className: 'flex--one' },
          { label: 'Payload', className: 'flex--one' },
          { label: 'Url', className: 'flex--five' }
        ]}
        body={renderCells}
      />
    </section>
  );
};

export default MockLog;
