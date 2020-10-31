import React, { useContext, useState, useEffect, createContext } from 'react';
import { parse } from 'query-string';
import { auth, firebase } from './';
import { useRouter, Router } from 'next/router';
import { fireEvent } from '../utils/test-utils';
import { AuthType } from '../types';
import { ProvideAuthContext } from '../lib/ProvideAuthContext';

//  const authContext = createContext<Partial<AuthType>>({});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const ProvideAuth = ({ children }): JSX.Element => {
//     const auth = useProvideAuth();
//     return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// };

export const useAuth = (): Partial<AuthType> => {
    return useContext(ProvideAuthContext);
};

export const useProvideAuth = () => {
    const [user, setUser] = useState<firebase.User | null | undefined>(null);
    const router = useRouter();

    const signin = async (email: string, password: string): Promise<firebase.User | firebase.FirebaseError> => {
        try {
            const response: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(email, password);
            if (!response) return;
            setUser(response?.user);
            return response?.user;
        } catch (err) {
            return err as firebase.FirebaseError;
        }
    };

    const signup = async (email: string, password: string): Promise<firebase.User | firebase.FirebaseError> => {
        try {
            const response: firebase.auth.UserCredential = await auth.createUserWithEmailAndPassword(email, password);
            if (!response) return;
            setUser(response?.user);
            return response?.user;
        } catch (err) {
            return err as firebase.FirebaseError;
        }
    };

    const signout = async (): Promise<void | firebase.FirebaseError> => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (err) {
            return err as firebase.FirebaseError;
        }
    };

    const sendPasswordResetEmail = async (email: string) => {
        try {
            await auth.sendPasswordResetEmail(email);
            return true;
        } catch (error) {
            console.error(error);
        }
    };

    const confirmPasswordReset = async (password: string, code: string) => {
        const resetCode = code || (getFromQueryString('oobCode') as string);
        try {
            await auth.confirmPasswordReset(resetCode, password);
            return true;
        } catch (error) {}
    };

    const deleteUser = (): Promise<void> => {
        return user.delete();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user);

                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        userId: user?.uid,
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
        deleteUser,
    };
};

const getFromQueryString = (key: any) => {
    return parse(window.location.search)[key];
};
