import {SET_WALLET, UNSET_WALLET} from "../actions/wallet";

export function acSetWallet(value:any) {
    return {
        type: SET_WALLET,
        payload: value
    };
}
export function acUnsetWallet() {
    return {
        type: UNSET_WALLET,
    };
}