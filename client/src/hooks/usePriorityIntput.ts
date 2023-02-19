import { useState } from 'react'
import { useInput } from './useInput'
import { isNotEmpty } from '../helpers/formHelper'

export const usePrioritySelect = () => {
    const {
        value: priorityValue,
        isValid: priorityIsValid,
        hasError: priorityHasError,
        valueChangeHandler: priorityChangeHandler,
        inputBlurHandler: priorityBlurHandler,
        reset: priorityReset,
    } = useInput(isNotEmpty)
}
