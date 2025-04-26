import { AuthorItem } from "@components/AuthorItem/AuthorItem";
import { ICourseAuthorsProps } from "./types"
import { CourseAuthorsStyled } from "./styled";


export const CourseAuthors = ({ authorsList, deleteAction }: ICourseAuthorsProps) => {
    const courseAuthorsList = authorsList.filter(author => author.isCourseAuthor);
    return (
        <CourseAuthorsStyled>
            <span>Course Authors</span>
            {!courseAuthorsList.length &&
                <p className="course-authors__emtpy-message">Authors list is empty</p>
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