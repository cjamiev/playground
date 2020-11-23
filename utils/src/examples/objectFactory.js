const clipmark = ({
  clipboards = [],
  commands = [],
  dates = [],
  resources = [],
  urls = []
} = {}) => ({
  clipboards,
  commands,
  dates,
  resources,
  urls,

  getClipboards: () => {
    return clipboards;
  },
  getClipboardGroup: (group) => {
    return clipboards.filter(entry => entry.group === group);
  }
});

const structure = ({
  name = '',
  group = '',
  value = ''
} = {}) => ({
  name,
  group,
  value
});

const dummy = {
  clipboards: [
    {
      'name': 'test123',
      'value': 'test123',
      'group': '1'
    },
    {
      'name': 'test234',
      'value': 'test234',
      'group': '1'
    },
    {
      'name': 'test345',
      'value': 'test345',
      'group': '2'
    }
  ]
};

const test = clipmark(dummy);
const allClipboards = test.getClipboards();
const group1Clips = test.getClipboardGroup('1');

console.log(allClipboards);
console.log(group1Clips);