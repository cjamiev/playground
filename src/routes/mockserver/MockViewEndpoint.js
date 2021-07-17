import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'components/alert/alertActions';
import { loadMockRequests, updateMockRequests, deleteMockEndpoint, loadMockResponse, updateMockResponse, clearMockResponse } from './mockserverActions';
import Page from 'components/layout';
import { openGlobalModal } from 'components/modal/globalModalActions';
import { copyToClipboard } from 'helper/copy';
import useFilter from 'hooks/useFilter';
import Text from 'components/form/Text';
import Table from 'components/table';
import Button from 'components/button';

const MockViewEndpoint = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const { mocks, mockResponse, message } = useSelector(state => state.mockserver);
  const filteredMocks = useFilter(mocks,'url', filter);

  useEffect(() => {
    dispatch(loadMockRequests());
  }, [dispatch]);

  useEffect(() => {
    if(mockResponse){
      dispatch(openGlobalModal({
        title: 'View Endpoint Details',
        message: JSON.stringify(mockResponse.response),
        editable: true,
        beforeClose: () => { dispatch(clearMockResponse()); },
        dispatchAction: { label: 'Update', action: updateMockResponse, parse: (response) => { return { content: { request: mockResponse.request, response: JSON.parse(response) }};} },
        buttonList: [
          { label: 'Copy Content', classProps: { classColor: 'primary' }, action: () => { copyToClipboard(JSON.stringify(mockResponse)); }},
          { label: 'Copy Response', classProps: { classColor: 'primary' , classSize: 'wide' }, action: () => { copyToClipboard(JSON.stringify(mockResponse.response)); }},
          { label: 'Delete', action: () => { dispatch(deleteMockEndpoint(mockResponse.request)); }}
        ]
      }));
    }
  }, [dispatch, mockResponse]);


  useEffect(() => {
    if(message.message) {
      dispatch(createAlert({ content: message.message, status: message.error ? 'error': 'success' }));
    }
  }, [dispatch, message]);

  const handleFilterChange = ({ selected }) => {
    setFilter(selected);
  };

  const renderCells = filteredMocks.map(({ method, url, responsePath }) => {
    const urlCell = method === 'GET' ? <a className="link list__item" href={url} target="_blank">{url}</a>:<span>{url}</span>;

    return (
      <tr key={`${method}-${url}`}>
        <td>{method}</td>
        <td>{urlCell}</td>
        <td>
          <Button
            label="Load"
            onClick={
              () => {
                dispatch(loadMockResponse({ method, url, responsePath }));
              }
            } />
        </td>
      </tr>
    );
  });

  return (
    <section>
      <Text label='Filter URL:' selected={filter} onChange={handleFilterChange} />
      <div>
        <Table headers={['Method', 'Url', 'Details']} body={renderCells} />
      </div>
    </section>
  );
};

export default MockViewEndpoint;