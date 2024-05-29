import {FC} from 'react';
import {Table, TableHead, TableHeader, TableRow, TableBody, TableCell} from "@/app/_components/ui/table";
import {auth} from "@/auth";
import {getUserFiles} from "@/lib/file-actions/getUserFiles";
import {S3File} from "@/types/file";
import {groupFilesByDate} from "@/lib/file-actions/groupFilesByDate";
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedFiles.length > 0 ? groupedFiles.map((fileGroup) => (
            <FileTableRow fileGroup={fileGroup} key={fileGroup.original.Key} />
          )) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-900 dark:text-gray-50">
                No files found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FilesHistory;
