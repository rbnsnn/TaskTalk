import { createTheme } from '@mui/material'

declare module '@mui/material/TableCell' {
  interface TableCellPropsVariantOverrides {
    headerMain: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00897b',
      dark: '#005f56',
      light: '#33a095',
      contrastText: '#fff'
    },
  },
  components: {
    MuiTableCell: {
      variants: [
        {
          props: { variant: 'headerMain' },
          style: {
            backgroundColor: '#0B8A72',
            color: '#fff',
            fontSize: 'large',
            textTransform: 'uppercase'
          }
        }
      ]
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#33a095',
          },
          '&.Mui-selected': {
            backgroundColor: '#33a095',
            '&:hover': {
              backgroundColor: '#33a095'
            }
          }
        }
      }
    },
  }
})