import {FC} from 'react';
import {Table, TableHead, TableHeader, TableRow, TableBody, TableCell} from "@/app/_components/ui/table";
import {auth} from "@/auth";
import {getUserFiles} from "@/lib/getUserFiles";
import {S3File} from "@/types/file";
import {groupFilesByDate} from "@/lib/groupFilesByDate";
import FileTableRow from "@/app/_components/file-table-row";

interface RecentFilesProps {
}

const FilesHistory: FC<RecentFilesProps> = async () => {
  const session = await auth();
  const files = await getUserFiles(session?.user?.email as string) as S3File[] || [];
  const groupedFiles = groupFilesByDate(files);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 dark:text-gray-50">File Name</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-50">Original Format</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-50">Converted Format</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-50">Conversion Date</TableHead>
            <TableHead className="text-right text-gray-900 dark:text-gray-50">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedFiles.map((fileGroup) => (
            <FileTableRow fileGroup={fileGroup} key={fileGroup.original.Key} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FilesHistory;
