import { useAppDispatch } from "@store/hooks";
import { addCourse as addCourseToStore } from "@store/coursesSlice";
import { IAddCoursePayload } from "@store/types";
import { deleteCourse as removeCourse } from "@store/coursesSlice";
import { setCourses as setCoursesToStore } from '@store/coursesSlice';
import { CourseType } from "@components/Courses/types";

export const useCourses = () => {
    const dispatch = useAppDispatch();

    const addCourse = (courseData: IAddCoursePayload) => {
        dispatch(addCourseToStore(courseData))
    };

    const deleteCourse = (id: string) => {
        dispatch(removeCourse({id}));
    };

    const setCourses = (courses: CourseType[]) => {
        dispatch(setCoursesToStore(courses));
    }

    return {
        addCourse,
        deleteCourse,
        setCourses,
    }
}