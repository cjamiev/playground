import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import api from 'api';
import MockConfig from './MockConfig';

const mockserverConfig = {
  delay: 1000,
  delayUrls: ['api/test', 'api/test2'],
  log: true,
  error: false,
  overrideUrls: ['api/test', 'api/test2'],
  overrideStatusCode: 200,
  overrideResponse: { testing: 123}
};

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: mockserverConfig
  }
});
api.post.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

const mockConfigProps = {
  mockserver: {
    config: mockserverConfig,
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockConfig', () => {
  it('checks page renders', () => {
    testRenderContainer(MockConfig, {}, mockConfigProps );

    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);

    expect(api.post).toHaveBeenCalledWith('/api/mockserver/config', JSON.stringify(mockserverConfig));
  });
});