import { 
    MOVIE_SELECTED
 } from '../actions/types'

const INITIAL_STATE = { 
    selectedMovie: null
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MOVIE_SELECTED:
            return { ...state, selectedMovie: action.payload };
        default:
            return state;
    }
};