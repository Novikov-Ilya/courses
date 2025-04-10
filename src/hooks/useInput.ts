import { useState } from "react";

export function useInputHandler<T extends Record<string, string>>(initialState: T) {
  const [formData, setFormData] = useState(initialState);

  return {
    formData,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    clearAuthorsField: () => {
      setFormData(prevData => ({
        ...prevData,
        authors: ''
      }))
    }
  }

}