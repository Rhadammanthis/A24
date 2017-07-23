import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
    MOVIE_SELECTED
} from './types'

export const movieSelected = ( movie ) => {
    return {
        type: MOVIE_SELECTED,
        payload: movie
    };
};

