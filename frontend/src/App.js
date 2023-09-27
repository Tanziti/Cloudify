import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Sidebar from "./components/Sidebar";
import Playbar from "./components/Footer";
import HomeNavBar from "./components/HomeNavBar";
// import ShowPage from "./components/ShowPage";

import AlbumsRow from "./components/ShowPage/AlbumsRow";
import Albums from "./components/ShowPage/Albums";
import Artist from "./components/ShowPage/Artist";
import ArtistRow from "./components/ShowPage/ArtistRow";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAlbums } from "./store/albums";
import { fetchAlbums } from "./store/albums";

function App() {
  const albums = useSelector(getAlbums)
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const generateGreeting = (user) => {
    const today = new Date();
    const currentHour = today.getHours();
    if (currentHour < 12) {
      return user ? `Good morning, ${user.name}` : "Good morning"
    } else if (currentHour < 18) {
      return user ? `Good afternoon, ${user.name}` : "Good afternoon"
    } else {
      return user ? `Good evening, ${user.name}` : "Good evening"
    }
  }
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);


  return (
    <>

      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>

        <Route path="/signup">
          <SignupFormPage />
        </Route>

        <Route>
          <div className="home_page">
            <div className="home_page_top">
              <section className="home_page_left">
                <Sidebar />
              </section>
              {/* <Divider /> */}
              <section className="home_page_right">
                <div className="home">
                  <h2 style={{ paddingTop: `66px` }} className="userGreeting">{generateGreeting(sessionUser)}</h2>

                  <Route exact path="/">

                    <ArtistRow />
                    <AlbumsRow albums={albums} />
                  </Route>
                  <Route exact path="/artists">
                    <ArtistRow />
                  </Route>
                  <Route exact path="/albums/:albumId">
                    <Albums />
                  </Route>
                  <Route exact path="/albums">
                    <AlbumsRow albums={albums} />
                  </Route>

                </div>
                {/* <ShowPage /> */}

                <HomeNavBar />
              </section>
            </div>
            <Playbar />
          </div>
        </Route>
      </Switch>

    </>
  );
}

export default App;
