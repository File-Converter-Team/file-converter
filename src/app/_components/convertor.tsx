import {Button} from "@/app/_components/ui/button";
import {CopyIcon, UploadIcon} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/select";

const Convertor = () => {
  const json =  JSON.parse(`{
        "key1": "value1",
        "key2": "value2",
        "key3": "value3",
        "key4": "value3",
        "key5": "value3",
        "key6": "value3",
        "key7": "value3"
      }`);

  return (
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">File to JSON Converter</h1>
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-8">
        <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4"/>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop your file here or
          <button className="ml-1 text-blue-500 hover:underline">click to upload</button>
        </p>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select file type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost">Convert to JSON</Button>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-8">
        <pre className="text-left text-sm font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-96">
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
      <div className="flex justify-end">
        <Button className="flex items-center gap-2" variant="outline">
          <CopyIcon className="h-4 w-4"/>
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
}

export default Convertor;
