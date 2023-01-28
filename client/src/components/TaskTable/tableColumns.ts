interface Column {
    id:
        | 'taskId'
        | 'assignedUsers'
        | 'status'
        | 'priority'
        | 'title'
        | 'description'
        | 'labels'
    label: string
    minWidth?: number
    align?: 'right'
    format?: <T>(value: T) => string
}

export const tableColumns: readonly Column[] = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    {
        id: 'assignedUsers',
        label: 'Assigned to',
        minWidth: 170,
        align: 'right',
        format: (value: any) => value.map((item: any) => item.username),
    },
    {
        id: 'priority',
        label: 'Priority',
        minWidth: 170,
        align: 'right',
        // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'labels',
        label: 'Labels',
        minWidth: 170,
        align: 'right',
        // format: (value: number) => value.toFixed(2),
    },
]
