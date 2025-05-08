import { getErrorMessage } from "@helpers";
import { IErrorResponse, IResponseWithResult, ISuccessLogin, ISuccessUserCration, IUserLogin, IUserRegister, Method } from "./types";

const HOST = 'http://localhost:4000';
const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

const isErrorResponse = <K extends IResponseWithResult>(result: K | IErrorResponse): result is IErrorResponse => {
    return 'errors' in result;
}

const handleFetch = async <T, K extends IResponseWithResult>(path: string, method: Method, userData: T): Promise<K> => {
    try {
        const response = await fetch(`${HOST}/${path}`, {
            method: method,
            headers: REQUEST_HEADERS,
            body: JSON.stringify(userData)
        });
        const result: K | IErrorResponse = await response.json();
        if (!response.ok) {
            let errorMessage;

            if (isErrorResponse(result)) {
                errorMessage = getErrorMessage(result.errors?.[0])
            } else {
                errorMessage = getErrorMessage(result.result);
            }

            throw new Error(errorMessage ?? 'Unknown Error');
        }
        return result as K;

    } catch (error: unknown) {
        console.error("Error:", error);
        throw error;
    }
}

export const login = async (userData: IUserLogin) => await handleFetch<IUserLogin, ISuccessLogin>('login', Method.POST, userData);

export const createUser = async (userData: IUserRegister) => await handleFetch<IUserRegister, ISuccessUserCration>('register', Method.POST, userData);