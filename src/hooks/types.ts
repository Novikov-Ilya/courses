export interface IFormLogin {
  email: string,
  password: string
}

export interface IFormRegister extends IFormLogin {
  name: string
}


export interface UseInputHanlderResult<T extends Record<string, string>> {
  formData: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearAuthorsField: () => void;
}

export interface UseFormValidationResult<T extends Record<string, boolean>> {
  inputError: T;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}