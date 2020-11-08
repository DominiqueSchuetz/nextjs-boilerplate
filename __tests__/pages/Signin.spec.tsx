import React from 'react';

import { render } from '../../utils/test-utils';
import { fireEvent, cleanup } from '@testing-library/react';

import SignIn from '../../pages/signin';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));

describe('Testing of Signin Page', () => {
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
        const email = 'test-user@test.com';
        const password = '123456789';

        const mockRouter = {
            push: jest.fn(() => Promise.resolve(true)), // the component uses `router.push` only
        };
        (useRouter as jest.Mock<any>).mockReturnValue(mockRouter);

        const emailInput = getByTestId('Email Address').querySelector('input');
        const passwordInput = getByTestId('Password').querySelector('input');
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(getByText('Sign In'));

        const result = firebase.auth().signInWithEmailAndPassword(email, password);

        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
        await expect(result).resolves.toEqual({
            email: 'test@test.de',
            uid: '123456789',
            emailVerified: true,
        });
        const { push } = useRouter();
        push('/todos');

        expect(mockRouter.push).toHaveBeenCalledWith('/todos');
    });
});
