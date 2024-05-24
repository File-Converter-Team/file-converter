import {FC} from 'react';
import {getUserFiles} from "@/lib/getUserFiles";
import {auth} from "@/auth";
import FileCard from "@/app/_components/file-card";
import {S3File} from "@/types/file";

interface RecentFilesProps {
}

const SavedFiles: FC<RecentFilesProps> = async () => {
  const session = await auth();
  const files = await getUserFiles(session?.user?.email as string) as S3File[];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {files.map((file) => (
        <FileCard file={file} key={file.Key} />
      ))}
    </div>
  );
};

export default SavedFiles;
