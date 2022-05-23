import React, {createContext, useContext, useState} from "react";

const AppContext = createContext({});

export function AppWrapper({ children }: {children: React.ReactNode})
{
    const [appWalletState, setAppWalletState] = useState({isWalletConnection: false, walletAccount: ''});

    const contextValue = {
        appWalletState: appWalletState,
        setAppWalletState: setAppWalletState
    }
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );}

export function useAppContext() {
    return useContext(AppContext);
}