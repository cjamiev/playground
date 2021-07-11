import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'components/alert/alertActions';
import { loadMockRequests, updateMockRequests, deleteMockEndpoint, loadMockResponse, updateMockResponse } from './mockserverActions';
import Page from 'components/layout';
import { openGlobalModal } from 'components/modal/globalModalActions';
import { copyToClipboard } from 'helper/copy';

const MockViewEndpoint = () => {
  const dispatch = useDispatch();
  const { mocks, mockResponse, message } = useSelector(state => state.mockserver);

  useEffect(() => {
    dispatch(loadMockRequests());
  }, [dispatch]);

  useEffect(() => {
    if(mockResponse){
      dispatch(openGlobalModal({
        title: 'View Endpoint Details',
        message: JSON.stringify(mockResponse.response),
        editable: true,
        dispatchAction: { label: 'Update', action: updateMockResponse, parse: (response) => { return { content: { request: mockResponse.request, response: JSON.parse(response) }};} },
        buttonList: [
          { label: 'Copy Content', primary: true, action: () => { copyToClipboard(JSON.stringify(mockResponse));}},
          { label: 'Copy Response', primary: true, action: () => { copyToClipboard(JSON.stringify(mockResponse.response));}}
        ]
      }));
    }
  }, [dispatch, mockResponse]);


  useEffect(() => {
    if(message.message) {
      dispatch(createAlert({ content: message.message, status: message.error ? 'error': 'success' }));
    }
  }, [dispatch, message]);


  const renderCells = mocks.map(({ method, url, responsePath }) => {
    return (
      <tr key={`${method}-${url}`}>
        <td>{method}</td>
        <td>{url}</td>
        <td>
          <button
            className="btn btn--secondary"
            onClick={
              () => {
                dispatch(loadMockResponse({ method, url, responsePath }));
              }
            }>
            Load
          </button>
          <button
            className="btn btn--secondary"
            onClick={
              () => { dispatch(deleteMockEndpoint({ method, url, responsePath })); }
            }>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section>
      <div>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Url</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{renderCells}</tbody>
        </table>
      </div>
    </section>
  );
};

export default MockViewEndpoint;