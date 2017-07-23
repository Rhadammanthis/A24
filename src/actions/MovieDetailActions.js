import {
    SHOW_FULL_SYNOPSIS,
    RESET_MOVIE_DETAIL_STATE
} from './types'

export const toggleFullSynopsis = () => {
    return({ type: SHOW_FULL_SYNOPSIS, payload: null })
};

export const resetState = () => {
    return({ type: RESET_MOVIE_DETAIL_STATE, payload: null})
}

