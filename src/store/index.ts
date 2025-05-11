import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
import coursesReducer from './coursesSlice';

const store = configureStore({
  reducer: {
    // user: userReducer,
    courses: coursesReducer,
    // authors: authorsReducer,
  },
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;