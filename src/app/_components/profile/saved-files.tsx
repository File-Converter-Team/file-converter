import {FC} from 'react';
import {getUserFiles} from "@/lib/getUserFiles";
import {auth} from "@/auth";
import FileCard from "@/app/_components/file-card";
import {S3File} from "@/types/file";
import {groupFilesByDate} from "@/lib/groupFilesByDate";

interface RecentFilesProps {
}

const SavedFiles: FC<RecentFilesProps> = async () => {
  const session = await auth();
  const files = await getUserFiles(session?.user?.email as string) as S3File[] || [];
  const groupedFiles = groupFilesByDate(files);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {groupedFiles.length > 0 ? groupedFiles.map((file) => (
        <FileCard file={file.original} key={file.original.Key} />
      )) : (
        <div className="text-center text-gray-900 dark:text-gray-50">
          No files found
        </div>
      )}
    </div>
  );
};

export default SavedFiles;
