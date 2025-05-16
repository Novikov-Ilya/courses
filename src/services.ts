import { getErrorMessage } from "@helpers";
import { IErrorResponse, IResponseWithCourses, ISuccessLogin, ISuccessUserCration, IUserLogin, IUserRegister, Method, IResponse, IResponseWIthAuthors } from "./types";

const HOST = 'http://localhost:4000';
const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

const isErrorResponse = <K extends IResponse>(result: K | IErrorResponse): result is IErrorResponse => {
    return 'errors' in result;
}

const handleFetch = async <T, K extends IResponse>(path: string, method: Method, data?: T): Promise<K> => {
    try {
        const response = await fetch(`${HOST}/${path}`, {
            method: method,
            headers: REQUEST_HEADERS,
            body: JSON.stringify(data)
        });
        const result: K | IErrorResponse = await response.json();
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

export const login = async (userData: IUserLogin) => await handleFetch<IUserLogin, ISuccessLogin>('login', Method.POST, userData);

export const createUser = async (userData: IUserRegister) => await handleFetch<IUserRegister, ISuccessUserCration>('register', Method.POST, userData);

export const getCourses = async () => await handleFetch<undefined, IResponseWithCourses>('courses/all', Method.GET);

export const getAuthors = async () => await handleFetch<undefined, IResponseWIthAuthors>('authors/all', Method.GET);