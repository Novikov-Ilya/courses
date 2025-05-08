    export const setAuthData = (token: string, userName: string = '') => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        dispatchStorageEvent();
    }

    export const clearAuthData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        dispatchStorageEvent();
    }

    const dispatchStorageEvent = () => {
        window.dispatchEvent(new Event('storage'));
    }