interface InputProps {
  placeholderText: string,
  labelText: string,
  onChange: () => void
}

export const Input = ({placeholderText, labelText, onChange}: InputProps) => {
  return (
    <label>{labelText}
      <input type="text" onChange={onChange} placeholder={placeholderText} />
    </label>
)
}