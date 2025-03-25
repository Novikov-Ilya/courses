import { Button } from "../../../common/Button";
import { ICourseCard } from "./types";
import { formatDuration } from "../../../helpers/formatDuration";
import { dictionary } from "../../../strings";
import { CourseCardWrapper, DescriptionStyled, InfoSectionStyled } from "./styled";

export const CourseCard = ({ title, description, duration, authors, creationDate, buttonClick }: ICourseCard) => {

  return (
    <CourseCardWrapper>
      <DescriptionStyled>
        <h3>{title}</h3>
        <p>{description}</p>
      </DescriptionStyled>
      <InfoSectionStyled>
        <div>
          <p><b>{dictionary.courseAuthors}: </b>{authors}</p>
          <p><b>{dictionary.courseDuration}: </b>{formatDuration(duration)}</p>
          <p><b>{dictionary.courseCreated}: </b>{creationDate}</p>
        </div>
        <div>
          <Button buttonText={dictionary.buttonShowCourse} handleClick={buttonClick ? buttonClick : () => {}} />
        </div>
      </InfoSectionStyled>
    </CourseCardWrapper>
  )
}