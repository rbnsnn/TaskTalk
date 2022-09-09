import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks';
import { authActions } from '../../components/Auth/authSlice';

const AuthPage: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authActions.logout())
    })

    return (
        <>
        </>
    )
}

export default AuthPage