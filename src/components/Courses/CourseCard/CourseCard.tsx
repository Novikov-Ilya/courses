import { Button } from "@common/Button";
import { ICourseCard } from "./types";
import { formatDuration } from "@helpers";
import { dictionary } from "@i18n/strings";
import { CourseCardActionButtonStyled, CourseCardWrapper, DescriptionStyled, InfoSectionStyled } from "./styled";
import { ButtonVariant } from "@common/Button/types";
import { useCourses, useUser } from "@hooks";
import { UserRoles } from "@store/types";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({ title, description, duration, authors, creationDate, buttonClick, courseId }: ICourseCard) => {
  const { deleteCourse } = useCourses();
  const { userRole } = useUser();
  const navigate = useNavigate()

  const handleEdit = () => {
    return navigate(`/courses/edit/${courseId}`);
  }

  const handleDelete = () => {
    deleteCourse(courseId);
  }

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
          {userRole === UserRoles.ADMIN &&
            <>
              <Button
                icon="/src/assets/trash.png"
                handleClick={handleDelete}
                variant={ButtonVariant.WITH_ICON_LARGE}
              />
              <Button
                icon="/src/assets/edit.png"
                handleClick={handleEdit}
                variant={ButtonVariant.WITH_ICON_LARGE}
              />
            </>
          }
        </CourseCardActionButtonStyled>
      </InfoSectionStyled>
    </CourseCardWrapper>
  )
}