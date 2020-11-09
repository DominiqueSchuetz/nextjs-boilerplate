import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth-service';

import { render, act, fireEvent, cleanup } from '@/utils/test-utils';

import SignIn from '@/pages/signin';

jest.mock('next/router');
jest.mock('../../firebase/auth-service');

describe('Testing of Signin Page', () => {
    let expectedRouterPush, expectedEmail, expectedPassword, expectedSignIn;

    beforeEach(() => {
        expectedRouterPush = jest.fn();
        expectedSignIn = jest.fn();
        (expectedSignIn as jest.Mock).mockResolvedValue('');
        expectedEmail = 'test-user@test.com';
        expectedPassword = '123456789';

        (useRouter as jest.Mock).mockReturnValue({ push: expectedRouterPush });

        (useAuth as jest.Mock).mockReturnValue({
            signin: expectedSignIn,
            userId: 123,
        });
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    test('should have text sign in', () => {
        const { getAllByText } = render(<SignIn />, {});
        getAllByText('Sign in', { selector: 'h1', exact: false });
    });

    test('should appear with an error if a invalid email has been sent', async () => {
        const { getByTestId, getByText, findByText } = render(<SignIn />, {});
        const emailInput = getByTestId('Email Address').querySelector('input');
        fireEvent.change(emailInput, { target: { value: 'test.de' } });
        fireEvent.click(getByText('Sign In'));
        expect(await findByText('this is not a valid email address')).toBeVisible();
    });

    test('should appear with an error if a invalid password has been sent', async () => {
        const { getByTestId, getByText, findByText } = render(<SignIn />, {});
        const passwordInput = getByTestId('Password').querySelector('input');
        fireEvent.change(passwordInput, { target: { value: '1234' } });
        fireEvent.click(getByText('Sign In'));
        expect(await findByText('for a valid Password we need at least 8 Charakters')).toBeVisible();
    });

    test('should appear with an error if input fields are empty', async () => {
        const { getByTestId, getByText, findByText } = render(<SignIn />, {});
        fireEvent.click(getByText('Sign In'));
        expect(await findByText('email field is required')).toBeVisible();
        expect(await findByText('password field is required')).toBeVisible();
        expect(getByTestId('button').closest('button')).toBeDisabled();
    });

    test('should sign in test user to firebase and redirect to todos pages', async () => {
        const { getByTestId, getByText } = render(<SignIn />, {});
        const emailInput = getByTestId('Email Address').querySelector('input');
        const passwordInput = getByTestId('Password').querySelector('input');
        const signinButton = getByText('Sign In');

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: expectedEmail } });
            fireEvent.change(passwordInput, { target: { value: expectedPassword } });
            fireEvent.submit(signinButton);
        });

        expect(expectedSignIn).toHaveBeenCalledTimes(1);
        expect(expectedSignIn).toHaveBeenCalledWith(expectedEmail, expectedPassword);

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
        expect(expectedRouterPush).toHaveBeenCalledWith('/todos');
    });
});
