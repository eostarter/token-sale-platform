import { createTheme } from '@mui/material/styles'

import palette from './palette'
import breakpoints from './breakpoints'
import typography from './typography'

export default useDarkMode =>
  createTheme({
    breakpoints,
    typography,
    palette: { type: useDarkMode ? 'dark' : 'light', ...palette }
  })
