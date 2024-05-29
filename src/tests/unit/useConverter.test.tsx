import { act } from 'react'
import { renderHook } from '@testing-library/react'
import useConverter from '@/hooks/useConverter'

const getJsonAndError = async (type: any, text: any) => {
    let json: any
    let error: any
    const { result } = renderHook(() => useConverter(''))

    await act(async () => {
        result.current.converter(type, text)
    })

    json = result.current.json
    error = result.current.error
    return { json, error }
}

jest.mock('@/lib/parsers', () => ({
    parserCSV: jest.fn((text) => {
        if (text === 'valid csv') return [{ Id: '1', Name: 'Artem', Age: '19' }]
        return null
    }),
    parserJS: jest.fn((text) => {
        if (text === 'valid js') return [{ Id: '1', Name: 'Artem', Age: '19' }]
        return null
    }),
    parserXML: jest.fn((text) => {
        if (text === 'valid xml') return [{ Id: '1', Name: 'Artem', Age: '19' }]
        return null
    }),
}))

describe('useConverter hook', () => {
    it('should convert valid JS data', async () => {
        const { json, error } = await getJsonAndError('js', 'valid js')
        expect(json).toEqual([{ Id: '1', Name: 'Artem', Age: '19' }])
        expect(error).toBeNull()
    })

    it('should return error for invalid JS data', async () => {
        const { json, error } = await getJsonAndError('js', 'invalid js')
        expect(json).toBeNull()
        expect(error).toBe('Error: invalid JavaScript data')
    })

    it('should convert valid CSV data', async () => {
        const { json, error } = await getJsonAndError('csv', 'valid csv')
        expect(json).toEqual([{ Id: '1', Name: 'Artem', Age: '19' }])
        expect(error).toBe(null)
    })

    it('should return error for invalid CSV data', async () => {
        const { json, error } = await getJsonAndError('csv', 'invalid csv')
        expect(json).toBeNull()
        expect(error).toBe('Error: invalid CSV data')
    })

    it('should convert valid XML data', async () => {
        const { json, error } = await getJsonAndError('xml', 'valid xml')
        expect(json).toEqual([{ Id: '1', Name: 'Artem', Age: '19' }])
        expect(error).toBeNull()
    })

    it('should return error for invalid XML data', async () => {
        const { json, error } = await getJsonAndError('xml', 'invalid xml')
        expect(json).toBeNull()
        expect(error).toBe('Error: invalid XML data')
    })

    it('should return error for null format', async () => {
        const { json, error } = await getJsonAndError(null, 'valid data')
        expect(json).toBeNull()
        expect(error).toBe('Error: select file type')
    })
})
