import { useState } from "react";
import { UseFormValidationResult } from "./types";

export function useFormValidate<T extends Record<string, boolean>>(
  initialState: T
): UseFormValidationResult<T> {

  const [inputError, setInputError] = useState(initialState);
  return {
    inputError,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
        setInputError((prevData) => ({
          ...prevData,
          [name]: value.length === 0,
        }));
    }
  }
}