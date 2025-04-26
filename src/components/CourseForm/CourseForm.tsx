import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { useInputHandler, useFormValidate } from "@hooks"
import { TextArea } from "@common/TextArea";
import { formatDuration } from "@helpers";
import { Button } from "@common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IAuthorItem } from "@components/AuthorItem/types";
import { CourseType } from "@components/Courses/types";
import { CourseFormProps } from "./types";
import { WrapperStyled } from "@common/Styled";
import { NewCourseFormStyled } from "./styled";
import { Authors } from "@components/Authors/Authors";
import { ActionButtonsStyled } from "@common/Styled/ActionButtons";
import { Wrapper } from "@common/Styled/Wrapper";

const formFieldsInitValue = {
  title: '',
  description: '',
  duration: '',
}

const formFieldsInitError = {
  title: false,
  description: false,
  duration: false,
  authors: false
}

export const CourseForm = ({ addCourse }: CourseFormProps) => {
  const [authors, setAuthors] = useState<Array<IAuthorItem>>([]);
  const { formData, onChange, clearAuthorsField } = useInputHandler(formFieldsInitValue);
  const { inputError, onBlur } = useFormValidate(formFieldsInitError);
  const navigate = useNavigate();

  const formattedDuration = formatDuration(Number(formData.duration));

  const buttonCancelHandle = () => {
    navigate('/courses');
  }

  const generateDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth()).padStart(2, '0');
    const year = String(today.getFullYear());

    return `${day}/${month}/${year}`
  }

  const handleCreateNewCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: CourseType = {
      id: String(Date.now()),
      title: formData.title,
      description: formData.description,
      creationDate: generateDate(),
      duration: Number(formData.duration),
      authors: authors.filter(author => author.isCourseAuthor).map(author => author.id)
    }

    addCourse((prev) => ([
      ...prev,
      newCourse
    ]))
    navigate('/courses');
  }

  const createAuthor = (authorName: string) => {
    const authorId = String(Date.now())
    setAuthors(prev => ([
      ...prev, {
        name: authorName,
        id: authorId,
        isCourseAuthor: false,
      }
    ]))
    clearAuthorsField();
  }

  const deleteAuthor = (authorId: string) => {
    setAuthors(
      authors.filter(author => author.id !== authorId)
    )
  }

  const removeCourseAuthor = (authorId: string) => {
    setAuthors(
      authors.map(author => 
        author.id === authorId ? {...author, isCourseAuthor: false} : author
      )
    )
  }

  const addAuthorToCourseAuthorsList = (authorId: string) => {
    setAuthors(prevAuthors =>
      prevAuthors.map(author =>
        author.id === authorId ? { ...author, isCourseAuthor: true } : author
      )
    );
  }

  return (
    <Wrapper>
      <h1>Course Edit/Create Page</h1>
      <WrapperStyled>
        <NewCourseFormStyled
        onSubmit={(e) => handleCreateNewCourse(e)}
        id="new-course-form"
        >

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
              id={dictionary.inputLabelTitle.toLowerCase()}
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
              id={dictionary.inputLabelDescription.toLowerCase()}
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
              id={dictionary.inputLabelDuration.toLowerCase()}
            />
            <span>{formattedDuration}</span>
          </fieldset>
        </NewCourseFormStyled>
        <Authors
          authors={authors}
          createAuthor={createAuthor}
          addCourseAuthor={addAuthorToCourseAuthorsList}
          deleteAuthor={deleteAuthor}
          removeCourseAuthor={removeCourseAuthor}
        />
      </WrapperStyled>
      <ActionButtonsStyled>
        <Button
          buttonText={dictionary.buttonCancel}
          handleClick={buttonCancelHandle}
        />
        <Button
          buttonText={dictionary.buttonCreateCourse}
          type="submit"
          form="new-course-form"
        />
      </ActionButtonsStyled>
    </Wrapper>
  )
}