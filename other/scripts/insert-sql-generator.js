import fs from 'fs';
export const dataToTransfer = [
  'a',
  'b',
  'c',
];

const result = dataToTransfer.map(item => {
  return `
INSERT INTO public.test(id, type)
VALUES ('${item}', 'test');
`
});

try {
  fs.writeFileSync('output.sql', result.join('\n'), 'utf8');
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err);
}
