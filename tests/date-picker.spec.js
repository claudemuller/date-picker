import {DatePicker} from '../src/js/modules/date-picker';

describe('DatePicker module', function () {
  it('should return an Object', function () {
    // Arrange
    const expected = 'object',
      actual = typeof DatePicker();

    // Act

    // Assert
    expect(actual).toBe(expected);
  });

  it('should not return undefined', function () {
    // Arrange
    const expected = undefined,
      actual = DatePicker();

    // Act

    // Assert
    expect(actual).not.toBe(expected);
  });
});
