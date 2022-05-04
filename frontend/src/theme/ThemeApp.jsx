import {createTheme} from '@mui/material/styles';
import {deepPurple, indigo} from "@mui/material/colors";

const ThemeApp = createTheme({
    palette: {
        primary: deepPurple,
        secondary: indigo,
        background: {
            paper: '#fffbfb'
        },
    },
    typography: {
        fontFamily: 'Rubik',
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        fontWeightRegular: 400,
    }
});

export default ThemeApp