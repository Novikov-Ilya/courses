import { CourseType } from "@components/Courses/types"
import { UserRoles } from "@store/types"

export interface IUserLogin {
  email: string,
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
}

export interface IAuthor {
  name: string,
  id: string,
}

export interface IResponse {
  successful: boolean,
}


export interface IResponseWithCourses extends IResponse {
  result: CourseType[]
}

export interface IResponseWIthAuthors extends IResponse {
  result: IAuthor[]
}

export interface IErrorResponse extends IResponse {
  errors: string[]
}

export interface ISuccessLogin extends IResponse {
  user: {
    email: string,
    name: string
  }
  result: string
}

export interface ICurrentUser extends IResponse {
  result: {
    name: string,
    email: string,
    password: string,
    role: UserRoles,
    id: string,
  }
}

export type ISuccessUserCration = IResponse;

export interface IResponseRegister {
  successful: boolean,
  errors?: string[],
}

export type ISuccessUserLogout = IResponse;

export interface FetchParams<T> {
  path: string,
  method: Method,
  data?: T,
  headers?: Record<string, string>
}

export enum Method {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}