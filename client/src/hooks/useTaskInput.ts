import { useInput } from './useInput'

export interface UseTaskInputReturnI {
    input: {
        value: string
        setValue: (value: any) => void
        isValid: boolean
        hasError: boolean
        valueChangeHandler: (e: any) => void
        valueChangeHandlerTouched: (e: any) => void
        inputBlurHandler: (e: any) => void
        reset: () => void
    }
    label: string
    initValue: string | null
}

export const useTaskInput = (
    label: string,
    conditions: any,
    initValue?: string
): UseTaskInputReturnI => {
    const {
        value,
        setValue,
        isValid,
        hasError,
        valueChangeHandler,
        valueChangeHandlerTouched,
        inputBlurHandler,
        reset,
    } = useInput(conditions, initValue)

    return {
        input: {
            value,
            setValue,
            isValid,
            hasError,
            valueChangeHandler,
            valueChangeHandlerTouched,
            inputBlurHandler,
            reset,
        },
        label,
        initValue: initValue ? initValue : null,
    }
}
