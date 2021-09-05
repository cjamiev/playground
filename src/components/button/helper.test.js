import { getColor, getSize } from './helper';

describe('helper (Button)', () => {
  it('getColor - default', () => {
    expect(getColor()).toEqual('');
  });

  it('getColor - primary', () => {
    expect(getColor('primary')).toEqual(' btn--primary');
  });

  it('getColor - secondary', () => {
    expect(getColor('secondary')).toEqual(' btn--secondary');
  });

  it('getColor - inherit', () => {
    expect(getColor('inherit')).toEqual(' btn--inherit');
  });

  it('getSize - false', () => {
    expect(getSize(false)).toEqual('');
  });

  it('getSize - true', () => {
    expect(getSize(true)).toEqual(' btn--small');
  });
});