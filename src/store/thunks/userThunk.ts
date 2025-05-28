import { getCurrentUser, login, logOutUser } from "@services";
import { AppThunk } from "./types";
import { loadState } from "@utils";
import { loginUser, logoutUser, setUserRole } from "@store/userSlice";
import { IUserLogin } from "src/types";

export const getUserThunk = (formData: IUserLogin): AppThunk => async (dispatch) => {
    try {
        const loginResult = await login(formData);
        if (loginResult) {
            const token  = loginResult.result;
            const response = await getCurrentUser(token);
            const { role } = response.result;
            dispatch(loginUser(loginResult));
            dispatch(setUserRole(role));
        }
    } catch (error) {
        console.error(error);
    }
}

export const logOutThunk = (): AppThunk => async (dispatch) => {
    const currentState = loadState();
    try {
        if(currentState.user) {
            const { token } = currentState.user;
            const upd_token = token.replace('Bearer ', '');
            await logOutUser(upd_token);
            dispatch(logoutUser());
        }
    } catch (error) {
        console.error(error);
    }
}