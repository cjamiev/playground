const sectionOne = [
  {
    id: 1,
    type: 'text',
    label: 'Text1',
    regex: '[0-9]+',
    errorMessage: 'Please enter a valid number',
    orderSeq: 1
  }
];

const sectionTwo = [
  {
    id: 1,
    type: 'text',
    label: 'Text2',
    required: true,
    orderSeq: 1
  }
];

const sectionThree = [
  {
    id: 1,
    type: 'text',
    label: 'Text3',
    orderSeq: 1
  }
];

export const formData = [
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
    orderSeq: 2
  },
  {
    id: 3,
    type: 'color',
    label: 'color1',
    selected: '#ffffff',
    orderSeq: 3
  },
  {
    id: 4,
    type: 'range',
    label: 'Range1',
    min: 0,
    max: 10,
    selected: 7,
    orderSeq: 4
  },
  {
    id: 5,
    type: 'text',
    label: 'Text1',
    regex: '[0-9]+',
    errorMessage: 'Please enter a valid number',
    orderSeq: 5
  },
  {
    id: 6,
    type: 'textarea',
    label: 'TextArea1',
    selected: '{}',
    jsonType: true,
    errorMessage: 'Please enter valid json',
    orderSeq: 6
  },
  {
    id: 7,
    type: 'calendar',
    label: 'Calendar1',
    selected: '2021-01-01',
    orderSeq: 7
  },
  {
    id: 8,
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
    orderSeq: 8
  },
  {
    id: 9,
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
    orderSeq: 9
  },
  {
    id: 10,
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
    orderSeq: 10
  },
  {
    id: 11,
    type: 'swapselect',
    labelOne: 'list1',
    labelTwo: 'list2',
    listOne: [
      { label: 'grocery', selected: false },
      { label: 'shoes', selected: false },
      { label: 'cars', selected: false }
    ],
    listTwo: [{ label: 'electronics', selected: false }],
    orderSeq: 11
  }
];

export const testData = [sectionOne, sectionTwo, sectionThree];
export const testTitles = ['Section One', 'Section Two', 'Section Three'];
