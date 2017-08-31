import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { NetInfo } from 'react-native';
import {
    FETCH_DATA,
    CHECK_NETWORK
} from './types'

export const dataFetch = () => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/data`)
            .once('value', snapshot => {
                dispatch({ type: FETCH_DATA, payload: snapshot.val() });
                console.log('Called')
            });

    };
};

export const checkNetwork = () => {

    return(dispatch) => {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            dispatch({ type: CHECK_NETWORK, payload: isConnected });
        });
    }

}

