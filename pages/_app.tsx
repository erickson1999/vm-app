import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextUIProvider } from '../context/ContextUI/ContextUIProvider'
import { ContextAuthProvider } from '../context/ContextAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function App({ Component, pageProps }: AppProps) {

  const getMuiTheme = () => createTheme({
    components: {
      //@ts-ignore
      MUIDataTable: {
        styleOverrides: {
          root: {
            padding: "15px !important",
            borderRadius: "10px !important",
            fontSize: "32px !important",
            innerWidth: "1000px !important",
            width: "100% !important"
          }
        }
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            padding: "5px 10px !important",
            innerWidth: "1000px !important"
          }
        }
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            padding: "2px !important",
            zIndex: "0 !important"
          }
        }
      },
    }
  })
  return <ContextAuthProvider>
    <ThemeProvider theme={getMuiTheme()}>
      <LocalizationProvider dateAdapter={AdapterMoment}> <Component {...pageProps} /></LocalizationProvider>
    </ThemeProvider>
  </ContextAuthProvider>

}
