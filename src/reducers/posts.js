import * as R from 'ramda';

import {
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    UPDATE_POSTS_START,
    UPDATE_POSTS_FAILURE,
    UPDATE_POSTS_SUCCESS
} from '../actionTypes';

const initialState = [];


export default (state = initialState, {type, payload}) => {
    switch(type) {
        case FETCH_POSTS_START:
        case FETCH_POSTS_FAILURE:
        case UPDATE_POSTS_START:
        case UPDATE_POSTS_FAILURE:
            return state;
        case FETCH_POSTS_SUCCESS:
            return payload;
        case UPDATE_POSTS_SUCCESS:
            const newPosts = R.differenceWith((a, b) => a.title === b.title, payload, state);
            return [
                ...newPosts,
                ...state
            ];
        default:
            return state;
    }
}