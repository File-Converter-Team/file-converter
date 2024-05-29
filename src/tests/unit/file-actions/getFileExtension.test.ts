import { getFileExtension } from '@/lib/file-actions/getFileExtension'; // Adjust the import according to your project structure

describe('getFileExtension', () => {
  test('should return the file extension for a regular filename', () => {
    expect(getFileExtension('file.txt')).toBe('txt');
  });

  test('should return the file extension for a filename with multiple dots', () => {
    expect(getFileExtension('archive.tar.gz')).toBe('gz');
  });

  test('should return the file extension for a hidden file with extension', () => {
    expect(getFileExtension('.env.local')).toBe('local');
  });

  test('should return the entire string if there is no dot', () => {
    expect(getFileExtension('filename')).toBe('filename');
  });

  test('should return an empty string for a dot at the end', () => {
    expect(getFileExtension('filename.')).toBe('');
  });

  test('should return an empty string for an empty string input', () => {
    expect(getFileExtension('')).toBe('');
  });

  test('should return the correct extension for a filename with multiple extensions', () => {
    expect(getFileExtension('my.photo.jpeg')).toBe('jpeg');
  });

  test('should return the file extension for a filename with special characters', () => {
    expect(getFileExtension('file.name_with-characters@123.zip')).toBe('zip');
  });

  test('should handle filenames with spaces correctly', () => {
    expect(getFileExtension('my document.pdf')).toBe('pdf');
  });

  test('should return an empty string for filenames starting with a dot without extension', () => {
    expect(getFileExtension('.filename')).toBe('filename');
  });

  test('should handle filenames with only one character and a dot', () => {
    expect(getFileExtension('a.b')).toBe('b');
  });

  test('should handle filenames with dots and no extension correctly', () => {
    expect(getFileExtension('.....')).toBe('');
  });

  test('should handle filenames that are just dots correctly', () => {
    expect(getFileExtension('.')).toBe('');
  });
});
