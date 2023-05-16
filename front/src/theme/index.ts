// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import cssTheme from './theme.scss'

const themeOptions: ThemeOptions = {
  palette: {
    // type: 'light',
    primary: {
      main: cssTheme.primary,
    },
    secondary: {
      main: cssTheme.secondary,
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontFamily: 'Archivo',
    },
    h2: {
      fontFamily: 'Archivo',
    },
    h3: {
      fontFamily: 'Archivo',
    },
    h4: {
      fontFamily: 'Archivo',
    },
    h5: {
      fontFamily: 'Archivo',
    },
    h6: {
      fontFamily: 'Archivo',
    },
  },
};

export const theme = createTheme(themeOptions)