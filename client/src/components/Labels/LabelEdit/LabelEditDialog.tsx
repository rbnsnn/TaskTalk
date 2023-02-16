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
} from '@mui/material'
import { useInput } from '../../../hooks/useInput'
import { isLongerThan } from '../../../helpers/formHelper'
import { useApi } from '../../../hooks/useApi'
import { randomColor } from '../../../helpers/randomColor'
import { LabelI } from '../../../types/task-label.type'
import LoopIcon from '@mui/icons-material/Loop'
import Label from '../Label'

interface Props {
    open: boolean
    close: () => void
    label: LabelI
}
const LabelEditDialog: React.FC<Props> = ({ open, close, label }) => {
    const [color, setColor] = useState<string>(label.color)
    const [colorIsValid, setColorIsValid] = useState<boolean>(true)
    const { loading, error, success, executeFetch } = useApi(
        `companies/labels/${label.label}`,
        'PATCH',
        false
    )

    const {
        value: labelValue,
        isValid: labelIsValid,
        valueChangeHandler: labelChangeHandler,
        reset: labelReset,
    } = useInput(isLongerThan(4), label.label)

    const {
        value: descriptionValue,
        valueChangeHandler: descriptionChangeHandler,
        reset: descriptionReset,
    } = useInput(isLongerThan(0), label.description)

    const colorChangeHandler: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e): void => {
        const input = e.currentTarget.value

        if (
            input.length < 4 ||
            (input.length > 4 && input.length < 7) ||
            !/\B#[0-9a-f]+$/.test(input.slice(0, 7))
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

    if (
        labelIsValid &&
        colorIsValid &&
        (label.label !== labelValue ||
            label.description !== descriptionValue ||
            label.color !== color)
    ) {
        formIsValid = true
    }

    const handleSubmit = (): void => {
        const updatedLabel = {
            label: labelValue,
            color,
            description: descriptionValue,
        }
        executeFetch(updatedLabel)
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
            <DialogTitle
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                Edit label:
                <Label
                    label={label.label}
                    color={label.color}
                />
            </DialogTitle>
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
                        value={labelValue}
                        onChange={(e) => labelChangeHandler(e)}
                    />
                    <TextField
                        size='small'
                        margin='normal'
                        id='description'
                        label='Description'
                        fullWidth
                        value={descriptionValue}
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
                                color: colorIsValid ? '' : '#f44336',
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

export default LabelEditDialog
