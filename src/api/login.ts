import { handleFetch } from "./services";
import { IUserLogin } from "./types";

export const login = async (event: React.FormEvent, userData: IUserLogin) => {
  event.preventDefault();

  const result = await handleFetch('login', 'POST', userData);
  console.log('result: ', result)
  return result;
}
