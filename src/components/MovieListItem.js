import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { movieSelected, resetState } from '../actions';

class MovieListItem extends Component {

    onRowPress() {

        if(this.props.movie.synopsis){
            
            this.props.resetState();
            this.props.movieSelected(this.props.movie)
            Actions.movieDetail({ title: 'Movie Detail' })
        }
    }

    renderCredits(movie) {
        return movie.credits.map((credit, i) =>
        <View key={i} >
            <Text>
                <Text style={{ fontSize: 15, fontWeight: '900' }}>{credit.credit}</Text>
                <Text style={{ fontSize: 18 }}> {credit.content} </Text>
            </Text>
        </View>
        );
    }

    render() {
        const movie = this.props.movie.preview ? this.props.movie.preview : this.props.movie;

        // console.log(movie)

        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 10, marginRight: 3 }}>
                    <Image style={{ width: 150, height: 150 }}
                        source={{ uri: movie.thumbNail }} />
                    <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 5 }}>
                        <Text style={{ color: 'black', fontSize: 30 }}>{movie.title}</Text>
                        <Text style={{ fontSize: 15 }}>{movie.releaseDate ? movie.releaseDate.slice(0,4) : movie.releaseDate}</Text>
                        {this.renderCredits(movie)}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

// export default MovieListItem;
export default connect(null, { movieSelected, resetState })(MovieListItem);