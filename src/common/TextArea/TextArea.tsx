import { dictionary } from "@i18n/strings"
import { TextAreaProps } from "./types"
import { TextAreaStyled } from "./styled"

export const TextArea = ({ placeholderText, labelText, rows, onChange, required, name, isError, onBlur, id }: TextAreaProps) => {
  return (
    <TextAreaStyled>
      <label htmlFor={id}>{labelText}</label>
      <textarea
        onChange={onChange}
        placeholder={placeholderText}
        required={required}
        name={name}
        onBlur={onBlur}
        rows={rows}
        id={id}
        />
        {isError && <span style={{color: 'red', fontWeight: 200}}>{`${labelText}${dictionary.filedIsRequired}`}</span>}
    </TextAreaStyled>
  )
}