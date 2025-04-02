import logo from '../../../src/assets/logo.png';
import { LogoImageStyled } from './styled';

export const Logo = () => {
  return (
    <>
      <LogoImageStyled src={logo} alt="logo" />
    </>
  )
}