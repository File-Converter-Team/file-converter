import { useState } from 'react'

const useDragAndDrop = () => {
    const [dragging, setDragging] = useState(false)

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setDragging(false)
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>,
        uploadFile: (event: React.DragEvent<HTMLDivElement>) => void,
    ) => {
        event.preventDefault()
        event.stopPropagation()
        uploadFile(event)
        setDragging(false)
    }

    return {
        dragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    }
}

export default useDragAndDrop
