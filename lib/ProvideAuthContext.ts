import { createContext } from 'react';
import { AuthType } from '../types';

export const ProvideAuthContext = createContext<Partial<AuthType> | any>({});
