import logo from '../../../src/assets/logo.png';
import styled from 'styled-components';

const LogoImage = styled.img`
height: 100%;
width: auto;
`

export const Logo = () => {
  return (
    <div>
      <LogoImage src={logo} alt="logo" />
    </div>
  )
}