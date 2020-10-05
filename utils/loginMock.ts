export const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'schuetz@gmail.com' && password === '123456789') {
                resolve();
            } else {
                reject();
            }
        }, 1800);
    });
};
