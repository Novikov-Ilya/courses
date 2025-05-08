import { Button } from "@common/Button"
import { AuthorItemProps } from "./types"
import { AuthorItemStyled } from "./styled"
import { ButtonStyle } from "@common/Button/types"

export const AuthorItem = ({ authorName, deleteAction, addCourseAuthor }: AuthorItemProps) => {
  return (
    <AuthorItemStyled>
      <p>{authorName}</p>
      <div className="buttons">
        {addCourseAuthor && <Button
          buttonText="+"
          handleClick={addCourseAuthor}
          style={ButtonStyle.ICON}
        />}
        <Button
          icon="/src/assets/delete.png"
          handleClick={deleteAction}
          style={ButtonStyle.ICON}
        />
      </div>
    </AuthorItemStyled>
  )
}