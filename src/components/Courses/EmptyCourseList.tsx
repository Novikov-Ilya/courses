import { Button } from "@common/Button";
import { dictionary } from "@i18n/strings";
import { EmptyListWrapperStyled } from "./styled";
import { useNavigate } from "react-router-dom";

export const EmptyCourseList = () => {
  const navigate = useNavigate();
  const addNewCourse = () => {
    navigate('/courses/add');
  }
  return (
    <EmptyListWrapperStyled>
      <h1>{dictionary.courseListEmpty}</h1>
      <p>{dictionary.courseListEmptyTip}</p>
      <Button
        buttonText={dictionary.buttonAddNewCourse}
        handleClick={addNewCourse}
      />
    </EmptyListWrapperStyled>
  )
}