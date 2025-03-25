import logo from '../../../src/assets/logo.png';
import { LogoImageStyled } from './styled';

export const Logo = () => {
  return (
    <div>
      <LogoImageStyled src={logo} alt="logo" />
    </div>
  )
}