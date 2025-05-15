import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { useInputHandler, useFormValidate } from "@hooks"
import { TextArea } from "@common/TextArea";
import { createId, formatDuration } from "@helpers";
import { Button } from "@common/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAuthorItem } from "@components/AuthorItem/types";
import { WrapperStyled } from "@common/Styled";
import { NewCourseFormStyled } from "./styled";
import { Authors } from "@components/Authors/Authors";
import { ActionButtonsWrapperStyled } from "@common/Styled/ActionButtons";
import { PageWrapperStyled } from "@common/Styled/PageWrapper";
import { InputType } from "@common/Input/types";
import { ButtonType } from "@common/Button/types";
import { HeadingStyled } from "@common/Styled/HeadingStyled";
import { addCourse } from "@store/coursesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getAuthorsSelector } from "@store/selectors";
import { addAuthor } from "@store/authorsSlice";

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

const COURSE_FORM_ID = "new-course-form";
const DURATION = dictionary.inputLabelDuration;
const DURATION_IN_LOW_CASE = DURATION.toLowerCase();
const TITLE = dictionary.inputLabelTitle;
const TITLE_IN_LOW_CASE = TITLE.toLowerCase();
const DESCRIPTION = dictionary.inputLabelDescription;
const DESCRIPTION_IN_LOW_CASE = DESCRIPTION.toLowerCase();

export const CourseForm = () => {
  const authorsFromStore = useAppSelector(getAuthorsSelector)
  const [authors, setAuthors] = useState<Array<IAuthorItem>>([]);
  const { formData, onChange } = useInputHandler(formFieldsInitValue);
  const { inputError, onBlur } = useFormValidate(formFieldsInitError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formattedDuration = formatDuration(Number(formData.duration));


  const buttonCancelHandle = () => {
    navigate('/courses');
  }

  const handleCreateNewCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = { ...formData, authors }
    dispatch(addCourse(courseData))
    navigate('/courses');
  }

  const createAuthor = (authorName: string) => {
    const authorId = createId();
    dispatch(addAuthor({ name: authorName, id: authorId }));
  }

  const deleteAuthor = (authorId: string) => {
    setAuthors(prevAuthors =>
      prevAuthors.filter(author => author.id !== authorId)
    )
  }

  const setCourseAuthor = (authorId: string) => {
    setAuthors(prevAuthors =>
      prevAuthors.map(author =>
        author.id === authorId ? {
          ...author,
          isCourseAuthor: !author.isCourseAuthor
        } : author
      ))
  }



  useEffect(() => {
    setAuthors(authorsFromStore.map(author => ({
      ...author,
      isCourseAuthor: false
    })));
  }, [authorsFromStore])


  return (
    <PageWrapperStyled>
      <HeadingStyled>{dictionary.courseFormTitle}</HeadingStyled>
      <WrapperStyled>
        <NewCourseFormStyled
          onSubmit={handleCreateNewCourse}
          id={COURSE_FORM_ID}
        >
          <fieldset>
            <legend>{dictionary.courseFormMainInfo}</legend>
            <Input
              placeholderText={dictionary.inputPlaceholderTitle}
              labelText={TITLE}
              required
              name={TITLE_IN_LOW_CASE}
              onChange={onChange}
              onBlur={onBlur}
              value={formData.title}
              isError={inputError.title}
              id={TITLE_IN_LOW_CASE}
            />
            <TextArea
              placeholderText={dictionary.inputPlaceholderDescription}
              labelText={DESCRIPTION}
              required
              name={DESCRIPTION_IN_LOW_CASE}
              onChange={onChange}
              onBlur={onBlur}
              value={formData.description}
              isError={inputError.description}
              rows={4}
              id={DESCRIPTION_IN_LOW_CASE}
            />
          </fieldset>
          <fieldset className="duration">
            <legend>{DURATION}</legend>
            <Input
              type={InputType.NUMBER}
              placeholderText={dictionary.inputPlaceholderDuration}
              labelText={DURATION}
              required
              name={DURATION_IN_LOW_CASE}
              onChange={onChange}
              onBlur={onBlur}
              value={formData.duration}
              isError={inputError.duration}
              id={DURATION_IN_LOW_CASE}
            />
            <span>{formattedDuration}</span>
          </fieldset>
        </NewCourseFormStyled>
        <Authors
          authors={authors}
          createAuthor={createAuthor}
          setCourseAuthor={setCourseAuthor}
          deleteAuthor={deleteAuthor}
        />
      </WrapperStyled>
      <ActionButtonsWrapperStyled>
        <Button
          buttonText={dictionary.buttonCancel}
          handleClick={buttonCancelHandle}
        />
        <Button
          buttonText={dictionary.buttonCreateCourse}
          type={ButtonType.SUBMIT}
          form={COURSE_FORM_ID}
        />
      </ActionButtonsWrapperStyled>
    </PageWrapperStyled>
  )
}