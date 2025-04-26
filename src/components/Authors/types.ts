import { IAuthorItem } from "@components/AuthorItem/types";

export interface IAuthorsProps {
    authors: IAuthorItem[],
    createAuthor: (name: string) => void,
    addCourseAuthor: (id: string) => void,
    deleteAuthor: (id: string) => void,
    removeCourseAuthor: (id: string) => void,
}