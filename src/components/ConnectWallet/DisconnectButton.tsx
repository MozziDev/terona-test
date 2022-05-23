import * as React from "react";
import {IconButton, Tooltip, Typography} from "@mui/material";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import {acUnsetWallet} from "../../store/actionsCreators/acWallet";
import {connect} from "react-redux";

function DisconnectButton({wallet, walletReducer}: any): JSX.Element
{

    const onDisconnectHandler = async () => {
        walletReducer()
    }

    const lengthWallet: number = wallet.walletAccount.length;
    const cutWallet: string = wallet.walletAccount.substring(0,12)+'...'+wallet.walletAccount.substring((lengthWallet-12),lengthWallet);

    return <>
        <Typography
            sx={{mt: 2, mb: 2, fontSize: 12}}
        >{cutWallet}
            <Tooltip title="Disconnect">
                <IconButton aria-label="Disconnect" size="small" onClick={onDisconnectHandler}>
                    <DoDisturbIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Typography>
    </>
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet
    }
}

const walletReducer = {
    walletReducer: () => (acUnsetWallet()),
}

export default connect(walletStateToProps, walletReducer)(DisconnectButton);