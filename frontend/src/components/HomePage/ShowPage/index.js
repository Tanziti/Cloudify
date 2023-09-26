import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min"
import "./ShowPage.css"
import ArtistRow from "./ArtistRow"
import Artist from './Artist'
import Albums from './Albums'
import AlbumsRow from "./AlbumsRow"

export default function ShowPage() {
  // const history = useHistory();


  return (
    <div className="home">
      <Switch>
        <Route path="/">
          <ArtistRow />
          <AlbumsRow />
          {/* <Albums /> */}

        </Route>
        <Route path="/artists/:artistId">
          <Artist />
        </Route>
        <Route path="/albums/:albumId">
          <Albums />
        </Route>
      </Switch>

    </div>
  )
}