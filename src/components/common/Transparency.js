import React, { Component } from 'react';
import { View } from 'react-native';

class Transparency extends Component {

    componentWillMount(){

        // console.log("Size: " + size)
        // console.log("Alpha: " + alpha)

        // var rows = [];
        // for (var i=0; i < 20; i++) {

        //     var alpha = ((i * 0.05) + 0.05);

        //     rows.push(<View style={{height: 1, backgroundColor: `rgba(255, 0, 0, ${alpha})`}}/>);
        // }

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
