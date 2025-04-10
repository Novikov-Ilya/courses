import { IResponse, IUserLogin } from "./types";

export const login = async (event: React.FormEvent, userData: IUserLogin) => {
  event.preventDefault();
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result: IResponse = await response.json();
    if (!result.successful) {
      throw new Error;
    }
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }

}
