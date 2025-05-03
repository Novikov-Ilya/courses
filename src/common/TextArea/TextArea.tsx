import { dictionary } from "@i18n/strings"
import { TextAreaProps } from "./types"
import { TextAreaStyled } from "./styled"
import { InputErroMessageStyled } from "@common/Styled/InputErrorMessage"

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
        className={isError ? 'error' : ''}
      />
      <InputErroMessageStyled>
        {isError && `${labelText}${dictionary.filedIsRequired}`}
      </InputErroMessageStyled>
    </TextAreaStyled>
  )
}