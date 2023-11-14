import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Sidebar from "./components/Sidebar";
import Playbar from "./components/Footer";
import HomeNavBar from "./components/HomeNavBar";
import Search from "./components/Search";
// import ShowPage from "./components/ShowPage";

import AlbumsRow from "./components/ShowPage/AlbumsRow";
import Albums from "./components/ShowPage/Albums";
import Artist from "./components/ShowPage/Artist";
import ArtistRow from "./components/ShowPage/ArtistRow";
import Playlists from "./components/ShowPage/Playlists";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAlbums } from "./store/albums";
import { fetchAlbums } from "./store/albums";
import { getPlaylists} from "./store/playlists";
import { createPlaylist } from "./store/playlists";

function App() {
  const albums = useSelector(getAlbums)
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const playlists = useSelector(getPlaylists)


  const generateGreeting = () => {
    const today = new Date();
    const currentHour = today.getHours();
    if (currentHour < 12) {
      return `Good morning${sessionUser ? ' ' + sessionUser.username : ''}` 
    } else if (currentHour < 18) {
      return `Good afternoon${sessionUser ? ' ' + sessionUser.username : ''}`
    } else {
      return `Good evening${sessionUser ? ' ' + sessionUser.username : ''}`
    }
  }
  // useEffect(()=>{

  //   if (sessionUser && playlists) {
  //     debugger;
  //     const hasMatchingPlaylist = Object.values(playlists).some(playlist => {
  //       return playlist.userId === sessionUser.id && playlist.title === "Liked Songs";
  //     });
  //     debugger
  //     if (!hasMatchingPlaylist) {
  //       debugger
  //       dispatch(createPlaylist({
  //         "title": `Liked Songs`,
  //         "user_id": sessionUser.id,
  //         "color": "#142213"
  //       }));
  //     }
  //   }
  // },[])

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
                <div className="home" >
                  <h2 style={{ paddingTop: `66px` }} className="userGreeting">{generateGreeting(sessionUser)}</h2>

                  <Route exact path="/">

                    <AlbumsRow albums={albums} />
                    <ArtistRow />
                  </Route>
                  <Route exact path ="/playlists/:playlistId">
                    <Playlists/>
                  </Route>
                  <Route exact path="/artists">
                    <ArtistRow />
                  </Route>
                  <Route exact path="/artists/:artistId">
                    <Artist />
                  </Route>
                  <Route exact path="/albums/:albumId">
                    <Albums />
                  </Route>
                  <Route exact path="/albums">
                    <AlbumsRow albums={albums} />
                  </Route>
                  <Route path="/search">
                    <Search/>
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
