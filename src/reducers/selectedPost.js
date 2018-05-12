import {SELECT_POST, UNSELECT_POST} from "../actionTypes";

const initialState = null;

export default (state = initialState, action) => {
    switch(action.type) {
        case SELECT_POST:
            return action.payload;
        case UNSELECT_POST:
            return initialState;
        default:
            return state;
    }
}