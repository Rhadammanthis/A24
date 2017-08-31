import React, { Component } from 'react';
import { View, Text, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        var config = {
            apiKey: "AIzaSyBYVxgzeUKQJS7P9vKDV7cfDNXt0DOEwiU",
            authDomain: "a24-app.firebaseapp.com",
            databaseURL: "https://a24-app.firebaseio.com",
            projectId: "a24-app",
            storageBucket: "a24-app.appspot.com",
            messagingSenderId: "447325235806"
        };

        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;