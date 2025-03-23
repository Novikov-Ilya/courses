import styled from "styled-components";
import { Button } from "../../common/Button/Button";
import { getAuthorNames, formatDuration } from "../../helpers";
import { Course } from "../Courses/Courses";
import { strings } from "../../strings";

// type AuthorList = {
//   id: string,
//   name: string
// }

interface CourseInfoProps {
  coursesList: Course[],
  // authorsList: AuthorList[],
  onBack: () => void,
  showCourseId: string,
}

const CourseInfoWrapper = styled.div`
  display: flex;
  width: 1122px;
  height: 240px;
  padding: 20px;
  border: 2px solid #007298;
  border-left: 8px solid #007298;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 4px 4px 10px #007298;
  justify-content: space-between;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`

export const CourseInfo = ({ coursesList, onBack, showCourseId }: CourseInfoProps) => {
  const getCourse = (id: string) => {
    return coursesList.find(item => item.id === id)
  }

  return (
    <>
      <CourseInfoWrapper>
        <section>
          <h2>{getCourse(showCourseId)?.title}</h2>
          <p>{getCourse(showCourseId)?.description}</p>
        </section>
        <section>
          <p><b>ID: </b>{getCourse(showCourseId)?.id}</p>
          <p><b>Duration: </b>{formatDuration(getCourse(showCourseId)?.duration)}</p>
          <p><b>Created: </b>{getCourse(showCourseId)?.creationDate}</p>
          <p><b>Authors: </b>{getAuthorNames(getCourse(showCourseId)?.authors)}</p>
        </section>
      </CourseInfoWrapper>
      <Button buttonText={strings.buttonBack} handleClick={onBack} />
    </>

  )
}