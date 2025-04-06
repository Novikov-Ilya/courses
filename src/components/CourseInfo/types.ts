import { CourseType } from "../Courses/types";

export interface CourseInfoProps {
  coursesList: ReadonlyArray<CourseType>,
  onBack: () => void,
  showCourseId: string,
}