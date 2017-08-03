import React, { Component } from 'react';
import { View } from 'react-native';

class Transparency extends Component {

    componentWillMount(){

    }

    renderRow(){

        const size  = this.props.size;
        const alpha = (1 / size).toFixed(2);

        return(
            [...Array(size)].map((x, i) => {
                return <View key={i} style={{height: 1, 
                    backgroundColor: `rgba(255, 255, 255, ${((alpha * i))})`}}/>
                }
            )
        )
    }

    render(){
        const offset = -Math.abs(this.props.size) - 5;

        return (
            <View style={{ height: this.size, marginTop: offset }}>
                {this.renderRow()}
                {[...Array(5)].map((x, i) =>
                    <View key={i} style={{height: 1, 
                        backgroundColor: `rgba(255, 255, 255, 1.0)`}}/>
                )}
            </View>
        );
    }
};

export default Transparency;
