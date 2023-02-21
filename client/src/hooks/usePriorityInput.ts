import { useInput } from './useInput'
import { isNotEmpty } from '../helpers/formHelper'
import { Priority } from '../types/priority-enum'

export interface UsePriorityReturnI {
    priority: {
        priorityValue: Priority
        priorityIsValid: boolean
        priorityHasError: boolean
        priorityChangeHandler: (event: any) => void
        priorityBlurHandler: (event: any) => void
        priorityReset: () => void
    }
}

export const usePriorityInput = (active?: string) => {
    const {
        value: priorityValue,
        isValid: priorityIsValid,
        hasError: priorityHasError,
        valueChangeHandler: priorityChangeHandler,
        inputBlurHandler: priorityBlurHandler,
        reset: priorityReset,
    } = useInput(isNotEmpty, active)
    return {
        priority: {
            priorityValue,
            priorityIsValid,
            priorityHasError,
            priorityChangeHandler,
            priorityBlurHandler,
            priorityReset,
        },
    }
}
