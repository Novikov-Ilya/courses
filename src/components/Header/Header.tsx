import { Button } from "@common/Button";
import { Logo } from "@components/Logo";
import { HeaderStyled, LoginWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { dictionary } from "@i18n/strings";
import { useEffect, useState } from "react";
import { publicPaths } from "@constants";

export const Header = () => {
  const [userName, setUserName] = useState('Unknown');
  const navigate = useNavigate();

  console.log(userName)

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
      <LoginWrapper>
        <div>
          {userName}
        </div>
        <div>
          {
            !publicPaths.includes(location.pathname) &&
            <Button
              buttonText={dictionary.buttonLogout}
              handleClick={loginButtonAction} />
          }
        </div>
      </LoginWrapper>
    </HeaderStyled>
  )
}