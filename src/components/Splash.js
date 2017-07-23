import React, { Component } from 'react';
import { ScrollView, Text, Button, Linking, View, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { dataFetch } from '../actions';
import firebase from 'firebase';
import _ from 'lodash';

class Splash extends Component {

    componentWillMount() {

        this.props.dataFetch()

    }

    renderSpinner() {

        if (this.props.filmsData === null)
            return (<ActivityIndicator
                style={styles.centering}
                size="large"
                color="grey"
            />)

        return <Text> Done! </Text>
    }


    render() {

        const { headerStyle, centering } = styles

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

    const { filmsData } = splash;

    return {
        filmsData
    };
};

export default connect(mapStateToProps, { dataFetch })(Splash);