import { groupFilesByDate } from '@/lib/file-actions/groupFilesByDate';
import { S3File } from '@/types/file';

describe('groupFilesByDate', () => {
  it('should group files by date correctly', () => {
    const files = [
      {
        Key: 'original',
        LastModified: new Date('2022-01-01T00:00:00Z'),
      },
      {
        Key: 'converted',
        LastModified: new Date('2022-01-01T00:00:00Z'),
      },
      {
        Key: 'original',
        LastModified: new Date('2022-01-02T00:00:00Z'),
      },
      {
        Key: 'converted',
        LastModified: new Date('2022-01-02T00:00:00Z'),
      },
    ];

    const result = groupFilesByDate(files as S3File[]);

    expect(result).toEqual([
      {
        date: '2022-01-01T00:00:00.000Z',
        original: files[0],
        converted: files[1],
      },
      {
        date: '2022-01-02T00:00:00.000Z',
        original: files[2],
        converted: files[3],
      },
    ]);
  });
});
