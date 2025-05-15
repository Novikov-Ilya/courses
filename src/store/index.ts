import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import coursesReducer from './coursesSlice';
import { loadUserState, saveUserState } from "@utils";



const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    // authors: authorsReducer,
  },
  preloadedState: {
    user: loadUserState(),
  },
  devTools: true,
},
)

store.subscribe(() => {
  saveUserState(store.getState().user);
})
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;