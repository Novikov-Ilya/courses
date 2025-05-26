import { createId, generateDate } from "@helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "@components/Courses/types";
import { IAddCoursePayload, IDeleteCoursePayload, ISetCoursesPayload } from "./types";
import { fetchCourses } from "./thunks/coursesThunk";

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: [] as CourseType[],
  reducers: {
    addCourse(state, action: PayloadAction<IAddCoursePayload>) {
      const newCourse: CourseType = {
        id: createId(),
        title: action.payload.title,
        description: action.payload.description,
        creationDate: generateDate(),
        duration: Number(action.payload.duration),
        authors: action.payload.authors.filter(author => author.isCourseAuthor).map(author => author.id)
      }
      state.push(newCourse);
    },
    setCourses(_, action: PayloadAction<ISetCoursesPayload>) {
      return action.payload;
    },
    // updateCourse(state, action: PayloadAction<IAddCoursePayload>) { },
    deleteCourse(state, action: PayloadAction<IDeleteCoursePayload>) {
      return state.filter(course => course.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCourses.fulfilled, (_, action) => {
      return action.payload;
    })
  }
});

export const { addCourse, setCourses, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;