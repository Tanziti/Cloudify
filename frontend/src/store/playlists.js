import { receivePlaylistSongs } from "./playlistSongs"
import { receiveSongs } from "./songs"
import csrfFetch from "./csrf"


const RECEIVE_PLAYLISTS = 'playlists/RECEIVE_PLAYLISTS'

const RECEIVE_PLAYLIST = 'playlists/RECEIVE_PLAYLIST'

const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLISTS'

const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'

const receivePlaylists = (playlists) => ({
    type: RECEIVE_PLAYLISTS,
    playlists
})

const receivePlaylist = (playlist) => ({
    type: RECEIVE_PLAYLIST,
    playlist
})

const removePlaylist = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId
})
export const getPlaylists = (store) => {
  
    return store?.playlists ? store.playlists : [];
}

export const getPlaylist = (playlistId) => (store) => {
    // debugger
    return store?.playlists?.[playlistId] ? store.playlists[playlistId] : null;
}

export const fetchPlaylists = () => async dispatch => {
    const res = await fetch('/api/playlists')
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylists(data));
    }
}

export const fetchPlaylist = (playlistId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}`)
    // debugger
    if (res.ok) {
        const data = await res.json();
        // debugger
        dispatch(receivePlaylist(data.playlist));
        dispatch(receivePlaylistSongs(data.playlistSongs));
        // debugger
    }
}

export const createPlaylist = (playlist) => async dispatch => {
    const res = await csrfFetch(`/api/playlists`, {
        method: 'POST',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    debugger
    if (res.ok) {
        debugger
        const data = await res.json();
        dispatch(receivePlaylist(data.playlist));
    }
}

export const updatePlaylist = (playlist) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
        method: 'PATCH',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylist(data));
    }
}
export const deletePlaylist = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
    });
    if (res.ok){
        dispatch(removePlaylist(playlistId))
    }
};

const playlistsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    // debugger
    switch(action.type) {
        case RECEIVE_PLAYLISTS:
            // debugger
            newState = action.playlists;
            return newState;
        case RECEIVE_PLAYLIST:
            // debugger
            newState[action.playlist.id] = action.playlist
            return newState;
        case DELETE_PLAYLIST:
            // Remove the playlist from the state.
            delete newState[action.playlistId];
            // debugger
            return newState;
        default:
            return state;
    }
}

export default playlistsReducer;