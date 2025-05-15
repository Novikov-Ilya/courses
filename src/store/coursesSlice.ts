import { createId, generateDate } from "@helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "@components/Courses/types";
import { IAddCoursePayload, IDeleteCoursePayload, ISetCoursesPayload } from "./types";

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    courses: [] as CourseType[],
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
      state.courses.push(newCourse);
    },
    setCourses(state, action: PayloadAction<ISetCoursesPayload>) {
      state.courses = action.payload.result;
    },
    updateCourse(state, action: PayloadAction<IAddCoursePayload>) { },
    deleteCourse(state, action: PayloadAction<IDeleteCoursePayload>) {
      state.courses = state.courses.filter(course => course.id !== action.payload.id);
    },
  },
});

export const { addCourse, setCourses, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;