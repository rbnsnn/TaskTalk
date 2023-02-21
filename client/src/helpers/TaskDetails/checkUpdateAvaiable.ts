import { Priority } from '../../types/priority-enum'
import { TaskData } from '../../types/task-data.type'
import { ColumnData } from '../../types/column-data.type'
import { UserData } from '../../types/user-data.type'
import { LabelI } from '../../types/task-label.type'

export interface CheckUpdate {
    data: TaskData
    handlersValues: {
        title: string
        description: string
        priority: Priority
        status: ColumnData | null
        users: UserData[]
        labels: LabelI[]
    }
}

export const checkUpdateAvaiable = ({ handlersValues, data }: CheckUpdate): boolean => {
    const { title, description, priority, status, users, labels } = handlersValues

    const {
        title: oldTitle,
        description: oldDescription,
        priority: oldPriority,
        status: oldStatus,
        assignedUsers: oldUsers,
        labels: oldLabels,
    } = data

    const titleChanged = title === oldTitle
    const descriptionChanged = description === oldDescription
    const priorityChanged = priority === oldPriority
    const statusChanged = status?.name === oldStatus.name || !status
    const usersChanged = users.toString() === oldUsers.toString() || !users.length
    const labelsChanged = labels.toString() === oldLabels.toString() || !labels.length

    return (
        titleChanged &&
        descriptionChanged &&
        priorityChanged &&
        statusChanged &&
        usersChanged &&
        labelsChanged
    )
}
