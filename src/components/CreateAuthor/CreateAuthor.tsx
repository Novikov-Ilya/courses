import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { AuthorItem } from "@components/AuthorItem/AuthorItem"
import { useInputHandler } from "@hooks"
import { dictionary } from "@i18n/strings"
import { ICreateAuthorProps } from "./types"
import { CreateAuthorStyled } from "./styled"
import { FlextRowStyled } from "@common/Styled/FlexRowStyled"

const initialInputValue = {
    authors: ''
}

export const CreateAuthor = ({ authorsList, createAuthor, addCourseAuthor, deleteAuthor }: ICreateAuthorProps) => {
    const { formData, onChange } = useInputHandler(initialInputValue);

    return (
        <CreateAuthorStyled>
            <span>{dictionary.createAuthorTitle}</span>
            <FlextRowStyled>
                <Input
                    placeholderText={dictionary.inputPlaceholderAuthor}
                    labelText={dictionary.inputLabelAuthor}
                    name={dictionary.inputNameAuthors}
                    onChange={onChange}
                    value={formData.authors}
                />
                <Button
                    buttonText={dictionary.buttonCreateAuthor}
                    handleClick={() => createAuthor(formData.authors)}
                />
            </FlextRowStyled>
            {authorsList.filter(author => !author.isCourseAuthor)
                .map(author => <AuthorItem
                    key={author.id}
                    authorName={author.name}
                    deleteAction={() => deleteAuthor(author.id)}
                    addCourseAuthor={() => addCourseAuthor(author.id)}
                />
                )}
        </CreateAuthorStyled>
    )
}