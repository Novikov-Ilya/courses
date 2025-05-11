import { createId, generateDate } from "@helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "@components/Courses/types";
import { IAuthorItem } from "@components/AuthorItem/types";

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    courses: [] as CourseType[],
  },
  reducers: {
    addCourse(state, action: PayloadAction<{ authors: IAuthorItem[] }>) {
      console.log('state', state);
      console.log('action', action);

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
    setCourses(state, action: PayloadAction) {
      state.courses = action.payload.result;
    }
  },
});

export const { addCourse, setCourses } = courseSlice.actions;
export default courseSlice.reducer;