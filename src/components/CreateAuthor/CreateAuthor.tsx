import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { AuthorItem } from "@components/AuthorItem/AuthorItem"
import { useInputHandler } from "@hooks"
import { dictionary } from "@i18n/strings"
import { ICreateAuthorProps } from "./types"

const initialInputValue = {
    authors: ''
}

export const CreateAuthor = ({authorsList, createAuthor, addCourseAuthor, deleteAuthor}: ICreateAuthorProps) => {
    const { formData, onChange } = useInputHandler(initialInputValue);

    return (
        <div className="authors">
            <span>Authors</span>
            <Input
                type="text"
                placeholderText="Input new author"
                labelText={dictionary.inputLabelAuthor}
                required={false}
                name={dictionary.inputNameAuthors}
                onChange={(e) => onChange(e)}
                value={formData.authors}
            />
            <Button
                buttonText={dictionary.buttonCreateAuthor}
                handleClick={() => createAuthor(formData.authors)}
            />
            {authorsList.map(author => <AuthorItem
                key={author.id}
                authorName={author.name}
                deleteAction={() => deleteAuthor(author.id)}
                addCourseAuthor={() => addCourseAuthor(author.id)}
            />
            )}
        </div>
    )
}