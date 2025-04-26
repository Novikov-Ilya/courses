import { ICourseAuthorsProps } from "./types"


export const CourseAuthors = ({ authorsList }: ICourseAuthorsProps) => {
    const courseAuthorsList = authorsList.filter(author => author.isCourseAuthor);
    return (
        <div>
            <p>Course Authors</p>
            {courseAuthorsList.map(author => <div key={author.id}>
                {author.name}
            </div>)}
        </div>
    )
}