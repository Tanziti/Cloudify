import csrfFetch from "./csrf"

export const RECEIVE_PLAYLIST_SONGS = 'playlist_songs/RECEIVE_PLAYLIST_SONGS'

export const RECEIVE_PLAYLIST_SONG = 'playlist_songs/RECEIVE_PLAYLIST_SONG'

export const receivePlaylistSongs = (playlistSongs) => ({
    type: RECEIVE_PLAYLIST_SONGS,
    playlistSongs
})

export const receivePlaylistSong = (playlistSong) => ({
    type: RECEIVE_PLAYLIST_SONG,
    playlistSong
})

export const getPlaylistSongs = (store) => {
    debugger
    return store?.playlistSongs ? store.playlistSongs : [];
}

export const getPlaylistSong = (playlistSongId) => (store) => {
    return store?.playlistSongs?.[playlistSongId] ? store.playlistSongs[playlistSongId] : null;
}

export const fetchPlaylistSongs = () => async dispatch => {
    const res = await fetch('api/playlist_songs')
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSongs(data));
    }
}

export const fetchPlaylistSong = (playlistSongId) => async dispatch => {
    const res = await fetch(`api/playlist_songs/${playlistSongId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSong(data));
    }
}

export const createPlaylistSong = (playlistSong) => async dispatch => {
    debugger
    const res = await csrfFetch(`/api/playlist_songs`, {
        method: 'POST',
        body: JSON.stringify(playlistSong),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    debugger
    if (res.ok) {
        const data = await res.json();
        debugger
        dispatch(receivePlaylistSong(data));
    }
}

export const updatePlaylistSong = (playlistSong) => async dispatch => {
    const res = await fetch(`api/playlist_songs/${playlistSong.id}`, {
        method: 'PATCH',
        body: JSON.stringify(playlistSong),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSong(data));
    }
}

const playlistSongsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
   
    switch(action.type) {
        case RECEIVE_PLAYLIST_SONGS:
            debugger
            if (action.playlistSongs === undefined) {
                newState = {}
            } else {
            newState = action.playlistSongs;
        }
            return newState;
        case RECEIVE_PLAYLIST_SONG:
            debugger
            newState[action.playlistSong.playlistSong.id] = action.playlistSong.playlistSong
            return newState;
        default:
            return state;
    }
}

export default playlistSongsReducer;