import React from 'React';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import api from 'api';
import MockCreateEndpoint from './MockCreateEndpoint';
import Page from 'components/layout/Page';
import {
  getNewMockFields,
  mapFieldsToNewMockPayload,
  mapConfigPayloadToFields,
  mapFieldsToConfigPayload
} from './helper';

const payload = JSON.stringify(mapFieldsToNewMockPayload(getNewMockFields()));

jest.mock('api');
api.post.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

const mockCreateEndpointProps = {
  mockserver: {
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockCreateEndpoint', () => {
  it('checks page renders', () => {
    reduxTestWrapper(MockCreateEndpoint, {}, mockCreateEndpointProps);

    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);

    expect(api.post).toHaveBeenCalledWith('/mockserver/createMockEndpoint', payload);
  });

  it('handle onChange', () => {
    reduxTestWrapper(MockCreateEndpoint, {}, mockCreateEndpointProps);

    const methodBtn = screen.getByText('Method GET');
    fireEvent.click(methodBtn);
    const postOption = screen.getByText('POST');
    fireEvent.click(postOption);

    expect(screen.getByText('Method POST')).toBeInTheDocument();
  });
});
