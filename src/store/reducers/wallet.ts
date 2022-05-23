import {SET_WALLET, UNSET_WALLET} from "../actions/wallet";
import walletState from "../initialStates/walletState";

const walletReducer =  (state = walletState, action: any) => {

    switch(action.type) {
        case SET_WALLET: return {
            ...state,
            ...action.payload
        }
        case UNSET_WALLET: return {
            ...state,
            ...walletState
        }
        default: return state;
    }
}

export default walletReducer;