import { ButtonProps } from "./types"
import { ButtonStyled } from "./styled"

export const Button = ({ buttonText, handleClick, type = 'button', icon, form }: ButtonProps) => {
  return <ButtonStyled
    onClick={handleClick}
    type={type}
    form={form}
  >
    {icon ? <img src={icon} /> : buttonText}
  </ButtonStyled>
}