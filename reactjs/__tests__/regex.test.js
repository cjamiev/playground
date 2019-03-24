import { INTEGER_REGEX, DOLLAR_REGEX } from '../src/constants/regex';

describe('constants/regex', () => {
  describe('INTEGER_REGEX', () => {
    it('Single Digit', () => {
      expect(INTEGER_REGEX.test(1)).toBeTruthy();
    });

    it('Double Digit', () => {
      expect(INTEGER_REGEX.test(11)).toBeTruthy();
    });

    it('Decimal', () => {
      expect(INTEGER_REGEX.test(20.50)).toBeFalsy();
    });

    it('Character', () => {
      expect(INTEGER_REGEX.test('1a')).toBeFalsy();
    });
  });

  describe('DOLLAR_REGEX', () => {
    it('Single Digit', () => {
      expect(DOLLAR_REGEX.test(1)).toBeTruthy();
    });

    it('Double Digit', () => {
      expect(DOLLAR_REGEX.test(11)).toBeTruthy();
    });

    it('Zero digits after decimal', () => {
      expect(DOLLAR_REGEX.test(20.)).toBeTruthy();
    });

    it('One digits after decimal', () => {
      expect(DOLLAR_REGEX.test(20.5)).toBeTruthy();
    });

    it('Two digits after decimal', () => {
      expect(DOLLAR_REGEX.test(20.50)).toBeTruthy();
    });

    it('Three digits after decimal', () => {
      expect(DOLLAR_REGEX.test(20.505)).toBeFalsy();
    });

    it('Character', () => {
      expect(DOLLAR_REGEX.test('1a')).toBeFalsy();
    });
  });
});
