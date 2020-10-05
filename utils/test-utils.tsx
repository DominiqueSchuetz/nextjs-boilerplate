import React from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from '../styles/theme';
import 'mutationobserver-shim';

// eslint-disable-next-line react/prop-types
const MaterialUiRender = ({ children }) => {
    return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

const customRender = (ui: JSX.Element, options: Omit<RenderOptions, 'queries'>): RenderResult =>
    render(ui, { wrapper: MaterialUiRender, ...options });

export * from '@testing-library/react';
export { customRender as render };
