import { Button } from "@common/Button";
import { getAuthorNames, formatDuration } from "@helpers";
import { dictionary } from "@i18n/strings";
import { CourseInfoWrapper, InfoSectionStyled, DescriptionStyled } from './styled';
import { mockedAuthorsList } from "@constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const CourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courses = useSelector(state => state.courses.courses);

  const onBack = () => {
    navigate('/courses');
  }

  const getCourse = (id?: string) => {
    const currentCourse = courses.find(item => item.id === id);
    if (!currentCourse) {
      return {
        title: 'No title',
        description: 'No description available',
        id: 'No id',
        duration: 0,
        creationDate: 'No creation date',
        authors: [],
      }
    }
    return currentCourse;
  }

  const {
    title,
    description,
    id,
    duration,
    creationDate,
    authors
  } = getCourse(courseId);

  const formattedDuration = formatDuration(duration);
  const authorNames = getAuthorNames(authors, mockedAuthorsList);

  return (
    <>
      <CourseInfoWrapper>
        <DescriptionStyled>
          <h2>{title}</h2>
          <p>{description}</p>
        </DescriptionStyled>
        <InfoSectionStyled>
          <p><b>ID: </b>{id}</p>
          <p><b>Duration: </b>{formattedDuration}</p>
          <p><b>Created: </b>{creationDate}</p>
          <p><b>Authors: </b>{authorNames}</p>
        </InfoSectionStyled>
      </CourseInfoWrapper>
      <Button buttonText={dictionary.buttonBack} handleClick={onBack} />
    </>

  )
}