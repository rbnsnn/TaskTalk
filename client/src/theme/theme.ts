import { createTheme } from '@mui/material'

declare module '@mui/material/TableCell' {
  interface TableCellPropsVariantOverrides {
    headerMain: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1AB79D',
      dark: '#0B8A72',
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
            color: '#fff'
          }
        }
      ]
    }
  }
})