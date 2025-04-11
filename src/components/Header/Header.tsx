import { Button } from "@common/Button";
import { Logo } from "@components/Logo";
import { HeaderStyled, LoginWrapper } from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedIn } from "@hooks";
import { dictionary } from "@i18n/strings";
import { useEffect, useState } from "react";

export const Header = () => {
  const [userName, setUserName] = useState('Unknown');
  const navigate = useNavigate()
  const isAuthorized = useLoggedIn();

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
    if (isAuthorized) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      setUserName('Unknown')
      navigate('/login')
    } else {
      navigate('/courses');
      setUserName(getUserNameFromLocalStorage());
    }
  }
  return (
    <HeaderStyled>
      <Logo />
      <LoginWrapper>
        <div>
          User name: {userName}
        </div>
        <div>
          <Link to={'/login'}>
            <Button
              buttonText={isAuthorized ? dictionary.buttonLogout : dictionary.buttonLogin}
              handleClick={loginButtonAction} />
          </Link>
        </div>
      </LoginWrapper>
    </HeaderStyled>
  )
}