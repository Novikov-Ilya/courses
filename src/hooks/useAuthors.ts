import { createId } from "@helpers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addAuthor as createAuthor } from "@store/authorsSlice";
import { getAuthorsSelector } from "@store/selectors";
import { authorsThunk } from "@store/thunks/authorsThunk";

export const useAuthors = () => {
    const dispatch = useAppDispatch();
    const authors = useAppSelector(getAuthorsSelector);

    const addAuthor = (authorName: string) => {
        const authorId = createId();
        dispatch(createAuthor({ name: authorName, id: authorId }));
    }

    const getAuthors = () => {
        dispatch(authorsThunk());
    };

    return {
        addAuthor,
        getAuthors,
        authors,
    }
}