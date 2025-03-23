import { CourseCard } from "./CourseCard/CourseCard";
import { getAuthorNames } from "../../helpers";
import { EmptyCourseList } from "./EmptyCourseList";

export type Course = {
  id: string,
  title: string,
  description: string,
  creationDate: string,
  duration: number,
  authors: string[]
}

interface CoursesProps {
  coursesList: Course[],
  buttonClick: (arg: string) => void,
}

export const Courses = ({ coursesList, buttonClick }: CoursesProps) => {

  return (
    <>
      {!coursesList.length && <EmptyCourseList />}
      {coursesList.length &&
        <div>
          {coursesList.map((item) => <CourseCard
            title={item.title}
            description={item.description}
            duration={item.duration}
            authors={getAuthorNames(item.authors)}
            creationDate={item.creationDate.replaceAll('/', '.')}
            key={item.id}
            buttonClick={() => buttonClick(item.id)} />
          )}
        </div>
      }
    </>

  )
}