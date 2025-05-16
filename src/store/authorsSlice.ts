import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor } from "src/types";

const authorsSlice = createSlice({
    name: 'authorSlice',
    initialState: [] as IAuthor[],
    reducers: {
        setAuthors(_, action: PayloadAction<IAuthor[]>) {
            return action.payload;
        },
        addAuthor(state, action: PayloadAction<IAuthor>) {
            state.push(action.payload);
        },
    }
});

export const {setAuthors, addAuthor} = authorsSlice.actions;

export default authorsSlice.reducer;