import { getUserSelector } from "@store/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getUserThunk, logOutThunk } from "@store/thunks/userThunk";
import { IUserLogin } from "src/types";

export const useUser = () => {
  const user = useAppSelector(getUserSelector);
  const dispatch = useAppDispatch();

  const logIn = (userData: IUserLogin) => {
    dispatch(getUserThunk(userData))
  };

  const logOut = () => {
    dispatch(logOutThunk());
  }

  return {
    isAuthorized: user.isAuth,
    userName: user.userName,
    userRole: user.role,
    logIn,
    logOut,
  };
}