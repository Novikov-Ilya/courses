import { Button } from "../../common/Button";
import { getAuthorNames, formatDuration } from "../../helpers";
import { CourseInfoProps } from "./types";
import { dictionary } from "../../strings";
import { CourseInfoWrapper, InfoSectionStyled, DescriptionStyled } from './styled';
import { mockedAuthorsList } from "../../constants/constants";

export const CourseInfo = ({ coursesList, onBack, showCourseId }: CourseInfoProps) => {
  const getCourse = (id: string) => {
    return coursesList.find(item => item.id === id)
  }

  return (
    <>
      <CourseInfoWrapper>
        <DescriptionStyled>
          <h2>{getCourse(showCourseId)?.title}</h2>
          <p>{getCourse(showCourseId)?.description}</p>
        </DescriptionStyled>
        <InfoSectionStyled>
          <p><b>ID: </b>{getCourse(showCourseId)?.id}</p>
          <p><b>Duration: </b>{formatDuration(getCourse(showCourseId)?.duration)}</p>
          <p><b>Created: </b>{getCourse(showCourseId)?.creationDate}</p>
          <p><b>Authors: </b>{getAuthorNames(getCourse(showCourseId)?.authors, mockedAuthorsList)}</p>
        </InfoSectionStyled>
      </CourseInfoWrapper>
      <Button buttonText={dictionary.buttonBack} handleClick={onBack} />
    </>

  )
}