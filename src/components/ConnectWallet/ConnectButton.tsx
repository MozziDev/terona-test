import Button from "@mui/material/Button";
import * as React from "react";

// @ts-ignore
export default function ConnectButton({onConnectHandler}): JSX.Element
{
    return <>
        <Button
            onClick={onConnectHandler}
            variant={'contained'}
        >
            Connect to Wallet
        </Button>
    </>
}