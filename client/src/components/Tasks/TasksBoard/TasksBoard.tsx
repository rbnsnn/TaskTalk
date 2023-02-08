import React from 'react'
import { Box } from '@mui/system'
import { Droppable } from 'react-beautiful-dnd'
import { ColumnData } from '../../../types/column-data.type'
import TaskColumn from '../TasksBoard/TasksColumn/TasksColumn'

interface Props {
    columns: ColumnData[]
}

const TasksBoard: React.FC<Props> = ({ columns }) => {
    return (
        <Droppable
            droppableId='board'
            type='COLUMN'
            direction='horizontal'
        >
            {(provided) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-start'
                    maxWidth='100%'
                    maxHeight='90%'
                    pb={-2}
                >
                    {columns.map((column, index) => (
                        <TaskColumn
                            key={column.columnId}
                            data={column}
                            index={index}
                            columns={columns.length}
                        />
                    ))}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    )
}

export default TasksBoard
