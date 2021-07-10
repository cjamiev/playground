import { HTTP_STATUS } from 'constants/httpstatus';
import { mapConfigPayloadToFields, mapFieldsToConfigPayload } from './helper';

const fields = [
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
    label: 'Error All Endpoints?',
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
    type: 'select',
    label: 'Status Code',
    values: Object.keys(HTTP_STATUS).map(item => {
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
    selected: '{\"testing\":123}',
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 7
  }
];

const payload = {
  delay: 1000,
  delayUrls: ['api/test', 'api/test2'],
  log: true,
  error: false,
  overrideUrls: ['api/test', 'api/test2'],
  overrideStatusCode: 200,
  overrideResponse: { testing: 123}
};

describe('helper (mockserver)', () => {
  it('mapConfigPayloadToFields', () => {
    expect(mapConfigPayloadToFields(payload)).toEqual(fields);
  });

  it('mapFieldsToConfigPayload', () => {
    expect(mapFieldsToConfigPayload(fields)).toEqual(payload);
  });
});