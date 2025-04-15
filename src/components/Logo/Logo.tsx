import { Link } from 'react-router-dom';
import logo from '../../../src/assets/logo.png';
import { LogoImageStyled } from './styled';

export const Logo = () => {
  return (
    <>
      <Link to={'/courses'}>
        <LogoImageStyled src={logo} alt="logo" />
      </Link>
    </>
  )
}