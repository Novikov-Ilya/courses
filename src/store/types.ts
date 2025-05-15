import { IAuthorItem } from "@components/AuthorItem/types";
import { CourseType } from "@components/Courses/types";

export interface IAddCoursePayload {
    title: string;
    description: string;
    duration: string;
    authors: IAuthorItem[];
}

export type ISetCoursesPayload = CourseType[];

export interface IDeleteCoursePayload {
    id: string
}

interface IUser {
    name: string,
    email: string,
}

export interface IUserLoginPayload {
    result: string,
    user: IUser
}