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
import {getFileName} from "@/lib/getFileName";
import {getFileExtension} from "@/lib/getFileExtension";
import {convertDate} from "@/lib/convertDate";

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
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto" size="icon" variant="ghost">
              <EllipsisVerticalIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
              <span className="sr-only">File actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <EyeIcon className="mr-2 h-4 w-4"/>
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon className="mr-2 h-4 w-4"/>
              Download original
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default FileTableRow;
