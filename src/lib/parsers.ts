import { parseString } from 'xml2js'

const parserCSV = (data: string) => {
    if (!data.trim()) return null

    const lines = data.split('\n')
    const keys = lines[0].split(',').map((key) => key.trim())
    const values = lines
        .slice(1)
        .map((row) => row.split(',').map((value) => value.trim()))

    return checkValues(keys, values) ? null : convertToJSON(keys, values)
}

const parserJS = (data: string) => {
    if (!data.trim()) return null

    try {
        return eval(`${data}`)
    } catch (error) {
        return null
    }
}

const parserXML = (data: string) => {
    if (!data.trim()) return null
    let result: any
    parseString(data, (err: any, parsedResult: any) => {
        if (err) {
            return null
        }
        result = parsedResult
    })
    return result ? result : null
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

export { parserCSV, parserJS, parserXML }
