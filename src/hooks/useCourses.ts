import { useAppDispatch } from "@store/hooks";
import {
    addCourse as addCourseToStore,
    deleteCourse as removeCourse,
    setCourses as setCoursesToStore
} from "@store/coursesSlice";
import { IAddCoursePayload } from "@store/types";
import { CourseType } from "@components/Courses/types";

export const useCourses = () => {
    const dispatch = useAppDispatch();

    const addCourse = (courseData: IAddCoursePayload) => {
        dispatch(addCourseToStore(courseData));
    };

    const deleteCourse = (id: string) => {
        dispatch(removeCourse({ id }));
    };

    const setCourses = (courses: CourseType[]) => {
        dispatch(setCoursesToStore(courses));
    };

    return {
        addCourse,
        deleteCourse,
        setCourses,
    }
}