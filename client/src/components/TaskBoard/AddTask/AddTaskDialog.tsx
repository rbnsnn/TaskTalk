import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    DialogActions,
    Button,
    InputLabel,
    Autocomplete,
} from '@mui/material'

interface Props {
    open: boolean
    close: () => void
}
const AddTaskDialog: React.FC<Props> = ({ open, close }) => {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ]
    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle align='center'>Add new task</DialogTitle>
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
                        id='title'
                        label='Title'
                        variant='standard'
                        fullWidth
                    />
                </Box>
                <Box>
                    <Autocomplete
                        multiple
                        id='tags-outlined'
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Assign task to'
                                placeholder='Favorites'
                            />
                        )}
                    />
                </Box>
                <Box>
                    <TextField
                        required
                        multiline
                        margin='normal'
                        id='description'
                        label='Description'
                        variant='standard'
                        fullWidth
                    />
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            ></DialogActions>
        </Dialog>
    )
}

export default AddTaskDialog
