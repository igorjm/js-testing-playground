const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Igor',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Igor&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Igor',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Igor&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Igor',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Igor&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Igor',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Igor&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Igor',
    });
  });

  it('should convert a query string to an object taking care of comma separeted values', () => {
    const qs = 'name=Igor&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Igor',
      abilities: ['JS', 'TDD'],
    });
  });
});
