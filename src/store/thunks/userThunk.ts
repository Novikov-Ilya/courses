import { getCurrentUser, login, logOutUser } from "@services";
import { AppThunk } from "./types";
import { loadState } from "@utils";
import { loginUser, logoutUser } from "@store/userSlice";
import { IUserLogin } from "src/types";

export const getUserThunk = (formData: IUserLogin): AppThunk => async (dispatch) => {
    try {
        const loginResult = await login(formData);
        if (loginResult) {
            const token = loginResult.result;
            const response = await getCurrentUser(token);
            const { name, email, role } = response.result;
            dispatch(loginUser({ name, email, token, role }));
        }
    } catch (error) {
        console.error(error);
    }
}

export const logOutThunk = (): AppThunk => async (dispatch) => {
    const currentState = loadState();
    try {
        if (currentState.user) {
            const { token } = currentState.user;
            await logOutUser(token);
            dispatch(logoutUser());
        }
    } catch (error) {
        console.error(error);
    }
}