import { Button } from "@common/Button"
import { AuthorItemProps } from "./types"
import { AuthorItemStyled } from "./styled"

export const AuthorItem = ({ authorName, deleteAction, addCourseAuthor }: AuthorItemProps) => {
  return (
    <AuthorItemStyled>
      <p>{authorName}</p>
      <div className="buttons">
        {addCourseAuthor && <Button
          buttonText="+"
          handleClick={addCourseAuthor}
        />}
        <Button
          icon="/src/assets/delete.png"
          handleClick={deleteAction}
        />
      </div>
    </AuthorItemStyled>
  )
}