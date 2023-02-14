import React, { useEffect, useCallback, useState } from 'react'
import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    DialogActions,
    Button,
    CircularProgress,
    IconButton,
} from '@mui/material'
import { useInput } from '../../../hooks/useInput'
import { isLongerThan } from '../../../helpers/formHelper'
import { useApi } from '../../../hooks/useApi'
import { randomColor } from '../../../helpers/randomColor'
import LoopIcon from '@mui/icons-material/Loop'
import Label from '../Label'

interface Props {
    open: boolean
    close: () => void
}
const LabelAddDialog: React.FC<Props> = ({ open, close }) => {
    const [color, setColor] = useState<string>(randomColor())
    const [colorIsValid, setColorIsValid] = useState<boolean>(true)
    const { loading, error, success, executeFetch } = useApi(
        'companies/tasks/new',
        'POST',
        false
    )

    const {
        value: labelValue,
        isValid: labelIsValid,
        valueChangeHandler: labelChangeHandler,
        reset: labelReset,
    } = useInput(isLongerThan(4))

    const {
        value: descriptionValue,
        valueChangeHandler: descriptionChangeHandler,
        reset: descriptionReset,
    } = useInput(isLongerThan(0))

    const colorChangeHandler: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e): void => {
        const input = e.currentTarget.value

        if (
            !/\B#[0-9a-f]+$/.test(input) ||
            input.length < 4 ||
            (input.length > 4 && input.length < 7)
        ) {
            setColorIsValid(false)
        } else {
            setColorIsValid(true)
        }

        if (input.length > 7) {
            setColor(input.slice(0, 7))
            return
        } else if (input.length > 0) {
            setColor(input)
        } else {
            setColor('#')
            setColorIsValid(false)
        }
    }

    const handleColorRandomChange = (): void => {
        setColor(randomColor)
        setColorIsValid(true)
    }

    const handleReset = useCallback((): void => {
        labelReset()
        descriptionReset()
    }, [labelReset, descriptionReset])

    const handleCancel = useCallback((): void => {
        close()
        setTimeout(() => handleReset(), 1000)
    }, [close, handleReset])

    let formIsValid = false

    if (labelIsValid && colorIsValid) {
        formIsValid = true
    }

    const handleSubmit = (): void => {
        executeFetch()
        console.log(labelValue, descriptionValue)
    }

    useEffect(() => {
        if (!success) {
            return
        }
        const labelAdded = setTimeout(() => {
            handleCancel()
        }, 1000)

        return () => {
            clearTimeout(labelAdded)
        }
    }, [success, handleCancel])

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            open={open}
        >
            <DialogTitle align='center'>Add new label</DialogTitle>
            <DialogContent>
                <Box
                    justifyContent='space-around'
                    gap='10px'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 1,
                            minWidth: '25%',
                        }}
                    >
                        <Label
                            label={labelValue ? labelValue : 'Label Preview'}
                            color={color}
                            description={descriptionValue}
                        />
                    </Box>
                    <TextField
                        autoComplete='off'
                        size='small'
                        required
                        margin='normal'
                        id='label'
                        label='label'
                        fullWidth
                        onChange={(e) => labelChangeHandler(e)}
                    />
                    <TextField
                        size='small'
                        margin='normal'
                        id='description'
                        label='Description'
                        fullWidth
                        onChange={(e) => descriptionChangeHandler(e)}
                    />

                    <TextField
                        autoComplete='off'
                        size='small'
                        margin='normal'
                        id='color'
                        label='color'
                        fullWidth
                        onChange={(e) => colorChangeHandler(e)}
                        value={color || '#'}
                        sx={{
                            input: {
                                color: colorIsValid ? 'white' : '#f44336',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <LoopIcon
                            onClick={handleColorRandomChange}
                            sx={{
                                cursor: 'pointer',
                                mt: 1,
                                ml: 'auto',
                                mr: 'auto',
                                transition: 'ease-in-out 0.2s',
                                '&:hover': {
                                    color: '#33A095',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '80px',
                    mb: 2,
                }}
            >
                {error && <Alert severity='error'>{error}</Alert>}
                {success && <Alert severity='success'>Label created successfully!</Alert>}
                {loading && <CircularProgress />}

                {!success && (
                    <>
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
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default LabelAddDialog
