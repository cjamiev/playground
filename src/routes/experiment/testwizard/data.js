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

export const testData = [sectionOne, sectionTwo, sectionThree];
export const testTitles = ['Section One', 'Section Two', 'Section Three'];