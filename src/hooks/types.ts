export interface UseInputHanlderResult<T extends Record<string, string>> {
  formData: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearField: (fieldName: string) => void;
}

export interface UseFormValidationResult<T extends Record<string, boolean>> {
  inputError: T;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}