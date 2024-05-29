'use client';

import { FC, useState } from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ArrowLeftRightIcon, DownloadIcon, EllipsisVerticalIcon, FileIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { getFileExtension } from "@/lib/getFileExtension";
import { getFileName } from "@/lib/getFileName";
import { S3File } from "@/types/file";
import { convertDate } from "@/lib/convertDate";
import { s3URL } from "@/lib/s3";
import { deleteFile } from "@/lib/deleteFile";
import ConverterDialog from "@/app/_components/converter-dialog";
import {createFileFromURL} from "@/lib/createFileFromURL";

interface FileCardProps {
  file: S3File;
}

const FileCard: FC<FileCardProps> = ({ file }) => {
  const fileName = getFileName(file.Key);
  const extension = getFileExtension(file.Key);
  const date = convertDate(file.LastModified);
  const fileURL = s3URL + file.Key;

  const [open, setOpen] = useState(false);

  const inputFile = createFileFromURL(fileURL);

  const handleDownloadFile = () => {
    fetch(fileURL)
      .then(response => response.blob())
      .then(data => {
        const blob = new Blob([data], { type: 'text/javascript' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading the file:', error));
  };

  const handleDeleteFile = async () => {
    await deleteFile(file.Key);
    document.location.reload();
  };

  return (
    <Card className="bg-gray-100 dark:bg-gray-800">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{fileName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{extension.toUpperCase()}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto" size="icon" variant="ghost">
                  <EllipsisVerticalIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">File actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <div onClick={() => setOpen(true)} className="w-full flex items-center">
                    <ArrowLeftRightIcon className="mr-2 h-4 w-4" />
                    Convert
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadFile}>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteFile}>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <div className="hidden">
        <ConverterDialog file={inputFile} fileName={fileName} open={open} onOpenChange={setOpen} />
      </div>
    </Card>
  );
};

export default FileCard;
