import { createJSONFile } from '@/lib/file-actions/createJSONFile';

describe('createJSONFile', () => {
  it('should return a File object with the correct properties', () => {
    const json = JSON.stringify({ key: 'value' });
    const fileName = 'testFile';
    const result = createJSONFile(json, fileName);

    expect(result).toBeInstanceOf(File);
    expect(result.name).toBe(`${fileName}.json`);
  });
});
