import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function Header() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/home');
    window.location.reload();
  };
  return (
    <div className="header">
      <div className="container">
        <nav className="header__nav">
          <div className="header__nav__items">
            <a href="/">Crud Application</a>
          </div>
          <div className="header__nav__items">
            {token ? (
              <>
                <PersonIcon />
                <LogoutIcon onClick={handleLogout} />
              </>
            ) : (
              <>
                <a href="/signin">Sign In</a>
                <a href="/signup">Sign Up</a>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
