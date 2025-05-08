import { IAuthorItem } from "@components/AuthorItem/types";

export interface ICourseAuthorsProps {
    authorsList: IAuthorItem[],
    deleteAction: (id: string) => void,
}