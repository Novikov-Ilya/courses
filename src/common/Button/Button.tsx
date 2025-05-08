import { ButtonProps, ButtonStyle, ButtonType } from "./types"
import { ButtonIconStyled, ButtonStyled } from "./styled"

export const Button = ({ buttonText, handleClick, type = ButtonType.BUTTON, icon, form, variant = ButtonStyle.TEXT }: ButtonProps) => {
  return variant === ButtonStyle.TEXT ?
    <ButtonStyled
      onClick={handleClick}
      type={type}
      form={form}
    >
      {buttonText}
    </ButtonStyled> :
    <ButtonIconStyled
      onClick={handleClick}
      type={type}
      form={form}
    >
      {icon ? <img src={icon} /> : buttonText}
    </ButtonIconStyled>
}