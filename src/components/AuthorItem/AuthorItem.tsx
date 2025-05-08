import { Button } from "@common/Button"
import { AuthorItemProps } from "./types"
import { AuthorItemActionButtonsStyled, AuthorItemStyled } from "./styled"
import { ButtonVariant } from "@common/Button/types"

export const AuthorItem = ({ authorName, deleteAction, addCourseAuthor }: AuthorItemProps) => {
  return (
    <AuthorItemStyled>
      <p>{authorName}</p>
      <AuthorItemActionButtonsStyled>
        {addCourseAuthor && <Button
          icon="/src/assets/plus.png"
          handleClick={addCourseAuthor}
          variant={ButtonVariant.WITH_ICON}
        />}
        <Button
          icon="/src/assets/delete.png"
          handleClick={deleteAction}
          variant={ButtonVariant.WITH_ICON}
        />
      </AuthorItemActionButtonsStyled>
    </AuthorItemStyled>
  )
}