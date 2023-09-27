import { receiveArtist } from "./artists"
import csrfFetch from "./csrf"
import { receiveSongs } from "./songs"

const RECEIVE_ALBUMS = 'albums/RECEIVE_ALBUMS'


const RECEIVE_ALBUM = 'albums/RECEIVE_ALBUM'


export const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums
})

export const receiveAlbum = (album) => {
  // debugger
  return {
    type: RECEIVE_ALBUM,
    album
  }

}

export const getAlbums = (store) => {
  return store?.albums ? store.albums : {};
}


export const getAlbum = (albumId) => (store) => {
  // debugger
  return store?.albums?.[albumId] ? store.albums[albumId] : null;
}

export const fetchAlbum = (albumId) => async dispatch => {
  // debugger
  const res = await csrfFetch(`/api/albums/${albumId}`)
  if (res.ok) {
    // debugger
    const data = await res.json();
    // debugger
    dispatch(receiveAlbum(data));

  }
}

export const fetchAlbums = () => async dispatch => {
  const res = await csrfFetch(`api/albums/`)
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveAlbums(data));
  }
}

const albumsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_ALBUMS:

      return { ...state, ...action.albums };
    case RECEIVE_ALBUM:
      // debugger
      newState[action.album.album.id] = action.album.album
      return newState;
    default:
      return state;
  }
}

export default albumsReducer;