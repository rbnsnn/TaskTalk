import React from 'react'
import TaskTable from '../../components/TaskTable/TaskTable'
import { Box } from '@mui/system'
import { useApi } from '../../hooks/useApi'

const TaskTablePage = () => {
    const { data, loading } = useApi(`tasks/all`, 'GET')
    return (
        <>
            {!loading && (
                <>
                    {data ? (
                        <Box
                            display='flex'
                            flexDirection='row'
                            justifyItems='center'
                            gap='10px'
                            height='auto'
                            pb={-2}
                        >
                            <TaskTable data={data} />
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
