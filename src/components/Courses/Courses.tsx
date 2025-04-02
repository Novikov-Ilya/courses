import { CourseCard } from "@components/Courses/CourseCard";
import { getAuthorNames } from "@helpers";
import { EmptyCourseList } from "@components/Courses/EmptyCourseList";
import { CoursesProps } from './types';
import { mockedAuthorsList } from "@constants";

export const Courses = ({ coursesList, buttonClick }: CoursesProps) => {

  return (
    <>
      {!coursesList.length && <EmptyCourseList />}
      {coursesList.length &&
        <div>
          {coursesList.map((item) => {
            const authorNames = getAuthorNames(item.authors, mockedAuthorsList);
            return <CourseCard
              title={item.title}
              description={item.description}
              duration={item.duration}
              authors={authorNames}
              creationDate={item.creationDate.replaceAll('/', '.')}
              key={item.id}
              buttonClick={() => buttonClick(item.id)} />
          }
          )}
        </div>
      }
    </>

  )
}