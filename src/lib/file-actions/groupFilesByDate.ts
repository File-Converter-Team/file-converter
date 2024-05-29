import {FileGroup, S3File} from "@/types/file";

export const groupFilesByDate = (files: S3File[]): FileGroup[] => {
  const groupedFiles: { [date: string]: { original?: S3File; converted?: S3File } } = {};

  files.forEach(file => {
    const date = file.LastModified.toISOString();
    if (!groupedFiles[date]) {
      groupedFiles[date] = {};
    }

    if (file.Key.includes('original')) {
      groupedFiles[date].original = file;
    } else {
      groupedFiles[date].converted = file;
    }
  });

  const fileGroups: FileGroup[] = [];
  Object.keys(groupedFiles).forEach(date => {
    const group = groupedFiles[date];
    if (group.original && group.converted) {
      fileGroups.push({
        date,
        original: group.original,
        converted: group.converted
      });
    }
  });

  return fileGroups;
};
