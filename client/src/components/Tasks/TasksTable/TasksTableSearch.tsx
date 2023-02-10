import { InputBase, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'dark' ? '#272727' : '#F5F5F5',
    '&:hover': {
        boxShadow:
            theme.palette.mode === 'dark'
                ? 'inset 0 0 0 10em rgba(255, 255, 255, 0.05)'
                : 'inset 0 0 0 10em rgba(0, 0, 0, 0.05)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const TasksTableSearch = (props: any) => {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                {...props}
            />
        </Search>
    )
}

export default TasksTableSearch
