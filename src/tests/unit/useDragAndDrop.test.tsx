import { act } from 'react'
import { renderHook } from '@testing-library/react'
import useDragAndDrop from '@/hooks/useDragAndDrop'

describe('useDragAndDrop', () => {
  const createMockEvent = () => ({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
          setData: jest.fn(),
          getData: jest.fn(),
          clearData: jest.fn(),
          dropEffect: '',
          effectAllowed: '',
          files: [],
          items: [],
          types: []
      }
  }) as unknown as React.DragEvent<HTMLDivElement>

  it('should set dragging to true on handleDragEnter', () => {
      const { result } = renderHook(() => useDragAndDrop())
      const event = createMockEvent()

      act(() => {
          result.current.handleDragEnter(event)
      })

      expect(result.current.dragging).toBe(true)
  })

  it('should set dragging to false on handleDragLeave', () => {
      const { result } = renderHook(() => useDragAndDrop())
      const event = createMockEvent()

      act(() => {
          result.current.handleDragEnter(event)
          result.current.handleDragLeave(event)
      })

      expect(result.current.dragging).toBe(false)
  })

  it('should prevent default and stop propagation on handleDragOver', () => {
      const { result } = renderHook(() => useDragAndDrop())
      const event = createMockEvent()

      act(() => {
          result.current.handleDragOver(event)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should set dragging to false and call uploadFile on handleDrop', () => {
      const uploadFile = jest.fn()
      const { result } = renderHook(() => useDragAndDrop())
      const event = createMockEvent()

      act(() => {
          result.current.handleDrop(event, uploadFile)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
      expect(uploadFile).toHaveBeenCalledWith(event)
      expect(result.current.dragging).toBe(false)
  })
})