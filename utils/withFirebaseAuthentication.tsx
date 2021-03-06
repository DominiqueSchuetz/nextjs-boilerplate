import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../firebase/auth-service';

export function withFirebaseAuthentication<P>(Component: React.ComponentType<P>): (props: P) => JSX.Element {
    const WrappedComponent = (props: P) => {
        const { userId } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!userId && router) {
                router.push({ pathname: '/signin' });
            }
        }, [userId, router]);

        return <>{<Component {...props} />}</>;
    };

    return WrappedComponent;
}
