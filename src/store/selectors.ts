import { RootState } from ".";

export const getCoursesSelector = (state: RootState) => state.courses;
export const getUserSelector = (state: RootState) => state.user;
export const getAuthorsSelector = (state: RootState) => state.authors;