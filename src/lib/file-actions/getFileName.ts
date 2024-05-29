export const getFileName = (path: string): string => {
  const folders = path.split('/');
  const filename = folders[folders.length - 1];
  if (filename.includes('-')) {
    return filename.split('-')[1];
  }
  return filename;
}
