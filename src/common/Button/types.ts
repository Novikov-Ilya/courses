type ButtonType = 'button' | 'reset' | 'submit'

export interface ButtonProps {
  buttonText?: string,
  handleClick?: (e?: React.MouseEvent) => void,
  type?: ButtonType,
  icon?: string,
  form?: string,
}
