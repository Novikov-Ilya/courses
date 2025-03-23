import styled from "styled-components";
import { Button } from "../../../common/Button/Button";
import { ICourseCard } from "./ICourseCard";
import { formatDuration } from "../../../helpers";
import { strings } from "../../../strings";

const CourseCardWrapper = styled.div`
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

const Description = styled.section`
  width: 677px;
`

const InfoSection = styled.section`
  width: 323px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const CourseCard = ({ title, description, duration, authors, creationDate, buttonClick }: ICourseCard) => {

  return (
    <CourseCardWrapper>
      <Description>
        <h3>{title}</h3>
        <p>{description}</p>
      </Description>
      <InfoSection>
        <div>
          <p><b>{strings.courseAuthors}: </b>{authors}</p>
          <p><b>{strings.courseDuration}: </b>{formatDuration(duration)}</p>
          <p><b>{strings.courseCreated}: </b>{creationDate}</p>
        </div>
        <div>
          <Button buttonText={strings.buttonShowCourse} handleClick={buttonClick ? buttonClick : () => {}} />
        </div>
      </InfoSection>
    </CourseCardWrapper>
  )
}