import {FC} from 'react';
import {DownloadIcon, EllipsisVerticalIcon, FileIcon, TrashIcon, TypeIcon} from "lucide-react";
import {Card, CardContent} from "@/app/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu";
import {Button} from "@/app/_components/ui/button";

interface RecentFilesProps {
}

const SavedFiles: FC<RecentFilesProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileIcon className="h-6 w-6 text-gray-500 dark:text-gray-400"/>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">data.csv</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
              </div>
            </div>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" size="icon" variant="ghost">
                    <EllipsisVerticalIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                    <span className="sr-only">File actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <TypeIcon className="mr-2 h-4 w-4"/>
                    Convert
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DownloadIcon className="mr-2 h-4 w-4"/>
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TrashIcon className="mr-2 h-4 w-4"/>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">May 20, 2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedFiles;
