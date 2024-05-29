'use client';
import { Dialog, DialogContent, DialogTrigger } from "@/app/_components/ui/dialog";
import { ArrowLeftRightIcon } from "lucide-react";
import Convertor from "@/app/_components/convertor";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

interface ConverterDialogProps {
  file: Promise<File>;
  fileName: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const ConverterDialog: FC<ConverterDialogProps> = ({ file, fileName,  open, onOpenChange }) => {
  const [inputFile, setInputFile] = useState<File | Promise<File>>(file);

  useEffect(() => {
    file.then((file) => setInputFile(file));
  }, [inputFile])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <ArrowLeftRightIcon className="mr-2 h-4 w-4" />
          Convert
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <Convertor inputFile={inputFile as File} inputFileName={fileName} />
      </DialogContent>
    </Dialog>
  );
};

export default ConverterDialog;
