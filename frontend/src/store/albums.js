import { receiveArtist } from "./artists"
import { receiveSongs } from "./songs"


const RECEIVE_ALBUMS = 'albums/RECEIVE_ALBUMS'


const RECEIVE_ALBUM = 'albums/RECEIVE_ALBUM'


export const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums
})

export const receiveAlbum = (album) => ({
  type: RECEIVE_ALBUM,
  album
})

export const getAlbums = (store) => {
  return store?.albums ? store.albums : {};
}


export const getAlbum = (albumId) => (store) => {
  return store?.albums?.[albumId] ? store.albums[albumId] : {};
}

export const fetchAlbum = (albumId) => async dispatch => {
  const res = await fetch(`api/albums/${albumId}`)
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveAlbum(data.album));
    dispatch(receiveArtist(data.artist));
    dispatch(receiveSongs(data.songs));
    if (data.moreAlbums) dispatch(receiveAlbums(data.moreAlbums));
  }
}

export const fetchAlbums = () => async dispatch => {
  const res = await fetch(`api/albums/`)
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
      newState[action.album.id] = action.album
      return newState;
    default:
      return state;
  }
}

export default albumsReducer;