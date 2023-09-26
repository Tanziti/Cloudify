import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min"
import "./ShowPage.css"
import ArtistRow from "./ArtistRow"

export default function ShowPage() {
  // const history = useHistory();


  return (
    <div className="home">
      <Switch>
        <Route path="/">
          <ArtistRow />
          {/* <PlaylistsIndex /> */}
        </Route>
        {/* <Route path="/artists/:artistId">
          <ArtistShow />
        </Route>
        <Route path="/albums/:albumId">
          <AlbumShow />
        </Route>
        <Route path="/playlists/:playlistId">
          <PlaylistShow />
        </Route>
        <Route path="/search">
          <SearchIndex />
        </Route>
        <Route path="">
          <WelcomeMessage />
        </Route>*/}
      </Switch>

    </div>
  )
}