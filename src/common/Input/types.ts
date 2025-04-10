type InputType = 'text' | 'password' | 'email';

export interface InputProps {
  value: string,
  placeholderText: string,
  labelText?: string,
  name?: string,
  type?: InputType,
  required?: boolean,
  isError?: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}