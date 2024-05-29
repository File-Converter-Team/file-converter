export const createFileFromURL = async (fileURL: string): Promise<File> => {
  let file: File;
  return fetch(fileURL)
    .then((response) => response.blob())
    .then((blob) => {
      file = new File([blob], fileURL.split('/').pop() || '', { type: blob.type });
      return file;
    });
}
