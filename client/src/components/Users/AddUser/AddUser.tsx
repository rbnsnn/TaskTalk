import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useInput } from '../../../hooks/useInput';
import { isEmail, isLongerThan, isNotEmpty } from '../../../helpers/formHelper';
import { UserData } from '../../../types/user-data.type';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Role } from '../../../types/roles-enum.type';
import { useApi } from '../../../hooks/useApi';

interface Props {
    open: boolean;
    handleClose: () => void;
}

const AddUser: React.FC<Props> = ({ open, handleClose }) => {
    const { error, loading, executeFetch } = useApi('users/new', 'POST', false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const { companyName, companyId } = useSelector(
        (state: RootState) => state.auth.user
    );

    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: usernameReset,
    } = useInput(isLongerThan(4));

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useInput(isLongerThan(8));

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput(isEmail);

    const {
        value: roleValue,
        isValid: roleIsValid,
        hasError: roleHasError,
        valueChangeHandler: roleChangeHandler,
        inputBlurHandler: roleBlurHandler,
        reset: roleReset,
    } = useInput(isNotEmpty);

    const firstNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setFirstName(e.target.value);
    };

    const lastNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setLastName(e.target.value);
    };

    const phoneNumberChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = (e) => {
        setPhoneNumber(e.target.value);
    };

    const rolesCheck = (role: string): string[] => {
        if (role === Role.ADMIN) {
            return [Role.ADMIN, Role.MODERATOR, Role.USER];
        } else if (role === Role.MODERATOR) {
            return [Role.MODERATOR, Role.USER];
        } else if (role === Role.USER) {
            return [Role.USER];
        } else {
            return [''];
        }
    };

    let formIsValid = false;

    if (usernameIsValid && emailIsValid && passwordIsValid && roleIsValid) {
        formIsValid = true;
    }

    const handleReset = (): void => {
        usernameReset();
        passwordReset();
        emailReset();
        roleReset();
    };

    const handleSubmit = (): void => {
        const roles = rolesCheck(roleValue);

        const newUser: UserData = {
            companyId,
            companyName,
            username: usernameValue,
            email: emailValue,
            roles,
            firstName,
            lastName,
            phoneNumber,
            password: passwordValue,
        };

        console.log(newUser);
        executeFetch(newUser);

        // handleClose()
        handleReset();
    };

    const handleCancel = (): void => {
        handleClose();
        handleReset();
    };

    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle align='center'>Add new user</DialogTitle>
            <DialogContent>
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <TextField
                        required
                        margin='normal'
                        id='username'
                        label='Username'
                        variant='standard'
                        fullWidth
                        error={usernameHasError}
                        helperText={
                            usernameHasError ? 'username not valid' : ''
                        }
                        onChange={(e) => usernameChangeHandler(e)}
                        onBlur={(e) => usernameBlurHandler(e)}
                    />

                    <TextField
                        required
                        margin='normal'
                        id='password'
                        label='Temporary password'
                        variant='standard'
                        fullWidth
                        error={passwordHasError}
                        helperText={
                            passwordHasError ? 'password not valid' : ''
                        }
                        onChange={(e) => passwordChangeHandler(e)}
                        onBlur={(e) => passwordBlurHandler(e)}
                    />
                </Box>

                <TextField
                    required
                    margin='normal'
                    id='email'
                    label='Email'
                    variant='standard'
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
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <TextField
                        margin='normal'
                        id='firstName'
                        label='First Name'
                        variant='standard'
                        fullWidth
                        onChange={firstNameChangeHandler}
                    />
                    <TextField
                        margin='normal'
                        id='lastName'
                        label='Last Name'
                        variant='standard'
                        fullWidth
                        onChange={lastNameChangeHandler}
                    />
                </Box>
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <TextField
                        type='number'
                        margin='normal'
                        id='phoneNumber'
                        label='Phone number'
                        variant='standard'
                        fullWidth
                        onChange={phoneNumberChangeHandler}
                    />
                    <FormControl
                        required
                        margin='normal'
                        fullWidth
                        variant='standard'
                        error={roleHasError}
                    >
                        <InputLabel id='roleLabel'>Role</InputLabel>
                        <Select
                            value={roleValue || ''}
                            label='Role'
                            labelId='roleLabel'
                            id='role'
                            onChange={roleChangeHandler}
                            onBlur={roleBlurHandler}
                        >
                            <MenuItem value={Role.ADMIN}>Admin</MenuItem>
                            <MenuItem value={Role.MODERATOR}>
                                Moderator
                            </MenuItem>
                            <MenuItem value={Role.USER}>User</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            >
                <Button
                    color='error'
                    variant='contained'
                    size='large'
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!formIsValid}
                    variant='contained'
                    size='large'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUser;
