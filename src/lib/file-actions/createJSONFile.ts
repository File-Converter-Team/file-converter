export const createJSONFile = (json: string, fileName: string) => {
  const blob = new Blob([json], { type: 'application/json' });
  return new File([blob], `${fileName}.json`);
}
