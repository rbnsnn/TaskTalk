import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material'
import { useInput } from '../../../hooks/useInput'


interface Props {
    open: boolean
    handleClose: () => void
}

const AddUser: React.FC<Props> = ({ open, handleClose }) => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    const isLongerThan = (value: string) => value.length >= 4

    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler
    } = useInput(isLongerThan)

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler
    } = useInput(isLongerThan)

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler
    } = useInput(isLongerThan)

    const firstNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFirstName(e.target.value)
    }

    const lastNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setLastName(e.target.value)
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle align='center'>Add new user</DialogTitle>
            <DialogContent>
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' }
                    }}
                >
                    <TextField
                        required
                        margin='normal'
                        id='username'
                        label='Username'
                        variant='outlined'
                        fullWidth
                        error={usernameHasError}
                        helperText={usernameHasError ? 'username not valid' : ''}
                        onChange={(e) => usernameChangeHandler(e)}
                        onBlur={(e) => usernameBlurHandler(e)}
                    />

                    <TextField
                        required
                        margin='normal'
                        id='password'
                        label='Password'
                        variant='outlined'
                        fullWidth
                        error={passwordHasError}
                        helperText={passwordHasError ? 'password not valid' : ''}
                        onChange={(e) => passwordChangeHandler(e)}
                        onBlur={(e) => passwordBlurHandler(e)}
                    />
                </Box>

                <TextField
                    required
                    margin='normal'
                    id='email'
                    label='Email'
                    variant='outlined'
                    fullWidth
                    error={emailHasError}
                    helperText={emailHasError ? 'email not valid' : ''}
                    onChange={(e) => emailChangeHandler(e)}
                    onBlur={(e) => emailBlurHandler(e)}
                />

                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' }
                    }}
                >
                    <TextField
                        margin='normal'
                        id='firstName'
                        label='First Name'
                        variant='outlined'
                        fullWidth
                        onChange={firstNameChangeHandler}
                    />
                    <TextField
                        margin='normal'
                        id='lastName'
                        label='Last Name'
                        variant='outlined'
                        fullWidth
                        onChange={firstNameChangeHandler}
                    />
                </Box>
                <TextField
                    type='number'
                    margin='normal'
                    id='phoneNumber'
                    label='Phone number'
                    variant='outlined'
                    fullWidth
                    onChange={firstNameChangeHandler}
                />
                <TextField
                    type='number'
                    margin='normal'
                    id='roles'
                    label='Roles'
                    variant='outlined'
                    fullWidth
                    onChange={firstNameChangeHandler}
                />

            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2
                }}
            >
                <Button color='error' variant='contained' size='large' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' size='large' onClick={handleClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUser