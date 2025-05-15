import { RootState } from "@store/index";

export const saveState = (store: Partial<RootState>) => {
    const userString = JSON.stringify(store);
    localStorage.setItem('state', userString);
}

export const loadState = (): Partial<RootState> => {
    const loadDataString = localStorage.getItem('state');
    if (loadDataString === null) return {};
    return JSON.parse(loadDataString);
}