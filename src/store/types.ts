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

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUserLoginPayload {
    token: string,
    name: string,
    email: string,
    role: UserRoles,
}

