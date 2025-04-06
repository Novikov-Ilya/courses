import { ButtonProps } from "./types"

export const Button = ({buttonText, handleClick}: ButtonProps) => {
  return <button onClick={handleClick}>{buttonText}</button>
}