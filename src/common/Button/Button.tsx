import { ButtonProps, ButtonVariant, ButtonType } from "./types"
import { ButtonIconLargeStyled, ButtonIconStyled, ButtonStyled } from "./styled"
import { ReactElement } from "react";


export const Button = ({ buttonText, handleClick, type = ButtonType.BUTTON, icon, form, variant = ButtonVariant.WITH_TEXT }: ButtonProps) => {
  const buttonVariantsMap = {
    [ButtonVariant.WITH_TEXT]: <ButtonStyled
      onClick={handleClick}
      type={type}
      form={form}
    >
      {buttonText}
    </ButtonStyled>,
    [ButtonVariant.WITH_ICON]: <ButtonIconStyled
      onClick={handleClick}
      type={type}
      form={form}
    >
      <img src={icon} />
    </ButtonIconStyled>,
    [ButtonVariant.WITH_ICON_LARGE]: <ButtonIconLargeStyled
      onClick={handleClick}
      type={type}
      form={form}
    >
      <img src={icon} />
    </ButtonIconLargeStyled>
  } as Record<string, ReactElement>

  return buttonVariantsMap[variant];

}