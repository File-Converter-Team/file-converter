import { getFileName } from '@/lib/file-actions/getFileName';

describe('getFileName', () => {
  it('should return the correct filename from a path', () => {
    const path = 'folder/subfolder/file.txt';
    const expected = 'file.txt';
    const result = getFileName(path);
    expect(result).toBe(expected);
  });

  it('should return the correct filename when there are multiple dashes', () => {
    const path = 'folder/subfolder/somethingID-file.txt';
    const expected = 'file.txt';
    const result = getFileName(path);
    expect(result).toBe(expected);
  });

  it('should return undefined when there are no dashes', () => {
    const path = 'folder/myfile.txt';
    const expected = 'myfile.txt';
    const result = getFileName(path);
    expect(result).toBe(expected);
  });
});
