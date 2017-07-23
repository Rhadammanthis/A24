import { combineReducers } from 'redux';
import SplashReducer from './SplashReducer';
import MovieListReducer from './MovieListReducer';
import MovieDetailReducer from './MovieDetailReducer';
// import SongListReducer from './SongListReducer'

export default combineReducers({
    splash: SplashReducer,
    movieList: MovieListReducer,
    movieDetail: MovieDetailReducer,
    // songList: SongListReducer
});