import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
    FETCH_DATA
} from './types'

export const dataFetch = () => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/data`)
            .once('value', snapshot => {
                dispatch({ type: FETCH_DATA, payload: snapshot.val() });

                Actions.movieList();
            });

    };
};

