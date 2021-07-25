export const testData = [
  {
    id: 1,
    type: 'checkbox',
    label: 'checkbox1',
    values: [
      {
        label: 'ckvalue1',
        selected: false
      },
      {
        label: 'ckvalue2',
        selected: false
      }
    ],
    orderSeq: 1
  },
  {
    id: 2,
    type: 'color',
    label: 'color1',
    selected: '#ffffff',
    orderSeq: 2
  },
  {
    id: 3,
    type: 'calendar',
    label: 'Calendar1',
    selected: '2021-01-01',
    orderSeq: 3
  },
  {
    id: 4,
    type: 'dropdown',
    label: 'Dropdown1',
    values: [
      {
        label: 'd1',
        selected: false
      },
      {
        label: 'd2',
        selected: false
      }
    ],
    orderSeq: 4
  },
  {
    id: 5,
    type: 'multiselect',
    label: 'MSelect1',
    values: [
      {
        label: 'msvalue1',
        selected: false
      },
      {
        label: 'msvalue2',
        selected: true
      }
    ],
    orderSeq: 5
  },
  {
    id: 6,
    type: 'radio',
    label: 'Radio1',
    values: [
      {
        label: 'rvalue1',
        selected: false
      },
      {
        label: 'rvalue2',
        selected: true
      }
    ],
    required: true,
    orderSeq: 6
  },
  {
    id: 7,
    type: 'range',
    label: 'Range1',
    min: 0,
    max: 10,
    selected: 7,
    orderSeq: 7
  },
  {
    id: 8,
    type: 'select',
    label: 'Select1',
    values: [
      {
        label: 'svalue1',
        selected: false
      },
      {
        label: 'svalue2',
        selected: true
      }
    ],
    orderSeq: 8
  },
  {
    id: 8,
    type: 'swapselect',
    labelOne: 'list1',
    labelTwo: 'list2',
    listOne: [{ label: 'grocery', selected: false }, { label: 'shoes', selected: false }, { label: 'cars', selected: false }],
    listTwo: [{ label: 'electronics', selected: false }],
    orderSeq: 8
  },
  {
    id: 9,
    type: 'text',
    label: 'Text1',
    regex: '[0-9]+',
    errorMessage: 'Please enter a valid number',
    orderSeq: 9
  },
  {
    id: 10,
    type: 'textarea',
    label: 'TextArea1',
    selected: '{}',
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 10
  }
];