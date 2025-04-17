import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { useInputHandler, useFormValidate } from "@hooks"
import { TextArea } from "@common/TextArea";
// import { StyledNewCourseForm } from "./styled";
import { formatDuration } from "@helpers";
import { Button } from "@common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthorItem } from "@components/AuthorItem/AuthorItem";
import { IAuthorItem } from "@components/AuthorItem/types";
import { CourseType } from "@components/Courses/types";
import { CourseFormProps } from "./types";
import { FormWrapperStyled } from "@common/Styled";

export const CourseForm = ({ addCourse }: CourseFormProps) => {
  const [authors, setAuthors] = useState<Array<IAuthorItem>>([])
  const { formData, onChange, clearAuthorsField } = useInputHandler({
    title: '',
    description: '',
    duration: '',
    authors: ''
  });
  const { inputError, onBlur } = useFormValidate();
  const navigate = useNavigate();

  const formattedDuration = formatDuration(Number(formData.duration));

  const buttonCancelHandle = () => {
    navigate('/courses');
  }

  const createAuthor = () => {
    const authorId = String(Date.now())
    setAuthors(prev => ([
      ...prev, {
        name: formData.authors,
        id: authorId
      }
    ]))
    clearAuthorsField();
  }

  const deleteAuthor = (authorId: string) => {
    console.log(authorId)
    setAuthors(
      authors.filter(author => author.id !== authorId)
    )
  }

  const generateDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth()).padStart(2, '0');
    const year = String(today.getFullYear());

    return `${day}/${month}/${year}`
  }

  const handleCreateNewCourse = (e: React.FormEvent) => {
    e.preventDefault()
    const newCourse: CourseType = {
      id: String(Date.now()),
      title: formData.title,
      description: formData.description,
      creationDate: generateDate(),
      duration: Number(formData.duration),
      authors: authors.map(author => author.id)
    }
    console.log(newCourse)

    addCourse((prev) => ([
      ...prev,
      newCourse
    ]))
    navigate('/courses');
  }

  return (
    <>
      <h1>Course Edit/Create Page</h1>
      <form onSubmit={(e) => handleCreateNewCourse(e)}>
        <FormWrapperStyled>

          <fieldset>
            <legend>Main Info</legend>
            <Input
              type="text"
              placeholderText="Input title"
              labelText={dictionary.inputLabelTitle}
              required={true}
              name={dictionary.inputLabelTitle.toLowerCase()}
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlur(e)}
              value={formData.title}
              isError={inputError.title}
            />
            <TextArea
              placeholderText="Input description"
              labelText={dictionary.inputLabelDescription}
              required={true}
              name={dictionary.inputLabelDescription.toLowerCase()}
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlur(e)}
              value={formData.description}
              isError={inputError.description}
              rows={4}
            />
          </fieldset>
          <fieldset className="duration">
            <legend>Duration</legend>
            <Input
              type="number"
              placeholderText="Input duration"
              labelText={dictionary.inputLabelDuration}
              required={true}
              name={dictionary.inputLabelDuration.toLowerCase()}
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlur(e)}
              value={formData.duration}
              isError={inputError.duration}
            />
            <span>{formattedDuration}</span>
          </fieldset>
          <fieldset className="authors">
            <legend>Authors</legend>
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
              handleClick={createAuthor}
            />
            {authors.map(author => <AuthorItem
              key={author.id}
              authorName={author.name}
              deleteAction={() => deleteAuthor(author.id)}
            />
            )}
          </fieldset>
          <div className="bottom-buttons">
            <Button
              buttonText={dictionary.buttonCancel}
              handleClick={buttonCancelHandle}
            />
            <Button
              buttonText={dictionary.buttonCreateCourse}
              type="submit"
            />
          </div>
        </FormWrapperStyled>
      </form>
    </>
  )
}