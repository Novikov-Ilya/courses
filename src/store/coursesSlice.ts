import { createId, generateDate } from "@helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "@components/Courses/types";
import { IAddCoursePayload, IDeleteCoursePayload, ISetCoursesPayload } from "./types";
import { fetchCourses } from "./thunks/coursesThunk";

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    data: [] as CourseType[],
    status: 'idle',
    error: null,
  },
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
      state.data.push(newCourse);
    },
    setCourses(state, action: PayloadAction<ISetCoursesPayload>) {
      state.data = action.payload;
    },
    // updateCourse(state, action: PayloadAction<IAddCoursePayload>) { },
    deleteCourse(state, action: PayloadAction<IDeleteCoursePayload>) {
      state.data = state.data.filter(course => course.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCourses.pending, state => {
      state.status = 'loading';
    })
    .addCase(fetchCourses.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    })
    .addCase(fetchCourses.rejected, state => {
      state.status = 'failed';
    })
  }
});

export const { addCourse, setCourses, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;