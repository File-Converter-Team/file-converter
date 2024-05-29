import { convertDate } from '@/lib/file-actions/convertDate'; // Adjust the import path accordingly

const testCases = [
  { input: new Date('2023-05-15'), expected: 'May 15, 2023' },
  { input: new Date('2024-02-29'), expected: 'February 29, 2024' },
  { input: new Date('1999-12-31'), expected: 'December 31, 1999' },
  { input: new Date('2022-01-05'), expected: 'January 5, 2022' },
];

describe('convertDate', () => {
  testCases.forEach(({ input, expected }) => {
    it(`should format date correctly for ${input}`, () => {
      const formattedDate = convertDate(input);
      expect(formattedDate).toBe(expected);
    });
  });

  it('should format the current date correctly', () => {
    const now = new Date();
    const formattedDate = convertDate(now);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const expectedDate = now.toLocaleDateString('en-US', options);
    expect(formattedDate).toBe(expectedDate);
  });
});
