import { Button } from "@common/Button";
import { dictionary } from "@i18n/strings";
import { EmptyListWrapperStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { Align, HeadingStyled } from "@common/Styled/HeadingStyled";

export const EmptyCourseList = () => {
  const navigate = useNavigate();
  const addNewCourse = () => {
    navigate('/courses/add');
  }
  return (
    <EmptyListWrapperStyled>
      <HeadingStyled align={Align.CENTER}>{dictionary.courseListEmpty}</HeadingStyled>
      <p>{dictionary.courseListEmptyTip}</p>
      <Button
        buttonText={dictionary.buttonAddNewCourse}
        handleClick={addNewCourse}
      />
    </EmptyListWrapperStyled>
  )
}