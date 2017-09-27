import React, { Component } from 'react';
import {
    Text, TouchableOpacity, View, Image, TouchableWithoutFeedback,
    ScrollView, LayoutAnimation, Button, TouchableNativeFeedback,
    ActivityIndicator, Linking, BackHandler
} from 'react-native';
import Transparency from './common/Transparency'
import Swiper from 'react-native-swiper';
import PopupDialog from 'react-native-popup-dialog';
import InViewPort from 'react-native-inviewport';
import { toggleFullSynopsis, getMovieMediaSize } from '../actions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class MovieDetail extends Component {

    media = [];

    componentWillUpdate() {
        LayoutAnimation.spring();

        // Actions.refresh({title: 'Some other title'})
    }

    componentWillMount() {

        movie = this.props.selectedMovie

        if (movie.otherMedia)
            this.props.getMovieMediaSize(movie.otherMedia)
    }

    renderHeaderItems() {
        return movie.mainMedia.map(media => {
            return <Image key={media.imgURL} style={{ height: 160 }}
                source={{ uri: media.imgURL }} />
        });
    }

    renderTrailer() {
        if (movie.trailers)
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 160, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                        source={{ uri: movie.trailers[0].thumbNailURL }} />
                    <View style={{ opacity: 1 }}>
                        <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=' + movie.trailers[0].id) }}>
                            <Image style={{ height: 60, width: 60 }}
                                source={require('../images/play_circle.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
        return
    }

    renderPagerButtons() {
        return movie.mainMedia.length > 1
    }

    renderCredits() {
        return movie.credits.map((obj, i) => {
            return <View key={i} style={{
                marginLeft: 25, marginRight: 25,
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 5
            }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', flex: 1 }}>
                    {obj.credit}
                </Text>
                <Text style={{ color: 'black', fontSize: 15, flex: 2 }}>
                    {obj.content}
                </Text>
            </View>
        }
        );
    }

    renderTextTransparency() {
        if (this.props.shouldShowFullSynopsis)
            return
        else
            return (
                <Transparency size={25} />
            )
    }

    renderSynopsis() {
        if (movie.synopsis) {
            return (
                <View>
                    <TouchableWithoutFeedback
                        onPress={() => { this.props.toggleFullSynopsis() }}>
                        <View style={{ height: this.props.synopsisSize }}>
                            <Text style={{ color: 'black', fontSize: 15, paddingLeft: 25, paddingRight: 25 }}>
                                {movie.synopsis}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.renderTextTransparency()}
                </View>
            )
        }
        return;
    }

    renderPosters() {
        if (movie.posters) {
            return (
                <View>
                    <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25 }}>
                        {movie.posters.length > 1 ? "Posters" : "Poster"}
                    </Text>
                    <View style={{}}>
                        {
                            movie.posters.map((item, i) => {
                                return (
                                    <Image key={i} style={{
                                            flex: 1, height: 530,
                                            marginLeft: 25, marginRight: 25, marginTop: 10
                                        }} resizeMode={'contain'}
                                            source={{ uri: item.imgURL }} />
                                );
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    renderSocial() {
        const { circle } = styles;

        if (movie.social) {
            return (<View>
                <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                    Social
                        </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 }}>
                    {
                        movie.social.map((item, i) => {

                            switch (item.type) {
                                case 'Official Website':
                                    return (
                                        <TouchableWithoutFeedback key={i} onPress={() => { Linking.openURL(item.link) }}>
                                            <View style={circle} >
                                                <Image style={{ width: 30, height: 30 }}
                                                    source={require('../images/web.png')} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                case 'Facebook':
                                    return (
                                        <TouchableWithoutFeedback key={i} onPress={() => { Linking.openURL(item.link) }}>
                                            <View style={circle} >
                                                <Image style={{ width: 30, height: 30 }}
                                                    source={require('../images/facebook.png')} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                case 'Twitter':
                                    return (
                                        <TouchableWithoutFeedback key={i} onPress={() => { Linking.openURL(item.link) }}>
                                            <View style={circle} >
                                                <Image style={{ width: 30, height: 30 }}
                                                    source={require('../images/twitter.png')} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                case 'Instagram':
                                    return (
                                        <TouchableWithoutFeedback key={i} onPress={() => { Linking.openURL(item.link) }}>
                                            <View style={circle} >
                                                <Image style={{ width: 30, height: 30 }}
                                                    source={require('../images/instagram.png')} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                            }


                        })
                    }
                </View>
            </View>)
        }
        return
    }

    getAspectRatioHeight(media) {
        Image.getSize(media.image, (width, height) => {
            return (height / width).toFixed(2) * 150
        });
    }

    renderMedia() {
        const { image, mediaCaption } = styles;

        if (movie.otherMedia) {
            if (this.props.mediaLoaded == true)
                return (
                    <View>
                        <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25 }}>
                            Media
                        </Text>
                        <View style={{}}>
                            {
                                this.props.movieMedia.map((item, i) => {
                                    return (
                                        <View style={{ marginTop: 10 }} key={i}>
                                            <Image key={i} style={{
                                                flex: 1, height: 350 * item.aspectRatio,
                                                marginLeft: 25, marginRight: 25,
                                            }} resizeMode={'contain'}
                                                source={{ uri: item.media.image }} />
                                            <Text style={mediaCaption}>
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
                return (
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

    renderArticles() {

        if (movie.headlines) {
            return (<View>
                <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                    Articles
                        </Text>
                <View style={{
                    marginTop: 10, marginBottom: 10,
                    paddingLeft: 25, paddingRight: 25
                }}>
                    {
                        movie.headlines.map((article, i) => {
                            return (
                                <View key={i}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000', marginTop: 10, marginBottom: 10 }} />
                                    <Text style={{ fontSize: 20, fontWeight: '900' }}>
                                        {article.title}
                                    </Text>
                                    <Image style={{ flex: 1, height: 140, marginTop: 5 }} source={{ uri: article.image }} />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 5 }}>
                                        {article.source}
                                    </Text>
                                    <TouchableNativeFeedback onPress={() => { Linking.openURL(article.link) }}>
                                        <Text style={{ fontSize: 15 }}>
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

    renderExternalLinks() {

        const { linkDot } = styles;

        if (movie.websites) {
            return (<View>
                <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                    External Links
                        </Text>
                <View style={{
                    justifyContent: 'space-around', marginTop: 10, marginBottom: 10,
                    paddingLeft: 25, paddingRight: 25
                }}>
                    {
                        movie.websites.map((externalLink, i) => {
                            return (
                                <TouchableNativeFeedback key={i}
                                    onPress={() => { Linking.openURL(externalLink.link) }}>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{
                                            flex: 1, height: 10, backgroundColor: '#DDD', flexDirection: 'row',
                                            justifyContent: 'flex-start', alignItems: 'center'
                                        }}>
                                            <View style={[linkDot, { marginLeft: 4 }]} />
                                            <View style={linkDot} />
                                            <View style={linkDot} />
                                        </View>
                                        <Image style={{ flex: 1, height: 170 }} source={{ uri: externalLink.image }} />
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

    renderReviews() {

        if (movie.reviews) {
            return (<View>
                <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                    Reviews
                        </Text>
                <View style={{
                    justifyContent: 'space-around', marginTop: 10, marginBottom: 10,
                    paddingLeft: 25, paddingRight: 25
                }}>
                    {
                        movie.reviews.map((review, i) => {
                            return (
                                <View key={i}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000', marginTop: 10, marginBottom: 10 }} />
                                    <Text style={{ fontSize: 20, fontWeight: '900' }}>
                                        {review.title}
                                    </Text>
                                    <Image style={{ flex: 1, height: 140, marginTop: 5 }} source={{ uri: review.image }} />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 5 }}>
                                        {review.source}
                                    </Text>
                                    <TouchableNativeFeedback onPress={() => { Linking.openURL(review.link) }}>
                                        <Text style={{ fontSize: 15 }}>
                                            {review.summary}
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

    renderInstagramPosts() {

        const { instagramPostBackground, instagramHandle } = styles;

        if (movie.instagram) {
            return (<View>
                <Text style={{ color: 'black', fontSize: 25, paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                    Instagram
                        </Text>
                <View style={{
                    justifyContent: 'space-around', marginTop: 10, marginBottom: 10,
                    paddingLeft: 25, paddingRight: 25
                }}>
                    {
                        movie.instagram.map((post, i) => {

                            return post.link ?
                                (<View key={i} style={instagramPostBackground}>
                                    <TouchableWithoutFeedback onPress={() => { Linking.openURL(post.handle) }}>
                                        <View style={{
                                            flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5,
                                            marginBottom: 10
                                        }}>
                                            <Text style={instagramHandle}>
                                                @a24
                                                    </Text>
                                            <Image style={{ height: 20, width: 20 }} source={require('../images/instagram_dark.png')} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableNativeFeedback onPress={() => { Linking.openURL(post.link) }}>
                                        <Image style={{ flex: 1, height: 300 }} source={{ uri: post.media }} />
                                    </TouchableNativeFeedback>
                                    <Text style={{ marginTop: 10 }}>
                                        {post.caption}
                                    </Text>
                                </View>)
                                :
                                (<View key={i} style={instagramPostBackground}>
                                    <TouchableWithoutFeedback onPress={() => { Linking.openURL(post.handle) }}>
                                        <View style={{
                                            flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5,
                                            marginBottom: 10
                                        }}>
                                            <Text style={instagramHandle}>
                                                @a24
                                                    </Text>
                                            <Image style={{ height: 20, width: 20 }} source={require('../images/instagram_dark.png')} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Image style={{ flex: 1, height: 300 }} source={{ uri: post.media }} />
                                    <Text style={{ marginTop: 10 }}>
                                        {post.caption}
                                    </Text>
                                </View>)
                        })
                    }
                </View>
            </View>)
        }
        return
    }

    checkVisible(isVisible) {
        if (isVisible)
            console.log('Visibale')
        else
            console.log('Not visible')
    }

    render() {

        const { gif } = styles;

        console.log("Movie media? ", this.props.movieMedia)

        return (
            <ScrollView style={{ flexDirection: 'column' }}>
                <Swiper height={160} showsButtons={true} showsPagination={false}>
                    {this.renderHeaderItems()}
                    {this.renderTrailer()}
                </Swiper>
                <Transparency size={35} />
                <InViewPort onChange={this.checkVisible}>
                    <Text style={{ color: 'black', fontSize: 35, paddingLeft: 15, paddingRight: 25, marginTop: -25 }}>
                        {movie.title}
                    </Text>
                </InViewPort>
                {this.renderSynopsis()}
                <View style={{ height: 0.5, backgroundColor: '#999', marginTop: 10, marginBottom: 10 }} />
                {this.renderPosters()}
                {this.renderSocial()}
                {this.renderMedia()}
                {this.renderArticles()}
                {this.renderExternalLinks()}
                {this.renderReviews()}
                {this.renderInstagramPosts()}
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
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#999',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
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
        textShadowColor: '#999'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    linkDot: {
        width: 5,
        height: 5,
        borderRadius: 5 / 2,
        backgroundColor: '#999',
        marginLeft: 1,
        marginRight: 1
    },
    instagramPostBackground: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: '#DDD',
        marginTop: 10
    },
    instagramHandle: {
        flex: 1
    }
}

const mapStateToProps = ({ movieList, movieDetail }) => {

    const { selectedMovie } = movieList;
    const { shouldShowFullSynopsis, movieMedia, mediaLoaded, synopsisSize } = movieDetail;

    return {
        selectedMovie, shouldShowFullSynopsis, movieMedia, mediaLoaded,
        synopsisSize
    };
};

export default connect(mapStateToProps, { toggleFullSynopsis, getMovieMediaSize })(MovieDetail);

// export default MovieDetail;