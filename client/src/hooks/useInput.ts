import { useReducer } from 'react'

type ACTIONTYPE =
    | { type: 'INPUT'; value: any }
    | { type: 'INPUTTOUCHED'; value: any }
    | { type: 'SET'; value: any }
    | { type: 'BLUR'; value: any }
    | { type: 'RESET'; value: any }
    | { type: 'LAST'; value: any }

const initialInputState = {
    value: '',
    isTouched: false,
}

const inputStateReducer = (state: typeof initialInputState, action: ACTIONTYPE): any => {
    if (action.type === 'INPUT') {
        return { isTouched: state.isTouched, value: action.value }
    }
    if (action.type === 'INPUTTOUCHED') {
        return { isTouched: true, value: action.value }
    }
    if (action.type === 'SET') {
        return { isTouched: false, value: action.value }
    }
    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value }
    }
    if (action.type === 'RESET') {
        return { isTouched: false, value: '' }
    }
    if (action.type === 'LAST') {
        return { isTouched: true, value: action.value }
    }
    return inputStateReducer
}

export const useInput = (validateValue: any, initValue: string = '') => {
    const [inputState, dispatch] = useReducer(inputStateReducer, {
        value: initValue,
        isTouched: false,
    })

    const valueIsValid = validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const valueChangeHandler = (event: any) => {
        dispatch({ type: 'INPUT', value: event.target.value })
    }

    const valueChangeHandlerTouched = (event: any) => {
        dispatch({ type: 'INPUTTOUCHED', value: event.target.value })
    }

    const setValue = (value: any) => {
        dispatch({ type: 'SET', value })
    }

    const inputBlurHandler = (event: any) => {
        dispatch({ type: 'BLUR', value: event.target.value })
    }

    const reset = () => {
        dispatch({ type: 'RESET', value: '' })
    }

    const lastInputHandler = (event: any) => {
        dispatch({ type: 'LAST', value: event.target.value })
    }

    return {
        value: inputState.value,
        setValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueChangeHandlerTouched,
        inputBlurHandler,
        lastInputHandler,
        reset,
    }
}
