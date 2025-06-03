import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { UnknownAction } from "redux";

export type AppThunk<ReturnType = Promise<void>> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;