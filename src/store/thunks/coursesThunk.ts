import { getCourses } from "@services";
import { AppThunk } from "./types";
import { setCourses } from "@store/coursesSlice";

export const coursesThunk = (): AppThunk => async (dispatch) => {
    try {
        const response = await getCourses();
        dispatch(setCourses(response.result));
    } catch (error) {
        console.error(error);
    }
}