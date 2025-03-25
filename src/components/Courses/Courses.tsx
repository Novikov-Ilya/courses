import { CourseCard } from "./CourseCard/CourseCard";
import { getAuthorNames } from "../../helpers";
import { EmptyCourseList } from "./EmptyCourseList";
import { CoursesProps } from './types';
import { mockedAuthorsList } from "../../constants/constants";

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
            authors={getAuthorNames(item.authors, mockedAuthorsList)}
            creationDate={item.creationDate.replaceAll('/', '.')}
            key={item.id}
            buttonClick={() => buttonClick(item.id)} />
          )}
        </div>
      }
    </>

  )
}