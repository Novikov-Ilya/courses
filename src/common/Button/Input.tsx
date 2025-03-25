import { InputProps } from "./types"

export const Input = ({placeholderText, labelText, onChange}: InputProps) => {
  return (
    <label>{labelText}
      <input type="text" onChange={onChange} placeholder={placeholderText} />
    </label>
)
}