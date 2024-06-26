'use client'

import {Button} from '@/app/_components/ui/button'
import {CopyIcon, DownloadIcon, SaveIcon, UploadIcon, XIcon} from 'lucide-react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/app/_components/ui/select'
import {FC, useEffect, useState} from 'react'
import useConverter from '@/hooks/useConverter'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import {useSession} from "next-auth/react";
import {uploadFile} from "@/lib/file-actions/uploadFile";
import {createJSONFile} from "@/lib/file-actions/createJSONFile";
import {useToast} from "@/app/_components/ui/use-toast";
import {successCopy, successUpload} from "@/constants/toast";

interface ConvertorProps {
  inputFile?: File;
  inputFileName?: string;
}

const Convertor: FC<ConvertorProps> = ({ inputFile = null, inputFileName = null }) => {
  const { toast } = useToast()
  const [text, setText] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(inputFileName)
  const [file, setFile] = useState<File | null>(inputFile);
  const {
    dragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDragAndDrop()
  const { data: session } = useSession();
  const { json, error, converter } = useConverter(text)

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setText(reader.result as string)
      reader.readAsText(file)
    }
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedItem(value)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2))
    toast(successCopy)
  }

  const handleSaveFile = async () => {
    const isExistFile = file && fileName && json;
    if (isExistFile && session) {
      const [JSONFileName, extension] = fileName.split('.');
      const convertedFile = createJSONFile(JSON.stringify(json, null, 2), JSONFileName);
      await uploadFile(convertedFile, session?.user?.email as string, 'converted', extension);
      await uploadFile(file, session?.user?.email as string, 'original');
    }
    toast(successUpload)
  }

  const handleUploadFile = (event: any) => {
    const file = dragging
      ? event.dataTransfer.files?.[0]
      : event.target.files?.[0]
    if (file) {
      setFile(file);
      const reader = new FileReader()
      reader.onload = () => setText(reader.result as string)
      reader.readAsText(file)
      setFileName(file.name)
    }
  }

  const handleDownloadFile = () => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    Object.assign(link, {
      href: url,
      download: 'converted.json',
    })

    link.click()
    URL.revokeObjectURL(url)

  }

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        File to JSON Converter
      </h1>
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8 mb-8 ${
          dragging
            ? 'border-blue-500'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, handleUploadFile)}
      >
        {fileName && (
          <Button
            className="mb-2 flex items-center gap-2 w-full sm:w-auto hover:bg-red-200 hover:border-gray-400"
            variant="outline"
            onClick={() => {
              setFileName(null)
              setText('')
            }}
          >
            <XIcon className="h-4 w-4" />
            {fileName}
          </Button>
        )}

        <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop your file here or
          <label
            className="ml-1 text-blue-500 hover:underline"
            htmlFor="file-upload"
          >
            click to upload
          </label>
          <input
            id="file-upload"
            type="file"
            accept={`.${selectedItem}`}
            style={{ display: 'none' }}
            onChange={handleUploadFile}
          />
        </p>
        <div className="flex items-center gap-4">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            onClick={() => converter(selectedItem, text)}
          >
            Convert to JSON
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-8">
        <pre className="text-left text-sm font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-32">
            {error ? error : JSON.stringify(json, null, 2)}
        </pre>
      </div>
      <div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
        {session?.user && json && selectedItem && (
          <Button
            className="flex items-center gap-2 w-full sm:w-auto"
            variant="outline"
            onClick={handleSaveFile}
          >
            <SaveIcon className="h-4 w-4" />
            Save
          </Button>
        )}
        <Button
          className="flex items-center gap-2 w-full sm:w-auto"
          variant="outline"
          onClick={handleCopyToClipboard}
        >
          <CopyIcon className="h-4 w-4" />
          Copy to Clipboard
        </Button>
        <Button
          className="flex items-center gap-2 w-full sm:w-auto"
          variant="outline"
          onClick={handleDownloadFile}
        >
          <DownloadIcon className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  )
}

export default Convertor
