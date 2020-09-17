import { createContext } from 'react';
import { ContextThemeType } from '../types';

export const ToogleThemeContext = createContext<ContextThemeType>({ themeState: false });
