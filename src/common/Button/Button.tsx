interface ButtonProps {
  buttonText: string,
  handleClick: () => void
}

export const Button = ({buttonText, handleClick}: ButtonProps) => {
  return <button onClick={handleClick}>{buttonText}</button>
}