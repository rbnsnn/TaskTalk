import React, { useState } from 'react'
import { Alert, Box, Button, CircularProgress, Grid, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { authLogin } from './actions/loginAction'
import { authActions } from './authSlice'
import TextLink from '../Links/TextLink'
import { RootState } from '../../store/store'

const LoginForm: React.FC = () => {
    const [username, handleUsername] = useState<string>('')
    const [password, handlePassword] = useState<string>('')

    const { loading, error } = useAppSelector((state: RootState) => state.auth)

    const dispatch = useAppDispatch()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        dispatch(authLogin({ username, password }))
    }

    const handleRemoveErrAndSucc = () => dispatch(authActions.removeErrAndSucc())

    return (
        <>
            {error && <Alert severity='error'>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    margin='normal'
                    id='username'
                    label='Username or Email'
                    variant='standard'
                    autoComplete='username'
                    fullWidth
                    disabled={loading}
                    onChange={(e) => handleUsername(e.target.value)}
                />

                <TextField
                    margin='normal'
                    id='password'
                    label='Password'
                    variant='standard'
                    type='password'
                    autoComplete='password'
                    fullWidth
                    disabled={loading}
                    onChange={(e) => handlePassword(e.target.value)}
                />

                {loading && (
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        sx={{ mt: 3, mb: 1 }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                <Button
                    type='submit'
                    sx={{ mt: 3, mb: 2 }}
                    variant='contained'
                    fullWidth
                    disabled={loading || !username || !password}
                >
                    Signin
                </Button>
            </form>

            <Grid container>
                <Grid
                    item
                    xs
                >
                    <TextLink
                        to={'../resetpassword'}
                        onClick={handleRemoveErrAndSucc}
                    >
                        Forgot password?
                    </TextLink>
                </Grid>

                <Grid item>
                    <TextLink
                        to={'../register'}
                        onClick={handleRemoveErrAndSucc}
                    >
                        Don't have an account? Sign Up
                    </TextLink>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm
