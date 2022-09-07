import { Box, Button, Grid, Link as MuiLink, TextField, Alert, CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { authRegister } from './actions/registerAction'
import { useEffect } from 'react'
import { authActions } from './authSlice'

const RegisterForm: React.FC = () => {
    const isLongerThan = (value: string) => value.length >= 4
    const {
        value: companyValue,
        isValid: companyIsValid,
        hasError: companyHasError,
        valueChangeHandler: companyChangeHandler,
        inputBlurHandler: companyBlurHandler,
    } = useInput(isLongerThan)

    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
    } = useInput(isLongerThan)

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(isLongerThan)

    const isEqual = (value: string) => value === passwordValue

    const {
        isValid: passwordCheckIsValid,
        hasError: passwordCheckHasError,
        lastInputHandler: passwordCheckChangeHandler,
        inputBlurHandler: passwordCheckBlurHandler,
    } = useInput(isEqual)

    let formIsValid = false;

    if (companyIsValid && usernameIsValid && passwordIsValid && passwordCheckIsValid) {
        formIsValid = true;
    }

    const dispatch = useAppDispatch()
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event?.preventDefault()

        const data = {
            companyName: companyValue,
            username: usernameValue,
            password: passwordValue
        }

        dispatch(authRegister(data))
    }

    const error = useAppSelector(state => state.auth.error)
    const success = useAppSelector(state => state.auth.success)
    const loading = useAppSelector(state => state.auth.loading)

    const navigate = useNavigate()
    useEffect(() => {
        if (!success) {
            return
        }
        const redirect = setTimeout(() => {
            navigate('../login')
            dispatch(authActions.removeErrAndSucc())
        }, 1000)

        return () => {
            clearTimeout(redirect)
        }
    }, [dispatch, navigate, success])

    return (
        <>
            {error && <Alert severity='error'>{error}</Alert>}
            {success && <Alert severity='success'>User created successfully!</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    inputProps={{ pattern: "[a-z]" }}
                    margin='normal'
                    id='company'
                    label='Company'
                    variant='outlined'
                    fullWidth
                    error={companyHasError}
                    helperText={companyHasError ? 'Company wrong' : ''}
                    onChange={(e) => companyChangeHandler(e)}
                    onBlur={(e) => companyBlurHandler(e)}
                />
                <TextField
                    margin='normal'
                    id='username'
                    label='Username'
                    variant='outlined'
                    autoComplete='username'
                    fullWidth
                    error={usernameHasError}
                    helperText={usernameHasError ? 'Username wrong' : ''}
                    onChange={(e) => usernameChangeHandler(e)}
                    onBlur={(e) => usernameBlurHandler(e)}
                />

                <TextField
                    margin='normal'
                    id='password' label='Password'
                    variant='outlined' type='password'
                    autoComplete='password'
                    fullWidth
                    error={passwordHasError}
                    helperText={passwordHasError ? 'Password wrong' : ''}
                    onChange={(e) => passwordChangeHandler(e)}
                    onBlur={(e) => passwordBlurHandler(e)}
                />

                <TextField
                    margin='normal'
                    id='password-repeat' label='Repeat password'
                    variant='outlined' type='password'
                    autoComplete='password'
                    fullWidth
                    error={passwordCheckHasError}
                    helperText={passwordCheckHasError ? 'Password mismatch' : ''}
                    onChange={(e) => passwordCheckChangeHandler(e)}
                    onBlur={(e) => passwordCheckBlurHandler(e)}
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
                    disabled={loading || success || !formIsValid}
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

                    <Link to='../login' onClick={() => dispatch(authActions.removeErrAndSucc())}>
                        <MuiLink component='button' variant='body2'>
                            Already have an account? Sign In
                        </MuiLink>
                    </Link>

                </Grid>
            </Grid>
        </>
    )
}

export default RegisterForm