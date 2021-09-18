import { convert12HourTo24HourClock, convert24HourTo12HourClock } from './helper';

describe('helper (form)', () => {
  describe('convert12HourTo24HourClock', () => {
    it('at 12am', () => {
      const result = convert12HourTo24HourClock(12, false);

      expect(result).toEqual(0);
    });

    it('at 1am', () => {
      const result = convert12HourTo24HourClock(1, false);

      expect(result).toEqual(1);
    });

    it('at 12pm', () => {
      const result = convert12HourTo24HourClock(12, true);

      expect(result).toEqual(12);
    });


    it('at 1pm', () => {
      const result = convert12HourTo24HourClock(1, true);

      expect(result).toEqual(13);
    });

    it('at 11pm', () => {
      const result = convert12HourTo24HourClock(11, true);

      expect(result).toEqual(23);
    });
  });

  describe('convert24HourTo12HourClock', () => {
    it('at 0', () => {
      const result = convert24HourTo12HourClock(0);

      expect(result).toEqual({ hour: 12, isPm: false });
    });

    it('at 1', () => {
      const result = convert24HourTo12HourClock(1);

      expect(result).toEqual({ hour: 1, isPm: false });
    });

    it('at 12', () => {
      const result = convert24HourTo12HourClock(12);

      expect(result).toEqual({ hour: 12, isPm: true });
    });


    it('at 13', () => {
      const result = convert24HourTo12HourClock(13);

      expect(result).toEqual({ hour: 1, isPm: true });
    });

    it('at 23', () => {
      const result = convert24HourTo12HourClock(23);

      expect(result).toEqual({ hour: 11, isPm: true });
    });
  });

});