import { Button } from "@common/Button";
import { dictionary } from "@i18n/strings";
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