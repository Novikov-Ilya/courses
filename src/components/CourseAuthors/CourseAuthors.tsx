import { AuthorItem } from "@components/AuthorItem/AuthorItem";
import { ICourseAuthorsProps } from "./types"
import { CourseAuthorsStyled } from "./styled";
import { dictionary } from "@i18n/strings";


export const CourseAuthors = ({ authorsList, deleteAction }: ICourseAuthorsProps) => {
    return (
        <CourseAuthorsStyled>
            <span>{dictionary.courseAuthorsTitle}</span>
            {!authorsList.length &&
                <p>{dictionary.authorsListIsEmpty}</p>
            }
            {authorsList.map(
                author =>
                    <AuthorItem
                        key={author.id}
                        deleteAction={() => deleteAction(author.id)}
                        authorName={author.name}
                    />)}
        </CourseAuthorsStyled>
    )
}