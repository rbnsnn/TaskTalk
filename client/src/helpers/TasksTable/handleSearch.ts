import { CompanyUsers } from '../../types/company-users.type'
import { TaskData } from '../../types/task-data.type'
import { LabelI } from '../../types/task-label.type'

export const handleSearch = (
    data: TaskData[],
    input: string | any
): TaskData[] | boolean => {
    const filtered = data.filter((task: TaskData) => {
        const date = new Date(task.created!).toLocaleDateString()
        const filterTitle = task.title.toLowerCase().includes(input)
        const filterUsers = task.assignedUsers
            .map((user: CompanyUsers) => user.username.toLowerCase().includes(input))
            .some(Boolean)

        const filterPriority = task.priority.toLowerCase().includes(input)
        const filterStatus = task.status.name.toLowerCase().includes(input)
        const filterId = task.taskId.includes(input)
        const filterDate = date.includes(input)
        const filterLabel = task.labels
            .map((element: LabelI) => element.label.toLowerCase())
            .includes(input)

        if (
            filterTitle ||
            filterUsers ||
            filterPriority ||
            filterStatus ||
            filterId ||
            filterDate ||
            filterLabel
        ) {
            return task
        }
        return false
    })
    return filtered
}
