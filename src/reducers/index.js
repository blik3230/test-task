import {combineReducers} from 'redux';

import posts from './posts';
import selectedPost from "./selectedPost";
import filter from "./filter";

export default combineReducers({
    posts,
    selectedPost,
    filter
})