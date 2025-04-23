export interface IUserLogin {
  email: string,
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
}

export interface IResponse {
  successful: boolean,
  errors?: string[],
  result?: string,
  user?: {
    email: string,
    name: string
  }
}

export type Method = 'POST' | 'GET'