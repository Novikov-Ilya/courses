import { ButtonProps, ButtonVariant, ButtonType } from "./types"
import { ButtonIconStyled, ButtonStyled } from "./styled"

export const Button = ({ buttonText, handleClick, type = ButtonType.BUTTON, icon, form, variant = ButtonVariant.WITH_TEXT }: ButtonProps) => {
  return variant === ButtonVariant.WITH_TEXT ?
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