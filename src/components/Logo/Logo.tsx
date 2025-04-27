import { Link } from 'react-router-dom';
import logo from '../../../src/assets/logo.png';
import { LogoImageStyled } from './styled';
import { dictionary } from '@i18n/strings';

export const Logo = () => {
  return (
    <Link to='/courses'>
      <LogoImageStyled
        src={logo}
        alt={dictionary.altLogo}
      />
    </Link>
  )
}