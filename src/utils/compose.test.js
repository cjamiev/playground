import { pipe } from './compose';

it(':pipe', () => {
  const pipeline = pipe([x => x * 2, x => x / 3, x => x > 5, b => !b]);

  expect(pipeline(5)).toBeTruthy();
  expect(pipeline(20)).toBeFalsy();
});
