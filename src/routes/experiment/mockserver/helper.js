import { HTTP_STATUS } from 'constants/httpstatus';
import { INDEX_ONE, INDEX_TWO, INDEX_THREE, INDEX_FOUR, INDEX_FIVE, INDEX_SIX, INDEX_SEVEN } from 'constants/array';

export const getNewMockFields = () => {
  return [
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
};

export const mapFieldsToNewMockPayload = (fields) => {
  const optionalFileName = fields.find((item) => item.id === INDEX_ONE).selected;
  const url = fields.find((item) => item.id === INDEX_TWO).selected;
  const method = fields.find((item) => item.id === INDEX_THREE).values.find((item) => item.selected).label;
  const filename = optionalFileName ? optionalFileName : method + url.replace(/\//gm, '-');

  return {
    filename,
    content: {
      request: {
        url,
        method
      },
      response: {
        headers: JSON.parse(fields.find((item) => item.id === INDEX_FOUR).selected),
        status: Number(fields.find((item) => item.id === INDEX_FIVE).values.find((item) => item.selected).label),
        body: JSON.parse(fields.find((item) => item.id === INDEX_SIX).selected),
        conditionalResponse:
          method !== 'GET' ? JSON.parse(fields.find((item) => item.id === INDEX_SEVEN).selected) : undefined
      }
    }
  };
};

export const mapConfigPayloadToFields = (config) => {
  return [
    {
      id: 1,
      type: 'radio',
      label: 'Run Log?',
      values: [
        {
          label: 'Yes',
          selected: config.log
        },
        {
          label: 'No',
          selected: !config.log
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
          selected: config.error
        },
        {
          label: 'No',
          selected: !config.error
        }
      ],
      orderSeq: 2
    },
    {
      id: 3,
      type: 'text',
      label: 'Delay (ms)',
      regex: '[0-9]+',
      selected: config.delay,
      errorMessage: 'Please enter a valid number',
      orderSeq: 3
    },
    {
      id: 4,
      type: 'text',
      label: 'Comma separated Urls, blank = all',
      selected: config.delayUrls.join(','),
      orderSeq: 4
    },
    {
      id: 5,
      type: 'text',
      label: 'Override, enter comma separated Urls',
      selected: config.overrideUrls.join(','),
      orderSeq: 5
    },
    {
      id: 6,
      type: 'dropdown',
      label: 'Status Code',
      values: Object.keys(HTTP_STATUS).map((item) => {
        return {
          label: String(HTTP_STATUS[item]),
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS[item])
        };
      }),
      orderSeq: 6
    },
    {
      id: 7,
      type: 'textarea',
      label: 'Response',
      selected: JSON.stringify(config.overrideResponse),
      jsonType: true,
      errorMessage: 'Please enter valid json',
      orderSeq: 7
    }
  ];
};

export const mapFieldsToConfigPayload = (fields) => {
  const delayUrlsField = fields.find((item) => item.id === INDEX_FOUR).selected.replace(/[ ]{2,}/g, '');
  const overrideUrlsField = fields.find((item) => item.id === INDEX_FIVE).selected.replace(/[ ]{2,}/g, '');

  return {
    delay: Number(fields.find((item) => item.id === INDEX_THREE).selected),
    delayUrls: delayUrlsField ? delayUrlsField.split(',') : [],
    log: fields.find((item) => item.id === INDEX_ONE).values.find((item) => item.label === 'Yes').selected,
    error: fields.find((item) => item.id === INDEX_TWO).values.find((item) => item.label === 'Yes').selected,
    overrideUrls: overrideUrlsField ? overrideUrlsField.split(',') : [],
    overrideStatusCode: Number(fields.find((item) => item.id === INDEX_SIX).values.find((item) => item.selected).label),
    overrideResponse: JSON.parse(fields.find((item) => item.id === INDEX_SEVEN).selected)
  };
};
