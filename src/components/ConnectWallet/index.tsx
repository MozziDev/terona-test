import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";
import React from "react";
import Web3 from "web3";
import {connect} from "react-redux";
import {acSetWallet} from "../../store/actionsCreators/acWallet";
import {IUser} from "../../interface/iUser";
import {acUser} from "../../store/actionsCreators/acUser";

declare var window: any


const detectedProvider = (): any => {
    let provider: any;
    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        window.alert('No Ethereum Browser')
    }

    return provider;
}

 function ConnectWallet({wallet, walletReducer, userReducer}: any): JSX.Element {

    const onConnectHandler = async () => {
        const provider = await detectedProvider();

        if (provider){
            if (provider !== window.etereum) {
                console.log('No window.ethereum provider. Do you have multiple Wallets installed?')
            }
            await provider.request({
                method: "eth_requestAccounts"
            })
        }

        const web3 = new Web3(provider);

        await web3.eth.getAccounts().then(async (data) => {
            let currentAccount;
            if (data.length === 0) {
            } else if (data[0] !== wallet.walletAccount) {
                currentAccount = data[0]
            }
            walletReducer({
                isConnect: true,
                walletAccount: currentAccount
            });
            let user;
            await fetch('/api/get-user-by-wallet?wallet='+currentAccount).then(resp=>resp.json()).then(data=>user=data[0])
            userReducer(user);
        });

    }

    const WalletButton = wallet.isConnect ? <DisconnectButton /> :
        <ConnectButton onConnectHandler={onConnectHandler}/>
    return <>
        {WalletButton}
    </>

}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet
    }
}

const walletReducer = {
    walletReducer: (value:any) => (acSetWallet(value)),
    userReducer:(value:any) => (acUser(value))
}

export default connect(walletStateToProps, walletReducer)(ConnectWallet);