import { getErrorMessage } from "@helpers";
import {
    IErrorResponse,
    IResponseWithCourses,
    ISuccessLogin,
    ISuccessUserCration,
    IUserLogin,
    IUserRegister,
    Method,
    IResponse,
    IResponseWIthAuthors,
    ICurrentUser,
    FetchParams,
    ISuccessUserLogout,
} from "./types";

const HOST = 'http://localhost:4000';
const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

const isErrorResponse = <K extends IResponse>(result: K | IErrorResponse): result is IErrorResponse => {
    return 'errors' in result;
}

const responseEmptyCheck = (response: Response): boolean => {
    const contentLength = response.headers.get("content-length") ?? '0';
    return contentLength === '0';
}

const handleFetch = async <T, K extends IResponse>({ path, method, data, headers }: FetchParams<T>): Promise<K> => {
    try {
        const response = await fetch(`${HOST}/${path}`, {
            method,
            headers: {
                ...REQUEST_HEADERS,
                ...headers,
            },
            body: JSON.stringify(data),
        });

        const result = responseEmptyCheck(response) ? {successful: true} : await response.json();
        
        if (!response.ok) {
            let errorMessage;
            
            if (isErrorResponse(result)) {
                errorMessage = getErrorMessage(result.errors?.[0])
            }
            throw new Error(errorMessage ?? 'Unknown Error');
        }
        return result as K;

    } catch (error: unknown) {
        console.error("Error:", error);
        throw error;
    }
}

export const login = async (userData: IUserLogin) => await handleFetch<IUserLogin, ISuccessLogin>({ path: 'login', method: Method.POST, data: userData });

export const createUser = async (userData: IUserRegister) => await handleFetch<IUserRegister, ISuccessUserCration>({ path: 'register', method: Method.POST, data: userData });

export const getCourses = async () => await handleFetch<undefined, IResponseWithCourses>({ path: 'courses/all', method: Method.GET });

export const getAuthors = async () => await handleFetch<undefined, IResponseWIthAuthors>({ path: 'authors/all', method: Method.GET });

export const getCurrentUser = async (token: string) => await handleFetch<undefined, ICurrentUser>({ path: 'users/me', method: Method.GET, headers: { 'Authorization': token } });

export const logOutUser = async (token: string) => await handleFetch<undefined, ISuccessUserLogout>({ path: 'logout', method: Method.DELETE, headers: { 'Authorization': token } });