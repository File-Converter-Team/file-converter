export interface S3File {
  Key: string;
  LastModified: Date;
  ETag: string;
  Size: number;
  StorageClass: string;
};

export type FileType = 'original' | 'converted';

export interface FileGroup {
  date: string;
  original: S3File;
  converted: S3File;
}
