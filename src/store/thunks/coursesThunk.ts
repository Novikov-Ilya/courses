import { CourseType } from "@components/Courses/types";
import { getCourses } from "@services";

export const getCoursesThunk = async (setCourses: (arr: CourseType[]) => void) => {
    const response = await getCourses();
    setCourses(response.result);
}