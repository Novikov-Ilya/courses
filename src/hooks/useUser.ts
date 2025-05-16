import { getUserSelector } from "@store/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loginUser, logoutUser } from "@store/userSlice";
import { IUserLoginPayload } from "@store/types";

export const useUser = () => {
  const user = useAppSelector(getUserSelector);
  const dispatch = useAppDispatch();

  const logIn = (userData: IUserLoginPayload) => {
    dispatch(loginUser(userData));
  };

  const logOut = () => {
    dispatch(logoutUser());
  }

  return {
    isAuthorized: user.isAuth,
    userName: user.userName,
    logIn,
    logOut,
  };
}