import { ButtonProps, ButtonStyle, ButtonType } from "./types"
import { ButtonIconStyled, ButtonStyled } from "./styled"

export const Button = ({ buttonText, handleClick, type = ButtonType.BUTTON, icon, form, style = ButtonStyle.TEXT }: ButtonProps) => {
  return style === ButtonStyle.TEXT ?
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