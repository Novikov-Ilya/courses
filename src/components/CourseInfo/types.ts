import { CourseType } from "../Courses/types";

export interface CourseInfoProps {
  coursesList: CourseType[],
  onBack: () => void,
  showCourseId: string,
}