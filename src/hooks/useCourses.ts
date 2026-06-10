import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
    addCourse as addCourseToStore,
    deleteCourse as removeCourse,
} from "@store/coursesSlice";
import { IAddCoursePayload } from "@store/types";
import { getCoursesSelector } from "@store/selectors";
import { coursesThunk } from "@store/thunks/coursesThunk";

export const useCourses = () => {
    const dispatch = useAppDispatch();
    const courses = useAppSelector(getCoursesSelector);

    const addCourse = (courseData: IAddCoursePayload) => {
        dispatch(addCourseToStore(courseData));
    };

    const deleteCourse = (id: string) => {
        dispatch(removeCourse({ id }));
    };

    const getCourses = () => {
        dispatch(coursesThunk());
    };

    return {
        addCourse,
        deleteCourse,
        getCourses,
        courses,
    }
}