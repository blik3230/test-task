import {
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    UPDATE_POSTS_START,
    UPDATE_POSTS_SUCCESS,
    UPDATE_POSTS_FAILURE,
    SELECT_POST,
    UNSELECT_POST,
    FILTER
} from '../actionTypes';

import {
    getPost as getPostApi
} from "../api";

export const fetchPosts = () => dispatch => {
    dispatch({type: FETCH_POSTS_START});

    getPostApi()
        .then(response => response.data)
        .then(data => data.hits)
        .then(hits => {
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: hits
            })
        })
        .catch((err) => {
            dispatch({
                type: FETCH_POSTS_FAILURE,
                payload: err
            })
        })
};

export const updatePosts = () => dispatch => {
    dispatch({type: UPDATE_POSTS_START});

    getPostApi()
        .then(response => response.data)
        .then(data => data.hits)
        .then(hits => {
            dispatch({
                type: UPDATE_POSTS_SUCCESS,
                payload: hits
            })
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_POSTS_FAILURE,
                payload: err
            })
        })
};

export const selectPost = post => dispatch => {
    dispatch({
        type: SELECT_POST,
        payload: post
    })
};

export const unselectPost = () => dispatch => {
    dispatch({
        type: UNSELECT_POST
    })
};

export const filter = (str) => dispatch => {
    dispatch({
        type: FILTER,
        payload: str
    })
};