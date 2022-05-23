import {SET_USER} from "../actions/user";
import userState from "../initialStates/userState";

const userReducer =  (state = userState, action: any) => {

    switch(action.type) {
        case SET_USER: return {
            ...state,
            ...action.payload
        }
        default: return state;
    }
}

export default userReducer;