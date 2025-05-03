import { IAuthorItem } from "@components/AuthorItem/types";

export interface IAuthorsProps {
    authors: IAuthorItem[],
    createAuthor: (name: string) => void,
    setCourseAuthor: (id: string) => void,
    deleteAuthor: (id: string) => void,
}