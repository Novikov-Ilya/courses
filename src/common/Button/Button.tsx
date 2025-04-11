import { ButtonProps } from "./types"

export const Button = ({ buttonText, handleClick, type = 'button', icon }: ButtonProps) => {
  return <button
    onClick={handleClick}
    type={type}
  >
    {icon ? <img src={icon} /> : buttonText}
  </button>
}