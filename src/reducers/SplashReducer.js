import { 
    FETCH_DATA,
    CHECK_NETWORK
 } from '../actions/types'

const INITIAL_STATE = { 
    filmsData: null,
    isConnected: null
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_DATA:
            return { ...state, filmsData: action.payload };
        case CHECK_NETWORK:
            return { ...state, isConnected: action.payload };
        default:
            return state;
    }
};