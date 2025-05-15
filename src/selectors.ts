import { RootState } from "./store";

export const getCoursesSelector = (state: RootState) => state.courses;
export const getUserSelector = (state: RootState) => state.user;