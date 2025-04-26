import { IAuthorItem } from "@components/AuthorItem/types";

export interface ICreateAuthorProps {
    authorsList: IAuthorItem[],
    createAuthor: (name: string) => void,
    addCourseAuthor: (id: string) => void,
    deleteAuthor: (id: string) => void,
}