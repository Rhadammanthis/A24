import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, 
    ScrollView, LayoutAnimation, Button, TouchableNativeFeedback,
    ActivityIndicator, Linking } from 'react-native';
import Transparency from './common/Transparency'
import Swiper from 'react-native-swiper';
import PopupDialog from 'react-native-popup-dialog';
import { toggleFullSynopsis, getMovieMediaSize } from '../actions';
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

        if(movie.otherMedia)
            this.props.getMovieMediaSize(movie.otherMedia)
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
        const { image, mediaCaption } = styles;

        if(movie.otherMedia){
            if(this.props.mediaLoaded == true)
                return(
                    <View>
                        <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25 }}>
                            Media
                        </Text>
                        <View style={{ }}>
                            {
                                this.props.movieMedia.map((item, i) => {                            
                                    return(
                                        <View style={{ marginTop: 10}} key={i}>
                                            <Image key={i} style={ {flex: 1, height: 350 * item.aspectRatio, 
                                                marginLeft: 25, marginRight: 25,} } resizeMode={ 'contain' }
                                                source={{ uri: item.media.image }} />
                                            <Text style={ mediaCaption }>
                                                {item.media.caption}
                                            </Text> 
                                        </View>
                                    );     

                                })
                            }
                        </View>
                    </View>
                )
            else
                return(
                <View>
                    <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25 }}>
                        Media
                    </Text>
                    <ActivityIndicator
                        size="large"
                        color="grey"
                    />
                </View>
                )
        }
        return
    }

    renderArticles(){

        if(movie.headlines){
            return (<View>
                        <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                            Articles
                        </Text>
                        <View style={{ marginTop: 10, marginBottom: 10,
                            paddingLeft: 25, paddingRight: 25 }}>
                            {
                                movie.headlines.map((article, i) => {
                                    return (
                                        <View key={i}>
                                            <View style={{ flex:1, height:1, backgroundColor: '#000', marginTop: 10, marginBottom: 10 }} />
                                            <Text style={ { fontSize: 18, fontWeight: '800' } }>
                                                {article.title}
                                            </Text>
                                            <Image style={{ flex: 1, height: 140, marginTop: 5 }} source={{ uri: article.image}}/>
                                            <Text style={{ fontSize: 11, fontWeight: 'bold', marginTop: 5 }}>
                                                {article.source}
                                            </Text>
                                            <TouchableNativeFeedback onPress={() => { Linking.openURL(article.link) }}>
                                                <Text>
                                                    {article.summary}
                                                </Text>
                                            </TouchableNativeFeedback>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>)
        }
        return

    }

    renderExternalLinks(){

        const { linkDot } = styles;

        if(movie.websites){
            return (<View>
                        <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                            External Links
                        </Text>
                        <View style={{ justifyContent: 'space-around', marginTop: 10, marginBottom: 10,
                            paddingLeft: 25, paddingRight: 25 }}>
                            {
                                movie.websites.map((externalLink, i) => {
                                    return (
                                        <TouchableNativeFeedback key={i}
                                            onPress={() => { Linking.openURL(externalLink.link) }}>
                                            <View style={{ marginTop: 10 }}>
                                                <View style={{ flex:1, height:10, backgroundColor: '#DDD', flexDirection: 'row',
                                                    justifyContent: 'flex-start', alignItems: 'center' }}>
                                                    <View style={[ linkDot, { marginLeft: 4 } ]} />
                                                    <View style={ linkDot } />
                                                    <View style={ linkDot } />
                                                </View>
                                                <Image style={{ flex: 1, height: 170 }} source={{ uri: externalLink.image}}/>
                                            </View>
                                        </TouchableNativeFeedback>
                                    )
                                })
                            }
                        </View>
                    </View>)
        }
        return
    }

    render() {
        
        const { gif } = styles;

        console.log("Movie media? ", this.props.movieMedia)
        
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
                {this.renderArticles()}
                {this.renderExternalLinks()}
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
    },
    mediaCaption: {
        fontSize: 13,
        flex: 1,
        textAlign: 'right',
        marginLeft: 125, 
        marginRight: 25,
        marginTop: 5,
        textShadowColor : '#999'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    linkDot: {
        width: 5, 
        height: 5, 
        borderRadius: 5/2, 
        backgroundColor: '#999',
        marginLeft: 1,
        marginRight: 1
    }
}

const mapStateToProps = ({ movieList, movieDetail }) => {

    const { selectedMovie } = movieList;
    const { shouldShowFullSynopsis, movieMedia, mediaLoaded } = movieDetail;

    return {
        selectedMovie, shouldShowFullSynopsis, movieMedia, mediaLoaded
    };
};

export default connect(mapStateToProps, { toggleFullSynopsis, getMovieMediaSize })(MovieDetail);

// export default MovieDetail;