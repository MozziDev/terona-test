import {NextPage} from "next";
import MenuAppBar from "./AppBar";
import React from "react";

const Layout = ({children}: {children: React.ReactNode}):JSX.Element => {

    return <>
        <MenuAppBar />
        {children}
    </>
}

export default Layout;