import { getCurrentUser, login, logOutUser } from "@services";
import { AppThunk } from "./types";
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
        throw error;
    }
}

export const logOutThunk = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const user = state.user;
    try {
        if (user.token) {
            await logOutUser(user.token);
            dispatch(logoutUser());
        }
    } catch (error) {
        console.error(error);
    }
}