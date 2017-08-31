import { Animated } from 'react-native';
import { 
    FETCH_DATA,
    CHECK_NETWORK
 } from '../actions/types'

const INITIAL_STATE = { 
    filmsData: null,
    isConnected: null,
    animatedScale: new Animated.Value(1),
    animatedFade: new Animated.Value(1)
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