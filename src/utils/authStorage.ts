import { IUser } from "./types";

export const saveUserState = (userStore: IUser) => {
    const userString = JSON.stringify(userStore);
    localStorage.setItem('userState', userString);
}

export const loadUserState = () => {
    const userDataString = localStorage.getItem('userState');
    if (userDataString === null) return undefined;
    return JSON.parse(userDataString);
}