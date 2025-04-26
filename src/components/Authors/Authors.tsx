import { CourseAuthors } from "@components/CourseAuthors"
import { CreateAuthor } from "@components/CreateAuthor"
import { IAuthorsProps } from "./types"
import { AuthorsStyled } from "./styled"

export const Authors = ({ authors, createAuthor, addCourseAuthor, deleteAuthor, removeCourseAuthor }: IAuthorsProps) => {
    return (
        <AuthorsStyled>
            <CreateAuthor
                authorsList={authors}
                createAuthor={createAuthor}
                addCourseAuthor={addCourseAuthor}
                deleteAuthor={deleteAuthor}
            />
            <CourseAuthors
                authorsList={authors}
                deleteAction={removeCourseAuthor}
            />
        </AuthorsStyled>
    )
}