import { Button } from "../../common/Button";
import { dictionary } from "../../strings";
import { EmptyListWrapperStyled } from "./styled";

export const EmptyCourseList = () => {
  return (
    <EmptyListWrapperStyled>
      <h1>{dictionary.courseListEmpty}</h1>
      <p>{dictionary.courseListEmptyTip}</p>
      <Button buttonText={dictionary.buttonAddNewCourse} handleClick={() => { }} />
    </EmptyListWrapperStyled>
  )
}