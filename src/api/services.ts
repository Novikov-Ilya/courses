import { IResponse, Method } from "./types";

const HOST = 'http://localhost:4000';
const REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

export const handleFetch = async <T>(path: string, method: Method, userData: T): Promise<IResponse> => {
    try {
        const response = await fetch(`${HOST}/${path}`, {
            method: method,
            headers: REQUEST_HEADERS,
            body: JSON.stringify(userData)
        });
        const result: IResponse = await response.json();
        if (!response.ok && result.result) {
            throw new Error(result.result);
        }

        if (!response.ok && result.errors) {
            throw new Error(result.errors[0])
        }
        return result;
    }
    catch (error: any) {
        if (error instanceof Error) {
            console.error("Error:", error);
        } else {
            console.error("Unknown error:", error);
        }
        return error;
    }
}