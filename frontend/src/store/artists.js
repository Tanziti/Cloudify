import { receiveAlbums } from "./albums"
import csrfFetch from "./csrf"
import { receiveSongs } from "./songs"

const RECEIVE_ARTISTS = 'artists/RECEIVE_ARTISTS'

const RECEIVE_ARTIST = 'artists/RECEIVE_ARTIST'

const receiveArtists = (artists) => ({
  type: RECEIVE_ARTISTS,
  artists
})

export const receiveArtist = (artist) => {
  return {
    type: RECEIVE_ARTIST,
    artist
  }
}

export const getArtists = (store) => {
  return store?.artists ? store.artists : {};
}

export const getArtist = (artistId) => (store) => {
  debugger
  return store?.artists?.[artistId] ? store.artists[artistId] : {};
}

export const fetchArtists = () => async dispatch => {
  const res = await csrfFetch('api/artists')
  if (res.ok) {
    const data = await res.json();
    // debugger;
    dispatch(receiveArtists(data.artists));
    // dispatch(receiveAlbums(data.albums));
    // dispatch(receiveSongs(data.songs));
  }
}

export const fetchArtist = (artistId) => async dispatch => {
  debugger
  const res = await csrfFetch(`/api/artists/${artistId}`)
  if (res.ok) {
    const data = await res.json();
    debugger
    dispatch(receiveArtist(data));

    // dispatch(receiveSongs(data.songs));
  }
}
const artistsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_ARTISTS:

      newState = action.artists;
      return newState;
    case RECEIVE_ARTIST:
      newState[action.artist.artist.id] = action.artist.artist
      debugger
      return newState;
    default:
      return state;
  }
}



export default artistsReducer;