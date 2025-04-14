import { LabelStyled } from "./styled"
import { InputProps } from "./types"
import { dictionary } from "@i18n/strings"

export const Input = ({ placeholderText, value, labelText, onChange, type, required, name, isError, onBlur }: InputProps) => {
  return (
    <LabelStyled>{labelText}
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholderText}
        required={required}
        name={name}
        onBlur={onBlur}
        value={value}
        className={isError ? 'input-error' : ''}
        />
        {isError && <span style={{color: 'red', fontWeight: 400, fontSize: '16px'}}>{`${labelText}${dictionary.filedIsRequired}`}</span>}
    </LabelStyled>
  )
}