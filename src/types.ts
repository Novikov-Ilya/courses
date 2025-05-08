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

export interface IResponseWithResult extends IResponse {
  result: string
}

export interface IErrorResponse extends IResponse {
  errors: string[]
}

export interface ISuccessLogin extends IResponseWithResult {
  user: {
    email: string,
    name: string
  }
}

export type ISuccessUserCration = IResponseWithResult;

export interface IResponseRegister {
  successful: boolean,
  errors?: string[],
}

export enum Method {
  POST = 'POST',
  GET = 'GET'
}