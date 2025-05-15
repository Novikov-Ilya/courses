import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor } from "src/types";

const authorsSlice = createSlice({
    name: 'authorSlice',
    initialState: [] as IAuthor[],
    reducers: {
        setAuthors(_, action: PayloadAction<IAuthor[]>) {
            console.log(action)
            return action.payload;
        },
        addAuthor(state, action) {
            state.push(action.payload);
        },
    }
});

export const {setAuthors, addAuthor} = authorsSlice.actions;

export default authorsSlice.reducer;