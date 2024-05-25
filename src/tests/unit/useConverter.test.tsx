import { renderHook, act } from '@testing-library/react-hooks'
import useConverter from '@/hooks/useConverter'
import { parserCSV, parserJS, parserXML } from '@/lib/parsers'

jest.mock('@/lib/parsers', () => ({
    parserCSV: jest.fn(),
    parserJS: jest.fn(),
    parserXML: jest.fn(),
}))

describe('useConverter', () => {
    test('initial state', () => {
        const { result } = renderHook(() => useConverter(''))

        expect(result.current.json).toEqual([
            { Id: '1', Name: 'Artem', Age: '19' },
            { Id: '2', Name: 'Sasha', Age: '17' },
        ])
        expect(result.current.error).toBeNull()
    })

    test('convert valid CSV data', () => {
        const { result } = renderHook(() => useConverter(''))
        const csvData = `Id,Name,Age\n1,Artem,19\n2,Sasha,17`
        const expectedOutput = [
            { Id: '1', Name: 'Artem', Age: '19' },
            { Id: '2', Name: 'Sasha', Age: '17' },
        ]

        ;(parserCSV as jest.Mock).mockReturnValue(expectedOutput)

        act(() => {
            result.current.converter('csv', csvData)
        })

        expect(result.current.json).toEqual(expectedOutput)
        expect(result.current.error).toBeNull()
    })

    test('convert invalid CSV data', () => {
        const { result } = renderHook(() => useConverter(''))
        const csvData = `Id,Name,Age\n1,Artem,19\n2,Sasha`

        ;(parserCSV as jest.Mock).mockReturnValue(null)

        act(() => {
            result.current.converter('csv', csvData)
        })

        expect(result.current.json).toBeNull()
        expect(result.current.error).toBe('Error: invalid CSV data')
    })

    test('convert valid JS data', () => {
        const { result } = renderHook(() => useConverter(''))
        const jsData = `[{"Id": "1","Name": "Artem","Age": "19"},{"Id": "2","Name": "Sasha","Age": "17"}]`
        const expectedOutput = [
            { Id: '1', Name: 'Artem', Age: '19' },
            { Id: '2', Name: 'Sasha', Age: '17' },
        ]

        ;(parserJS as jest.Mock).mockReturnValue(expectedOutput)

        act(() => {
            result.current.converter('js', jsData)
        })

        expect(result.current.json).toEqual(expectedOutput)
        expect(result.current.error).toBeNull()
    })

    test('convert invalid JS data', () => {
        const { result } = renderHook(() => useConverter(''))
        const jsData = `{ Id: "1", Name: "Artem", Age: 19 `

        ;(parserJS as jest.Mock).mockReturnValue(null)

        act(() => {
            result.current.converter('js', jsData)
        })

        expect(result.current.json).toBeNull()
        expect(result.current.error).toBe('Error: invalid JavaScript data')
    })

    test('convert valid XML data', () => {
        const { result } = renderHook(() => useConverter(''))
        const xmlData = `<root><Id>1</Id><Name>Artem</Name><Age>19</Age></root>`
        const expectedOutput = {
            root: { Id: ['1'], Name: ['Artem'], Age: ['19'] },
        }

        ;(parserXML as jest.Mock).mockReturnValue(expectedOutput)

        act(() => {
            result.current.converter('xml', xmlData)
        })

        expect(result.current.json).toEqual(expectedOutput)
        expect(result.current.error).toBeNull()
    })

    test('convert invalid XML data', () => {
        const { result } = renderHook(() => useConverter(''))
        const xmlData = `<root><Id>1<Id><Name>Artem</Name><Age>19</Age></root>`

        ;(parserXML as jest.Mock).mockReturnValue(null)

        act(() => {
            result.current.converter('xml', xmlData)
        })

        expect(result.current.json).toBeNull()
        expect(result.current.error).toBe('Error: invalid XML data')
    })

    test('no format specified', () => {
        const { result } = renderHook(() => useConverter(''))
        const data = `some data`

        act(() => {
            result.current.converter(null, data)
        })

        expect(result.current.json).toBeNull()
        expect(result.current.error).toBe('Error: select file type')
    })
})
