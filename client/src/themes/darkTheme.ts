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
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    ':hover': {
                        color: '#33a095',
                    },
                },
            },
        },
        MuiTableCell: {
            variants: [
                {
                    props: { variant: 'headerMain' },
                    style: {
                        backgroundColor: '#0B8A72',
                        color: '#fff',
                        fontSize: 'large',
                    },
                },
            ],
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
