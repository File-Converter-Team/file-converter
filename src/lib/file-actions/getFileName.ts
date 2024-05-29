export const getFileName = (path: string): string => {
  const filename = path.split('/').pop() as string;
  return filename.split('-')[1];
}
