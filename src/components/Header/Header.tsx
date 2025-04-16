import { Button } from "@common/Button";
import { Logo } from "@components/Logo";
import { HeaderStyled, LoginWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { dictionary } from "@i18n/strings";
import { useEffect, useState } from "react";
import { useLoggedIn } from "@hooks";

export const Header = () => {
  const [userName, setUserName] = useState('Unknown');
  const navigate = useNavigate();
  const isAuthorized = useLoggedIn()

  const getUserNameFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || '';
    }
    return '';
  };

  useEffect(() => {
    setUserName(getUserNameFromLocalStorage());
  }, [userName]);

  const loginButtonAction = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName('Unknown')
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
              handleClick={loginButtonAction} />
          </div>
        </LoginWrapper>
      }
    </HeaderStyled>
  )
}