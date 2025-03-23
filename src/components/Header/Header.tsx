import { Button } from "../../common/Button/Button";
import { Logo } from "./Logo";
import styled from "styled-components";

const HeaderStyled = styled.header`
position: sticky;
width: 100%;
top: 0;
left: 0;
height: 65px;
display: flex;
justify-content: space-between;
background-color: #fff;
padding-left: 10px;
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  right: 40px;
`

export const Header = ({ handleClick }) => {
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