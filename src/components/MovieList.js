import React, { Component } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Image, List, FlatList, ListView,
    Animated } from 'react-native';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem'

class MovieList extends Component {

    componentWillMount() {

        this.createDataSource(this.props.filmsData);

    }

    componentDidMount(){
        Animated.timing(
            this.props.animatedFade,
            {
                toValue: 1.0,
                duration: 300,
            }
        ).start(onComplete = () => {
            // empty callback
        })
    }

    createDataSource(filmsData) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.dataSource = ds.cloneWithRowsAndSections(this.convertToMap(filmsData))

    }

    convertToMap(filmsData) {
        var categories = {}

        filmsData.forEach((filmData) => {
            if (!categories[filmData.category]) {
                categories[filmData.category] = []
            }

            filmData.films.forEach((film) => {
                categories[filmData.category].push(film)
            })

        });

        return categories
    }

    renderRow(item) {
        console.log(item.title)
        return <MovieListItem key={item.title} movie={item} />;
    }

    renderSectionHeader(sectionData, category){
        return <Text key={category} style={{ fontSize: 30, margin: 10 }}>{category}</Text>
    }

    render() {

        return (
            <Animated.View style={{ opacity: this.props.animatedFade }}>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </Animated.View>
        )
    }

};

const styles = {
}

const mapStateToProps = ({ splash, movieList }) => {

    const { filmsData } = splash;
    const { animatedFade } = movieList;

    return {
        filmsData, animatedFade
    };
};

export default connect(mapStateToProps, {})(MovieList);