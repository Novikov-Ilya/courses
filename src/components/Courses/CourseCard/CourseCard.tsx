import { Button } from "@common/Button";
import { ICourseCard } from "./types";
import { formatDuration } from "@helpers";
import { dictionary } from "@i18n/strings";
import { CourseCardActionButtonStyled, CourseCardWrapper, DescriptionStyled, InfoSectionStyled } from "./styled";
import { ButtonVariant } from "@common/Button/types";
import { useCourses } from "src/hooks/useCourses";

export const CourseCard = ({ title, description, duration, authors, creationDate, buttonClick, courseId }: ICourseCard) => {
  const {deleteCourse} = useCourses();

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
        <CourseCardActionButtonStyled>
          <Button
            buttonText={dictionary.buttonShowCourse}
            handleClick={buttonClick}
          />
          <Button
            icon="/src/assets/trash.png"
            handleClick={() => deleteCourse(courseId)}
            variant={ButtonVariant.WITH_ICON_LARGE}
          />
          <Button
            icon="/src/assets/edit.png"
            handleClick={() => { }}
            variant={ButtonVariant.WITH_ICON_LARGE}
          />
        </CourseCardActionButtonStyled>
      </InfoSectionStyled>
    </CourseCardWrapper>
  )
}