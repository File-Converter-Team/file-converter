import {TableCell, TableRow} from "@/app/_components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu";
import {Button} from "@/app/_components/ui/button";
import {DownloadIcon, EllipsisVerticalIcon, EyeIcon} from "lucide-react";
import {FileGroup} from "@/types/file";
import {getFileName} from "@/lib/file-actions/getFileName";
import {getFileExtension} from "@/lib/file-actions/getFileExtension";
import {convertDate} from "@/lib/file-actions/convertDate";

const FileTableRow = ({ fileGroup }: { fileGroup: FileGroup }) => {
  const fileName = getFileName(fileGroup.original.Key);
  const extension = getFileExtension(fileGroup.original.Key);
  const date = convertDate(fileGroup.original.LastModified);

  return (
    <TableRow>
      <TableCell className="text-gray-900 dark:text-gray-50">{fileName}</TableCell>
      <TableCell className="text-gray-900 dark:text-gray-50">{extension.toUpperCase()}</TableCell>
      <TableCell className="text-gray-900 dark:text-gray-50">JSON</TableCell>
      <TableCell className="text-gray-900 dark:text-gray-50">{date}</TableCell>
    </TableRow>
  )
}

export default FileTableRow;
