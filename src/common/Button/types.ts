export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit'
}

export enum ButtonStyle {
  TEXT = 'text',
  ICON = 'icon'
}

export interface ButtonProps {
  buttonText?: string,
  handleClick?: (e?: React.MouseEvent) => void,
  type?: ButtonType,
  icon?: string,
  form?: string,
  variant?: ButtonStyle
}
