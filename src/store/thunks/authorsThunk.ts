import { getAuthors } from "@services"
import { setAuthors } from "@store/authorsSlice";
import { AppThunk } from "./types";

export const authorsThunk = (): AppThunk => async (dispatch) => {
    try {
        const response = await getAuthors();
        dispatch(setAuthors(response.result));
    } catch(error) {
        console.error(error);
    }
}