import { IAuthorItem } from "@components/AuthorItem/types";
import { CourseType } from "@components/Courses/types";

export interface IAddCoursePayload {
    title: string;
    description: string;
    duration: string;
    authors: IAuthorItem[];
}

export interface ISetCoursesPayload {
    result: CourseType[]
}

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