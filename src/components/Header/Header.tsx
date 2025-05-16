import { Button } from "@common/Button";
import { Logo } from "@components/Logo";
import { HeaderStyled, LoginWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { dictionary } from "@i18n/strings";
import { useUser } from "@hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthorized, userName, logOut } = useUser();

  const loginButtonAction = () => { 
    logOut();
    navigate('/login')
  }

  return (
    <HeaderStyled>
      <Logo />
      {
        isAuthorized &&
        <LoginWrapper>
          <span>
            {userName}
          </span>
          <div>
            <Button
              buttonText={dictionary.buttonLogout}
              handleClick={loginButtonAction}
            />
          </div>
        </LoginWrapper>
      }
    </HeaderStyled>
  )
}