import { Button } from "@common/Button"
import { AuthorItemProps } from "./types"
import { AuthorItemActionButtonsStyled, AuthorItemStyled } from "./styled"
import { ButtonStyle } from "@common/Button/types"

export const AuthorItem = ({ authorName, deleteAction, addCourseAuthor }: AuthorItemProps) => {
  return (
    <AuthorItemStyled>
      <p>{authorName}</p>
      <AuthorItemActionButtonsStyled>
        {addCourseAuthor && <Button
          icon="/src/assets/plus.png"
          handleClick={addCourseAuthor}
          variant={ButtonStyle.ICON}
        />}
        <Button
          icon="/src/assets/delete.png"
          handleClick={deleteAction}
          variant={ButtonStyle.ICON}
        />
      </AuthorItemActionButtonsStyled>
    </AuthorItemStyled>
  )
}