import { useCallback, useState } from 'react'
import {parserCSV, parserJS, parserXML} from "@/lib/parsers";
import {Converters} from "@/types/converters";

const converters: Converters = {
    js: {
        parser: parserJS,
        error: 'Error: invalid JavaScript data',
    },
    csv: {
        parser: parserCSV,
        error: 'Error: invalid CSV data',
    },
    xml: {
        parser: parserXML,
        error: 'Error: invalid XML data',
    },
}

const useConverter = (text: string) => {
    const exampleText = `[
      {"Id": "1","Name": "Artem","Age": "19"},
      {"Id": "2","Name": "Sasha","Age": "17"}
    ]`
    const [json, setJson] = useState(JSON.parse(exampleText))
    const [error, setError] = useState<string | null>(null)
    const errorSelectFile = 'Error: select file type'

    const converter = useCallback(
        (format: string | null, text: any) => {
            if (format) {
                const parsedData = converters[format].parser(text)
                if (parsedData) {
                    setJson(parsedData)
                    setError(null)
                } else {
                    setJson(null)
                    setError(converters[format].error)
                }
            } else {
                setJson(null)
                setError(errorSelectFile)
            }
        },
        [converters, text],
    )

    return { json, error, converter }
}

export default useConverter
