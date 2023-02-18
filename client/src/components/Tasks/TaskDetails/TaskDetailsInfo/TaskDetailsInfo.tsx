import React, { useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { setPriorityColor } from '../../../../helpers/setPriorityColor'
import { TaskData } from '../../../../types/task-data.type'
import { CompanyUsers } from '../../../../types/company-users.type'
import { LabelI } from '../../../../types/task-label.type'
import TaskDetailsElement from './TaskDetailsElement'

const DetailElementsContainer = styled(Box)(() => ({
    maxWidth: 'min-content',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
}))

interface Props {
    data: TaskData
}

const TaskDetailsInfo: React.FC<Props> = ({ data }) => {
    const [description, setDescription] = useState<string>(data.description)
    const [priority, setPriority] = useState<string>(data.priority)
    const [status, setStatus] = useState<string>(data.status.name)
    const [assignedUsers, setAssignedUsers] = useState<CompanyUsers[]>(data.assignedUsers)
    const [labels, setLabels] = useState<LabelI[]>(data.labels)

    const date = new Date(data.created!).toLocaleString()
    return (
        <Box>
            <Typography
                variant='h4'
                mb={2}
            >
                {data.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <DetailElementsContainer>
                    <TaskDetailsElement
                        caption='Task ID'
                        value={data.taskId}
                        copy
                    />

                    <TaskDetailsElement
                        caption='description'
                        value={description}
                        setValue={setDescription}
                        editable
                        flex={4}
                    />
                </DetailElementsContainer>
                <DetailElementsContainer>
                    <TaskDetailsElement
                        caption='Priority'
                        value={priority}
                        setValue={setPriority}
                        editable
                        variant='select'
                        color={setPriorityColor(data.priority)}
                    />

                    <TaskDetailsElement
                        caption='Status'
                        value={status}
                        setValue={setStatus}
                        editable
                        variant='select'
                        color={data.status.color}
                    />

                    <TaskDetailsElement
                        caption='Created by'
                        value={data.createdBy![0].username}
                    />

                    <TaskDetailsElement
                        caption='Created'
                        value={date}
                    />
                </DetailElementsContainer>
                <DetailElementsContainer>
                    <TaskDetailsElement
                        caption='Assigned users'
                        value={assignedUsers}
                        editable
                        variant='users'
                    />
                    <TaskDetailsElement
                        caption='Assigned labels'
                        value={labels}
                        editable
                        variant='labels'
                    />
                </DetailElementsContainer>
            </Box>
        </Box>
    )
}

export default TaskDetailsInfo
