import { 
    SHOW_FULL_SYNOPSIS,
    RESET_MOVIE_DETAIL_STATE
 } from '../actions/types'

const INITIAL_STATE = { 
    shouldShowFullSynopsis: false
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SHOW_FULL_SYNOPSIS:
            return { ...state, shouldShowFullSynopsis: !state.shouldShowFullSynopsis };
        case RESET_MOVIE_DETAIL_STATE:
            return {...state, shouldShowFullSynopsis: false };
        default:
            return state;
    }
};