import { Button } from "../../common/Button";
import { Logo } from "../Logo";
import { HeaderProps } from "./types";
import { HeaderStyled, LoginWrapper } from "./styled";

export const Header = ({ handleClick }: HeaderProps) => {
  return (
    <HeaderStyled>
      <Logo />
      <LoginWrapper>
        <div>
          User name: Super Admin!
        </div>
        <div>
          <Button buttonText="Logout" handleClick={handleClick} />
        </div>
      </LoginWrapper>
    </HeaderStyled>
  )
}