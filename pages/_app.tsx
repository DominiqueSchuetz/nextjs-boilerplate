import React, { useEffect, useState, useMemo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darkTheme, lightTheme } from '../styles/theme';
import { ToogleThemeContext } from '../lib/ToogleThemeContext';
import { ProvideAuth } from '../firebase/auth-service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    const [themeState, setThemeState] = useState<boolean>(false);
    const value = useMemo(() => ({ themeState, setThemeState }), [themeState, setThemeState]);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ProvideAuth>
                <ToastContainer autoClose={7000} />
                <ToogleThemeContext.Provider value={value}>
                    <ThemeProvider theme={themeState ? darkTheme : lightTheme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </ToogleThemeContext.Provider>
            </ProvideAuth>
        </>
    );
}
