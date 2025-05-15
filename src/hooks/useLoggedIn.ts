import { getUserSelector } from "@selectors";
import { useAppSelector } from "@store/hooks";

export const useLoggedIn = () => {
  const user = useAppSelector(getUserSelector);

  return {
    isAuthorized: user.isAuth,
    userName: user.userName
  };
}