import {FILTER} from "../actionTypes";

const initialState = '';

export default (state = initialState, action) => {
    if(action.type === FILTER) {
        return action.payload
    }

    return state;
}