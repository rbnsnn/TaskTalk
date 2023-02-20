import { useInput } from './useInput'

export interface UseTaskInputReturnI {
    input: {
        value: string
        isValid: boolean
        hasError: boolean
        valueChangeHandler: (e: any) => void
        inputBlurHandler: (e: any) => void
        reset: () => void
    }
    label: string
}

export const useTaskInput = (label: string, conditions: any): UseTaskInputReturnI => {
    const { value, isValid, hasError, valueChangeHandler, inputBlurHandler, reset } =
        useInput(conditions)

    return {
        input: {
            value,
            isValid,
            hasError,
            valueChangeHandler,
            inputBlurHandler,
            reset,
        },
        label,
    }
}
