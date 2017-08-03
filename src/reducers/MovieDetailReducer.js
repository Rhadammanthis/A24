import { 
    SHOW_FULL_SYNOPSIS,
    RESET_MOVIE_DETAIL_STATE,
    GET_MOVIE_MEDIA_SIZE
 } from '../actions/types'

const INITIAL_STATE = { 
    shouldShowFullSynopsis: false,
    movieMedia: [],
    mediaLoaded: false
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SHOW_FULL_SYNOPSIS:
            return { ...state, shouldShowFullSynopsis: !state.shouldShowFullSynopsis };
        case GET_MOVIE_MEDIA_SIZE:
            return {...state, movieMedia: action.payload, mediaLoaded: true };
        case RESET_MOVIE_DETAIL_STATE:
            return {...state, shouldShowFullSynopsis: false, movieMedia : [], mediaLoaded: false };
        default:
            return state;
    }
};