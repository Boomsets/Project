import header_logo from '../../images/header_logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src={header_logo} alt="" className="headerLogo" />
    </header>
  )
}

export default Header;