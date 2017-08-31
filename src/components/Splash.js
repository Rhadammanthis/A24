import React, { Component } from 'react';
import {
    ScrollView, Text, Button, Linking, View, ActivityIndicator, Image,
    NetInfo, Animated, TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { dataFetch, checkNetwork } from '../actions';
import firebase from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Splash extends Component {

    componentWillMount() {

        this.props.checkNetwork();

    }

    componentWillReceiveProps(nextProps) {

        console.log('---------------------------------------')
        if (nextProps.isConnected !== this.props.isConnected)
            if (nextProps.isConnected == true)
                this.props.dataFetch();

    }

    renderSpinner() {

        console.log('Is connected 2', this.props.isConnected)

        if (this.props.isConnected === false)
            return (
                <View>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>
                        No internet connection detected...
                    </Text>
                    <Text style={{ fontSize: 35, textAlign: 'center', marginTop: 10 }}>
                        :(
                    </Text>
                </View>
            )

            return (
                <ActivityIndicator
                    style={styles.centering}
                    size="large"
                    color="grey"
                />
            )

    }


    render() {

        const { headerStyle, centering } = styles

        console.log('Is connected', this.props.isConnected)

        if (this.props.filmsData !== null) {

            Animated.sequence([
                Animated.timing(
                    this.props.animatedScale,
                    {
                        toValue: 1.5,
                        duration: 155,
                    }
    
                ),
                Animated.stagger(100, [
                    Animated.timing(
                        this.props.animatedScale,
                        {
                            toValue: 0.0,
                            duration: 480
                        }
        
                    ),
                    Animated.timing(
                        this.props.animatedFade,
                        {
                            toValue: 0,
                            duration: 200,
                        }
                    )
                ])
            ]).start(onComplete = () => {
                Actions.content();
            })

        }

        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{ transform: [{ scale: this.props.animatedScale }], opacity: this.props.animatedFade }}>
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
                </Animated.View>
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

    const { filmsData, isConnected, animatedScale, animatedFade } = splash;

    return {
        filmsData, isConnected, animatedScale, animatedFade
    };
};

export default connect(mapStateToProps, { dataFetch, checkNetwork })(Splash);