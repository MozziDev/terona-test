import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuList from "../Menu";
import ConnectWallet from "../../ConnectWallet";
import {acSetWallet, acUnsetWallet} from "../../../store/actionsCreators/acWallet";
import {acUser} from "../../../store/actionsCreators/acUser";
import {connect} from "react-redux";

function MenuAppBar({wallet, user}: any) {
    const auth = wallet.isConnect
    return (<>
        <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
    <Toolbar>
        <IconButton
            size="large"
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{ mr: 2 }}
>
    <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Bedding
    </Typography>
        <MenuList />
        <ConnectWallet />
    {auth && (
        <div>
            <IconButton
                size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
            >
            <AccountCircle />
            </IconButton>
    </div>
    )}
    </Toolbar>
    </AppBar>
    </Box>
        </>
);
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet,
        user: state.user
    }
}

const walletReducer = {
    walletSetReducer: (value:any) => (acSetWallet(value)),
    walletUnsetReducer: () => (acUnsetWallet()),
    userReducer:(value:any) => (acUser(value))
}

export default connect(walletStateToProps, walletReducer)(MenuAppBar);
