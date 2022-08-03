import './header.scss';
import { ReactComponent as CodeSvg } from '../../../assets/icons/backslash.svg';
import { ReactElement } from 'react';

export const Header = (): ReactElement => (
  <div className="header">
    <CodeSvg className="header-icon" />
  </div>
);

export default Header;
