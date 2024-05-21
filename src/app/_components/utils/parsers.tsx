const parserCSV = (data: string) => {
    if (data === null) return data

    const lines = data.split('\n')
    const keys = lines[0].split(',').map((key) => key.trim())
    const values = lines
        .slice(1)
        .map((row) => row.split(',').map((value) => value.trim()))

    return checkValues(keys, values) ? null : convertToJSON(keys, values)
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

export { parserCSV, parserJS }
