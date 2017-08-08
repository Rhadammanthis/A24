import React, { Component } from 'react';
import { ScrollView, Text, Button, Linking, View, ActivityIndicator, Image,
    NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { dataFetch,checkNetwork } from '../actions';
import firebase from 'firebase';
import _ from 'lodash';

class Splash extends Component {

    componentWillMount() {

        this.props.checkNetwork();

    }

    componentWillReceiveProps(nextProps){
        
        console.log('---------------------------------------')
        if(nextProps.isConnected !== this.props.isConnected)
            if(nextProps.isConnected == true)
                this.props.dataFetch();

    }

    renderSpinner() {

        console.log('Is connected 2', this.props.isConnected)

        if(this.props.isConnected === false)
            return(
                <View>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>
                        No internet connection detected...
                    </Text>
                    <Text style={{ fontSize: 35, textAlign: 'center', marginTop: 10 }}>
                        :(
                    </Text>
                </View>
            )

        if(this.props.filmsData === null)
            return (<ActivityIndicator
                style={styles.centering}
                size="large"
                color="grey"
            />)

    }


    render() {

        const { headerStyle, centering } = styles

        console.log('Is connected', this.props.isConnected)

        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Image
                        style={{
                            width: 250, height: 250
                        }}
                        source={require('../images/logo.png')}
                    />
                </View>
                {this.renderSpinner()}
            </View>

        );
    }
}

const styles = {
    headerStyle: {
        color: 'black',
        fontSize: 40,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    gray: {
        backgroundColor: '#cccccc',
    }
};

const mapStateToProps = ({ splash }) => {

    const { filmsData, isConnected } = splash;

    return {
        filmsData, isConnected
    };
};

export default connect(mapStateToProps, { dataFetch, checkNetwork })(Splash);