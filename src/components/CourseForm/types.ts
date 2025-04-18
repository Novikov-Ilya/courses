import { CourseType } from "@components/Courses/types";

export interface CourseFormProps {
  addCourse: React.Dispatch<React.SetStateAction<CourseType[]>>;
}