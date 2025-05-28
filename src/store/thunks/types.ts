import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { UnknownAction } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;