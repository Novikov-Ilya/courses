import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import coursesReducer from './coursesSlice';
import { loadState, saveState } from "@utils";



const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    // authors: authorsReducer,
  },
  preloadedState: loadState(),
  devTools: true,
},
)

store.subscribe(() => {
  saveState({user:store.getState().user});
})
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;