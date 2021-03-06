const firebase = jest.createMockFromModule('firebase/app');
firebase.auth = jest.fn();

const onAuthStateChanged = jest.fn();

const getRedirectResult = jest.fn(() => {
    return Promise.resolve({
        user: {
            displayName: 'redirectResultTestDisplayName',
            email: 'redirectTest@test.com',
            emailVerified: true,
        },
    });
});

const sendEmailVerification = jest.fn(() => {
    return Promise.resolve('result of sendEmailVerification');
});

const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve('result of createUserWithEmailAndPassword'));

const signInWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve({ email: 'test@test.de', emailVerified: true, uid: '123456789' });
});

const signInWithRedirect = jest.fn(() => {
    return Promise.resolve('result of signInWithRedirect');
});

const initializeAppMock = jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
    return {
        apps: [],
        auth: () => {
            return {
                createUserWithEmailAndPassword,
                currentUser: {
                    sendEmailVerification,
                },
                signInWithRedirect,
            };
        },
    };
});

const authMock = jest.spyOn(firebase, 'auth').mockImplementation(() => {
    return {
        onAuthStateChanged,
        currentUser: {
            email: 'test@test.de',
            uid: '123456789',
            emailVerified: true,
        },
        getRedirectResult,
        sendPasswordResetEmail,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    };
});

firebase.auth.FacebookAuthProvider = jest.fn(() => {
    undefined;
});
firebase.auth.GoogleAuthProvider = jest.fn(() => {
    undefined;
});
firebase.initializeApp = initializeAppMock;
firebase.auth = authMock;

export default firebase;
