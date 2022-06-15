import { HTTP_STATUS } from 'constants/httpstatus';
import {
  getNewMockFields,
  mapFieldsToNewMockPayload,
  mapConfigPayloadToFields,
  mapFieldsToConfigPayload
} from './helper';

const newmockFields = [
  {
    id: 1,
    type: 'text',
    label: 'Optional File Name',
    selected: '',
    orderSeq: 1
  },
  {
    id: 2,
    type: 'text',
    label: 'Url',
    selected: '/test',
    orderSeq: 2
  },
  {
    id: 3,
    type: 'dropdown',
    label: 'Method',
    values: [
      {
        label: 'GET',
        selected: true
      },
      {
        label: 'POST',
        selected: false
      }
    ],
    orderSeq: 3
  },
  {
    id: 4,
    type: 'textarea',
    label: 'Headers',
    selected: JSON.stringify({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 4
  },
  {
    id: 5,
    type: 'dropdown',
    label: 'Status Code',
    values: Object.keys(HTTP_STATUS).map((item) => {
      return {
        label: String(HTTP_STATUS[item]),
        selected: Boolean(HTTP_STATUS.OK === HTTP_STATUS[item])
      };
    }),
    orderSeq: 5
  },
  {
    id: 6,
    type: 'textarea',
    label: 'Body',
    selected: JSON.stringify({
      test: 'testing get'
    }),
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 6
  },
  {
    id: 7,
    type: 'textarea',
    label: 'Conditional Response',
    selected: JSON.stringify([
      {
        payload: {
          key: 'condition'
        },
        body: {
          test: 'testing conditional post'
        }
      }
    ]),
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 7
  }
];

const newmockPayload = {
  filename: 'GET-test',
  content: {
    request: {
      url: '/test',
      method: 'GET'
    },
    response: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        test: 'testing get'
      }
    }
  }
};

const configFields = [
  {
    id: 1,
    type: 'radio',
    label: 'Run Log?',
    values: [
      {
        label: 'Yes',
        selected: true
      },
      {
        label: 'No',
        selected: false
      }
    ],
    orderSeq: 1
  },
  {
    id: 2,
    type: 'radio',
    label: 'Error All?',
    values: [
      {
        label: 'Yes',
        selected: false
      },
      {
        label: 'No',
        selected: true
      }
    ],
    orderSeq: 2
  },
  {
    id: 3,
    type: 'text',
    label: 'Delay (ms)',
    regex: '[0-9]+',
    selected: 1000,
    errorMessage: 'Please enter a valid number',
    orderSeq: 3
  },
  {
    id: 4,
    type: 'text',
    label: 'Comma separated Urls, blank = all',
    selected: 'api/test,api/test2',
    orderSeq: 4
  },
  {
    id: 5,
    type: 'text',
    label: 'Override, enter comma separated Urls',
    selected: 'api/test,api/test2',
    orderSeq: 5
  },
  {
    id: 6,
    type: 'dropdown',
    label: 'Status Code',
    values: Object.keys(HTTP_STATUS).map((item) => {
      return {
        label: String(HTTP_STATUS[item]),
        selected: Boolean(HTTP_STATUS[item] === HTTP_STATUS.OK)
      };
    }),
    orderSeq: 6
  },
  {
    id: 7,
    type: 'textarea',
    label: 'Response',
    selected: '{"testing":123}',
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 7
  }
];

const configPayload = {
  delay: 1000,
  delayUrls: ['api/test', 'api/test2'],
  log: true,
  error: false,
  overrideUrls: ['api/test', 'api/test2'],
  overrideStatusCode: 200,
  overrideResponse: { testing: 123 }
};

describe.skip('helper (mockserver)', () => {
  it('getNewMockFields', () => {
    expect(getNewMockFields()).toEqual(newmockFields);
  });

  it('mapFieldsToNewMockPayload', () => {
    expect(mapFieldsToNewMockPayload(newmockFields)).toEqual(newmockPayload);
  });

  it('mapConfigPayloadToFields', () => {
    expect(mapConfigPayloadToFields(configPayload)).toEqual(configFields);
  });

  it('mapFieldsToConfigPayload', () => {
    expect(mapFieldsToConfigPayload(configFields)).toEqual(configPayload);
  });
});
