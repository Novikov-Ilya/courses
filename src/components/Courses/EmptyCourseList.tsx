import { Button } from "../../common/Button/Button";
import styled from "styled-components";
import { strings } from "../../strings";

const EmptyListWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const EmptyCourseList = () => {
  return (
    <EmptyListWrapper>
      <h1>{strings.courseListEmpty}</h1>
      <p>{strings.courseListEmptyTip}</p>
      <Button buttonText={strings.buttonAddNewCourse} handleClick={() => { }} />
    </EmptyListWrapper>
  )
}