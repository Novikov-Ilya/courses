import { IResponse, IUserLogin, IUserRegister, Method } from "./types";

const HOST = 'http://localhost:4000';
const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

const handleFetch = async <T>(path: string, method: Method, userData: T): Promise<IResponse> => {
    try {
        const response = await fetch(`${HOST}/${path}`, {
            method: method,
            headers: REQUEST_HEADERS,
            body: JSON.stringify(userData)
        });
        const result: IResponse = await response.json();
        if (!response.ok) {
            throw new Error(result.result ?? result.errors?.[0] ?? 'Unknown Error');
        }
        return result;

    } catch (error: any) {
        console.error("Error:", error);
        throw new Error(error);
    }
}

export const login = async (userData: IUserLogin) => await handleFetch('login', Method.POST, userData);

export const createUser = async (userData: IUserRegister) => await handleFetch('register', Method.POST, userData);