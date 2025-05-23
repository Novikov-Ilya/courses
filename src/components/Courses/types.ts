export type CourseType = {
  id: string,
  title: string,
  description: string,
  creationDate: string,
  duration: number,
  authors: string[]
}

export interface CoursesProps {
  courses: CourseType[],
}