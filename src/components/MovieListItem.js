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
        <View key={i}>
            <Text style={{ fontSize: 15 }}>{credit.credit} {credit.content} </Text>
            
        </View>
        );
    }

    render() {
        const movie = this.props.movie.preview ? this.props.movie.preview : this.props.movie;

        // console.log(movie)

        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 10 }}>
                    <Image style={{ width: 110, height: 110 }}
                        source={{ uri: movie.thumbNail }} />
                    <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 5 }}>
                        <Text style={{ color: 'black', fontSize: 25 }}>{movie.title}</Text>
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