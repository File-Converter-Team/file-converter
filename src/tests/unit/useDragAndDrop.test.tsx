import { renderHook, act } from '@testing-library/react-hooks'
import useDragAndDrop from '@/hooks/useDragAndDrop'

describe('useDragAndDrop', () => {
    test('initial state', () => {
        const { result } = renderHook(() => useDragAndDrop())
        expect(result.current.dragging).toBe(false)
    })

    test('handleDragEnter sets dragging to true', () => {
        const { result } = renderHook(() => useDragAndDrop())
        const event = new Event('dragenter', { bubbles: true })

        act(() => {
            result.current.handleDragEnter(
                event as unknown as React.DragEvent<HTMLDivElement>,
            )
        })

        expect(result.current.dragging).toBe(true)
    })

    test('handleDragLeave sets dragging to false', () => {
        const { result } = renderHook(() => useDragAndDrop())
        const eventEnter = new Event('dragenter', { bubbles: true })
        const eventLeave = new Event('dragleave', { bubbles: true })

        act(() => {
            result.current.handleDragEnter(
                eventEnter as unknown as React.DragEvent<HTMLDivElement>,
            )
        })

        expect(result.current.dragging).toBe(true)

        act(() => {
            result.current.handleDragLeave(
                eventLeave as unknown as React.DragEvent<HTMLDivElement>,
            )
        })

        expect(result.current.dragging).toBe(false)
    })

    test('handleDragOver prevents default and propagation', () => {
        const { result } = renderHook(() => useDragAndDrop())
        const event = new Event('dragover', { bubbles: true })
        jest.spyOn(event, 'preventDefault')
        jest.spyOn(event, 'stopPropagation')

        act(() => {
            result.current.handleDragOver(
                event as unknown as React.DragEvent<HTMLDivElement>,
            )
        })

        expect(event.preventDefault).toHaveBeenCalled()
        expect(event.stopPropagation).toHaveBeenCalled()
    })

    test('handleDrop calls uploadFile and sets dragging to false', () => {
        const { result } = renderHook(() => useDragAndDrop())
        const eventEnter = new Event('dragenter', { bubbles: true })
        const eventDrop = new Event('drop', { bubbles: true })
        jest.spyOn(eventDrop, 'preventDefault')
        jest.spyOn(eventDrop, 'stopPropagation')
        const uploadFile = jest.fn()

        act(() => {
            result.current.handleDragEnter(
                eventEnter as unknown as React.DragEvent<HTMLDivElement>,
            )
        })

        expect(result.current.dragging).toBe(true)

        act(() => {
            result.current.handleDrop(
                eventDrop as unknown as React.DragEvent<HTMLDivElement>,
                uploadFile,
            )
        })

        expect(eventDrop.preventDefault).toHaveBeenCalled()
        expect(eventDrop.stopPropagation).toHaveBeenCalled()
        expect(uploadFile).toHaveBeenCalledWith(eventDrop)
        expect(result.current.dragging).toBe(false)
    })
})
