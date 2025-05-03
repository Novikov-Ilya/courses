export enum InputType {
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
}

export interface GeneralInput {
  id?: string,
  value: string,
  placeholderText: string,
  labelText?: string,
  name?: string,
  type?: InputType,
  required?: boolean,
  isError?: boolean,
}
export interface InputProps extends GeneralInput  {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}