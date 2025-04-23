import { InputWrapperStyled } from "./styled"
import { InputProps } from "./types"
import { dictionary } from "@i18n/strings"

export const Input = ({
  placeholderText,
  value, labelText,
  onChange,
  type,
  required,
  name,
  isError,
  onBlur,
  id,
}: InputProps) => {
  return (
    <InputWrapperStyled>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        placeholder={placeholderText}
        required={required}
        name={name}
        onBlur={onBlur}
        value={value}
        className={isError ? 'input-error' : ''}
      />
      {<span>{isError && `${labelText}${dictionary.filedIsRequired}`}</span>}
    </InputWrapperStyled>
  )
}