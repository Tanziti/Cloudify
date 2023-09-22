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
          <div id='splashheaderdiv'></div>
          <div className='splashbackandforth'>
            <button></button>
            <button></button>
          </div>
          <div id="topbarcontentwrapper"></div>
          <div className='splashheaderbuttons'>
            <div className='splashheaderbuttons'></div>
            <button className='splashheaderbutton' id="support">support</button>
            <button className='splashheaderbutton' id="download">download</button>
            <div id="splashbuttonmiddiv"></div>
            <div>
              <button className='splashheaderbutton' id="splashsignupbutton">sign up</button>
              <button className='splashheaderbutton' id="splashloginbutton">
                <span id="splashinnerlogin">Log in</span>
              </button>
            </div>


          </div>
        </header>
      </div>
      <div className='splashsidebar'>
        <nav id="splashsidebarnav">
          <div id="splashsidebartopleft">
            <div id="splashsidebarlogodiv">
              <a id="splashsidebarlogolink">
                <svg role="img" id="splashsidebarlogo">
                  <title>spotify</title>
                </svg>
              </a>
            </div>
            <ul>
              <li id="splashhomecontainer">
                <a>
                  <svg display="none" role="img" className='splashhomelogo'></svg>
                  <svg role="img" className="splashhomelogo"></svg>
                  <span className="splashspan">Home</span>
                </a>
              </li>
              <li id="splashhomecontainer">
                <a>
                  <svg display="none" className='splash_search_logo'></svg>
                  <svg className='splash_search_logo'></svg>
                  <span className="splashspan">Search</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="splash-sidebar-bottom">
            <div className='splash-sidebar-bottom'>
              <div>
                <header className='splash-library-header'>
                  <div>
                    <div>
                      <button>
                        <span><svg></svg></span>Your Library
                      </button>
                    </div>
                    <span >
                      <button>
                        <span><svg></svg></span>
                      </button>
                    </span>
                  </div >
                </header>
                <div id="splash-sidebar-bottom-divider"></div>
              </div>
              <div className='splash-sidebar-playlists-container'>
                <div className='os-resize-observer'>
                  <div id="os-resize-observer-div"></div>
                </div>
                <div className='os-size-auto-observer'></div>
                <div className='os-content-glue'></div>
                <div className='os-padding'>
                  <div>
                    <div className='os-content' id="os-content">
                      {/* before */}
                      <div className='os-content' id='os-content-sections'>
                        <section className='os-section'>
                          <div className="os-section-div">
                            <span className='os-section-span' id="os-section-span1">Create your first playlists</span>
                            <span className='os-section-span' id="os-section-span2">it's easy, we'll help you</span>
                          </div>
                          <div className='os-section-playlists-div2'>
                            <button className='os-section-buttons'>
                              <span className='os-section-button-spans'>Create playlist</span>
                            </button>
                          </div>
                        </section >
                        {/* left off here */}
                        <section className='os-section'>
                          <div className="os-section-div">
                            <span className='os-section-span' id="os-section-span1">Lets find some podcasts to follow</span>
                            <span className='os-section-span' id="os-section-span2">we'll keep you up to date</span>
                          </div>
                          <div>
                            <button className='os-section-buttons'>
                              <span className='os-section-button-spans'>Browse podcasts</span>
                            </button>
                          </div>
                        </section>
                        <div></div>
                      </div>
                      {/* after */}
                    </div>
                  </div>
                </div>
                <div className='os-scrollbar-horizontal' >{/* not done */}</div>
                <div className='os-scrollbar-vertical'>{/* not done */}</div>
                <div className='os-scrollbar-corner'>{/* not done */}</div>
              </div>
            </div>
            <div className='splash-sidebar-legal-text'></div>
          </div>
        </nav>
        <div className='splash-sidebar-adjuster'></div>
      </div>
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