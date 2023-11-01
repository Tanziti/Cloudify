import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import artists from './artists'
import songs from './songs'
import albums from './albums'
import users from './users'
import search from './search'
import playlists from './playlists'
import playlistSongs from './playlistSongs'

const rootReducer = combineReducers({
  session,
  artists,
  songs,
  albums,
  users,
  playlists,
  playlistSongs,
  search,

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;