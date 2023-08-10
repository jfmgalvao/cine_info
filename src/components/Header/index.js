import { Link } from 'react-router-dom';
import './header.css';

function Header() {
   return (
      <header>
         <Link className="logo" to="/">
            Cine Info
         </Link>
         <Link className="favoritos" to="/favoritos">
            Meus Files
         </Link>
      </header>
   );
}

export default Header;
