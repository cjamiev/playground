import { HTTP_STATUS } from 'constants/httpstatus';

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
      label: 'Error All Endpoints?',
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
      type: 'select',
      label: 'Status Code',
      values: Object.keys(HTTP_STATUS).map(item => {
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
  return {
    delay: Number(fields.find(item => item.id === 3).selected),
    delayUrls: fields.find(item => item.id === 4).selected.split(','),
    log: fields.find(item => item.id === 1).values.find(item => item.label === 'Yes').selected,
    error: fields.find(item => item.id === 2).values.find(item => item.label === 'Yes').selected,
    overrideUrls: fields.find(item => item.id === 5).selected.split(','),
    overrideStatusCode: Number(fields.find(item => item.id === 6).values.find(item => item.selected).label),
    overrideResponse: JSON.parse(fields.find(item => item.id === 7).selected)
  };
};