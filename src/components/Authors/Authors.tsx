import { CourseAuthors } from "@components/CourseAuthors"
import { CreateAuthor } from "@components/CreateAuthor"
import { IAuthorsProps } from "./types"
import { AuthorsStyled } from "./styled"

export const Authors = ({ authors, createAuthor, setCourseAuthor, deleteAuthor, }: IAuthorsProps) => {
    const courseAuthorsList = authors.filter(author => author.isCourseAuthor);
    return (
        <AuthorsStyled>
            <CreateAuthor
                authorsList={authors}
                createAuthor={createAuthor}
                addCourseAuthor={setCourseAuthor}
                deleteAuthor={deleteAuthor}
            />
            <CourseAuthors
                authorsList={courseAuthorsList}
                deleteAction={setCourseAuthor}
            />
        </AuthorsStyled>
    )
}