import { IFormRegister } from "src/hooks/types";
import { IResponse } from "./types";

export const register = async (event: React.FormEvent, userData: IFormRegister) => {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    const result: IResponse = await response.json();
    if(!result.successful) {
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