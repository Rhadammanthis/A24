import React, { Component } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Image, List, FlatList, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem'

class MovieList extends Component {

    componentWillMount() {

        this.createDataSource(this.props.filmsData);

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
            <View>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </View>
        )
    }

};

const styles = {
}

const mapStateToProps = ({ splash }) => {

    const { filmsData } = splash;

    return {
        filmsData
    };
};

export default connect(mapStateToProps, {})(MovieList);