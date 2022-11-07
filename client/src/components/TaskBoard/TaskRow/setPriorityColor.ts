import { Priority, PriorityColor } from '../../../types/priority-enum'

export const setPriorityColor = (priority: string): string => {
    if (priority === Priority.LOW) {
        return PriorityColor.LOW
    } else if (priority === Priority.MEDIUM) {
        return PriorityColor.MEDIUM
    } else if (priority === Priority.HIGH) {
        return PriorityColor.HIGH
    } else {
        return PriorityColor.UNDEFINED
    }
}
