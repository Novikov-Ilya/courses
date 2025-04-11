export interface IFormValidateState {
  [key: string]: boolean
}

export interface IformInputState {
  [key: string]: string
}

export interface IFormLogin {
  email: string,
  password: string
}

export interface IFormRegister extends IFormLogin {
  name: string
}

export interface IFormNewCourse {
  title: string,
  description: string,
  duration: number
}