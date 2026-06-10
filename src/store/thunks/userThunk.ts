import { getCurrentUser, login, logOutUser } from "@services";
import { AppThunk } from "./types";
import { loginUser, logoutUser } from "@store/userSlice";
import { IUserLogin } from "src/types";


export const getUserThunk = (formData: IUserLogin): AppThunk<Promise<string | undefined>> => async (dispatch) => {
    try {
        const loginResult = await login(formData);
        const token = loginResult.result;
        const response = await getCurrentUser(token);
        const { name, email, role } = response.result;
        dispatch(loginUser({ name, email, token, role }));

    } catch (error) {
        console.error(error);
        return (error as Error).message };
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