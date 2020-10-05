import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey, teal } from '@material-ui/core/colors';

// Create a theme instance.
export const lightTheme = createMuiTheme({
    palette: {
        primary: {
            // main: '#556cd6',
            main: grey[600],
        },
        secondary: {
            main: '#19857b',
        },
        action: {
            active: red.A400,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: grey[100],
        },
        text: {
            // primary: '#000',
            primary: grey.A400,
        },
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#000',
        },
        background: {
            default: '#000',
        },
        text: {
            primary: '#fff',
        },
    },
});
