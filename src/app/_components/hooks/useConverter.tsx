import { useCallback, useState } from 'react'

const useConverter = (converters: any, text: any) => {
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
