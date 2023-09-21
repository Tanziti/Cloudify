import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id="splashmain">
      {/* <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
          {sessionLinks}
        </li>
      </ul> */}
      <div className='splashheader'>
        <header id='splashheader'>
          <div></div>
          <div></div>
          <div></div>
        </header>
      </div>
      <div className='splashsidebar'></div>
      <div className='splashfooter'>
        <footer id="splashfooter">
          <div>
            <div>
              <p>Preview of Spotify</p>
              <p>Sign up to get unlimited songs</p>
            </div>
            <button>
              <span></span>
            </button>
          </div>
        </footer>
      </div>
      <div className='splashshow'></div>
    </div>
  );
}

export default Navigation;