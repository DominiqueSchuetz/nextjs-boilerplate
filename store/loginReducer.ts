import { EmailFormTyes } from '../types';
import { LOGIN_ACTION, SUCCESS_ACTION, ERROR_ACTION, LOGOUT_ACTION } from '../store/action.types';
import { toast } from 'react-toastify';

export const loginReducer = (state: EmailFormTyes, action: { type: string; message?: string }): EmailFormTyes => {
    switch (action.type) {
        case LOGIN_ACTION: {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        }
        case SUCCESS_ACTION: {
            toast.success(action.message);
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                error: '',
            };
        }
        case LOGOUT_ACTION: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: '',
            };
        }
        case ERROR_ACTION: {
            toast.error(action.message);
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: 'Incorrect email or password',
            };
        }
        default:
            break;
    }
    return state;
};

export const initialState: EmailFormTyes = {
    email: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
};
