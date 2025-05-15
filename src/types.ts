import { CourseType } from "@components/Courses/types"

export interface IUserLogin {
  email: string,
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
}

export interface IResponse {
  successful: boolean,
}


export interface IResponseWithCourses extends IResponse {
  result: CourseType[]
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

export type ISuccessUserCration = IResponse;

export interface IResponseRegister {
  successful: boolean,
  errors?: string[],
}

export enum Method {
  POST = 'POST',
  GET = 'GET'
}