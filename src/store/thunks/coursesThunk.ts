import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses } from "@services";

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCourses();
            return response.result;
        } catch(error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
)