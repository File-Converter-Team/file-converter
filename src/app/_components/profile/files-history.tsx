import {FC} from 'react';
import {Table, TableHead, TableHeader, TableRow, TableBody, TableCell} from "@/app/_components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu";
import {Button} from "@/app/_components/ui/button";
import {DownloadIcon, EllipsisVerticalIcon, EyeIcon} from "lucide-react";

interface RecentFilesProps {
}

const FilesHistory: FC<RecentFilesProps> = () => {
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
          <TableRow>
            <TableCell className="text-gray-900 dark:text-gray-50">data.csv</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">CSV</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">JSON</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">May 15, 2024</TableCell>
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
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-900 dark:text-gray-50">report.xlsx</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">XLSX</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">CSV</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">April 20, 2024</TableCell>
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
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-900 dark:text-gray-50">config.json</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">JSON</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">YAML</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">March 25, 2024</TableCell>
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
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-900 dark:text-gray-50">app.js</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">JS</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">TS</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-50">February 18, 2024</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" size="icon" variant="ghost"/>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FilesHistory;
