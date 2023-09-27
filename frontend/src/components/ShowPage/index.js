import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./ShowPage.css";
import ArtistRow from "./ArtistRow";
// import Artist from './Artist';
import Albums from './Albums';
import AlbumsRow from "./AlbumsRow";
import { useSelector } from "react-redux";
import { getAlbums } from "../../store/albums";
import { fetchAlbums } from "../../store/albums";
import { useDispatch } from "react-redux";

export default function ShowPage() {
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
    <div className="home">
      <h2 style={{ paddingTop: `66px` }} className="userGreeting">{generateGreeting(sessionUser)}</h2>
      <Switch>
        <Route exact path="/">

          <ArtistRow />
          <AlbumsRow albums={albums} />
        </Route>
        <Route exact path="/artists">
          <ArtistRow />
        </Route>
        <Route exact path="/albums/:albumId">
          <Albums albums={albums} />
        </Route>
        <Route exact path="/albums">
          <AlbumsRow albums={albums} />
        </Route>
      </Switch>
    </div>
  );
}