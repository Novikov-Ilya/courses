import { IFormRegister } from "src/hooks/types";
import { handleFetch } from "./services";

export const register = async (event: React.FormEvent, userData: IFormRegister) => {
  event.preventDefault();

  const result = await handleFetch('register', 'POST', userData);
  return result;
}