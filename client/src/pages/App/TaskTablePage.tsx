import React from 'react'
import TaskTable from '../../components/TaskTable/TaskTable'
import { Box } from '@mui/system'
import { useTaskTableSort } from '../../components/TaskTable/tableSort/useTaskTableSort'

const TaskTablePage: React.FC = () => {
    const { data, loading, dispatch } = useTaskTableSort()
    return (
        <>
            {!loading && (
                <>
                    {data.data.length ? (
                        <Box
                            display='flex'
                            flexDirection='row'
                            justifyItems='center'
                            gap='10px'
                            height='auto'
                            pb={-2}
                        >
                            <TaskTable
                                data={data}
                                dispatch={dispatch}
                            />
                        </Box>
                    ) : (
                        <div>no tasks found!</div>
                    )}
                </>
            )}
            {loading && <div>loading</div>}
        </>
    )
}

export default TaskTablePage
