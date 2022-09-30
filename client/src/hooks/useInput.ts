import { useReducer } from 'react'


type ACTIONTYPE =
    | { type: 'INPUT'; value: any }
    | { type: 'BLUR'; value: any }
    | { type: 'RESET'; value: any }
    | { type: 'LAST'; value: any }

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state: typeof initialInputState, action: ACTIONTYPE): any => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value };
    }
    if (action.type === 'RESET') {
        return { isTouched: false, value: '' };
    }
    if (action.type === 'LAST') {
        return { isTouched: true, value: action.value, };
    }
    return inputStateReducer;
};

export const useInput = (validateValue: any) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: any) => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };

    const inputBlurHandler = (event: any) => {
        dispatch({ type: 'BLUR', value: '' });
    };

    const reset = () => {
        dispatch({ type: 'RESET', value: '' });
    };

    const lastInputHandler = (event: any) => {
        dispatch({ type: 'LAST', value: event.target.value })
    }


    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        lastInputHandler,
        reset,
    }
}