import { add, buildQueryParams, convertDateToWCTDate } from './helper';

describe('The wecantrack API helper', () => {
  describe('The datetime converter', () => {
    it('should correctly convert datetime to wctdate', () => {
      const wctdate = convertDateToWCTDate(new Date('2021-09-29T00:00:00'));
      expect(wctdate).toBe('2021-09-29T00:00:00');
    });

    it('should convert another date format to wctdate', () => {
      const wctdate = convertDateToWCTDate(new Date('2020-05-14 21:26:05'));
      expect(wctdate).toBe('2020-05-14T21:26:05');
    });
  });
  describe('The queryparams creator', () => {
    it('should create a ampersand concated query params string from object', () => {
      const params = buildQueryParams({ a: 'b', c: 'd' });
      expect(params).toBe('a=b&c=d');
    });
    it('should work with arrays', () => {
      const params = buildQueryParams({ a: ['a', 'b'], c: 'd' });
      expect(params).toBe('a[]=a&a[]=b&c=d');
    });
  });
  describe('Comma separation for multiple values', () => {
    it('should add to list of elements', () => {
      const result = add('b', 'a');
      expect(result).toBe('a,b');
    });
    it('should return element if list is empty', () => {
      const result = add('b', '');
      expect(result).toBe('b');
    });
    it('should returln element if list is null', () => {
      const result = add('b', null);
      expect(result).toBe('b');
    });
  });
});
