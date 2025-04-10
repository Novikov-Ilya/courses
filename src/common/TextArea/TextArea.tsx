import { dictionary } from "@i18n/strings"
import { TextAreaProps } from "./types"

export const TextArea = ({ placeholderText, labelText, rows, onChange, required, name, isError, onBlur }: TextAreaProps) => {
  return (
    <label>{labelText}
      <textarea
        onChange={onChange}
        placeholder={placeholderText}
        required={required}
        name={name}
        onBlur={onBlur}
        rows={rows}
        />
        {isError && <span style={{color: 'red', fontWeight: 200}}>{`${labelText}${dictionary.filedIsRequired}`}</span>}
    </label>
  )
}