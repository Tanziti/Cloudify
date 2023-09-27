import csrfFetch from "./csrf";

export const RECEIVE_SONGS = 'songs/RECEIVE_SONGS';
export const RECEIVE_SONG = 'songs/RECEIVE_SONG';


export const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  songs
})
export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  song
})

export const getSongs = (store) => {
  return store?.songs ? store.songs : {};
}

export const getSong = (songId) => (store) => {
  debugger
  return store?.songs?.[songId] ? store.songs[songId] : {};
}

export const fetchSongs = () => async dispatch => {
  const res = await csrfFetch(`api/songs/`)
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveSongs(data));
  }
}

const songsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_SONGS:
      return { ...newState, ...action.songs }

    case RECEIVE_SONG:
      newState[action.song.id] = action.song
      debugger
      return newState;
    default:
      return state;
  }
}

export default songsReducer;