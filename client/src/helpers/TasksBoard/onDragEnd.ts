import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'

export const onDragEnd = (
    result: any,
    columns: ColumnData[],
    setColumns: any,
    socket: any
) => {
    if (!result.destination) return
    const { source, destination, draggableId, type } = result

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns.find(
            (column) => column.columnId === source.droppableId
        )
        const destColumn = columns.find(
            (column) => column.columnId === destination.droppableId
        )

        if (sourceColumn && destColumn) {
            const sourceItems = [...sourceColumn.tasks]
            const destItems = [...destColumn.tasks]
            const [removed] = sourceItems.splice(source.index, 1)

            destItems.splice(destination.index, 0, removed)

            const newColumns = columns.map((column) => {
                if (column.columnId === source.droppableId) {
                    return {
                        ...sourceColumn,
                        tasks: [...sourceItems],
                    }
                } else if (column.columnId === destination.droppableId) {
                    return {
                        ...destColumn,
                        tasks: [...destItems],
                    }
                } else
                    return {
                        ...column,
                    }
            })

            socket.emit(TaskEvent.TaskChange, {
                newColumns,
                taskToChange: {
                    taskId: draggableId,
                    assignedColumn: destColumn.columnId,
                    status: { name: destColumn.name, color: destColumn.color },
                },
            })

            setColumns(newColumns)
        }
    } else if (type === 'COLUMN') {
        const newColumns = [...columns]
        const [removed] = newColumns.splice(source.index, 1)

        newColumns.splice(destination.index, 0, removed)

        socket.emit(TaskEvent.TaskChange, { newColumns })

        setColumns(newColumns)
    } else {
        const column = columns.find((column) => column.columnId === source.droppableId)
        if (column) {
            const copiedItems = [...column.tasks]
            const [removed] = copiedItems.splice(source.index, 1)

            copiedItems.splice(destination.index, 0, removed)

            const newColumns = columns.map((column) => {
                if (column.columnId === source.droppableId) {
                    return { ...column, tasks: copiedItems }
                } else return column
            })

            socket.emit(TaskEvent.TaskChange, { newColumns })

            setColumns(newColumns)
        }
    }
}
