import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Grid, Link, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { UserAuth } from '../../types/user-auth-type'


interface Props {
    handleFormChange: () => void
}

const LoginForm: React.FC<Props> = ({ handleFormChange }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const email = emailInputRef.current?.value
        const password = passwordInputRef.current?.value

        const API_URL: string = (process.env.REACT_APP_API_URL as string)

        setIsLoading(true)

        try {
            const { data, status } = await axios.post<UserAuth>(
                `${API_URL}/login`,
                { email, password },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )
            console.log(data, status)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    margin='normal'
                    id='email'
                    label='Email'
                    variant='outlined'
                    autoComplete='email'
                    fullWidth
                    ref={emailInputRef}
                    disabled={isLoading}
                />

                <TextField
                    margin='normal'
                    id='password' label='Password'
                    variant='outlined' type='password'
                    autoComplete='password'
                    fullWidth
                    ref={passwordInputRef}
                    disabled={isLoading}
                />

                {isLoading && <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    sx={{ mt: 3, mb: 1 }}
                >
                    <CircularProgress />
                </Box>}

                <Button
                    type='submit'
                    sx={{ mt: 3, mb: 2 }}
                    variant='contained'
                    fullWidth
                    disabled={isLoading}
                >
                    Signin
                </Button>
            </form>

            <Grid container>
                <Grid item xs>
                    <Link href='#' variant='body2'>
                        Forgot password?
                    </Link>
                </Grid>

                <Grid item>
                    <Link component='button' variant='body2' onClick={handleFormChange}>
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm