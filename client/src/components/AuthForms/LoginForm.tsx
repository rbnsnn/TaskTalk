import React from 'react';
import { Button, Grid, Link, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { authActions } from '../Auth/authSlice'


interface Props {
    handleFormChange: () => void
}

const LoginForm: React.FC<Props> = ({ handleFormChange }) => {
    const dispatch = useAppDispatch()

    return (
        <>
            <form>
                <TextField
                    margin='normal'
                    id='email'
                    label='Email'
                    variant='outlined'
                    autoComplete='email'
                    fullWidth
                />

                <TextField
                    margin='normal'
                    id='password' label='Password'
                    variant='outlined' type='password'
                    autoComplete='password'
                    fullWidth
                />

                <Button
                    onClick={() => dispatch(authActions.login())}
                    sx={{ mt: 3, mb: 2 }}
                    variant='contained'
                    fullWidth
                >
                    Signin
                </Button>
            </form>

            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>

                <Grid item>
                    <Link component='button' onClick={handleFormChange}>
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm