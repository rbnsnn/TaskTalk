import React from 'react'
import { Box, styled } from '@mui/material'
import { setPriorityColor } from '../../../../helpers/setPriorityColor'
import { TaskData } from '../../../../types/task-data.type'
import { useStatusInput } from '../../../../hooks/useStatusInput'
import { usePriorityInput } from '../../../../hooks/usePriorityInput'
import { useLabelsInput } from '../../../../hooks/useLabelsInput'
import { useUsersInput } from '../../../../hooks/useUsersInput'
import { useTaskInput } from '../../../../hooks/useTaskInput'
import { isLongerThan } from '../../../../helpers/formHelper'
import TaskDetailsElement from '../TaskDetailsElement/TaskDetailsElement'
import TaskDetailsTitleElement from '../TaskDetailsElement/TaskDetailsTitleElement'
import TaskDetailsSaveChangesButton from '../TaskDetailsElement/TaskDetailsSaveChangesButton'

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
    const titleHandler = useTaskInput('Title', isLongerThan(4), data.title)
    const { input: title } = titleHandler

    const descriptionHandler = useTaskInput(
        'Description',
        isLongerThan(8),
        data.description
    )
    const { input: description } = descriptionHandler

    const priorityHandler = usePriorityInput(data.priority)
    const { priority } = priorityHandler

    const statusHandler = useStatusInput(data.status.name)
    const { status } = statusHandler

    const usersHandler = useUsersInput(data.assignedUsers)
    const { users } = usersHandler

    const labelsHandler = useLabelsInput(data.labels)
    const { labels } = labelsHandler

    const date = new Date(data.created!).toLocaleString()

    const handlersValues = {
        title: title.value,
        description: description.value,
        priority: priority.priorityValue,
        status: status.assignedStatus,
        users: users.assignedUsers,
        labels: labels.assignedLabels,
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <TaskDetailsTitleElement
                    value={title.value}
                    handler={titleHandler}
                    editable
                />
                <TaskDetailsSaveChangesButton
                    data={data}
                    handlersValues={handlersValues}
                />
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                <DetailElementsContainer>
                    <TaskDetailsElement
                        caption='Task ID'
                        value={data.taskId}
                        copy
                    />

                    <TaskDetailsElement
                        caption='description'
                        value={description.value}
                        handler={descriptionHandler}
                        editable
                        flex={4}
                    />
                </DetailElementsContainer>
                <DetailElementsContainer>
                    <TaskDetailsElement
                        caption='Priority'
                        value={priority.priorityValue}
                        handler={priorityHandler}
                        editable
                        variant='selectPriority'
                        color={setPriorityColor(priority.priorityValue)}
                    />

                    <TaskDetailsElement
                        caption='Status'
                        value={status.assignedStatus ? status.assignedStatus.name : ''}
                        handler={statusHandler}
                        editable
                        variant='selectStatus'
                        color={status.assignedStatus?.color}
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
                        value={users.assignedUsers}
                        handler={usersHandler}
                        editable
                        variant='users'
                    />
                    <TaskDetailsElement
                        caption='Assigned labels'
                        value={labels.assignedLabels}
                        handler={labelsHandler}
                        editable
                        variant='labels'
                    />
                </DetailElementsContainer>
            </Box>
        </Box>
    )
}

export default TaskDetailsInfo
