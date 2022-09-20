// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import cssTheme from './theme.scss'

// export const theme = {
//     primary: '#EC254E',
//     secondary: '#FC69AD',
//     accent: '#7E0699',
//     accent2: '#E013B6',
//     light: '#FFFFFF',
//     link: 'https://coolors.co/ec254e-fc69ad-7e0699-e013b6-ffffff'
// }

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