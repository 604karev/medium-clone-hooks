import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [contextState, setContextState] = useState({
        isLoading: false,
        isLoggedIn: null,
        currentUser: null

    })
    return (
        <CurrentUserContext.Provider value={[contextState, setContextState]} >
            {children}
        </CurrentUserContext.Provider >

    )
}

