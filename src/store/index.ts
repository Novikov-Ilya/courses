import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import coursesReducer from './coursesSlice';
import authorsReducer from './authorsSlice';
import { loadState, saveState } from "@utils";

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  authors: authorsReducer,
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  devTools: true,
},
)

store.subscribe(() => {
  saveState({user:store.getState().user});
})
export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;