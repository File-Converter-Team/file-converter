'use client'

import { Button } from '@/app/_components/ui/button'
import { CopyIcon, UploadIcon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/ui/select'
import { useState } from 'react'

const Convertor = () => {
    const initialJson = JSON.parse(
        `[{"Id": "1","Name": "Artem","Age": "19"},
        {"Id": "2","Name": "Sasha","Age": "17"}]`,
    )

    const [json, setJson] = useState(initialJson)
    const [text, setText] = useState('')
    const [selectedItem, setSelectedItem] = useState<string | null>(null)

    const handleSelectChange = (value: string) => {
        setSelectedItem(value)
        setText('')
    }

    const handleConvert = (format: string | null) => {
        if (format === 'csv') {
            const parsedData = parserCSV(text)
            if (parsedData) {
                const { keys, values } = parsedData
                setJson(convertToJSON(keys, values))
            } else setJson('Error: invalid CSV data')
        } else if (format === 'js') {
            const parsedData = parserJS(text)
            if (parsedData) {
                setJson(parsedData)
            } else setJson('Error: invalid JavaScript data')
        } else return setJson('Error: select file type')
    }

    const parserCSV = (data: string) => {
        const lines = data.split('\n')
        const keys = lines[0].split(',').map((key) => key.trim())
        const values = lines
            .slice(1)
            .map((row) => row.split(',').map((value) => value.trim()))

        return checkValues(keys, values) ? null : { keys, values }
    }

    const parserJS = (data: string) => {
        try {
            return eval(`${data}`)
        } catch (error) {
            console.error('Error:', error)
            return null
        }
    }

    const convertToJSON = (keys: string[], values: string[][]) => {
        const json: any[] = []

        values.forEach((row) => {
            const newObject: { [key: string]: string } = {}
            row.map((value, index) => {
                newObject[keys[index]] = value
            })
            json.push(newObject)
        })

        return json
    }

    const checkValues = (keys: string[], values: string[][]) => {
        if (values.length === 0 || keys[0] === '') return true
        return values.some((row) => row.length !== keys.length)
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(json, null, 2))
    }

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setText(reader.result as string)
            reader.readAsText(file)
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
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-8">
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
                        </SelectContent>
                    </Select>
                    <Button
                        variant="ghost"
                        onClick={() => handleConvert(selectedItem)}
                    >
                        Convert to JSON
                    </Button>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-8">
                <pre className="text-left text-sm font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-96">
                    {JSON.stringify(json, null, 2)}
                </pre>
            </div>
            <div className="flex justify-end">
                <Button
                    className="flex items-center gap-2"
                    variant="outline"
                    onClick={handleCopyToClipboard}
                >
                    <CopyIcon className="h-4 w-4" />
                    Copy to Clipboard
                </Button>
                <Button
                    className="flex items-center gap-2"
                    variant="outline"
                    onClick={handleDownloadFile}
                >
                    <CopyIcon className="h-4 w-4" />
                    Download
                </Button>
            </div>
        </div>
    )
}

export default Convertor
