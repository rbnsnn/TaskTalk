import { Box, Button, Grid, TextField, Alert, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useInput } from '../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { authRegister } from './actions/registerAction'
import { useEffect } from 'react'
import { authActions } from './authSlice'
import { isEmail, isLongerThan, isEqual } from '../../helpers/formHelper'
import TextLink from '../TextLink'


const RegisterForm: React.FC = () => {

    const {
        value: companyValue,
        isValid: companyIsValid,
        hasError: companyHasError,
        valueChangeHandler: companyChangeHandler,
        inputBlurHandler: companyBlurHandler,
    } = useInput(isLongerThan(3))

    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
    } = useInput(isLongerThan(4))

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(isEmail)

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(isLongerThan(8))



    const {
        isValid: passwordCheckIsValid,
        hasError: passwordCheckHasError,
        lastInputHandler: passwordCheckChangeHandler,
        inputBlurHandler: passwordCheckBlurHandler,
    } = useInput(isEqual(passwordValue))

    let formIsValid = false;

    if (companyIsValid && usernameIsValid && emailIsValid && passwordIsValid && passwordCheckIsValid) {
        formIsValid = true;
    }

    const dispatch = useAppDispatch()
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event?.preventDefault()

        const data = {
            companyName: companyValue,
            username: usernameValue,
            email: emailValue,
            password: passwordValue
        }

        dispatch(authRegister(data))
    }

    const handleRemoveErrAndSucc = () => dispatch(authActions.removeErrAndSucc())

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
                    margin='normal'
                    id='company'
                    label='Company'
                    variant='standard'
                    fullWidth
                    error={companyHasError}
                    helperText={companyHasError ? 'entered company is not valid' : ''}
                    onChange={(e) => companyChangeHandler(e)}
                    onBlur={(e) => companyBlurHandler(e)}
                />

                <TextField
                    margin='normal'
                    id='username'
                    label='Username'
                    variant='standard'
                    autoComplete='username'
                    fullWidth
                    error={usernameHasError}
                    helperText={usernameHasError ? 'entered username is not valid' : ''}
                    onChange={(e) => usernameChangeHandler(e)}
                    onBlur={(e) => usernameBlurHandler(e)}
                />

                <TextField
                    margin='normal'
                    id='email'
                    label='Email'
                    variant='standard'
                    autoComplete='email'
                    fullWidth
                    error={emailHasError}
                    helperText={emailHasError ? 'entered email is not valid' : ''}
                    onChange={(e) => emailChangeHandler(e)}
                    onBlur={(e) => emailBlurHandler(e)}
                />

                <TextField
                    margin='normal'
                    id='password' label='Password'
                    variant='standard' type='password'
                    autoComplete='password'
                    fullWidth
                    error={passwordHasError}
                    helperText={passwordHasError ? 'entered password is not valid' : ''}
                    onChange={(e) => passwordChangeHandler(e)}
                    onBlur={(e) => passwordBlurHandler(e)}
                />

                <TextField
                    margin='normal'
                    id='password-repeat' label='Repeat password'
                    variant='standard' type='password'
                    autoComplete='password'
                    fullWidth
                    error={passwordCheckHasError}
                    helperText={passwordCheckHasError ? 'Passwords mismatch' : ''}
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
                    <TextLink to={'../resetpassword'} onClick={handleRemoveErrAndSucc}>
                        Forgot password?
                    </TextLink>
                </Grid>

                <Grid item>
                    <TextLink to={'../login'} onClick={handleRemoveErrAndSucc}>
                        Already have an account? Sign In
                    </TextLink>
                </Grid>
            </Grid>
        </>
    )
}

export default RegisterForm