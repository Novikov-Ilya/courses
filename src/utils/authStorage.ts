import { RootState } from "@store/index";

export const saveState = (store: Partial<RootState>) => {
    const userString = JSON.stringify(store);
    localStorage.setItem('state', userString);
}

export const loadState = (): any => {
    const userDataString = localStorage.getItem('state');
    if (userDataString === null) return undefined;
    return JSON.parse(userDataString);
}