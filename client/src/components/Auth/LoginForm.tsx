import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, Link as MuiLink, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { authLogin } from './actions/loginAction';
import { authActions } from './authSlice';


const LoginForm: React.FC = () => {
    const [username, handleUsername] = useState<string>('')
    const [password, handlePassword] = useState<string>('')

    const { isLoggedIn, loading, error } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        dispatch(authLogin({ username, password }))
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard')
        }
    }, [isLoggedIn, navigate])

    return (
        <>
            {error && <Alert severity='error'>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    margin='normal'
                    id='username'
                    label='Username'
                    variant='outlined'
                    autoComplete='username'
                    fullWidth
                    disabled={loading}
                    onChange={(e) => handleUsername(e.target.value)}
                />

                <TextField
                    margin='normal'
                    id='password' label='Password'
                    variant='outlined' type='password'
                    autoComplete='password'
                    fullWidth
                    disabled={loading}
                    onChange={(e) => handlePassword(e.target.value)}
                />

                {loading && <Box
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
                    disabled={loading || (!username || !password)}
                >
                    Signin
                </Button>
            </form>

            <Grid container>
                <Grid item xs>
                    <Link to='../resetpassword'>
                        <MuiLink component='button' variant='body2'>
                            Forgot password?
                        </MuiLink>
                    </Link>
                </Grid>

                <Grid item>

                    <Link to='../register' onClick={() => dispatch(authActions.removeErrAndSucc())} >
                        <MuiLink component='button' variant='body2'>
                            Don't have an account? Sign Up
                        </MuiLink>
                    </Link>

                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm