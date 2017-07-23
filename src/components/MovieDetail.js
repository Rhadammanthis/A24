import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, 
    ScrollView, LayoutAnimation, Button } from 'react-native';
import Transparency from './common/Transparency'
import Swiper from 'react-native-swiper';
import PopupDialog from 'react-native-popup-dialog';
import { toggleFullSynopsis } from '../actions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class MovieDetail extends Component {

    state = { showFullText: false };

    media = [];

    componentWillUpdate(){
        LayoutAnimation.spring();
    }

    componentWillMount(){

        movie = this.props.selectedMovie

        movie.otherMedia.map((item, i) => {
            Image.getSize(item.image, (width, height) => {
                item.aspectRatio = (height / width).toFixed(2)
                console.log('Aspect ratio: ', item.aspectRatio)
            });
        })
    }

    renderHeaderItems(){
        return movie.mainMedia.map( media => {
                return <Image key={media.imgURL} style={{ height: 160 }}
                                source={{ uri: media.imgURL }} />
                {/*<TouchableHighlight>
                    <View>
                        <Image key={media.imgURL} style={{ height: 160 }}
                                source={{ uri: media.imgURL }} />
                        <Image key={media.gifURL} style={{ height: 160 }}
                                source={{ uri: media.gifURL }} />
                    </View>
                </TouchableHighlight>*/} 
            }
        );
    }

    renderPagerButtons(){
        return movie.mainMedia.length > 1
    }

    renderCredits(){
        return movie.credits.map((obj, i) => {
                return <View key={i} style={{ marginLeft: 25, marginRight: 25, 
                        flexDirection: 'row',
                        marginTop: 5,
                        marginBottom: 5 }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', flex: 1  }}>
                        {obj.credit}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 15, flex: 2 }}>
                        {obj.content}
                    </Text>
                </View>
            }
        );
    }

    showFullText(){
        if(this.props.shouldShowFullSynopsis)
            return { }
        else
            return { height: 150 }
    }

    renderTextTransparency(){
        if(this.props.shouldShowFullSynopsis)
            return 
        else
            return(
                <Transparency size={25}/>
            )
    }

    renderSocial(){
        const { circle } = styles;

        if(movie.social){
            return (<View>
                        <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25 }}>
                            Social
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 }}>
                            {
                                movie.social.map((item, i) => {
                                    return <View key={i} style={ circle } />
                                })
                            }
                        </View>
                    </View>)
        }
        return
    }

    getAspectRatioHeight(media){
        Image.getSize(media.image, (width, height) => {
            return (height / width).toFixed(2) * 150
        });
    }

    renderMedia(){
        const { image } = styles;

        if(movie.otherMedia){
            return(
                <View>
                    <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25 }}>
                        Media
                    </Text>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        {
                            movie.otherMedia.map((item, i) => {
                            
                                Image.getSize(item.image, (width, height) => {
                                    finalHeight =  (height / width).toFixed(2) * 150
                                    console.log('Final height', finalHeight)
                                });
                                    return <Image key={i} style={ {flex: 1, height: 150, 
                                    marginLeft: 25, marginRight: 25,} } resizeMode={ 'contain' }
                                            source={{ uri: item.image }} />

                            })
                        }
                    </View>
                </View>
            )
        }
        return
    }

    render() {
        
        const { gif } = styles;
        
        return (
            <ScrollView style={{ flexDirection: 'column' }}>
                <Swiper height={ 160 } showsButtons={this.renderPagerButtons()} showsPagination={false}>
                    {this.renderHeaderItems()}
                </Swiper>
                <Transparency size={35}/>
                <Text style={{ color: 'black', fontSize: 35, paddingLeft: 15, paddingRight: 25, marginTop: -25 }}>
                    {movie.title}
                </Text>
                <TouchableWithoutFeedback 
                    onPress={() => this.props.toggleFullSynopsis()}
                >
                    <View style={this.showFullText()}>
                        <Text style={{ color: 'black', fontSize: 15, paddingLeft: 25, paddingRight: 25 }}>
                            {movie.synopsis}
                        </Text> 
                    </View>
                </TouchableWithoutFeedback>
                {this.renderTextTransparency()}
                <View style={{ height: 0.5, backgroundColor: '#999', marginTop: 10, marginBottom: 10 }}/>
                {this.renderSocial()}
                {this.renderMedia()}
            </ScrollView>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    pagerButton: {
        backgroundColor: 'transparent', 
        flexDirection: 'row', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        flex: 1, 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    gif: {
        height: 100
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: '#999'
    },
    image: {
        flex: 1,
        height: 150,
        marginLeft: 25,
        marginRight: 25,
    }
}

const mapStateToProps = ({ movieList, movieDetail }) => {

    const { selectedMovie } = movieList;
    const { shouldShowFullSynopsis } = movieDetail;

    return {
        selectedMovie, shouldShowFullSynopsis
    };
};

export default connect(mapStateToProps, { toggleFullSynopsis })(MovieDetail);

// export default MovieDetail;