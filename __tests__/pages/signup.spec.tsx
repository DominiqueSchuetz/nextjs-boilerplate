import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth-service';
// import firebase from 'firebase/app';

import { render, act, fireEvent, cleanup } from '../../utils/test-utils';

import SignUp from '@/pages/signup';

jest.mock('next/router');
jest.mock('../../firebase/auth-service');

describe('Testing of Signup Page', () => {
    let expectedRouterPush, expectedEmail, expectedPassword, expectedSignUp;

    beforeEach(() => {
        expectedRouterPush = jest.fn();
        expectedSignUp = jest.fn();
        (expectedSignUp as jest.Mock).mockResolvedValue('');
        expectedEmail = 'test-user@test.com';
        expectedPassword = '123456789';

        (useRouter as jest.Mock).mockReturnValue({ push: expectedRouterPush });

        (useAuth as jest.Mock).mockReturnValue({
            signup: expectedSignUp,
            userId: 123,
        });
    });

    afterEach(() => {
        cleanup();
    });

    test('should have text sign up', () => {
        const { getAllByText } = render(<SignUp />, {});
        getAllByText('Sign up', { selector: 'h1', exact: false });
    });

    test('should appear with an error if a invalid email has been sent', async () => {
        const { getByTestId, getByText, findByText } = render(<SignUp />, {});
        const emailInput = getByTestId('Email Address').querySelector('input');

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: 'test.de' } });
            fireEvent.click(getByText('Sign Up'));
        });

        expect(await findByText('this is not a valid email address')).toBeVisible();
    });

    test('should appear with an error if a invalid password has been sent', async () => {
        const { getByTestId, getByText, findByText } = render(<SignUp />, {});
        const passwordInput = getByTestId('Password').querySelector('input');

        await act(async () => {
            fireEvent.change(passwordInput, { target: { value: '1234' } });
            fireEvent.click(getByText('Sign Up'));
        });

        expect(await findByText('for a valid Password we need at least 8 Charakters')).toBeVisible();
    });

    test('should appear with an error if input fields are empty', async () => {
        const { getByTestId, getByText, findAllByText, findByText } = render(<SignUp />, {});

        await act(async () => {
            fireEvent.click(getByText('Sign Up'));
        });

        expect(await findByText('email field is required')).toBeVisible();
        expect(await findAllByText('password field is required')).toHaveLength(2);
        expect(getByTestId('button').closest('button')).toBeDisabled();
    });

    test('should sign in test user to firebase and redirect to todos pages', async () => {
        const { getByTestId, getByText } = render(<SignUp />, {});
        const emailInput = getByTestId('Email Address').querySelector('input');
        const passwordInput = getByTestId('Password').querySelector('input');
        const confirmPasswordInput = getByTestId('Confirm Password').querySelector('input');

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: expectedEmail } });
            fireEvent.change(passwordInput, { target: { value: expectedPassword } });
            fireEvent.change(confirmPasswordInput, { target: { value: expectedPassword } });
            fireEvent.click(getByText('Sign Up'));
        });

        // const result = firebase.auth().createUserWithEmailAndPassword(email, password);
        // expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
        // await expect(result).resolves.toEqual('result of createUserWithEmailAndPassword');

        expect(expectedSignUp).toHaveBeenCalledTimes(1);
        expect(expectedSignUp).toHaveBeenCalledWith(expectedEmail, expectedPassword);

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
        expect(expectedRouterPush).toHaveBeenCalledWith('/todos');
    });
});
