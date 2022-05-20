import MenuAppBar from "./AppBar";
import React from "react";
import Footer from "./Footer";

const Layout = ({children}: {children: React.ReactNode}):JSX.Element => {

    return <>
        <MenuAppBar />
        {children}
        <Footer/>
    </>
}

export default Layout;