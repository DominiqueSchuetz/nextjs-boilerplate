import React from 'react';

import { render } from '../../utils/test-utils';
import { fireEvent, cleanup } from '@testing-library/react';

import SignUp from '@/pages/signup';
import firebase from 'firebase/app';

describe('Testing of Signup Page', () => {
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
        fireEvent.change(emailInput, { target: { value: 'test.de' } });
        fireEvent.click(getByText('Sign Up'));
        expect(await findByText('this is not a valid email address')).toBeVisible();
    });

    test('should appear with an error if a invalid password has been sent', async () => {
        const { getByTestId, getByText, findByText } = render(<SignUp />, {});
        const passwordInput = getByTestId('Password').querySelector('input');
        fireEvent.change(passwordInput, { target: { value: '1234' } });
        fireEvent.click(getByText('Sign Up'));
        expect(await findByText('for a valid Password we need at least 8 Charakters')).toBeVisible();
    });

    test('should appear with an error if input fields are empty', async () => {
        const { getByTestId, getByText, findAllByText, findByText } = render(<SignUp />, {});
        fireEvent.click(getByText('Sign Up'));
        expect(await findByText('email field is required')).toBeVisible();
        expect(await findAllByText('password field is required')).toHaveLength(2);
        expect(getByTestId('button').closest('button')).toBeDisabled();
    });

    test('should sign in test user to firebase and redirect to todos pages', async () => {
        const { getByTestId, getByText } = render(<SignUp />, {});
        const email = 'test-user@test.com';
        const password = '123456789';

        const emailInput = getByTestId('Email Address').querySelector('input');
        const passwordInput = getByTestId('Password').querySelector('input');
        const confirmPasswordInput = getByTestId('Confirm Password').querySelector('input');
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(confirmPasswordInput, { target: { value: password } });
        fireEvent.click(getByText('Sign Up'));

        const result = firebase.auth().createUserWithEmailAndPassword(email, password);

        expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
        await expect(result).resolves.toEqual('result of createUserWithEmailAndPassword');
    });
});
