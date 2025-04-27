import { AuthorItem } from "@components/AuthorItem/AuthorItem";
import { ICourseAuthorsProps } from "./types"
import { CourseAuthorsStyled } from "./styled";
import { dictionary } from "@i18n/strings";


export const CourseAuthors = ({ authorsList, deleteAction }: ICourseAuthorsProps) => {
    const courseAuthorsList = authorsList.filter(author => author.isCourseAuthor);
    return (
        <CourseAuthorsStyled>
            <span>{dictionary.courseAuthorsTitle}</span>
            {!courseAuthorsList.length &&
                <p className="course-authors__emtpy-message">{dictionary.authorsListIsEmpty}</p>
            }
            {courseAuthorsList.map(
                author =>
                    <AuthorItem
                        key={author.id}
                        deleteAction={() => deleteAction(author.id)}
                        authorName={author.name}
                    />)}

        </CourseAuthorsStyled>
    )
}