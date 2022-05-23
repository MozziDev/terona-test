import {SET_USER} from "../actions/user";

export function acUser(value:any) {
    return {
        type: SET_USER,
        payload: value
    };
}