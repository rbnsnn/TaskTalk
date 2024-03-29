import { createTheme } from '@mui/material'

declare module '@mui/material/TableCell' {
    interface TableCellPropsVariantOverrides {
        headerMain: true
    }
}

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00897b',
            dark: '#005f56',
            light: '#33a095',
            contrastText: '#fff',
        },
        secondary: {
            main: '#00897b',
            dark: '#005f56',
            light: '#33a095',
            contrastText: '#fff',
        },
        text: {
            primary: '#eee',
            secondary: '#eee',
        },
    },
    components: {
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiDialog-container': {
                        alignItems: 'flex-start',
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    ':hover': {
                        color: '#33a095',
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#005f56',
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#33a095',
                        '&:hover': {
                            backgroundColor: '#33a095',
                        },
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                        {
                            display: 'none',
                        },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                },
            },
        },
    },
})
