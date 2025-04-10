import { useState } from "react";
import { IFormValidateState } from "./types";

export function useFormValidate() {
  const [inputError, setInputError] = useState<IFormValidateState>({});
  return {
    inputError,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (value.length === 0) {
        setInputError((prevData) => ({
          ...prevData,
          [name]: true,
        }));
      } else {
        setInputError((prevData) => ({
          ...prevData,
          [name]: false,
        }));
      }

    }
  }
}