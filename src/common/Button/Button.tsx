import { ButtonProps } from "./types"
import { ButtonStyled } from "./styled"

export const Button = ({ buttonText, handleClick, type = 'button', icon }: ButtonProps) => {
  return <ButtonStyled
    onClick={handleClick}
    type={type}
  >
    {icon ? <img src={icon} /> : buttonText}
  </ButtonStyled>
}