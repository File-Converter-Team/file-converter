import { parserCSV, parserJS, parserXML } from '@/lib/parsers'

const emptyString = ''
const bigData = [
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
]

describe('parserCSV', () => {
    test('input null', () => {
        expect(parserCSV(emptyString)).toBeNull()
    })

    test('valid CSV data', () => {
        const csvData = `name,age\nAlice,30\nBob,25`
        const expectedOutput = [
            { name: 'Alice', age: '30' },
            { name: 'Bob', age: '25' },
        ]
        expect(parserCSV(csvData)).toEqual(expectedOutput)
    })

    test('valid but big CSV data', () => {
        const csvData = `name,age\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25\nAlice,30\nBob,25`
        const expectedOutput = bigData
        expect(parserCSV(csvData)).toEqual(expectedOutput)
    })

    test('invalid CSV data', () => {
        const csvData = `name,age\nAlice,30\nBob`
        expect(parserCSV(csvData)).toBeNull()
    })
})

describe('parserJS', () => {
    test('input null', () => {
        expect(parserJS(emptyString)).toBeNull()
    })

    test('valid JS object string', () => {
        const jsData = `[{ name: 'Alice', age: 30 }]`
        const expectedOutput = [{ name: 'Alice', age: 30 }]
        expect(parserJS(jsData)).toEqual(expectedOutput)
    })

    test('valid but big JS object string', () => {
        const jsData = `[{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' }, {name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' },{ name: 'Alice', age: '30' },{ name: 'Bob', age: '25' }]`
        const expectedOutput = bigData
        expect(parserJS(jsData)).toEqual(expectedOutput)
    })

    test('invalid JS data', () => {
        const jsData = `{ name: 'Alice', age: 30 `
        expect(parserJS(jsData)).toBeNull()
    })
})

describe('parserXML', () => {
    test('input null', () => {
        expect(parserXML(emptyString)).toBeNull()
    })

    test('valid XML data', () => {
        const xmlData = `<root><name>Alice</name><age>30</age></root>`
        const expectedOutput = { root: { name: ['Alice'], age: ['30'] } }
        expect(parserXML(xmlData)).toEqual(expectedOutput)
    })

    test('valid but big XML data', () => {
        const xmlData = `<root><name>Alice</name><age>30</age></root>`
        const expectedOutput = { root: { name: ['Alice'], age: ['30'] } }
        expect(parserXML(xmlData)).toEqual(expectedOutput)
    })

    test('invalid XML data', () => {
        const xmlData = `<root><name>Alice<name><age>30</age></root>`
        expect(parserXML(xmlData)).toBeNull()
    })
})
