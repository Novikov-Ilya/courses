import { CourseCard } from "@components/Courses/CourseCard";
import { getAuthorNames } from "@helpers";
import { EmptyCourseList } from "@components/Courses/EmptyCourseList";
import { mockedAuthorsList } from "@constants";
import { SearchBar } from "@common/SearchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@common/Button";
import { dictionary } from "@i18n/strings";
import { CoursesTopBarStyled } from "./styled";
import { CourseType } from "./types";
import { getCoursesSelector } from "@store/selectors";
import { useAppSelector } from "@store/hooks";


export const Courses = () => {
  const courses = useAppSelector(getCoursesSelector);
  const [coursesList, setCoursesList] = useState<CourseType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setCoursesList(courses);
  }, [courses])

  const showCourse = (id: string) => {
    navigate(`/courses/${id}`);
  }

  const handleSearchByButtonClick = (searchInputValue: string) => {
    setCoursesList(() => {
      if (!searchInputValue.trim()) return courses;
      return courses.filter(
        item => {
          return item.title.toLowerCase().includes(searchInputValue.toLowerCase());
        }
      )
    })
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setCoursesList(courses)
    }
  }

  const addNewCourse = () => {
    navigate('/courses/add')
  }

  return (
    <>
      <CoursesTopBarStyled>
        <SearchBar
          handleSearch={handleSearchByButtonClick}
          searchValue={searchValue}
          handleSearchInput={handleSearchInput} />
        <Button
          buttonText={dictionary.buttonNewCourse}
          handleClick={addNewCourse}
        />
      </CoursesTopBarStyled>
      {!coursesList.length ? <EmptyCourseList /> :
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
              buttonClick={() => showCourse(item.id)}
              courseId={item.id}
            />
          }
          )}
        </div>
      }
    </>
  )
}