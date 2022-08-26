import React from 'react';
import { Button, Grid, Link, TextField } from '@mui/material';


interface Props {
    handleFormChange: () => void
}

const RegisterForm: React.FC<Props> = ({ handleFormChange }) => {



    return (
        <>
            <form>
                <TextField
                    margin='normal'
                    id='company'
                    label='Company'
                    variant='outlined'
                    fullWidth
                />
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

                <TextField
                    margin='normal'
                    id='password-repeat' label='Repeat password'
                    variant='outlined' type='password'
                    autoComplete='password'
                    fullWidth
                />

                <Button
                    onClick={() => console.log('registration')}
                    sx={{ mt: 3, mb: 2 }}
                    variant='contained'
                    fullWidth
                >
                    Register
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
                        Already have an account? Sign In
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}

export default RegisterForm