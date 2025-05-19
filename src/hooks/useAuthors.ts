import { createId } from "@helpers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addAuthor as createAuthor, setAuthors as setAuthorsToStore } from "@store/authorsSlice";
import { IAuthor } from "src/types";
import { getAuthorsSelector } from "@store/selectors";

export const useAuthors = () => {
    const dispatch = useAppDispatch();
    const authors = useAppSelector(getAuthorsSelector);

    const addAuthor = (authorName: string) => {
        const authorId = createId();
        dispatch(createAuthor({ name: authorName, id: authorId }));
    }

    const setAuthors = (authors: IAuthor[]) => {
        dispatch(setAuthorsToStore(authors));
    };

    return {
        addAuthor,
        setAuthors,
        authors,
    }
}