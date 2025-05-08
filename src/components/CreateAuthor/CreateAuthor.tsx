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

const AUTHORS_INPUT_NAME = 'authors';

export const CreateAuthor = ({ authorsList, createAuthor, addCourseAuthor, deleteAuthor }: ICreateAuthorProps) => {
    const { formData, onChange, clearField } = useInputHandler(initialInputValue);
    const handleCreateAuthor = () => {
        createAuthor(formData.authors);
        clearField(AUTHORS_INPUT_NAME);
    }

    return (
        <CreateAuthorStyled>
            <span>{dictionary.createAuthorTitle}</span>
            <FlextRowStyled>
                <Input
                    placeholderText={dictionary.inputPlaceholderAuthor}
                    labelText={dictionary.inputLabelAuthor}
                    name={AUTHORS_INPUT_NAME}
                    onChange={onChange}
                    value={formData.authors}
                />
                <Button
                    buttonText={dictionary.buttonCreateAuthor}
                    handleClick={handleCreateAuthor}
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