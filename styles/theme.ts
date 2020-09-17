import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
export const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        text: {
            primary: '#000',
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
