import { describe, test, expect, it } from 'vitest';

function capitalizeFirstLetter(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
it('should capitalise first letter', () => {
  //arrange
  const stringValue = 'amura';
  const output = capitalizeFirstLetter(stringValue);
  expect(output).toBe("Amura");
});
