import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles';

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const styles = () => ({
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.01)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.05)',
    }
})

const ThemeProvider = ({ children }) => {
  const defaultTheme = createTheme()

  return (
    <>
      <GlobalStyles styles={styles} />
      <CssBaseline />
      <MUIThemeProvider theme={defaultTheme}>{children}</MUIThemeProvider>
    </>
  )
}

export default ThemeProvider
