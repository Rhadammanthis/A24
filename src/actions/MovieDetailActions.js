import {
    SHOW_FULL_SYNOPSIS,
    RESET_MOVIE_DETAIL_STATE,
    GET_MOVIE_MEDIA_SIZE
} from './types'
import { Image } from 'react-native';
var async = require('async');

export const toggleFullSynopsis = () => {
    return({ type: SHOW_FULL_SYNOPSIS, payload: null })
};

export const resetState = () => {
    return({ type: RESET_MOVIE_DETAIL_STATE, payload: null})
}

export const getMovieMediaSize = (movieMedia) => {

    var movieMediaSize = [];

    return(dispatch) => {

        var mapTeacher = (item, done) => {

            Image.getSize(item.image, (width, height) => {

                var movieMedia = {}
                movieMedia.media = item
                movieMedia.height = height
                movieMedia.width = width
                movieMedia.aspectRatio = (height / width).toFixed(2)

                console.log("Item ", movieMedia)
                done(null, movieMedia);
            });
        }

        async.map(movieMedia, mapTeacher, function(err, results){
            console.log("Done! ", results)
            dispatch({ type: GET_MOVIE_MEDIA_SIZE, payload: results})
        });
        
    }
}

