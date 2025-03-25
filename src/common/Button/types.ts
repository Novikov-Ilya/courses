export interface ButtonProps {
  buttonText: string,
  handleClick: () => void
}

export interface InputProps {
  value: string,
  placeholderText: string,
  labelText?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}